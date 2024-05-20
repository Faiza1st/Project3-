import Notification from "../models/notification.js";
// Able to get all the notifcation for a user and also delete option if needed by the user.

//  All notifications for a user
export const allNotifications = async (req, res) => {
  try {
    // user ID from user in the request
    const userId = req.user._id;

    // all notifications -> populate with username and profileImg
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    // As read for the user
    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in allNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete all notifications for user
export const deleteNotifications = async (req, res) => {
  try {
    // user ID from  user in the request
    const userId = req.user._id;

    // Delete all notifications  of the user
    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Delete only one notifications for user
export const deleteNotification = async (req, res) => {
  try {
    // user ID from  user in the request
    const notifcationid = req.params._id;
    const userId = req.user._id;
    const notifcation = await Notification.findById(notifcationid);

    if (!notifcation) {
      return res.status(404).json({ error: "Notification not found" });
    }
    if (notifcation.to.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Notification.findByIdAndDelete(notifcationid);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotification function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
