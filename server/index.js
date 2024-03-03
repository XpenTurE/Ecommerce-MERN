const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require("jsonwebtoken")
const cors = require('cors');
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
app.use(cors());
mongoose
  .connect(
    'mongodb://localhost:27017/course'
  )
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log("This is the Error :    " + err));

// Define the Item schema
const itemSchema = new Schema({
  Name: String,
  Description: String,
  Image: String,
  Price: Number,
  Category: String,
});
const UserSchema = new Schema({
    Name: String,
    Email:String,
    Password: String,
  });

const User = mongoose.model("User",UserSchema)
// Create the Item model
const Item = mongoose.model('Item', itemSchema);

function generateToken(id){
  const token = jwt.sign({id},'shhhh',{
    expiresIn:30000 * 24 * 60 * 60,
  })
  return token
}

app.post("/",async (req,res)=>{
  const {localToken} = req.body;
  console.log(localToken);

  jwt.verify(localToken,"shhhh",async (err,decode)=>{
    if(err){
      return res.status(401).json({ message: "Invalid token" });
    }
    const userId = decode.id
    const user = await User.findById(userId)
    if(!user){
      return res.status(401).json({message:"User not found",auth:false})
    }
    res.status(201).json({message:"Uaer Found",auth:true})
  })
})

app.get('/items', (req, res) => {
  Item.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/profile",(req,res)=>{
  const {token} = req.body
  jwt.verify(token,"shhhh",async (err,decode)=>{
    if(err){
      return res.status(401).json({message:"User Does not  Found"})
    }
    const userId = decode.id;
    const user = await User.findById(userId)
    res.status(201).json({user, message:"User Found and Details sent"})
  })
})

app.post('/items', (req, res) => {
  const { Name, Description, Image, Price, Category } = req.body;
  const newItem = {
    Name,
    Description,
    Image,
    Price,
    Category,
  };

  // Create a new Item using the Mongoose model
  const courseItem = new Item(newItem);

  // Save the item to the database
  courseItem
    .save()
    .then((savedItem) => {
      res.json(savedItem);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/signup', async (req, res) => {
  const { Name, Email, Password } = req.body;
  const hasedPassword = await bcrypt.hash(Password,10)

  const newUser = {
    Name,
    Email,
    Password:hasedPassword
  }

  

  const existUser = await User.findOne({ Email });

  if (existUser) {
    return res.status(401).json({ message: "User Already Exist" });
  }

  const createdUser = await User.create(newUser);
  const token = generateToken(createdUser._id);
  res.cookie('token', token, {
    sameSite: 'None',
    secure: true
  });

  res.status(201).json({ message: "User Registered successfully", success: true, token: token });
});

app.post("/cart",async (req,res)=>{
    const {id} = req.body
    const token = await jwt.sign({id},"fhhh",{
      expiresIn:3000*24**60*60*60*3600
    })
    res.status(201).json(token);
})

app.get("/cart",async (req,res)=>{
    const cart = localStorage.getItem("cart");
    jwt.verify(cart,"fhhh",(err,decode)=>{
      console.log(decode)
    })
    const cartItem = Item.find({})
})

app.post('/signin', async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const userFound = await User.findOne({ Email });
    const comparePasssword =await bcrypt.compare(Password,userFound.Password)
    if (userFound && comparePasssword) {
      const token = generateToken(userFound._id);
      res.cookie('token', token, {
        sameSite: 'None',
        secure: true  
      });
      res.status(201).json({ message: 'Login Successful', status: 201, success: true, token: token });
    } else {
      return res.json({ message: 'User not found or incorrect password', status: 401 });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

  
  app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
