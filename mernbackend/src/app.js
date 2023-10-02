const express = require("express");
const path = require("path");
require("./db/conn");
const hbs = require("hbs");

const Register = require("./models/register");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 5000;

//check krta ki index public k andar hai ya nhi::
app.use(express.static(static_path));
//use view engine
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

//sufficient for postman
app.use(express.json());
//for website
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index"); //file dikha skta
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//create a new user in our database
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, gender, password, confirmpassword } = req.body;

    if (password === confirmpassword) {
      const registerEmployee = new Register({
        name,
        email,
        phone,
        gender,
        password,
        confirmpassword,
      });

      const registered = await registerEmployee.save();
      if (registered) {
        res.status(201).json({ message: "Registration successful" });
      } else {
        res.status(500).json({ message: "Failed to register" });
      }
    } else {
      res.status(400).json({ message: "Passwords do not match" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



app.post("/login", async(req, res) => {
try {
  const email=req.body.email;
  const password=req.body.password;


  const useremail= await Register.findOne({email:email});

  if(useremail.password===password){
    res.status(201).render("index");
  }
  else{
    res.send("password are not matching");
  }

  console.log(`Email is ${email} and password is ${password}`)
} catch (error) {
  res.status(400).send("Invalid email");
  
}
});






app.listen(port, () => {
  console.log(`connection is live http://localhost:${port}/`);
});
