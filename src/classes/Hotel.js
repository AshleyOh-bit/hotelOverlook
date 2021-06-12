class Hotel {
  constructor(rooms, bookings, customers, todayDate) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers;
    this.todayDate = todayDate;
  }
  filterRoomsByAvailability(date, customer) {
    //updates these bookings with customer info
     customer.bookings.forEach(booking => {
      if (!this.bookings.includes(booking)) {
        this.bookings.push(booking)
      }
    })
    //checks hotel bookings for matching dates and returns bookings that match
    //just room numbers here
    const bookedRoomsNums = this.bookings.filter(booking => {
      return booking.date === date
    }).map(booking => {
      return booking.roomNumber
    })

    //console.log(bookedRoomsNums)
//checks rooms against booked rooms for room number matches
//pushes rooms that do not have the number into their own array
//console.log(this.rooms)
    const availableRooms = this.rooms.reduce((accumulator, currentRoom) => {

        //console.log("booked", bookedRoom.roomNumber)
        //console.log("room", currentRoom.number)
        //console.log(bookedRoom.roomNumber !== currentRoom.number)
        //console.log(accumulator.includes(currentRoom))
        if (!bookedRoomsNums.includes(currentRoom.number)) {
          //console.log("i'm pishimg")
          accumulator.push(currentRoom)
        }

      return accumulator
    }, [])
    //console.log(availableRooms.length)
     if (!availableRooms.length) {
       return `Sorry, there are no rooms available for that date. Please try another date.`
     } else {
       return availableRooms
     }
  }

  filterRoomsByType(roomType, date, customer) {
    //console.log(this.filterRoomsByAvailability(date, customer))
    this.filterRoomsByAvailability(date, customer)
    const roomMatches = this.rooms.filter(room => {
      return room.roomType === roomType
    })
    return roomMatches
    //
    // const dateMatches = this.bookings.filter(currentBooking => {
    //   return currentBooking.date === date
    // })
    //
    // const dateRoomMatches = dateMatches.


  }
}

export default Hotel;
