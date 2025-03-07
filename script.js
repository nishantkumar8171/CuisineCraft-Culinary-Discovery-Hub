// Note:- if you are giving the elements of your index file a class then your will access them in the script.js file with the help of "querySelector".
//         but if you are giving an "id" to the elements then you will access them in the javascript file with the help of "getElementById".
const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');
//event listeners for the buttons and input field
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');

// Function to get recipes.
const fetchRecipes = async (query) =>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>";
    try {  
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();    // await is always used with async function.

    if (response.meals === null) {  // Check if no recipes are found
        recipeContainer.innerHTML = `<img src="Ani.png" alt="Recipe Not Found">`;
    }
    else{

    recipeContainer.innerHTML="";        // to not show the h2 i.e "search your favourite recipe when we are searching any recipe."
    response.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');    // creating a div in javascript.
        recipeDiv.classList.add('recipe');          // adding class named 'recipe' to the div.
        //adding image inside the div using innerHTML property of DOM element.
        recipeDiv.innerHTML=`<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span>Category</p> ` 
        
        const button=document.createElement('button');  // creating a button.
        button.textContent="View Recipe";   // View Recipe will be shown in the  button.
        recipeDiv.appendChild(button);  // adding button to the recipe div.
        
        // Adding Even listener to recipe button.
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
} 
} ////
catch (error) {
    recipeContainer.innerHTML="<h2>Error in Fetching Recipes...</h2>"; 
     
}
}  

// function to fetch ingredients and measurements.
// NOTE:- $, {} and some other symbols work in backticks only.
const fetchIngredients=(meal)=>{       // function to fetch the information of the ingridients.
    let ingredientsList="";
    for(let i=1;i<=20;i++){
       const ingredient=meal[`strIngredient${i}`];
       if(ingredient){
        const measure=meal[`strMeasure${i}`];
        ingredientsList+=`<li>${measure} ${ingredient} </li>`
       }
       else {
        break;
       }
    }
    return ingredientsList;
}
const openRecipePopup=(meal)=>
{
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3> Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>   
        <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p>
        </div>
        ` 
    recipeDetailsContent.parentElement.style.display="block";
}
recipeCloseBtn.addEventListener('click',()=>{
     recipeDetailsContent.parentElement.style.display="none";
});
searchBtn.addEventListener('click',(e)=> {
    e.preventDefault(); // it help to prevent auto submit of the text in text box.
    const searchInput = searchBox.value.trim();  // the value that we will give in the search box will come here.
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box </h2>`;
        return ;
    }
    fetchRecipes(searchInput);  // calling the function.

});