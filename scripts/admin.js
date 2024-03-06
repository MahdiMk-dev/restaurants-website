let restaurants = [];

function renderAdminRestaurants() {
  const restaurantCardsContainer = document.getElementById('restaurantCards');
  if (!restaurantCardsContainer) {
    console.error('adminRestaurantCards container not found!');
    return;
  }

  restaurantCardsContainer.innerHTML = '';
  console.log('bla')
  console.log(restaurants)
  restaurants.forEach(restaurant => {
    const card = document.createElement('div');
    card.classList.add('card');
    console.log(restaurants)
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
          <button class="btn btn-remove" onclick="removeRestaurant(${restaurant.id})">Remove</button>
        </div>
      </a>
    `;
    restaurantCardsContainer.appendChild(card);
  });
}


function removeRestaurant(id) {
  restaurants = restaurants.filter(restaurant => restaurant.id !== id);
  renderAdminRestaurants();

  saveRestaurants();
}

function saveRestaurants() {
  localStorage.setItem('restaurants', JSON.stringify(restaurants));
}

function loadRestaurants() {
  const storedRestaurants = localStorage.getItem('restaurants');
  if (storedRestaurants) {
    restaurants = JSON.parse(storedRestaurants);
    console.log(restaurants)
    renderAdminRestaurants();
  }
}

loadRestaurants();
