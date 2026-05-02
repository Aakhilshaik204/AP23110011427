async function test() {
  const stacks = ["react-typescript", "Frontend", "frontend", "web", "reactjs", "react-vite", "React-TS", "react-ts", "vanilla", "HTML"];
  for (const s of stacks) {
    const res = await fetch("http://localhost:3000/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtb2hhbW1hZGFha2hpbF9zaGFpa0Bzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDM4NTUsImlhdCI6MTc3NzcwMjk1NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjlmOGVhOTc1LTgwYTktNDllYS05NmRiLTU4NTVkNWJiYmJiMyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlrIG1vaGFtbWFkIGFha2hpbCIsInN1YiI6Ijg3OTcxZTM0LTE5MDEtNDI2ZC1iMTlhLTNlMTJjZDY5MDMyMCJ9LCJlbWFpbCI6Im1vaGFtbWFkYWFraGlsX3NoYWlrQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJzaGFpayBtb2hhbW1hZCBhYWtoaWwiLCJyb2xsTm8iOiJhcDIzMTEwMDExNDI3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiODc5NzFlMzQtMTkwMS00MjZkLWIxOWEtM2UxMmNkNjkwMzIwIiwiY2xpZW50U2VjcmV0IjoiYm5IUVR0VGpwd0taY1dDWCJ9.W_sEjoe9Rm7H9SBYXdE7z9RfOWOprm_aIn_pa5Lv4so",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack: s,
        level: "info",
        package: "page",
        message: "Test message"
      })
    });
    console.log(s, res.status);
    if (res.status !== 400) break;
  }
}
test();
