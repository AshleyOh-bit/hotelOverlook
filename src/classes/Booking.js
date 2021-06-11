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

      // for ( var i = 0; i < 17; i++ ) {
      //   newId += characters.charAt(Math.floor(Math.random() *
      //  characters.length));
      //   }
    const createRandomString = () => {
      newId = "";
      const fresh = template.map(letter => {
        //console.log("old", letter)
        return letter = characters.charAt(Math.floor(Math.random() *
       characters.length))
       //console.log("new", letter)
      })
      newId = fresh.join("")
      //console.log(newId)
    }
    //newId.join()
    createRandomString()

    if (!bookings.some(booking => {
      booking.id === newId
    })) {
      this.id = newId;
    } else {
      createRandomString()
    }
  }


}


export default Booking;
