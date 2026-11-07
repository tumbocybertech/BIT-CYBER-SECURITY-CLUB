'use strict';
/* No backend, no keys: forms open the visitor's email app (mailto). Change MAIL to your club address. */
const MAIL = 'cyber.shield@example.com';
const LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 4 8 13v18c0 15 10 25 24 29 14-4 24-14 24-29V13z" fill="#071a33" stroke="#00ff9c" stroke-width="3"/><path d="M32 12 15 18v13c0 11 7 18 17 21 10-3 17-10 17-21V18z" fill="none" stroke="#18d4ff" stroke-width="1.5"/><rect x="24" y="30" width="16" height="12" rx="2" fill="#00ff9c"/><path d="M27 30v-4a5 5 0 0110 0v4" fill="none" stroke="#00ff9c" stroke-width="3"/></svg>';
const PAGES = [['index','Home'],['about','About'],['departments','Departments'],['activities','Activities'],['learning','Learning Hub'],['events','Events'],['team','Team'],['contact','Contact']];
document.documentElement.classList.add('js');
const cur = location.pathname.split('/').pop() || 'index.html';
const link = ([f, n]) => `<a href="${f}.html"${cur === f + '.html' ? ' aria-current="page"' : ''}>${n}</a>`;

/* Shared header and footer */
document.getElementById('hdr').innerHTML = `<div class="bar"><a class="brand" href="index.html">${LOGO}<span>BIT CYBER SHIELD</span></a><button id="mb" aria-expanded="false" aria-controls="nav" aria-label="Toggle menu">&#9776;</button><nav id="nav" aria-label="Main">${PAGES.map(link).join('')}<a class="btn" href="join.html">Join Us</a></nav></div>`;
document.getElementById('ftr').innerHTML = `<div class="w"><div><a class="brand" href="index.html">${LOGO}<span>BIT CYBER SHIELD CLUB</span></a><p>Securing the Digital Future. Baobab Institute of Tanzania.</p></div><p><strong>Legal use only.</strong> All practical cybersecurity activities in this club are authorized, supervised and conducted legally. Never test systems you do not own or have written permission to test.</p><p>${PAGES.map(link).join(' · ')} · <a href="join.html">Join</a></p></div>`;
const mb = document.getElementById('mb'), nav = document.getElementById('nav');
mb.onclick = () => { const o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', o); };

/* Scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* Back to top */
const topBtn = document.getElementById('top');
addEventListener('scroll', () => { topBtn.hidden = scrollY < 500; }, { passive: true });
topBtn.onclick = () => scrollTo({ top: 0 });

/* Animated binary background */
(function () {
  const cv = document.getElementById('bg'), ctx = cv.getContext('2d'), fs = 16;
  let drops = [];
  const size = () => { cv.width = innerWidth; cv.height = innerHeight; drops = Array.from({ length: Math.ceil(cv.width / fs) }, () => Math.random() * -50); };
  size(); addEventListener('resize', size);
  function draw() {
    ctx.fillStyle = 'rgba(2,4,10,.1)'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = '#00ff9c'; ctx.font = fs + 'px monospace';
    drops.forEach((y, i) => { ctx.fillText(Math.random() > .5 ? '1' : '0', i * fs, y * fs); drops[i] = y * fs > cv.height && Math.random() > .975 ? 0 : y + 1; });
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(draw, 70);
})();

/* Searchable learning resources */
const q = document.getElementById('q');
if (q) q.addEventListener('input', () => {
  const v = q.value.trim().toLowerCase();
  let n = 0;
  document.querySelectorAll('#res .card').forEach(c => { const m = c.textContent.toLowerCase().includes(v); c.hidden = !m; if (m) n++; });
  document.getElementById('count').textContent = n + ' resource' + (n === 1 ? '' : 's') + ' found';
});

/* Forms: validate, then open the visitor's email app. Values are length-limited and URL-encoded. */
document.querySelectorAll('form[data-subject]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  if (!f.checkValidity()) { f.reportValidity(); return; }
  const body = [...new FormData(f)].map(([k, v]) => k + ': ' + String(v).trim().slice(0, 1000)).join('\n');
  location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(f.dataset.subject) + '&body=' + encodeURIComponent(body);
  const o = f.querySelector('.ok'); o.hidden = false;
  o.textContent = 'Thank you. Your email app should open with your details ready to send. If it does not, email ' + MAIL + ' directly.';
}));
