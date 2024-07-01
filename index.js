const slides = document.querySelectorAll(
  "#slide__1,#slide__2,#slide__3,#slide__4",
);
const currentSlideContainer = document.querySelectorAll(
  "#current__slide > img",
);
const viewerControlButtons = document.querySelectorAll(
  "button#next,button#previous",
);
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
    element.classList.add("active");
  });
  slides.forEach((slide) => {
    if (slide.id !== currentActiveSlide) {
      slide.classList.remove("active");
    }
  });
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
      if (activeSlideNumber === 4) return;
      changeImage(activeSlideNumber + 1);
    } else if (button.id === "previous") {
      if (activeSlideNumber === 1) return;
      changeImage(activeSlideNumber - 1);
    }
  });
});
