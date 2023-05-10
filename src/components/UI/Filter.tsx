import React, { useState } from "react";
import styles from "./Filter.module.css";

interface FilterProps {
  onFilter: (filters: FiltersState) => void;
}
interface FiltersState {
  name: string;
  role: string;
  status: string;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<FiltersState>({
    name: "",
    role: "",
    status: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter(filters);
  };
  return (
    <div className={styles.filterContainer}>
      <form onSubmit={handleFilterSubmit}>
        <div className={styles.filterField}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.filterField}>
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={filters.role}
            onChange={handleFilterChange}
          >
            <option value="">Select a role</option>
            <option value="Customer">Customer</option>
            <option value="Business">Business</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className={styles.filterField}>
          <label htmlFor="role">Status</label>
          <select
            name="status"
            id="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Select a status</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Close">Close</option>
          </select>
        </div>
        <button type="submit" className={styles.filterButton}>
          Filter
        </button>
      </form>
    </div>
  );
};

export default Filter;
