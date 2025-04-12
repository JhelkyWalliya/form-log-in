// Daftar kota, negara, dll (bisa ditambah)
const dataKota = [
    "Jayapura",
    "Wamena",
    "Timika",
    "Sorong",
    "Manokwari",
    "Biak",
    "Merauke",
    "Sentani",
    "Yogyakarta",
    "Jakarta",
    "Bandung",
    "Surabaya"
];

// Dapatkan elemen input kota
const cityInput = document.getElementById('city');

// Buat elemen untuk menampilkan saran
const suggestionBox = document.createElement('div');
suggestionBox.style.border = "1px solid #ccc";
suggestionBox.style.maxHeight = "150px";
suggestionBox.style.overflowY = "auto";
suggestionBox.style.backgroundColor = "#fff";
suggestionBox.style.position = "absolute";
suggestionBox.style.width = cityInput.offsetWidth + "px";
suggestionBox.style.zIndex = "1000";
suggestionBox.style.display = "none"; // sembunyikan awal
document.body.appendChild(suggestionBox);

// Posisi suggestion box mengikuti input
cityInput.addEventListener("focus", () => {
    const rect = cityInput.getBoundingClientRect();
    suggestionBox.style.top = rect.bottom + window.scrollY + "px";
    suggestionBox.style.left = rect.left + window.scrollX + "px";
    suggestionBox.style.width = rect.width + "px";
});

// Event saat user mengetik
cityInput.addEventListener('input', function () {
    const keyword = cityInput.value.toLowerCase();
    suggestionBox.innerHTML = '';

    if (keyword === '') {
        suggestionBox.style.display = "none";
        return;
    }

    const filtered = dataKota.filter(kota => kota.toLowerCase().includes(keyword));

    filtered.forEach(kota => {
        const item = document.createElement('div');
        item.textContent = kota;
        item.style.padding = '8px';
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            cityInput.value = kota;
            suggestionBox.style.display = "none";
        });
        suggestionBox.appendChild(item);
    });

    suggestionBox.style.display = filtered.length ? "block" : "none";
});

// Sembunyikan saran saat klik di luar
document.addEventListener('click', function (e) {
    if (e.target !== cityInput && e.target.parentNode !== suggestionBox) {
        suggestionBox.style.display = "none";
    }
});
