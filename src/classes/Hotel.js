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
    const availableRooms = this.filterRoomsByAvailability(date, customer)
    console.log(this.filterRoomsByAvailability(date, customer))
    if (typeof availableRooms === "string") {
      return availableRooms
    }
    const roomMatchNums = this.rooms.filter(room => {
      return room.roomType === roomType
    }).map(room => {
      return room.number
    })
    const roomsOnDate = availableRooms.reduce((accumulator, currentRoom) => {
      if (roomMatchNums.includes(currentRoom.number)) {
        accumulator.push(currentRoom)
      }
      return accumulator
    }, [])
    if (!roomsOnDate.length) {
      return `Sorry, there are no ${roomType}s available on that date. Please choose another room type or date.`
    } else {

      return roomsOnDate
    }
  }
}

export default Hotel;
