import React, { useState, useEffect } from "react";
import styles from "./RecordForm.module.css";

interface RecordFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Record) => void;
  record: Record | null;
}

export interface Record {
  _id: string;
  name: string;
  address: string;
  amount: number;
  role: string;
  status: string;
}

const initialValues: Record = {
  _id: "",
  name: "",
  address: "",
  amount: 0,
  role: "",
  status: "",
};
const RecordForm: React.FC<RecordFormProps> = ({
  isOpen,
  onClose,
  onSave,
  record,
}) => {
  const [formData, setFormData] = useState<Record>({
    _id: record?._id || "",
    name: record?.name || "",
    address: record?.address || "",
    amount: record?.amount || 0,
    role: record?.role || "",
    status: record?.status || "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData(record || initialValues);
  }, [record]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialValues);
    }
  }, [isOpen]);

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>{record ? "Edit" : "Add"} Record</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              min={0}
            />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="">Select a role</option>
              <option value="Customer">Customer</option>
              <option value="Business">Business</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">Select a status</option>
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="Close">Close</option>
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit">{record ? "Save" : "Add"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default RecordForm;
