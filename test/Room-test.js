// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
//import User from '../src/User';
import { rooms, customers, bookings } from './test-data';

describe('Room', function() {
  let room;
  beforeEach(() => {
    //Instantiate all data here
    // booking1 = new Booking("582hdia80caplask1", 227, "2020/03/28", 105)
    //booking2 = new Booking("727hdia80caplask1", 228, "2020/03/29", 102)
    room = new Room(122, "suite", true, "king", 122.87)
  });
  it.skip('should be a function', function() {
    expect(Room).to.be.a.function();
  });
  it.skip('should be an instance of Room', function() {
    expect(room).to.be.an.instanceof(Room);
  });
});
