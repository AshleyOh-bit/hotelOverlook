// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
//import User from '../src/User';
import { rooms, customers, bookings } from './test-data';

describe('Booking', function() {
  let user, booking;
  beforeEach(() => {
    //Instantiate all data here
    booking = new Booking(227, "2020/03/28", 105)
    //booking2 = new Booking("727hdia80caplask1", 228, "2020/03/29", 102)
    //user = new User(227, "Brandy Badabing", "BrandyBoo22", "12345", "2020/03/27")
  });
  it.skip('should be a function', function() {
    expect(Booking).to.be.a.function();
  });
  it.skip('should be an instance of Booking', function() {
    expect(booking).to.be.an.instanceof(Booking);
  });

});
