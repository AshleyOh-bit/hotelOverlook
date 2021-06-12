class Hotel {
  constructor(rooms, bookings, customers, todayDate) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers;
    this.todayDate = todayDate;
  }
  filterRoomsByAvailability(date, customer) {
    //filters bookings with date to return room numbers of booked rooms
    //then it takes that array and compares each element to the rooms array
    //and filters out all AVAILABLE rooms

    //goal: filter return only rooms that are not booked in the form of an array of room objects

    //input: the date to check for availability
    //output: an array of objects of the available rooms

    //process: iterate over this.bookings to find any bookings that date matches the date filtered in, save into an array
    //then, iterate over this.rooms and the booked rooms array to find room number matches. if the room number does not match the booked room, put it in a separate array to be returned
    // const customerDates = customer.bookings.filter(booking => {
    //   return booking.date === date
    // })
    //console.log(customerDates)
    const updates = customer.bookings.forEach(booking => {
      if (!this.bookings.includes(booking)) {
        this.bookings.push(booking)
      }
    })
    const bookedRooms = this.bookings.filter(booking => {
      return booking.date === date
    })

    const availableRooms = this.rooms.reduce((accumulator, currentRoom) => {
      bookedRooms.forEach(bookedRoom => {
        if (bookedRoom.roomNumber !== currentRoom.number && (!accumulator.includes(currentRoom))) {
          accumulator.push(currentRoom)
        }
      })
      return accumulator
    }, [])
     if (!availableRooms.length) {
       return `Sorry, there are no rooms available for that date. Please try another date.`
     } else {
       return availableRooms
     }
  }
}

export default Hotel;
