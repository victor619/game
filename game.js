const Question = document.getElementsByClassName('questions')
const Options = document.getElementsByClassName('options')
const btn = document.getElementsByTagName("button")
const intro = document.getElementsByClassName('intro')
const scorePage =  document.getElementsByClassName('score')
const score =  document.getElementById('score')
const message =  document.getElementById('message')



let index =-1
let counter = 0


btn[0].addEventListener('click',quiz)


async function quiz(){

   let res = await fetch("./questions.json");
   let data = await res.json();

   display(data)
}   


function display(data){
index++
btn[0].style.display = 'none'
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
  scorePage[0].style.zIndex = '3'
alert(`Reload to restart the game`)
}

let li = document.getElementsByTagName('li')
showScore(li,data)

}


function showScore(li,data){


  Array.from(li).forEach(x=>x.addEventListener('click',(x)=>{
    let correct = data[index].correct
    if(x.path[0].innerHTML === correct){
        x.path[0].style.backgroundColor = 'yellowgreen'
        if (true) {
         console.log(data[index], index )
         calculateScore(data)

        }
        display(data)
    }
    else{
        console.log('false')
        x.path[0].style.backgroundColor = 'red'
        display(data)
    }
  })
  )
}

function calculateScore(data){
  counter++
  
  let Actualscore = Math.floor((counter / data.length) * 100)

 
    if(Actualscore <90){
      score.style.color = `Red`
      score.innerHTML = `You got ${Actualscore}%`
      message.innerHTML = `You can do better than this.`
    }
  
    else if(Actualscore>90){
      score.style.color = `yellowgreen`
      score.innerHTML = `You got ${Actualscore}%`
      message.innerHTML = `You are really smart!`
    }

}
// display reasons for the answers
// create a timer
// create a restart button