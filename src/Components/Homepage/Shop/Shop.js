import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import './Shop.css';

function Shop() {

  // needed states
  const [data, setData] = useState({categories: [], products: []});
  const [show, setShow] = useState([]);
  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState(false);

  

  // for loading data
  useEffect(() =>{  
    fetch("https://api.dev-sheba.xyz/v2/partners/38371/pos/products?is_shop=1")
    .then(data => data.json())
    .then(result => {
      const newD = {products: result.products, categories: result.categories};
      setData(newD)
      setShow(result.products);
      document.querySelector("#select-all").checked = true;
      
    })
  }, [])

  const {discount_percentage} = data.products


  // for filtering products

  useEffect(() =>{
    
    if(selected[0] === 'all' || ''){
      setShow(data.products);
      document.querySelector("#select-all").checked = true;
    }
    else if  (selected[0] === ''){
     
        setShow(data.products);
    }
    else{
      let allShow = [];
      selected.forEach(sel => {
        allShow = [...allShow, ...data.products.filter(pd => pd.category_id === parseInt(sel))]
      })
      setShow(allShow);
    }
  },[selected])

  function handleSearch() {
    const inputs = document.querySelectorAll('input');    
    const newInput = []
    inputs.forEach(i =>{
      i.checked && newInput.push(i.value);
    })
    setSelected(newInput);
  }

function selectAll() {
  const al = document.querySelector("#select-all");
  if(al.checked == true){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(i => i.checked = false);
    al.checked = true;
  } else {
    al.checked = false;
  }
}

function handleReset() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(i =>{
    i.checked = false;
  })
  setSelected(["all"]);
}

function handleSort(e) {
  const newShow = [...show];
  if(e.target.id === "pLowToHigh"){
    newShow.sort((a, b) => a.original_price - b.original_price);
  }
  else if(e.target.id === "pHighToLow"){
    newShow.sort((a, b) => b.original_price - a.original_price);
  }
  else if(e.target.id === "dLowToHigh"){
    newShow.sort((a, b) => a.discounted_amount - b.discounted_amount);
  }
  else if(e.target.id === "dHighToLow"){
    newShow.sort((a, b) => b.discounted_amount - a.discounted_amount);
  }
  setShow(newShow);
}

// calculating total quantity using reduce function
let totalQuantity= data.categories.reduce((total, category)=> total + category.total_products, 0);

  return (
    
    <div className='container'>
      <div className="row products-sort-row">
        <p className="all-products-title">All Products</p>
        <div className="sortBtn-container">
      <button onClick={() => setToggle(!toggle)} className="sortBtn">Sort By <i class="arrow down"></i></button>
      </div>
     
      <ul style={{visibility: toggle ? "visible" : "hidden"}} className="sortOption dropdown-list dropdown-style">
        <li><input  onClick={(e) => handleSort(e)} name="sort" id="pLowToHigh" type="radio"/>
        <label htmlFor="pLowToHigh" className="custom-radioBtn">Price - Low to High</label></li>
        <li> <input onClick={(e) => handleSort(e)} name="sort" id="pHighToLow" type="radio"/>
        <label htmlFor="pHighToLow">Price - High to Low</label></li>
        <li><input onClick={(e) => handleSort(e)} name="sort" id="dLowToHigh" type="radio"/>
        <label htmlFor="dLowToHigh">Discount - Low to High</label></li>
        <li><input onClick={(e) => handleSort(e)} name="sort" id="dHighToLow" type="radio"/>
        <label htmlFor="dHighToLow">Discount - High to Low</label>  </li>      
      </ul>
      </div>
     <div className="row">
         <div className="col-lg-3 col-md-3 col-sm-12">
         <div className="filter-container">
        
             <div className="d-flex justify-content-between filtering-reset-option">
                 <p className="filtering-title">Filtering</p>
                 <button onClick={handleReset} className="reset-btn">Reset</button>

             </div>
        <div className="group d-flex">            
            <input  onClick={selectAll} type="checkbox"  value="all" name="all" id="select-all"/>
            <label className="checkmark"  htmlFor="select-all">
            </label>
            <p className='category-list'>All Categories</p><p className='product-quantity-only '>{totalQuantity}</p>
        </div>
        {
          data.categories.map(cate => 
          <div key={cate.id} className="group d-flex">            
              <input type="checkbox" value={cate.id} id={cate.id}  onClick={() => document.querySelector("#select-all").checked = false}/>
              <label className='checkmark category-name' htmlFor={cate.id} ></label>
              <p className='category-list'>{cate.name}</p> <p className='product-quantity'>{cate.total_products}</p>
          </div>)
        }
     
      <div>
      <button onClick={handleSearch} className='search-btn'>Search Now</button>
      </div>
         </div>
         </div>
         <div className="col-md-9 col-sm-12">
            <div className="row">
                
                {
                    show.map(data => <Products key={data.id} data={data}></Products>)
                }
                
      </div>
      </div>
     </div>
     
    </div>
  )
  
}

export default Shop;
