import React, { useState, useContext, useEffect } from "react";
import { Table, Button } from "reactstrap";
import RecordForm, { Record } from "./RecordForm";
import { data } from "../../data/test";
import styles from "./Grid.module.css";
import Filter from "./Filter";
import { RecordContext } from "../../contexts/RecordContext";
import AppPaginator from "../AppPaginator";

const perPage = 15;

const Grid: React.FC<{}> = () => {
  const { records, addRecord, updateRecord, filterRecords } =
    useContext(RecordContext);

  const [open, setOpen] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRecordForm = async (record: Record) => {
    setOpen(false);
    if (record._id.length === 0) {
      await addRecord(record);
    } else {
      await updateRecord(record);
    }
  };

  const handleFilterRecords = (name: string, status: string, role: string) => {
    const filtered = filterRecords(name, status, role);
    setFilteredRecords(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    const skippedRecords = (currentPage - 1) * perPage;
    setFilteredRecords(records.slice(skippedRecords, perPage * currentPage));
  }, [records, currentPage]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.table}>
          <Table>
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
          <div className={styles.controlButtons}>
            <button className={styles.addButton} onClick={() => setOpen(true)}>
              Add Record
            </button>
            <AppPaginator
              activePage={currentPage}
              onChange={(page) => {
                setCurrentPage(page);
              }}
              totalPages={Math.ceil(records.length / perPage)}
            />
          </div>
        </div>
        <div className={styles.filterContainer}>
          <Filter
            onFilter={(filters) => {
              handleFilterRecords(filters.name, filters.status, filters.role);
            }}
          />
        </div>
      </div>

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
