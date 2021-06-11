// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchApiData } from './apiCalls';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//Global Variables

let bookingsData, customersData, roomsData, hotel, customer;
const todayDate = "2020/04/01";

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

    //instantiateData()
    //populateDOM()
  });
};

function instantiateData() {
  instRooms = roomsData.map(room => {
    return new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
  });

  instCustomers = customersData.map(customer => {
    return new Customer(customer.id, customer.name)
  });

  instBookings = bookingsData.map(booking => {
    return new Booking(booking.userID, booking.date, booking.roomNumber)
  });

  hotel = new Hotel(instRooms, instCustomers, instBookings, todayDate);
}

//Post stuff here
