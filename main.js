function deleteItem() {
  const container = document.querySelector(".hero-content");
  const name = document.getElementById("nameSpan").textContent;
  const lastName = document.getElementById("lastNameSpan").textContent;
  const deletedItem = { name: name, lastName: lastName };
  localStorage.setItem("deletedItem", JSON.stringify(deletedItem));

  container.parentNode.removeChild(container);
}

document.addEventListener("DOMContentLoaded", function () {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  displayUserList(users);
  displayUserListIndex(users);
});
function displayUserList(users) {
  const userListContainer = document.getElementById("userListContainer");
  if (userListContainer) {
    userListContainer.innerHTML = "";
    users.forEach((user, index) => {
      const userCard = createUserCard(user, index);
      userListContainer.appendChild(userCard);
    });
  }
}

function displayUserListIndex(users) {
  const indexPageContainer = document.getElementById("indexPageContainer");
  if (indexPageContainer) {
    indexPageContainer.innerHTML = "";
    users.forEach((user, index) => {
      const userCard = createUserCard(user, index);
      indexPageContainer.appendChild(userCard);
    });
  }
}
function addUser() {
  const newName = document.getElementById("newUserNameInput")?.value;
  const newLastName = document.getElementById("newUserLastNameInput")?.value;
  const newImageUrl =
    document.getElementById("newUserImageInput")?.value ||
    "./images/default-image.jpg";
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (!isDuplicateUser(users, newName, newLastName)) {
    const newUser = {
      name: newName,
      lastName: newLastName,
      imageUrl: newImageUrl,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    clearAddUserForm();
    displayUserList(users);
  } else {
    alert("User already exists!");
  }
}

function isDuplicateUser(users, name, lastName) {
  return users.some((user) => user.name === name && user.lastName === lastName);
}

function clearAddUserForm() {
  document.getElementById("newUserNameInput").value = "";
  document.getElementById("newUserLastNameInput").value = "";
  document.getElementById("newUserImageInput").value = "";
}

function createUserCard(user, index) {
  const userCard = document.createElement("div");
  userCard.className = "user-card";
  userCard.innerHTML = `
        <img src="${user.imageUrl}" alt="${user.name} ${user.lastName}">
        <span>${user.name} ${user.lastName}</span>
        <ion-icon name="trash" onclick="deleteUser(${index})"></ion-icon>
    `;
  return userCard;
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users[index];

  if (user) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    displayUserList(users);
  }
}

function cancelAddUser() {
  clearAddUserForm();
}
function addToFavorites() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const currentUser = {
    name: document.getElementById("nameSpan").innerText.split(": ")[1],
    lastName: document.getElementById("lastNameSpan").innerText.split(": ")[1],
  };
  const isDuplicate = favorites.some(
    (fav) =>
      fav.name === currentUser.name && fav.lastName === currentUser.lastName
  );

  if (!isDuplicate) {
    favorites.push(currentUser);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavoritesOnFavoritePage(favorites);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  displayFavoritesOnFavoritePage(favorites);
});

function displayFavoritesOnFavoritePage(favorites) {
  const favoriteListContainer = document.getElementById(
    "favoriteListContainer"
  );

  if (favoriteListContainer) {
    favoriteListContainer.innerHTML = "";
    favorites.forEach((favorite, index) => {
      const favoriteCard = createFavoriteCard(favorite, index);
      favoriteListContainer.appendChild(favoriteCard);
    });
  }
}

function createFavoriteCard(favorite, index) {
  const favoriteCard = document.createElement("div");
  favoriteCard.className = "favorite-card";
  favoriteCard.innerHTML = `
        
  <img src="./images/image 1.png" alt="${favorite.name} ${favorite.lastName}" />
  <br />
  <span id="nameSpan">${favorite.name} </span>
  <br />
  <span id="lastNameSpan"> ${favorite.lastName}</span>
  <br />
  <ion-icon
    name="trash"
    class="${index}"
    onclick="deleteItem()"
  ></ion-icon>
    `;
  return favoriteCard;
}

function removeFromFavorites(index) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavoritesOnFavoritePage(favorites);
}
