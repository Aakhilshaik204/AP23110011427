# Stage 1: Priority Notification System Design

## Objective

The objective of this stage is to efficiently identify and present the most relevant unread notifications from a large dataset. The system ensures that users are shown high-priority updates first, based on both importance and recency.

---

## System Approach

### 1. Data Acquisition

Notifications are retrieved from the provided API endpoint using an authenticated request. A logging mechanism is integrated to monitor request initiation, successful responses, and potential failures.

---

### 2. Priority Modeling

Each notification type is assigned a relative importance score:

* **Placement** → Highest priority
* **Result** → Medium priority
* **Event** → Lowest priority

This prioritization ensures that critical updates, such as job opportunities, are surfaced before less urgent notifications.

---

### 3. Ordering Strategy

Notifications are ordered using a two-level sorting mechanism:

1. **Priority Weight** — Higher priority types appear first
2. **Timestamp** — More recent notifications are prioritized within the same type

This dual sorting approach guarantees both relevance and freshness of displayed data.

---

### 4. Top-N Extraction

After sorting, only the top 10 notifications are selected. This reduces information overload and ensures a focused user experience.

---

### 5. Logging Integration

A reusable logging middleware is employed across the workflow to:

* Record API interactions
* Track processing steps such as sorting and filtering
* Capture and report errors

This enhances system observability and simplifies debugging.

---

## Performance Considerations

* Sorting complexity: **O(n log n)**
* Top-N selection: **O(1)**

This approach ensures scalability and efficient handling of large datasets.

---

## Summary

The implemented solution effectively balances importance and recency to deliver a concise and meaningful set of notifications. By combining structured prioritization with efficient processing and logging, the system provides a reliable and user-centric notification experience.
