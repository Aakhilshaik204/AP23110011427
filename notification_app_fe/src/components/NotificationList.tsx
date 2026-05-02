import React from "react";
import { Box, Typography } from "@mui/material";
import type { Notification } from "../types/notification";
import { NotificationCard } from "./NotificationCard";

interface Props {
  notifications: Notification[];
}

export const NotificationList: React.FC<Props> = ({ notifications }) => {
  if (notifications.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="text.secondary">No notifications found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {notifications.map((notification) => (
        <NotificationCard key={notification.ID} notification={notification} />
      ))}
    </Box>
  );
};
