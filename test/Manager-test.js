// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import Hotel from '../src/classes/Hotel';
import Manager from '../src/classes/Manager';
import { rooms, customers, bookings } from './test-data';

describe('Manager', function() {
  let manager, hotel, instRooms, instCustomers, instBookings, customer;
  beforeEach(() => {
    customer = new Customer(229, "Cranston Shival")

    instRooms = rooms.map(room => {
      return room = new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
    });

    instCustomers = customers.map(customer => {
      return customer = new Customer(customer.id, customer.name)
    });

    instBookings = bookings.map(booking => {
      return booking = new Booking(booking.userID, booking.date, booking.roomNumber)
    });

    hotel = new Hotel(instRooms, instCustomers, instBookings,"2020/04/01")
    manager = new Manager(000, "Hambun Grettibean", hotel)
  });
  it.skip('should be a function', function() {
    expect(Manager).to.be.a.function();
  });
  it.skip('should be an instance of User', function() {
    expect(manager).to.be.an.instanceof(Manager);
  });
  //Should be an extension of the User class?
  //
  //Properties
  it.skip('should have an id', function() {
    expect(manager.id).to.equal(000);
  });
  it.skip('should have a name', function() {
    expect(manager.name).to.equal("Hambun Grettibean");
  });
  //THE FOLLOWING THREE TESTS MAY BE UNECESSARY
  it.skip('should have a username', function() {
    expect(custsomer.username).to.equal("IamTheManager");
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
//search for customer
//happy path:
  it.skip('should be able to search for a a customer', function() {
    manager.searchForCustomer(229)
    expect(manager.searchForCustomer(229)).to.deep.equal({
      "id": 69,
      "name": "Hugh Flobear",
      "isLoggedIn": false,
      "bookings": {
        "past": [],
        "future": []
        //Do i need to add methods here?
      }
    });
  });
  //sad paths
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

});
