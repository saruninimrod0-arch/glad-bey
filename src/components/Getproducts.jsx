import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { Carousel } from 'bootstrap';
import Mycarousel from './Mycarousel';

const Getproducts = () => {

    // Initialize hooks to help you manage the state of your application
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // declare the navigate hhok
    const navigate = useNavigate()

    // below we specify the image url
    const img_url = "https://saruninimrod.alwaysdata.net/static/images/"

    // create a function to help fetch the products from your API
    const fetchProducts = async() =>{
      try{
        //4. update the loading hook
        setLoading(true)

        //5.   Interact with your endpoint for fetching the products
        const response = await axios.get("https://saruninimrod.alwaysdata.net/api/get_products")

        //6. update the products hooks with the response given from API
        setProducts(response.data)

        //7. set the loading hook back to default
        setLoading(false) 

        // update the error hook with a message
        setError(error.message)

        // Update 

      }
      catch(error){

      }
    }

       // we shall us the useEffect hook. This hook enables use to automatically re-render new features incase of any changes.
       useEffect(() => {
        fetchProducts()
       }, [])

       //console.log(products)

       
  return (
  
    
    <div className='row'>
    <h1 className="text-primary">Available Products</h1>
    <Mycarousel/>
      {
        loading && <Loader/>}
        <h4 className="text-danger"> {error} </h4>
       {/* map the products fetched frpm the API to ensure user interface */}

       {products.map((product) => (
         <div className='col-md-3 justify-content-centre mb-3'>
         <div className="card shadow"> <img 
         src={img_url + product.product_photo}
          alt="product name"
          className='product_img mt-3'/>
         <div className='card-body'>
          <h5 className="text-primary">{product.product_name}</h5>
          <p className="text-dark">{product.product_description.slice(0, 100)}...</p>

          <h4 className="text-warning">kes {product.product_cost}</h4>
        
          <button className="btn btn-outline-info" onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button> 
         </div>
         </div>
       
        </div>
        
       )  )}
    </div>
  )
}

export default Getproducts;
