import React from 'react';
import {Button} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authHeader } from '../../actions/helpers';

// 
const deleteProduct = async(id) => {
    try {
      // posalji upit apiu da provjeri tokene
      await axios.delete(`http://localhost:5000/api/products/${id}`, authHeader()); // axios.get vrati status 403 => return false 200 -> return true;
      return true;
    }
    catch(error){
      return false;
    }
}

//we will receive props
const Product = (props) => {
    const navigate=useNavigate();
    const {_id,name, brand, description, price, selectedFile}=props.product;
    const deleteHandler=()=>{
        deleteProduct(_id).then(()=> {navigate('/myproducts'); props.productStatus(true); });
    }
    return (
      <div className="product">
        <div className="product-image">
            <img src={'http://localhost:5000' + selectedFile} />
        </div>
        <div className="brand">{brand}</div>
        <div className="name">{name}</div>
        <div className="desc">{description}</div>
        <div className="price">{price} KN</div>
        {
          props.admin === true && <button onClick={deleteHandler}>Delete</button>
        }
      </div>
  );
}

export default Product;
