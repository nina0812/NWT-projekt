import React, {useState, useEffect}  from "react";
import axios from 'axios';
import Product from "./components/product/Product";
const listProducts = async() => {
    try {
      // posalji upit apiu da provjeri tokene
      const fetch = await axios.get(`http://localhost:5000/api/list`);
      return fetch.data.products;
    }
    catch(error){
      return [];
    }
}

const sortProducts = (products) => {
    let sortArray = {};
    for(const product of products) {
        // ukoliko ovaj objekt ne postoji
        if(typeof sortArray[product.brand] == 'undefined')
        {
            // inicijaliziraj ga kao array
            sortArray[product.brand] = [product];
        }
        else {
            // ukoliko vec postoji pushaj u array
            sortArray[product.brand].push(product);
        }
    }
    return sortArray;
} 

const getBrands = (products) => {
    return Object.keys(products);
}

const Home=()=>{
    const [loaded, setLoaded] = useState(null)
    const [products, setProducts] = useState([]);
    const [allproducts, setAll] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        listProducts().then(e => { 
            setLoaded(true); 
            setAll(e);
            let products = sortProducts(e);
            setProducts(products);
            setBrands(getBrands(products));
            setSelected(0);
    });
    }, [loaded]);
    
    if(loaded == null) return;
   
    return(
        
    <React.Fragment>
    <div className="wallpaper">
        <div className="img-holder">
            <picture>
                <img src="./images/header.jpg" />
            </picture>
        </div>
        <div className="wallpaper__content">
            <div className="title-holder">
                <h1>Women's Fine Jewelry</h1>
                <h3>Discover the new CHARM jewelry collection.</h3>
            </div>
        </div>
    </div>
    <section className="container maxw">
        
        <div className="product-brands">
            <div className="brands--title"><h2>Our products</h2></div>    
            <div className="listed--brands">
            <div className={(selected === 0) ? 'brand active' : 'brand'} value="0" onClick={() => {setSelected(0); }}>All</div>
            {loaded && brands.map((value) => {
                        return <div className={(selected === value) ? 'brand active' : 'brand'} value={value} onClick={() => {setSelected(value); }}>{value}</div>
            })}
            </div>
        </div>      
                
        <div className="products">
            {
                selected === 0 && allproducts.map((product, index) => {
                    return (
                        <Product key={index} product={product} />
                );
                })
            }
            {
                selected !== 0 && products[selected].map((product, index) => {
                    return (
                        <Product key={index} product={product} />
                );
                })
            }
        </div>
    </section>
    
    </React.Fragment>
    )
}

export default Home;