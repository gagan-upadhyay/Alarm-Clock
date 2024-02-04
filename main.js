function updateClock() {
    var currentDate=new Date();
    var hours=currentDate.getHours();
    var minutes=currentDate.getMinutes();
    var seconds=currentDate.getSeconds();

    // using conditional statements to ensure that the tome format is 00:00:00.
    hours = (hours<10) ? "0" + hours:hours;
    minutes= (minutes<10) ? "0" + minutes : minutes;
    seconds= (seconds<10) ? "0" + seconds : seconds;

    var currentTime = hours + ":" + minutes +":" + seconds;
    if (hours>=12||hours<24){
    currentTime+=" PM";
    }else{
        currentTime+=" AM";
    }
    //changing the font-size of clockElement
    var clockElement = (document.getElementById("realTimeclock"));
    clockElement.style.fontSize="30px";
    // displaying the current time on the gui
    clockElement.innerHTML=currentTime;  
}

setInterval(updateClock, 1000);
