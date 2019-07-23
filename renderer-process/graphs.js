/*****************************************************************************
 Graphs (using Charts.js)
 ****************************************************************************/

 var altChart;
 
$(document).ready(function() {
  var ctx1 = document.getElementById("altChart").getContext('2d');

  var canvasWidth = $("#content-bar").width();
  var canvasHeight = ctx1.canvas.height;

  var gradientFill = ctx1.createLinearGradient(0, 0, 0, ctx1.canvas.height);
  gradientFill.addColorStop(1, "rgba(58, 63, 58, 0.1)");
  gradientFill.addColorStop(0, "rgba(91, 192, 222, 0.6)");

  altChart = new Chart(ctx1, {
      type: 'line',
      data: {
      datasets: [{
          label: 'altitude',
          borderColor: 'rgba(91,192,222,0.4)',
          pointBackgroundColor: '#5bc0de',
          pointBorderColor: '#5bc0de',
          fill: true,
          backgroundColor: gradientFill,
          pointRadius: 2,
          lineTension: 0,
          data: []
      }]
      },
      options: {
      legend: {display: false},
      scales: {
          xAxes: [{
          type: 'time',
          time: {unit: 'minute'},
          ticks: {fontColor: '#fff'},
          gridLines: {
              zeroLineColor: '#7A8288',
              color: '#3A3F44'
          }
          }],
          yAxes: [{
          ticks: {
              beginAtZero:true,
              fontColor: '#fff'
          },
          display: true,
          scaleLabel: {
              display: true,
              labelString: 'Altitude (m)',
              fontColor: '#fff'
          },
          gridLines: {
              zeroLineColor: '#7A8288',
              color: '#3A3F44'
          }
          }]
      }
      }
  });
});