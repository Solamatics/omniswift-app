"use client";

import React, { useState, useEffect } from "react";
import { TextField, Box, MenuItem, Grid, Button } from "@mui/material";
import {
  getAllAges,
  getAllStates,
  getAllLevels,
  getAllGenders,
  getAllData,
  ApiAge,
} from "@/app/lib/data";
import DataTable from "./DataTable";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';



interface FilterProps {}

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

const Filter: React.FC<FilterProps> = () => {
  const ages = useAsyncData(getAllAges);
  const states = useAsyncData(getAllStates);
  const levels = useAsyncData(getAllLevels);
  const genders = useAsyncData(getAllGenders);
  const allData = useAsyncData(getAllData);

  const [filteredData, setFilteredData] = useState<ApiAge[]>([]);

  const initialFilters = {
    age: "",
    state: "",
    level: "",
    gender: "",
  };

  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const handleSearch = async () => {
    try {
      setShowTable(false);
      const response = await axios.post(
        "https://test.omniswift.com.ng/api/filterData",
        {
          age: selectedAge,
          state: selectedState,
          level: selectedLevel,
          gender: selectedGender,
        },
      );
      const newFilteredData = response.data;
      setFilteredData(newFilteredData);

      // Log or process the selected values
      console.log("Selected Age:", selectedAge);
      console.log("Selected State:", selectedState);
      console.log("Selected Level:", selectedLevel);
      console.log("Selected Gender:", selectedGender);
    } catch (error) {
      console.error(`Error filtering data: ${error}`);
    }finally {
      setShowTable(true);
    }
  };

  const renderMenuItems = (data: ApiAge[]) =>
    data.map((option) => (
      <MenuItem
        key={option.id}
        value={option.age || option.name || option.level || option.gender}
      >
        {option.age !== undefined
          ? option.age
          : option.name !== undefined
          ? option.name
          : option.level !== undefined
          ? option.level
          : option.gender !== undefined
          ? option.gender
          : ""}
      </MenuItem>
    ));

    const [showTable, setShowTable] = useState(false)

   useEffect(() => {
    setShowTable(true)
   }, [])

  return (
    <div>
      <div className="bg-white justify-center p-6">
        <h3 className="text-[#616161] text-lg">Filter Student Table By:</h3>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "300px" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                id="outlined-select-age"
                select
                label="Age"
                placeholder="Select Age"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value as string)}
              >
                {renderMenuItems(ages)}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="outlined-select-state"
                select
                label="State"
                placeholder="Select State"
                defaultValue=""
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value as string)}
              >
                {renderMenuItems(states)}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="outlined-select-level"
                select
                label="Level"
                placeholder="Select Level"
                defaultValue=""
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as string)}
              >
                {renderMenuItems(levels)}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="outlined-select-gender"
                select
                label="Gender"
                placeholder="Select Gender"
                defaultValue=""
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value as string)}
                className="text-black"
              >
                {renderMenuItems(genders)}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                className="text-white bg-secondary-bg hover:bg-secondary-bg no-shadow"
                style={{
                  width: "67%",
                  marginLeft: "10px",
                  backgroundColor: "#46C35F",
                }}
                onClick={() => {
                  handleSearch();
                  setSelectedFilters({
                    age: selectedAge,
                    state: selectedState,
                    level: selectedLevel,
                    gender: selectedGender,
                  });
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
     {/* {showTable ? <CircularProgress /> : <div className="mt-12">
        <DataTable
          data={filteredData}
          filters={{
            age: selectedAge,
            state: selectedState,
            level: selectedLevel,
            gender: selectedGender,
          }}
        />
      </div>} */}
      <div className="mt-12">
        <DataTable
          data={filteredData}
          filters={{
            age: selectedAge,
            state: selectedState,
            level: selectedLevel,
            gender: selectedGender,
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
