class Booking {
  constructor(idNum, dateBooked, roomNum) {
    this.id = null;
    this.userID = idNum;
    this.date = dateBooked;
    this.roomNumber = roomNum;
    this.roomServiceCharges = [];

  }
  generateRandomId(bookings) {
    let newId;
    let template = "8kjhdia80caplask5";
    template = template.split("")
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const createRandomString = () => {
      newId = "";
      const fresh = template.map(letter => {
        return letter = characters.charAt(Math.floor(Math.random() *
       characters.length))
      })
      newId = fresh.join("")
    }

    createRandomString()
    if (bookings.some(booking => {
      booking.id === newId
    })) {
      createRandomString()
    } else {
      this.id = newId;
    }
  }

}


export default Booking;
