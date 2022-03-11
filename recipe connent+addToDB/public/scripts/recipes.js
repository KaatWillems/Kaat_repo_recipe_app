// FRONT END FILE TO INTERACT WITH THE DOM
//variables
let submit = document.querySelector('#submit')
let inputTitle = document.querySelector('#title')
let inputContent = document.querySelector('#content')
let inputIngr = document.querySelector('#ingredients')
let inputRating = document.querySelector('#rating')

// function recipeToDB
const recipeToDBApi = (title, content, ingr, rating) => {
    fetch('/api/addToDB', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
         body: JSON.stringify({title: title, content: content, ingredients: ingr, rating: rating})
      })
        .then(response=> response.json())
        .then((data) => {
         console.log(data);
            
            // updateOneTaskInTheDOM(data.task) //micha 
        })
        .catch((error) => {
            console.log(error)})

}




//eventlistener 
submit.addEventListener('click', (e) => {
    console.log("button works ");
    let titleValue = inputTitle.value
    let contentValue = inputContent.value
    let ingrValue = inputIngr.value
    let ratingValue = inputRating.value
    recipeToDBApi(titleValue, contentValue, ingrValue, ratingValue)
	//inputTitle.value = ""
   
    


})