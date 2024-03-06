document.addEventListener('DOMContentLoaded', function () {
let restaurants=[]
function loadRestaurants(){
const restaurantsJson = localStorage.getItem('restaurants');
console.log(restaurantsJson)
if (restaurantsJson) {
  const restaurants = JSON.parse(restaurantsJson);
  console.log(restaurants)
}
else
restaurants=[]
restaurants;
}
 //console.log(restaurants)

  // Function to search for a restaurant by name
  function searchAllAttributes(searchTerm) {
    console.log(searchTerm)
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    const results = [];
    restaurants.forEach(restaurant => {
      // Check each attribute of the restaurant
      for (const key in restaurant) {
        if (Object.hasOwnProperty.call(restaurant, key)) {
          if(key!='image'){
          const value = restaurant[key];
          if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(restaurant);
            break; // Break out of loop once a match is found for this restaurant
          }
        }
        }
      }
    });

    console.log('search')
    console.log(results)
    return results;

  }
 // console.log('bla')
 //console.log(searchAllAttributes('bla'))
  // Function to display search results
  function displaySearchResults(searchResults) {
    const restaurants = searchResults
    console.log(restaurants)
      const restaurantListContainer = document.getElementById('restaurantCards');
      restaurantListContainer.innerHTML = '';
      if (restaurants.length === 0) {
          restaurantListContainer.innerHTML = '<p>No matching restaurants found.</p>';
      } else {
          restaurants.forEach(restaurant => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
          <a href="./single-restaurant.html?id=${restaurant.id}">
              <img src="${restaurant.image}" alt="${restaurant.name}" />
              <div class="card-info">
                <div class="head">
                  <h3>${restaurant.name}</h3>
                  <p class="rate">${restaurant.rate} <i class="fa-regular fa-star"></i></p>
                </div>
                <p>${restaurant.location}</p>
                <p>${restaurant.category}</p>
              </div>
            </a>
          `;
          restaurantListContainer.appendChild(card);
        });
    }
  }
  
  // Add event listener to search input
const searchInput = document.getElementById('search');
let isFirstKeydown = true;

searchInput.addEventListener('keydown', function(event) {
  if (isFirstKeydown) {
    setTimeout(() => {
      const searchTerm = searchInput.value.trim(); // Retrieve the value directly from the input element
      console.log(searchTerm); // Output the search term to the console
      isFirstKeydown = false;
    }, 0);
  }
});

// Add event listener to search input for subsequent input events
searchInput.addEventListener('input', function(event) {
  if (!isFirstKeydown) {
    const searchTerm = event.target.value.trim();
    console.log(searchTerm); 
    if (searchTerm.length > 0) {
    const searchResults = searchAllAttributes(searchTerm);
    displaySearchResults(searchResults);
    } else {
      // Clear search results if search input is empty
      displayRestaurants()
   }
  }
});




  // Populate the restaurant list initially
  //displayRestaurants(getFilteredRestaurants());

  // Add event listeners to checkboxes
  const checkboxes = document.querySelectorAll('#filterList input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
          // Update the displayed restaurants when a checkbox is changed
          displayRestaurants(getFilteredRestaurants());
      });
  });

  // Function to get filtered restaurants based on selected checkboxes
  function getFilteredRestaurants() {
      const selectedLocations = getSelectedCheckboxes('Location');  
      const selectedCategories = getSelectedCheckboxes('Category');

      // Retrieve restaurants from local storage
      const allRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];

      // Filter restaurants based on selected options
      const filteredRestaurants = allRestaurants.filter(function (restaurant) {
          return (
              (selectedLocations.length === 0 || selectedLocations.includes(restaurant.location)) &&
              (selectedCategories.length === 0 || selectedCategories.includes(restaurant.category))
          );
      });

      return filteredRestaurants;
  }

  // Function to get an array of selected checkbox values for a given group (Location/Category)
  function getSelectedCheckboxes(group) {
      const checkboxes = document.querySelectorAll(`#filterList input[type="checkbox"]:checked`);
      const selectedCheckboxes = Array.from(checkboxes)
          .filter(function (checkbox) {
              return checkbox.parentNode.textContent.trim() === group;
          })
          .map(function (checkbox) {
              return checkbox.value;
          });

      return selectedCheckboxes;
  }

  function displayRestaurants() {
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    console.log('load')
    console.log(restaurants)
      const restaurantListContainer = document.getElementById('restaurantCards');
      restaurantListContainer.innerHTML = '';
      if (restaurants.length === 0) {
          restaurantListContainer.innerHTML = '<p>No matching restaurants found.</p>';
      } else {
          restaurants.forEach(restaurant => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
          <a href="./single-restaurant.html?id=${restaurant.id}">
              <img src="${restaurant.image}" alt="${restaurant.name}" />
              <div class="card-info">
                <div class="head">
                  <h3>${restaurant.name}</h3>
                  <p class="rate">${restaurant.rate} <i class="fa-regular fa-star"></i></p>
                </div>
                <p>${restaurant.location}</p>
                <p>${restaurant.category}</p>
              </div>
            </a>
          `;
          restaurantListContainer.appendChild(card);
        });
    }
  }

displayRestaurants();
});




