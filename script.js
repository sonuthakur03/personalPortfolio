function showDescription(descriptionId) {
    // Hide all description divs
    let descriptions = document.getElementsByClassName("sideBox");
    for (let i = 0; i < descriptions.length; i++) {
      descriptions[i].style.display = "none";
      descriptions[i].style.opacity = 0;
    }
    
    // Show the description div corresponding to the hovered element
    let description = document.getElementById(descriptionId);
    description.style.display = "flex";
    description.style.opacity = 1;
  }
  
  // Add event listeners to all elements
  let elements = document.getElementsByClassName("vertical");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mouseover", function() {
      let descriptionId = this.getAttribute("data-description");
      showDescription(descriptionId);
    });
  }
