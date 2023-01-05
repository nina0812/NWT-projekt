import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {authHeader} from '../../actions/helpers'

const AddProduct = (props) => {
  const navigate=useNavigate();
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    description:'',
    price:'',
    selectedFile:{}
  });
  const {name, brand, description, price}=product;
  const changeData=(event)=>{
      let name=event.target.name;
      let value=event.target.value;
      setProduct({...product, [name]:(name !== 'selectedFile') ? value : event.target.files});
  }
  const onSubmit=async(event)=>
  {
    event.preventDefault();
    try{
      // form data beacuse of file upload
      let formData = new FormData();
      formData.append('file', product.selectedFile[0]);
      formData.set('name', product.name);
      formData.set('brand', product.brand);
      formData.set('description', product.description);
      formData.set('price', product.price);

      await axios.post('http://localhost:5000/api/products',formData, authHeader());

      window.alert("Product added successfully.")
      window.location.reload(false);
    }
    catch(error){
      window.alert("You have entered wrong parameters.")
    }
  }

  
  return (
    props.showed === true && <div className="wrapper-product">
            <div className="form">
            <h3>ADD PRODUCT</h3>
            <input type='text' 
                    // Komentar
                    placeholder='Name'  // ovaj input je za polje u formi Full Name
                    name='name'
                    onChange={changeData} 
                    value={name}
                    />

                    <input type='text' 
                    placeholder= 'Brand'
                    name='brand'
                    onChange={changeData} 
                    value={brand}
                    />

                    <input type='text' 
                    placeholder= 'Description'
                    name='description'
                    onChange={changeData} 
                    value={description}
                    />

                    <input type='text' 
                    placeholder= 'Price'
                    name='price'
                    onChange={changeData} 
                    value={price}
                    />

                    <input type='file' accept="image/*" 
                    placeholder= 'Image'
                    name='selectedFile'
                    onInput={changeData} 
                    />
             <button onClick={onSubmit}>Add product</button>
             <div className="x" onClick={props.closeDialog}>X</div>
        </div>
        
        </div>
  );
}

export default AddProduct;
