//GET RANDOM MEAL DATA
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const categoryBaseURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

const idBaseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';



//HANDLES API DATA
async function getRandomMeal() {
    const res = await fetch(randomMealURL)
    const data = await res.json()
    // let meal = new MealCard(data)
    // return meal.createRandomMealCard()
    UI.createRandomMealCard(data)
}

async function getCategoryMeals() {
    const res = await fetch(categoryBaseURL + categoryValue)
    const data = await res.json()
    UI.getMealIds(data)
}

async function getMealById(id) {
    const res = await fetch(idBaseURL + id)
    const data = await res.json()
    //find a way to return an array of objects
    return data
}



// async function createMealCard() {
//     const res = await fetch(idBaseURL)
//     const data = res.json()
// }

//LOAD FUNCTIONS ON WINDOW LOAD
document.addEventListener('DOMContentLoaded', () => {
    getRandomMeal()
    UI.changeCategoryColor()
})


