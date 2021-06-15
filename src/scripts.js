// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchApiData, postApiData } from './apiCalls';
import domUpdates from './domUpdates';

//Import classes:
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
import Room from './classes/Room';
import Booking from './classes/Booking';

// An example of how you tell webpack to use a CSS (SCSS) file
import './sass/index.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//Global Variables

let bookingsData, customersData, roomsData, hotel, customer;
const todayDate = "2020/04/01";


//Query Selectors below
//buttons
// const homeButton = document.querySelector("#homeButton");
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

//Event listeners

bookButton.addEventListener("click", () => populateBooked(hotel));
accountButton.addEventListener("click", () => {
  showAccount(customer, hotel)
});

checkAvailability.addEventListener('click', () => showAvailableRooms(chosenDate.value,
chosenType.value, hotel));

//put login submit button here!!

chosenType.addEventListener("click", ariaStateChange)
chosenType.addEventListener("keydown", ariaStateChange)

selectedRoom.addEventListener("click", (event) => bookRoom(event, hotel, customer, bookingsData))

///Fetch stuff here
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

function getData() {
  return Promise.all([fetchApiData('bookings'), fetchApiData('customers'), fetchApiData('rooms')]);
}

function fetchData() {
  getData()
  .then((promiseArray) => {
    //console.log(promiseArray)
    //check for the correct indexes on these
    bookingsData = promiseArray[0].bookings;
    customersData = promiseArray[1].customers;
    roomsData = promiseArray[2].rooms;

    instantiateData(bookingsData, customersData, roomsData)
    //console.log("fetchy", customer)
    //createCustomer()
    //populateDOM()
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

  // instBookings = bookingsData.map(booking => {
  //   return new Booking(booking.userID, booking.date, booking.roomNumber)
  // });
  instBookings = bookingsData.map(booking => {
  booking = new Booking(booking.userID, booking.date, booking.roomNumber)
  booking.generateRandomId(bookingsData)
  return booking

  });
  //console.log(bookingsData[0])
  hotel = new Hotel(instRooms, instBookings, instCustomers, todayDate);
  //console.log(hotel)
  //populateAllRooms();
  // createCustomer();
  customer = hotel.customers[48]
  customer.isLoggedIn = true;
  //console.log("insty 1", customer);
  populateCustomerBookings(customer, todayDate, hotel)
  // populateBooked(hotel)
  //hotel.
  //console.log("insty", customer)
  //call populate dom here
  //populateDom(hotel)
  //return
}

//console.log(hotel)

//Post stuff here
//Add proper error handling - look @ lesson
function postData(userId, date, roomNumber) {
  postApiData(userId, date, roomNumber)
  //console.log(bookings)
  .then((response) => {
    //console.log(response)
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      renderSuccessfulPost("bookings");
    }
  })
  .catch(error => {
    //console.log(Error)
    showPostMessage(customer, 'fail', error)
  })
}

function renderSuccessfulPost(bookings) {
  showPostMessage(customer, 'success');
  //fetchApiData("bookings")
  // .then((data) => {
  //   bookingsData = data.bookings;
  //   // setTimeout(() => {
  //   //   fetchData()
  //   // }, 4000)
  //   //fetchData();
  //   //instantiateData();
  // })
  setTimeout(() => {
    fetchData()
    populateBooked(hotel)
    chosenDate.value = ""
    //show available rooms?
  }, 4000)
}

function showPostMessage(customer, status, responseStatus) {
  domUpdates.hide(selectedRoom)
  domUpdates.show(roomView)
  domUpdates.facilitatePostMessage(status, responseStatus, roomView, customer)
}

function showErrMesssage(err) {
  let message;
  if (err.message === "Failed to fetch") {

    message = "Something went wrong. Please check your internet connection"
  } else {
    message = err.message
  }
  domUpdates.stringDisplay(customerView, message)
};
///////////

///Practicing populating user data
// function createCustomer() {
//   customer = new Customer(49, "Eldridge Muller")
//   customer.isLoggedIn = true;
//   customer.bookings.push(hotel.bookings[0])
//   customer.bookings.push(hotel.bookings[1])
//   //console.log(customer.bookings)
//   // domUpdates.populateBookingArray(customer.filterPastBookings(todayDate), pastBookings)
//   // domUpdates.populateBookingArray(customer.filterFutureBookings(todayDate), futureBookings)
//   // domUpdates.stringDisplay(totalSpent, customer.calculateTotalSpent(hotel.rooms))
// }

function populateCustomerBookings(customer, todayDate, hotel) {
  const bookingsMatches = hotel.bookings.filter(booking => {
    return booking.userID === customer.id
  })
  customer.bookings = bookingsMatches
  //domUpdates.populateBookingArray(customer.bookings, futureBookings)
  domUpdates.populateBookingArray(customer.filterPastBookings(todayDate), pastBookings)
  domUpdates.populateBookingArray(customer.filterFutureBookings(todayDate), futureBookings)
  domUpdates.stringDisplay(totalSpent, customer.calculateTotalSpent(hotel.rooms))
  //console.log(customer)
}
// console.log(hotel)
//console.log(customer.bookings.push(bookingsData[0]))
////

// Helpers
function preventDefault(event) {
  event.preventDefault()
}

function showAccount(customer, hotel) {
  //console.log(customer.bookings)
  switchViews(bookingView, homeView, customerView)
  domUpdates.hide(selectedRoom)
  populateCustomerBookings(customer, todayDate, hotel)
  // domUpdates.populateBookingArray(customer.filterPastBookings(todayDate), pastBookings)
  // domUpdates.populateBookingArray(customer.filterFutureBookings(todayDate), futureBookings)
  // domUpdates.stringDisplay(totalSpent, customer.calculateTotalSpent(hotel.rooms))
}

function switchViews(element1, element2, showElement) {
  domUpdates.hide(element1);
  domUpdates.hide(element2);
  domUpdates.show(showElement);
}

function populateDom(hotel) {
  //beef up populate DOM with all page views
  //pass in fetch datas through the appropriate functions here
  //console.log(hotel)
  //console.log("test1", hotel)
  //console.log("populateDom")
  populateAllRooms(hotel)
  populateBooked(hotel)
}

function populateAllRooms(hotel) {
  domUpdates.populateRoomArray(hotel.rooms, roomView)
}

function populateBooked(hotel) {
//Old:
//console.log(customer)
  switchViews(customerView, homeView, bookingView)
  domUpdates.show(roomView)
  domUpdates.hide(selectedRoom)
  domUpdates.stringDisplay(bookingHeader, "All Rooms")
  populateAllRooms(hotel)
  //new:
  // switchViews(homeView, bookingView, customerView)
  // //domUpdates.show(roomView)
  // domUpdates.hide(selectedRoom)
  // populateAllRooms(hotel)
}

function showAvailableRooms(date, type, hotel) {
  preventDefault(event);
  //console.log(customer)
  //console.log(hotel.bookings)
  let parsedDate = date.split("-").join("/");
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
  // let date = document.querySelector()
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
