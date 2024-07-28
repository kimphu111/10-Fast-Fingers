//Tất cả code js e đều lấy từ trên mạng e đang k hiểu về phần js 
// em chỉ k hiểu tất cả js nhma e đang xem ạ

const words = [
    "anh", "bạn", "chạy", "đi", "em", "phải", "giữ", "học", "in", "khi", "làm", "mới", "nếu", "ông", "phải", "quên", "rằng", "sao", "từ", "uống", "vào", "xem", "yêu", "giải", "bài", "cô", "đẹp", "giàu", "hiểu", "in", "kêu", "làm", "mất", "nhớ", "ông", "phải", "quên", "rằng", "sao", "từ", "uống", "vào", "xem", "yêu", "giải", "bài", "cô", "đẹp", "giàu", "hiểu", "in", "kêu", "làm", "mất", "nhớ", "ông", "phải", "quên", "rằng", "sao", "từ", "uống", "vào", "xem", "yêu", "giải", "bài", "cô", "đẹp", "giàu", "hiểu", "in"
];

let currentWord = "";
let score = 0;
let timeLeft = 60;
let timer;

// Lấy các phần tử DOM
const wordDisplay = document.getElementById('word-display');
const typingInput = document.getElementById('typing-input');
const timerDisplay = document.getElementById('timer-display');
const scoreDisplay = document.getElementById('score-display');
const result = document.getElementById('result');

// Hàm bắt đầu trò chơi
function startGame() {
    score = 0;
    timeLeft = 60;
    typingInput.value = "";
    result.textContent = "";
    scoreDisplay.textContent = score;
    scoreDisplay.classList.remove('positive', 'negative');

    // Hiển thị từ đầu tiên
    getNextWord();

    // Xóa bất kỳ interval nào trước khi bắt đầu cái mới
    clearInterval(timer);

    // Bắt đầu đồng hồ
    timer = setInterval(updateTimer, 1000);

    // Lắng nghe sự kiện khi người dùng nhập
    typingInput.addEventListener('keypress', handleTyping);
}

// Hàm cập nhật thời gian
function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        typingInput.removeEventListener('keypress', handleTyping);
        displayResult();
    } else {
        timeLeft--;
        timerDisplay.textContent = `Thời gian còn: ${timeLeft}s`;
    }
}

// Hàm xử lý khi người dùng nhập
function handleTyping(event) {
    if (event.key === "Enter") {
        if (typingInput.value.trim() === currentWord) {
            score++;
            scoreDisplay.classList.add('positive');
        } else {
            score--;
            scoreDisplay.classList.add('negative');
        }
        scoreDisplay.textContent = score;
        typingInput.value = "";
        getNextWord();
    }
}

// Hàm lấy từ ngẫu nhiên và hiển thị
function getNextWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    wordDisplay.textContent = currentWord;
}

// Hàm hiển thị kết quả
function displayResult() {
    result.textContent = `Chúc mừng điểm của bạn: ${score}`;
}

// Gán sự kiện cho nút "Bắt đầu chơi"
document.querySelector('button').addEventListener('click', startGame);

// Cập nhật màu sắc bàn phím khi người dùng nhấn phím
document.addEventListener('keydown', function(event) {
    const keyElements = document.querySelectorAll('.key');
    keyElements.forEach(key => {
        if (key.getAttribute('data-key') === event.keyCode.toString()) {
            key.classList.add('active');
            setTimeout(() => key.classList.remove('active'), 100);
        }
    });
});
