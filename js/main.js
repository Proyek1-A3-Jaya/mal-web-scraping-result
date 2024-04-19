var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0"
}

function closemenu() {
    sidemenu.style.right = "-200px"
}

function populateTrendingAnime(data) {
    const trendingContainer = document.querySelector('.trending__anime'); // Selector untuk container "Trending Now"

    data.forEach(anime => {
        const animeItem = `
        <div class="product__item">
            <div class="product__item__pic set-bg" data-setbg="${anime.image_urls}">
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