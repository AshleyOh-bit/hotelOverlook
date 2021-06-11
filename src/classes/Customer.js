import User from './User'

class Customer extends User {
  constructor(num, name) {
    super(num, name)
    //this.bookings = {past: [], future: []};
    this.bookings = [];
  }
  // sortBookingsByDate(date) {
  //   //takes in a date and iterates through this.bookings.past to determine if
  //   //the date passed in is greater than each of the dates in the array
  //   //if it is not, push the failing test into future
  //   this.bookings.future.forEach((booking, index) => {
  //     console.log(index)
  //     if (booking.date < date) {
  //       this.bookings.future.splice(index, 1)
  //       console.log(this.bookings.future)
  //       this.bookings.past.push(booking)
  //     }
  //   })
  //   this.bookings.past.forEach((booking, index) => {
  //     if (booking.date >= date) {
  //       this.bookings.past.splice(index, 1)
  //       this.bookings.future.push(booking)
  //     }
  //   })
  // }
  filterPastBookings(date) {
    const pastBookings = this.bookings.filter(booking => {
      return booking.date < date
    })
    return pastBookings
  }
  filterFutureBookings(date) {
    const futureBookings = this.bookings.filter(booking => {
      return booking.date >= date
    })
    return futureBookings
  }
}

export default Customer;
