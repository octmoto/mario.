const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump'); // เพิ่มคลาส jump เพื่อเล่น Animation

    setTimeout(() => {
        mario.classList.remove('jump'); // ลบคลาสออกเมื่อกระโดดเสร็จ (500ms)
    }, 500);
}

// ตรวจสอบการชน (Check Collision) ทุกๆ 10 มิลลิวินาที
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    // ดึงค่าตำแหน่งแนวตั้งของมาริโอ้ (ใช้ getComputedStyle เพราะค่าเปลี่ยนตาม Animation)
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // ถ้าท่อวิ่งมาถึงตัวมาริโอ้ (ช่วง 0-120px) และมาริโอ้ไม่ได้กระโดดสูงพ้นท่อ (< 80px)
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        
        // หยุด Animation ทั้งหมด
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // เปลี่ยนรูปมาริโอ้เป็นตอนแพ้ (ถ้ามีรูป)
        mario.src = 'game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop); // หยุดการทำงานของ Loop
        alert('Game Over!');
    }
}, 10);

// ดักจับการกดปุ่มบน Keyboard (ปุ่มใดก็ได้) เพื่อกระโดด
document.addEventListener('keydown', jump);