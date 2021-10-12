//GET RANDOM MEAL DATA
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const categoryBaseURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

const idBaseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';



//HANDLES API DATA
//fetch random meal
async function fetchRandomMeal() {
    try {
        const res = await fetch(randomMealURL)
        const data = await res.json()
        // let meal = new MealCard(data)
        // return meal.createRandomMealCard()
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
        //find a way to return an array of objects
        //console.log(data);
        UI.createMeals(data)
        return data
    } catch (err) {
        console.log(err);
    }
}



//LOAD FUNCTIONS ON WINDOW LOAD
document.addEventListener('DOMContentLoaded', () => {
    //fetch random meal
    fetchRandomMeal()
    //
    UI.changeCategoryColor()
    //show default beef category 
    UI.getCategoryMeals('beef')
    //show favourite meals
})




