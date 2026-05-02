export const Log = async (stack, level, pkg, message) => {
  try {
    const allowedPackages = ["api", "component", "hook", "page", "state", "style"];
    const safePackage = allowedPackages.includes(pkg) ? pkg : "api";
    const res = await fetch("/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_API_TOKEN || ""}`,
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
  } catch (err) {}
};
