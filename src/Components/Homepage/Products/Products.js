import React from 'react';
import './Products.css';


const Products = (props) => {

    const {name, image_gallery, original_price, discount_percentage} = props.data
    const imgUrl = image_gallery[0]?.image_link || "https://s3.ap-south-1.amazonaws.com/cdn-shebadev/images/pos/services/thumbs/default.jpg";
    return (
        <div className="col-md-4 col-sm-6">
            <div className="product-card p-0">
                <img className="product-img" src={imgUrl} alt="Card image cap"/>
                {
                    discount_percentage>0 && <span className="discount-percent">{discount_percentage}% off</span>

                }
                <div className="product-body p-0">
                    <div className="product-title">
                        <h5 className="product-title ">{name}</h5>
                    </div>
        
                    <div className="d-flex price-add-container justify-content-between">
                        <div className='price-disc-container'>
                            <h4 className="discount-container">৳ {original_price}</h4>
                            {
                                <h5 className="original-price">৳ {original_price}</h5>
                            }
                        </div>
                        {
                            true ?
                            <div>
                                <button className="addBtn">+ Add</button>
                            </div>
                            :
                            <div className="otherBtn">
                                <button className="otherBtn">+</button>
                                <input type="text"/>
                                <button className="otherBtn">-</button>
                            </div>
                        }
                    </div>
                </div>
            </div>            
        </div>
    );
};

export default Products;