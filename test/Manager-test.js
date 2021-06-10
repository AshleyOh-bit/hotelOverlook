// import { expect } from 'chai';
import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import Customer from '../src/classes/Customer';
import Manager from '../src/classes/Manager';
import { rooms, customers, bookings } from './test-data';

describe('Manager', function() {
  let manager;
  beforeEach(() => {
    //Instantiate all data here?
    manager = new Manager(000, "Hambun Grettibean", "IamTheManager", "00000", "2020/04/01")
  });
  it.skip('should be a function', function() {
    expect(Manager).to.be.a.function();
  });
  it.skip('should be an instance of User', function() {
    expect(manager).to.be.an.instanceof(Manager);
  });
});
