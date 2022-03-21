// FRONT END FILE TO INTERACT WITH THE DOM

let buttonAdd = document.querySelector('#submit')

let buttonDisplay = document.querySelector('#display')



//APIS

//ADD TO DB

const recipeToDBApi = (title, content, ingredients, rating) => {
    fetch('/api/addToDB', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
         body: JSON.stringify({title: title, content: content, ingredients: ingredients, rating: rating})
      })
        .then(response=> response.json())
        .then((data) => {
         console.log(data);
            
            // updateOneTaskInTheDOM(data.task) //micha 
        })
        .catch((error) => {
            console.log(error)})

}


buttonAdd.addEventListener('click', (event) => {

    let inputTitle = document.querySelector('#title').value
    let inputContent = document.querySelector('#content').value
    let inputIngredients = document.querySelector('#ingredients').value
    let inputRating = document.querySelector('#rating').value

    let recipeObject = {recipe: {title: inputTitle, content: inputContent, ingredients: inputIngredients, rating: inputRating}}
 

    recipeToDBApi(inputTitle, inputContent, inputIngredients, inputRating)



})

buttonDisplay.addEventListener('click', (event) => {

    let inputTitle = document.querySelector('#title').value
    let inputContent = document.querySelector('#content').value
    let inputIngredients = document.querySelector('#ingredients').value
    let inputRating = document.querySelector('#rating').value

    let recipeObject = [{title: inputTitle, content: inputContent, ingredients: inputIngredients, rating: inputRating}]

    console.log(recipeObject)

    recipeObject.forEach((recipe) => {
        
        let tableheader = document.querySelector('tr')

        tableheader.insertAdjacentHTML('afterEnd', `<tr><td>${recipe.title}</td><td>${recipe.content}</td><td>${recipe.ingredients}</td><td>${recipe.rating}</td></tr>`)



    })

})

