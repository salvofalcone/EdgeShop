/**********  IMPORT **********/

import {
  cE,
  qS,
  qSA,
  newProduct,
  newProductModal,
  createCartModal,
  newProductCart,
  noMoreText,
  createLogIn,
} from "./utils/fn.js";

import { usersList } from "./utils/credentials.js";

/********** MODALE **********/
export const callModal = () => {
  {
    const productCardEls = qSA(".product__card");
    productCardEls.forEach((product) =>
      product.addEventListener("click", () =>
        fetch(`https://dummyjson.com/products/${product.id}`)
          .then((res) => res.json())
          .then((data) => rootEl.append(newProductModal(data, rootEl)))
      )
    );
  }
};

/******* SINCRONO *******/
/**********  EXPORT **********/
// let searchProductValue = "";
export let productListData = [];
export let cartItems = [];
export let cartEl = qS(".cart");

export const rootEl = qS("#root");
export const searchProductEl = qS(".searchInput");

export const productList = cE("div");
export const productListTitle = cE("h2");

productListTitle.textContent = "Products for you!";

productList.className = "product__list";

/* ==================================================================== */

/******* ASINCRONO *******/
/* DIALOGO CON DUMMY */
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    productListData = data.products;
    productListData.forEach((product) =>
      productList.append(newProduct(product))
    );
  })
  .then(() => {
    const productCardEls = qSA(".product__card");
    productCardEls.forEach((product) =>
      product.addEventListener("click", () =>
        fetch(`https://dummyjson.com/products/${product.id}`)
          .then((res) => res.json())
          .then((data) => rootEl.append(newProductModal(data, rootEl)))
      )
    );
  });

/* ==================================================================== */

/********** SEARCHBAR **********/
searchProductEl.addEventListener("input", (evt) => {
  if (evt.target.value === "") {
    productListData.forEach((el) => {
      rootEl.append(newProduct(el));
    });
  } else {
    productList.textContent = "";
    productListData
      .filter((product) =>
        product.description
          .toLowerCase()
          .includes(evt.target.value.toLowerCase())
      )
      .forEach((obj) => productList.append(newProduct(obj)));
    callModal();
  }
});

export const categories = qS("#categories");

/* ==================================================================== */

/********** CATEGORIE **********/
categories.addEventListener("change", (evt) => {
  if (evt.target.value === "dfl") {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        productList.textContent = "";
        productListData = data.products;
        productListData.forEach((product) =>
          productList.append(newProduct(product))
        );
      })
      .then(() => callModal());
  } else {
    fetch(`https://dummyjson.com/products/category/${evt.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        productList.textContent = "";
        data.products.forEach((obj) => productList.append(newProduct(obj)));
      })
      .then(() => callModal());
  }
});

/* =============================================================== */

// const btnEl = cE("button");
// btnEl.textContent = "show cart items";
// document.body.append(btnEl);
// btnEl.addEventListener("click", () => console.log(cartItems));

/* =============================================================== */

if (cartItems.length >= 1) {
  cartEl.classList.add("itemsInCart");
}

/* ==================================================================== */

/********** MODALE CARRELLO **********/
cartEl.addEventListener("click", () => {
  rootEl.append(createCartModal(cartItems, rootEl));
  const cartModal = qS(".cartModal");

  cartEl.disable = true;
  cartModal.classList.add("cartModal__active");
});

/* =============================================================== */

/********** APPEND MODALE LOGIN **********/

rootEl.append(createLogIn());
