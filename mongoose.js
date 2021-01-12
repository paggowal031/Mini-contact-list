//require the library
const mongoose=require('mongoose');

//connect to the databse
mongoose.connect('mongodb://localhost/contacts_list_db');

//aquire the connection (to check if it successful)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,"error connecting to database"));

//up and running
db.once('open',function(){
 
    console.log("successfully connected to the database");
});