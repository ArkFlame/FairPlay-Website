// Compensation simulator logic
document.addEventListener('DOMContentLoaded', function () {
  var simulateBtn = document.getElementById('simulateBtn');
  simulateBtn.addEventListener('click', simulateCompensation);
});

function simulateCompensation() {
  var victims = parseInt(document.getElementById('victims').value, 10) || 0;
  var severity = parseFloat(document.getElementById('severity').value) || 1;
  var base = parseFloat(document.getElementById('base').value) || 0;

  // simple algorithm: total = base * victims * severity * decay
  var decay = 1 - Math.min(0.5, Math.log1p(victims) / 10); // one-line: small decay for many victims
  var total = Math.round(base * victims * severity * decay);
  var per = Math.round(total / Math.max(1, victims));

  // animate result
  animateNumber(document.getElementById('totalComp'), total, 'Total compensation: ');
  animateNumber(document.getElementById('perVictim'), per, 'Per victim: ');
}

function animateNumber(element, value, prefix) {
  var start = 0;
  var duration = 500;
  var range = value - start;
  var startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    var current = Math.round(start + range * easeOutCubic(progress));
    element.textContent = prefix + current + " coins";
    if (progress < 1) window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }
