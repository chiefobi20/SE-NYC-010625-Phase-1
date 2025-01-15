// write your code here
fetch('http://localhost:2000/foods')
.then((response) => {
    return response.json()
})
.then((foods) => {
    console.log(foods)
})
//NOTES: Communicating with the Server
//Imagine ordering food at a restaurant...
//the client is the person who requests the food (client = webpage)
//the server is the one who retrieves the food
//client (webpage) makes requests to the server
//when you search something on the web, you are making a request
//the retrieval requests are GET requests
//"CRUD" = create, read, update, delete
//POST = "create", GET = "read", PUT/PATCH = "update", DELETE = "delete"
//Example:...
//http://localhost:3000/foods
//this website is where JSON server is hosting the data
//the "https" is the protocol
//the "localhost:3000" is the domain
//the "/foods" part is the path
//(we're currently running the json server by pasting and running the following in the terminal: "json-server --watch db.json")
//the "db.json" is the file we are using --- so that's why we can access the data we are accessing (db.json contains a food object)
//each item in the array in db.json needs to be an object so that it can be read
//It's bad practice to not have an "id" key - bc we want to be able to uniquely identify each item in the array
//For the values of the keys, you can use strings, numbers, and boolean
//(in JSON you can't use functions as values thoughs.... JSON doesn't recognize those)
//Because JSON is used for hosting data... it's not meant to be doing functions... it just holds information
//the keys are stringified and they must use double quotations (can't use single quotations in JSON)
//Depending on the version of node you have, if you type "json-server --watch hello.json" in your terminal,
//if will either 1. create a hello.json file for you (earlier versions ~16)
//or 2. tell you that file does not exist (later versions ~20)
//side note: later versions will also convert all the numbers to strings. Earlier versions keep them as numbers
//If you shut down the server (using Control C)... you won't be able to retrieve the data
//You can test if the serve is runnning by seeing if it's hosting data
// the "--watch" allows JSON server to watch for any changes that are happening within the file (so if you alter your code in db.json and then refresh your webpage, it will reflect your changes in the data)

//Notes: Retrieving data with the fetch() method
//fetch() is a method because technically you call it on window ("window.fetch"), but you don't need the "window" part (window is an object) bc you always call it on the window* --- fetch() doesn't work without a browser
//fetch() is the method that allows us to make ANY request (but today we'll be focusing on GET requests)
//fetch() accepts a string argument
// fetch('http://localhost:3000/foods')
// //we get a promise object back from fetch (not actually the data itself)
// //but what we get back from fetch() we want to be able to use and interpret so we have to call .json() on what we get back
// .then(response => response.json()) //every promise results to some data in a container/cage... we can get the data by calling the callback function .json()
// .then(foods => console.log(foods)) //now we have the data and can do something with it

//How/why is fetch() asynchronous?
// console.log('Before the fetch()')
// fetch('http://localhost:3000/foods')
// .then(response => response.json())
// .then(foods => console.log(foods))
// console.log('After the fetch() code')
// //will print the console.logs() before the fetch request bc it is asynchronous
//so other code runs first and fetch request only returns once it is finished

// const promiseObject = fetch('http://localhost:3000/foods')
// console.log(promiseObject) //console logs a promise object (the box/container/cage of the data we want)
//it's not best practice to force your code to stop and hold off until the code resolves... it's better to make it asynchronous
//if we want to access the promise result...
// const promiseObject2 = promiseObject.then((response) => {
//     response.json().then(foods => console.log(foods)) //You can call .then() directly on the response after calling .json()
// }) //if you didn't pass anything into your .then(), then nothing will happen to the promise object... but you should pass in a callback function
//

//Another way to write this:
// const promiseObject3 = promiseObject.then((response) => response.json())
// console.log(promiseObject3)

// //ANother way to write this
// promiseObject3.then(foods => {
//     console.log(foods)
// })

//side note: if you don't specify a type of request, it defaults to GET
//later we'll learn how to specify the type of request

//write your code here

// async function getFoods(){
//     await fetch('http://localhost:3000/foods') // "await" keyword
//     .then(response => response.json())
//     .then(foods => {
//         console.log(foods)
//     })
// }

// console.log('Before the fetch() code')

// getFoods()

//when you call an asynchoronous function, the rest of the code finishes its execution and the asynchoronous code just finishes whenever
//have to add "async" before the function to call await
//what can we use "await" for?
//allows us to cut down on some steps (skip over returning the promise object)
// async function getFoods(){
//     console.log('Before the fetch() code')
//     const responseObject = await fetch('http://localhost:3000/foods')
//     const returnValue = await responseObject.json()
//     console.log(returnValue)
//     console.log('After the fetch() code')
// }
// getFoods()
// you can use async and await next to code you want to become synchronous***
//But we probably don't want to make our aynchronous code synchronous (can result in issues..)



function addFoodImagetoRestaurantMenu(food){
    const imgElement = document.createElement('img')
    imgElement.src = food.image
    const restaurantMenu = document.getElementById('restaurant-menu')
    restaurantMenu.appendChild(imgElement)

    imgElement.addEventListener('click', () => {
        displayFoodDetails(food)
    })
}

function displayFoodDetails(food) {
    const detailImageElement = document.querySelector('.detail-image')
    detailImageElement.src = food.image

    const nameElement = document.querySelector('.name')
    nameElement.textContent = food.name

    const descriptionDisplay = document.getElementById('description-display')
    descriptionDisplay.textContent = food.description
}

fetch('http://localhost:3000/foods')
.then(response => response.json())
.then(foods => {
    foods.forEach(addFoodImagetoRestaurantMenu)

    displayFoodDetails(foods[0])
})