import { Log } from "../logging_middleware/log.js";

const importanceScore = {
  Placement: 5,
  Result: 3,
  Event: 1
};

async function getNotifications() {
  Log("frontend", "info", "api", "Initiating fetch for notifications");

  const response = await fetch(
    "http://20.207.122.201/evaluation-service/notifications",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtb2hhbW1hZGFha2hpbF9zaGFpa0Bzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDE4MTYsImlhdCI6MTc3NzcwMDkxNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijc2MzAxNDExLWFiZjMtNDZmYy1iYmMxLWE0MmRlMjIxYTNiYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlrIG1vaGFtbWFkIGFha2hpbCIsInN1YiI6Ijg3OTcxZTM0LTE5MDEtNDI2ZC1iMTlhLTNlMTJjZDY5MDMyMCJ9LCJlbWFpbCI6Im1vaGFtbWFkYWFraGlsX3NoYWlrQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJzaGFpayBtb2hhbW1hZCBhYWtoaWwiLCJyb2xsTm8iOiJhcDIzMTEwMDExNDI3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiODc5NzFlMzQtMTkwMS00MjZkLWIxOWEtM2UxMmNkNjkwMzIwIiwiY2xpZW50U2VjcmV0IjoiYm5IUVR0VGpwd0taY1dDWCJ9.AGXBPEvjUXEJtONdNo_kaxVkwx97IqGHZmiCqB0MfcM"
      }
    }
  );

  const json = await response.json();

  Log("frontend", "info", "api", "Notifications received from server");

  return json.notifications;
}

function arrangeByPriority(list) {
  Log("frontend", "info", "api", "Sorting notifications");

  return list.sort((first, second) => {
    const scoreA = importanceScore[first.Type] || 0;
    const scoreB = importanceScore[second.Type] || 0;

    
    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }


    const timeA = new Date(first.Timestamp).getTime();
    const timeB = new Date(second.Timestamp).getTime();

    return timeB - timeA;
  });
}


function extractTop(list, count = 10) {
  Log("frontend", "info", "service", `Extracting top ${count} notifications`);
  return list.slice(0, count);
}


async function runStageOne() {
  try {
    Log("frontend", "info", "api", "Stage 1 execution started");

    const rawData = await getNotifications();

    const prioritized = arrangeByPriority(rawData);

    const topNotifications = extractTop(prioritized, 10);

    Log("frontend", "info", "service", "Top notifications ready");

    console.log("\n===== PRIORITY NOTIFICATIONS =====\n");
    topNotifications.forEach((item, index) => {
      console.log(
        `${index + 1}. [${item.Type}] ${item.Message} (${item.Timestamp})`
      );
    });

  } catch (error) {
    Log("frontend", "error", "api", "Failure during Stage 1 execution");
    console.error("Error:", error.message);
  }
}


runStageOne();