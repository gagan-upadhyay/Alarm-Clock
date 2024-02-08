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
    // if (hours>=12||hours<24){
    // currentTime+=" PM";
    // }else{
    //     currentTime+=" AM";
    // }
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


// To store data in cache memory and display on the screen also retaining the data when reload button hits

var cachedArray = JSON.parse(localStorage.getItem('cachedArray')) || []; //getting array form cache

setAlarmBtn.addEventListener("click", () => {
  const time = processTime(); //fetching the time value 

//this will populate the cachedArray which is fetched from local storage of browser, and will store the alarm set by user.
const indexOfAlarm = cachedArray.findIndex(item => item && item.startsWith('Alarm'));
console.log(indexOfAlarm);
if (cachedArray.length < 4 || cachedArray.includes(undefined)) {
  cachedArray.push(time);
} else if (indexOfAlarm !== -1) {
  cachedArray[indexOfAlarm] = time;
} else {
  showAlert("Limit reached"); //if user tries to add 5th alarm a custom alert will be popped.
}


  console.log("After storing data "+ cachedArray);
  for (let i = 0; i < cachedArray.length; i++) {
    if (cachedArray[i] !== undefined || cachedArray.includes('Alarm 0')) {
      alarmElements[i].textContent = cachedArray[i];
    }
  }

  counter++;
  localStorage.setItem('cachedArray', JSON.stringify(cachedArray)); //setting cache storage
});

//loading data from local storage putting back on the alarmElement to show on screen.
window.addEventListener('load', () => {

  if (cachedArray.length>4){
    console.log("length has been reached");
    setAlarmBtn.addEventListener("click", () => {
      showAlert("Limit reached");
    }
  )}

  for (let i = 0; i < cachedArray.length; i++) {
    if (cachedArray[i] !== undefined) {
      alarmElements[i].textContent = cachedArray[i];
    }
  }
});


//---------------------- Custom Alert for alarm-----------------------
function showAlert(message) {
  var alertBox = document.getElementById('custom-alert');
  var messageElement = document.getElementById('alert-message');
  var img = document.querySelector('.alert-content img');
  var msg=document.getElementById('alert-message');
  messageElement.textContent = message;
  alertBox.classList.remove('hidden');

  if(message==='Set Alarm first!'){
    img.src='wrong.jpg';
    msg.innerText="Alarm Not Set"
  }else if (message==="Limit reached"){    

  // Changing the src attribute to the new image URL
    img.src = 'wrong.jpg';
    }
  }

function hideAlert() {
  var alertBox = document.getElementById('custom-alert');
  alertBox.classList.add('hidden');
}

document.getElementById('alert-ok').addEventListener('click', hideAlert);

// ----------------------------------------------------------------

function alarm(){
  var returnedValues=updateClock(); //fetching
  var realtime=returnedValues[0];
  var audioElement= new Audio('loudalarm.mp3');
  if (cachedArray.includes(realtime)){    
    audioElement.play(); //will play audio 
    showAlert("Time's UP!!!");      
  }
}


// this function will run in the background to ensure the seconds units
function checkseconds(){
  let returnedValues = updateClock()
  let seconds=parseInt(returnedValues[1]);
  console.log(seconds);

  if(seconds===0){    
    alarm();
  }
}
setInterval(checkseconds, 1000); //function call for every second


// -------------------delete functionality----------------------------


var delbtn1=document.getElementById("btn1");
var delbtn2=document.getElementById('btn2');
var delbtn3=document.getElementById('btn3');
var delbtn4=document.getElementById('btn4');


function removeAlarm(id){

  if (cachedArray[id]!=='No Alarm' || cachedArray[id]!==undefined){
    cachedArray[id]="Alarm"+' '+id;
  }
  localStorage.setItem('cachedArray', JSON.stringify(cachedArray));
  alarmElements[id].textContent="Alarm" +" "+parseInt(id+1);
}
delbtn1.addEventListener('click',()=>{  
  removeAlarm(0);
})
delbtn2.addEventListener('click',()=>{
  removeAlarm(1);
})
delbtn3.addEventListener('click',()=>{
  removeAlarm(2);
})
delbtn4.addEventListener('click',()=>{
  removeAlarm(3);
})
