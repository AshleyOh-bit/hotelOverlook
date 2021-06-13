const domUpdates = {
  hide(element) {
    element.classList.add("hidden")
  },

  show(element) {
    element.classList.remove("hidden")
  },

  populateRoomArray(array, location) {
      array.forEach(element => {
        location.innerHTML +=
        `<article class="booking-card" tabindex=0>
          <article class="room-details">
            <h3>RoomType: ${element.roomType}</h3>
            <p>Room number: ${element.number}</p>
            <p>Bidet? ${element.isBidet}</p>
            <p>Bed Size: ${element.bedSize}</p>
            <p>Number of Beds: ${element.numBeds}</p>
            <p>Price Per Night: ${element.costPerNight}</p>
          </article>
        </article>`
      });
    },

    populateBookingArray(array, location) {
        array.forEach(element => {
          location.innerHTML +=
          `<article class="booking-card" tabindex=0>
            <article class="room-details">
              <h3>Your ID: ${element.userID}</h3>
              <p>Date Booked: ${element.date}</p>
              <p>Room Number: ${element.roomNumber}</p>
            </article>
          </article>`
        });
      },

    stringDisplay(element, data) {
    element.innerText = data;
  }

}

export default domUpdates;
