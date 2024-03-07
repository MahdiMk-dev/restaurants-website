const params = new URLSearchParams(window.location.search);
const id = params.get('id');
console.log(id); 
let restaurant=[]
const restaurantsJson = localStorage.getItem('restaurants');
if (restaurantsJson) {
  const restaurants = JSON.parse(restaurantsJson);
  
  // Function to find a restaurant by ID
  function findRestaurantById(id) {
    return restaurants.find(restaurant => restaurant.id === parseInt(id, 10));
  }
  const restaurant = findRestaurantById(id);
  

  if (restaurant) {
  	const restaurantListContainer = document.getElementById('single-resto-card');
  	restaurantListContainer.innerHTML = '';

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
                 <p>Resturant Menu</p>`
      const menuHeading = document.createElement('h3');
      menuHeading.textContent = 'Menu';
      card.appendChild(menuHeading);

      const menuList = document.createElement('ul');
      restaurant.menu.forEach(m => {
        
          const menuItemLi = document.createElement('li');
          menuItemLi.textContent = m.item + ' ..................................................... $' + m.price.toFixed(2);
          menuList.appendChild(menuItemLi);
        
      });
      card.appendChild(menuList);

          restaurantListContainer.appendChild(card);
   


    console.log('Restaurant found:', restaurant);
  } else {
    console.log('Restaurant not found.');
  }
} else {
  console.log('No restaurants stored in local storage.');
}