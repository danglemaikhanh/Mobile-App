import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const appSettings = {
    apiKey: "AIzaSyC9lv-pFOao4aWBnZTEXIYylUXjvHZTLzM",
    authDomain: "firstmobileapp-3cccd.firebaseapp.com",
    databaseURL: "https://firstmobileapp-3cccd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "firstmobileapp-3cccd",
    storageBucket: "firstmobileapp-3cccd.appspot.com",
    messagingSenderId: "759100151380",
    appId: "1:759100151380:web:32cf8b5d578721960d7fc1"
};

const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const shoppingListDB = ref(dataBase, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const ulElement = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(shoppingListDB, inputValue);
    clearInputField();
})

onValue(shoppingListDB, (snapshot) => {
    if (snapshot.exists()) {
        let items = Object.entries(snapshot.val());

        clearShoppingList();

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            renderShoppingList(item);
        }
    } 
    else {
        ulElement.innerHTML = 'Nothing in here...';
    }
});

function clearInputField() {
    inputFieldEl.value = "";
}

function clearShoppingList() {
    ulElement.innerHTML = "";
}

function renderShoppingList(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener('click', () => {
        const exactLocationItem = ref(dataBase, `shoppingList/${itemID}`);
        remove(exactLocationItem);
    })
    
    ulElement.append(newEl)
}
