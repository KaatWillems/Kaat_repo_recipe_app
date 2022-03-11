const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES


const addToDB = (req,res,data) => {
   

console.log("hello backend", data);

let recipeId

	let db = new sqlite3.Database('db/db.recipe');
	db.run(`INSERT INTO recipe (title, content, ingredients, rating) VALUES (?, ?, ?, ?)`, [data.title, data.content, data.ingredients, data.rating], function(err) {
		if (err) {
			return console.log(err);
		}
      // get the last insert id
      recipeId = this.lastID
      console.log(`A row has been inserted with rowid ${recipeId}`);
    });

	db.close((err) => {

		if (err) {
			return res.send({ error: "Cannot insert recipe into database"})
		}
		// send the inserted task back to the front, as a proof it worked :
		res.send({message:"succes in db"})
	});
}



exports.addToDB = addToDB;