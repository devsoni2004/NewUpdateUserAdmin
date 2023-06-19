import React from 'react'
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { merchantRegister } from '../../api/api';
import { useState } from 'react';
const AddMerchants = ({ closeEvent }) => {

    const [user_name, setuser_name] = useState("");
    const [business_name, setbusiness_name] = useState("");
    const [business_type, setbusiness_type] = useState("");
    const [email, setemail] = useState("");
    const [business_category, setbusiness_category] = useState("");
    const [business_sub_category, setbusiness_sub_category] = useState("");
    const [company_expenditure, setcompany_expenditure] = useState("");
    const [website, setwebsite] = useState("");
    const [bank_name, setbank_name] = useState("");
    const [bank_account_number, setbank_account_number] = useState("");
    const [bank_ifsc_code, setbank_ifsc_code] = useState("");
    const [gst, setgst] = useState("");
    const [pan_number, setpan_number] = useState("");
    const [aadhar_number, setaadhar_number] = useState("");
    const [address, setaddress] = useState("");
    const [pincode, setpincode] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [country, setcountry] = useState("");
    const [company_pan_card, setcompany_pan_card] = useState("");
    const [bank_statement, setbank_statement] = useState("");
    const [company_gst, setcompany_gst] = useState("");
    const handleChange = (e) => {
        switch (e.target.name) {
            case "user_name":
                setuser_name(e.target.value);
                break;
            case "business_name":
                setbusiness_name(e.target.value);
                break;
            case "business_type":
                setbusiness_type(e.target.value);
                break;
            case "email":
                setemail(e.target.value);
                break;
            case "business_category":
                setbusiness_category(e.target.value);
                break;
            case "business_sub_category":
                setbusiness_sub_category(e.target.value);
                break;
            case "company_expenditure":
                setcompany_expenditure
                    (e.target.value);
                break;
            case "website":
                setwebsite(e.target.value);
                break;
            case "bank_name":
                setbank_name(e.target.value);
                break;
            case "bank_account_number":
                setbank_account_number(e.target.value);
                break;
            case "bank_ifsc_code":
                setbank_ifsc_code(e.target.value);
                break;
            case "gst":
                setgst(e.target.value);
                break;
            case "pan_number":
                setpan_number(e.target.value);
                break;
            case "aadhar_number":
                setaadhar_number(e.target.value);
                break;
            case "address":
                setaddress(e.target.value);
                break;
            case "pincode":
                setpincode(e.target.value);
                break;
            case "city":
                setcity(e.target.value);
                break;
            case "state":
                setstate(e.target.value);
                break;
            case "country":
                setcountry(e.target.value);
                break;
            case "company_pan_card":
                setcompany_pan_card(e.target.value);
                break;
            case "bank_statement":
                setbank_statement(e.target.value);
                break;
            case "company_gst":
                setcompany_gst(e.target.value);
                break;
            default: ;

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(user_name, business_name, website)
        const userData = {
            user_name,
            business_name,
            business_type,
            email,
            business_category,
            business_sub_category,
            company_expenditure,
            website,
            bank_ifsc_code,
            state,
            bank_name,
            bank_account_number,
            pincode,
            gst,
            pan_number,
            aadhar_number,
            address,
            city,
            country,
            company_pan_card,
            bank_statement,
            company_gst
        }
        console.log(userData)
        const result = await merchantRegister(userData);
        console.log(result)
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Add Merchant Details
            </Typography>
            <IconButton
                style={{ position: "absolute", top: "0", right: "0" }}
                onclick={closeEvent}
            >
                <CloseIcon />
            </IconButton>
            <Grid container spacing={2} sx={{ mt: 1 }}>

                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Merchant Name" variant="outlined" sx={{ minWidth: "100%" }} name="user_name" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ minWidth: "100%" }} name="email" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Business Name" variant="outlined" sx={{ minWidth: "100%" }} name="business_name" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Business Type" variant="outlined" sx={{ minWidth: "100%" }} name="business_type" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Business Category" variant="outlined" sx={{ minWidth: "100%" }} name="business_category" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Business Sub-Category" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Business Sub-Category" name="business_sub_category" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Company Expenditure" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Company Expenditure" name="company_expenditure" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Website" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Web URL" name="website" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Bank Name" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Bank Name" name="bank_name" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Bank Account Number" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Bank Account Number" name="bank_account_number" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Ifsc Code" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Ifsc Code" name="bank_ifsc_code" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="GST" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter IGST" name="gst" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="PAN Number:" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter PAN Number:" name="pan_number" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Aadhar Number:" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Aadhar Number:" name="aadhar_number" onChange={handleChange} />
                </Grid>
                <Typography variant="h4" sx={{ minWidth: "100%", mt: 2, ml: 2, borderBottom: 1 }}>
                    Busness Address
                </Typography>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Address" name="address" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="Pin Code" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Pin Code" name="pincode" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="City" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter City" name="city" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField id="outlined-basic" label="State" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter State" name="state" onChange={handleChange} />
                </Grid>
                <Grid item md={12}>
                    <TextField id="outlined-basic" label="State" variant="outlined" sx={{ minWidth: "100%" }} placeholder="Enter Country" name="country" onChange={handleChange} />
                </Grid>
                <Typography variant="h4" sx={{ minWidth: "100%", mt: 2, ml: 2, borderBottom: 1 }}>
                    Upload Your Docs
                </Typography>
                <Grid item md={6}>
                    <InputLabel id="demo-simple-select-label">Upload Your Pan Card</InputLabel>
                    <TextField
                        name="company_pan_card"
                        type="file"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={6}>
                    <InputLabel id="demo-simple-select-label">Upload Your Gst</InputLabel>
                    <TextField
                        name="company_gst"
                        type="file"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={6}>
                    <InputLabel id="demo-simple-select-label">Upload Bank Statement</InputLabel>
                    <TextField
                        name="bank_statement"
                        type="file"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={12} align="center">
                    <Button
                        variant="contained"
                        sx={{ width: "20%", height: 40, mt: 3 }}
                        type="Submit">
                        Submit</Button>
                </Grid>

            </Grid>

        </>
    )
}

export default AddMerchants
