import chai from 'chai';
const expect = chai.expect;
//import User from '../src/User';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import { rooms, customers, bookings } from './test-data';

describe('Customer', function() {
  let customer, booking1, booking2;
  beforeEach(() => {
    //Instantiate all data here?
    booking1 = new Booking(229, "2020/03/28", 105)
    booking2 = new Booking(229, "2020/03/29", 102)
    // booking3 = new Booking(227, "2020/03/28", 105)
    // booking4 = new Booking(228, "2020/03/29", 102)
    customer = new Customer(229, "Cranston Shival")
  });
  it('should be a function', function() {
    expect(Customer).to.be.a("function");
  });
  it('should be an instance of Customer', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });
  //Should be an extension of the User class?
  //
  //Properties
  it('should have an id', function() {
    expect(customer.id).to.equal(229);
  });
  it('should have a name', function() {
    expect(customer.name).to.equal("Cranston Shival");
  });
  //THE FOLLOWING THREE TESTS MAY BE UNECESSARY
  // it.skip('should have a username', function() {
  //   expect(custsomer.username).to.equal("ratPerson999");
  // });
  // it.skip('should have a password', function() {
  //   expect(customer.password).to.equal("54321");
  // });
  // it.skip('should store the date', function() {
  //   expect(customer.date).to.equal("2020/04/04");
  // });
  it('should be logged out by default', function() {
    expect(customer.isLoggedIn).to.equal(false);
  });
  it('should have a place to store their bookings', function() {
    expect(customer.bookings).to.deep.equal({past: [], future: []});
  });
  it('should push a future booking into the future bookings array', function() {
    customer.setCredentials("BrandyBoo22", "12345")
    customer.logIn("BrandyBoo22", "12345")
    customer.bookARoom(22, "2020/04/25", 101, bookings)

    expect(customer.bookings.future.length).to.equal(1);
  });
  //Methods
  //sort bookings - find some sad paths?
  it('should sort bookings by past and upcoming', function() {
    customer.bookings.past.push(booking1);
    customer.bookings.past.push(booking2);
    customer.setCredentials("BrandyBoo22", "12345")
    customer.logIn("BrandyBoo22", "12345")
    customer.bookARoom(229, "2020/04/25", 105, bookings);
    customer.bookARoom(229, "2020/04/18", 105, bookings);
    customer.sortBookingsByDate("2020/04/04");

    expect(customer.bookings.past).to.deep.equal([booking1, booking2]);
    //figure out id numbers!!!
    // expect(customer.bookings.future).to.deep.equal([
    //   {
    //     "id": "8kjhdia80caplask13",
    //     "userID": 229,
    //     "date": "2020/04/25",
    //     "roomNumber": 105,
    //     "roomServiceCharges": []
    //   },
    //   {
    //     "id": "8kjhdia80caplask14",
    //     "userID": 229,
    //     "date": "2020/04/18",
    //     "roomNumber": 105,
    //     "roomServiceCharges": []
    //   }
    // ]);
    expect(customer.bookings.future.length).to.equal(2);
  });
});
