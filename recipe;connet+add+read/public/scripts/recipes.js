// FRONT END FILE TO INTERACT WITH THE DOM
//variables
let submit = document.querySelector('#submit')
let inputTitle = document.querySelector('#title')
let inputContent = document.querySelector('#content')
let inputIngr = document.querySelector('#ingredients')
let inputRating = document.querySelector('#rating')
let section = document.querySelector('section')



// DISPLAY THE RECIPES IN DOM 
//create DOM 
const displayOneRecipeInTheDOM = (recipe) => {
    //--- create an new list item element:
    const newLiElement = document.createElement('div')
    

    // ----create a new link to put inside the <li>:
    const newAElement = document.createElement('a')
    //--- add some atributes to the <a>:
    //newAElement.dataset.id = task.recipeId
    //newAElement.href="#"
    //newAElement.dataset.id = recipe.recipe_id

    newAElement.dataset.title = recipe.title
    newAElement.dataset.content =recipe.content
    newAElement.dataset.ingredients = recipe.ingredients
    newAElement.dataset.rating = recipe.rating 

    //newAElement.dataset.completed = task.completed
    // ----strikethrough text if completed :
    //newAElement.style.textDecoration = task.completed ? "line-through" : "none"

   
    // ---create a span that contains a cross, to delete the task:
    const newSpan = document.createElement('span')
    newSpan.innerText = "×"

    // ---Write the content of the task inside the <a>
    //newAElement.innerText = `${order} - ${task.content} - ${task.completed ? "completed" : "to do"}`
    newAElement.innerHTML = `${recipe.title} - ${recipe.content} - ${recipe.ingredients} - ${recipe.rating}`

   // newAElement.innerHTML = "testtt"

    // put the <a> AND the span in the <li> :
    newLiElement.appendChild(newAElement)
    newLiElement.appendChild(newSpan)

    // add everything to the actual list:
    section.appendChild(newLiElement)

    // add event listener on the <a> to update the task (change its status):
    // newAElement.addEventListener('click', (event) => {
    //     event.preventDefault()
    //     const currentCompleted = JSON.parse(event.target.dataset.completed)
    //     updateOneTaskAPICall(task.task_id, !currentCompleted)

    // })

    // add event listener on the span to delete the task:
    // newSpan.addEventListener('click', (event) => {
    //     deleteOneTaskAPICall(task.task_id)
    // })



}


const updateWholeList = ((listOfTasks) => {

	// empty list first
	//section.innerHTML = ""
    

	listOfTasks.forEach((recipe) => {
       
		displayOneRecipeInTheDOM(recipe)
	})

})

// Get the inserted recipes into your DB 
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
        //  console.log(data);
         
            displayOneRecipeInTheDOM(data.recipe)
            
            // updateOneTaskInTheDOM(data.task) //micha 
        })
        .catch((error) => {
            console.log(error)})

}


// read all recipes 
const readAllRecipeApi = () => {

	fetch('/api/getAllRecipe', {
    method: 'GET', // or 'PUT'
  })
	.then(response=> response.json())
	.then((data) => {
		
        updateWholeList(data.recipe)
        console.log(data, "api read all recipe");
        //displayOneRecipeInTheDOM()
        console.log("API in front works");
	})
	.catch((error) => {
		console.log(error)
	})


}



//eventlistener 
submit.addEventListener('click', (e) => {
    
    let titleValue = inputTitle.value
    let contentValue = inputContent.value
    let ingrValue = inputIngr.value
    let ratingValue = inputRating.value
    recipeToDBApi(titleValue, contentValue, ingrValue, ratingValue)
   
	inputTitle.value = "";
    inputContent.value="";
    inputIngr.value="";
    inputRating.value="";
    

   
   
})


let button = document.querySelector('button')

button.addEventListener('click', (e) => {

    readAllRecipeApi()
})
