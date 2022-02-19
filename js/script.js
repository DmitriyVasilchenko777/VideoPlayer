// Получаем все кнопки и вешаем на них события клика

document.querySelector("#play").onclick = play;
document.querySelector("#pause").onclick = pause;
document.querySelector("#stop").onclick = stop;
document.querySelector("#speed-up").onclick = speedUp;
document.querySelector("#speed-down").onclick = speedDown;
document.querySelector("#speed-norm").onclick = speedNorm;
document.querySelector("#volume").oninput = videoVolume;

let video;
let display;
let progress;

let timeCurrent = document.querySelector("#time-current");
let timeDuration = document.querySelector("#time-duration");

// Получаем элимент video и progress

video = document.querySelector("#video-player");
progress = document.querySelector("#progress");

// Функция сробатывает каждый раз при воспроизвидении видео

video.ontimeupdate = progressUpdate;
progress.onclick = videoRewind;

function play()
{
    video.play();
}

function pause()
{
    
    video.pause();
}

function stop()
{
    
    video.pause();

    // Обнуляем текущее время и начинаем видео заново

    video.currentTime = 0;
}

function speedUp()
{
    video.play();

    // Ускоряем видео

    video.playbackRate = 2;
}

function speedDown()
{
    video.play();
    video.playbackRate = 0.5;
}

function speedNorm()
{
    video.play();
    video.playbackRate = 1;
}

function videoVolume()
{
    // Получаем текущее значение ползунка

    let v = this.value;

    // Устанавливаем звук в процентах в зависимости от текущего положения    ползунка

    video.volume = v / 100;
}

function progressUpdate()
{

    // Получаем общее врямя видео и удаляем символы после точки

    let d = video.duration.toFixed();

    // Получаем текущее время 

    let c = video.currentTime.toFixed();

    // Обновляем элимент progress 

    progress.value = (100 * c) / d;

    // Обновляем и выводим время пользователю

    timeCurrent.innerHTML = String(c) + " seconds";
    timeDuration.innerHTML = String(d) + " seconds";
}

function videoRewind(event)
{

    // Получаем ширину элимента progressa

    let w = this.offsetWidth;

    // Получаем то место где был произвиден клик 

    let o = event.offsetX;

    // Устанавливаем значение progressa в указаном месте

    this.value = 100 * o / w;

    video.pause();
    video.currentTime = video.duration * (o / w);
    video.play();
}