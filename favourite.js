//API DATA FUNCTIONS

const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const categoryBaseURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const idBaseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';


//fetch random meal
async function fetchRandomMeal() {
    try {
        const res = await fetch(randomMealURL)
        const data = await res.json()
        UI.createRandomMealCard(data)
    } catch (err) {
        console.log(err);
    }

}

//fetch all meals within a category
async function fetchCategoryMeals(category) {
    try {
        const res = await fetch(categoryBaseURL + category)
        const data = await res.json()
        return data
        //UI.getMealIds(data)
    } catch (err) {
        console.log(err);
    }

}

//fetch a meal by its id
async function fetchMealById(id) {
    try {
        const res = await fetch(idBaseURL + id)
        const data = await res.json()
        UI.createMeals(data)
        return data
    } catch (err) {
        console.log(err);
    }
}

//LOAD FUNCTIONS ON WINDOW LOAD
document.addEventListener('DOMContentLoaded', () => {
    //filter favourite meals by category
    UI.filterFavouriteCategories()
    //show favourite meals
    UI.showFavouriteMeals()
    //make the heart function work
})

///////////////////////////////////////////////////////////////////

let categories = document.querySelectorAll('.category');
let grid = document.querySelector('.grid-favourite')
let body = document.querySelector('body')


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

    //fetch all category ids and all meal by those ids
    static getCategoryMeals(cat) {
        fetchCategoryMeals(cat).then((res) => {
            for (let i = 0; i < res.meals.length; i++) {
                fetchMealById(res.meals[i].idMeal)
            }
            if (grid === null) {
                return
            } else {
                grid.innerHTML = ''
            }
        })
    }

    //create meal card
    static createMeals(data) {
        //create a new meal obj
        const meal = new MealCard(data)
        let gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
        gridItem.classList.add('meal')
        gridItem.id = `${ meal.id }`
        gridItem.innerHTML = `
                <div class="meal-photo">
                    <img src="${ meal.thumb }" alt="meal">
                </div>
                <div class="meal-info">
                    <h3 class="meal-title active">${ meal.name }</h3>
                    <p class=meal-category><i class="fas fa-boxes active"></i>${ meal.type }</p>
                    <p class="meal-area"><i class="fas fa-flag active"></i>${ meal.area }</p>
                </div>
                <div class="heart-container">
                    <div>
                        <i class="fas fa-heart heart-full"></i>
                    </div>
                    
                </div>
        `
        grid.appendChild(gridItem)
        //if id is in LS, add pink to heart
        const meals = Storage.getMealFromLS();
        if (meals.includes(gridItem.id)) {
            gridItem.innerHTML = `
            <div class="meal-photo">
                <img src="${ meal.thumb }" alt="meal">
            </div>
            <div class="meal-info">
                <h3 class="meal-title active">${ meal.name }</h3>
                <p class=meal-category><i class="fas fa-boxes active"></i>${ meal.type }</p>
                <p class="meal-area"><i class="fas fa-flag active"></i>${ meal.area }</p>
            </div>
            <div class="heart-container">
                <div>
                    <i class="fas fa-heart heart-full pink"></i>
                </div>
                
            </div>
    `
        }
    }

    //remove filtered meals from ui
    static removeMealFromUI(id) {
        let gridItems = document.querySelectorAll('.grid-item')
        gridItems.forEach((item) => {
            if (item.id === id) {
                item.remove()
            }
        })
    }

    static showFavouriteMeals() {
        const meals = Storage.getMealFromLS();
        meals.forEach((meal) => {
            fetchMealById(meal)
        })
    }

    static filterFavouriteCategories() {
        //show favourite meals
        // let meals = Storage.getMealFromLS();
        //change category background color
        categories.forEach((category) => {
            category.addEventListener('click', () => {
                //
                //
                categories.forEach((category) => {
                    category.classList.remove('active-background')
                })
                category.classList.add('active-background')
            })
        })
    }

    //NOT WORKING PROPERLY///////----/////////-----///////
    static filterFunction(category) {
        let gridItems = document.querySelectorAll('.grid-item')
        let newArray = Array.from(gridItems).filter(function (el) {
            return el.children[1].children[1].textContent !== category
        });
        newArray.forEach((arr) => {
            let id = arr.id
            UI.removeMealFromUI(id)
        })
    }
}

//HANDLES STORAGE

class Storage {

    static getMealFromLS() {
        let meals;
        if (localStorage.getItem('meals') === null) {
            meals = [];
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }

        return meals;
    }

    static addMealToLS(meal) {
        const meals = Storage.getMealFromLS();
        //check if id is already in LS
        if (meals.includes(meal)) {
            return
        } else {
            meals.push(meal);
            localStorage.setItem('meals', JSON.stringify(meals));
        }
    }

    static removeMealFromLS(id) {
        const meals = Storage.getMealFromLS();
        meals.forEach((meal, index) => {
            if (meal === id) {
                meals.splice(index, 1);
            }
        });
        localStorage.setItem('meals', JSON.stringify(meals));
    }
}

// EVENT LISTENERS

//remove meal on heart click
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas')) {
        e.target.parentElement.parentElement.parentElement.remove()
        //remove favourite meal to/from storage
        let id = e.target.parentElement.parentElement.parentElement.id
        Storage.removeMealFromLS(id)
    }
})

//on category click, show filtered meals
//NOT WORKING PROPERLY /////-----/////////------//////
categories.forEach((category) => {
    category.addEventListener('click', () => {
        UI.filterFunction(category.id)
    })
})


//TO DO:

//1. get meal id on meal click