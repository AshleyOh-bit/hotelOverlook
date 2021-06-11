import Booking from './Booking';

class User {
  constructor(num, name) {
    this.id = num;
    this.name = name;
    this.isLoggedIn = false;
    this.username = null;
    this.password = null;
  }
  setCredentials(username, password) {
    if ((!username && !password) || (username.includes(" ") && password.includes(" "))) {
      return `Please enter a username and password with letters, numbers, and symbols`
    } else if (!username || username.includes(" ")) {
      return `Please enter a username with letters, numbers, and symbols`
    } else if (!password || password.includes(" ")) {
      return `Please enter a password with letters, numbers, and symbols`
    } else {
      this.username = username;
      this.password = password
    }
  }
  logIn(username, password) {
    //should this iterate through some sort of users array?
    if (this.username === username && this.password === password) {
      this.isLoggedIn = true;
    } else if (this.password !== password) {
      return `Sorry, we could not find any users to match that password. Please try again.`
    } else if (this.username !== username) {
      return `Sorry, we could not find any users with that username. Please try again.`
    }
  }
  bookARoom(userId, date, roomNumber, bookings) {
    //this is dynamically made for the sake of manager - i.e. userId vs this.id
    // let newBooking;
    // if (this.isLoggedIn) {
    //   newBooking = new Booking(userId, date, roomNumber)
    //   return newBooking
    // } else {
    //   return `Please log in to book a room.`
    // }
    let newBooking;
    if (this.isLoggedIn && (!this.bookings)) {
      newBooking = new Booking(userId, date, roomNumber)
      return newBooking
    } else if (this.isLoggedIn && (this.bookings)) {
      newBooking = new Booking(userId, date, roomNumber)
      newBooking.generateRandomId(bookings)
      this.bookings.future.push(newBooking)
      return newBooking
    } else {
      return `Please log in to book a room.`
    }

  }
}

export default User;
