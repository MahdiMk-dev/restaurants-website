let users = [];
const signupForm = document.getElementById('sign-up');




function renderAdminUsers() {
  const UserCardsContainer = document.getElementById('UserCards');
  if (!UserCardsContainer) {
    console.error('adminUsersCards container not found!');
    return;
  }

  UserCardsContainer.innerHTML = '';
  if (Array.isArray(users)) {users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <a href="#">
        <div class="card-info">
          <div class="head">
            <h3>${user.username}</h3>
          </div>
          <p>${user.email}</p>
          <button class="btn btn-remove" onclick="removeUser(${user.id})">Remove</button>
        </div>
    `;

    UserCardsContainer.appendChild(card);
  });
} else {
   const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <a href="#">
        <div class="card-info">
          <div class="head">
            <h3>${users.username}</h3>
          </div>
          <p>${users.email}</p>
          <button class="btn btn-remove" onclick="removeUser(${users.id})">Remove</button>
        </div>
    `;

    UserCardsContainer.appendChild(card);
}
}

function removeUser(id) {
  users = users.filter(user => user.id !== id);
  renderAdminUsers();

  saveUsers();
}
function saveUsers() {
  localStorage.setItem('user', JSON.stringify(users));
}



function loadUsers() {
  const storedUsers = localStorage.getItem('user');
  if (storedUsers) {
    users = JSON.parse(storedUsers);

    renderAdminUsers();
    console.log(users)
  }
}

loadUsers();
