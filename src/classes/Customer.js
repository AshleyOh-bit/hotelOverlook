import User from './User'

class Customer extends User {
  constructor(num, name) {
    super(num, name)
    this.bookings = {past: [], future: []};
  }
  sortBookingsByDate(date) {
    //takes in a date and iterates through this.bookings.past to determine if
    //the date passed in is greater than each 
  }
}

export default Customer;
