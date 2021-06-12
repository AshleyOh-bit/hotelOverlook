class Hotel {
  constructor(rooms, bookings, customers, todayDate) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers;
    this.todayDate = todayDate;
  }
  filterRoomsByAvailability(date, customer) {
     customer.bookings.forEach(booking => {
      if (!this.bookings.includes(booking)) {
        this.bookings.push(booking)
      }
    })
    const bookedRoomsNums = this.bookings.filter(booking => {
      return booking.date === date
    }).map(booking => {
      return booking.roomNumber
    })
    const availableRooms = this.rooms.reduce((accumulator, currentRoom) => {
      if (!bookedRoomsNums.includes(currentRoom.number)) {
        accumulator.push(currentRoom)
      }
      return accumulator
    }, [])
     if (!availableRooms.length) {
       return `Sorry, there are no rooms available for that date. Please try another date.`
     } else {
       return availableRooms
     }
  }

  filterRoomsByType(roomType, date, customer) {
    //console.log(this.filterRoomsByAvailability(date, customer))
    const availableRooms = this.filterRoomsByAvailability(date, customer)
    const roomMatchNums = this.rooms.filter(room => {
      return room.roomType === roomType
    }).map(room => {
      return room.number
    })
    //console.log(roomMatchNums)
    //return roomMatches
    const roomsOnDate = availableRooms.reduce((accumulator, currentRoom) => {
      if (roomMatchNums.includes(currentRoom.number)) {
        accumulator.push(currentRoom)
      }
      return accumulator
    }, [])
    //
    return roomsOnDate
    // const dateMatches = this.bookings.filter(currentBooking => {
    //   return currentBooking.date === date
    // })
    //
    // const dateRoomMatches = dateMatches.


  }
}

export default Hotel;
