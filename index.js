const slides = document.querySelectorAll(
  "#slide__1,#slide__2,#slide__3,#slide__4",
);
const currentSlideContainer = document.querySelectorAll(
  "#current__slide > img",
);
const viewerControlButtons = document.querySelectorAll(
  "button#next,button#previous",
);
const cartControlButtons = document.querySelectorAll(
  "button#plus, button#minus",
);
const cart = document.getElementById("cart");
const addToCardButton = document.getElementById("add__to__cart");
const removeItemButton = document.getElementById("remove");
let currentActiveSlide = "slide__1";

const setCurrentActiveSlideImage = (slideNumber) => {
  currentSlideContainer.forEach((img) => {
    img.src = `images/image-product-${slideNumber}.jpg`;
  });
};

const changeImage = (slideNumber) => {
  currentActiveSlide = `slide__${slideNumber}`;
  let activeSlidesArray = document.querySelectorAll(`#${currentActiveSlide}`);
  setCurrentActiveSlideImage(slideNumber);
  toggleActiveClass(activeSlidesArray);
};

const toggleActiveClass = (elementArray) => {
  elementArray.forEach((element) => {
    element.classList.add("activeSlide");
    element.classList.add("activeOverlay");
  });
  slides.forEach((slide) => {
    if (slide.id !== currentActiveSlide) {
      if (slide.classList.contains("activeSlide")) {
        slide.classList.remove("activeSlide");
        slide.classList.remove("activeOverlay");
        return;
      }
    }
  });
};

const editCartCount = (amount) => {
  const cartCount = document.getElementById("count");
  let currentCount = Number(cartCount.textContent);
  if (currentCount === 0 && amount < 0) return;
  if (currentCount === 0 && amount === 0) {
    return (cartCount.textContent = 0);
  }
  cartCount.textContent = currentCount + amount;
};

const removeItem = (id) => {
  let cartItem = document.getElementById(id);
  let checkoutButton = document.getElementById("checkout");
  let emptyMessageSpan = cart.querySelector("#empty__message")
  cart.removeChild(cartItem);
  checkoutButton.hidden = true;
  emptyMessageSpan.hidden = false;
  editCartCount(0);
};

slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    let activeSlideNumber = Number(slide.id.split("").pop());
    changeImage(activeSlideNumber);
  });
});

viewerControlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let activeSlideNumber = Number(currentActiveSlide.split("").pop());
    if (button.id === "next") {
      if (activeSlideNumber === 4) return changeImage(1);
      changeImage(activeSlideNumber + 1);
    } else if (button.id === "previous") {
      if (activeSlideNumber === 1) return changeImage(4);
      changeImage(activeSlideNumber - 1);
    }
  });
});

cartControlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "plus") editCartCount(1);
    else if (button.id === "minus") editCartCount(-1);
  });
});

addToCardButton.addEventListener("click", () => {
  let productName = document.getElementById("product__name").innerText;
  let productPrice = document.getElementById("final__price").innerText;
  let productQuantity = Number(document.getElementById("count").textContent);
  if (productQuantity < 1) return;
  let product = {
    title: productName,
    price: Number(productPrice.slice(1)),
    image: `images/image-product-${currentActiveSlide.split("").pop()}-thumbnail.jpg`,
  };

  let isInCart = cart.childElementCount > 2;
  if (isInCart) {
    if (cart.querySelector("h3#item__name").textContent.toString() === product.title) {
      console.log("Already in cart");
      let itemCountSpan = document.querySelector("#item__count");
      let cartPriceSpan = document.querySelector("#cart__price");
      itemCountSpan.innerText = productQuantity;
      cartPriceSpan.innerText = `$${(productQuantity * product.price).toFixed(2)}`;
      return;
    }
  }

  let finalPrice = productQuantity * product.price;

  let clutter = ` <div class="flex w-full gap-4 items-center justify-between px-5 pt-5" id="cart__item" > <div class="item__thumbnail w-16"> <img class="mr-auto rounded-md w-full" src=${product.image} alt="product thumbnail" /> </div> <div class="item__info text-sm w-full text-[var(--Darkgrayishblue)]"> <h3 id="item__name">${product.title}</h3> <h3> <span id="item__price">${product.price}</span> x <span id="item__count">${productQuantity}</span> <span class="font-bold text-black" id="cart__price" >$${finalPrice.toFixed(2)}</span > </h3> </div> <button id="remove"> <img src="images/icon-delete.svg" alt="-" width="18"/> </button> </div>`;
  cart.querySelector("#checkout").hidden = false;

  let cardElement = document.createElement("div");
  cardElement.id = product.title.split(" ").join("");
  cardElement.innerHTML = clutter;

  cardElement.querySelector("#remove").addEventListener("click", () => {
    removeItem(cardElement.id);
  });

  cart.appendChild(cardElement);
  cart.querySelector("#empty__message").hidden = true;
});
