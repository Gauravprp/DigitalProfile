import express from 'express'

import { getAllUsers } from "./userRoutes.js";

const router = express.Router();

router.get('/getAllEmployee', getAllUsers)

export default router