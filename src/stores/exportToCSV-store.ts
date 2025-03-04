import { create } from 'zustand';
import Papa from 'papaparse';

interface ExportStore {
  exportToCSV: (data: any[], fileName: string) => void;
}

const useExportStore = create<ExportStore>((set) => ({
    exportToCSV: (data:Array<any>, fileName:string) => {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${fileName}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  }));
  
  export default useExportStore;