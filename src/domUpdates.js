const domUpdates = {
  hide(element) {
    element.classList.add("hidden")
  },

  show(element) {
    element.classList.remove("hidden")
  },

  populateHTMLArray(array, location) {
      array.forEach(element => {
        location.innerHTML +=
        `<article class="booking-card">
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

    stringDisplay(element, data) {
    element.innerText = data;
  }

}

export default domUpdates;
