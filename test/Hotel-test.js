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
  //Hotel methods
  it.skip('should be able to filter rooms by availability', function() {
    customer.bookARoom(229, "2020/04/25", 105);
    hotel.filterRoomsByAvailability("2020/04/025");
    //filters bookings with date to return room numbers of booked rooms
    //then it takes that array and compares each element to the rooms array
    //and filters out all AVAILABLE rooms
    expect(hotel.filterRoomsByAvailability("2020/04/25")).to.deep.equal([    {
        "number": 101,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 154.77
      },
      {
        "number": 102,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 325.88
      },
      {
        "number": 103,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 267.05
      },
      {
        "number": 104,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 406.29
      }
    ]);
  });
  it.skip('should alert the customer if there are no rooms available', function() {
    customer.bookARoom(229, "2020/04/25", 105);
    customer.bookARoom(229, "2020/04/25", 104);
    customer.bookARoom(229, "2020/04/25", 103);
    customer.bookARoom(229, "2020/04/25", 102);
    customer.bookARoom(229, "2020/04/25", 101);
    hotel.filterRoomsByAvailability("2020/04/025");
    expect(hotel.filterRoomsByAvailability("2020/04/25")).to.equal(`Sorry, there are no rooms available for that date. Please try another date.`);
  });
  //This may happen in the HTML
  it.skip('should alert the customer if their input is invalid', function() {
    hotel.filterRoomsByAvailability("2018/04/025");
    expect(hotel.filterRoomsByAvailability("2018/04/25")).to.equal(`Please choose a valid date.`);
  });

});
