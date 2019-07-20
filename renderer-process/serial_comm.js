// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport');
const settings = require('electron-settings');

const XBee = require('./renderer-process/xbee');
const LocalGPS = require('./renderer-process/local_gps');
const log = require('./helpers/seriallog');

var xbee = new XBee();
var gps = new LocalGPS();

// Search for XBee and GPS ports
function autoDetectPort() {
  var xbeeSN = document.getElementById("xbee-sn").value;
  var gpsSN = document.getElementById("gps-sn").value;
  if ((xbeeSN.length==8) || (gpsSN.length==8)) {
    serialport.list(function (err, ports) {
      if (err) console.log(err);
      ports.forEach(function(port) {
        switch (port.serialNumber) {
          case xbeeSN:
            if (!xbee.is_connected()) {
              xbee.connect(port.comName);
              log.update('XBee port found at ' + port.comName);
            }
            break;
          case gpsSN:
            if (!gps.is_connected()) {
              gps.connect(port.comName);
              log.update('Local GPS port found at ' + port.comName);
            }
            
        } 
      });
      if (xbee.is_connected() && gps.is_connected()) {
        clearInterval(detectPortTicker);
      }
    });
  }
}

// On page load start autoDetectPort
detectPortTicker = setInterval(autoDetectPort, 1000);

