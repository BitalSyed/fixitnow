const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = 4000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const mongoURI = "mongodb://localhost:27017/fixitnow";
mongoose
  .connect(mongoURI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User model
const User = mongoose.model(
  "signup",
  new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    house: String,
    street: String,
    sector: String,
    city: String,
    password: String,
    tmail: [String],
  })
);
const psignup = mongoose.model(
  "signupworker",
  new mongoose.Schema({
    name: String,
    lname: String,
    cnic: String,
    phone: Number,
    email: String,
    password: String,
    services: [String],
    tmail: [String],
    rating: [Number],
    avgrating: Number,
  })
);

// POST route to save user data
// POST route to save user data
// POST route to save user data
app.post("/signup", async (req, res) => {
  const {
    name,
    phone,
    email,
    house,
    street,
    sector,
    city,
    password,
    confirmPassword,
  } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Account already exists with the same email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      phone,
      email,
      house,
      street,
      sector,
      city,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).render('./html/error.html', { type: 'Registeration Successful', title: "User registered successfully", description: 'Registered Successfully' });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message, message: "Some issue occurred" });
  }
});

//Post route to save professional signup data
//Post route to save professional signup data
//Post route to save professional signup data

// POST route to save user data
app.post("/signupworker", async (req, res) => {
  const { name, lname, cnic, phone, email, password, services } = req.body;

  try {
    // Check if the email already exists
    const existingWorker = await psignup.findOne({ email });

    if (existingWorker) {
      return res
        .status(400)
        .json({ error: "Account already exists with the same email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new worker
    const newpsignup = new psignup({
      name,
      lname,
      cnic,
      phone,
      email,
      services,
      password: hashedPassword,
    });

    // Save the new worker to the database
    await newpsignup.save();
    res.status(201).render('./html/error.html', { type: 'Registeration Successful', title: "User registered successfully", description: 'Registered Successfully' });
  } catch (err) {
    res
      .status(400)
      .render('./html/error.html', { type: 'Error Occured', title: "Some issue Occured", description: 'Registeration Unscucessful' });
  }
});

//professional login logic starts from here
//professional login logic starts from here
//professional login logic starts from here
//professional login logic starts from here

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists with the provided email
    const user = await psignup.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare the provided password with the password in the db
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const professionallogin = await psignup.find({
      email: user.email,
      name: user.name,
      lname: user.lname,
      phone: user.phone,
      services: user.services,
    });

    const token = jwt.sign(user.email, "email");

    professionallogin.forEach((user) => {
      console.log(user);
      user.services.forEach((e) => {
        console.log(e);
      });
    });

    // If login is successful
    res.status(200).json({ auth: token });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "An error occurred during login" });
  }
});

app.post("/verify", async (req, res) => {
  try {
    const auth = req.body.auth;
    console.log(auth);
    const user = jwt.verify(auth, "email");
    const data = await psignup.findOne({ email: user });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Login Expired" + error });
  }
  // console.log('Data'+data+'Email'+user);
  // console.log(user);
  // console.log(jwt.verify(auth, 'email'));
});

//client eg user logic code
//client eg user logic code
//client eg user logic code
//client eg user logic code
//client eg user logic code
//client eg user logic code

app.post("/Userlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const logdat = await User.findOne({ email: user.email });

    if (!logdat) {
      return res.status(400).json({ error: "User data not found" });
    }

    const token = jwt.sign({ email: logdat.email }, "email");
    // console.log(logdat.sector);

    res.status(200).json({ message: "Login successful", auth: token });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "An error occurred during login" });
  }
});

app.post("/finally", async (req, res) => {
  try {
    const auth = req.body.auth;
    const decoded = jwt.verify(auth, "email");
    // console.log(123);
    let data;
    if (decoded.email != null)
      data = await User.findOne({ email: decoded.email });
    else data = await User.findOne({ email: decoded });
    console.log(decoded);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Login Expired: " + error.message });
  }
});

// search the professional functionality
// search the professional functionality
// search the professional functionality
// search the professional functionality
// search the professional functionality
// search the professional functionality
// search the professional functionality

app.post("/search", async (req, res) => {
  const p = await psignup.find({
    services: req.body.service,
  });
  console.log(p);
  res.status(200).json(p);
});

