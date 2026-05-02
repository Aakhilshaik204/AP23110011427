import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Pagination } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { NotificationType } from "../types/notification";

interface Props {
  selectedType: NotificationType | "All";
  onTypeChange: (type: NotificationType | "All") => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export const FilterPanel: React.FC<Props> = ({
  selectedType,
  onTypeChange,
  page,
  onPageChange,
  totalPages,
  limit,
  onLimitChange,
}) => {
  const handleTypeChange = (e: SelectChangeEvent) => {
    onTypeChange(e.target.value as NotificationType | "All");
  };

  const handleLimitChange = (e: SelectChangeEvent<number>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="type-filter-label">Filter by Type</InputLabel>
        <Select
          labelId="type-filter-label"
          value={selectedType}
          label="Filter by Type"
          onChange={handleTypeChange}
        >
          <MenuItem value="All">All Types</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="limit-label">Per Page</InputLabel>
          <Select
            labelId="limit-label"
            value={limit}
            label="Per Page"
            onChange={handleLimitChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
};
