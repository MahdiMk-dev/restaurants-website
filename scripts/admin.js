let restaurants=[]
let users=[]
document.getElementById('addMenuItem').addEventListener('click', function() {
    const menuItemsDiv = document.getElementById('menuItems');
    
    // Create new input fields for the menu item and its price
    const menuItemInput = document.createElement('input');
    menuItemInput.type = 'text';
    menuItemInput.className = 'menuItem';
    menuItemInput.placeholder = 'Menu Item';
    
    const itemPriceInput = document.createElement('input');
    itemPriceInput.type = 'number';
    itemPriceInput.className = 'itemPrice';
    itemPriceInput.placeholder = 'Item Price';
  
    const itemLabel = document.createElement('span');
    itemLabel.className = 'itemLabel';
    updateItemCount();
  
  
    const removeButton = document.createElement('button');
    removeButton.className = 'removeMenuItem';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
      // Remove the parent div when the remove button is clicked
      this.parentElement.remove();
      updateItemCount();
    });  // Append new inputs to menuItemsDiv
    const div = document.createElement('div');
     div.appendChild(itemLabel);
    div.appendChild(menuItemInput);
    div.appendChild(itemPriceInput);
     div.appendChild(removeButton);
    menuItemsDiv.appendChild(div);
    updateItemCount();
  });
  function updateItemCount() {
    const itemLabels = document.querySelectorAll('.itemLabel');
   itemLabels.forEach((label, index) => {
     label.textContent = `Item ${index + 1}:`;
   });
 }
 const addRestaurantBtn = document.getElementById("addRestaurantBtn");
if (addRestaurantBtn) {
  addRestaurantBtn.addEventListener('click', addRestaurant);
} else {
  console.error('addRestaurantBtn not found!');
}

function addRestaurant() {
    const restoNameInput = document.getElementById('restoName');
    const rateInput = document.getElementById('rate');
    const locationInput = document.getElementById('location');
    const categoryInput = document.getElementById('category');
    const restoImageInput = document.getElementById('restoImage');
  
    const name = restoNameInput.value.trim();//trim to remove white spaces before or after
    const rate = rateInput.value.trim();
    const location = locationInput.value.trim();
    const category = categoryInput.value.trim();
    const image = restoImageInput.files[0];
    const menuItems = []; // Array to store menu items
    
    // Get all menu items and their prices
    const menuItemInputs = document.querySelectorAll('.menuItem');
    const itemPriceInputs = document.querySelectorAll('.itemPrice');
    menuItemInputs.forEach((menuItemInput, index) => {
      const itemPrice = parseFloat(itemPriceInputs[index].value);
      
      // Check if item price is a valid number
      if (isNaN(itemPrice)) {
        alert('Please provide a valid price for all menu items.');
        return;
      }
      
      const menuItem = menuItemInput.value.trim();
      menuItems.push({ item: menuItem, price: itemPrice });
    });
    
     // Check if the file object is valid and is of type Blob
    if (!(image instanceof Blob)) {
      alert('Invalid file object.');
      return;
    }
    
    if (!name || !rate || !location || !category || !image || menuItemInputs.length === 0) {
      alert('Please fill in all fields');
      return;
    }
    
    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageUrl = event.target.result; // Get the data URL of the loaded image
  
      const newRestaurant = {
      id: restaurants.length + 1,
      name: name,
      rate: rate,
      location: location,
      category: category,
      image: imageUrl,
      menu: menuItems
      };
     restaurants.push(newRestaurant);
  
      saveRestaurants();  
      
    };

  
    restoNameInput.value = '';
    rateInput.value = '';
    locationInput.value = '';
    categoryInput.value = '';
    restoImageInput.value = '';
    reader.readAsDataURL(image);
    menuItemInputs.forEach(input => input.value = '');
    itemPriceInputs.forEach(input => input.value = '');
    
  
  
  
  
  }
  function saveRestaurants() {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }
  function loadRestaurants() {
    const storedRestaurants = localStorage.getItem('restaurants');
    console.log(storedRestaurants)
    if (storedRestaurants) {
      restaurants = JSON.parse(storedRestaurants);
      console.log(restaurants)
    }
  }
  
  loadRestaurants();
  
function addUser() {
    const username_input = document.getElementById('username').value;
    const email_input = document.getElementById('email').value;
    const password_input = document.getElementById('password').value;
  
  
    const username = username_input.trim();
    const email = email_input.trim();
    const password = password_input.trim();
  
    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
        if (!Array.isArray(users))
      users=[users]
    console.log(users)
    const existingUser = users.find(user => user.username === username);
    console.log(existingUser)
    if (existingUser) {
      alert('Username already exists. Please choose a different one.');
      return;
    }
  
    const newUser = {
              id: users.length + 1,
              username: username,
              email: email,
              password: password
          };
  
    users.push(newUser);
  
  
    saveUsers();
  
  
    username_input.value = '';
    email_input.value = '';
    password_input.value = '';
  }
  const addUserBtn = document.getElementById("addUser");
if (addUserBtn) {
  addUserBtn.addEventListener('click', addUser);
} else {
  console.error('addUsertBtn not found!');
}
function saveUsers() {
    localStorage.setItem('user', JSON.stringify(users));
  }


  function loadUsers() {
    const storedUsers = localStorage.getItem('user');
    if (storedUsers) {
      users = JSON.parse(storedUsers);

      console.log(users)
    }
  }
  
  loadUsers();
  