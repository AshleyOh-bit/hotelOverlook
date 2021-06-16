import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import { rooms, customers, bookings } from './test-data';

describe('Hotel', function() {
  let hotel, instRooms, instCustomers, instBookings, customer;
  beforeEach(() => {
    customer = new Customer(229, "Cranston Shival")
    customer.setCredentials("ratMan", "12222");
    customer.logIn("ratMan", "12222")

    instRooms = rooms.map(room => {
      return new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
    });

    instCustomers = customers.map(customer => {
      return  new Customer(customer.id, customer.name)
    });

    instBookings = bookings.map(booking => {
      booking = new Booking(booking.userID, booking.date, booking.roomNumber)
      booking.generateRandomId(bookings)
      return booking
    });

    hotel = new Hotel(instRooms, instBookings, instCustomers, "2020/04/01");
  });
  it('should be a function', function() {
    expect(Hotel).to.be.a("function");
  });
  it('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceof(Hotel);
  });
  it('should store rooms', function() {
    expect(hotel.rooms).to.deep.equal(instRooms);
  });
  it('should store bookings', function() {
    expect(hotel.bookings).to.deep.equal(instBookings);
  });
  it('should store customers', function() {
    expect(hotel.customers).to.deep.equal(instCustomers);
  });
  it('should store the date', function() {
    expect(hotel.todayDate).to.deep.equal("2020/04/01");
  });
  //Hotel methods
  it('should be able to filter rooms by availability', function() {
    customer.bookARoom(229, "2020/04/26", 105, bookings);

    expect(hotel.filterRoomsByAvailability("2020/04/26", customer)).to.deep.equal([
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
  it('should alert the customer if there are no rooms available', function() {
    customer.bookARoom(229, "2020/04/27", 105, bookings);
    customer.bookARoom(229, "2020/04/27", 104, bookings);
    customer.bookARoom(229, "2020/04/27", 103, bookings);
    customer.bookARoom(229, "2020/04/27", 102, bookings);
    customer.bookARoom(229, "2020/04/27", 101, bookings);

    expect(hotel.filterRoomsByAvailability("2020/04/27", customer)).to.equal(`Sorry, there are no rooms available for that date. Please try another date.`);
  });
  //Filter by roomType
  it('should be able to filter rooms by type', function() {
    hotel.filterRoomsByType("suite", "2020/04/27", customer);
    expect(hotel.filterRoomsByType("suite", "2020/04/27", customer)).to.deep.equal([
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
  it('should be able to filter rooms by date and type', function() {
    customer.bookARoom(229, "2020/04/25", 105, bookings);

    expect(hotel.filterRoomsByType("suite", "2020/04/25", customer)).to.deep.equal([
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
  it('should be able to filter rooms by date and type', function() {
    customer.bookARoom(229, "2020/04/25", 105, bookings);
    customer.bookARoom(229, "2020/04/25", 101, bookings);
    hotel.filterRoomsByType("suite", "2020/04/25", customer);
    expect(hotel.filterRoomsByType("suite", "2020/04/25", customer)).to.equal(`Sorry, there are no suites available on that date. Please choose another room type or date.`);
  });
  //Calculate Booked Percentage
  it.skip('should be able to calculate the percentage of rooms booked on current date', function() {
    customer.bookARoom(229, "2020/04/25", 105, bookings);
    customer.bookARoom(229, "2020/04/25", 101, bookings);
    hotel.calulatePercentageBooked("2020/04/25")
    expect(hotel.calulatePercentageBooked("2020/04/25")).to.equal("20% of rooms are booked for 2020/04/25");
  });
  //Calculate Total Revenue
  it.skip('should be able to calculate total revenue for current date', function() {
    customer.bookARoom(229, "2020/04/25", 105, bookings);
    customer.bookARoom(229, "2020/04/25", 101, bookings);
    hotel.calulateTotalRevenue("2020/04/25")
    expect(hotel.calulateTotalRevenue("2020/04/25")).to.equal("Total revenue today: $499.43");
  });
  //Determine Available Rooms
  it.skip('should be able to determine available rooms', function() {
    customer.bookARoom(229, "2020/04/25", 105, bookings);
    customer.bookARoom(229, "2020/04/25", 101, bookings);
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
