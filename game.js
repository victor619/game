const Questions = document.getElementsByClassName(`Questions`)[0]
const score = document.getElementsByClassName(`score`)[0]
const Score = document.getElementsByClassName(`Score`)[0]

const Answers = document.getElementsByClassName(`Answers`)[0]
const Timer = document.getElementsByClassName(`Timer`)[0]
const Start = document.getElementById(`start`)
let index = -1
let points = 0
let time = 10
Start.addEventListener(`click`,Quiz)

async function Quiz(){
  let data = await fetch(`./questions.json`)
  let response = await data.json()
  QuizQuestions(response)
  setInterval(countdown,1000)
}


function QuizQuestions(data){
index++
Questions.style.zIndex = `5`

    if(index<data.length){
    let html = `<div class="quiz">
                <h2>${data[index].question}</h2>
                <ul class ="options">
                <li>${data[index].options[0]}</li>
                <li>${data[index].options[1]}</li>
                <li>${data[index].options[2]}</li>
                <li>${data[index].options[3]}</li>
                </ul>
              </div>`
    Questions.innerHTML = html;
    }

    else{
      score.style.zIndex =`6`      
    }

    let options = document.getElementsByClassName("options")[0]
    CalculateScore(data,options)
  }



// SELECT YOUR ANSWER
function CalculateScore(data,options){
  let li = options.children
  Array.from(li).forEach(li => li.addEventListener(`click`,(e)=>{
  let correctAnswer = data[index].correct 
     if(e.target.innerHTML === correctAnswer){
       console.log(`true`)
       e.target.style.backgroundColor=`yellowgreen`
       YourScore(data)
     }
     else{
       console.log(`false`)
       e.target.style.backgroundColor=`red`
     }
     QuizQuestions(data)
  }))
}



//CALCULATE YOUR SCORE

function YourScore(data){
  points++
let ActualScore = (points/data.length)*100
console.log(ActualScore)
Score.innerHTML=`<h1> You Scored ${ActualScore}%</h1>`

if(ActualScore>0 && ActualScore<50){
Score.style.color = `red`
}
else if(ActualScore>50 && ActualScore<70){
  Score.style.color = `yellow`
} 
else if(ActualScore>70 && ActualScore<90){
  Score.style.color = `blue`
}
else{
  Score.style.color = `yellowgreen`

}
}




//TIMER
function countdown(){
  time--
  Timer.innerHTML= time

  if(time == 0){
    time=0
    score.style.zIndex = 6
  }
  else if(time < 0){
   time = 0
   Timer.innerHTML = `Time Up`
  }
}


