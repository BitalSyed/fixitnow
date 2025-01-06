const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const mongoURI = "mongodb://localhost:27017/fixitnow";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Function to generate a random string
function getRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Array of common Pakistani first names
const pakistaniFirstNames = [
  "Ahmed", "Ali", "Ayesha", "Fatima", "Hassan", "Hina", "Khan", "Mariam", "Sami", "Zainab", "Usman", "Sadia", "Bilal", "Nida"
];

// Array of common Pakistani last names
const pakistaniLastNames = [
  "Khan", "Sheikh", "Butt", "Chaudhry", "Malik", "Siddiqui", "Raja", "Bhatti", "Rehman", "Farooq"
];

// Array of common US first names
const usFirstNames = [
  "John", "Michael", "Sarah", "Emily", "James", "David", "Jessica", "Ashley", "Robert", "Jennifer"
];

// Array of common US last names
const usLastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Taylor", "Anderson"
];

// Function to generate a random first name
function getRandomFirstName() {
  // 50% chance to select a Pakistani or US first name
  const isPakistani = Math.random() < 0.5;

  return isPakistani
    ? pakistaniFirstNames[Math.floor(Math.random() * pakistaniFirstNames.length)]
    : usFirstNames[Math.floor(Math.random() * usFirstNames.length)];
}

// Function to generate a random last name
function getRandomLastName() {
  // 50% chance to select a Pakistani or US last name
  const isPakistani = Math.random() < 0.5;

  return isPakistani
    ? pakistaniLastNames[Math.floor(Math.random() * pakistaniLastNames.length)]
    : usLastNames[Math.floor(Math.random() * usLastNames.length)];
}

// Function to generate a random phone number
function getRandomPhoneNumber() {
  return "3" + Math.floor(100000000 + Math.random() * 900000000);
}

// Function to generate random CNIC
function getRandomCNIC() {
  return `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(
    1000000 + Math.random() * 9000000
  )}-${Math.floor(1 + Math.random() * 9)}`;
}

// Array of available services
const servicesArray = [
  "plumber",
  "electrician",
  "car-mechanic",
  "bike-mechanic",
  "mobile-repair",
  "computer-repair",
  "tv-repair",
  "washing-machine-repair",
  "refrigerator-repair",
  "ac-repair",
  "microwave-repair",
  "water-heater-repair",
  "printer-repair",
  "camera-repair",
  "fan-repair",
  "geyser-repair",
  "home-theater-repair",
  "laptop-repair",
  "tablet-repair",
  "sewing-machine-repair",
  "drain-cleaning",
  "roof-repair",
  "floor-repair",
  "furniture-repair",
  "door-lock-repair",
  "window-repair",
  "curtain-installation",
  "glass-repair",
  "carpentry-services",
  "painting-services",
  "pest-control",
  "garden-maintenance",
  "pool-maintenance",
  "water-purifier-repair",
  "solar-panel-repair",
  "elevator-repair",
  "garage-door-repair",
  "chimney-repair",
  "ceiling-fan-installation",
  "smart-home-installation",
  "security-system-repair",
  "battery-backup-repair",
  "fire-alarm-repair",
  "cctv-installation",
  "water-leak-repair",
  "gas-pipeline-repair",
  "blinds-repair",
  "dryer-repair",
  "electric-gate-repair",
  "ups-repair",
  "inverter-installation",
  "generator-repair",
  "solar-water-heater-installation",
  "mosquito-net-installation",
  "water-tank-cleaning",
  "sofa-cleaning",
  "water-pump-repair",
  "motorcycle-tuning",
  "gas-stove-repair",
  "electric-iron-repair",
  "fan-installation",
  "geyser-installation",
  "wardrobe-assembly",
  "handyman-services",
  "electric-panel-installation",
  "cable-wiring",
  "internet-setup-repair",
  "cctv-maintenance",
  "satellite-dish-installation",
  "air-cooler-repair",
  "water-dispenser-repair",
  "room-heater-repair",
  "home-automation-services",
  "sound-system-installation",
  "tile-installation",
  "plumbing-services",
  "lighting-installation",
  "electrical-troubleshooting",
  "borewell-repair",
  "solar-street-light-installation",
  "mobile-software-installation",
  "it-network-setup",
  "smartphone-screen-replacement",
  "laptop-battery-replacement",
  "home-cleaning-services",
  "car-detailing",
  "bike-repair",
  "waterproofing-services",
  "building-maintenance",
  "paver-block-installation",
  "gate-fabrication",
  "fence-installation",
  "railing-installation",
  "interior-design-consultation",
  "wallpaper-installation",
  "paint-touch-ups",
  "security-guard-services",
  "lawn-mowing",
  "pabx-system-installation",
];

