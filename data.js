//GET RANDOM MEAL DATA
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

async function getRandomMeal() {
    const res = await fetch(randomMealURL)
    const data = await res.json()
    // let meal = new MealCard(data)
    // return meal.createRandomMealCard()
    UI.createRandomMealCard(data)
}

//LOAD RANDOM MEAL ON WINDOW LOAD
document.addEventListener('DOMContentLoaded', () => {
    getRandomMeal()
})


