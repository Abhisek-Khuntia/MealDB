const search= document.getElementById('search'),
submit= document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl= document.getElementById('meals'),
resultHeading= document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');


//function Search Meal and fetch from api

function searchMeal(e){
e.preventDefault();
single_mealEl.innerHTML ='';

//get search term

const term = search.value;

// check for Empty
if(term.trim()){
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
.then(res=> res.json())
.then(data=>{
console.log(data);
// resultHeading.innerHTML= `<h2>Search results for ${term}: </h2>`;
resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

if(data.meals===null){
    resultHeading.innerHTML= `<p>There are no search results. Try Again!</p>`;
}else{
    mealsEl.innerHTML = data.meals
    .map(meal => `
    <div class="meal">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="meal-info" data-mealID="${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
      </div>
    </div>
  `
    )
    .join('');
}
});
//Clear Search text 
search.value='';

}else{
 alert('Please enter a searched value');
}

}

//fetch meal by id
function getMealById(mealId){
    // console.log(mealId)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res=>res.json())
    .then( data=>{
        const meal = data.meals[0];
        //UI Function to add meal
        addMEalToDom(meal);

    }
        
    );
}

function addMEalToDom(meal){
    const ingredients =[];

    for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
    single_mealEl.innerHTML=`
    <div class ="single_meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}

    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing=> `<li>${ing}</li>`).join('')}
    </ul>
    </div>
    </div>`;
console.log(meal);

}

//Event Listeners
submit.addEventListener('submit', searchMeal);


mealsEl.addEventListener('click', e =>{
    //check for the valid className in the list
    const mealInfo= e.path.find(item =>{
        if(item.classList){
            return item.classList.contains('meal-info');// this returns true
        }else{
        }   return false;
    })
    // if the classlist is valid and holds some boolean value true/false
    if(mealInfo){// 
        const mealId = mealInfo.getAttribute('data-mealid');
        // the value is passed as an arguments into the function
        getMealById(mealId);
    }
})


