const express = require('express');
const router = express.Router();

const {createRequest, getRequests, getRequestById,
     updateRequest, deleteRequest, markRequestCompleted} = require("../controllers/requestController")


router.post('/request', createRequest);
router.get('/request', getRequests);
router.get('/request/:id', getRequestById);
router.put('/request/:id', updateRequest);
router.delete('/request/:id', deleteRequest);
router.post('/request/:id/complete', markRequestCompleted);

module.exports = router;