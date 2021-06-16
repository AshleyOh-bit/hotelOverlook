import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/classes/Hotel';
import Manager from '../src/classes/Manager';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import { rooms, customers, bookings } from './test-data';

describe('Manager', function() {
  let manager, hotel, instRooms, instCustomers, instBookings, customer;
  beforeEach(() => {
    customer = new Customer(229, "Cranston Shival")

    instRooms = rooms.map(room => {
      return new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
    });

    instCustomers = customers.map(customer => {
      return new Customer(customer.id, customer.name)
    });

    instBookings = bookings.map(booking => {
      return new Booking(booking.userID, booking.date, booking.roomNumber)
    });

    hotel = new Hotel(instRooms, instCustomers, instBookings, "2020/04/01")
    manager = new Manager(101, "Hambun Grettibean", hotel)
  });
  it.skip('should be a function', function() {
    expect(Manager).to.be.a("function");
  });
  it.skip('should be an instance of Manager', function() {
    expect(manager).to.be.an.instanceof(Manager);
  });
  //Properties
  it.skip('should have an id', function() {
    expect(manager.id).to.equal(101);
  });
  it.skip('should have a name', function() {
    expect(manager.name).to.equal("Hambun Grettibean");
  });
  it.skip('should have a username', function() {
    expect(manager.username).to.equal("IamTheManager");
  });
  it.skip('should have a password', function() {
    expect(manager.password).to.equal("00000");
  });
  it.skip('should store the date', function() {
    expect(manager.date).to.equal("2020/04/01");
  });
  it.skip('should be logged out by default', function() {
    expect(manager.isLoggedIn).to.equal(false);
  });
  //Manager-specific properties
  it.skip('should be able to search for a a customer', function() {
    manager.searchForCustomer(229)
    expect(manager.searchForCustomer(229)).to.deep.equal({
      "id": 69,
      "name": "Hugh Flobear",
      "isLoggedIn": false,
      "bookings": {
        "past": [],
        "future": []
      }
    });
  });
  it.skip('should alert the manager if no customer is found', function() {
    manager.searchForCustomer(1029)
    expect(manager.searchForCustomer(1029)).to.deep.equal(`Sorry, Hambun Grettibean, we could not find any customers to match your search.`);
  });
  it.skip('should alert the manager if no customer is found', function() {
    manager.searchForCustomer("")
    expect(manager.searchForCustomer("")).to.deep.equal(`Sorry, Hambun Grettibean, we could not find any customers to match your search.`);
  });
  it.skip('should alert the manager if no customer is found', function() {
    manager.searchForCustomer("sarah kettabaum")
    expect(manager.searchForCustomer("sarah kettabaum")).to.deep.equal(`Sorry, Hambun Grettibean, we could not find any customers to match your search.`);
  });
  //removes a booking
  it.skip('should be able to remove a booking by booking id', function() {
    customer.bookARoom(229, "2020/04/18", 105);
    manager.removeBooking("8kjhdia80caplask13");
    expect(manager.hotel.bookings.length).to.equal(10);
  });
  it.skip('should alert manager if booking can\'t be found', function() {
    customer.bookARoom(229, "2020/04/18", 105);
    manager.removeBooking("8kjhdia80caplaoo3");
    expect(manager.removeBooking("8kjhdia80capla3")).to.equal(`Sorry, Hambun Grettibean, we could not find any bookings to match your search.`);
  });
  it.skip('should alert manager if input type in incorrect can\'t be found', function() {
    customer.bookARoom(229, "2020/04/18", 105);
    manager.removeBooking(229);
    expect(manager.removeBooking(229)).to.equal(`Please enter a valid booking id.`);
  });
  it.skip('should alert manager if input type in incorrect can\'t be found', function() {
    customer.bookARoom(229, "2020/04/18", 105);
    manager.removeBooking("");
    expect(manager.removeBooking("")).to.equal(`Please enter a valid booking id.`);
  });
});
