# Campus Notification System Frontend

A React application built with Vite, TypeScript, and Material UI. This dashboard displays campus notifications sorted by priority and recency, and supports advanced filtering and pagination.

## Features
- **Modern Dashboard**: Built strictly with Material UI tokens and components.
- **Priority Logic**: Sorts notifications by `Placement > Result > Event` with the most recent appearing first.
- **Proxy Configuration**: Integrates directly with the `evaluation-service` backend, dynamically bypassing CORS via Vite's local proxy.
- **Strict Typing**: Full TypeScript coverage across APIs and UI components.
- **Centralized Logging**: Integrates with the backend log system, tracking page loads, filter changes, and API lifecycle events.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

## Environment Setup
1. Create a `.env` file in the root directory (same directory as this README).
2. Insert your valid JWT token provided by the backend:
```env
VITE_API_TOKEN=your_valid_bearer_token_here
```
*(Note: These tokens expire relatively quickly. If you experience a `401 Unauthorized` error, you will need to replace this token and completely refresh your browser.)*

## Installation
Run the following command to install all project dependencies:
```bash
npm install
```

## Running the Application
To run the local development server:
```bash
npm run dev
```
The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Building for Production
To build an optimized production bundle:
```bash
npm run build
```
The bundled files will be placed inside the `dist` directory.

## Project Structure
- `src/components/`: Reusable Material UI components (`FilterPanel`, `Layout`, `NotificationCard`, `NotificationList`).
- `src/api/`: Handles network requests and payload unwrapping.
- `src/types/`: Centralized TypeScript interfaces.
- `src/utils/`: Utility functions (e.g., custom remote logging function).
- `src/App.tsx`: The primary application state driver for sorting and pagination logic.
