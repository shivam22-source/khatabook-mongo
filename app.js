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

app.get("/new", (req, res) => {
    res.render("create")
   

});



app.post(`/`, async (req, res, next) => {

  let { Email, Password } = req.body;
  let createuser = await userModel.create({
 Email,Password

  })



})






app.use((err,req,res,next)=>{
res.send("Internal server issue")

})


app.listen(3000, () => {
  console.log("Server running on port 3000");
});