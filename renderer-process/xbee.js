const serialport = require('serialport');
const xbee_api = require('xbee-api');
const log = require('../helpers/seriallog');

var sonarPing = new Audio('assets/media/sonar.wav');

class XBee {
  constructor () {
    this._port = new serialport('COM1', {autoOpen:false}); // just a dummy
    this._portConnected = false;
    this._xbee = new xbee_api.XBeeAPI({api_mode:1});
    this.audioOn = false;
    this._frameId = 0;
  }

  connect (portName) {
    this._portName = portName;
    this._port = new serialport(portName, {
      baudRate: 230400
    });
    this._port.pipe(this._xbee.parser);
    this._port.owner = this; // Let callbacks of _port access this XBee object
    this._xbee.parser.owner = this; // Let callbacks of _xbee.parser access this XBee object
    this._xbee.builder.pipe(this._port);
    this._xbee.parser.on("data", this.receiveSerialData);
    this._port.on("open", this.send_NI);
  }

  is_connected () {
    return this._portConnected;
  }

  // Send NI frame
  send_NI() {
    let frame = {
      type: xbee_api.constants.FRAME_TYPE.AT_COMMAND,
      command: "NI",
      commandParameter: []
    };
    this.owner._xbee.builder.write(frame);
  }

  // Process incoming data from XBee modem
  receiveSerialData(frame) {
    const FRAME_TYPE = xbee_api.constants.FRAME_TYPE;
    switch (frame.type) {
      case FRAME_TYPE.AT_COMMAND_RESPONSE:
        switch (frame.command) {
          case "NI":
            log.update('Connected to XBee ' + frame.commandData.toString());
            this.owner._portConnected = true;
            break;
          default:
            log.update('Unhandled AT Response for ' + frame.command);
        }
        break;
      case FRAME_TYPE.ZIGBEE_RECEIVE_PACKET:
        var msgType = frame.data.readUInt8(0);
        switch (msgType) {
          case 0xB0:  this.owner.processGPSFrame(frame.data); break;
          default:
            log.update('Unhandled message type ' + msgType.toString(16));
            console.log(frame.data);
        }
        break;
      default:
        log.update('Unhandled frame type ' + frame.type.toString(16));
        console.log(frame);
    }
  }

  processGPSFrame(data) {
    var wp = {};
    wp.t = new Date();
    wp.t.setTime(1000*data.readInt32LE(1));
    wp.lat = data.readFloatLE(5);
    wp.lng = data.readFloatLE(9);
    wp.alt = data.readFloatLE(13);
    wp.gndSpeed = data.readFloatLE(17);
    wp.vertVel = data.readFloatLE(21);
    wp.heading = data.readInt32LE(25);
    document.getElementById('lastUpdateIndicator').innerHTML=wp.t.toLocaleTimeString();
    document.getElementById('altitudeIndicator').innerHTML=`${wp.alt.toFixed()} m`;
    document.getElementById('verticalVelocityIndicator').innerHTML=`${wp.vertVel.toFixed(1)} m/s`;
    document.getElementById('latIndicator').innerHTML=`${wp.lat.toFixed(3)}\xB0`;
    document.getElementById('lngIndicator').innerHTML=`${wp.lng.toFixed(3)}\xB0`;
    document.getElementById('groundSpeedIndicator').innerHTML=`${wp.gndSpeed.toFixed(0)} km/h`;
    log.update(`Balloon GPS updated @ ${wp.t.toLocaleTimeString()}`);
    altChart.data.datasets[0].data.push({
      x: wp.t,
      y: wp.alt
    });
    altChart.update();
    balloonWP.push(wp);
    balloonPoints.pushLatLngAlt(wp.lat, wp.lng, wp.alt);
    if (balloonPoints.getPointCount() == 2) {
      balloonPath = new H.map.Polyline(balloonPoints, {style: {lineWidth: 4}});
      map.addObject(balloonPath);
      balloonMarker.setGeometry({lat: wp.lat, lng: wp.lng});
    } else if (balloonPoints.getPointCount() > 2) {
      balloonPath.setGeometry(balloonPoints);
      balloonMarker.setGeometry({lat: wp.lat, lng: wp.lng});
    } else {
      balloonMarker = new H.map.Marker({lat: wp.lat, lng: wp.lng}, {volatility: true});
      map.addObject(balloonMarker);
    }
    if (document.getElementById('audioCheck').checked) sonarPing.play();
    var trackingMode = document.getElementById('trackingMode').value;
    switch (Number(trackingMode)) {
      case 0: // Manual center and zoom
        break;
      case 1: // Balloon centered, manual zoom
        panToBalloon();
        break;
      case 2: // Car centered, manual zoom
        break; // No change - this was a balloon update
      case 3: // Balloon and car in bounds
        if (carWP.length>0) {
          showBalloonAndMe();
        } else {
          panToBalloon();
        }
        break;
    }
  }
}

module.exports = XBee;