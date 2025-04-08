import React, { useState,useEffect } from 'react'
import { kidsData} from '../data/kids';

import './MensPage.css';

import { useParams } from 'react-router-dom';
import KidsItemPage from './KidsItemPage';
function KidsPages() {
      const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    type: false,
    brand: false,
    model: false,
    rating: false,
    discount: false,
    sort:false,
  });
const { itemName } =useParams()
useEffect(()=>{

},[itemName])
  const handleMultiSelect = (value, setState, state) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };
  
  const [DropdownOpen, setDropdownOpen] = useState({
    type: false,
    brand: false,
    price: false,
    rating: false,
    discount: false,
    sort:false,
  });
  
  
  const [filteredMenData, setFilteredMenData] = useState([]); 
  useEffect(() => {
    const updatedFilteredData =  kidsData.filter((item) => {
      return (
        (selectedType.length === 0 || selectedType.includes(item.type)) &&
        (selectedBrand.length === 0 || selectedBrand.includes(item.brand)) &&
        (selectedModel.length === 0 || selectedModel.includes(item.model)) &&
        (selectedRating.length === 0 || selectedRating.includes(item.rating)) &&
        (selectedDiscount.length === 0 || selectedDiscount.includes(item.discount)) &&
        item.sprice >= priceRange[0] && item.sprice <= priceRange[1]
      );
    });
  
    setFilteredMenData(updatedFilteredData); // Update the filtered data state
  }, [ kidsData, selectedType, selectedBrand, selectedModel, selectedRating, selectedDiscount, priceRange]); // Re-run filter when any dependency changes
  
  

  const handleMinPriceChange = (e) => {
    const minPrice = Math.max(0, parseInt(e.target.value));
    setPriceRange([minPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = Math.min(5000, parseInt(e.target.value));
    setPriceRange([priceRange[0], maxPrice]);
  };
  const toggleDropdown = (filter) => {
    setIsDropdownOpen((prevState) => ({
      type: filter === 'type' ? !prevState.type : false,
      brand: filter === 'brand' ? !prevState.brand : false,
      price: filter === 'price' ? !prevState.price : false,
      rating: filter === 'rating' ? !prevState.rating : false,
      discount: filter === 'discount' ? !prevState.discount : false,
      sort: filter === 'sort' ? !prevState.sort : false, 
      model: filter==='model'? !prevState.model : false,
    }));
  };
  const [sortedMenData, setSortedMenData] = useState(filteredMenData);

  const handleSort = (sortType) => {
    let sortedData = [...filteredMenData]; 

    switch (sortType) {
      case 'relevant': 
        sortedData = [...filteredMenData];
        break;
      case 'priceLowToHigh':
        sortedData.sort((a, b) => a.sprice - b.sprice);
        break;
      case 'priceHighToLow':
        sortedData.sort((a, b) => b.sprice - a.sprice);
        break;
      case 'discount':
        sortedData.sort((a, b) => b.discount - a.discount);
        break;
      case 'rating':
        // Assuming relevance is determined by some property; adjust accordingly
        sortedData.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setFilteredMenData(sortedData);
    setSortedMenData(sortedData); // Update state with sorted data
    setIsDropdownOpen({ sort: false }); // Close the dropdown after sorting
    
  };

  //for each category section 
  const [dropdownOpenState, setDropdownOpenState] = useState({
    categories: false,
    footwear: false,
    watches: false,
    smartWatches: false,
    groomingKits: false,
    smartBands: false,
    personalCareAppliences:false,
    accessories:false,
    sportsfitness:false,
    tie:false,
  });
  
  const switchDropdown = (category) => {
    setDropdownOpenState((prevState) => {
      const isOpen = prevState[category]; // Check if the clicked category is currently open
      return {
        categories: false,
        footwear: false,
        watches: false,
        smartWatches: false,
        groomingKits: false,
        smartBands: false,
        personalCareAppliences:false,
        accessories:false,
        sportsfitness:false,
        tie:false,
        [category]: !isOpen, // Toggle the clicked category
      };
    });
  };
  
  return (
    <div>
       <div className="page-container">
       <div className="navbar-filters">
         <div className="navbar-header">
           <div className="navbar-header-photo">
             <img src="/src/assets/Kids/header.avif" alt="Header Image" />
           </div>
           <div className="navbar-header-line">
             <h2>KIDS FASHION</h2>
           </div>
         </div>
         <div className="navbar-start">
           <h1 className="filters-head">Filters</h1>

           {/* Type selection */}
           <div className="type-selection">
             <label className="highlight">CATEGORIES</label>
            
            
<div className="each-category">
  <button onClick={() => switchDropdown('categories')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Categories & Accessories
  </button>
  {dropdownOpenState.categories && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  


<div className="each-category">
  <button onClick={() => switchDropdown('footwear')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Footwears
  </button>
  {dropdownOpenState.footwear && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  

 

<div className="each-category">
  <button onClick={() => switchDropdown('watches')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Watches
  </button>
  {dropdownOpenState.watches && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  

  

<div className="each-category">
  <button onClick={() => switchDropdown('smartWatches')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Smart Watches
  </button>
  {dropdownOpenState.smartWatches && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  


<div className="each-category">
  <button onClick={() => switchDropdown('groomingKits')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Grooming Kits
  </button>
  {dropdownOpenState.groomingKits && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>    

<div className="each-category">
  <button onClick={() => switchDropdown('smartBands')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Smart Bands
  </button>
  {dropdownOpenState.smartBands && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  

<div className="each-category">
  <button onClick={() => switchDropdown('personalCareAppliences')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Personal Care Appliences
  </button>
  {dropdownOpenState.personalCareAppliences && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  

<div className="each-category">
  <button onClick={() => switchDropdown('accessories')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Accessories
  </button>
  {dropdownOpenState.accessories && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  

<div className="each-category">
  <button onClick={() => switchDropdown('sportsfitness')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Sports & Fitness
  </button>
  {dropdownOpenState.sportsfitness && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  

<div className="each-category">
  <button onClick={() => switchDropdown('tie')} className="dropdown-toggle">
    {dropdownOpenState.categories ? (
      <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
    ) : (
      <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
    )}
    Tie, Socks & More
  </button>
  {dropdownOpenState.tie && (
    <div className="dropdown-menu">
      {/* Subcategories */}
      <div className="category" onClick={() => handleCategorySelect('Winter Wear')}>Winter Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Top Wear')}>Top Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Bottom Wear')}>Bottom Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Inner Wear')}>Inner Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Ethenic Wear')}>Ethenic Wear</div>
      <div className="category" onClick={() => handleCategorySelect('Clothing Acessories')}>Clothing Acessories</div>
      <div className="category" onClick={() => handleCategorySelect('Blazers & Waistcoats')}>Blazers & Waistcoats</div>
      <div className="category" onClick={() => handleCategorySelect('Co-ords')}>Co-ords</div>

    </div>
  )}
</div>  

          </div>

          {/* Brand selection */}
          <div className="brand-selection">
      <label className="highlight">BRANDS</label>
      <div className="type">
        <input
          type="checkbox"
          id="nike"
          value="Nike"
          checked={selectedBrand.includes("Nike")}
          onChange={() => handleMultiSelect("Nike", setSelectedBrand, selectedBrand)}
        />
        <label htmlFor="nike">Nike</label>
      </div>
      <div className="type">
        <input
          type="checkbox"
          id="levis"
          value="Levi's"
          checked={selectedBrand.includes("Levi's")}
          onChange={() => handleMultiSelect("Levi's", setSelectedBrand, selectedBrand)}
        />
        <label htmlFor="levis">Levi's</label>
      </div>
      <div className="type">
        <input
          type="checkbox"
          id="adidas"
          value="Adidas"
          checked={selectedBrand.includes("Adidas")}
          onChange={() => handleMultiSelect("Adidas", setSelectedBrand, selectedBrand)}
        />
        <label htmlFor="adidas">Adidas</label>
      </div>
      <div className="type">
        <input
          type="checkbox"
          id="Ralph Lauren"
          value="Ralph Lauren"
          checked={selectedBrand.includes("Ralph Lauren")}
          onChange={() => handleMultiSelect("Ralph Lauren", setSelectedBrand, selectedBrand)}
        />
        <label htmlFor="Ralph Lauren">Ralph Lauren</label>
      </div>
      <div className="type">
        <input
          type="checkbox"
          id="Under Armour"
          value="Under Armour"
          checked={selectedBrand.includes("Under Armour")}
          onChange={() => handleMultiSelect("Under Armour", setSelectedBrand, selectedBrand)}
        />
        <label htmlFor="Under Armour">Under Armour</label>
      </div>
      <div className="type">
        <input
          type="checkbox"
          id="Tommy Hilfiger"
          value="Tommy Hilfiger"
          checked={selectedBrand.includes("Tommy Hilfiger")}
          onChange={() => handleMultiSelect("Tommy Hilfiger", setSelectedBrand, selectedBrand)}
        />
        <label htmlFor="Tommy Hilfiger">Tommy Hilfiger</label>
      </div>
    </div>

          {/* Price Range */}
          <div className="price-selector">
            <label className="highlight">PRICE RANGE</label><br />
            <div className="price-range">
              <div className="price">
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={priceRange[0]}
                  onChange={handleMinPriceChange}
                  placeholder="Min Price"
                />
              </div>
              <p>To</p>
              <div className="price">
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={handleMaxPriceChange}
                  placeholder="Max Price"
                />
              </div>
            </div>
            <div className="price-const-range">Price: ₹{priceRange[0]} - ₹{priceRange[1]}</div>
          </div>
          <div className="model-selection">
          <button onClick={() => toggleDropdown('model')} className="dropdown-toggle">MODEL
  {isDropdownOpen.model ? (
    <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
  ) : (
    <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
  )}

</button>
            {isDropdownOpen.model && (
              <div className="dropdown-menu">
                {['Sporty Tee', 'ClassicFit', '511 Slim Fit'].map((model) => (
                  <div className="type" key={model}>
                    <input
                      type="checkbox"
                      id={model}
                      value={model}
                      checked={selectedModel.includes(model)}
                      onChange={() => handleMultiSelect(model, setSelectedModel, selectedModel)}
                    />
                    <label htmlFor={model}>{model}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating selection */}
          <div className="rating-selection">
          <button onClick={() => toggleDropdown('rating')} className="dropdown-toggle">RATING
  {isDropdownOpen.rating ? (
    <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
  ) : (
    <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
  )}

</button>
            {isDropdownOpen.rating && (
              <div className="dropdown-menu">
                {['5', '4', '3', '2'].map((rating) => (
                  <div className="type" key={rating}>
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      value={rating}
                      checked={selectedRating.includes(rating)}
                      onChange={() => handleMultiSelect(rating, setSelectedRating, selectedRating)}
                    />
                    <label htmlFor={`rating-${rating}`}>{rating} Stars & Above</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discount selection */}
          <div className="discount-selection">
          <button onClick={() => toggleDropdown('discount')} className="dropdown-toggle">DISCOUNT
  {isDropdownOpen.discount ? (
    <img src="/src/assets/MenWear/arrowup.png" alt="Up Arrow" className="arrow-icon" />
  ) : (
    <img src="/src/assets/MenWear/arrowdown.png" alt="Down Arrow" className="arrow-icon" />
  )}

</button>
             {isDropdownOpen.discount && (
              <div className="dropdown-menu">
                {['60%', '40%', '30%'].map((discount) => (
                  <div className="type" key={discount}>
                    <input
                      type="checkbox"
                      id={`discount-${discount}`}
                      value={discount}
                      checked={selectedDiscount.includes(discount)}
                      onChange={() => handleMultiSelect(discount, setSelectedDiscount, selectedDiscount)}
                    />
                    <label htmlFor={`discount-${discount}`}>{discount} & Above</label>
                  </div>
                ))}
              </div>
            )}
          </div>


        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
      <div className="navbar-filters-mobile">

  <div className="navbar-start-mobile">
 
  <div className="sort-by-selection-mobile">
  <label className="highlight-mobile">SORT BY</label>
  <div className="for-margin"><button onClick={() => toggleDropdown('sort')} className="dropdown-toggle-mobile">
    Sort
  </button></div>
  {isDropdownOpen.sort && (
    <div className="dropdown-menu-mobile">
       <div className="type-mobile" onClick={() => handleSort('relevant')}>
        <label>Relevance</label>
      </div>
      <div className="type-mobile" onClick={() => handleSort('priceLowToHigh')}>
        <label>Price: Low to High</label>
      </div>
      <div className="type-mobile" onClick={() => handleSort('priceHighToLow')}>
        <label>Price: High to Low</label>
      </div>
      <div className="type-mobile" onClick={() => handleSort('discount')}>
        <label>Discount</label>
      </div>
      <div className="type-mobile" onClick={() => handleSort('rating')}>
        <label>Ratings</label>
      </div>
    </div>
  )}
</div>

    {/* Type selection */}
    <div className="type-selection-mobile ">
  <label className="highlight-mobile">CATEGORIES</label>
  <div className="for-margin"><button onClick={() => toggleDropdown('type')} className="dropdown-toggle-mobile">
   
    Categories
  </button></div>
  {isDropdownOpen.type && (
    <div className="dropdown-menu-mobile">
      {['Mens Plain Tshirts', 'Dress Shirt', 'Jeans', 'Hoodie', 'Blazer', 'Jacket'].map((type) => (
        <div className="type-mobile" key={type}>
          <input
            type="checkbox"
            id={type}
            value={type}
            checked={selectedType.includes(type)}
            onChange={() => {handleMultiSelect(type, setSelectedType, selectedType);
              handleSort('relevant');}
            }
            
          />
          <label htmlFor={type}>{type}</label>
        </div>
      ))}
    </div>
  )}
</div>


{/* Brand selection */}
<div className="brand-selection-mobile">
  <label className="highlight-mobile">BRAND</label>
  <div className="for-margin"><button onClick={() => toggleDropdown('brand')} className="dropdown-toggle-mobile">
    Brand
  </button></div>
  {isDropdownOpen.brand && (
    <div className="dropdown-menu-mobile">
      {['Nike', 'Adidas', 'Levi’s', 'Tommy Hilfiger', 'Under Armour', 'Ralph Lauren'].map((brand) => (
        <div className="type-mobile" key={brand}>
          <input
            type="checkbox"
            id={brand}
            value={brand}
            checked={selectedBrand.includes(brand)}
            onChange={() => handleMultiSelect(brand, setSelectedBrand, selectedBrand)}
          />
          <label htmlFor={brand}>{brand}</label>
        </div>
      ))}
    </div>
  )}
</div>

{/* Price range selection with dropdown */}
<div className="price-selection-mobile">
  <label className="highlight-mobile">PRICE RANGE</label>
  <div className="for-margin"><button onClick={() => toggleDropdown('price')} className="dropdown-toggle-mobile">
    Price
  </button></div>
  {isDropdownOpen.price && (
    <div className="dropdown-menu-mobile">
      <div className="price-range-mobile">
        <div className="price-mobile">
          <input
            type="number"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            placeholder="Min Price"
          />
        </div>
        <p>To</p>
        <div className="price-mobile">
          <input
            type="number"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            placeholder="Max Price"
          />
        </div>
      </div>
      <div className="price-const-range-mobile">Price: ₹{priceRange[0]} - ₹{priceRange[1]}</div>
    </div>
  )}
</div>


{/* Rating selection */}
<div className="rating-selection-mobile">
  <label className="highlight-mobile">USER RATING</label>
  <div className="for-margin"> <button onClick={() => toggleDropdown('rating')} className="dropdown-toggle-mobile">
    Ratings
  </button></div>
  {isDropdownOpen.rating && (
    <div className="dropdown-menu-mobile">
      {['5', '4', '3', '2'].map((rating) => (
        <div className="type-mobile" key={rating}>
          <input
            type="checkbox"
            id={`rating-${rating}`}
            value={rating}
            checked={selectedRating.includes(rating)}
            onChange={() => handleMultiSelect(rating, setSelectedRating, selectedRating)}
          />
          <label htmlFor={`rating-${rating}`}>{rating} Stars & Above</label>
        </div>
      ))}
    </div>
  )}
</div>
{/* Discount selection */}
<div className="discount-selection-mobile">
  <label className="highlight-mobile">DISCOUNT</label>
  <div className="for-margin"> <button onClick={() => toggleDropdown('discount')} className="dropdown-toggle-mobile">
    Discount
  </button></div>
  {isDropdownOpen.discount && (
    <div className="dropdown-menu-mobile">
      {['60%', '40%', '30%'].map((discount) => (
        <div className="type-mobile" key={discount}>
          <input
            type="checkbox"
            id={`discount-${discount}`}
            value={discount}
            checked={selectedDiscount.includes(discount)}
            onChange={() => handleMultiSelect(discount, setSelectedDiscount, selectedDiscount)}
          />
          <label htmlFor={`discount-${discount}`}>{discount} & Above</label>
        </div>
      ))}
    </div>
  )}
</div>

  </div>
</div>
 
    <div
      className="product-display"
      onClick={() => {
        setIsDropdownOpen({
          type: false,
          brand: false,
          price: false,
          rating: false,
          discount: false,
          sort: false,
        });
      }}
    >
      <div className="navbar-header-mobile">
        <div className="navbar-header-photo-mobile">
          <img src="/src/assets/Kids/header.avif" alt="Header Image" />
        </div>
        <div className="navbar-header-line-mobile">
          <h2>KIDS FASHION</h2>
        </div>
      </div>
      <h1 className="main-content-head">CLOTHING & ACCESSORIES</h1>
      <div className="product-display-item">
        {filteredMenData && filteredMenData.length > 0 ? (
          filteredMenData.map((item) => (
            <KidsItemPage
              key={item.id}
              id={item.id}
              model={item.model}
              type={item.type}
              description={item.description}
              cprice={item.cprice}
              sprice={item.sprice}
              discount={item.discount}
              image={item.image}
              brand={item.brand}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
    </div>
    </div>
    </div>
  );
  
}

export default KidsPages