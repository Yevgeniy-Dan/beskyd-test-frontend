import React, { useState } from "react";
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

const RecordForm: React.FC<RecordFormProps> = ({
  isOpen,
  onClose,
  onSave,
  record,
}) => {
  const [name, setName] = useState(record?.name || "");
  const [address, setAddress] = useState(record?.address || "");
  const [amount, setAmount] = useState(record?.amount || 0);
  const [role, setRole] = useState(record?.role || "");
  const [status, setStatus] = useState(record?.status || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecord: Record = {
      _id: record?._id || "",
      name,
      address,
      role,
      status,
      amount,
    };
    onSave(newRecord);
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
