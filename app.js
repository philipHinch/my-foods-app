//variables
let RandomMealSection = document.querySelector('.random-meal-section');

//REPRESENTS A MEAL
class MealCard {
    constructor(data) {
        this.name = data.meals[0].strMeal
        this.type = data.meals[0].strCategory
        this.area = data.meals[0].strArea
        this.thumb = data.meals[0].strMealThumb
        this.id = data.meals[0].idMeal
    }
}

//HANDLES UI TASKS
class UI {
    static createRandomMealCard(data) {
        //create a new meal obj
        const meal = new MealCard(data)
        //create new div element
        let card = document.createElement('div');
        //insert obj data in new div
        card.innerHTML = `
        <label for="random-meal-container" class="random-meal-label not-active">Random Meal</label>
        <div class="random-meal-container" id="random-meal-container" data-id="${ meal.id }">
            <div class="random-meal-info">
                <h3 class="random-meal-title active">${ meal.name }</h3>
                <p class=random-meal-category><i class="fas fa-boxes active"></i>${ meal.type }</p>
                <p class="random-meal-area"><i class="fas fa-flag active"></i>${ meal.area }</p>
                <div class="heart-container">
                    <i class="fas fa-heart heart-2 pink"></i>
                </div> 
            </div>
            <div class="random-meal-photo">
                <img src="${ meal.thumb }" alt="random meal">
            </div>
        </div>
        `
        //append div to its parent element
        RandomMealSection.appendChild(card)
    }
}

//HANDLES LOCAL STORAGE

class Storage {

}


