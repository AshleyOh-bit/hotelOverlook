// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
//import User from '../src/User';
import { rooms, customers, bookings } from './test-data';

describe('User', function() {
  let user;
  beforeEach(() => {
    // usersData = userTestData.map(user => new User(user));
    // userTestRepository = new UserRepository(usersData, sleepTestData, activityTestData, hydrationTestData);
    // user = userTestRepository.users[0];
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
  it.skip('should determine whether user is logged in', function() {
    expect(user.isLoggedIn).to.equal(false);
  });
  
});
