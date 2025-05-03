// let goals=document.querySelector('.goal-group')
// console.log(goals)
// let goalblock= document.createElement('div')
// goalblock.classList.add('goal-block')
// let goalCheck= document.createElement('spam')
// goalCheck.classList.add('radio')
// goalblock.append(goalCheck)
// let goal=document.createElement('input')
// goal.type='text'
// goal.placeholder='add your goal'
// goalblock.classList.add('goal')
// goals.append(goalblock)
let allInputs=document.querySelectorAll('.goal')
let errorMessage=document.querySelector('.goal-warning-msg')
let progressValue=document.querySelector('.progress-value')
const allGoals = JSON.parse(localStorage.getItem('allGoals')) ||{}
//  {allGoals
//   first: {
//     name: '',
//     completed: false,
//   },
//   second: {
//     name: '',
//     completed: false,
//   },
//   third: {
//     name: '',
//     completed: false,
//   },
// }
if(![...allInputs].some((i)=>i.value===''))
    errorMessage.classList.add('show-error')
console.log([...allInputs])


let checkboxes=document.querySelectorAll('.check')
let noOfGoalsDone=Object.values(allGoals).filter(goal=>goal.completed).length
console.log(noOfGoalsDone)
progressValue.style.width=`${noOfGoalsDone/allInputs.length*100}%`
console.log(progressValue.style.width)

checkboxes.forEach((checkbox)=>{
    checkbox.addEventListener('click',e=>{
      const isAllInputsPresent=[...allInputs].every((input)=>{
        return input.value})
    if(isAllInputsPresent){
    checkbox.classList.toggle('completed')
    let input= checkbox.nextElementSibling
    allGoals[input.id].completed= !allGoals[input.id].completed
    input.classList.toggle('completed')
    noOfGoalsDone=Object.values(allGoals).filter(goal=>goal.completed).length

    console.log(noOfGoalsDone)
    progressValue.style.width = `${(noOfGoalsDone /allInputs.length) * 100}%`
    }
    else{
        errorMessage.classList.add('show-error')
    }
    localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
})

allInputs.forEach((input)=>{
//if already some value present
if(allGoals[input.id]){
    input.value=allGoals[input.id].name
if(allGoals[input.id].completed){
    input.classList.add('completed')
    input.previousElementSibling.classList.add('completed')
}}

input.addEventListener('focus', (e) => {
    errorMessage.classList.remove('show-error')
  })
input.addEventListener('input',(e)=>{
    if (allGoals[input.id] && allGoals[input.id].completed) {
        input.value = allGoals[input.id].name
        return
      }
if (!allGoals[input.id]) {
    allGoals[input.id] = {};  // make sure it exists first
}
if (allGoals[input.id].name&&allGoals[input.id].completed) {
    input.name=allGoals[input.id].name
}
console.log(input.previousElementSibling.classList.contains('completed'))
if(!input.previousElementSibling.classList.contains('completed'))
allGoals[input.id].name=e.target.value
noOfGoalsDone=Object.values(allGoals).filter(goal=>goal.completed).length
localStorage.setItem('allGoals',JSON.stringify(allGoals))
})

})


 