app.post("/book", async (req, res) => {
  const p = await User.findOne({ email: req.body.cmail, tmail: req.body.pmail });
  console.log(p)
  if (p != null) {
    res.status(200).json({ message: "Already Requested" });
  } else {
    const updateResult = await psignup.updateOne(
      { email: req.body.pmail },
      { $push: { tmail: req.body.cmail } }
    );
    const updateResult2 = await User.updateOne(
      { email: req.body.cmail },
      { $push: { tmail: req.body.pmail } }
    );
    // const bug=await User.findOne({email: req.body.cmail});
    console.log(updateResult2);
    res.status(200).json({ message: "Request Sent Sucessfully" });
  }
});


app.post("/send", async(req, res)=>{
  const f = await User.findOne({
    email: req.body.email

  })
  res.status(200).json(f);
  console.log(f)

})

app.post("/tmail",async (req, res)=>{
  const a = await psignup.findOne({
    email: req.body.email
  })
  res.status(200).json(a);
})

app.post("/user",async (req, res)=>{
  console.log(req.body.email)
  const umail = await User.findOne({
    email: req.body.email
  })
  console.log(umail)
  res.status(200).json(umail);
})

app.post('/del', async (req, res)=>{
  // const p = await User.findOne({ email: req.body.cmail, tmail: req.body.pmail });
  // console.log(p)
  // if (p != null) {
    // res.status(200).json({ message: "Already Booked" });
  // } else {
    const updateResult = await psignup.updateOne(
      { tmail: req.body.cmail },
      { $pull: { tmail: req.body.cmail } }
    );
    const updateResult2 = await User.updateOne(
      { tmail: req.body.pmail },
      { $pull: { tmail: req.body.pmail } }
    );
    // const bug=await User.findOne({email: req.body.cmail});
    console.log(updateResult2);
    res.status(200).json({ message: "Success" });
  // }
})





// rating setup 
// rating setup 
// rating setup 
// rating setup 
// rating setup 

function calculateRating(n = []) {

  console.log(n);
  if (n.length === 0) return 0; // Handle empty array case
  
  let t = 0;
  n.forEach(element => {
      t += element;
  });

  return parseFloat((t / n.length).toFixed(2)); // Round to 2 decimal places
}
app.post('/sendrating', async(req,res)=>{
  console.log(req.body.rating)
  const updateRating = await psignup.updateOne(
    { email: req.body.email },
    { $push: { rating: req.body.rating } }
  );

let ra=await psignup.findOne({email: req.body.email});

console.log(ra)
  
  const updateAvgRating = await psignup.updateOne(
    { email: req.body.email },
    { $set: { avgrating: calculateRating(Array.from(ra.rating)) } }
  );
  

})
// admin pannel endpoint for conting the number of entries in mongodb
// admin pannel endpoint for conting the number of entries in mongodb
// admin pannel endpoint for conting the number of entries in mongodb
// admin pannel endpoint for conting the number of entries in mongodb
// admin pannel endpoint for conting the number of entries in mongodb
// admin pannel endpoint for conting the number of entries in mongodb
// admin pannel endpoint for conting the number of entries in mongodb
// admin pannel endpoint for conting the number of entries in mongodb


app.get('/count', async (req, res) => {
  try {
      const count = await psignup.countDocuments(); 
      const usercount = await User.countDocuments();
      const totalcount = count+usercount;
      res.json({usercount, count, totalcount}); 
      console.log('user accounts total' + usercount)
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while counting documents' });
  }
});

app.post('/prodata', async (req, res) => {
  try {
    const users = await psignup.find({}, 'name lname email cnic services phone tmail'); 
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

app.post('/udata', async (req, res) => {
  try {
    const users = await User.find({}, 'name email street house phone sector tmail city'); 
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});













//Static files rendering area
//Static files rendering area
//Static files rendering area
//Static files rendering area
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.static("./"));
app.set("views", path.join(__dirname, "/"));

app.use("/stat", express.static("./"));

app.get("/", async (req, res) => {
  res.status(200).render("./html/temp.html");
});
app.get("/professional", async (req, res) => {
  res.status(200).render("./html/professional.html");
});
app.get("/client", async (req, res) => {
  res.status(200).render("./html/client.html");
});
app.get("/pclient", async (req, res) => {
  res.status(200).render("./html/pclient.html", { name: "User" });
});
app.get("/pdash", async (req, res) => {
  res.status(200).render("./html/pdash.html", { name: "Syed Bital Ali" });
});
app.get("/login", async (req, res) => {
  res.status(200).render("./html/login.html");
});
app.get("/Userlogin", async (req, res) => {
  res.status(200).render("./html/Userlogin.html");
});
app.get("/pclient2",async(req, res)=>{
  res.status(200).render("./html/plient2.html")
})
app.get("/admin", async (req, res)=>{
  res.status(200).render("./html/admin.html")
})
// listing of the server or server settings
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
