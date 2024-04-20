var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0"
}

function closemenu() {
    sidemenu.style.right = "-200px"
}

function populateTrendingAnime(data) {
    const itemsPerPage = 8; // Jumlah item per halaman
    const totalPages = Math.ceil(data.length / itemsPerPage);

    let currentPage = 1;

    // Function untuk menampilkan data berdasarkan halaman
    function displayData(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedData = data.slice(startIndex, endIndex);

        const trendingContainer = document.querySelector('.trending__anime');
        trendingContainer.innerHTML = ''; // Kosongkan kontainer sebelum menambahkan item baru

        slicedData.forEach(anime => {
            const animeItem = `
            <div class="product__item">
                <div class="product__item__pic set-bg" data-setbg="${anime.image_urls}" style="background-image: url(${anime.image_urls})">
                    <div class="rank">Rank ${anime.rank}</div>
                    <div class="layer">
                            <p> Alt Title: ${anime.altTittle} </p>
                            <p> Rating: ${anime.rating} </p>
                            <p> Type: ${anime.type} </p>
                            <p> Volumes: ${anime.volumes} </p>
                            <p> Chapters: ${anime.chapters} </p>
                            <a href="${anime.manga_mal_url}"><i class="fa-solid fa-link"></i></a>
                    </div>
                </div>
                <div class="product__item__text">
                    <a href="${anime.manga_mal_url}">${anime.title}</a>
                </div>
            </div>      
            `;

            trendingContainer.innerHTML += animeItem;
        });

        // Set background image using data-setbg
        const setBgElements = document.querySelectorAll('.set-bg');
        setBgElements.forEach(el => {
            const bgUrl = el.getAttribute('data-setbg');
            el.style.backgroundImage = `url("${bgUrl}")`;
        });
    }

    // Menampilkan data pada halaman pertama saat pertama kali memuat
    displayData(currentPage);

    // Membuat navigasi pagination
    const paginationElement = document.getElementById('pagination');

    function setupPagination() {
        paginationElement.innerHTML = '';    
        // Tombol "prev"
        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        const prevLink = document.createElement('button');
        prevLink.classList.add('page-link');
        prevLink.textContent = 'Prev';
        prevLink.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                displayData(currentPage);
            }
        });
        prevLi.appendChild(prevLink);
        paginationElement.appendChild(prevLi);
        // Tombol "next"
        const nextLi = document.createElement('li');
        nextLi.classList.add('page-item');
        const nextLink = document.createElement('button');
        nextLink.classList.add('page-link');
        nextLink.textContent = 'Next';
        nextLink.addEventListener('click', function () {
            if (currentPage < totalPages) {
                currentPage++;
                displayData(currentPage);
            }
        });
        nextLi.appendChild(nextLink);
        paginationElement.appendChild(nextLi);
    }

    setupPagination();
}

function populateSlider(data) {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let slideIndex = 0;

    // Function untuk menambahkan slide
    function addSlide(index) {
        if (index >= 0 && index < data.length) {
            const manga = data[index];
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.innerHTML = `
                <img src="${manga.image_urls[0]}" alt="${manga.title}">
                <div class="slide-content">
                    <h2>${manga.title}</h2>
                    <p>${manga.synopsis}</p>
                </div>
            `;
            slider.appendChild(slide);
        }
    }

    // Function untuk menampilkan slide berikutnya
    function nextSlide() {
        if (slideIndex < data.length - 1) {
            slideIndex++;
            if (slideIndex > 4) {
                slideIndex = 0;
            }
        } else {
            slideIndex = 0;
        }
        showSlide();
    }

    // Function untuk menampilkan slide sebelumnya
    function prevSlide() {
        if (slideIndex > 0) {
            slideIndex--;
        } else {
            slideIndex = 4;
        }
        showSlide();
    }

    // Function untuk menampilkan slide yang sesuai dengan index
    function showSlide() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    // Tambahkan slide pertama saat halaman dimuat
    addSlide(0);

    // Tambahkan slide-slide berikutnya
    for (let i = 1; i < 5; i++) {
        addSlide(i);
    }

    // Tampilkan slide pertama
    showSlide();

    // Tambahkan event listener untuk tombol navigasi
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}