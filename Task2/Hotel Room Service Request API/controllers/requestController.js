const Request = require('../model/requestModel')
const { readRequests, writeRequests } = require('../services/fileService')


// Create a new service request
exports.createRequest = async (req, res) => {
    
    const {id, guestName, roomNumber, requestDetails, priority } = req.body;
    const newRequest = new Request(id, guestName, roomNumber, requestDetails, priority);
    
    try {

      let requests = await readRequests();

      requests.push(newRequest);
      
      await writeRequests(requests);
      res.status(201).json(newRequest);

    } catch (error) {
      res.status(500).json({ message: 'Error creating request' });
    }
};


exports.getRequests = async (req, res) => {
    try {
      const requests = await readRequests();


      if (!requests || requests.length === 0) {
        return res.status(404).json({ message: 'No requests found.' });
      }
  
      // Define the custom order for statuses (higher importance comes first)
      const statusOrder = ['received', 'in progress', 'awaiting confirmation', 'completed', 'canceled'];
  
      // Sort first by status order, then by priority within each status
      const sortedRequests = requests.sort((a, b) => {
        
        if (statusOrder.indexOf(a.status) !== statusOrder.indexOf(b.status)) {
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        }
        
        return a.priority - b.priority;
      });

      res.json(sortedRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving requests' });
    }
  };


 
exports.getRequestById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const requests = await readRequests();
      const request = requests.find(req => req.id === id);
      if (!request) return res.status(404).json({ message: 'Request not found' });
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving request' });
    }
 };


 
 exports.updateRequest = async (req, res) => {
    const { id } = req.params;
    const { guestName, roomNumber, requestDetails, priority, status } = req.body;
    
    try {
        const requests = await readRequests();
        const requestIndex = requests.findIndex(req => req.id === id);
        if (requestIndex === -1) return res.status(404).json({ message: 'Request not found' });
        
        
        const updatedRequest = {
            ...requests[requestIndex], // Keep existing fields
            ...(guestName !== undefined && { guestName }), // Update if provided
            ...(roomNumber !== undefined && { roomNumber }), // Update if provided
            ...(requestDetails !== undefined && { requestDetails }), // Update if provided
            ...(priority !== undefined && { priority }), // Update if provided
            ...(status !== undefined && { status }) // Update if provided
        };

        requests[requestIndex] = updatedRequest; // Update the request in the array
        await writeRequests(requests); // Write back to the file
        res.json(updatedRequest); // Return the updated request
    } catch (error) {
        console.error("Error updating request:", error);
        res.status(500).json({ message: 'Error updating request' });
    }
};





exports.deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await readRequests();

    const request = requests.find(req => req.id === id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    const updatedRequests = requests.filter(req => req.id !== id);
    await writeRequests(updatedRequests);

    
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request' });
  }
};




exports.markRequestCompleted = async (req, res) => {
    const { id } = req.params;
    
    try {
      const requests = await readRequests();
      const request = requests.find(req => req.id === id);
      if (!request) return res.status(404).json({ message: 'Request not found' });
      
      request.status = 'completed';
      await writeRequests(requests);
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: 'Error marking request as completed' });
    }
  }; 


