var logLines = [];
const maxLines = 50;

function update(newLine) {
  while (logLines.length>maxLines) logLines.shift();
  logLines.push(newLine);
  document.getElementById('modemConsole').innerHTML = logLines.join("<br>");
}

module.exports.update = update;