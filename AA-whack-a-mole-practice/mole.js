let score = 0;
let molesLeft = 30;
let popupLength = 2000;
let hideTimeout;

function popUpRandomMole() {
  if (molesLeft <= 0) {
    document.querySelector('.sb__game-over').classList.add('sb__game-over--visible');
    return;
  }

  const moleHeads = document.querySelectorAll('.wgs__mole-head.wgs__mole-head--hidden');

  if (moleHeads.length === 0) {
    return;
  }
  
  const moleIndex = Math.floor(Math.random() * moleHeads.length);
  const moleHead = moleHeads[moleIndex];

  moleHead.classList.remove('wgs__mole-head--hidden');

  molesLeft -= 1;
  document.querySelector('.sb__moles').innerHTML = molesLeft;

  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);
}

function hideMole(mole) {
  mole.classList.add('wgs__mole-head--hidden');
  setTimeout(popUpRandomMole, 150);
}

const moleHeads = document.querySelectorAll('.wgs__mole-head');
for (let moleHead of moleHeads) {
  moleHead.addEventListener('click', event => {
    if (event.target.classList.contains('wgs__mole-head--hidden')) return;

    score += 1;
    document.querySelector('.sb__score').innerHTML = score;

    clearTimeout(hideTimeout);
    hideMole(event.target);

    // Create ripple
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    event.target.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Initially, hide all the moles
  for (let moleHead of moleHeads) {
    moleHead.classList.add('wgs__mole-head--hidden');
  }

  // Start the game after a small delay
  setTimeout(popUpRandomMole, 1000);
});

// Ripple effect
let isRippleActive = false;

document.addEventListener('click', event => {
  if (isRippleActive) return;

  isRippleActive = true;

  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.left = `${event.clientX}px`;
  ripple.style.top = `${event.clientY}px`;
  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
    isRippleActive = false;
  }, 600);
});
