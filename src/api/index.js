import { STRIPE_TWILIO_ENDPOINT } from '../constants/config'
import axios from "axios";


import StatusCodes from 'http-status-codes'

export async function verifyUserCodeAPI (payload) {
    try {
        const response = await axios({
            method: "POST",
            url: `${STRIPE_TWILIO_ENDPOINT}/verify`,
            data: payload,
        })
        return response;

    } catch (error) {
        return error.message;
    }
    // return new Promise((resolver,reject) => {
    //     let a =1+1
    //     if(a === 3){
    //        resolver({ status : StatusCodes.OK, data : { valid : true } })
    //    }
    //    else{
    //        reject({ status : StatusCodes.BAD_REQUEST, data : { message : "bad req" }})
    //    }
   //})
};


export async function checkoutAPI (payload) {
    try {
        const response = await axios({
            method: "POST",
            url: `${STRIPE_TWILIO_ENDPOINT}/payment`,
            data: payload,
        })
        if (response.status === StatusCodes.OK) {
            return response;
        }

    } catch (error) {
        return error.message;
    }
};

export async function sendCodeAPI (payload) {
   try {
        const response = await axios({
            method: "POST",
            url: `${STRIPE_TWILIO_ENDPOINT}/login`,
            data: payload,
        })
        if (response.status === StatusCodes.OK) {
           return response;
       }

    } catch (error) {
        return error.message;
    }
//     return new Promise((resolver,reject) => {
//         if(true){
//            resolver({ status : StatusCodes.OK, data : { message : "pending" } })
//        }
//    })
};









