//Imports
import { fetchApiData, postApiData } from './apiCalls';
import domUpdates from './domUpdates';
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
import Room from './classes/Room';
import Booking from './classes/Booking';

// Sass
import './sass/index.scss';

//Global Variables
let bookingsData, customersData, roomsData, hotel, customer;
const todayDate = "2021/06/15";


//Query Selectors below
//Buttons
const bookButton = document.querySelector("#bookButton");
const accountButton = document.querySelector("#accountButton");

//Pages
const homeView = document.querySelector("#homeView");
const customerView = document.querySelector("#customerView");
const bookingView = document.querySelector("#bookingView");

//Customers views
const futureBookings = document.querySelector("#upcomingView")
const pastBookings = document.querySelector("#pastView")
const totalSpent = document.querySelector("#totalSpent");

//Bookings Views
const bookingHeader = document.querySelector("#whichRooms")
const roomView = document.querySelector("#roomView");
const selectedRoom = document.querySelector("#selectedRoom");

//Form elements
const checkAvailability = document.querySelector("#checkAvailability");
const chosenDate = document.querySelector("#dateStart");
const chosenType = document.querySelector("select");

//Errors
const error = document.querySelector("#error");
const usernameError = document.querySelector("#usernameError");
const passwordError = document.querySelector("#passwordError");
const invalidInput = document.querySelector("#invalidInput");

//Log In Form
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const submitLogin = document.querySelector("#submitLogin");

//Event listeners
bookButton.addEventListener("click", () => populateBooked(hotel));
accountButton.addEventListener("click", () => {
  showAccount(customer, hotel)
});

checkAvailability.addEventListener('click', () => showAvailableRooms(chosenDate.value,
chosenType.value, hotel));

submitLogin.addEventListener("click", (event) => {
  vetInput(event)})
submitLogin.addEventListener("keydown", (event) => {
  vetInput(event)})

chosenType.addEventListener("click", ariaStateChange)
chosenType.addEventListener("keydown", ariaStateChange)

selectedRoom.addEventListener("click", (event) => bookRoom(event, hotel, customer, bookingsData))

window.addEventListener('load', fetchData);

//Aria
function ariaStateChange() {
  let attribute = chosenType.getAttribute("aria-expanded");
  if (attribute === 'true') {
   chosenType.setAttribute("aria-expanded", false);
 } else {
   chosenType.setAttribute("aria-expanded", true);
 }
}

///Fetch
function getData() {
  return Promise.all([fetchApiData('bookings'), fetchApiData('customers'), fetchApiData('rooms')]);
}

function fetchData() {
  getData()
  .then((promiseArray) => {
    bookingsData = promiseArray[0].bookings;
    customersData = promiseArray[1].customers;
    roomsData = promiseArray[2].rooms;
    instantiateData(bookingsData, customersData, roomsData)
  })
  .catch((err) => showErrMesssage(err))
};

function instantiateData(bookingsData, customersData, roomsData) {
  let instRooms, instCustomers, instBookings;
  instRooms = roomsData.map(room => {
    return new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
  });
  instCustomers = customersData.map(customer => {
    return new Customer(customer.id, customer.name)
  });
  instBookings = bookingsData.map(booking => {
  booking = new Booking(booking.userID, booking.date, booking.roomNumber)
  booking.generateRandomId(bookingsData)
  return booking
  });

  hotel = new Hotel(instRooms, instBookings, instCustomers, todayDate);
}

//Post
function postData(userId, date, roomNumber) {
  postApiData(userId, date, roomNumber)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      renderSuccessfulPost("bookings");
    }
  })
  .catch(error => {
    showPostMessage(customer, 'fail', error)
  })
}

function renderSuccessfulPost(bookings) {
  showPostMessage(customer, 'success');
  setTimeout(() => {
    fetchData()
    populateBooked(hotel)
    chosenDate.value = ""
  }, 4000)
}

function showPostMessage(customer, status, responseStatus) {
  domUpdates.hide(selectedRoom)
  domUpdates.show(roomView)
  domUpdates.facilitatePostMessage(status, responseStatus, roomView, customer)
}

function showErrMesssage(err) {
  let message;
  if (err.message === "Fetch fail") {
    message = "So sorry, we cannot display what you're looking for. Perhaps check your internet connection?"
  } else {
    message = err.message
  }
  domUpdates.stringDisplay(customerView, message)
};

//Log In
function vetInput (event) {
  domUpdates.hide(usernameError)
  domUpdates.hide(passwordError)
  if (!username.value && !password.value) {
    preventDefault(event)
    domUpdates.show(usernameError)
    domUpdates.show(passwordError)
  } else if (password.value !== "overlook2021") {
    preventDefault(event)
    domUpdates.show(passwordError)
  } else {
    preventDefault(event)
    confirmUser(username, password)
  }
}

