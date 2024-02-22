import express  from "express";
import { chatAPI } from "../chatAppWithMemory.js";
const router=express.Router()
router.post('/chatApi', chatAPI);
//module.exports=router
export default router;

