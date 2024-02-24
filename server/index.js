const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require('cors');

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

app.get('/items', (req, res) => {
  Item.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

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

app.post("/signup",(req,res)=>{
    const {Name, Email, Password} = req.body;
    const newUser = {
        Name,
        Email,
        Password
    }
    const Signup = new User(newUser)
    Signup.save().then((savedItem)=>{
        res.json(savedItem)
    }).catch(err=>{
        res.status(500).send(err);
    })
})

app.post("/signin", async (req, res) => {
    const { Email, Password } = req.body;
    
    try {
        const userFound = await User.findOne({ Email }).exec();

        if (userFound && userFound.Password === Password) {
            res.json(userFound);
        } else {
            res.json({ "message": "User not found or incorrect password" });
        }
    } catch (err) {
        res.status(500).send(err);
    }

});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
