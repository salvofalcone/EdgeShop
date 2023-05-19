/**********  IMPORT **********/
import {
  cartItems,
  cartEl,
  rootEl,
  productList,
  productListTitle,
  categories,
  productListData,
  callModal,
} from "../script.js";

import { usersList } from "../utils/credentials.js";

/********** EXPORT  **********/

export const cE = (element) => document.createElement(element);
export const qS = (element) => document.querySelector(element);
export const qSA = (elements) => document.querySelectorAll(elements);

/* ==================================================================== */

/********** RIDUZIONE TESTO DESCRITTIVO **********/
export const noMoreText = (str) =>
  str.split(" ").splice(0, 8).join(" ") + " ...";

/* ==================================================================== */

/********** CREAZIONE SINGOLA CARTA PRODOTTO **********/
export const newProduct = (data) => {
  /***** CREATE ELEMENT *****/
  const wrapperEl = cE("div");
  const textWrapperEl = cE("div");
  const textWrapperMini = cE("div");
  const imageEl = cE("img");
  const titleEl = cE("h3");
  const descriptionEl = cE("p");
  const ratingEl = cE("p");
  const priceEl = cE("h4");
  const buttonEl = cE("button");

  /***** CLASSI e ATTRIBUTI*****/
  wrapperEl.className = "product__card";
  wrapperEl.setAttribute("id", data.id); //aggiungo questo così da avere id unico per ogni card
  textWrapperEl.className = "product__card__text";
  textWrapperMini.className = "text__wrapper__mini";
  descriptionEl.className = "product__card__description";
  buttonEl.className = "product__card__btn";
  imageEl.src = data.thumbnail;
  imageEl.alt = data.title;

  /***** TEXT CONTENT *****/
  titleEl.textContent = data.title;
  descriptionEl.textContent = noMoreText(data.description);
  ratingEl.textContent = data.rating + " ⭐️";
  priceEl.textContent = "$ " + data.price;
  buttonEl.textContent = "Add to Cart";

  /***** APPEND *****/
  textWrapperMini.append(ratingEl, priceEl);
  textWrapperEl.append(titleEl, descriptionEl, textWrapperMini, buttonEl);
  wrapperEl.append(imageEl, textWrapperEl);

  return wrapperEl;
};

/* ==================================================================== */

/* creazione modale relativa al prodotto */
export const newProductModal = (productData, parentEl = null) => {
  /***** CREATE ELEMENT *****/
  const wrapperEl = cE("div"); //contenitore principale
  const overlayEl = cE("div");

  //contenitore principale a sinistra
  const galleryEl = cE("div");
  const mainImgEl = cE("img");
  // const thumbWrapperEl = cE("div");

  //contenitore principale a destra
  const textEl = cE("div");
  const mainTextEl = cE("div");
  const mainTextTitleEl = cE("h1");
  const mainTextRateEl = cE("p");
  const mainTextDescEl = cE("p");

  //contenitore pulsanti
  const buyTextEl = cE("div");
  const buyTextFirstBtnEl = cE("button");
  const buyTextSecondBtnEl = cE("button");

  /***** CLASSI *****/
  wrapperEl.className = "modal__product";
  overlayEl.className = "modal__overlay";

  galleryEl.className = "modal__product__gallery";

  textEl.className = "modal__product__text";
  mainTextEl.className = "modal__main__text";
  buyTextEl.className = "modal__main__buy";

  /***** ATTRIBUTI *****/
  mainImgEl.src = productData.thumbnail; //voglio che sia l'immagine principale
  mainImgEl.alt = productData.title;

  /***** TEXT CONTENT *****/
  mainTextTitleEl.textContent = productData.title;
  mainTextDescEl.textContent = productData.description;
  mainTextRateEl.textContent = productData.rating;

  buyTextFirstBtnEl.textContent = "Buy now!";
  buyTextSecondBtnEl.textContent = "Go back!";

  // productData.images.forEach((image) => {});

  /***** APPEND *****/
  mainTextEl.append(mainTextTitleEl, mainTextDescEl, mainTextRateEl);
  buyTextEl.append(buyTextFirstBtnEl, buyTextSecondBtnEl);
  galleryEl.append(mainImgEl);
  textEl.append(mainTextEl, buyTextEl);
  wrapperEl.append(overlayEl, galleryEl, textEl);

  /***** listener per eliminare la modale al click *****/
  if (parentEl) {
    overlayEl.addEventListener("click", () => parentEl.removeChild(wrapperEl));
    buyTextSecondBtnEl.addEventListener("click", () =>
      parentEl.removeChild(wrapperEl)
    );
  }

  buyTextFirstBtnEl.addEventListener("click", () => {
    cartItems.push(productData);
    parentEl.removeChild(wrapperEl);

    if (cartItems.length >= 1) {
      cartEl.classList.add("itemsInCart");
    }
  });

  return wrapperEl;
};

