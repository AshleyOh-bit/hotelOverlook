export const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .catch(err => console.log("API error"))
};

export const postApiData = (booking) => {
  return fetch(`http://localhost:3001/api/v1/${booking}`, {
    method: 'POST',
    body: JSON.stringify(booking),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
