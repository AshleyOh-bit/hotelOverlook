// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';
//import { rooms, customers, bookings } from './test-data';

describe('Room', function() {
  let room;
  beforeEach(() => {
    //Instantiate all data here
    // booking1 = new Booking("582hdia80caplask1", 227, "2020/03/28", 105)
    //booking2 = new Booking("727hdia80caplask1", 228, "2020/03/29", 102)
    room = new Room(122, "suite", true, "king", 2, 122.87)
  });
  it.skip('should be a function', function() {
    expect(Room).to.be.a.function();
  });
  it.skip('should be an instance of Room', function() {
    expect(room).to.be.an.instanceof(Room);
  });
  //Properties
  it.skip('should have a number', function() {
    expect(room.number).to.equal(122);
  });
  it.skip('should have a room type', function() {
    expect(room.roomType).to.equal("suite");
  });
  it.skip('should determine if there is a bidet', function() {
    expect(room.bidet).to.equal(true);
  });
  it.skip('should have a bed size', function() {
    expect(room.bedSize).to.equal("king");
  });
  it.skip('should have a bed size', function() {
    expect(room.numBeds).to.equal(2);
  });
  it.skip('should have a cost per night', function() {
    expect(room.costPerNight).to.equal(122.87);
  });
});
