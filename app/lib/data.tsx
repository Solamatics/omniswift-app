import { MutableRefObject } from "react";

export interface ApiAge {
  value: string;
  data: string[];
  id: number;
  age: number;
  name: string;
  level: string;
  gender: string;
  serialNumber: number;
  state: string;
  pdfRef: MutableRefObject<any>;
}

const fetchData = async (url: string): Promise<ApiAge[]> => {
  const baseURL = process.env.baseURL;
  const res = await fetch(`${baseURL}/${url}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseData = await res.json();
  return responseData.data.students
    ? responseData.data.students
    : responseData.data;
};

export const getAllAges = (): Promise<ApiAge[]> => fetchData("viewAllAges");
export const getAllStates = (): Promise<ApiAge[]> => fetchData("viewAllStates");
export const getAllLevels = (): Promise<ApiAge[]> => fetchData("viewAllLevels");
export const getAllData = (): Promise<ApiAge[]> => fetchData("viewAllData");
export const getAllGenders = (): Promise<ApiAge[]> =>
  fetchData("viewAllGender");
