import chai from 'chai';
const expect = chai.expect;
import User from '../src/classes/User';
import Booking from '../src/classes/Booking';

describe('User', function() {
  let user, booking1;
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
  ///////Methods
  //Setting username and password
  //Happy
  it.skip('should be able to set username and password', function() {
    user.setCredentials("BrandyBoo22", "12345")

    expect(user.username).to.equal("BrandyBoo22");
    expect(user.password).to.equal("12345");
  });
  //Sad
  it.skip('should be not able to set username with an empty string', function() {
    user.setCredentials("", "12345")

    expect(user.setCredentials("", "12345")).to.equal(`Please enter a username with letters, numbers, and symbols`);
  });
  it.skip('should be not able to set password with an empty string', function() {
    user.setCredentials("BrandyBoo22", "")

    expect(user.setCredentials("BrandyBoo22", "")).to.equal(`Please enter a password with letters, numbers, and symbols`);
  });
  it.skip('should not be able to set username with a space in it', function() {
    user.setCredentials("Brandy Boo22", "12345")

    expect(user.setCredentials("Brandy Boo22", "12345")).to.equal(`Please enter a username with letters, numbers, and symbols`);
  });
  it.skip('should not be able to set password with a space in it', function() {
    user.setCredentials("BrandyBoo22", "123 45")

    expect(user.setCredentials("Brandy Boo22", "123 45")).to.equal(`Please enter a password with letters, numbers, and symbols`);
  });

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
  //Can we POST an instance of a class?
  it.skip('should instantiate a new Booking', function() {
    user.logIn("BrandyBoo22", "12345");
    user.bookARoom(227, "2020/03/28", 105)

    expect(user.bookARoom(227, "2020/03/28", 105)).to.be.an.instanceof(Booking);
  });
  //This one may not be possible with the double return
  it.skip('should alert the user of a successful booking', function() {
    user.logIn("BrandyBoo22", "12345");
    user.bookARoom(227, "2020/03/28", 105)

    expect(user.bookARoom(227, "2020/03/28", 105)).to.equal(`Thank you for your purchase! We will see you on 03/28/2020 in room 105`);
  });
  //Maybe handle this in HTML/post
  //How do we check if a room is available other than date?
  //calls a method in Hotel as well?
  it.skip('should alert the user if booking is unsuccessful', function() {
    user.logIn("BrandyBoo22", "12345");
    user.bookARoom(227, "2020/03/21", 105)

    expect(user.bookARoom(227, "2020/03/21", 105)).to.equal(`Sorry, we cannot book a room for you on that date. Please select another date`);
  });
});
