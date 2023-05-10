import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import RecordForm, { Record } from "./RecordForm";
import { data } from "../../data/test";
import styles from "./Grid.module.css";
import Filter from "./Filter";

const Grid: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [open, setOpen] = useState(false);
  const handleRecordForm = (record: Record) => {
    setOpen(false);
    console.log(record);
  };
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
            {data.map((record, index) => (
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
              console.log(filters);
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
