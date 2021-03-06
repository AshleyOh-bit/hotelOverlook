export const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
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
}
