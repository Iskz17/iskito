import * as XLSX from 'xlsx';
import { PrimaryButton, Title } from "../../components/Component";
import { emptyData } from '../../assets/assets';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import { useState, useEffect } from 'react';

const ExcelReader = (props) => {

    const [expired, setExpired] = useState([]);
    const [headers, setHeaders] = useState([]);
    const handleInput = () => {
        document.getElementById("icon-button-file-excel").click();
    };

    // Function to convert Excel date serial number to JavaScript Date object
    function excelSerialToDate(serial) {
        const baseDate = new Date(Date.UTC(1899, 11, 30)); // Excel base date: December 30, 1899
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

        // Calculate the number of days from the base date
        const days = serial - 1; // Excel incorrectly considers 1900 a leap year, hence -1

        // Calculate the milliseconds to add to the base date
        const millisecondsToAdd = days * millisecondsPerDay;

        // Calculate the final date
        const finalDate = new Date(baseDate.getTime() + millisecondsToAdd);

        return finalDate;
    }

    const handleExcelUpload = async (e) => {
        console.log('reading input file:');
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
        });

        //console.log(e.target.files[0]);
        //console.log(workbook);
        console.log(jsonData);
        let arr = [];
        jsonData.forEach((value, index) => {
            if (index === 0) {
                setHeaders([...value]);
            }
            const jsDate = excelSerialToDate(value[3]);
            console.log(jsDate, 'this is valdate')
            // Function to check if a date is less than 3 months from now
            let today = new Date();
            let threeMonthsLater = new Date();
            threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

            if (jsDate < threeMonthsLater && jsDate > today) {
                arr.push(value);
            }
        });
        console.log(arr, 'this is arr');
        setExpired(arr);

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(
        order,
        orderBy,
    ) {
        return order === 'desc'
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

    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler =
            (property) => (event) => {
                onRequestSort(event, property);
            };

        return (
            <>
                {expired?.length > 0 ? <TableHead>
                    <TableRow>
                        {headers?.map((headCell, index) => (
                            <TableCell
                                key={`${headCell}${index}`}
                                sx={{ fontFamily: "Gilroy" }}
                                align={'left'}
                                padding={'normal'}
                                sortDirection={orderBy === headCell ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell}
                                    direction={orderBy === headCell ? order : 'asc'}
                                    onClick={createSortHandler(headCell)}
                                >
                                    {headCell}
                                    {orderBy === headCell ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead> : <></>}</>

        );
    }

    function EnhancedTableToolbar(props) {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%', fontFamily: "Gilroy" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Workers Data
                    </Typography>
                )}
                {<Tooltip title="Filter list">
                    <PrimaryButton
                        size="medium"
                        disableElevation
                        variant="contained"
                        style={{ width: '150px', minWidth: '150px' }}

                        onClick={() => handleInput()}
                    > {'Upload Excel'}</PrimaryButton>
                </Tooltip>}
            </Toolbar>
        );
    }
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event,
        property,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = expired?.filter(x => x[0] !== 'No').map((n) => n[0]);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expired.length) : 0;

    return (
        <div style={{
            fontFamily: "Gilroy",
            backgroundColor: "#61acae",
            paddingTop: '18px',
            height: "100vh",

        }}>
            <Title title={"Excel Reader"} description={"excel date processing"} />
            <input
                accept={"*"}
                hidden
                multiple
                onChange={(e) => {
                    handleExcelUpload(e);
                }}
                id="icon-button-file-excel"
                type="file"
            />
            <div style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                <Box sx={{ width: 'calc(90% - 20px)' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={'medium'}
                            >
                                {expired?.length > 0 ? <>
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={expired?.length - 1}
                                    /><TableBody>
                                        {expired?.map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row[0])}
                                                    tabIndex={-1}
                                                    key={row[0]}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {row?.map((x, index) => {
                                                        return <TableCell align="left" sx={{ fontFamily: "Gilroy" }}>{x}</TableCell>
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (53) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody> </> : <div style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: '100px', paddingBottom: "100px" }}>
                                    <img src={emptyData} style={{ maxWidth: "250px" }} />
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                        style={{ fontFamily: "Gilroy" }}
                                    >
                                        No data uploaded...
                                    </Typography>
                                </div>}

                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            sx={{
                                fontFamily: "Gilroy",
                                "& .MuiTablePagination-selectLabel": {
                                    fontFamily: "Gilroy"
                                },
                                "& .MuiTablePagination-select.MuiSelect-select.MuiSelect-standard.MuiInputBase-input": {
                                    fontFamily: "Gilroy"
                                },
                                "& .MuiTablePagination-displayedRows" : {
                                    fontFamily: "Gilroy"
                                }
                            }}
                            component="div"
                            count={expired.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box></div>

        </div>
    )
}

export default ExcelReader;