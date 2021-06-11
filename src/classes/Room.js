class Room {
  constructor(num, type, isBidet, sizeBed, bedNum, price) {
    this.number = num;
    this.roomType = type;
    this.bidet = isBidet;
    this.bedSize = sizeBed;
    this.numBeds = bedNum;
    this.costPerNight = price;
  }
}

export default Room;
