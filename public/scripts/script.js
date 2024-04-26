// // const avatarImg = document.querySelector('.avatar-img');
// // const avatarInputElement = document.querySelector('#avatar');
// const mongoose = require('mongoose');
// const Product = require("../../models/product");

// // const displayImage = () => {
// //   // avatarImg.style.background = `url(${})`
// //   avatarImg.style.background = "unset";
// //   avatarImg.style.alignText = "center";
// //   avatarImg.textContent = "image upload successful"
// // }

// // avatarInputElement.addEventListener('click', displayImage);

// const productContainerElement = document.querySelector('#product-container');
// const saveProductBtn = document.querySelector('#save-product-btn');

// const createElementStructure = (product) => {
//   const mainDiv = document.createElement('div');
//   const innerDiv = document.createElement('div');
//   const h2 = document.createElement('h2');
//   const btn = document.createElement('button');

//   mainDiv.classList.add('flex', 'items-center', 'bg-zinc-200', 'rounded', 'w-[300px]', 'h-[100px]', 'pl-3', 'mt-5', 'ml-5');
//   productContainerElement.appendChild(mainDiv);

//   innerDiv.classList.add('flex', 'gap-2');
//   mainDiv.appendChild(innerDiv);

//   h2.innerHTML = "<%= product.productTitle %>"
//   innerDiv.appendChild(h2);
//   btn.classList.add('bg-black', 'text-white', 'rounded', px-2);
//   btn.textContent = "edit";
//   innerDiv.appendChild(btn);

// }

// const addProduct = () => {
//   const products = Product.find();
//   products.forEach(product => {
//     createElementStructure(product);
//   })
// }

// saveProductBtn.addEventListener('click', addProduct)
