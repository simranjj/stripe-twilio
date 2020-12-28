import React, { useState, useEffect } from "react";
import "./style.css";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { sendCodeAPI } from '../../api/index'
import StatusCodes from 'http-status-codes'


export default ({ history }) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError(phoneNumber
      ? (isValidPhoneNumber(phoneNumber) ? '' : 'Invalid phone number') : 'Phone number required')
  }, [phoneNumber])

  const sendCode = (event) => {
    event.preventDefault();
    if (error === '') {
      sendCodeAPI({ number: phoneNumber }).then(response => {
        if (response.status === StatusCodes.OK)
          if (response.data.message === 'pending')
            history.push({
              pathname: "/verify",
              state: {
                phoneNumber
              }
            })
      })
    }
  }


  return (
    <div className="container-fluid main p-0"   >
      <div className="head">

      </div>
      <div  className="body d-flex justify-content-center align-items-center transition-fade" 
     >
        <div className="w-50 text-center">
          <div  className="pb-4 mb-4 ">
            <h1 className="display-3 ">Bill Pay</h1>
          </div>
          <form className="pb-2  mb-4 " onSubmit={sendCode}>
           <div className="row">
             <div className="col"></div>
             <div className="col-8"><PhoneInput
                defaultCountry="CA"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
              /></div>
             <div className="col"></div>
           </div>
            <div className="pb-2 ">
              <button type="submit" className="btn " >Login</button>
            </div>
          </form>


          <div className="">
            {
              error.length > 0 ? <label className="text-danger ">{error}</label>
                : <label className="error ">Adjustment</label>
            }

          </div>
        </div>
      </div>

    </div>
  );
};
