let restaurants = [];

function saveRestaurants() {
  localStorage.setItem('restaurants', JSON.stringify(restaurants));
}

function renderAdminRestaurants() {
  const restaurantCardsContainer = document.getElementById('adminRestaurantCards');
  if (!restaurantCardsContainer) {
    console.error('adminRestaurantCards container not found!');
    return;
  }

  restaurantCardsContainer.innerHTML = '';

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
          <button class="btn btn-remove" onclick="removeRestaurant(${restaurant.id})">Remove</button>
        </div>
      </a>
    `;
    restaurantCardsContainer.appendChild(card);
  });
}

function addRestaurant() {
  const restoNameInput = document.getElementById('restoName');
  const rateInput = document.getElementById('rate');
  const locationInput = document.getElementById('location');
  const categoryInput = document.getElementById('category');
  const restoImageInput = document.getElementById('restoImage');

  const name = restoNameInput.value.trim();
  const rate = rateInput.value.trim();
  const location = locationInput.value.trim();
  const category = categoryInput.value.trim();
  const image = URL.createObjectURL(restoImageInput.files[0]);

  if (!name || !rate || !location || !category || !image) {
    alert('Please fill in all fields');
    return;
  }

  const newRestaurant = {
    id: restaurants.length + 1,
    name: name,
    rate: rate,
    location: location,
    category: category,
    image: image
  };
  restaurants.push(newRestaurant);

  saveRestaurants();

  renderAdminRestaurants();

  restoNameInput.value = '';
  rateInput.value = '';
  locationInput.value = '';
  categoryInput.value = '';
  restoImageInput.value = '';
}

function removeRestaurant(id) {
  restaurants = restaurants.filter(restaurant => restaurant.id !== id);
  renderAdminRestaurants();

  saveRestaurants();
}

const addRestaurantBtn = document.getElementById('addRestaurantBtn');
if (addRestaurantBtn) {
  addRestaurantBtn.addEventListener('click', addRestaurant);
} else {
  console.error('addRestaurantBtn not found!');
}

function loadRestaurants() {
  const storedRestaurants = localStorage.getItem('restaurants');
  if (storedRestaurants) {
    restaurants = JSON.parse(storedRestaurants);
    renderAdminRestaurants();
  }
}

loadRestaurants();
