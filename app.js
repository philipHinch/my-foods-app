const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

async function getRandomMeal() {
    const res = await fetch(randomMealURL)
    const data = await res.json()
    console.log(data);
}

getRandomMeal()
