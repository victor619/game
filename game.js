// MY VARIABLES
const Question = document.getElementsByClassName('questions')
const Options = document.getElementsByClassName('options')
const btn = document.getElementsByTagName("button")
const intro = document.getElementsByClassName('intro')
const scorePage =  document.getElementsByClassName('score')
const score =  document.getElementById('score')
const message =  document.getElementById('message')
const timer =  document.getElementsByClassName('timer')
const solution = document.getElementsByClassName('solution')
const answers =  document.getElementsByClassName('answers')

//set time
let seconds = 30
let index =-1
let counter = 0

// ===================================================================================================
// EVENT EVENTLISTENERS

btn[0].addEventListener('click',Quiz)
btn[1].addEventListener('click',Answers)

// ===================================================================================================

//FETCH QUESTIONS AND ANSWERS
async function Quiz(){

   let res = await fetch("./questions.json");
   let data = await res.json();

   Display(data)
   setInterval(Countdown,1000)
}   

// ====================================================================================================

// DISPLAY  QUESTIONS
function Display(data){
index++
intro[0].style.display = 'none'

let length = Array.from(data).length

if(index<length){
  
  let que = `<h2>${data[index].question}</h2>`
  let opt = `<ul>
            <li>${data[index].options[0]}</li>
            <li>${data[index].options[1]}</li>
            <li>${data[index].options[2]}</li>
            <li>${data[index].options[3]}</li>
            </ul>
  `
  Question[0].innerHTML = que
  Options[0].innerHTML = opt
}
else{
  scorePage[0].style.zIndex = '5'
}

let li = document.getElementsByTagName('li')
ShowScore(li,data)

}


// ===================================================================================================

// DISPLAY SCORE
function ShowScore(li,data){

  Array.from(li).forEach(x=>x.addEventListener('click',(x)=>{
    let correct = data[index].correct
    if(x.path[0].innerHTML === correct){
        x.path[0].style.backgroundColor = 'yellowgreen'
        if (true) {
         console.log(data[index], index )
         CalculateScore(data)

        }
        Display(data)
    }
    else{
        console.log('false')
        x.path[0].style.backgroundColor = 'red'
        Display(data)
    }
  })
  )
}

// ====================================================================================================

// CALCULATE SCORE
function CalculateScore(data){
  counter++
  
  let Actualscore = Math.floor((counter / data.length) * 100)

 
   if(Actualscore <50){
      score.style.color = `red`
      message.style.color =`red`
      score.innerHTML = `You got ${Actualscore}%`
      message.innerHTML = `You can do better than this.`
    }


    else {
        score.style.color = `yellowgreen`
        message.style.color =`yellowgreen`
        score.innerHTML = `You got ${Actualscore}%`
        message.innerHTML = `You are really smart!`
    }

}
// =====================================================================================================

//TIMER
function Countdown(){
 seconds -- 

if(seconds == 0){
  seconds = 0;
  scorePage[0].style.zIndex = '3'
}

else if (seconds < 0){
  seconds = 0;
}

else{
   document.getElementsByClassName(`timer`)[0].innerHTML = `${seconds} secs left`
  }
}

// =====================================================================================================

// GET ANSWERS
async function Answers(){

  let res = await fetch("./questions.json");
  let data = await res.json();

  Solution(data)
}   

// ======================================================================================================

// DISPLAY SOLUTION
function Solution(data){
let res = Array.from(data)
solution[0].style.zIndex =`5`;

for (let i = 0; i <res.length; i++) {
let ans =`<div id ="answer">
<h3>${res[i].question}<h3>
<p style = "yellowgreen">${res[i].correct}</p>
</div>`

  answers[0].insertAdjacentHTML("beforeend",ans)
}
} 

// ========================================================================================================