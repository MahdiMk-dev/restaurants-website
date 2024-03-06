function renderMainPageRestaurants() {
  const restaurantCardsContainer = document.getElementById('restaurantCards');
  if (!restaurantCardsContainer) {
    console.error('restaurantCards container not found!');
    return;
  }

  const storedRestaurants = localStorage.getItem('restaurants');
  const restaurants = storedRestaurants ? JSON.parse(storedRestaurants) : [];

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
        </div>
      </a>
    `;
    restaurantCardsContainer.appendChild(card);
  });
}

renderMainPageRestaurants();
