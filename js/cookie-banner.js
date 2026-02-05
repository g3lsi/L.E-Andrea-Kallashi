(function () {
  var KEY = 'cookieConsent';
  var BANNER_ID = 'cookie-banner';
  var ACCEPT_ID = 'cookie-banner-accept';

  function showBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el) el.style.display = 'block';
  }

  function hideBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el) el.style.display = 'none';
  }

  function accept() {
    try {
      localStorage.setItem(KEY, 'true');
    } catch (e) {}
    hideBanner();
  }

  if (!document.getElementById(BANNER_ID)) return;
  try {
    if (localStorage.getItem(KEY) === 'true') {
      hideBanner();
      return;
    }
  } catch (e) {}
  showBanner();

  var btn = document.getElementById(ACCEPT_ID);
  if (btn) btn.addEventListener('click', accept);
})();
