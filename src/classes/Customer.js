import User from './User'

class Customer extends User {
  constructor(num, name) {
    super(num, name)
    this.bookings = [];
  }
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

  calculateTotalSpent(rooms) {
    const found = []
    let total = 0;
    this.bookings.forEach(currentBooking => {
      rooms.forEach(room => {
        if (room.number === currentBooking.roomNumber) {
          found.push(room)
        }
      })
    })
    found.forEach(room => {
        total += room.costPerNight
      })
      total = Math.round(total)
    return total
  }
}

export default Customer;
