// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
//import User from '../src/User';
import { rooms, customers, bookings } from './test-data';

describe('Customer', function() {
  let customer;
  beforeEach(() => {
    //Instantiate all data here?
    // booking1 = new Booking("582hdia80caplask1", 227, "2020/03/28", 105)
    //booking2 = new Booking("727hdia80caplask1", 228, "2020/03/29", 102)
    //user = new User(227, "Brandy Badabing", "BrandyBoo22", "12345", "2020/03/27")
    customer = new Customer(229, "Cranston Shival", "ratPerson999", "54321", "2020/04/04")
  });
  it.skip('should be a function', function() {
    expect(Customer).to.be.a.function();
  });
  it.skip('should be an instance of User', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });
  //Should be an extension of the User class?
  //
  //Properties
  it.skip('should have an id', function() {
    expect(customer.id).to.equal(229);
  });
  it.skip('should have a name', function() {
    expect(customer.name).to.equal("Cranston Shival");
  });
  //THE FOLLOWING THREE TESTS MAY BE UNECESSARY
  it.skip('should have a username', function() {
    expect(custsomer.username).to.equal("ratPerson999");
  });
  it.skip('should have a password', function() {
    expect(customer.password).to.equal("54321");
  });
  it.skip('should store the date', function() {
    expect(customer.date).to.equal("2020/04/04");
  });
  it.skip('should be logged out by default', function() {
    expect(customer.isLoggedIn).to.equal(false);
  });
  it.skip('should have a place to store their bookings', function() {
    expect(customer.bookings).to.equal([]);
  });
  //Methods
  //sort bookings - find some sad paths?
  it.skip('should sort bookings by date', function() {
    customer.bookings.push("2019/03/04");
    customer.bookings.push("2020/03/08");
    customer.bookARoom(229, "2020/04/25", 105);
    customer.bookARoom(229, "2020/04/18", 105);
    customer.sortBookingsByDate("2020/04/04");

    expect(customer.bookings[0]).to.equal("2019/03/04");
    expect(customer.bookings[1]).to.equal("2020/03/08");
    expect(customer.bookings[2]).to.equal("2020/04/20");
    expect(customer.bookings[3]).to.equal("2020/04/25");
  });
});
