import express from "express";
import { createHotel,countByType,countByCity, deleteHotel, getAllHotel, getHotel, updateHotel, getHotelRoom } from "../controllers/hotel.js";
const router=express.Router();
import { verifyAdmin } from "../utils/verifyToken.js";



// CREATE
router.post('/',verifyAdmin, createHotel)

// UPDATE
router.put('/:id',verifyAdmin, updateHotel )

// DELETE
router.delete('/:id',verifyAdmin, deleteHotel)

// GET
router.get('/find/:id', getHotel)

// GETALL
router.get('/', getAllHotel)

router.get('/countbycity', countByCity)

router.get('/countByType', countByType)

router.get('/room/:id', getHotelRoom)





export default router;