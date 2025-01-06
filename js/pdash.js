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
let tmails;
const formData = new URLSearchParams();
formData.append("auth", getCookie("auth"));

fetch("/verify", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: formData.toString(), // Convert URLSearchParams to string
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the 
    avgr=data.avgrating==undefined?0:data.avgrating;
    console.log(data, data.tmail);
    pname.innerText = data.name;
    cnic.innerText = data.cnic;
    address.innerText = `Rating: ${avgr}/5`;
    console.log(data.avgrating)
    fullname.innerText = data.name + " " + data.lname;
    emaill.innerText = data.email;
    console.log(data.email);
    phone.innerText = `+92 ${data.phone}`;
    tmails = data.tmail;
    ccnic.innerText = data.cnic;
    aaddress.innerText = `${data.avgrating==undefined?0:data.avgrating}/5`;
    // skills
    console.log(data.services);
    data.services.forEach((element) => {
      const e = document.createElement("p");
      e.classList.add("mt-4", "mb-1");
      e.style.fontSize = "1rem";
      e.style.fontWeight = "bold";
      e.innerText = element;
      document.getElementById("skills").appendChild(e);
    //   tm();
    });
  }).then(tm)
  .catch((error) => {
    console.error("Error:", error);
  });

// Example usage:
// createTechnicianDetails('John Doe', 'Technician specializing in HVAC systems.');


function tm(){
    console.log(tmails)
    tmails.map((e) => {
  console.log(e);
  const formData = new URLSearchParams();
  formData.append("email", e);
  fetch("/user", {
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
        data.name,
        `Phone: ${data.phone}, Email: ${data.email}, Address: House# ${data.house}, Street#${data.street}, Sector# ${data.sector}, City# ${data.city}`, data.phone
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
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

    const whatsapp = document.createElement("button");
    whatsapp.className =
      "inline-flex items-center text-white bg-[#25D366] border-0 py-1 px-4 focus:outline-none hover:bg-[#1ebe56] rounded mt-5";
    whatsapp.textContent = "Whatsapp";
    whatsapp.onclick = function() {
      // const phone = '1234567890'; 
      const formattedPhone = phone[0] === '0' || phone[0] === '+' ? `+92${phone}` : phone;
      window.location.href = `https://wa.me/${formattedPhone}`;
    };
  
    detailsDiv.appendChild(paragraph);
    detailsDiv.appendChild(whatsapp);
    container.appendChild(heading);
    container.appendChild(detailsDiv);
  
    document.body.appendChild(container);
  }
  
   
    function eraseCookie(name) {
      document.cookie = name + "=; Max-Age=0";
      window.location = "/";
    }


document.getElementById('logout').addEventListener('click', function() {
    eraseCookie('auth'); 
    alert('You have been logged out!');
    window.location.href = '/';
});
