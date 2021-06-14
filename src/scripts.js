// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchApiData } from './apiCalls';
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
const homeButton = document.querySelector("#homeButton");
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
const roomView = document.querySelector("#roomView");
const selectedRoom = document.querySelector("#selectedRoom");

//Form elements
const checkAvailability = document.querySelector("#checkAvailability");
const chosenDate = document.querySelector("#dateStart");
const chosenType = document.querySelector("select");

//Errors
const error = document.querySelector("#error");

//Event listeners

homeButton.addEventListener("click", () => {
  switchViews(customerView, bookingView, homeView)
  domUpdates.hide(selectedRoom)
});

bookButton.addEventListener("click", () => populateBooked(hotel));

accountButton.addEventListener("click", () => {
  switchViews(bookingView, homeView, customerView)
  domUpdates.hide(selectedRoom)
});

checkAvailability.addEventListener('click', () => showAvailableRooms(chosenDate.value,
customer, chosenType.value, hotel));

roomView.addEventListener("click", (event) => showSelectedRoom(event, hotel))

selectedRoom.addEventListener("click", (event) => bookRoom(event, hotel, customer))

///Fetch stuff here
window.addEventListener('load', fetchData);

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
    //createCustomer()
    //populateDOM()
  });
};

function instantiateData(bookings, customer, rooms) {
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
  createCustomer();
  //call populate dom here
  populateDom(hotel)
  //return
}

//console.log(hotel)

//Post stuff here
//Add proper error handling - look @ lesson
function postData(booking) {
  postApiData(booking)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      renderSuccessfulPost(booking);
    }
  })
  .catch(error => {
    showPostMessage(booking, 'fail', error)
  })
}

function renderSuccessfulPost(booking) {
  showPostMessage(booking, 'success');
  fetchApiData(booking)
  .then((data) => {
    fetchData();
    instantiateData();
  })
}

function showPostMessage(booking, status, responseStatus) {
  let messageSelector = {
    //whatever the querySelector is for where we want the message to go
  }
  domUpdates.facilitatePostMessage(booking, status, responseStatus, messageSelector, customer)
}
///////////

///Practicing populating user data
function createCustomer() {
  customer = new Customer(69, "Footface DeGregorio")
  customer.bookings.push(hotel.bookings[0])
  customer.bookings.push(hotel.bookings[1])
  //console.log(customer.bookings)
  domUpdates.populateBookingArray(customer.filterPastBookings(todayDate), pastBookings)
  domUpdates.populateBookingArray(customer.filterFutureBookings(todayDate), futureBookings)
  domUpdates.stringDisplay(totalSpent, customer.calculateTotalSpent(hotel.rooms))
}
// console.log(hotel)
//console.log(customer.bookings.push(bookingsData[0]))
////

// Helpers
function preventDefault(event) {
  event.preventDefault()
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
  console.log("test1", hotel)
  populateAllRooms(hotel)
  populateBooked(hotel)
}

function populateAllRooms(hotel) {


  domUpdates.populateRoomArray(hotel.rooms, roomView)
}

function populateBooked(hotel) {
  console.log("checkHotel", hotel)
  switchViews(customerView, homeView, bookingView)
  domUpdates.show(roomView)
  domUpdates.hide(selectedRoom)
  //fetchData()
  populateAllRooms(hotel)
}

function showAvailableRooms(date, customer, type, hotel) {
  preventDefault(event);
  domUpdates.hide(selectedRoom)
  domUpdates.show(roomView)
  // date = chosenDate.value || ""
  // type = chosenType.value || ""
  if (!date) {
    domUpdates.show(error)
    //how do i remove an event listener to keep the user from selecting a room if there is no date specified
    //roomView.removeEventListener("click", function(event) {
      //add a function @ same scope of event listeners and try to call it here instead of adding
      //an extra event listener
      //fetchData()
      //showSelectedRoom(event, hotel)
    //})
  } else if (type) {
    domUpdates.hide(error)
    domUpdates.populateRoomArray(hotel.filterRoomsByType(type, date, customer), roomView)
  } else {
    domUpdates.hide(error)
    domUpdates.populateRoomArray(hotel.filterRoomsByAvailability(date, customer), roomView)
  }
}

function showSelectedRoom(event, hotel) {
  domUpdates.hide(roomView)
  domUpdates.show(selectedRoom)
  let target = event.target.closest("article")
  let parsedID = Number.parseInt(target.id)
  const found = hotel.rooms.find(room => {
    return room.number === parsedID
  })

  domUpdates.displaySelectedRoom(selectedRoom, found, chosenDate.value)
}

function bookRoom(event, hotel, customer) {
  preventDefault(event)
  // let date = document.querySelector()
  let target = event.target.closest("button")
  let article = event.target.closest("article")
  let identifiers = article.className.split(" ")
  let foundNum, foundDate, parsedDate;
  if (target) {
    foundNum = hotel.rooms.find(room => {
      return article.classList.contains(room.number)
    })

    foundDate = identifiers.find(identifier => {
      return identifier.includes("2021")
    })
    parsedDate = foundDate.split("-").join("/");

    
    }

}
