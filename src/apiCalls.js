export const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    //display an error message here
    //.catch(err => console.log("API error"))
};

export const postApiData = (userId, date, roomNumber) => {
  let body = {
    "userID": userId,
    "date": date,
    "roomNumber": roomNumber
  }
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
  //.then(response => response.json())
}
