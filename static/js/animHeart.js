const heartsContainer = document.getElementById('hearts');

// Настройки, которые можно менять
const heartSettings = {
    numberOfHearts: 30,        // Количество сердец на экране
    minSize: 15,               // Минимальный размер сердца (px)
    maxSize: 35,               // Максимальный размер сердца (px)
    fallSpeedMin: 1,           // Минимальная скорость падения (px/frame)
    fallSpeedMax: 3,           // Максимальная скорость падения
    rotationSpeedMin: -5,      // Минимальная скорость вращения (deg/frame)
    rotationSpeedMax: 5,       // Максимальная скорость вращения
    heartColor: 'red',         // Цвет сердец
    spawnDelay: 200            // Задержка между созданием сердец (ms)
};

// Функция создания сердца
function createHeart() {
    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = `${random(heartSettings.minSize, heartSettings.maxSize)}px`;
    heart.style.color = heartSettings.heartColor;
    heart.style.left = `${random(0, window.innerWidth)}px`;
    heart.style.top = `-${heart.style.fontSize.replace('px', '')}px`;
    heart.style.pointerEvents = 'none';
    heart.style.userSelect = 'none';

    // Дополнительные параметры для анимации
    heart.fallSpeed = random(heartSettings.fallSpeedMin, heartSettings.fallSpeedMax);
    heart.rotation = random(0, 360);
    heart.rotationSpeed = random(heartSettings.rotationSpeedMin, heartSettings.rotationSpeedMax);

    heartsContainer.appendChild(heart);
    return heart;
}

// Функция для генерации случайного числа между min и max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Основная анимация
function animateHearts() {
    const hearts = document.querySelectorAll('#hearts div');
    hearts.forEach(heart => {
        // Двигаем сердце вниз
        const top = parseFloat(heart.style.top);
        heart.style.top = `${top + heart.fallSpeed}px`;

        // Вращаем
        heart.rotation += heart.rotationSpeed;
        heart.style.transform = `rotate(${heart.rotation}deg)`;

        // Если сердце ушло за экран — переносим наверх
        if (top > window.innerHeight) {
            heart.style.top = `-${heart.style.fontSize.replace('px','')}px`;
            heart.style.left = `${random(0, window.innerWidth)}px`;
        }
    });

    requestAnimationFrame(animateHearts);
}

// Генерация сердец
for (let i = 0; i < heartSettings.numberOfHearts; i++) {
    setTimeout(createHeart, i * heartSettings.spawnDelay);
}

// Запуск анимации
animateHearts();
