import express from "express";
import { protectRoute } from "../protectedRoute/protectRoute.js";
import { deleteNotifications, deleteNotification, allNotifications } from "../controllers/notification.js";

const router = express.Router();

router.get("/", protectRoute, allNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteNotification);

export default router;