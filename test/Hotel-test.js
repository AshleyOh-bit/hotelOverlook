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

    hotel = new Hotel(instRooms, instCustomers, instBookings, "2020/04/01");
    manager = new Manager(000, "Hambun Grettibean", hotel);
  });
  it.skip('should be a function', function() {
    expect(Hotel).to.be.a.function();
  });
  it.skip('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceof(Hotel);
  });
  it.skip('should store rooms', function() {
    expect(hotel.rooms).to.deep.equal(instRooms);
  });
  it.skip('should store bookings', function() {
    expect(hotel.bookings).to.deep.equal(instBookings);
  });
  it.skip('should store customers', function() {
    expect(hotel.customers).to.deep.equal(instCustomers);
  });
  it.skip('should store the date', function() {
    expect(hotel.todayDate).to.deep.equal("2020/04/01");
  });

});
