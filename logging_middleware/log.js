export const Log = async (stack, level, pkg, message) => {
  try {
    const allowedPackages = [
      "api",
      "component",
      "hook",
      "page",
      "state",
      "style"
    ];

    const safePackage = allowedPackages.includes(pkg) ? pkg : "api";

    const res = await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtb2hhbW1hZGFha2hpbF9zaGFpa0Bzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDE4MTYsImlhdCI6MTc3NzcwMDkxNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijc2MzAxNDExLWFiZjMtNDZmYy1iYmMxLWE0MmRlMjIxYTNiYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlrIG1vaGFtbWFkIGFha2hpbCIsInN1YiI6Ijg3OTcxZTM0LTE5MDEtNDI2ZC1iMTlhLTNlMTJjZDY5MDMyMCJ9LCJlbWFpbCI6Im1vaGFtbWFkYWFraGlsX3NoYWlrQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJzaGFpayBtb2hhbW1hZCBhYWtoaWwiLCJyb2xsTm8iOiJhcDIzMTEwMDExNDI3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiODc5NzFlMzQtMTkwMS00MjZkLWIxOWEtM2UxMmNkNjkwMzIwIiwiY2xpZW50U2VjcmV0IjoiYm5IUVR0VGpwd0taY1dDWCJ9.AGXBPEvjUXEJtONdNo_kaxVkwx97IqGHZmiCqB0MfcM`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack,
        level,
        package: safePackage,
        message
      })
    });

    const data = await res.json();
    console.log("Log:", data);

  } catch (err) {
    console.error("Logging failed:", err);
  }
};