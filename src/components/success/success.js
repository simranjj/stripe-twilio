import React from 'react'
import { Link } from 'react-router-dom'

export default function success() {
    return (
        <div className="container-fluid main p-0" >
            <div className="head">

            </div>
            <div className="body d-flex justify-content-center align-items-center transition-fade">
                <div className="w-50 text-center">
                    <div className="pb-4 mb-4 ">
                        <h1 className="display-4 text-white">Thank you for the business!</h1>
                    </div>
                    <div className="">
                        <Link to="/"><button type="button" className="btn btn-primary" >Another Payment</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
