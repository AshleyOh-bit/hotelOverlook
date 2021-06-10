// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
//import User from '../src/User';
import { rooms, customers, bookings } from './test-data';

describe('User', function() {
  let user, booking1;
  beforeEach(() => {
    booking1 = new Booking("582hdia80caplask1", 227, "2020/03/28", 105)
    booking2 = new Booking("727hdia80caplask1", 228, "2020/03/29", 102)
    user = new User(227, "Brandy", "BrandyBoo22", "12345", "2020/03/27")
  });
  it.skip('should be a function', function() {
    expect(User).to.be.a.function();
  });
  it.skip('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });
  //Properties
  it.skip('should have an id', function() {
    expect(user.id).to.equal(227);
  });
  it.skip('should have a name', function() {
    expect(user.name).to.equal("Brandy");
  });
  //THE FOLLOWING THREE TESTS MAY BE UNECESSARY
  it.skip('should have a username', function() {
    expect(user.username).to.equal("BrandyBoo22");
  });
  it.skip('should have a password', function() {
    expect(user.password).to.equal("12345");
  });
  it.skip('should store the date', function() {
    expect(user.date).to.equal("2020/03/27");
  });
  it.skip('should be logged out by default', function() {
    expect(user.isLoggedIn).to.equal(false);
  });
  ///////Methods
  //Logging in
  //Happy:
  it.skip('should be able to log in', function() {
    user.logIn("BrandyBoo22", "12345")

    expect(user.isLoggedIn).to.equal(true);
  });
  //Sad:
  it.skip('should check username credentials', function() {
    user.logIn("11432", "12345")

    expect(user.isLoggedIn).to.equal(false);
    expect(user.logIn("11432", "12345")).to.equal(`Sorry, we could not find any users with that username. Please try again.`);
  });
  it.skip('should check password credentials', function() {
    user.logIn("BrandyBoo22", "123455")

    expect(user.isLoggedIn).to.equal(false);
    expect(user.logIn("BrandyBoo22", "123455")).to.equal(`Sorry, we could not find any users to match that password. Please try again.`);
  });
  //These probably can be handled in HTML with required + DOM error handling
  it.skip('should check if username input field is empty', function() {
    user.logIn("", "12345")

    expect(user.isLoggedIn).to.equal(false);
    expect(user.logIn("", "12345")).to.equal(`Sorry, we could not find any users with that username. Please try again.`);
  });
  it.skip('should check if password input field is empty', function() {
    user.logIn("BrandyBoo22", "")

    expect(user.isLoggedIn).to.equal(false);
    expect(user.logIn("", "12345")).to.equal(`Sorry, we could not find any users to match that password. Please try again.`);
  });
  //Booking a Room
  //Happy:
  it.skip('should be logged in to book a room', function() {
    user.logIn("BrandyBoo22", "12345");
    user.bookARoom(227, "2020/03/28", 105)

    expect(user.isLoggedIn).to.equal(true);
    expect(user.bookARoom( 227, "2020/03/28", 105)).to.deep.equal(booking1);
  });
  it.skip('should instantiate a new Booking', function() {
    user.logIn("BrandyBoo22", "12345");
    user.bookARoom(227, "2020/03/28", 105)

    expect(booking1).to.be.an.instanceof(Booking);
  });
  //This one may not be possible with the double return
  it.skip('should alert the user of a successful booking', function() {
    user.logIn("BrandyBoo22", "12345");
    user.bookARoom(227, "2020/03/28", 105)

    expect(user.bookARoom(227, "2020/03/28", 105)).to.equal(`Thank you for your purchase! We will see you on 03/28/2020 in room 105`);
  });
});
