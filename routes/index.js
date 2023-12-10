var express = require('express');
var router = express.Router();

const userModel=require('./users')
const postModel=require('./post');
const passport = require('passport');
const localStrategy=require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))



router.get('/',(req,res)=>{
  res.render("index")
})



router.get('/profile', isLoggedIn ,async (req,res)=>{
  //sending the details of user to frontend so that can be used in ejs file
  let user=await userModel.findOne({
    username:req.session.passport.user
  })
  console.log(user);
  res.render("profile",{user})
})


router.get('/login',(req,res)=>{
  res.render("login",{error:req.flash('error')})
})

router.post('/register',(req,res)=>{
  let userdata=new userModel({
    username: req.body.username,
    
    email:req.body.email,
    fullName:req.body.fullName,
  })
  //register function is provided by the passport-local-mongoose it will enter the user in the db and using hashing it will decrept the password before saving it
  userModel.register(userdata,req.body.password).then(function(){
    passport.authenticate("local")(req,res,()=>{
      res.redirect("/profile")
    })
  })
})


 
router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true
}),(req,res)=>{
  // res.render("login")
})



router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login")
}



router.get('/feeds',isLoggedIn,(req,res)=>{
  res.render("feeds")
})












// **********************************
// //route to create a user
// router.get('/createuser', async function(req, res, next) {
// let createduser= await userModel.create({
//   username: "ayush",
//   password: "ayush",
//   posts: [],
//   email: "ayushshakya538@gmail.com",
//   fullName: "ShakyaAyush",
// });

// res.send(createduser)
//  })

//  //route for createing post
// router.get('/createpost', async function(req, res, next) {

// let createdpost= await postModel.create({
//   postText:"hello bachooooo",
//   user:"6559c93345b789eadb70e415"
  
// });
// let user=await userModel.findOne({_id:"6559c93345b789eadb70e415"})
// user.posts.push(createdpost._id)
// await user.save()
// res.send(createdpost)
// });






module.exports = router;