// Define the worker schema with `rating` and `tmail` fields
const workerSchema = new mongoose.Schema({
  name: String,
  lname: String,
  cnic: String,
  phone: String, // Changed to String
  email: String,
  password: String,
  services: { type: [String], default: [] }, // Default empty array for services
  rating: { type: [Number], default: [] }, // Default empty array for rating
  avgrating: { type: String, default: "0" }, // Default to "0" as a string
  tmail: { type: [String], default: [] }
});

const Worker = mongoose.model("signupworker", workerSchema);

const workers = [];

for (let i = 0; i < 50; i++) {
  const name = getRandomFirstName();
  const lname = getRandomLastName();
  const cnic = getRandomCNIC();
  const phone = getRandomPhoneNumber();
  const email = `${name.toLowerCase().replace(" ", "")}${i}@gmail.com`;
  const password = bcrypt.hashSync("123", 10); // Hashing the password
  const services = [
    servicesArray[Math.floor(Math.random() * servicesArray.length)],
    servicesArray[Math.floor(Math.random() * servicesArray.length)],
  ];

  workers.push({
    name: name,
    lname: lname,
    cnic: cnic,
    phone: phone,
    email: email,
    password: password,
    services: services,
    rating: [], // Empty array for ratings
    avgrating: "0", // Default avgrating as a string
    tmail: [],  // Empty tmail
  });
}

(async () => {
  try {
    await Worker.insertMany(workers);
    console.log("Data inserted successfully!");
  } catch (err) {
    console.error("Error inserting data: ", err);
  } finally {
    mongoose.connection.close(); // Ensure the connection is closed after operations
  }
})();




// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const mongoURI = "mongodb://localhost:27017/fixitnow";

// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // Function to generate a random string
// function getRandomString(length) {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

// // Arrays of names
// const pakistaniFirstNames = [
//   "Ahmed", "Ali", "Ayesha", "Fatima", "Hassan", "Hina", "Khan", "Mariam", "Sami", "Zainab", "Usman", "Sadia", "Bilal", "Nida"
// ];
// const pakistaniLastNames = [
//   "Khan", "Sheikh", "Butt", "Chaudhry", "Malik", "Siddiqui", "Raja", "Bhatti", "Rehman", "Farooq"
// ];

// // Function to generate random names
// function getRandomFirstName() {
//   return pakistaniFirstNames[Math.floor(Math.random() * pakistaniFirstNames.length)];
// }
// function getRandomLastName() {
//   return pakistaniLastNames[Math.floor(Math.random() * pakistaniLastNames.length)];
// }

// // Function to generate a random phone number
// function getRandomPhoneNumber() {
//   return "030" + Math.floor(10000000 + Math.random() * 9000000);
// }

// // Function to generate random CNIC
// function getRandomCNIC() {
//   return `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(
//     1000000 + Math.random() * 9000000
//   )}-${Math.floor(1 + Math.random() * 9)}`;
// }

// // Define the worker schema with additional fields and empty `tmail` array
// const workerSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   email: String,
//   house: String,
//   street: String,
//   sector: String,
//   city: String,
//   password: String,
//   tmail: { type: Array, default: [] }, // Empty array for tmail
// });

// const Worker = mongoose.model("signup", workerSchema);

// const workers = [];

// for (let i = 0; i < 50; i++) {
//   const name = getRandomFirstName();
//   const phone = getRandomPhoneNumber();
//   const email = `${name.toLowerCase()}${i}@gmail.com`;
//   const password = bcrypt.hashSync("123", 10); // Hashing the password

//   workers.push({
//     name: name,
//     phone: phone,
//     email: email,
//     house: Math.floor(1 + Math.random() * 1000).toString(), // Random house number
//     street: Math.floor(1 + Math.random() * 500).toString(), // Random street number
//     sector: "G-" + Math.floor(1 + Math.random() * 11), // Random sector
//     city: "Islamabad", // Static city for this example
//     password: password,
//     tmail: [], // Empty tmail array
//   });
// }

// (async () => {
//   try {
//     await Worker.insertMany(workers);
//     console.log("Data inserted successfully!");
//   } catch (err) {
//     console.error("Error inserting data: ", err);
//   } finally {
//     mongoose.connection.close(); // Ensure the connection is closed after operations
//   }
// })();
