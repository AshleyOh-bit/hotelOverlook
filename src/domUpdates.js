const domUpdates = {
  hide(element) {
    element.classList.add("hidden")
  },

  show(element) {
    element.classList.remove("hidden")
  },

  populateRoomArray(data, location) {
    if (typeof data ===
    "string") {
      this.stringDisplay(location, data)
    } else {
      location.innerHTML = "";
      data.forEach(element => {
        location.innerHTML +=
        `<article class="booking-card" id="${element.number}" tabindex=0>
          <article class="room-details" id="${element.number}">
          <p>Room Type: ${element.roomType}</p>
          <p>Room Number: ${element.number}</p>
          <p>Bidet? ${element.bidet}</p>
          <p>Bed Size: ${element.bedSize}</p>
          <p>Number of Beds: ${element.numBeds}</p>
          <p>Price Per Night: ${element.costPerNight}</p>
          </article>
        </article>`
      });
    }
  },

  populateBookingArray(array, location) {
    location.innerHTML = "";
    array.forEach(element => {
      location.innerHTML +=
        `<article id="${element.roomNumber}" class="booking-card" tabindex=0 role="button">
          <article class="room-details">
            <p>Your ID: ${element.userID}</p>
            <p>Date Booked: ${element.date}</p>
            <p>Room Number: ${element.roomNumber}</p>
            </article>
          </article>`
    });
  },

  stringDisplay(element, data) {
    element.innerHTML = "";
    element.innerText = data;
  },

  displaySelectedRoom(element, data, date) {
    if (!data) {
      return
    }
    element.innerHTML = "";
    element.innerHTML =
    `<article id="${data.number}" class="selected-room-card ${data.number} ${date}">
        <h2> You have selected: </h2>
        <article class="room-details">
          <p>Room Type: ${data.roomType}</p>
          <p>Room Number: ${data.number}</p>
          <p>Bidet? ${data.bidet}</p>
          <p>Bed Size: ${data.bedSize}</p>
          <p>Number of Beds: ${data.numBeds}</p>
          <p>Price Per Night: ${data.costPerNight}</p>
          <p>Date: ${date}</p>
        </article>
        <button>Book now!</button>
      </article>
    </section>`
  },

  facilitatePostMessage(status, responseStatus, roomView, customer) {
    let newMessage;
    roomView.innerHTML = "";
    if (status === 'success') {
      newMessage = `Room booked! Thank you for your purchase ${customer.name}.`;
    } else {
      newMessage = `Sorry ${customer.name}, we are experiencing an error. Please try again`;
    }
    roomView.innerHTML = `<h3>${newMessage}</h3>`;
  }

}

export default domUpdates;
