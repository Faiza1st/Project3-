import express from "express";
import { protectRoute } from "../protectedRoute/protectRoute.js";
import { deleteNotification, allNotifications } from "../controllers/notification.js";

const router = express.Router();

router.get("/", protectRoute, allNotifications);
router.delete("/", protectRoute, deleteNotification);

export default router;