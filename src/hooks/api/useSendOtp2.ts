import axios from "axios"
import { ADDRESSES } from "../../config/api_list"
import { SendOtpCredentials, SendOtpResponse } from "../../models/api_types"

export default function useSendOtp2() {
    const getOtp = async (otpCreds: SendOtpCredentials) => {
        return new Promise<PromiseLike<SendOtpResponse>>((resolve, reject) => {
            axios              
                .get(`${ADDRESSES.SEND_OTP2}/${otpCreds.phone}`, 
                   )
                .then(res => {
                    console.log("OTP Response:", res.data);
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
        // return 1234
    }
    return { getOtp }
}
