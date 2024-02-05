function updateClock() {
    var currentDate=new Date();
    var hours=currentDate.getHours();
    var minutes=currentDate.getMinutes();
    var seconds=currentDate.getSeconds();

    // using conditional statements to ensure that the tome format is 00:00:00.
    hours = (hours<10) ? "0" + hours:hours;
    minutes= (minutes<10) ? "0" + minutes : minutes;
    seconds= (seconds<10) ? "0" + seconds : seconds;

  var currentTimeIntwo=hours+":"+minutes;
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
    return [currentTimeIntwo, seconds];

}

setInterval(updateClock,1000);

//---------------------------------------------------------------------
// set alarm functions


let counter = 0;
const arr = [];
const setAlarmBtn = document.getElementById('setAlarmBtn');
const alarmElements = [
  document.getElementById('1'),
  document.getElementById('2'),
  document.getElementById('3'),
  document.getElementById('4')
];

function processTime() {            
  const timeInput = document.getElementById('setTime');
  return timeInput.value;  
}

setAlarmBtn.addEventListener("click", () => {
  const time = processTime();

  if (counter < 4) {
    arr.push(time);
  } else {
    arr.shift();
    arr.push(time);
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined) {
      alarmElements[i].textContent = arr[i];
    }
  }

  counter++;
});


function alarm(){
  var returnedValues=updateClock();
  var realtime=returnedValues[0];
  
  if (arr.includes(realtime)){
    console.log(arr);
    console.log(realtime);
    alert("Job DOne!!");  
  }
}

function checkseconds(){
  let returnedValues = updateClock()
  let seconds=parseInt(returnedValues[1]);
  console.log(seconds);

  if(seconds===0){
    // console.log("second===0");
    alarm();
  }
}
setInterval(checkseconds, 1000);

// ------------------delete functionality--------------------



var deletebtn1=getElementById('btn1');
var deletebtn2=getElementById('btn2');
var deletebtn3=getElementById('btn3');
var deletebtn4=getElementById('btn4');

deletebtn1.addEventListener("click", ()=>{

  

})

