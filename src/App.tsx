import React, { useEffect, useState } from "react";
import Grid from "./components/UI/Grid";
import { Record } from "./components/UI/RecordForm";
import { RecordContext } from "./contexts/RecordContext";
import api from "./http";

const App: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get("/api/records");
        setRecords(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecords();
  }, []);

  const addRecord = async (newRecord: Record) => {
    const response = await api.post("/api/records", newRecord);
    setRecords((prevRecords) => [...prevRecords, response.data]);
  };

  const updateRecord = async (updatedRecord: Record) => {
    const response = await api.put(
      `/records/${updatedRecord._id}`,
      updatedRecord
    );
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record._id === updatedRecord._id ? response.data : record
      )
    );
  };

  const filterRecords = (name: string, status: string, role: string) => {
    let filteredRecords = records;

    if (name && name.length !== 0) {
      filteredRecords = filteredRecords.filter((record) =>
        record.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (status && status.length !== 0) {
      filteredRecords = filteredRecords.filter(
        (record) => record.status === status
      );
    }

    if (role && role.length !== 0) {
      filteredRecords = filteredRecords.filter(
        (record) => record.role === role
      );
    }

    return filteredRecords;
  };

  return (
    <RecordContext.Provider
      value={{ records, addRecord, updateRecord, filterRecords }}
    >
      <Grid />
    </RecordContext.Provider>
  );
};

export default App;
