const domUpdates = {
  hide(element) {
    element.classList.add("hidden")
  },

  show(element) {
    element.classList.remove("hidden")
  },

  populateRoomArray(array, location) {
    //console.log("trying")
    //console.log(array)
    location.innerHTML = "";
      array.forEach(element => {
        location.innerHTML +=
        `<article class="booking-card" id="${element.number}" tabindex=0>
          <article class="room-details" id="${element.number}">
            <h3>RoomType: ${element.roomType}</h3>
            <p>Room number: ${element.number}</p>
            <p>Bidet? ${element.bidet}</p>
            <p>Bed Size: ${element.bedSize}</p>
            <p>Number of Beds: ${element.numBeds}</p>
            <p>Price Per Night: ${element.costPerNight}</p>
          </article>
        </article>`
      });
  },

  populateBookingArray(array, location) {
      location.innerHTML = "";
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
  },

  displaySelectedRoom(element, data, date) {
    element.innerHTML = "";
    element.innerHTML =
    `<article class="selected-room-card ${data.number} ${date}">
        <h2> You have selected: </h2>
        <article class="room-details">
          <h3>RoomType: ${data.roomType}</h3>
          <p>Room number: ${data.number}</p>
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
    // let originalMessage = messageSelectors[`${type}FormMessage`].innerText;
    roomView.innerHTML = "";
    if (status === 'success') {
      newMessage = `Room booked! thank you for your purchase ${customer.name}.`;
    } else {
      newMessage = `Sorry ${customer.name}, we are experiencing this error: ${responseStatus.message}`;
    }
    roomView.innerText = newMessage;
    // const resetMessage = setTimeout(() => {
    // messageSelectors[`${type}FormMessage`].innerText = originalMessage;
    // }, 5000)
  }




}

export default domUpdates;
