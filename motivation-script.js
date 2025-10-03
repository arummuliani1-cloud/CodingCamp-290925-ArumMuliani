// Daftar motivasi keren
const quotes = [
    { quote: "Kesuksesan adalah kumpulan dari upaya kecil yang diulang setiap hari.", source: "Robert Collier" },
    { quote: "Jalan menuju kesuksesan dan jalan menuju kegagalan hampir sama persis.", source: "Colin R. Davis" },
    { quote: "Mulailah dari mana Anda berada. Gunakan apa yang Anda miliki. Lakukan apa yang Anda bisa.", source: "Arthur Ashe" },
    { quote: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang Anda lakukan.", source: "Steve Jobs" },
    { quote: "Waktu adalah aset paling berharga. Manfaatkan setiap detik di daftar tugasmu.", source: "Anonim" },
    { quote: "Hidupmu tidak membaik secara kebetulan, ia membaik dengan perubahan.", source: "Jim Rohn" },
    { quote: "Jangan tunda sampai besok apa yang dapat Anda lakukan hari ini.", source: "Benjamin Franklin" },
    { quote: "Fokus pada progres, bukan pada kesempurnaan.", source: "Anonim" },
    { quote: "Disiplin adalah jembatan antara tujuan dan pencapaian.", source: "Jim Rohn" }
];

// Fungsi untuk mendapatkan motivasi acak yang berubah setiap hari
function getDailyQuote() {
    const today = new Date();
    // Menghitung angka unik untuk hari ini
    const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    
    // Memastikan quote yang sama muncul di hari yang sama
    const quoteIndex = dayNumber % quotes.length;
    
    return quotes[quoteIndex];
}

// Fungsi untuk menampilkan quote di halaman
function displayQuote() {
    const dailyQuote = getDailyQuote();
    
    document.getElementById('daily-quote').textContent = dailyQuote.quote;
    document.getElementById('quote-source').textContent = '— ' + dailyQuote.source;
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayQuote);