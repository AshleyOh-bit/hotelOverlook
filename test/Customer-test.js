import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import { rooms, bookings } from './test-data';

describe('Customer', function() {
  let customer;
  beforeEach(() => {
    customer = new Customer(229, "Cranston Shival")
  });
  it('should be a function', function() {
    expect(Customer).to.be.a("function");
  });
  it('should be an instance of Customer', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });
  //Properties
  it('should have an id', function() {
    expect(customer.id).to.equal(229);
  });
  it('should have a name', function() {
    expect(customer.name).to.equal("Cranston Shival");
  });
  it('should be logged out by default', function() {
    expect(customer.isLoggedIn).to.equal(false);
  });
  it('should have a place to store their bookings', function() {
    expect(customer.bookings).to.deep.equal([]);
  });
  it('should push a future booking into the bookings array', function() {
    customer.setCredentials("BrandyBoo22", "12345")
    customer.logIn("BrandyBoo22", "12345")
    customer.bookARoom(22, "2020/04/25", 105, bookings)

    expect(customer.bookings.length).to.equal(1);
  });
  //Methods
  //sort bookings - find some sad paths?
  it('should filter bookings to find past bookings', function() {
    customer.setCredentials("BrandyBoo22", "12345")
    customer.logIn("BrandyBoo22", "12345")
    customer.bookARoom(229, "2020/04/25", 105, bookings);
    customer.bookARoom(229, "2020/04/18", 105, bookings);
    customer.filterPastBookings("2020/05/04");

    expect(customer.filterPastBookings("2020/05/04").length).to.equal(2);
  });
  it('should filter bookings to find future bookings', function() {
    customer.setCredentials("BrandyBoo22", "12345")
    customer.logIn("BrandyBoo22", "12345")
    customer.bookARoom(229, "2020/04/25", 105, bookings);
    customer.bookARoom(229, "2020/04/18", 105, bookings);
    customer.filterFutureBookings("2020/03/04");

    expect(customer.filterFutureBookings("2020/03/04").length).to.equal(2);
  });
  it('should filter bookings to find future and present bookings', function() {
    customer.setCredentials("BrandyBoo22", "12345")
    customer.logIn("BrandyBoo22", "12345")
    customer.bookARoom(229, "2020/04/25", 105, bookings);
    customer.bookARoom(229, "2020/04/18", 105, bookings);
    customer.filterFutureBookings("2020/04/18");

    expect(customer.filterFutureBookings("2020/04/18").length).to.equal(2);
  });
  it('should calculate total amount spent', function() {
    customer.setCredentials("BrandyBoo22", "12345")
    customer.logIn("BrandyBoo22", "12345")
    customer.bookARoom(229, "2020/04/25", 103, bookings);
    customer.bookARoom(229, "2020/04/18", 105, bookings);
    customer.calculateTotalSpent(rooms);

    expect(customer.calculateTotalSpent(rooms)).to.equal("611.71");
  });
});
