//variables
let RandomMealSection = document.querySelector('.random-meal-section');
let categories = document.querySelectorAll('.category');
let grid = document.querySelector('.grid')
let categoryValue;
let idsArr = []
let meals = []


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

    //creates a random meal card
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

    //changes category background color on click
    static changeCategoryColor() {
        categories.forEach((category) => {
            category.addEventListener('click', () => {
                categories.forEach((category) => {
                    category.classList.remove('active-background')
                })
                category.classList.add('active-background')
                UI.getCategoryMeals(category.id)
                //UI.showCategoryMeals(category)
            })
        })
    }

    static getCategoryMeals(cat) {
        fetchCategoryMeals(cat).then((res) => {
            for (let i = 0; i < res.meals.length; i++) {
                fetchMealById(res.meals[i].idMeal)
            }
            grid.innerHTML = ''
        })
    }

    static createMeals(meal) {
        let gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
        gridItem.classList.add('meal')
        gridItem.innerHTML = `
                <div class="meal-photo">
                    <img src="${ meal.meals[0].strMealThumb }" alt="meal">
                </div>
                <div class="meal-info">
                    <h3 class="meal-title active">${ meal.meals[0].strMeal }</h3>
                    <p class=meal-category><i class="fas fa-boxes active"></i>${ meal.meals[0].strCategory }</p>
                    <p class="meal-area"><i class="fas fa-flag active"></i>${ meal.meals[0].strArea }</p>
                </div>
                <div class="heart-container">
                    <i class="fas fa-heart heart-2 pink"></i>
                </div>
        `
        grid.appendChild(gridItem)
    }
}























////////////////// OLD METHOD - NOT WORKING PROPERLY /////////////////

//     //get category value and get meals by that category
//     static showCategoryMeals(data) {
//         categoryValue = data.textContent
//         //get all category meals from api
//         getCategoryMeals()
//     }

//     //get all meal ids and call function which gets meals by id from api
//     static getMealIds(data) {
//         let ids = [];
//         for (let i = 0; i < data.meals.length; i++) {
//             ids.push(data.meals[i].idMeal)
//         }
//         ids.forEach((id) => {
//             //console.log(id);
//             getMealById(id).then(res => meals.push(res))
//             //create a meal card and get the data from getMealFromId()
//             //idsArr.push(id)
//             //maybe call a create card function here and pass id as parameter
//         })
//         UI.createMealCard()

//     }



//     //create meal card
//     static createMealCard() {
//         grid.innerHTML = ''
//         for (let i = 0; i < meals.length; i++) {
//             let gridItem = document.createElement('div')
//             gridItem.classList.add('grid-item')
//             gridItem.classList.add('meal')
//             gridItem.innerHTML = `
//             <div class="meal-photo">
//             <img src="${ meals[i].meals[0].strMealThumb }" alt="meal">
//         </div>
//         <div class="meal-info">
//             <h3 class="meal-title active">${ meals[i].meals[0].strMeal }</h3>
//             <p class=meal-category><i class="fas fa-boxes active"></i>${ meals[i].meals[0].strCategory }</p>
//             <p class="meal-area"><i class="fas fa-flag active"></i>${ meals[i].meals[0].strArea }</p>
//         </div>
//         <div class="heart-container">
//             <i class="fas fa-heart heart-2 pink"></i>
//         </div>
//             `
//             grid.appendChild(gridItem)
//         }
//         meals = []
//     }
// }



// //HANDLES STORAGE

// class Storage {

// }