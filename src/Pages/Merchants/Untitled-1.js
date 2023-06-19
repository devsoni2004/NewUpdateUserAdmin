import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { saveAs } from 'file-saver';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import Splitbtn from '../../Components/Splitbtn';
import InputLabel from '@mui/material/InputLabel';
import { FormControl, MenuItem, Select } from '@mui/material';
import AddMerchants from './AddMerchants';
import { deleteUser } from '../../api/api';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  overflow: 'scroll',
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: 'name', label: 'Merchant Id', minWidth: 170 },
  { id: 'code', label: 'Merchant Name', minWidth: 100 },
  {
    id: 'population',
    label: 'Email',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Mobile No',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'View Details',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const MerchantsList = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [merchants, setMerchants] = useState([]);
  const [search, setSearch] = useState('');
  const [currentMerchant, setCurrentMerchant] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get('API_URL');
        setMerchants(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMerchants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setMerchants(merchants.filter((merchant) => merchant.id !== id));
      Swal.fire({
        title: 'Deleted!',
        text: 'Merchant has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while deleting the merchant.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleEdit = (merchant) => {
    setCurrentMerchant(merchant);
    handleOpen();
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const exportToExcel = () => {
    const formattedData = merchants.map((merchant) => ({
      'Merchant Id': merchant.id,
      'Merchant Name': merchant.name,
      Email: merchant.email,
      'Mobile No': merchant.mobile,
      Status: merchant.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Merchants');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    saveAs(data, 'merchants.xlsx');
  };

  return (
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          id="outlined-basic"
          label="Search by Merchant Name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <MenuItem value="">-- Select --</MenuItem>
            <MenuItem value="Allow">Allow</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel id="filter-select-label">Filter</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={selectedOption}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleOpen}>
          Add Merchant
        </Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {merchants
                .filter((merchant) =>
                  merchant.name.toLowerCase().includes(search.toLowerCase())
                )
                .filter((merchant) =>
                  selectedStatus === '' ? true : merchant.status === selectedStatus
                )
                .filter((merchant) =>
                  selectedOption === '' ? true : merchant.status === selectedOption
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((merchant) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={merchant.id}
                    >
                      {columns.map((column) => {
                        const value = merchant[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="right">
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<RemoveRedEyeIcon />}
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(merchant)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(merchant.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={merchants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Merchant
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <AddMerchants merchant={currentMerchant} />
        </Box>
      </Modal>
    </div>
  );
};

export default MerchantsList;
