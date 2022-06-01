import express from "express";
import { getHotelRoom } from "../controllers/hotel.js";
import { createRoom,updateRoomAvailability, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/room.js";
const router=express.Router();
import { verifyAdmin } from "../utils/verifyToken.js";



// CREATE
router.post('/:hotelid',verifyAdmin, createRoom)

// UPDATE
router.put('/:id',verifyAdmin, updateRoom)
router.put('/availability/:id', updateRoomAvailability)


// DELETE
router.delete('/:id/:hotelid',verifyAdmin, deleteRoom)

// GET
router.get('/:id', getRoom)

// GETALL
router.get('/', getAllRoom)



export default router;