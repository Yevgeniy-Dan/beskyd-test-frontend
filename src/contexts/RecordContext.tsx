import { createContext } from "react";
import { Record } from "../components/UI/RecordForm";

interface RecordContextType {
  records: Record[];
  addRecord: (newRecord: Record) => Promise<void>;
  updateRecord: (updatedRecord: Record) => Promise<void>;
  filterRecords: (name: string, status: string, role: string) => Record[];
}

export const RecordContext = createContext<RecordContextType>({
  records: [],
  addRecord: async (newRecord: Record) => {},
  updateRecord: async (updateRecord: Record) => {},
  filterRecords: (name: string, status: string, role: string) => [],
});
