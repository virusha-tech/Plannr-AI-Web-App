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
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect } from "react";

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
  const [plansList, setPlansList] = React.useState([]);
  const [selectedPlan, setSelectedPlan] = React.useState("All");

  const [filteredPlansList, setFilteredPlansList] = React.useState([
    ...props.rows,
  ]);

  useEffect(() => {
    const uniquePlanNames = [
      ...new Set(props.rows.map((item) => item.planName)),
    ];
    setPlansList(["All", ...uniquePlanNames]);
  }, []);

  const handlePlanChange = (event) => {
    const newList = props.rows.map((item) => event.target.value);
    setSelectedPlan(event.target.value);
    setFilteredPlansList([...newList]);
  };

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

  const handleClick = (output, api, planFormFields) => {
    props.handleOutput(output, api, planFormFields);
  };
  return (
    <>
      <DesktopWrapper>
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
                        <StyledTableRow
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                        >
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {`Plannr_${props.count -
                              page * rowsPerPage -
                              index}`}
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
                              onClick={() =>
                                handleClick(
                                  row.output,
                                  row.api,
                                  row.planFormFields
                                )
                              }
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
      </DesktopWrapper>
      <MobileWrapper>
        <div className="header">
          <h1>Plans</h1>
          <div className="filters">
            <span>
              Total <span className="value">{filteredPlansList.length}</span>
            </span>
            <span class="updatePlanName">
              Show{" "}
              <span className="value">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                  <StyledSelect
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedPlan}
                    onChange={handlePlanChange}
                    MenuProps={{
                      sx: {
                        "& .MuiListItem-root.Mui-selected": {
                          backgroundColor: "transparent",
                        },
                      },
                    }}
                  >
                    {plansList.map((value, index) => {
                      return (
                        <StyledMenuItem
                          value={value}
                          MenuProps={{
                            sx: {
                              "&& .Mui-selected": {
                                background: "#f9f9f9",
                                color: "#05bbc2",
                              },
                            },
                          }}
                        >
                          {value}
                        </StyledMenuItem>
                      );
                    })}
                  </StyledSelect>
                </FormControl>
              </span>
            </span>
          </div>
        </div>
        {filteredPlansList.map(
          (
            { created, credits, planName, output, api, planFormFields },
            index
          ) => {
            return (
              <CardContainer>
                <div className="left">
                  <div>
                    <div>
                      Name:
                      <span className="value">
                        {` Plannr_${props.count - index}`}
                      </span>
                    </div>
                    <div>
                      Credits Used: <span className="value">{credits}</span>
                    </div>
                  </div>
                  <div>
                    <span>{created}</span>
                  </div>
                </div>
                <div className="right">
                  <div className="value">{planName}</div>
                  <Button
                    variant="outlined"
                    onClick={() => handleClick(output, api, planFormFields)}
                  >
                    View Plan
                  </Button>
                </div>
              </CardContainer>
            );
          }
        )}
      </MobileWrapper>
    </>
  );
};

const StyledMenuItem = styled(MenuItem)`
  font-style: normal;
  font-size: 16px;
  line-height: 38px;
  padding: 3px 22px;
`;

const StyledSelect = styled(Select)`
  #demo-simple-select-standard {
    display: flex;
    justify-content: space-evenly;
    background-color: transparent !important;
    /* color:#079196 !important; */
  }
`;

const CardContainer = styled.div`
  padding: 16px;
  height: 134px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  .left {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    gap: 30px;
    > div {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  .right {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .value {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #344054;
  }
`;

const DesktopWrapper = styled.div`
  display: block !important;

  @media only screen and (max-width: 600px) {
    display: none !important;
  }
`;
const MobileWrapper = styled.div`
    
  display: none !important;
  .header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
    h1 {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 38px;
      color: #101828;
    }
    .filters {
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-items: center;
    }
    .value {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      text-align: right;
      color: #344054;
    }

    .updatePlanName {
      vertical-align: middle;
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 600px) {
    display: block !important;
  }
`;
