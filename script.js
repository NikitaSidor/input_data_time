let dateInput = document.querySelector('#datetime'),
time;
const sliderWapper = document.querySelector('.day.choice'),
    d = new Date(),
    day = ['вс','пн','вт','ср','чт','пт','cб'],
    hoursWork = [8,10,12,14,16,18,20];

//вывод дня
function boxDate(number){
    let dateNow;
    const elem = document.createElement('li'),
    span = document.createElement('span');
    spanDate = document.createElement('span');
    elem.classList.add('slider__day--slide');
    elem.classList.add('swiper-slide');
    if(hoursWork[hoursWork.length-2] > d.getHours()){
        dateNow = new Date(d.getTime() + number*24*60*60*1000);
    } else {
        dateNow = new Date(d.getTime() + (number+1)*24*60*60*1000);
    }
    
    
    span.textContent = day[dateNow.getDay()];
    console.log(dateNow.getDay());
    elem.appendChild(span);
    spanDate.classList.add('day')
    spanDate.textContent = dateNow.getDate();
    elem.appendChild(spanDate);
    if(number===0){
        elem.classList.add('active');
    }
    sliderWapper.appendChild(elem);
}

//цикл вывода дней
for (let i = 0; i<10; i++){
    boxDate(i);
}

//вывод времени
function boxTime(){
    let timeChoice = document.querySelector('.time.choice'),
    data = document.querySelector('.day.choice>li.active>.day')
    timeChoice.innerHTML = '';
    
    for(let i = 0; i<hoursWork.length-1; i++){
        if(data.textContent == d.getDate()){
            if (d.getHours()<hoursWork[i]){
                let li = document.createElement('li');
                if(timeChoice.querySelector('li') == undefined){
                    li.classList.add('active');
                }
                li.textContent = hoursWork[i]+':00'+'-'+hoursWork[i+1]+':00';
                timeChoice.appendChild(li);
            }
        }
        else{
            let li = document.createElement('li');
                if(timeChoice.querySelector('li') == undefined){
                    li.classList.add('active');
                }
                li.textContent = hoursWork[i]+':00'+'-'+hoursWork[i+1]+':00';
                timeChoice.appendChild(li);
        }
    }
    
    time = document.querySelectorAll('.time.choice>li');
    choice(time, 'time');
}
// Устанавливаю сюда т.к. по другому не видит
let date = document.querySelectorAll('.day.choice>li');

//Вывод времени
window.onload = function(){
    window.setInterval(
     function(){
        document.querySelector('.title--time').innerHTML = d.getHours() + "<span>:</span>" + (d.getMinutes().length == 1 ? '0'+d.getMinutes() : d.getMinutes());
     }
   , 1000);
   
}

//Выборка элементов
function choice(items, value) {
    items.forEach((elem) => {
        elem.addEventListener('click', ()=>{
            items.forEach(elem2 => {elem2.classList.remove('active')});
            elem.classList.add('active');
            if(value=='time'){
                completion(dateInput);
            }
            else
            {
                boxTime();
                completion(dateInput);
            }
        });
    });    
}

//возвращает активное значение dd.mm, h:00
function completion(input){
    let data = document.querySelector('.day.choice>li.active>.day'),
    time = document.querySelector('.time.choice>li.active');
    m = d.getMonth()+1;
    
    input.value = data.textContent+'.'+m+', '+(time.textContent.length===1 ? '0'+time.textContent : time.textContent);
}
//кнопка готова
document.querySelector('.buttons>.ready').addEventListener('click', ()=>{
    console.log('yes');
});
//кнопка cброса;
document.querySelector('.buttons>.reset').addEventListener('click', ()=>{
    date.forEach((elem)=>{
        elem.classList.remove('active');
    })
    date[0].classList.add('active');
    time.forEach((elem)=>{
        elem.classList.remove('active');
    })
    time[0].classList.add('active');
    completion(dateInput);
});

boxTime();
completion(dateInput);
choice(date);
