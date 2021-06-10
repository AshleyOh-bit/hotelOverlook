// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
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
  it.skip('should store the user\'s id number', function() {
    expect(booking.userID).to.equal(227);
  });
  it.skip('should store the date to be booked', function() {
    expect(booking.date).to.equal("2020/03/28");
  });
  it.skip('should store the date to be booked', function() {
    expect(booking.roomNumber).to.equal(105);
  });
  it.skip('should be prepared to store room service charges', function() {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  });
  it.skip('should have an id', function() {
    expect(booking.id).to.equal(null);
  });
  //Methods
  it.skip('should generate a random id', function() {
    //Make sure to check all bookings to check if available?
    booking.generateRandomId(bookings);
    expect(booking.id.length).to.equal(17);
  });

//   function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() *
//  charactersLength));
//    }
//    return result;
// }
//
// console.log(makeid(5));
});
