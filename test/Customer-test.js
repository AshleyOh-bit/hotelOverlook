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

});
