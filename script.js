const landingScreen = document.querySelector('#landing-screen');
const enterSiteButton = document.querySelector('#enter-site');
const cornerRabbit = document.querySelector('#corner-rabbit');

const rabbitCorners = [
  'corner-top-left',
  'corner-top-right',
  'corner-bottom-right',
  'corner-bottom-left'
];
const rabbitVisibleMs = 2000;
const rabbitHiddenMs = 2000;
const rabbitHopMs = 450;

let lastRabbitCorner = -1;
let rabbitCycleStarted = false;

function moveRabbitToDifferentCorner() {
  if (!cornerRabbit) {
    return;
  }

  let nextCorner = lastRabbitCorner;

  while (nextCorner === lastRabbitCorner) {
    nextCorner = Math.floor(Math.random() * rabbitCorners.length);
  }

  rabbitCorners.forEach((corner) => {
    cornerRabbit.classList.remove(corner);
  });

  cornerRabbit.classList.add(rabbitCorners[nextCorner]);
  lastRabbitCorner = nextCorner;
}

function cycleCornerRabbit() {
  if (!cornerRabbit) {
    return;
  }

  if (!document.body.classList.contains('site-entered')) {
    cornerRabbit.classList.remove('is-entering', 'is-exiting');
    cornerRabbit.classList.add('is-hidden');
    setTimeout(cycleCornerRabbit, rabbitHiddenMs);
    return;
  }

  moveRabbitToDifferentCorner();
  cornerRabbit.classList.remove('is-hidden', 'is-exiting');
  void cornerRabbit.offsetWidth;
  cornerRabbit.classList.add('is-entering');

  setTimeout(() => {
    cornerRabbit.classList.remove('is-entering');
    void cornerRabbit.offsetWidth;
    cornerRabbit.classList.add('is-exiting');
  }, Math.max(0, rabbitVisibleMs - rabbitHopMs));

  setTimeout(() => {
    cornerRabbit.classList.remove('is-exiting');
    cornerRabbit.classList.add('is-hidden');
  }, rabbitVisibleMs);

  setTimeout(cycleCornerRabbit, rabbitVisibleMs + rabbitHiddenMs);
}

function startCornerRabbitCycle() {
  if (!cornerRabbit || rabbitCycleStarted) {
    return;
  }

  rabbitCycleStarted = true;
  cornerRabbit.classList.add('is-hidden');
  cycleCornerRabbit();
}

if (landingScreen && enterSiteButton) {
  const skipGate = window.location.hash === '#site-shell';

  if (skipGate) {
    document.body.classList.add('site-entered');
    landingScreen.setAttribute('aria-hidden', 'true');
  } else {
    document.body.classList.add('has-gate');
  }

  enterSiteButton.addEventListener('click', () => {
    document.body.classList.remove('has-gate');
    document.body.classList.add('site-entered');
    landingScreen.setAttribute('aria-hidden', 'true');
    startCornerRabbitCycle();
  });

  startCornerRabbitCycle();
}
