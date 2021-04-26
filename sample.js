


// MY VARIABLES
const variables = {
    Question : document.getElementsByClassName('questions'),
    Options : document.getElementsByClassName('options'),
    btn : document.getElementsByTagName("button"),
    intro : document.getElementsByClassName('intro'),
    scorePage :  document.getElementsByClassName('score'),
    score :  document.getElementById('score'),
    message :  document.getElementById('message'),
    timer :  document.getElementsByClassName('timer'),
    solution : document.getElementsByClassName('solution'),
    answers :  document.getElementsByClassName('answers'),
    seconds : 30,
    index :-1,
    counter : 0
 }
 
 
 
 // ===================================================================================================
 // EVENT EVENTLISTENERS
 
 variables.btn[0].addEventListener('click',Quiz)
 variables.btn[1].addEventListener('click',Answers)
 
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
 variables.index++
 variables.intro[0].style.display = 'none'
 
 let length = Array.from(data).length
 
 if(variables.index<length){
   
   let que = `<h2>${data[variables.index].question}</h2>`
   let opt = `<ul>
             <li>${data[variables.index].options[0]}</li>
             <li>${data[variables.index].options[1]}</li>
             <li>${data[variables.index].options[2]}</li>
             <li>${data[variables.index].options[3]}</li>
             </ul>
   `
   variables.Question[0].innerHTML = que
   variables.Options[0].innerHTML = opt
 }
 else{
   variables.scorePage[0].style.zIndex = '5'
 }
 
 let li = document.getElementsByTagName('li')
 ShowScore(li,data)
 
 }
 
 
 // ===================================================================================================
 
 // DISPLAY SCORE
 function ShowScore(li,data){
 
   Array.from(li).forEach(x=>x.addEventListener('click',(x)=>{
     let correct = data[variables.index].correct
     if(x.path[0].innerHTML === correct){
         x.path[0].style.backgroundColor = 'yellowgreen'
         if (true) {
          console.log(data[variables.index], variables.index )
          CalculateScore(data)
         }
         Display(data)
     }
     else{
   
         x.path[0].style.backgroundColor = 'red'
         Display(data)
     }
   })
   )
 }
 
 // ====================================================================================================
 
 // CALCULATE SCORE
 function CalculateScore(data){
   variables.counter++
   console.log(data.length, data)
   let Actualscore = Math.floor((variables.counter / data.length) * 100)
  
    if(Actualscore <50){
       variables.score.style.color = `red`
       variables.message.style.color =`red`
       variables.score.innerHTML = `You got ${Actualscore}%`
       variables.message.innerHTML = `You can do better than this.`
     }
 
     else if(Actualscore >=50 && Actualscore <=70){
       variables.score.style.color = `skyblue`
       variables.message.style.color =`skyblue`
       variables.score.innerHTML = `You got ${Actualscore}%`
       variables.message.innerHTML = `You are smart!`
   }
   
 
     else {
         variables.score.style.color = `yellowgreen`
         variables.message.style.color =`yellowgreen`
         variables.score.innerHTML = `You got ${Actualscore}%`
         variables.message.innerHTML = `You are really smart!`
     }
 
 }
 // =====================================================================================================
 
 //TIMER
 function Countdown(){
   variables.seconds -- 
 
 if(variables.seconds == 0){
   variables.seconds = 0;
   variables.scorePage[0].style.zIndex = '3'
 }
 
 else if (variables.seconds < 0){
   variables.seconds = 0;
 }
 
 else{
    document.getElementsByClassName(`timer`)[0].innerHTML = `${variables.seconds} secs left`
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
 variables.solution[0].style.zIndex =`6`;
 seconds = 0;
 for (let i = 0; i <res.length; i++) {
 let ans =`<div id ="answer">
 <h3>${res[i].question}<h3>
 <p style = "yellowgreen">${res[i].correct}</p>
 </div>`
 
 variables.answers[0].insertAdjacentHTML("beforeend",ans)
 }
 } 
 
 // ========================================================================================================