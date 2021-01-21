import React from 'react';
import './Products.css';


const Products = (props) => {

    const {name, image_gallery, original_price,vat_percentage,discount_percentage, discounted_amount} = props.data
    const imgUrl = image_gallery[0]?.image_link || "https://s3.ap-south-1.amazonaws.com/cdn-shebadev/images/pos/services/thumbs/default.jpg";
    

    let vat = ((original_price * vat_percentage)/100).toFixed(1)
    let total_original_price = parseFloat((original_price + vat || 0))
    let total = parseFloat(total_original_price)
    console.log(typeof total);

    let discounted= parseFloat((discounted_amount || original_price)+ vat);
   let discounted_price = (discounted.toFixed(1))

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
                            {
                                discount_percentage? 
                                <>
                                 <h4 className="discount-container">৳ {discounted_price}</h4>
                                <h5 className="original-price">৳ {total}</h5>
                                </>
                           
                            :
                           <>
                                <h5 className="original-price-only">৳ {total}</h5>
                                </>
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