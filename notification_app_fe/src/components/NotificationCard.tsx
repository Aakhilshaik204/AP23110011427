import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import type { Notification, NotificationType } from "../types/notification";
import { format } from "date-fns";

const getColorForType = (type: NotificationType) => {
  switch (type) {
    case "Placement":
      return "success";
    case "Result":
      return "info";
    case "Event":
      return "warning";
    default:
      return "default";
  }
};

interface Props {
  notification: Notification;
}

export const NotificationCard: React.FC<Props> = ({ notification }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Chip
            label={notification.Type}
            color={getColorForType(notification.Type)}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            {format(new Date(notification.Timestamp), "PPpp")}
          </Typography>
        </Box>
        <Typography variant="body1">{notification.Message}</Typography>
      </CardContent>
    </Card>
  );
};
