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
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { useState, useMemo } from 'react';

const ExcelReader = (props) => {

    const [expired, setExpired] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
        });

        let arr = [];
        let head = [];
        jsonData.forEach((value, ind) => {
            if (ind === 0) {
                setHeaders([...value]);
                head = [...value];
            }
            const jsDate = excelSerialToDate(value[3]);
            // Function to check if a date is less than 3 months from now
            let today = new Date();
            let threeMonthsLater = new Date();
            threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

            if (jsDate < threeMonthsLater && jsDate > today) {
                let valProcessed = [...value];
                valProcessed[3] = jsDate.toLocaleDateString('en-GB', options);
                let valObject = {};
                head.forEach((val, index) => {
                    valObject[val] = valProcessed[index];
                })

                //if(index !== 0 ){
                arr.push(valObject);
                //}
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
                                key={`${headCell}_${index}`}
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

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%', fontFamily: "Gilroy" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Workers Data
                </Typography>
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

    const handleRequestSort = (
        event,
        property,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        console.log(isAsc, orderBy, order, 'this is asc');
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(
        () =>
            stableSort(expired, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, expired, getComparator],
    );

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expired.length) : 0;

    return (
        <div style={{
            fontFamily: "Gilroy",
            backgroundColor: "#61acae",
            paddingTop: '18px',
            minHeight: "100vh",

        }}>
            <Title title={"Excel Reader"} description={"excel date processing"} />
            <input
                accept={"*"}
                hidden
                multiple
                onChange={(e) => {
                    handleExcelUpload(e);
                    e.target.value = null;
                }}
                id="icon-button-file-excel"
                type="file"
            />
            <Box style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                <Box sx={{ width: 'calc(90% - 20px)' }}>
                    <Paper sx={{ width: '100%', mb: 2, padding: 2, boxShadow: 'rgba(0,0,0, 0.2) 1px 50px 30px -20px' }} elevation={0}>
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
                                        {visibleRows?.map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={`row_${index}_data`}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {headers?.map((x) => {
                                                        return <TableCell key={`row_${index}_${row[x]}`} align="left" sx={{ fontFamily: "Gilroy" }}>{row[x]}</TableCell>
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
                                    </TableBody> </> :
                                    <TableBody>                                    <Box style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: '100px', paddingBottom: "100px" }}>
                                        <img alt="empty state indication" src={emptyData} style={{ maxWidth: "250px" }} />
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                            style={{ fontFamily: "Gilroy" }}
                                        >
                                            No data uploaded...
                                        </Typography>
                                    </Box></TableBody>
                                }

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
                                "& .MuiTablePagination-displayedRows": {
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
                </Box>
            </Box>

        </div>
    )
}

export default ExcelReader;