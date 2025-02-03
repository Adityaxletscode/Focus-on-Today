const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const completed = document.querySelector(".progress-value > span > span");
const progressLable=document.querySelector(".progress-label");
const deleteButton=document.querySelector(".delete-button");
const allQuotes=["Raise the bar by completing your goals!","Well begun is half done!","Just a step away, Keep going!","Whoa! You just completed all the goals, time for chill :D"];
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {first:{
    name:"",
    completed:false,
    },
    second:{
        name:"",
        completed:false,
    },
    third:{
        name:"",
        completed:false,
    },
};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
const updateProgressBar = () => {
  progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
};
const updateCompleted = () =>{
    let currentValue = parseInt(completed.textContent, 10);
    completed.textContent = completedGoalsCount;
};
updateProgressBar();
updateCompleted();
progressLable.innerText=allQuotes[completedGoalsCount];
checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsCompleted = [...inputFields].every(function (input) {
      return input.value;
    });
    if (allGoalsCompleted) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      if (allGoals[inputId]) {
        allGoals[inputId].completed = !allGoals[inputId].completed;
        completedGoalsCount = Object.values(allGoals).filter(
          (goal) => goal.completed
        ).length;
        updateProgressBar();
        updateCompleted();
        progressLable.innerText=allQuotes[completedGoalsCount];
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
      }
    } else {
      progressBar.classList.add("show-error");
    }
  });
});
inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
  input.addEventListener("input", () => {
    if (allGoals[input.id].completed) {
        input.value=allGoals[input.id].name;
        return;
      }
    if(allGoals[input.id]){
      allGoals[input.id].name=input.value; 
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
deleteButton.addEventListener("click",() => {
  localStorage.clear();
  window.location.reload();
}
)
