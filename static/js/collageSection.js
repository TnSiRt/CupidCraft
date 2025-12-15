function createCollage() {
	const c1 = document.getElementById("collage-bg1");
	const c2 = document.getElementById("collage-bg2");

	// Загружаем одинаковый набор фото в оба контейнера
	for (let i = 1; i <= 20; i++) {
		let img1 = document.createElement("img");
		img1.src = `/static/image/photo${i}.jpg`;
		c1.appendChild(img1);

		let img2 = document.createElement("img");
		img2.src = `/static/image/photo${i}.jpg`;
		c2.appendChild(img2);
	}

	// Первый слой — стартует сверху
	c1.style.top = "0%";
	c1.style.animation = "scroll 25s linear infinite";

	// Второй слой — сразу за пределами секции
	c2.style.top = "-100%";
	c2.style.animation = "scroll 25s linear infinite";
}

createCollage();
