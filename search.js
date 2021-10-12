// API DATA FUNCTIONS

const nameBaseURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

//fetch a meal by name
async function fetchMealByName(letters) {
    try {
        const res = await fetch(nameBaseURL + letters)
        const data = await res.json()
        UI.createMeals(data)
        console.log(data);
        return data
    } catch (err) {
        console.log(err);
    }
}

/////////////////////////////////////////////////////

let grid = document.querySelector('.grid-favourite')
let body = document.querySelector('body')
let gridItems = document.querySelectorAll('.grid-item')
let searchInput = document.getElementById('search-input')

//REPRESENTS A MEAL
class MealCard {
    constructor(data) {
        this.name = data.strMeal
        this.type = data.strCategory
        this.area = data.strArea
        this.thumb = data.strMealThumb
        this.id = data.idMeal
    }
}

//HANDLES UI TASKS
class UI {

    //create meal card
    static createMeals(data) {
        if (data.meals === null) {
            return
        } else {
            //create a new meal obj
            data.meals.forEach((m) => {
                const meal = new MealCard(m)
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
            })
        }

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

//call fetchMealByName() if search input has value
searchInput.addEventListener('input', () => {
    let result = searchInput.value
    if (result.length === 0) {
        grid.innerHTML = ''
    } else {
        grid.innerHTML = ''
        fetchMealByName(result)
    }
})