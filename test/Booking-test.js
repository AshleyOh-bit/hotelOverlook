import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
import { bookings } from './test-data';

describe('Booking', function() {
  let booking;
  beforeEach(() => {
    booking = new Booking(227, "2020/03/28", 105)
  });
  it('should be a function', function() {
    expect(Booking).to.be.a("function");
  });
  it('should be an instance of Booking', function() {
    expect(booking).to.be.an.instanceof(Booking);
  });
  it('should store the user\'s id number', function() {
    expect(booking.userID).to.equal(227);
  });
  it('should store the date to be booked', function() {
    expect(booking.date).to.equal("2020/03/28");
  });
  it('should store the date to be booked', function() {
    expect(booking.roomNumber).to.equal(105);
  });
  it('should be prepared to store room service charges', function() {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });
  it('should have an id', function() {
    expect(booking.id).to.equal(null);
  });
  //Methods
  it('should generate a random id', function() {
    booking.generateRandomId(bookings);
    expect(booking.id.length).to.equal(17);
  });
});
