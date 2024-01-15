import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Table,TableBody, TableContainer,TableHead, TableRow} from '@mui/material';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables({results}) {
    console.log("Result object :", results)
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{backgroundColor:"#0D7590"}}>S/N</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}}>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}} align="right">Calories</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}} align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}} align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}} align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.map((result) => (
            <StyledTableRow key={result?.coursecode}>
              <StyledTableCell component="th" scope="row">
                {result?.coursecode}
              </StyledTableCell>
              <StyledTableCell align="right">{result?.coursecode}</StyledTableCell>
              <StyledTableCell align="right">{result?.title}</StyledTableCell>
              <StyledTableCell align="right">{result?.credit_unit}</StyledTableCell>
              <StyledTableCell align="right">{result?.grade}</StyledTableCell>
              <StyledTableCell align="right">{result?.total_point}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
