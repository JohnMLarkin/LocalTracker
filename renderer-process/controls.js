function panToBalloon() {
  var i = balloonWP.length;
  if (i>0) {
    var lastLat = balloonWP[i-1].lat;
    var lastLng = balloonWP[i-1].lng;
    map.setCenter({lat: lastLat, lng: lastLng}, true);
  }
}

function panToMe() {
  var i = carWP.length;
  if (i>0) {
    var lastLat = carWP[i-1].lat;
    var lastLng = carWP[i-1].lng;
    map.setCenter({lat: lastLat, lng: lastLng}, true);
  }
}

function showBalloonAndMe() {
  var i = carWP.length;
  if (i>0) {
    var carLat = carWP[i-1].lat;
    var carLng = carWP[i-1].lng;
  }
  var j = balloonWP.length;
  if (j>0) {
    var balloonLat = balloonWP[j-1].lat;
    var balloonLng = balloonWP[j-1].lng;
  }
  var deltaLat = Math.abs(carLat - balloonLat) + 0.01;
  var deltaLng = Math.abs(carLng - balloonLng) + 0.01;
  var centerLat = (carLat+balloonLat)/2.0;
  var centerLng = (carLng+balloonLng)/2.0;
  var tlLat = centerLat + deltaLat;
  var tlLng = centerLng - deltaLng;
  var brLat = centerLat - deltaLat;
  var brLng = centerLng + deltaLng;
  var bbox = new H.geo.Rect(tlLat, tlLng, brLat, brLng);
  map.getViewModel().setLookAtData({
    bounds: bbox
  });
}

function downloadMaps() {
  var viewBounds; // If undefined, defaults to visible area of map
  // var bb = map.getViewModel().getLookAtData().bounds.getBoundingBox();
  try {
    map.storeContent(downloadCB, viewBounds, 20, 20, defaultLayers.vector.normal.map)
  }
  catch(err) {
    var alert = document.createElement("div");
    alert.setAttribute("class","alert alert-danger alert-dismissible");
    alert.setAttribute("style","margin-top: 10px;");
    alert.id = "downloadCompleteAlert";
    var alertHead = document.createElement("h5");
    alertHead.innerHTML = "Download failed!"
    var alertBody = document.createElement("p");
    alertBody.innerHTML = err.message;
    alert.appendChild(alertHead);
    alert.appendChild(alertBody);
    var db = document.createElement("button");
    db.setAttribute("class", "close");
    db.setAttribute("data-dismiss", "alert");
    db.setAttribute("aria-label","Close");
    var xs = document.createElement("span");
    xs.setAttribute("aria-hidden","true");
    xs.innerHTML="&times;";
    db.appendChild(xs);
    alert.appendChild(db);
    var cb = document.getElementById("downloadCard");
    cb.appendChild(alert);
  }
}

function downloadCB(req) {
  if (req.getState() === H.util.Request.State.COMPLETE) {
    var alert = document.createElement("div");
    alert.setAttribute("class","alert alert-success alert-dismissible");
    alert.setAttribute("style","margin-top: 10px;");
    alert.id = "downloadCompleteAlert";
    alert.innerHTML = "Download complete";
    var db = document.createElement("button");
    db.setAttribute("class", "close");
    db.setAttribute("data-dismiss", "alert");
    db.setAttribute("aria-label","Close");
    var xs = document.createElement("span");
    xs.setAttribute("aria-hidden","true");
    xs.innerHTML="&times;";
    db.appendChild(xs);
    alert.appendChild(db);
    var cb = document.getElementById("downloadCard");
    cb.appendChild(alert);
  }
}
