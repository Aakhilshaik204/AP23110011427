import React, { useEffect, useState, useMemo } from "react";
import { Layout } from "./components/Layout";
import { fetchNotifications } from "./api/fetchNotifications";
import type { Notification, NotificationType } from "./types/notification";
import { Log } from "./utils/log";
import { NotificationList } from "./components/NotificationList";
import { FilterPanel } from "./components/FilterPanel";
import { Box, Typography, Tabs, Tab, CircularProgress, Alert } from "@mui/material";

const typePriority: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const App: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tab, setTab] = useState<"priority" | "all">("priority");
  const [selectedType, setSelectedType] = useState<NotificationType | "All">("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const loadData = async () => {
      await Log("frontend", "info", "page", "Page load");
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
        await Log("frontend", "error", "page", "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleTypeChange = (type: NotificationType | "All") => {
    setSelectedType(type);
    setPage(1);
    Log("frontend", "info", "component", `Filter changed to ${type}`).catch(() => {});
  };

  const processedData = useMemo(() => {
    let filtered = [...notifications];

    if (selectedType !== "All") {
      filtered = filtered.filter((n) => n.Type === selectedType);
    }

    filtered.sort((a, b) => {
      if (typePriority[a.Type] !== typePriority[b.Type]) {
        return typePriority[b.Type] - typePriority[a.Type];
      }
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    });

    if (tab === "priority") {
      return filtered.slice(0, 10);
    }

    return filtered;
  }, [notifications, selectedType, tab]);

  const paginatedData = useMemo(() => {
    if (tab === "priority") return processedData;
    const startIndex = (page - 1) * limit;
    return processedData.slice(startIndex, startIndex + limit);
  }, [processedData, page, limit, tab]);

  const totalPages = tab === "all" ? Math.ceil(processedData.length / limit) : 1;

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
          Dashboard
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v);
            setPage(1);
          }}
          sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
        >
          <Tab label="Priority (Top 10)" value="priority" />
          <Tab label="All Notifications" value="all" />
        </Tabs>

        <FilterPanel
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          page={page}
          onPageChange={setPage}
          totalPages={totalPages}
          limit={limit}
          onLimitChange={(v) => {
            setLimit(v);
            setPage(1);
          }}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <NotificationList notifications={paginatedData} />
        )}
      </Box>
    </Layout>
  );
};

export default App;
