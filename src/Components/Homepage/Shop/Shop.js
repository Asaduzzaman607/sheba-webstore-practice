import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import './Shop.css';

function Shop() {
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


  // for filtering products

  useEffect(() =>{
    
    if(selected[0] === 'all'){
      setShow(data.products);
      document.querySelector("#select-all").checked = true;
    }else{
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
    console.log(newInput);
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
    newShow.sort((a, b) => a.original_price - b.original_price);
  }
  else if(e.target.id === "dHighToLow"){
    newShow.sort((a, b) => b.original_price - a.original_price);
  }
  setShow(newShow);
}


let totalQuantity= data.categories.reduce((total, category)=> total + category.total_products, 0);
  console.log(totalQuantity);

  return (
    <div className='container'>
      <button onClick={() => setToggle(!toggle)} className="SortBtn">Sort</button>
      <div style={{visibility: toggle ? "visible" : "hidden"}} className="SortOption">

        <input  onClick={(e) => handleSort(e)} name="sort" id="pLowToHigh" type="radio"/>
        <label htmlFor="pLowToHigh">Price - Low to High</label>
        <input onClick={(e) => handleSort(e)} name="sort" id="pHighToLow" type="radio"/>
        <label htmlFor="pHighToLow">Price - High to Low</label>

        <input onClick={(e) => handleSort(e)} name="sort" id="dLowToHigh" type="radio"/>
        <label htmlFor="dLowToHigh">Discount - Low to High</label>

        <input onClick={(e) => handleSort(e)} name="sort" id="dHighToLow" type="radio"/>
        <label htmlFor="dHighToLow">Discount - High to Low</label>        
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
            <p className='category-list'>All </p><p className='product-quantity-only '>{totalQuantity}</p>
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
      <button onClick={handleSearch} className='search-btn'>Search</button>
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
  );
}

export default Shop;
