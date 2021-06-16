import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';

describe('Room', function() {
  let room;
  beforeEach(() => {
    room = new Room(122, "suite", true, "king", 2, 122.87)
  });
  it('should be a function', function() {
    expect(Room).to.be.a("function");
  });
  it('should be an instance of Room', function() {
    expect(room).to.be.an.instanceof(Room);
  });
  //Properties
  it('should have a number', function() {
    expect(room.number).to.equal(122);
  });
  it('should have a room type', function() {
    expect(room.roomType).to.equal("suite");
  });
  it('should determine if there is a bidet', function() {
    expect(room.bidet).to.equal(true);
  });
  it('should have a bed size', function() {
    expect(room.bedSize).to.equal("king");
  });
  it('should have a bed number', function() {
    expect(room.numBeds).to.equal(2);
  });
  it('should have a cost per night', function() {
    expect(room.costPerNight).to.equal(122.87);
  });
});
