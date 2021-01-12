const express = require('express');
const path = require('path');
const port = 8000;

//for mongo db
const db= require('./config/mongoose');

const Contact=require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// middleware1
// app.use(function(req, res, next){
//     req.myName = "Arpan"
//     // console.log('middleware 1 called');
//     next();
// });

// // middleware2
// app.use(function(req, res, next){
    
//     console.log('My name called from MW2', req.myName);
//     // console.log('middleware 2 called');
//     next();
// });


var contactList = [
    {
        name: "manan",
        phone: "8773297931"
    },
    {
        name: "Tushar paigowal",
        phone: "9911677744"
    },
    {
        name: "Coding Ninjas",
        phone: "9911541556"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', function(req, res){
    // console.log('from the get route controller', req.myName);

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;

        }
       
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts

    });
    // return res.render('home',{
    //     title: "Contact List",
    //     contact_list: contactList
    });
});
 app.post('/create-contact', function(req, res){
    
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone,
   // })
   // contactList.push(req.body);

   Contact.create({
       name:req.body.name,
       phone:req.body.phone
   },function(err,newContact){
       if(err){
           console.log('error in creating contact');
           return;
       }
       //if created that is else part
       console.log('*****',newContact);
       return res.redirect('back');
   });
    // return res.redirect('/');

 });
// for deleting a contact
 app.get('/delete-contact',function(req,res){
//  //{
// //old method
//     //get the query from the url
//   //console.log(req.query.phone);    
//  let phone=req.query.phone;

//  let contactIndex=contactList.findIndex( contact => contact.phone==phone);
//  if(contactIndex!= -1)
//    {
//      contactList.splice(contactIndex,1);
//      return res.redirect('back');
//     } 
//     else{
//         console.log("Not found");
//     }

//  });

// }

  //new method with db
  //get the id from query in the url
  let id=req.query.id;
  //find the contact in the database using id and delete
  Contact.findByIdAndDelete(id,function(err){
      if(err){
          console.log('error in deleting a object from database');
          return;
      }
    
      return res.redirect('back');
  });

 });

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})