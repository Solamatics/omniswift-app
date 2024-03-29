import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function CustomizedTables({cummulatives}: any) {
    console.log("Result Array :", cummulatives)
  return (
    <TableContainer style={{marginTop:"20px"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{backgroundColor:"#0D7590"}}>
          <TableRow>
            <StyledTableCell style={{backgroundColor:"#0D7590"}}>UNTS</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}}>UNTD</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}} align="right">GPTS</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}} align="right">GPTD</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}} align="right">GPATS</StyledTableCell>
            <StyledTableCell style={{backgroundColor:"#0D7590"}} align="right">GPATD</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {cummulatives.unts}
              </StyledTableCell>
              <StyledTableCell align="right">{cummulatives.untd}</StyledTableCell>
              <StyledTableCell align="right">{cummulatives.gpts}</StyledTableCell>
              <StyledTableCell align="right">{cummulatives.gptd}</StyledTableCell>
              <StyledTableCell align="right">{cummulatives.gpats}</StyledTableCell>
              <StyledTableCell align="right">{cummulatives.gpatd}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
