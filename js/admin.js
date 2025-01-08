//speech function
function textToSpeech(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = window.speechSynthesis.getVoices()[0];
    speech.pitch = 1
    speech.rate = 1
    window.speechSynthesis.speak(speech)
}



// Fetch count data
function count() {
    fetch("/count")
      .then((response) => response.json())
      .then((data) => {
        totalpcc.innerText = data.count;
        totalucc.innerText = data.usercount;
        totalacc.innerText = data.totalcount;
      })
      .catch((error) => {
        console.error("Error fetching the count:", error);
      });
  }
  count();
  
  
  
  
  
  
  function prodata(){
      userTable.innerHTML = '';
      requested.innerText = 'Job'
   addre.innerText = 'Orders'
   
  
  fetch("/prodata", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((data) => {
     
      if (Array.isArray(data)) {
  
        data.forEach(user => {
          const userData = {
            imageSrc: "/img/logo.png",
            name: user.name + " " + user.lname,
            email: user.email, 
            jobTitle: user.services, 
            phone: user.phone, 
            orders: user.tmail, 
            role: "Professional", 
          };
  
          addUserToTable(userData);
          console.log(userData)
        });
      } else {
        console.error("Unexpected data format:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
    
}



function udata(){
    userTable.innerHTML = '';
   requested.innerText = 'Requested To'
   addre.innerText = 'Address'
  
    fetch("/udata", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
       
        if (Array.isArray(data)) {
    
          data.forEach(user => {
            const userData = {
              imageSrc: "https://www.w3.org/assets/website-2021/svg/avatar.svg",
              name: user.name,
              email: user.email, 
              jobTitle: `House#${user.house} Street#${user.street} Sector#${user.sector} City#${user.city}`, 
              phone: user.phone, 
              orders: user.tmail, 
              role: "User/Client", 
            };
            addUserToTable(userData);
            console.log(userData)
          });
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
      
  }






  function addUserToTable(user) {
    const tbody = document.getElementById("userTable");
  
    // Ensure tbody exists
    if (!tbody) {
      console.error('No tbody element with the ID "userTable" found.');
      return;
    }
  
    // Create a row element
    const tr = document.createElement("tr");
  
    // Create first td (User Image and Info)
    const td1 = document.createElement("td");
    td1.classList.add("px-6", "py-4", "whitespace-no-wrap", "border-b", "border-gray-200");
  
    const divFlex = document.createElement("div");
    divFlex.classList.add("flex", "items-center");
  
    const divImg = document.createElement("div");
    divImg.classList.add("flex-shrink-0", "w-10", "h-10");
  
    const img = document.createElement("img");
    img.src = user.imageSrc;
    img.alt = "";
    img.classList.add("w-10", "h-10", "rounded-full");
  
    divImg.appendChild(img);
  
    const divText = document.createElement("div");
    divText.classList.add("ml-4");
  
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("text-sm", "font-medium", "leading-5", "text-gray-900");
    nameDiv.textContent = user.name;
  
    const emailDiv = document.createElement("div");
    emailDiv.classList.add("text-sm", "leading-5", "text-gray-500");
    emailDiv.textContent = user.email;
  
    divText.appendChild(nameDiv);
    divText.appendChild(emailDiv);
  
    divFlex.appendChild(divImg);
    divFlex.appendChild(divText);
    td1.appendChild(divFlex);
  
    // Create second td (Job Title)
    const td2 = document.createElement("td");
    td2.classList.add("px-6", "py-4", "whitespace-no-wrap", "border-b", "border-gray-200");
  
    const jobTitleDiv = document.createElement("div");
    jobTitleDiv.classList.add("text-sm", "leading-5", "text-gray-900");
    jobTitleDiv.textContent = user.jobTitle;
  
    td2.appendChild(jobTitleDiv);
  
    // Create third td (Phone)
    const td3 = document.createElement("td");
    td3.classList.add("px-6", "py-4", "whitespace-no-wrap", "border-b", "border-gray-200");
  
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("text-sm", "leading-5", "text-gray-900");
    phoneDiv.textContent = user.phone; // Add phone number
  
    td3.appendChild(phoneDiv);
  
    // Create fourth td (Orders)
    const td4 = document.createElement("td");
    td4.classList.add("px-6", "py-4", "text-sm", "leading-5", "text-gray-500", "whitespace-no-wrap", "border-b", "border-gray-200");
    td4.textContent = user.orders; // Add orders
  
    // Create fifth td (Role)
    const td5 = document.createElement("td");
    td5.classList.add("px-6", "py-4", "text-sm", "leading-5", "text-gray-500", "whitespace-no-wrap", "border-b", "border-gray-200");
    td5.textContent = user.role;
  
    // Create sixth td (Edit link)
    const td6 = document.createElement("td");
    td6.classList.add("px-6", "py-4", "text-sm", "font-medium", "leading-5", "text-right", "whitespace-no-wrap", "border-b", "border-gray-200");
  
    // const editLink = document.createElement("a");
    // editLink.href = "#";
    // editLink.classList.add("text-indigo-600", "hover:text-indigo-900");
    // editLink.textContent = "Edit";
  
    // td6.appendChild(editLink);
  
    // Append all tds to the row
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
  
    // Append the row to the table body
    tbody.appendChild(tr);
  }

