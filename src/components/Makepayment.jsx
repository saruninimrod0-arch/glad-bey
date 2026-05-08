import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Footer from './Footer';

const Makepayment = () => {

    // destructure the details passed from the Getproducts component
    // The useLoacation hook allows us to get/destructure the properties passed from the previous component.
    const { product, cartItems, totalCost, totalItems } = useLocation().state || {}

    // declare the navigate hook
    const navigate = useNavigate()

    // console.log("The details passed from getproducts are: ",product)
    // below we specify the image base url
    const img_url = "https://saruninimrod.alwaysdata.net/static/images/"

    // initialize hooks to manage the state of your application
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // create a function that will handle the submit action
    const handlesubmit = async (e) => {
        // prevent the site from reloading
        e.preventDefault()

        // update the loading hook
        setLoading(true)

        try {
            // create a form data object
            const formdata = new FormData()

            // append the data to the form data
            formdata.append("phone", number)

            // Use totalCost for cart or product_cost for single item
            const amount = totalCost || (product && product.product_cost)
            formdata.append("amount", amount)

            const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata)

            // set loading back to default
            setLoading(false)

            // update the success hook with the message
            setSuccess(response.data.message)
        }
        catch (error) {
            // if there is an error respond to error
            setLoading(false)

            // update the error hook with the error message
            setError(error.message)
        }
    }


    return (
        <div className='row justify-content-center'>
            {/* <button className='btn btn-outline-primary'> Back to Product </button> */}

            <h1 className="text-success">Make Payment - Lipa na M-Pesa</h1>

            <div className="col-md-1">
                <input type="button"
                    className="btn btn-primary"
                    value="<- Back"
                    onClick={() => navigate("/")} />
            </div>

            <div className="col-md-6 card shadow p-4">

                {/* Display for single product */}
                {product && !cartItems && (
                    <>
                        <img src={img_url + product.product_photo} alt="Product name" className='product_img' />
                        <div className="card-body ">
                            <h2 className="text-info"> {product.product_name} </h2>
                            <p className="text-dark"> {product.product_description} </p>
                            <h3 className="text-warning">Kes {product.product_cost} </h3> <br />
                        </div>
                    </>
                )}

                {/* Display for cart items */}
                {cartItems && cartItems.length > 0 && (
                    <div className="card-body">
                        <h2 className="text-info">Cart Checkout</h2>
                        <div className="mb-3">
                            {cartItems.map((item, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                                    <div>
                                        <small className="text-muted">{item.product_name}</small>
                                        <span className="badge bg-secondary ms-2">{item.quantity || 1}</span>
                                    </div>
                                    <span className="text-success fw-bold">KES {item.product_cost * (item.quantity || 1)}</span>
                                </div>
                            ))}
                        </div>
                        <h3 className="text-warning">Total: Kes {totalCost} </h3>
                        <small className="text-muted">Items: {totalItems}</small><br />
                    </div>
                )}

                <form onSubmit={handlesubmit}>

                    {/* bind the loading hook */}
                    {loading && <Loader />}

                    <h3 className="text-success"> {success} </h3>
                    <h4 className="text-danger"> {error} </h4>


                    <input type="number"
                        className='form-control'
                        placeholder='Enter the Phone number 254XXXXXXX'
                        required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} /> <br />

                    {/* {number} */}

                    <input type="submit"
                        value="Make Payment"
                        className='btn btn-success' />
                </form>
            </div>
        </div>
    )
}

export default Makepayment;