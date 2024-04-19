// Ambil data dari hasil.json
fetch('manga_data.json')
    .then(response => response.json())
    .then(data => {
        // Panggil fungsi untuk mengisi data ke template
        populateTrendingAnime(data);
    })
    .catch(error => console.error('Error:', error));