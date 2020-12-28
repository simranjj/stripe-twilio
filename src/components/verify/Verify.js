
import ReactCodeInput from 'react-verification-code-input';
import React, { useState, useEffect } from 'react'
import "./style.css";
import { verifyUserCodeAPI } from '../../api/index'
import StatusCodes from 'http-status-codes'
import { Redirect } from 'react-router-dom'
import { sendCodeAPI } from '../../api/index'

export default ({ history, location }) => {

    const [code, setCode] = useState('');
    const [error, setError] = useState('')
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(location.state.phoneNumber);


    useEffect(() => {
        if (code.length === 6) {
            let payload = {
                number: phoneNumber,
                code
            }
            verifyUserCodeAPI(payload).then(response => {
                console.log(response)
                if (response.status === StatusCodes.BAD_REQUEST) {
                    setError("Something went wrong. Re-send Code ? ")
                } else if (response.status === StatusCodes.OK && response.data.valid) {
                    history.push({ pathname: "/checkout" })
                } else if (response.status === StatusCodes.OK && !response.data.valid) {
                    setError('Invalid Code')
                }
            })
        }

    }, [code])

    const sendCode = () => {

        sendCodeAPI({ number: phoneNumber }).then(response => {
            if (response.status === StatusCodes.OK) {
                response.data.message === 'pending' ? setIsCodeSent(true) : setIsCodeSent(false)
                setError('')
            }
        })
    }

    return (
        <div className="container-fluid main p-0" >
            <div className="head">

            </div>
            <div className="body d-flex justify-content-center align-items-center">
                <div className="w-50 text-center">
                    <div className="pb-4 mb-4 ">
                        <h1 className="display-3 ">Verify code</h1>
                        <p className="lead ">We have sent you a verification code via SMS. Please enter it here to checkout.</p>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col"> <ReactCodeInput fields={6} className='fields' onChange={setCode} /></div>
                        <div className="col"></div>
                    </div>

                    {error.length > 0 ?
                        <>
                            <div className="text-center position pt-4">
                                <label className="text-danger  lead" >{error}</label>
                            </div>
                            <div className="text-center mt-4 ">
                                <button className="btn btn-success mt-3 " onClick={sendCode}>Re-Send Code</button>
                            </div>
                        </>
                        :
                        <>
                        <div className="text-center pt-4">
                                <label className="dark" >Adjustment</label>
                            </div>
                            <div className=" mt-4 ">
                            <label className="dark" >Adjustment</label>
                            </div>
                            </>
                        }
                </div>
                <div></div>
            </div>
        </div>
    )
}
