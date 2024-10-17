document.querySelectorAll('.circle').forEach((circle) => {
    const percentage = circle.getAttribute('data-percentage');
    circle.style.background = `conic-gradient( purple ${percentage}%, transparent ${percentage}%)`;
});
