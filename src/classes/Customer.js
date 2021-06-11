import User from './User'

class Customer extends User {
  constructor(num, name) {
    super(num, name)
    this.bookings = {past: [], future: []};
  }
  sortBookingsByDate(date) {
    //takes in a date and iterates through this.bookings.past to determine if
    //the date passed in is greater than each of the dates in the array
    //if it is not, push the failing test into future
    this.bookings.future.forEach(booking => {
      if (booking.date < date) {
        this.bookings.past.push(booking)
      }

    })
  }
}

export default Customer;
