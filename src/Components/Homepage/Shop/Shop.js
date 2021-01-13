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
    fetch("https://api.dev-sheba.xyz/v2/partners/37732/pos/products?is_shop=1")
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
        allShow = [...allShow, ...data.products.filter(pd => pd.category_id == sel)]
      })
      setShow(allShow);
    }
  },[selected])

  function handleSearch() {
    const inputs = document.querySelectorAll('input');    
    const ni = []
    inputs.forEach(i =>{
      i.checked && ni.push(i.value);
    })
    setSelected(ni);  
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

function handleShort(e) {
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

  return (
    <div className='container'>
      <button onClick={() => setToggle(!toggle)} className="shortBtn">Short</button>
      <div style={{visibility: toggle ? "visible" : "hidden"}} className="shortOption">
        
        <input onClick={(e) => handleShort(e)} name="short" id="pLowToHigh" type="radio"/>
        <label htmlFor="pLowToHigh">Price - Low to High</label>

        <input onClick={(e) => handleShort(e)} name="short" id="pHighToLow" type="radio"/>
        <label htmlFor="pHighToLow">Price - High to Low</label>

        <input onClick={(e) => handleShort(e)} name="short" id="dLowToHigh" type="radio"/>
        <label htmlFor="dLowToHigh">Discount - Low to High</label>

        <input onClick={(e) => handleShort(e)} name="short" id="dHighToLow" type="radio"/>
        <label htmlFor="dHighToLow">Discount - High to Low</label>        
      </div>
     <div className="row">
         <div className="col-md-3">
         <div className="filter-container">
         <ul style={{listStyle: "none"}} >
             <div className="d-flex justify-content-between filtering-reset-option">
                 <h3>Filtering</h3>
                 <button onClick={handleReset} className="reset-btn">Reset</button>

             </div>
        <li >            
            <label>
            <input onClick={selectAll} type="checkbox" className='checkmarks' name="all" id="select-all"/>
              All
            </label>
        </li>
        {
          data.categories.map(cate => 
          <li key={cate.id}>            
              <input className='checkmarks' type="checkbox" value={cate.id} id={cate.id}/>
              <label className='category-name' htmlFor={cate.id} onClick={() => document.querySelector("#select-all").checked = false}>
              {cate.name}
              </label>
          </li>)
        }
      </ul>
      <div>
      <button onClick={handleSearch} className='search-btn'>Search</button>
      </div>
         </div>
         </div>
         <div className="col-md-8 mr-3">
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
