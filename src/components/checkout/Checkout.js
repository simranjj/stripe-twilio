import StripeCheckout from 'react-stripe-checkout';
import { checkoutAPI } from '../../api/index'
import React, { useState } from 'react'

export default ({ history }) => {

    const [product, setProduct] = useState({
        name: 'Phone Bill Payment',
        price: 10.89,
        productBy: 'Simran'
    })

    const makePayment = (token) => {
        const payload = { token, product }
        checkoutAPI(payload).then(response => {
            if (response)
                history.push({ pathname: "/success" })
        });

    }

    return (
        <div>
            <div className="container-fluid main p-0" >
                <div className="head">

                </div>
                <div className="body d-flex justify-content-center align-items-center transition-fade">
                    <div className="w-50 text-center">
                        <div className="pb-4 mb-4 ">
                            <h1 className="display-3 ">Payment Details</h1>
                        </div>
                        <div className="row">
                            <div className="col">
                                <img src="/assests/bill.jpg" class="img-fluid w-100 h-100" alt="" />
                            </div>
                            <div className="col">
                                <p className="lead text-left">Monthly Bill Payment</p>
                                <p className="lead text-left">Charges : $ 10</p>
                                <p className="lead text-left">Taxes: $ 0.89</p>
                                <p className="lead text-left">Total: $ 10.89</p>

                            </div>
                        </div>
                        <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Bill Payment" amount={product.amount * 100} >
                            <button type="button" className="btn btn-md btn-success">Checkout</button>
                        </StripeCheckout>
                    </div>
                </div>
            </div>
        </div>
    )
}
