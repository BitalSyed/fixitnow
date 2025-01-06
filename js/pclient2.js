// Retrieve the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'email' parameter from the URL
const emailValue = urlParams.get("email");

// If the email parameter exists, set the input value
if (emailValue) {
  document.getElementById("email").value = emailValue;
}

function createTechnicianDetails(name, details, phone) {
  // Create the container div
  const container = document.createElement("div");
  container.className = "container px-5 py-24 mx-auto flex flex-wrap";

  // Create the h2 element for the name
  const heading = document.createElement("h2");
  heading.className =
    "sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5";
  heading.textContent = name;

  // Create the div for the technician details
  const detailsDiv = document.createElement("div");
  detailsDiv.className = "md:w-3/5 md:pl-6";

  // Create the p element for the details
  const paragraph = document.createElement("p");
  paragraph.className = "leading-relaxed text-base";
  paragraph.textContent = details;

  // Create the div for the button
  const buttonDiv = document.createElement("div");
  buttonDiv.className = "flex md:mt-4 mt-6";



  // Create the button
  const button = document.createElement("button");
  button.className =
    "inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded";
  button.textContent = "Task Completed";
  button.onclick = openRatingDialog;

  const whatsapp = document.createElement("button");
  whatsapp.className =
    "inline-flex items-center text-white bg-[#25D366] border-0 py-1 px-4 focus:outline-none hover:bg-[#1ebe56] rounded ml-5";
  whatsapp.textContent = "Whatsapp";
  whatsapp.onclick = function() {
    // const phone = '1234567890'; // Replace with actual phone number logic
    const formattedPhone = phone[0] === '0' || phone[0] === '+' ? `+92${phone}` : phone;
    window.location.href = `https://wa.me/${formattedPhone}`;
  };
  


  const submit = document.getElementById("submission");
  submit.onclick = function(event) {
    event.preventDefault();

    if (handlesubmit(event, details)) {
        complete(name, details);
    }
};
  // Append the elements to the DOM
  buttonDiv.appendChild(button);
  buttonDiv.appendChild(whatsapp);
  detailsDiv.appendChild(paragraph);
  detailsDiv.appendChild(buttonDiv);
  container.appendChild(heading);
  container.appendChild(detailsDiv);

  // Append the container to the body or any other element
  abc.appendChild(container);
}

function extractEmail(text) {
  // Regular expression to match an email address
  const emailPattern = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailPattern);
  return match ? match[0] : null;
}

function complete(n, d) {
  console.log(extractEmail(d));
  const formData = new URLSearchParams();
  formData.append("pmail", extractEmail(d));
  formData.append("cmail", email.value);
  fetch("/del", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(), // Convert URLSearchParams to string
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // if (data.message == "Success") window.location = "/pclient";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Example usage:
// createTechnicianDetails('John Doe', 'Technician specializing in HVAC systems.');

fetch("/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: urlParams.toString(), // Convert URLSearchParams to string
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.tmail.map((e) => {
      console.log(e);
      const formData = new URLSearchParams();
      formData.append("email", e);
      fetch("/tmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(), // Convert URLSearchParams to string
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          createTechnicianDetails(
            data.name + " " + data.lname,
            `Phone: ${data.phone}, Email: ${data.email}, Skills/Services: ${data.services}`, data.phone
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });




// rateus section 
// rateus section 
// rateus section 
// rateus section 
// rateus section 
// rateus section 
// rateus section 
// rateus section 



function openRatingDialog() {
  document.getElementById('ratingDialog').style.display = 'block';
}



function handlesubmit(event, d) {
  event.preventDefault(); 

  let ratingElement = document.querySelector('input[name="rating"]:checked');
  if (ratingElement) {
      let ratingValue = parseInt(ratingElement.value, 10); 
      console.log("Number of stars selected: ", ratingValue);
      window.location.reload();
      
      
      
      
      const urlParams = new URLSearchParams();
      urlParams.append("rating", ratingValue);
      urlParams.append("email", extractEmail(d));
      // formData.append("cmail", email.value);
      
      console.log(urlParams);
      console.log(ratingValue);
      fetch("/sendrating", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: urlParams.toString(), // Convert URLSearchParams to string
})
  .then((response) => response.json())
  .then((data) => {
      
    
  })
  .catch((error) => {
    console.error("Error:", error);
  });
      return true;
    } else {
      alert("Please Select Rating First");
      document.getElementById("submission").disabled = true;
      window.location.reload();
      return false; 
    }
}



window.onload = function() {
    document.getElementById('ratingDialog').style.display = 'none';
};