/* ==================================================================== */

/* aggiunta prodotto al carrello */
export const newProductCart = (data) => {
  /***** CREATE ELEMENT *****/
  const wrapperEl = cE("div");
  const textWrapperEl = cE("div");
  const textWrapperMini = cE("div");
  const imageEl = cE("img");
  const titleEl = cE("h2");
  const priceEl = cE("h3");

  /***** CLASSI e ATTRIBUTI*****/
  wrapperEl.className = "product__card__cart";
  wrapperEl.setAttribute("id", data.id);
  textWrapperEl.className = "product__card__text__cart";
  textWrapperMini.className = "text__wrapper__mini__cart";
  imageEl.src = data.thumbnail;
  imageEl.alt = data.title;
  imageEl.className = "image__cart";

  /***** TEXT CONTENT *****/
  titleEl.textContent = data.title;
  priceEl.textContent = "$ " + data.price;

  /***** APPEND *****/
  textWrapperMini.append(priceEl);
  textWrapperEl.append(titleEl, textWrapperMini);
  wrapperEl.append(imageEl, textWrapperEl);

  return wrapperEl;
};

/* ==================================================================== */

/* creazione modale del carrello */
export const createCartModal = (cartItems, parentEl = null) => {
  //stessa struttura delle altre modali
  const wrapperEl = cE("div");
  const totalItemsEl = cE("h3");
  const cardWrapper = cE("div");
  const textWrapper = cE("div");

  const priceEl = cE("h2");
  const closeBtnEl = cE("button");

  wrapperEl.className = "cartModal";
  cardWrapper.className = "card__wrapper";
  textWrapper.className = "text__wrapper";
  totalItemsEl.className = "total__items__el";
  totalItemsEl.textContent = `Products added to cart: ${cartItems.length}`;

  closeBtnEl.classList = "cartModal__closeBtn";
  closeBtnEl.textContent = "X";

  priceEl.textContent = `Total:$ ${cartItems.reduce(
    (acc, item) => acc + item.price,
    0
  )}`;

  cartItems.forEach((item) => {
    cardWrapper.append(newProductCart(item));
    wrapperEl.append(closeBtnEl);
    textWrapper.append(totalItemsEl, priceEl);
    wrapperEl.append(closeBtnEl, cardWrapper, textWrapper);
  });

  closeBtnEl.addEventListener("click", () => {
    parentEl.removeChild(wrapperEl);
    cartEl.disabled = false;
  });

  return wrapperEl;
};

/* ==================================================================== */

/* login */
export const createLogIn = () => {
  const wrapperEl = cE("form");
  const pageTitle = cE("h2");
  const imgEl = cE("img");
  const usernameInputEl = cE("input");
  const passwordInputEl = cE("input");
  const submitBtnEl = cE("input");

  wrapperEl.className = "login";
  pageTitle.className = "title__login";
  imgEl.className = "img__login";
  usernameInputEl.className = "input__login";
  passwordInputEl.className = "input__login";
  submitBtnEl.className = "submit__login";

  pageTitle.textContent = "EdgeShop";
  imgEl.setAttribute("src", "./assets/logo3.png");
  usernameInputEl.type = "text";
  usernameInputEl.placeholder = "Username";
  passwordInputEl.type = "password";
  passwordInputEl.placeholder = "Password";
  submitBtnEl.type = "submit";

  wrapperEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log("form inviata");

    /* potrei mettere !! per averlo come booleano */
    const isAuth = !!usersList.find(
      (user) =>
        user.username === evt.srcElement[0].value &&
        user.password === evt.srcElement[1].value
    );

    if (isAuth) {
      rootEl.append(productListTitle, productList);
      rootEl.removeChild(wrapperEl); //riferimento al login
      productListData.forEach((product) => newProduct(product));
    } else {
      alert("Something went wrong, try again?");
    }
  });

  wrapperEl.append(
    imgEl,
    pageTitle,
    usernameInputEl,
    passwordInputEl,
    submitBtnEl
  );

  return wrapperEl;
};
