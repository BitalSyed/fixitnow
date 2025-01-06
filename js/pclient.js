function getCookie(name) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") cookie = cookie.substring(1);
    if (cookie.indexOf(nameEQ) === 0)
      return cookie.substring(nameEQ.length, cookie.length);
  }
  return null;
}

const formData = new URLSearchParams();
formData.append("auth", getCookie("auth"));
console.log(formData);

fetch("/finally", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: formData.toString(), // Convert URLSearchParams to string
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the data
    console.log(data);
    cname.innerText = data.name;
    // cnic.innerText=data.cnic;
    caddress.innerText = `House# ${data.house}, Street# ${data.street} ${data.sector}, City: ${data.city}`;
    cmail.value = data.email;
    // fullname.innerText=data.name+' '+data.lname;
    // email.innerText=data.email;
    // phone.innerText=data.phone;
    // ccnic.innerText=data.cnic;
    // aaddress.innerText=data.address;
    // skills
    // console.log(data.services);
    // data.services.forEach(element => {
    //     const e=document.createElement('p');
    //     e.classList.add('mt-4', 'mb-1');
    //     e.style.fontSize='1rem';
    //     e.style.fontWeight='bold';
    //     e.innerText=element;
    //     document.getElementById('skills').appendChild(e);
    // });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=0";
  window.location = "/";
}

// search and finding functionality
// search and finding functionality
// search and finding functionality
// search and finding functionality
// search and finding functionality

function createWorkerCard(name, phoneNumber, email, services, rating) {
  // Create the container div
  const container = document.createElement("div");
  container.className = "container px-5 py-24 mx-auto";

  // Create the outer div with classes
  const outerDiv = document.createElement("div");
  outerDiv.className = "-my-8 divide-y-2 divide-gray-100";

  // Create the inner div for flex layout
  const flexDiv = document.createElement("div");
  flexDiv.className = "py-8 flex flex-wrap md:flex-nowrap";

  // Create the div for name and phone number
  const infoDiv = document.createElement("div");
  infoDiv.className = "md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col";

  const nameSpan = document.createElement("span");
  nameSpan.className = "font-semibold title-font text-gray-700";
  nameSpan.textContent = name;

  const phoneSpan = document.createElement("span");
  phoneSpan.className = "mt-1 text-gray-500 text-sm";
  phoneSpan.textContent =  phoneNumber; 

  const ratingSpan = document.createElement("span");
  ratingSpan.className = "mt-1 text-gray-500 text-sm";
  ratingSpan.textContent =`Rating: ${rating}/5`;
 
  infoDiv.appendChild(nameSpan);
  infoDiv.appendChild(phoneSpan);
  infoDiv.appendChild(ratingSpan);
  // Create the div for email and services
  const contentDiv = document.createElement("div");
  contentDiv.className = "md:flex-grow";

  const emailHeading = document.createElement("h2");
  emailHeading.className = "text-2xl font-medium text-gray-900 title-font mb-2";
  emailHeading.textContent = email;

  const servicesParagraph = document.createElement("p");
  servicesParagraph.className = "leading-relaxed";
  servicesParagraph.textContent = services;

  const requestLink = document.createElement("a");
  requestLink.className = "text-indigo-500 inline-flex items-center mt-4";
  requestLink.textContent = "Send Request";
  // requestLink.href = "";

  // Add the onclick event to call the request() function with the appropriate data
  requestLink.onclick = function () {
    request(name, phoneNumber, email, services);
        // window.location.href= '/pclient2';
  };

  const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgIcon.className = "w-4 h-4 ml-2";
  svgIcon.setAttribute("viewBox", "0 0 24 24");
  svgIcon.setAttribute("stroke", "currentColor");
  svgIcon.setAttribute("stroke-width", "2");
  svgIcon.setAttribute("fill", "none");
  svgIcon.setAttribute("stroke-linecap", "round");
  svgIcon.setAttribute("stroke-linejoin", "round");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M5 12h14");

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M12 5l7 7-7 7");

  svgIcon.appendChild(path1);
  svgIcon.appendChild(path2);
  requestLink.appendChild(svgIcon);

  contentDiv.appendChild(emailHeading);
  contentDiv.appendChild(servicesParagraph);
  contentDiv.appendChild(requestLink);

  // Append all to flexDiv
  flexDiv.appendChild(infoDiv);
  flexDiv.appendChild(contentDiv);

  // Append flexDiv to outerDiv
  outerDiv.appendChild(flexDiv);

  // Append outerDiv to container
  container.appendChild(outerDiv);

  // Append the container to the body or a specific element in your HTML
  datasection.appendChild(container);
}

// Example usage

// Define the request function to handle the data
function request(name, phoneNumber, email, services) {
  const formData = new URLSearchParams();
  formData.append("pmail", email);
  formData.append("cmail", cmail.value);
  console.log(formData);

  fetch("/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(), // Convert URLSearchParams to string
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the data
      console.log(data);
      alert(data.message);
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function search() {
  if (document.getElementById("search-bar").value == "") {
    alert("Please select a service first");
  } else {
    const formData = new URLSearchParams();
    const value = document
      .getElementById("search-bar")
      .value.toLowerCase()
      .replace(/\s+/g, "-");
    formData.append("service", value);
    console.log(formData);

    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(), // Convert URLSearchParams to string
    })
      .then((response) => response.json())
      .then((data) => {
        datasection.innerHTML = "";
        data.map((e) => {
          console.log(e);
          if (e.phone[0] != "+" || e.phone[0] != 0)
            createWorkerCard(
              e.name + " " + e.lname,
              "+92-" + e.phone,
              e.email,
              e.services,
              e.avgrating
            );
          
          else
            createWorkerCard(
              e.name + " " + e.lname,
              e.phone,
              e.email,
              e.services,
              e.avgrating
            );
        });
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

