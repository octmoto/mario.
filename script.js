const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score-value');

let score = 0;

// เริ่มนับเปอร์เซ็นต์เรนเดอร์ (เพิ่มขึ้น 1 ทุกๆ 100 มิลลิวินาที)
const scoreInterval = setInterval(() => {
    score++;
    scoreElement.innerText = score;
}, 100);

// ฟังก์ชันสั่งมาริโอ้กระโดด
const jump = () => {
    mario.classList.add('jump'); 
    setTimeout(() => {
        mario.classList.remove('jump'); 
    }, 500);
}

// ตรวจสอบการชนกันระหว่างมาริโอ้กับท่อ
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // ถ้าระยะท่อกับมาริโอ้ทับกัน (แพ้)
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        
        // หยุดท่อ
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        // หยุดมาริโอ้
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // เปลี่ยนรูปมาริโอ้เป็นตอนแพ้
        mario.src = 'game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // หยุดลูปทั้งหมด (หยุดเกมและหยุดนับเปอร์เซ็นต์)
        clearInterval(loop); 
        clearInterval(scoreInterval);
    }
}, 10);

// ดักจับการกดคีย์บอร์ด (ปุ่มใดก็ได้) หรือการคลิกจอ/แตะจอ เพื่อกระโดด
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump); // รองรับการแตะหน้าจอโทรศัพท์
document.addEventListener('mousedown', jump);  // รองรับการคลิกเมาส์