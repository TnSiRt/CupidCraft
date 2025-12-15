const sections = document.querySelectorAll('section');
let currentIndex = 0;

// Устанавливаем первую секцию активной
sections[currentIndex].classList.add('active');

function goToSection(nextIndex) {
    if (nextIndex < 0 || nextIndex >= sections.length) return;

    const current = sections[currentIndex];
    const next = sections[nextIndex];
    const anim = next.dataset.anim || 'fade';

    // Убираем активный класс с текущей секции
    current.classList.remove('active');

    // Добавляем стартовое состояние анимации для следующей секции
    next.classList.add('enter');

    // Делаем переход через небольшую задержку
    requestAnimationFrame(() => {
        next.classList.add('active');
        next.classList.remove('enter');
    });

    currentIndex = nextIndex;
}

// Пример перехода на следующую секцию по кнопке
document.getElementById('start_btn').addEventListener('click', () => {
    goToSection(currentIndex + 1);
    animateAssociationSection();
});

document.getElementById("toCollage").addEventListener("click", () => {
    goToSection(currentIndex + 1);
});


document.getElementById("toStatistics").addEventListener("click", () => {
    goToSection(currentIndex + 1);
});
