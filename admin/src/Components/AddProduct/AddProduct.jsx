
import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

export const AddProduct = () => {
  const [image,setImage] = useState(false);
  const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
  })

  const imageHandler = (e) =>{
    setImage(e.target.files[0]);
  }
  const changeHandler = (e) =>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const Add_Product = async() => {
    try {
      if (!image) {
        alert('Please select an image');
        return;
      }

      // First upload the image to Cloudinary
      const formData = new FormData();
      formData.append('product', image);

      const uploadResponse = await fetch('https://godzila-backend.onrender.com/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData
      });

      const responseData = await uploadResponse.json();

      if (responseData.success) {
        // If image upload successful, add the product
        const product = {
          ...productDetails,
          image: responseData.image_url
        };

        const addProductResponse = await fetch('https://godzila-backend.onrender.com/addproduct', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product)
        });

        const addProductData = await addProductResponse.json();
        
        if (addProductData.success) {
          alert('Product Added Successfully');
          // Clear the form
          setImage(false);
          setProductDetails({
            name: "",
            image: "",
            category: "women",
            new_price: "",
            old_price: ""
          });
        } else {
          alert('Failed to add product: ' + (addProductData.error || 'Unknown error'));
        }
      } else {
        alert('Failed to upload image: ' + (responseData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  }
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
          <p>Product Title </p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Enter Product Title' />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here'/>
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here'/>
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector' >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
          </select>
    </div>
    <div className="addproduct-itemfield">
      <label htmlFor="file-input">
        <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt=""/>
      </label>
      <input onChange={imageHandler} type="file"  name='image' id='file-input' hidden/>
    </div>
    <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}
export default AddProduct;
