import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";



function KidsItemPage({id,model,type,description,cprice,sprice,discount,image,brand}) {
    const [liked, setLiked] = useState(false); // Initial state is false, meaning it's not liked

    const toggleLike = () => {
        setLiked(!liked); // Toggle between liked and unliked state
    };
  return (
    <div> <div className="product-item" >
    <div className="product-image">
    <img src={image} alt={model}/>
    </div>
    <div className="span-element">
    <div className="product-desc">
        <h2>{brand},{type}</h2>
        <p className="first">{model}</p>
        <p className="second">{description}</p>
        <span> <span> ₹ {sprice} <span className="product-strikeout">₹{cprice}</span></span><span className="discount">{discount}%off</span>
        </span>
           </div>
    <div className="product-stars">
    <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular}  onClick={toggleLike} />

        </div>
        </div>
    
 </div>
    </div>
  )
}

export default KidsItemPage