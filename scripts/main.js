document.addEventListener('DOMContentLoaded', function () {
  // Populate the restaurant list initially
  displayRestaurants(getFilteredRestaurants());

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

  function displayRestaurants(restaurants) {
    const restaurantListContainer = document.getElementById('restaurantCards');
    restaurantListContainer.innerHTML = '';
    if (restaurants.length === 0) {
        restaurantListContainer.innerHTML = '<p>No matching restaurants found.</p>';
    } else {
        restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <a href="#">
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

  const mainRestaurantCardsContainer = document.getElementById('restaurantCards');

  function renderMainRestaurants() {

      if (!mainRestaurantCardsContainer) {
          console.error('restaurantCards container not found!');
          return;
      }

      mainRestaurantCardsContainer.innerHTML = '';

      restaurants.forEach(restaurant => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
              <a href="#">
                  <img src="${restaurant.image}" alt="${restaurant.name}" />
                  <div class="card-info">
                      <div class="head">
                          <h3>${restaurant.name}</h3>
                          <p>${restaurant.rate}</p>
                      </div>
                      <p>${restaurant.location}</p>
                      <p>${restaurant.category}</p>
                  </div>
              </a>
          `;
          mainRestaurantCardsContainer.appendChild(card);
      });
  }
  restaurants.forEach(restaurant => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <a href="#">
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
    restaurantCardsContainer.appendChild(card);
  });
});
  // Call the render function initially
  renderMainRestaurants();

  // You can add more functionality or event listeners related to the main page if needed


//    // <script src="../scripts/admin.js"></script>
