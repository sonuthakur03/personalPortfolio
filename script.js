// Function to show description
function showDescription(descriptionId) {
  // Hide all description divs
  let descriptions = document.querySelectorAll(".sideBox");
  descriptions.forEach(description => {
    description.style.display = "none";
    description.style.opacity = 0;
  });
  
  // Show the description div corresponding to the hovered element
  let description = document.getElementById(descriptionId);
  if (description) {
    description.style.display = "flex";
    description.style.opacity = 1;
  }
}

// Function to add event listeners
function addListeners() {
  // Add event listeners to all elements
  let elements = document.querySelectorAll(".vertical");
  elements.forEach(element => {
    element.addEventListener("mouseover", function() {
      let descriptionId = this.getAttribute("data-description");
      if (descriptionId) {
        showDescription(descriptionId);
      }
    });
  });
}

// Check if window width is greater than 1024 when the page loads
window.addEventListener("load", function() {
  if (window.innerWidth > 1024) {
    addListeners();
  }
});

// Check if window width changes and update event listeners accordingly
window.addEventListener("resize", function() {
  if (window.innerWidth > 1024) {
    addListeners();
  } else {
    // If window width becomes less than or equal to 1024, remove event listeners
    let elements = document.querySelectorAll(".vertical");
    elements.forEach(element => {
      element.removeEventListener("mouseover", function() {
        let descriptionId = this.getAttribute("data-description");
        if (descriptionId) {
          showDescription(descriptionId);
        }
      });
    });
  }
});
