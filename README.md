# Campus Notification System Workspace

Welcome to the root repository for the Campus Notification System. This workspace contains the complete documentation and frontend codebase for a system designed to efficiently present and manage university campus updates, placement alerts, and results.

## Project Structure

The repository is organized into the following key components:

### 1. [System Design Documentation](./notification_system_design.md)
Contains the core architectural design and priority modeling for the notification system.
* **Topics Covered:** Data acquisition strategies, priority modeling logic (Placement > Result > Event), ordering mechanisms, top-N extraction logic, and centralized logging implementation.
* **Performance:** Describes computational complexities (O(n log n) sorting, O(1) top-N extraction).

### 2. [Frontend Application](./notification_app_fe/README.md)
The `notification_app_fe` folder contains the React application (built with Vite, TypeScript, and Material UI) that implements the dashboard.
* **Tech Stack:** React, TypeScript, Material UI, Vite
* **Setup:** Requires Node.js and a `.env` file containing a `VITE_API_TOKEN`
* **Execution:** Run `npm run dev` from within the directory to start the application on `http://localhost:3000`.

## Getting Started
To get the project up and running locally, please navigate to the frontend directory and refer to its specific documentation:

```bash
cd notification_app_fe
npm install
npm run dev
```

For more detailed instructions regarding environment variables, CORS proxying, and production builds, please refer to the [Frontend README](./notification_app_fe/README.md).
