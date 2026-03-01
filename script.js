const landingScreen = document.querySelector('#landing-screen');
const enterSiteButton = document.querySelector('#enter-site');

if (landingScreen && enterSiteButton) {
  document.body.classList.add('has-gate');

  enterSiteButton.addEventListener('click', () => {
    document.body.classList.remove('has-gate');
    document.body.classList.add('site-entered');
    landingScreen.setAttribute('aria-hidden', 'true');
  });
}
