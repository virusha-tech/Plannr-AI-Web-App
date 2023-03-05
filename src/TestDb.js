import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled as matStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledTableCell = matStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = matStyled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (orderBy === "created") {
    const a_date = new Date(a[orderBy]);
    const b_date = new Date(b[orderBy]);

    if (b_date < a_date) {
      return -1;
    }
    if (b_date > a_date) {
      return 1;
    }
    return 0;
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Plan Name",
  },
  {
    id: "planName",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "created",
    numeric: true,
    disablePadding: false,
    label: "Date Created",
  },
  {
    id: "credits",
    numeric: true,
    disablePadding: false,
    label: "Credits Used",
  },
  {
    id: "output",
    numeric: true,
    disablePadding: false,
    label: "Plans",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={"center"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              disabled={headCell.id === "output"}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const EnhancedTable = (props) => {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("created");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.name);
      setSelected([newSelected]);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    props.handleChangePage(newPage, rowsPerPage, () => {
      setPage(newPage);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    props.handleChangePage(0, event.target.value, () => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    });
  };

  const handleClick = (output, api) => {
    props.handleOutput(output, api);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy)).map(
                (row, index, array) => {
                  return (
                    <StyledTableRow role="checkbox" tabIndex={-1} key={row._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {`Plannr_${array.length - index}`}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.planName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.created}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.credits}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleClick(row.output, row.api)}
                        >
                          View Plan
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
