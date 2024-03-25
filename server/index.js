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
app.use(cors());
mongoose
  .connect(
    'mongodb://localhost:27017/course'
  )
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log("This is the Error :    " + err));

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
  
  const cart = new Schema({
    item:Object,
    userId:String
  })
  
  
  
  const User = mongoose.model("User",UserSchema)
  const Item = mongoose.model('Item', itemSchema);
  const Cart = mongoose.model('Cart',cart)


function generateToken(id){
  const token = jwt.sign({id},'shhhh',{
    expiresIn:30000 * 24 * 60 * 60,
  })
  return token
}

app.post("/",async (req,res)=>{
  const {localToken} = req.body;

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

  const courseItem = new Item(newItem);
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

  res.status(201).json({ message: "User Registered successfully", success: true, token: token,id:createdUser._id });
});

// app.post("/cart",async (req,res)=>{
//     const {id} = req.body
//     const token = await jwt.sign({id},"fhhh",{
//       expiresIn:3000*24**60*60*60*3600
//     })
//     res.status(201).json(token);
// })

// app.get("/cart",async (req,res)=>{
//     const cart = localStorage.getItem("cart");
//     jwt.verify(cart,"fhhh",(err,decode)=>{
//       console.log(decode)
//     })
//     const cartItem = Item.find({})
// })

// app.post("/cart-items", async (req, res) => {
//   const { id } = req.body;

//   try {
//     const decode = jwt.verify(id, "fhhh");
//     const userId = decode.id;
//     console.log(userId)
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const cartItems = user.cartItems;

//     res.status(200).json({ cartItems });
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     res.status(401).json({ error: "Unauthorized" });
//   }
// });


// app.post("/cart",async (req,res)=>{
  //     const {id} = req.body
  //     const token = await jwt.sign({id},"fhhh",{
  //       expiresIn:3000*24**60*60*60*3600
  //     })
  //     res.status(201).json(token);
  // })
  
  app.get("/cart/:id",async (req,res)=>{
    const {id} = req.params;
    try{
      const user = await Cart.find({userId:id})
      console.log(user)
      if(user){
        res.status(201).json({status:true,user:user })
      }else{
        res.status(201).json({status:false,message:"Empty Cart" })
      }
    }catch(err){
      res.status(400).json(err);
    }
  })
  
  app.post("/cart-items/:id", async (req, res) => {
      const {id} = req.params;
      const {itemId} = req.body
      // const {}

      try{
        const itemtoadd = await Item.find({_id:itemId})
        console.log(itemtoadd)
        const existingCart = await Cart.findOne({userId:id})
        if(!existingCart){ 
          const objCart = {
            item:[itemtoadd],
            userId:id
          }
          const newCartItem = await Cart.create(objCart)
          res.status(201).json({message:"Item Added to cart", newCartItem})
        }
        else{
          var existingCartItem = existingCart.item
          existingCartItem.push(itemtoadd)
          console.log(existingCartItem)
          const objCart = {
            item:existingCartItem,
            userId:id
          }  
          const updateCart = await Cart.findByIdAndUpdate({_id:existingCart._id},objCart)
          res.status(201).json({message:"Item Added to cart", updateCart})
        }
      }
      catch(err){
        res.status(400).json(err);
      }

  });

// app.post("/cart-items/:id", async (req, res) => {
//   const { id } = req.params;
  
// });


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
      res.status(201).json({ message: 'Login Successful', status: 201, success: true, token: token,id:userFound._id });
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
