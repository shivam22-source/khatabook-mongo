const express = require("express");
const app = express();

const userModel = require("./models/user");
const { taskModel, validateTask } = require("./models/task");
const mongooseconnection = require("./config/mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  await userModel.create({ email, password });
  res.redirect("/");
});


app.get("/login", async (req, res) => {
  const createuser = await taskModel.find();
  res.render("login", { createuser });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.send("User not found");

  if (user.password === password) {
    const createuser = await taskModel.find();
    return res.render("login", { createuser });
  }

  res.send("Invalid Password");
});


app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  const data = {
    title: req.body.title,
    detail: req.body.detail,
    encrypted: req.body.encrypted === "on",
    password:req.body.encrypted === "on" ? req.body.password : undefined
  };

  /*  JOI VALIDATION */
  const { error } = validateTask(data);
  if (error) {
    return res.send(error.details[0].message);
  }

  await taskModel.create(data);
  res.redirect("/login");
});


app.get("/hisaab/:id", async (req, res) => {
  const result = await taskModel.findById(req.params.id);
res.render("detail",{result:result})
});




app.listen(3000, () => {
  console.log("Server running on port 3000");
});
