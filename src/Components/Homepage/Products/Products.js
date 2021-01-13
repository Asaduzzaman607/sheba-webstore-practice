import React from 'react';
import { Card } from 'react-bootstrap';
import './Products.css';

const Products = (props) => {

    const {name, image_gallery, original_price, discounted_amount} = props.data
    const imgUrl = image_gallery[0]?.image_link || "https://s3.ap-south-1.amazonaws.com/cdn-shebadev/images/pos/services/thumbs/default.jpg";
    console.log(imgUrl)
    return (
        <div className="col-md-4 col-sm-6">
            {/* <div className="card-container">
                <img className='card-img' src={imgUrl} alt=""/>
                <h4 className='product-title'>{name}</h4>
                <div className="d-flex price-add-container">
                    <div>
                    <h4 id="price">{original_price}</h4>
                    <h4 className=' discount-container'>{original_price-discounted_amount}</h4>
                    </div>
                    <button className="addBtn">Add</button>
                </div>
            </div> */}
            <div class="product-card">
  <img className="card-img" src={imgUrl} alt="Card image cap"/>
  <div className="card-body">
      <div className="product-title">
      <h5 className="product-title">{name.slice(0,63)}</h5>
      </div>
    
    <div className="d-flex price-add-container justify-content-between">
                    <div className='price-disc-container'>
                    <h4>৳ {original_price}</h4>
                    {/* <h4 className=' discount-container'>৳ {original_price-discounted_amount}</h4> */}
                    </div>
                    <button className="addBtn">+ Add -</button>
                </div>
  </div>
</div>

            
        </div>
    );
};

export default Products;