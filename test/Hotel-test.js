// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
//import User from '../src/User';
import Hotel from '../src/classes/Hotel';
//import Manager from '../src/classes/Manager';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import { rooms, customers, bookings } from './test-data';

describe('Hotel', function() {
  let hotel, instRooms, instCustomers, instBookings, customer;
  beforeEach(() => {
    customer = new Customer(229, "Cranston Shival")

    instRooms = rooms.map(room => {
      return new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
    });

    instCustomers = customers.map(customer => {
      return  new Customer(customer.id, customer.name)
    });

    instBookings = bookings.map(booking => {
      return new Booking(booking.userID, booking.date, booking.roomNumber)
    });

    hotel = new Hotel(instRooms, instCustomers, instBookings, "2020/04/01");
  });
  it.skip('should be a function', function() {
    expect(Hotel).to.be.a("function");
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
    expect(hotel.filterRoomsByAvailability("2020/04/25")).to.deep.equal([
      {
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
  //Filter by roomType
  //happy
  it.skip('should be able to filter rooms by type', function() {
    hotel.filterRoomsByType(["suite"]);
    expect(hotel.filterRoomsByType(["suite"])).to.deep.equal([
      {
        "number": 101,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 154.77
      },
      {
        "number": 105,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 344.66
      }
    ]);
  });
  it.skip('should be able to filter rooms by date and type', function() {
    customer.bookARoom(229, "2020/04/25", 105);
    hotel.filterRoomsByType("2020/04/25", ["suite"]);
    expect(hotel.filterRoomsByType("2020/04/25", ["suite"])).to.deep.equal([
      {
        "number": 101,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 154.77
      }
    ]);
  });
  it.skip('should be able to filter rooms by date and multiple types', function() {
    customer.bookARoom(229, "2020/04/25", 105);
    hotel.filterRoomsByType("2020/04/25", ["suite", "single room"]);
    expect(hotel.filterRoomsByType("2020/04/25", ["suite", "single room"])).to.deep.equal([
      {
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
      }
    ]);
  });
  //sad
  it.skip('should be able to filter rooms by date and type', function() {
    customer.bookARoom(229, "2020/04/25", 105);
    customer.bookARoom(229, "2020/04/25", 101);
    hotel.filterRoomsByType("2020/04/25", ["suite"]);
    expect(hotel.filterRoomsByType("2020/04/25", ["suite"])).to.equal(`Sorry, there are no suites available on that date. Please choose another room type or date.`);
  });
  //Calculate booked percentage
  //happy path below - any sad paths?
  it.skip('should be able to calculate the percentage of rooms booked on current date', function() {
    customer.bookARoom(229, "2020/04/25", 105);
    customer.bookARoom(229, "2020/04/25", 101);
    hotel.calulatePercentageBooked("2020/04/25")
    expect(hotel.calulatePercentageBooked("2020/04/25")).to.equal("20% of rooms are booked for 2020/04/25");
  });
  //calculate total revenue
  //happy path - any sad paths?
  it.skip('should be able to calculate total revenue for current date', function() {
    customer.bookARoom(229, "2020/04/25", 105);
    customer.bookARoom(229, "2020/04/25", 101);
    hotel.calulateTotalRevenue("2020/04/25")
    expect(hotel.calulateTotalRevenue("2020/04/25")).to.equal("Total revenue today: $499.43");
  });
  //determine available rooms
  //happy path
  it.skip('should be able to determine available rooms', function() {
    customer.bookARoom(229, "2020/04/25", 105);
    customer.bookARoom(229, "2020/04/25", 101);
    hotel.filterAvailableRooms("2020/04/25")
    expect(hotel.filterAvailableRooms("2020/04/25")).to.deep.equal([  {
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
    }]);
  });
});
