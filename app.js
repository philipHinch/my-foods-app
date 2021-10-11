//variables
let randomMealSection = document.querySelector('.random-meal-section');
let categories = document.querySelectorAll('.category');
let grid = document.querySelector('.grid')
let body = document.querySelector('body')
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
        <p for="random-meal-container" class="random-meal-label not-active">Random Meal</p>
        <div class="random-meal-container" id="${ meal.id }">
            <div class="random-meal-info">
                <h3 class="random-meal-title active">${ meal.name }</h3>
                <p class=random-meal-category><i class="fas fa-boxes active"></i>${ meal.type }</p>
                <p class="random-meal-area"><i class="fas fa-flag active"></i>${ meal.area }</p>
                <div class="heart-container">
                    <i class="fas fa-heart heart-full"></i>
                </div> 
            </div>
            <div class="random-meal-photo">
                <img src="${ meal.thumb }" alt="random meal">
            </div>
        </div>
        `
        //append div to its parent element
        randomMealSection.appendChild(card)
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

    //fetch all category ids and all meal by those ids
    static getCategoryMeals(cat) {
        fetchCategoryMeals(cat).then((res) => {
            for (let i = 0; i < res.meals.length; i++) {
                fetchMealById(res.meals[i].idMeal)
            }
            grid.innerHTML = ''
        })
    }

    //create a meal card
    // static createMeals(meal) {
    //     let gridItem = document.createElement('div')
    //     gridItem.classList.add('grid-item')
    //     gridItem.classList.add('meal')
    //     gridItem.id = `${ meal.meals[0].idMeal }`
    //     gridItem.innerHTML = `
    //             <div class="meal-photo">
    //                 <img src="${ meal.meals[0].strMealThumb }" alt="meal">
    //             </div>
    //             <div class="meal-info">
    //                 <h3 class="meal-title active">${ meal.meals[0].strMeal }</h3>
    //                 <p class=meal-category><i class="fas fa-boxes active"></i>${ meal.meals[0].strCategory }</p>
    //                 <p class="meal-area"><i class="fas fa-flag active"></i>${ meal.meals[0].strArea }</p>
    //             </div>
    //             <div class="heart-container">
    //                 <i class="fas fa-heart heart-2 pink"></i>
    //             </div>
    //     `
    //     grid.appendChild(gridItem)
    // }

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

//get meal id on random meal card click
randomMealSection.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('random-meal-container')) {
        console.log(e.target.parentElement.id);
    } else if (e.target.parentElement.parentElement.classList.contains('random-meal-container')) {
        console.log(e.target.parentElement.parentElement.id);
    }
})

//get meal id on grid card click
grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('grid-item')) {
        console.log(e.target.id);
    } else if (e.target.parentElement.parentElement.classList.contains('grid-item')) {
        console.log(e.target.parentElement.parentElement.id);
    }
})

//body event listener
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas')) {
        console.log('heart!!');
        e.target.classList.toggle('pink')
        e.target.classList.toggle('animate-heart')
    }
})






















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



