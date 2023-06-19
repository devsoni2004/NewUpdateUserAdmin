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
  const [age, setAge] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [merchants, setmerchants] = useState([]);
  const [search, setSearch] = useState('');
  const [filterdata, setFilterData] = useState([]);
  const [currentMerchant, setCurrentMerchant] = useState(null);
  let [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected Option:', event.target.value);

    if (event.target.value === 'Allow') {
      setFilterData(merchants)
      setFilterData(merchants.filter((merchant) => merchant.status === 'Allow'));
    } else if (event.target.value === 'Pending') {
      setFilterData(merchants)
      setFilterData(merchants.filter((merchant) => merchant.status === 'Pending'));
    } else {
      setFilterData(merchants);
    }
  };

  useEffect(() => {

    axios.get('https://exuberant-fatigues-jay.cyclic.app/SinghTek/merchants', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc1Y2ZmMDAzOWM1NDMzMjhhMmQyZWIiLCJpYXQiOjE2ODYwMzUwNjd9.Qy2kZX2qHXSA5_-H4SVgsKxWqgji1Eyw6CtTjEvR-0Y'
      },
    })
      .then(function (response) {
        console.log(response);
        setmerchants(response.data);
        setFilterData(response.data)
        console.log(filterdata)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const deleteuser = (singhtek_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        console.log(singhtek_id)
        deleteUser(singhtek_id);
      }
    });
  };



  const exportToExcel = async () => {
    const res = axios.get('https://exuberant-fatigues-jay.cyclic.app/SinghTek/allWithdrawals', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc1Y2ZmMDAzOWM1NDMzMjhhMmQyZWIiLCJpYXQiOjE2ODYwMzUwNjd9.Qy2kZX2qHXSA5_-H4SVgsKxWqgji1Eyw6CtTjEvR-0Y'
      },
    })
    const result = await res;
    const data = result.data;

    console.log(data)
    const fieldsToExport = data.map(item => {
      return {
        beneficiary_name: item.beneficiary_name,
        credit_account_no: item.credit_account_no,
        beneficiary_branch_code: item.beneficiary_branch_code,
        amount: item.amount,
        bank_status: item.bank_status,
        remarks_1: item.remarks_1,
        utr_number: item.utr_number
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(fieldsToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'data.xlsx');
  };
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddMerchants />
          </Box>
        </Modal>
      </div>
      <Box component="main" >
        <Paper sx={{ overflow: 'hidden', backgroundColor: "#F3F6F9", p: 2 }}  >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            All Merchants Data
          </Typography>

          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Stack direction={"row"} spacing={3}>
              <TextField sx={{ minWidth: 250 }} label="Search" variant="outlined" onChange={(e) => setSearch(e.target.value)} />
              <FormControl sx={{ minWidth: 250 }}>
                <Select value={selectedOption} onChange={handleOptionChange}>
                  <MenuItem value="">-- Select --</MenuItem>
                  <MenuItem value="Allow">Allow</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction={"row"} spacing={3}>
              <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen} >
                Add Merchant
              </Button>
              <Button variant="contained" onClick={exportToExcel}>Export Withdrawal Reqest</Button>
            </Stack>
          </Stack>
          <Divider sx={{ p: 1 }} />

          <TableContainer sx={{ maxHeight: 440, pt: 2 }} >
            <Table stickyHeader aria-label="sticky table" >
              <TableHead sx={{ backgroundColor: "#F3F6F9" }} >
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Merchant Id
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Merchant Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Mobile No.
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Txn Limit
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Status
                  </TableCell>

                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tdata">
                {
                  filterdata
                    .filter((item) => {
                      return search.toLowerCase() === ''
                        ? item
                        : item.user_name.toLowerCase().includes(search);
                    })
                    .map(item => (
                      <TableRow hover role="checkbox tabindex={-1}">
                        <TableCell key={item.singhtek_id} align="left">
                          {item.singhtek_id}
                        </TableCell>
                        <TableCell key={item.user_name} align="left">
                          {item.user_name}
                        </TableCell>
                        <TableCell key={item.email} align="left">
                          {item.email}
                        </TableCell>
                        <TableCell key={item.mobile} align="left">
                          {item.mobile}
                        </TableCell>
                        <TableCell key={item.transaction_limit} align="left">
                          {item.transaction_limit}
                        </TableCell>
                        <TableCell key={item.status} align="left">
                          {item.status}
                        </TableCell>

                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"

                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteuser(item._id);
                              }}
                            />
                            <RemoveRedEyeIcon />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    )
                    )
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper >
      </Box >
    </>
  )
}

export default MerchantsList