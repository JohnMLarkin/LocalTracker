const serialport = require('serialport');
const Readline = require('@serialport/parser-readline');

// require('../assets/js/mapsjs-core');
// require('../assets/js/mapsjs-service');
// require('../assets/js/mapsjs-ui');
// require('../assets/js/mapsjs-mapevents');
const log = require('../helpers/seriallog');

class LocalGPS {
  constructor() {
    this._port = new serialport('COM1', {autoOpen: false});
    this._portConnected = false;
  }

  connect (portName) {
    this._portName = portName;
    this._port = new serialport(portName, {
      baudRate: 4800,
      autoOpen: false
    });
    this._port.open( (err) => {
      if (err) console.log(err);
      if (!err) {
        log.update('Connected to local GPS');
        this._portConnected = true;
        this.parser = this._port.pipe(new Readline({delimiter: '\r\n'}));
        this.parser.owner = this;
        this.parser.on('data', this.receiveSerialData);
        this._port.on('close', this.disconnect);
      }
    })
  }

  disconnect () {
    console.log(this);
  }

  receiveSerialData (s) {
    var sentenceType = s.substring(1,6);
    var d = s.substring(7).split(",");
    var t = new Date();
    switch (sentenceType) {
      case 'GNGGA':
        var raw_t = parseFloat(d[0]);
        var t_hour = parseInt(raw_t/10000);
        raw_t = raw_t - t_hour*10000;
        var t_min = parseInt(raw_t/100);
        raw_t = raw_t - t_min*100;
        var t_sec = parseInt(raw_t);
        raw_t = raw_t - t_sec;
        var t_ms = parseInt(raw_t*1000);
        t.setUTCHours(t_hour, t_min, t_sec, t_ms);
        
        var raw_lat = parseFloat(d[1]);
        var lat = parseInt(raw_lat/100);
        raw_lat = raw_lat - lat*100;
        lat = lat + raw_lat/60;
        if (d[2] == 'S') lat = -lat;
        var raw_lng = parseFloat(d[3]);
        var lng = parseInt(raw_lng/100);
        raw_lng = raw_lng - lng*100;
        lng = lng + raw_lng/60;
        if (d[4] == 'W') lng = -lng;
        var fixQuality = parseInt(d[5]);
        var numSats = parseInt(d[6]);
        var alt = parseFloat(d[8]);
        if (fixQuality>0) {
          log.update('Local GPS updated @ ' + t.toLocaleTimeString());
          carPoints.pushLatLngAlt(lat,lng, alt);
          if (carPoints.getPointCount() == 2) {
            carPath = new H.map.Polyline(carPoints, {style: {linewidth: 4, strokeColor: 'rgba(170,85,0,0.6)'}});
            map.addObject(carPath);
            carMarker.setGeometry({lat: lat, lng: lng});
          } else if (carPoints.getPointCount() > 2) {
            carPath.setGeometry(carPoints);
            carMarker.setGeometry({lat: lat, lng: lng});
          } else {
            carMarker = new H.map.Marker({lat: lat, lng: lng}, {icon: carIcon, volatility: true});
            map.addObject(carMarker);
          }
          carWP.push({lat: lat, lng: lng, alt: alt});
          if ((carWP.length>0) && (balloonWP.length>0)) {
            let r = 6376.5*1000;
            let bLatRad = (balloonWP[balloonWP.length-1].lat-90)*Math.PI/180;
            let bLngRad = balloonWP[balloonWP.length-1].lng*Math.PI/180;
            let bR = balloonWP[balloonWP.length-1].alt + r;
            let cLatRad = (carWP[carWP.length-1].lat-90)*Math.PI/180;
            let cLngRad = carWP[carWP.length-1].lng*Math.PI/180;
            let cR = carWP[carWP.length-1].alt + r;
            let bx = bR*Math.cos(bLngRad)*Math.sin(bLatRad);
            let by = bR*Math.sin(bLngRad)*Math.sin(bLatRad);
            let bz = bR*Math.cos(bLatRad);
            let cx = cR*Math.cos(cLngRad)*Math.sin(cLatRad);
            let cy = cR*Math.sin(cLngRad)*Math.sin(cLatRad);
            let cz = cR*Math.cos(cLatRad);
            let dist = Math.sqrt((bx-cx)*(bx-cx)+(by-cy)*(by-cy)+(bz-cz)*(bz-cz));
            dist = dist/1000;
            var distInd = document.getElementById('distanceIndicator');
            if (dist<=12) {
              distInd.setAttribute("style", "color: #fff");
            } else if ((dist > 12) && (dist <= 16)) {
              distInd.setAttribute("style", "color: #ff0");
            } else {
              distInd.setAttribute("style", "color: #f00");
            }
            distInd.innerHTML=`${dist.toFixed(1)} km`;
          }
          var trackingMode = document.getElementById('trackingMode').value;
          switch (Number(trackingMode)) {
            case 0: // Manual center and zoom
              break;
            case 1: // Balloon centered, manual zoom
              break; // No change - this was a car update
            case 2: // Car centered, manual zoom
              panToMe();
              break;
            case 3: // Balloon and car in bounds
              if (balloonWP.length>0) {
                showBalloonAndMe();
              } else {
                panToMe();
              }
              break;
          }
        }

        break;

    }
  }

  is_connected () {
    return this._portConnected;
  }
}

module.exports = LocalGPS;
