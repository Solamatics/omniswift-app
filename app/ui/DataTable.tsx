"use client";

import { useState, useEffect, useRef } from "react";
import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { saveAs } from "file-saver";
import { ApiAge, getAllData } from "@/app/lib/data";
import Document from "@/app/ui/Document";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios"

interface Column {
  id:
    | "serialNumber"
    | "surname"
    | "firstname"
    | "age"
    | "gender"
    | "level"
    | "state"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface DataTableProps {
  data: ApiAge[];
  filters: {
    age: string;
    state: string;
    level: string;
    gender: string;
  };
}

const columns: readonly Column[] = [
  { id: "serialNumber", label: "S/N", minWidth: 50 },
  { id: "surname", label: "Surname", minWidth: 170 },
  { id: "firstname", label: "First Name", minWidth: 170 },
  { id: "age", label: "Age", minWidth: 100 },
  {
    id: "gender",
    label: "Gender",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "level",
    label: "Level",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "state",
    label: "State",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "right",
  },
];

interface Data {
  serialNumber: number;
  surname: string;
  firstname: string;
  age: number;
  gender: string;
  level: string;
  state: string;
}

function createData(
  serialNumber: number,
  surname: string,
  firstname: string,
  age: number,
  gender: string,
  level: string,
  state: string,
): Data {
  return { serialNumber, surname, firstname, age, gender, level, state };
}


const useAsyncData = (getDataFunction: () => Promise<ApiAge[]>) => {
  const [data, setData] = useState<ApiAge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataFunction();
        setData(response);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, [getDataFunction]);


  return data;
};

export default function StickyHeadTable({ data, filters }) {
  const [filteredData, setFilteredData] = useState<ApiAge[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentData, setStudentData] = useState(null)
  const [showDoc, setShowDoc] = useState(false)
  

  const pdfRef = useRef<any>();

  const allData = useAsyncData(getAllData);

  useEffect(() => {
    // Filter data based on selected filters
    const newFilteredData = allData.filter((item) => {
      return (
        (filters.age === "" || item.age === filters.age) &&
        (filters.state === "" || item.state === filters.state) &&
        (filters.level === "" || item.level === filters.level) &&
        (filters.gender === "" || item.gender === filters.gender)
      );
    });

    setFilteredData(newFilteredData);
  }, [allData, filters]);

  const fetchResult = async (id: number) => {
  const response = await axios.post(`https://test.omniswift.com.ng/api/viewResult/${id}`);
  
  console.log("id:", id)
  const data = response.data;
   console.log("result data:", data)
  setStudentData(data) 

}



  const downloadPDF = (e) => {
    e.preventDefault();
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      pdf.save("certificate.pdf");
    });
  };

const handleDownload = async (rowId) => {
    try {
      await fetchResult(rowId);
      downloadPDF();
    } catch (error) {
      console.error("Error fetching result:", error);
    }
  };

  return (
   <>

   <Paper sx={{ width: "100%", overflow: "hidden" }}>
      
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#F9F9FA",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(filteredData.length > 0 ? filteredData : allData)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "serialNumber" ? (
                        row.id
                      ) : column.id === "actions" ? (
                        <Button
                          variant="contained"
                          style={{ background: "#46C35F", color: "#fff" }}
                          onClick={async (e) => {
                               await fetchResult(row.id)
                            downloadPDF(e)
                          }}
                        >
                          Download Result
                        </Button>
                      ) : (
                        (row as any)[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    
   {showDoc && (
        <div>
          <Document ref={pdfRef} data={studentData} />
        </div>
      )}
    
  </> 
  );
}