function confirmUser(event) {
  fetchData();
  let idMatch, usernameWord, usernameID
    usernameWord = username.value.slice(0, 8);
    usernameID = username.value.slice(8, 10);
    usernameID = Number.parseInt(usernameID);
  if (usernameWord === "Customer") {
    idMatch = hotel.customers.find(customer => {
      return customer.id === usernameID
    })
  }
  if (idMatch) {
    customer = new Customer(idMatch.id, idMatch.name)
    domUpdates.show(bookButton)
    domUpdates.show(accountButton)
    showAccount(customer, hotel)
  }
}

// Helpers
function populateCustomerBookings(customer, todayDate, hotel) {
  const bookingsMatches = hotel.bookings.filter(booking => {
    return booking.userID === customer.id
  })
  customer.bookings = bookingsMatches
  customer.isLoggedIn = true;
  domUpdates.populateBookingArray(customer.filterPastBookings(todayDate), pastBookings)
  domUpdates.populateBookingArray(customer.filterFutureBookings(todayDate), futureBookings)
  domUpdates.stringDisplay(totalSpent, customer.calculateTotalSpent(hotel.rooms))
}

function preventDefault(event) {
  event.preventDefault()
}

function showAccount(customer, hotel) {
  switchViews(bookingView, homeView, customerView)
  domUpdates.hide(selectedRoom)
  populateCustomerBookings(customer, todayDate, hotel)
}

function switchViews(element1, element2, showElement) {
  domUpdates.hide(element1);
  domUpdates.hide(element2);
  domUpdates.show(showElement);
}

function populateAllRooms(hotel) {
  domUpdates.populateRoomArray(hotel.rooms, roomView)
}

function populateBooked(hotel) {
  switchViews(customerView, homeView, bookingView)
  domUpdates.show(roomView)
  domUpdates.hide(selectedRoom)
  domUpdates.stringDisplay(bookingHeader, "All Rooms")
  populateAllRooms(hotel)
}

function showAvailableRooms(date, type, hotel) {
  preventDefault(event);
  let parsedDate = date.split("-").join("/");
  console.log(parsedDate < todayDate)
  if (parsedDate < todayDate) {
    return domUpdates.stringDisplay(roomView, "Please pick a date in the future")
  }
  domUpdates.hide(selectedRoom)
  domUpdates.show(roomView)
  if (!date) {
    domUpdates.show(error)
  } else if (type) {
    domUpdates.hide(error)
    roomView.addEventListener("click", (event) => showSelectedRoom(event, hotel))
    roomView.addEventListener("keydown", (event) => showSelectedRoom(event, hotel))
    domUpdates.stringDisplay(bookingHeader, "Rooms available for this date:")
    domUpdates.populateRoomArray(hotel.filterRoomsByType(type, parsedDate, customer), roomView)
  } else {
    domUpdates.hide(error)
    roomView.addEventListener("click", (event) => showSelectedRoom(event, hotel))
    roomView.addEventListener("keydown", (event) => showSelectedRoom(event, hotel))
    domUpdates.stringDisplay(bookingHeader, "Rooms available for this date:")
    domUpdates.populateRoomArray(hotel.filterRoomsByAvailability(parsedDate, customer), roomView)
  }
}

function showSelectedRoom(event, hotel) {
  if ((event.target.closest('article') && event instanceof MouseEvent) || event.keyCode === 13) {
    domUpdates.hide(roomView)
    domUpdates.show(selectedRoom)
    let target = event.target.closest("article")
    let parsedID = Number.parseInt(target.id)
    const found = hotel.rooms.find(room => {
      return room.number === parsedID
    })
    domUpdates.displaySelectedRoom(selectedRoom, found, chosenDate.value)
  }
}

function bookRoom(event, hotel, customer, bookingsData) {
  preventDefault(event)
  let target = event.target.closest("button")
  let article = event.target.closest("article")
  let identifiers = article.className.split(" ")
  let foundRoom, foundDate, parsedDate;
  if (target) {
    foundRoom = hotel.rooms.find(room => {
      return article.classList.contains(room.number)
    })
    foundDate = identifiers.find(identifier => {
      return identifier.includes("2021")
    })
    parsedDate = foundDate.split("-").join("/");
    customer.bookARoom(customer.id, parsedDate, foundRoom.number, bookingsData)
    postData(customer.id, parsedDate, foundRoom.number)
    }
}
