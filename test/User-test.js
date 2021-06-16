import chai from 'chai';
const expect = chai.expect;
import User from '../src/classes/User';
import Booking from '../src/classes/Booking';
import { bookings } from './test-data';

describe('User', function() {
  let user;
  beforeEach(() => {
    user = new User(227, "Brandy Badabing")
  });
  it('should be a function', function() {
    expect(User).to.be.a("function");
  });
  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });
  //Properties
  it('should have an id', function() {
    expect(user.id).to.equal(227);
  });
  it('should have a name', function() {
    expect(user.name).to.equal("Brandy Badabing");
  });
  it('should be logged out by default', function() {
    expect(user.isLoggedIn).to.equal(false);
  });
  //Methods
  //Setting username and password
  it('should be able to set username and password', function() {
    user.setCredentials("BrandyBoo22", "12345")

    expect(user.username).to.equal("BrandyBoo22");
    expect(user.password).to.equal("12345");
  });
  it('should be not able to set username with an empty string', function() {
    user.setCredentials("", "12345")

    expect(user.setCredentials("", "12345")).to.equal(`Please enter a username with letters, numbers, and symbols`);
  });
  it('should be not able to set password with an empty string', function() {
    user.setCredentials("BrandyBoo22", "")

    expect(user.setCredentials("BrandyBoo22", "")).to.equal(`Please enter a password with letters, numbers, and symbols`);
  });
  it('should be not able to set username and password with empty strings', function() {
    user.setCredentials("", "")

    expect(user.setCredentials("", "")).to.equal(`Please enter a username and password with letters, numbers, and symbols`);
  });
  it('should not be able to set username with a space in it', function() {
    user.setCredentials("Brandy Boo22", "12345")

    expect(user.setCredentials("Brandy Boo22", "12345")).to.equal(`Please enter a username with letters, numbers, and symbols`);
  });
  it('should not be able to set password with a space in it', function() {
    user.setCredentials("BrandyBoo22", "123 45")

    expect(user.setCredentials("BrandyBoo22", "123 45")).to.equal(`Please enter a password with letters, numbers, and symbols`);
  });
  it('should not be able to set a username or password with a space in it', function() {
    user.setCredentials("Brandy Boo22", "123 45")

    expect(user.setCredentials("Brandy Boo22", "123 45")).to.equal(`Please enter a username and password with letters, numbers, and symbols`);
  });
  //Logging in
  it('should be able to log in', function() {
    user.setCredentials("BrandyBoo22", "12345")
    user.logIn("BrandyBoo22", "12345")

    expect(user.isLoggedIn).to.equal(true);
  });
  it('should check username credentials', function() {
    user.setCredentials("BrandyBoo22", "12345")
    user.logIn("11432", "12345")

    expect(user.isLoggedIn).to.equal(false);
    expect(user.logIn("11432", "12345")).to.equal(`Sorry, we could not find any users with that username. Please try again.`);
  });
  it('should check password credentials', function() {
    user.setCredentials("BrandyBoo22", "12345")
    user.logIn("BrandyBoo22", "123455")

    expect(user.isLoggedIn).to.equal(false);
    expect(user.logIn("BrandyBoo22", "123455")).to.equal(`Sorry, we could not find any users to match that password. Please try again.`);
  });
  it('should check if username input field is empty', function() {
    user.setCredentials("BrandyBoo22", "12345")
    user.logIn("", "12345")

    expect(user.isLoggedIn).to.equal(false);
    expect(user.logIn("", "12345")).to.equal(`Sorry, we could not find any users with that username. Please try again.`);
  });
  it('should check if password input field is empty', function() {
    user.setCredentials("BrandyBoo22", "12345")
    user.logIn("BrandyBoo22", "")

    expect(user.isLoggedIn).to.equal(false);
    expect(user.logIn("BrandyBoo22", "")).to.equal(`Sorry, we could not find any users to match that password. Please try again.`);
  });
  //Booking a Room
  it('should be logged in to book a room', function() {
    user.setCredentials("BrandyBoo22", "12345")
    user.logIn("BrandyBoo22", "12345");
    user.bookARoom(227, "2020/03/28", 105, bookings)

    expect(user.isLoggedIn).to.equal(true);
    expect(user.bookARoom(227, "2020/03/28", 105, bookings)).to.be.an("object");
  });
  it('should instantiate a new Booking', function() {
    user.setCredentials("BrandyBoo22", "12345")
    user.logIn("BrandyBoo22", "12345");
    user.bookARoom(227, "2020/03/28", 105, bookings)
    expect(user.bookARoom(227, "2020/03/28", 105, bookings)).to.be.an.instanceof(Booking);
  });
  it('should alert the user if they are not logged in', function() {
    user.bookARoom(227, "2020/03/28", 105, bookings)

    expect(user.bookARoom(227, "2020/03/28", 105, bookings)).to.equal(`Please log in to book a room.`);
  });
});
