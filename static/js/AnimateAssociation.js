function animateAssociationSection() {
    const top = document.getElementById('top');
    const bottom = document.getElementById('bottom');
    const title = document.querySelector('#association .title');

    // Появление top
    setTimeout(() => {
        top.classList.add('show');
    }, 100); // небольшая задержка

    // Появление bottom через 0.8s после top
    setTimeout(() => {
        bottom.classList.add('show');
    }, 100 + 800);

    // Появление title через 0.8s после bottom
    setTimeout(() => {
        title.classList.add('show');
    }, 100 + 800 + 800);
}

// Вызываем функцию при переходе на секцию
document.getElementById('toCollage').addEventListener('click', () => {
    animateAssociationSection();
    // Потом можно переходить к следующей секции
});

