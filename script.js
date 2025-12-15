// Данные для статистики
let dataStat = {
    "days": { "title": "Дней вместе", "count": 564 },
    "coffe": { "title": "Кофе выпито", "count_a": 10, "count_b": 1000 },
    "love": { "title": "Сказанно люблю", "count_a": 10000, "count_b": 100 }
};

// Анимация чисел с callback
function animateCount(element, start, end, prefix = '', duration = 1000, decimals = 0, callback = null) {
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let value = start + (end - start) * (progress / duration);
        if (progress >= duration) value = end;
        element.textContent = prefix + value.toFixed(decimals);
        if (progress < duration) requestAnimationFrame(step);
        else if (callback) callback();
    }
    requestAnimationFrame(step);
}

// Создание карточки
function createStat(idContainer) {
    const container = document.getElementById(idContainer);
    const cardContent = container.querySelector(".card-content");

    let viewData = document.createElement("div");
    viewData.classList.add("viewdata");

    let contentData = document.createElement("div");
    contentData.classList.add("content");

    let titleData = document.createElement("div");
    titleData.classList.add("title");
    titleData.textContent = dataStat[idContainer].title;

    viewData.appendChild(titleData);
    viewData.appendChild(contentData);

    // Добавление данных
    if (idContainer === "days") {
        let mainData = document.createElement("div");
        mainData.textContent = "Вместе: 0";
        mainData.dataset.value = dataStat.days.count;
        contentData.appendChild(mainData);

        let dopInfo = document.createElement("div");
        dopInfo.textContent = "В годах: 0";
        dopInfo.dataset.value = ((dataStat.days.count / 30) / 12).toFixed(1);
        contentData.appendChild(dopInfo);

        let dopDopInfo = document.createElement("div");
        dopDopInfo.textContent = "В месяцах: 0";
        dopDopInfo.dataset.value = (dataStat.days.count / 30).toFixed(0);
        contentData.appendChild(dopDopInfo);

        // SVG сердце
        const heartWrapper = document.createElement("div");
        heartWrapper.classList.add("heart-wrapper");
        heartWrapper.innerHTML = `
        <svg
          id="heartScene"
          class="heart-svg"
          viewBox="0 0 300 300"
        >
          <defs>
            <clipPath id="heart-clip">
              <path
                d="
                  M 150 80
                  C 60 0, 0 120, 150 260
                  C 300 120, 240 0, 150 80
                  Z
                "
              />
            </clipPath>
          </defs>
          <path
            id="heart-stroke"
            d="
              M 150 80
              C 60 0, 0 120, 150 260
              C 300 120, 240 0, 150 80
              Z
            "
            fill="none"
            stroke="crimson"
            stroke-width="4"
          />
          <rect
            id="heart-fill"
            x="0"
            y="300"
            width="300"
            height="300"
            fill="crimson"
            clip-path="url(#heart-clip)"
          />
          <g id="arrow" opacity="0">
            <path d="M 40 40 L 260 260" stroke="black" stroke-width="2" />
            <path d="M 260 260 L 280 250" stroke="black" stroke-width="2" />
            <path d="M 260 260 L 250 280" stroke="black" stroke-width="2" />
          </g>
        </svg>
        `;
        contentData.appendChild(heartWrapper);

    } else if (idContainer === "coffe" || idContainer === "love") {
        const keyA = "count_a", keyB = "count_b";
        let meData = document.createElement("div");
        meData.textContent = "Я: 0";
        meData.dataset.value = dataStat[idContainer][keyA];
        contentData.appendChild(meData);

        let youData = document.createElement("div");
        youData.textContent = "Ты: 0";
        youData.dataset.value = dataStat[idContainer][keyB];
        contentData.appendChild(youData);

        let ourData = document.createElement("div");
        ourData.textContent = "Вместе: 0";
        ourData.dataset.value = Number(dataStat[idContainer][keyA]) + Number(dataStat[idContainer][keyB]);
        contentData.appendChild(ourData);
    }

    cardContent.appendChild(viewData);
}

// Создаём все карточки
["days", "coffe", "love"].forEach(createStat);

// Анимация чисел
function animateNumbersSequentially(elements, index = 0, onFinish = null) {
    if (index >= elements.length) { if(onFinish) onFinish(); return; }
    const div = elements[index];
    if(div.dataset.value) {
        let value = Number(div.dataset.value);
        let prefix = div.textContent.split(':')[0] + ': ';
        let decimals = prefix.includes("годах") ? 1 : 0;
        animateCount(div, 0, value, prefix, 800, decimals, () => {
            animateNumbersSequentially(elements, index + 1, onFinish);
        });
    } else {
        animateNumbersSequentially(elements, index+1, onFinish);
    }
}

// Анимация сердца
function animateHeartScene() {
    const fill = document.getElementById("heart-fill");
    const arrow = document.getElementById("arrow");
    const heart = document.getElementById("heartScene");

    // Заливка
    setTimeout(() => fill.style.transform = "translateY(-300px)", 1200);

    // Стрела + пульс
    setTimeout(() => {
        arrow.style.opacity = "1";
        arrow.style.transform = "translate(-120px, -120px)";
        heart.classList.add("pulse-heart");
    }, 2400);
}

// Вешаем обработчик на кнопки после создания карточек
document.querySelectorAll(".openCardButton").forEach(button => {
    button.addEventListener("click", function() {
        this.style.display = "none";
	this.closest(".stat-card").querySelector(".card-content").style.filter = "blur(0px)";
        const numberDivs = Array.from(this.closest(".stat-card")
                                    .querySelectorAll(".card-content div[data-value]"));
        animateNumbersSequentially(numberDivs, 0, animateHeartScene);
    });
});

