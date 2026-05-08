const techCards = Array.from(document.querySelectorAll('.tech-card'));
const nextButton = document.querySelector('.carousel-nav.next');
const prevButton = document.querySelector('.carousel-nav.prev');
const indicatorsContainer = document.querySelector('.carousel-indicators');
let activeIndex = 0;
let autoRotate;

function createIndicators() {
    if (!indicatorsContainer) return;
    indicatorsContainer.innerHTML = '';
    techCards.forEach((card, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'indicator';
        dot.setAttribute('aria-label', `Show ${card.dataset.skill}`);
        dot.addEventListener('click', () => {
            setActiveCard(index);
            resetAutoRotate();
        });
        indicatorsContainer.appendChild(dot);
    });
}

function updateIndicators() {
    const dots = Array.from(document.querySelectorAll('.indicator'));
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function setActiveCard(index) {
    activeIndex = (index + techCards.length) % techCards.length;
    techCards.forEach((card, cardIndex) => {
        card.classList.toggle('active', cardIndex === activeIndex);
        if (cardIndex !== activeIndex) {
            card.classList.remove('flipped');
        }
    });
    const activeCard = techCards[activeIndex];
    if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    updateIndicators();
}

function nextCard() {
    setActiveCard(activeIndex + 1);
}

function prevCard() {
    setActiveCard(activeIndex - 1);
}

function resetAutoRotate() {
    clearInterval(autoRotate);
    autoRotate = setInterval(nextCard, 6500);
}

techCards.forEach((card, index) => {
    const frontFace = card.querySelector('.card-front');
    const backFace = card.querySelector('.card-back');
    if (frontFace) {
        const hint = document.createElement('div');
        hint.className = 'flip-hint';
        hint.textContent = 'Click card to flip';
        frontFace.appendChild(hint);

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'flip-button';
        button.textContent = 'Flip';
        frontFace.appendChild(button);
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            card.classList.toggle('flipped');
        });
    }
    if (backFace) {
        const backButton = document.createElement('button');
        backButton.type = 'button';
        backButton.className = 'flip-button';
        backButton.textContent = 'Back';
        backFace.appendChild(backButton);
        backButton.addEventListener('click', (event) => {
            event.stopPropagation();
            card.classList.toggle('flipped');
        });
    }
    card.addEventListener('click', () => {
        if (card.classList.contains('active')) {
            card.classList.toggle('flipped');
        } else {
            setActiveCard(index);
            card.classList.add('flipped');
        }
    });
});

if (nextButton) {
    nextButton.addEventListener('click', (event) => {
        event.stopPropagation();
        nextCard();
        resetAutoRotate();
    });
}

if (prevButton) {
    prevButton.addEventListener('click', (event) => {
        event.stopPropagation();
        prevCard();
        resetAutoRotate();
    });
}

createIndicators();
setActiveCard(0);
autoRotate = setInterval(nextCard, 6500);

const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function setActiveNav(hash) {
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === hash);
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        setActiveNav(link.getAttribute('href'));
    });
});

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0.1,
};

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
            setActiveNav('#' + entry.target.id);
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

setActiveNav(window.location.hash || '#home');


