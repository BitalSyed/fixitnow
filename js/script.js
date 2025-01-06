// code of search bar in pclient html

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  // const searchButton = document.getElementById("search-button");
  const searchResults = document.getElementById("search-results");

  // searchButton.addEventListener("click", function () {
  //   const searchTerm = searchInput.value.trim();

  //   // Call a function to fetch search results based on the searchTerm
  //   fetchSearchResults(searchTerm);
  // });

  function fetchSearchResults(term) {
    // Simulated search results (replace with actual search logic)
    const results = ["Result 1", "Result 2", "Result 3"];

    // Display search results
    displaySearchResults(results);
  }

  function displaySearchResults(results) {
    searchResults.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
      searchResults.innerHTML = "<p>No results found</p>";
    } else {
      const ul = document.createElement("ul");
      results.forEach((result) => {
        const li = document.createElement("li");
        li.textContent = result;
        ul.appendChild(li);
      });
      searchResults.appendChild(ul);
    }
  }
});

// signup popup functionality

function openPopup() {
  document.getElementById("popup").style.display = "flex";
//  document.getElementById("sec1").style.filter = "blur(5px)";

}
function openPopuplog() {
  document.getElementById("popuplog").style.display = "flex";
}

// Close the popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popuplog").style.display = "none";
}

// scroll function to move to a specific position on the same page

document.getElementById("contactus").onclick = () => {
  const targetElement = document.getElementById("cont");
  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: "smooth",
  });
};

document.getElementById("aboutus").onclick = () => {
  const targetElement = document.getElementById("abou");
  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: "smooth",
  });
};

document.getElementById("working").onclick = () => {
  const targetElement = document.getElementById("work");
  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: "smooth",
  });
};
// professional signup functionality
// document.addEventListener("DOMContentLoaded", function () {
//   const programmingLanguagesSelect = document.getElementById(
//     "programming-languages"
//   );

//   // Initialize Choices.js
//   const choices = new Choices(programmingLanguagesSelect, {
//     placeholder: true,
//     placeholderValue: "Select languages...",
//     searchEnabled: true,
//     removeItemButton: true,
//     shouldSort: false, // Disable sorting
//   });
// });

const tagsContainer = document.getElementById("tagsContainer");
const searchInput = document.getElementById("searchInput");

function addTag() {
  const tagText = searchInput.value.trim();
  if (tagText) {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = tagText;

    // Save to localStorage
    saveTag(tagText);

    tagsContainer.appendChild(tag);
    searchInput.value = "";
  }
}

function saveTag(tagText) {
  let tags = getTags();
  tags.push(tagText);
  localStorage.setItem("tags", JSON.stringify(tags));
}

function getTags() {
  let tags = localStorage.getItem("tags");
  if (tags) {
    return JSON.parse(tags);
  } else {
    return [];
  }
}

function loadTags() {
  const tags = getTags();
  tags.forEach((tagText) => {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = tagText;
    tagsContainer.appendChild(tag);
  });
}

// Load tags on page load
document.addEventListener("DOMContentLoaded", loadTags);

document.addEventListener("DOMContentLoaded", function () {
  // const skillInput = document.getElementById("skill-input");

  
  const suggestionsContainer = document.getElementById("suggestions");
  const selectedSkillsContainer = document.getElementById("selected-skills");

  const predefinedSkills = [
    "Electrician",
    "Plumber",
    "Technician",
    "AC Repair",
    "Carpenter",
    "Painter",
  ];

  // skillInput.addEventListener("input", function () {
  //   const inputValue = skillInput.value.toLowerCase();
  //   suggestionsContainer.innerHTML = "";
  //   suggestionsContainer.style.display = "none";

  //   if (inputValue) {
  //     const filteredSkills = predefinedSkills.filter((skill) =>
  //       skill.toLowerCase().includes(inputValue)
  //     );

  //     if (filteredSkills.length > 0) {
  //       filteredSkills.forEach((skill) => {
  //         const suggestionItem = document.createElement("li");
  //         suggestionItem.textContent = skill;
  //         suggestionItem.addEventListener("click", function () {
  //           addSkill(skill);
  //           skillInput.value = "";
  //           suggestionsContainer.innerHTML = "";
  //           suggestionsContainer.style.display = "none";
  //         });
  //         suggestionsContainer.appendChild(suggestionItem);
  //       });
  //       suggestionsContainer.style.display = "block";
  //     }
  //   }
  // });

  function addSkill(skill) {
    if (!isSkillSelected(skill)) {
      const skillTag = document.createElement("div");
      skillTag.textContent = skill;
      skillTag.className = "skill-tag selected";
      skillTag.addEventListener("click", function () {
        skillTag.remove();
      });
      selectedSkillsContainer.appendChild(skillTag);
    }
  }

  function isSkillSelected(skill) {
    const selectedSkills = document.querySelectorAll(".skill-tag.selected");
    return Array.from(selectedSkills).some((tag) => tag.textContent === skill);
  }
});

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

function makeDecision(n) {
  if (n == "/html/Userlogin.html") {
    const formData = new URLSearchParams();
    formData.append("auth", getCookie("auth"));

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
        // console.log(data.email);
        if (data == null || data.email == undefined) {
          window.location = "/html/Userlogin.html";
        } else {
          window.location = "/pclient";
        }
        // cname.innerText=data.name;
        // cnic.innerText=data.cnic;
        // caddress.innerText=`House# ${data.house}, Street# ${data.street} ${data.sector}, City: ${data.city}`;
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
  } else {
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
        // Handle the data
        // console.log(data.email);
        if (data == null || data.email == undefined) {
          window.location = "/html/login.html";
        } else {
          window.location = "/pdash";
        }
        // cname.innerText=data.name;
        // cnic.innerText=data.cnic;
        // caddress.innerText=`House# ${data.house}, Street# ${data.street} ${data.sector}, City: ${data.city}`;
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
  }
}
