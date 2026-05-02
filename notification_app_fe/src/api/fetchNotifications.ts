import type { Notification } from "../types/notification";
import { Log } from "../utils/log";

export const fetchNotifications = async (): Promise<Notification[]> => {
  await Log("frontend", "info", "api", "API request start");
  try {
    const token = import.meta.env.VITE_API_TOKEN;
    const response = await fetch("/evaluation-service/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    await Log("frontend", "info", "api", "API request success");
    return data.notifications as Notification[];
  } catch (error) {
    await Log("frontend", "error", "api", `API request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    throw error;
  }
};
