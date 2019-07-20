window.onload= function() {
    if (settings.has('xbeeSN')) {
      document.getElementById("xbee-sn").value = settings.get('xbeeSN');
    }
    if (settings.has('gpsSN')) {
      document.getElementById("gps-sn").value = settings.get('gpsSN');
    }
    document.getElementById('xbee-sn').addEventListener('change', change_xbee_sn.bind(null, event), false);
    document.getElementById('gps-sn').addEventListener('change', change_gps_sn.bind(null, event), false);
  };
  
function change_xbee_sn(event) {
  var sn = document.getElementById('xbee-sn').value;
  if (sn.length==8) settings.set('xbeeSN',sn);
}

function change_gps_sn(event) {
  var sn = document.getElementById('gps-sn').value;
  if (sn.length==8) settings.set('gpsSN',sn);
}