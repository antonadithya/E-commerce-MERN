const port = 4000;
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");
const { ftruncate } = require("fs");

app.use(express.urlencoded({ extended: true })); // 
app.use(express.json());
app.use(cors());

//Data base connection with mongoDB
mongoose.connect("mongodb+srv://adithya:adithya2003@cluster0.ggo5tre.mongodb.net/test");


// API Creation

app.get("/", (req,res)=> {
 res.send("express is running")
});


const storage = multer.diskStorage({
  destination: 'upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Creating upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});




//Schema for creating Product

const Product = mongoose.model("product",{
  id:{
    type: Number,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  new_price:{
    type:Number,
    required:true,
  },
  old_price:{
    type:Number,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now
  },
 available:{
    type:Boolean,
    default:true,
 }


});

app.post('/addProduct',async (req , res) => {

  let products = await Product.find({});
  let id;

if (products.length > 0) {
  let last_product_array = products.slice(-1);
  let last_product = last_product_array[0];

  if (last_product && last_product.id) {
    id = last_product.id + 1;
  } else {
    // Handle the case where id is not available (e.g., if 'id' is not defined in the schema)
    id = 1;
  }
} else {
  id = 1;
}

  const product = new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  })

  console.log(product);
  await product.save();
  console.log('saved')
  res.json({
    success:true,
    name:req.body.name,

  })
})


// creating Api deleting product

app.post('/removeProduct', async (req ,res)=> {
   await Product.findOneAndDelete({id:req.body.id});
   console.log("Removed")
   res.json({
    success:true,
    name:req.body.name
   })
});



// creating API for getting all product

app.get('/allProduct', async (req, res) => {
  let products = await Product.find({});
  console.log("All Product Fetched");
  res.send(products);
})



//schema creating for User model
const Users = mongoose.model('Users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,

  }
})

//

// Creating  EndPoint for registering the user

app.post('/signup' , async (req ,res) => {


  let check = await Users.findOne({email:req.body.email})

  if (check) {

    return res.status(400).json({
      success:false,
      message: "Email exist"
    })
  }
  
  let cart = {};

 for (let i = 0; i < 300; i++) {
    cart[i]=0;
  
 }
 const user = new Users ({

  name:req.body.username,
  email:req.body.email,
  password:req.body.password,
  cartData:cart,
 })

 await user.save();



 const data = {
  user:{
    id:user.id
  }
 }

const token = jwt.sign(data, 'secret_ecom');
res.json({success:true,token})

})


// creating endpoint for user login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    const passCompare = req.body.password === user.password;

    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: 'wrong password' });
    }
  } else {
    res.json({ success: false, error: 'incorrect email' });
  }
});


// creating endpoint for new collection data
app.get("/newCollection" , async (req, res) =>{
  
  let product =await Product.find({});
  let newCollection = product.slice(1).slice(-8)
  console.log("new collection fetch")
  res.send(newCollection);
});

// creating endpoint for data popularInWomen

app.get("/popularInWomen" , async (req ,res) => {
  let product =await Product.find({category:"women"});
  let popularInWomen  = product.slice(0,4)
  console.log("popularInWomen fetch")
  res.send(popularInWomen);
});


//creating Middleware for fetch user

const fetchUser = async (req , res , next) => {
  const token = req.headers['auth-token'];
  if (!token) {
    res.status(401).send({errors:"please authenticate using valid token "})
  }else{
    try {
      const data = jwt.verify(token, 'secret_ecom')
      req.user = data.user;
      next()
    }catch (error) {
     res.status(401).send({
      errors:"please authenticate using valid token "
     })
  }
}
}

// creating endpoint for data adding product in cartData

app.post('/addToCart', fetchUser, async (req, res) => {
  try {
   

   console.log("Added" , req.body.itemId)

   let userData = await Users.findOne({_id:req.user.id});
   userData.cartData[req.body.itemId] += 1;
   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});

    res.send("added");


  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// creating endpoint for data removing product in cartData

app.post("/removeFormCart", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    console.log("Removing item:", req.body.itemId);

    userData.cartData[req.body.itemId] -= 1;

    if (userData.cartData[req.body.itemId] >= 0) {
      await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
      console.log("Item removed successfully.");
    } else {
      console.log("Item count cannot be negative.");
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// creating endpoint for get cartData
app.post('/getCart' , fetchUser, async (req , res) =>{
 console.log("getCart")
 let userData = await Users.findOne({_id:req.user.id})
 res.json(userData.cartData)
})


app.listen(port, (error) =>{

  if (!error) {
    console.log(`sever running on ${port} `)
  } else {
    console.log("Error :" + error)
  }

});


