import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});


const tk = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc1Y2ZmMDAzOWM1NDMzMjhhMmQyZWIiLCJpYXQiOjE2ODYwMzUwNjd9.Qy2kZX2qHXSA5_-H4SVgsKxWqgji1Eyw6CtTjEvR-0Y'
export const setHeader = (token) => {
    axiosClient.defaults.headers.common["Content-Type"] = 'application/json';
    if (token) {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axiosClient.defaults.headers.common["Authorization"];
    }
}

export const userAuthentication = async (data) => {
    return await axiosClient.post(`/SinghTek/login`, {
        email: data.email, password: data.password
    });
}

export const getSuccessHistory = async (token) => {
    return await axiosClient.get(`/SinghTek/getWithdrawals/sucess`, setHeader(token));
}

export const getPendingHistory = async (token) => {
    return await axiosClient.get(`/SinghTek/getWithdrawals/pending`, setHeader(token));
}

export const getFailedHistory = async (token) => {
    return await axiosClient.get(`/SinghTek/getWithdrawals/failed`, setHeader(token));
}
export const deleteUser = async (id,token) => {
  
    // console.log(id)
    return await axiosClient.delete(`/SinghTek/delete/merchant/${id}`, setHeader(tk));
}


export const userRegister = async (data) => {
    try {

        const res = await axiosClient.post(`/SinghTek/register`, data
            , {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log(res);
        if (res.data) {
            return res.data;
        }
        return res.message
    } catch (error) {
        console.error(error);
        return "error";
    }
};


  
export const merchantRegister = async (data) => {
    try {

        const res = await axiosClient.post(`/merchant/register`, data
            , {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log(res);
        if (res.data) {
            return res.data;
        }
        return res.message
    } catch (error) {
        console.error(error);
        return "error";
    }
};