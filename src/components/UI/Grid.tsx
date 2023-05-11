import React, { useState, useContext, useEffect } from "react";
import { Table, Button } from "reactstrap";
import RecordForm, { Record } from "./RecordForm";
import { data } from "../../data/test";
import styles from "./Grid.module.css";
import Filter from "./Filter";
import { RecordContext } from "../../contexts/RecordContext";

const Grid: React.FC<{}> = () => {
  const { records, addRecord, updateRecord, filterRecords } =
    useContext(RecordContext);

  const [open, setOpen] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);

  const handleRecordForm = async (record: Record) => {
    setOpen(false);
    if (record._id.length === 0) {
      const newRecord = await addRecord(record);
      console.log(newRecord);
    } else {
      const updatedRecord = await updateRecord(record);
      console.log(updatedRecord);
    }
  };

  const handleFilterRecords = (name: string, status: string, role: string) => {
    const filtered = filterRecords(name, status, role);
    setFilteredRecords(filtered);
  };

  useEffect(() => {
    setFilteredRecords(records);
  }, [records]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.address}</td>
                <td>{record.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className={styles.filterContainer}>
          <Filter
            onFilter={(filters) => {
              handleFilterRecords(filters.name, filters.status, filters.role);
            }}
          />
        </div>
      </div>
      <button className={styles.addButton} onClick={() => setOpen(true)}>
        Add Record
      </button>

      <RecordForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onSave={(record) => {
          handleRecordForm(record);
        }}
        record={null}
      />
    </div>
  );
};

export default Grid;
