// FRONT END FILE TO INTERACT WITH THE DOM
//variables
let submit = document.querySelector('#submit')
let inputTitle = document.querySelector('#title')
let inputContent = document.querySelector('#content')
let inputIngr = document.querySelector('#ingredients')
let inputRating = document.querySelector('#rating')
let section = document.querySelector('section')

let footer = document.querySelector('footer')




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
    newAElement.dataset.id = recipe.id
    newAElement.dataset.title = recipe.title
    newAElement.dataset.content =recipe.content
    newAElement.dataset.ingredients = recipe.ingredients
    newAElement.dataset.rating = recipe.rating 

    //newAElement.dataset.completed = task.completed
    // ----strikethrough text if completed :
    //newAElement.style.textDecoration = task.completed ? "line-through" : "none"

   
    // ---create a span that contains a cross, to delete the task:
    const newSpan = document.createElement('span')
    newSpan.innerText = " X "

    // ---Write the content of the task inside the <a>
    //newAElement.innerText = `${order} - ${task.content} - ${task.completed ? "completed" : "to do"}`
    newAElement.innerHTML = ` ${recipe.title} | ${recipe.content} | ${recipe.ingredients} | ${recipe.rating} |`

   // newAElement.innerHTML = "testtt"

    //--- put the <a> AND the span in the <li> :
    newLiElement.appendChild(newAElement)
    newLiElement.appendChild(newSpan)

    //--- add everything to the actual list:
    section.appendChild(newLiElement)

  //---- add horizontal line 
    // const line = '<hr>'
    // newLiElement.insertAdjacentHTML('beforeend', line)


    //---add event listener on the span to delete the task:
    newSpan.addEventListener('click', (event) => {
        deleteOneTaskAPICall(recipe.id)
        console.log("span is clicked");
    })


     // ----add event listener on the <a> to UPDATE the task :
    newAElement.addEventListener('click', (event) => {
        //micha task:
        // event.preventDefault()
        // const currentCompleted = JSON.parse(event.target.dataset.completed)
        // updateOneTaskAPICall(task.task_id, !currentCompleted)
   
        //create button "update title" after you click on a:
       footer.insertAdjacentHTML('beforebegin', '<br> <input type="text" name="updateTitle" id="updateTitle">  <button id="update-title"> Update Title </button>')
        let buttonUpdateTitle = document.querySelector('#update-title');

            //evnelistener on button Update title and when you click, you can UPDATE TITLE:
             buttonUpdateTitle.addEventListener('click', (event) =>{
                console.log("update button clicked ");
                let inputUpdateTitle = document.querySelector('#updateTitle').value
                console.log(inputUpdateTitle);
                updateOneTaskAPICall(inputUpdateTitle)



              });


    })

   
}
//display everything with UPDATED TITLE
// const updateTitledisplayOneRecipeInTheDOM = (recipe) => {
//     //--- create an new list item element:
//     const newLiElement = document.createElement('div')
//     let inputUpdateTitle = document.querySelector('#updateTitle')
//     let newtitlevalue = inputUpdateTitle.value 

//     // ----create a new link to put inside the <li>:
//     const newAElement = document.createElement('a')
//     //--- add some atributes to the <a>:
//     //newAElement.dataset.id = task.recipeId
//     //newAElement.href="#"
//     newAElement.dataset.id = recipe.id
//     newAElement.dataset.newtitle = recipe.newtitle
//     newAElement.dataset.content =recipe.content
//     newAElement.dataset.ingredients = recipe.ingredients
//     newAElement.dataset.rating = recipe.rating 

//     //newAElement.dataset.completed = task.completed
//     // ----strikethrough text if completed :
//     //newAElement.style.textDecoration = task.completed ? "line-through" : "none"

   
//     // ---create a span that contains a cross, to delete the task:
//     const newSpan = document.createElement('span')
//     newSpan.innerText = " X "

//     // ---Write the content of the task inside the <a>
//     //newAElement.innerText = `${order} - ${task.content} - ${task.completed ? "completed" : "to do"}`
//     newAElement.innerHTML = ` ${recipe.newtitle} | ${recipe.content} | ${recipe.ingredients} | ${recipe.rating} |`

//    // newAElement.innerHTML = "testtt"

//     // put the <a> AND the span in the <li> :
//     newLiElement.appendChild(newAElement)
//     newLiElement.appendChild(newSpan)

//     // add everything to the actual list:
//     section.appendChild(newLiElement)

// }



const updateWholeList = ((listOfTasks) => {

	// empty list first
	section.innerHTML = ""
    

	listOfTasks.forEach((recipe) => {
       
		displayOneRecipeInTheDOM(recipe)
	})

})



// const updateTitleupdateWholeList = ((listOfTasks) => {

// 	// empty list first
// 	section.innerHTML = ""
    

// 	listOfTasks.forEach((recipe) => {
       
// 		updateTitledisplayOneRecipeInTheDOM(recipe)
// 	})

// })

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
        //const line = '<hr>'
        //const div = document.querySelector('div')
        //const footer = document.querySelector('footer')
        //div.insertAdjacentHTML('afterend', line)
        
        //console.log(data, "api read all recipe");
        //displayOneRecipeInTheDOM()
        //console.log("readAPI in front works");
       
	})
	.catch((error) => {
		console.log(error)
	})


}

//updateAPI

const updateOneTaskAPICall = (id, title) => {
	fetch(`/api/updateTask/${id}`, {
    method: 'PUT', // or 'PUT'
    headers: {
    	'Content-Type': 'application/json',
    },
    
    body: JSON.stringify({title: title})
    
    

  })
	.then(response=> response.json())
	.then((data) => {
		console.log(data, "data from api  update recipe");
        let inputUpdateTitle = document.querySelector('#updateTitle').value

        updateWholeList(inputUpdateTitle)
        console.log(data.title, "log data..title");
        
                console.log(inputUpdateTitle);
                updateOneTaskAPICall(inputUpdateTitle)

        //updateTitleupdateWholeList(data.recipe.newtitle)
        //console.log(data.recipe.title, "api data.recipe");
       // console.log(data, "api body")
        
	})
	.catch((error) => {
		console.log(error)
	})


}



const deleteOneTaskAPICall = (id) => {
	fetch(`/api/deleteTask/${id}`, {
    method: 'DELETE', // or 'PUT'
  })
	.then(response=> response.json())
	.then((data) => {
		updateWholeList(data.recipe)
        console.log("fetch works delete front end");
	})
	.catch((error) => {
		console.log(error)
	})


}


//eventlistener  on submit to add to DB 
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

//eventlistener on button display to read all 
let button = document.querySelector('button')

button.addEventListener('click', (e) => {

    readAllRecipeApi()
})
