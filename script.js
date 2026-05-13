const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score-value');
const scoreContainer = document.querySelector('.score'); // ดึงส่วนแสดงผลคะแนนทั้งหมดมา

let score = 0;

// เริ่มนับเปอร์เซ็นต์เรนเดอร์
const scoreInterval = setInterval(() => {
    score++;
    scoreElement.innerText = score;

    // เงื่อนไข: เมื่อครบ 100%
    if (score >= 100) {
        clearInterval(scoreInterval); // หยุดนับเลข
        scoreContainer.innerHTML = '✅ เรนเดอร์เสร็จสมบูรณ์!'; // เปลี่ยนข้อความบนหน้าจอ
        scoreContainer.style.color = '#2ecc71'; // เปลี่ยนเป็นสีเขียวให้ดูว่าเสร็จแล้ว (แถมให้ครับ)
    }
}, 1000); // ปรับความเร็วตรงนี้ (1000 = 1 วินาทีต่อ 1%)

// ฟังก์ชันสั่งมาริโอ้กระโดด
const jump = () => {
    mario.classList.add('jump'); 
    setTimeout(() => {
        mario.classList.remove('jump'); 
    }, 800); // ปรับเวลาให้สัมพันธ์กับ CSS (แนะนำ 800ms สำหรับโหมดช้า)
}

// ตรวจสอบการชน (Game Over)
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // ถ้าระยะท่อกับมาริโอ้ทับกัน
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        
        // หยุดทุกอย่าง
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // เปลี่ยนรูปมาริโอ้เป็นตอนแพ้
        mario.src = 'game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // หยุดการทำงานของเกมและหยุดนับเปอร์เซ็นต์ทันทีที่ชน
        clearInterval(loop); 
        clearInterval(scoreInterval);
        
        // แจ้งเตือนเมื่อเรนเดอร์ค้าง (แพ้)
        scoreContainer.innerHTML = '❌ เรนเดอร์ค้าง! (Game Over)';
        scoreContainer.style.color = '#e74c3c';
    }
}, 10);

// ดักจับการสั่งกระโดด
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump); 
document.addEventListener('mousedown', jump);