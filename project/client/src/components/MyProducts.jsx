import React, { useEffect, useState, useCallback }  from 'react';
import axios from 'axios';
import Product from "./product/Product";
import {authHeader} from '../actions/helpers'
import AddProduct from './product/AddProduct';



const fetchHandler = async(id) => {
  try {
    // posalji upit apiu da provjeri tokene
    let res = await axios.get(`http://localhost:5000/api/products`, authHeader()); // axios.get vrati status 403 => return false 200 -> return true;
    //console.log(res.data);
    return res.data.products;
  }
  catch(error){
    return [];
  }
}

const MyProducts = () => {
    const [products, setProducts] = useState(null);
    const [productDeleted, setProductDeleted] = useState(false);
    const [showed, setShowed] = useState(false);
    useEffect(() => {
      fetchHandler().then((res) => {setProductDeleted(false); setProducts(res);});
        
    }, [productDeleted]);

    const closeDialog = useCallback((e) => {
      if(!showed){
        setShowed(true);
      }
      else {
        setShowed(false);
      }
    }, [showed])

    return (
      <>

        <div className="add-product">
          <div class="add" onClick={() => {if(!showed){setShowed(true);}else {setShowed(false);}}}>+ Add product</div>
        </div>
        <div className="products myproducts">
          {
            products && products.map((product, index)=>
            (
                  <Product key={index} product={product} productStatus={setProductDeleted} admin={true} />
            ))
          }
        </div>
        <AddProduct showed={showed} closeDialog={closeDialog} />
      </>
    )
}

export default MyProducts;

