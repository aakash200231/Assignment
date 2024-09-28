

class Request {
  constructor(id, guestName, roomNumber, requestDetails, priority) {
    this.id = id; 
    this.guestName = guestName;
    this.roomNumber = roomNumber;
    this.requestDetails = requestDetails;
    this.priority = priority; // Lower number indicates higher priority
    this.status = 'received'; // Default status when request is created
  }
}

module.exports = Request;
