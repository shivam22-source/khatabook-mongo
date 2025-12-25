const { profile } = require("console");
const express = require("express");
const app = express();
const userModel=require("./models/user") ///modEls make
const mongooseconnection=require("./config/mongoose") //mongoose connect

app.set("view engine","ejs");
//view engine(html ejs)

app.use(express.static("public"));
///other codes (css,js...)




app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
///parsers form

app.get("/", (req, res) => {
    res.render("index")
   

});

app.get("/register", (req, res) => {
    res.render("create")
   

});


app.post(`/register`, async (req, res, next) => {

  let { email, password } = req.body;
  let createuser = await userModel.create({
email,password

  })


res.redirect(`/`)

})

app.post(`/login`, async (req, res, next) => {

  let { email, password } = req.body;
  let user = await userModel.findOne({
email

  })
if(!user){ return res.send("user not found")}

if(user.password==password){
 res.render("login");
}
else res.send("Invailed Password")


})





app.use((err,req,res,next)=>{
res.send("Internal server issue")

})


app.listen(3000, () => {
  console.log("Server running on port 3000");
});