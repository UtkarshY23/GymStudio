"use strict";

// TAB CONTENT
const tabBtn = document.querySelector(".tab-button");
// console.log(tabBtn);
const btn = document.querySelectorAll(".tab-btn");
const tabcontent = document.querySelectorAll(".tab-content");
// const tabimg = document.querySelectorAll('.tab-img');

tabBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // const clicked = e.target;
  // console.log(clicked.dataset.tab);
  const clicked = e.target.closest(".tab-btn");
  console.log(clicked);
  if (!clicked) return;

  btn.forEach((t) => t.classList.remove("btn-active"));
  btn.forEach((t) => (t.style.backgroundColor = "#585657"));
  // btn.style.backgroundColor = '#ff0336';
  tabcontent.forEach((t) => t.classList.remove("tab-content--active"));
  clicked.classList.add("btn-active");
  clicked.style.backgroundColor = "#ff0336";
  // tabimg.forEach(t => (t.style.filter = 'grayScale(0)'));
  document
    .querySelector(`.tab-content--${clicked.dataset.tab}`)
    .classList.add("tab-content--active");
});

/////////////////////////////////////////////////////////////////
//Testmonial slider
let curslide = 0;

const slides = document.querySelectorAll(".tsml-content");
// console.log(slides);
const slider = document.querySelector(".slider");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dotContainer = document.querySelector(".dots");
const maxslide = slides.length;
// console.log(maxslide);

// slider.style.transform = 'scale(0.3) translateX(-500px)';
// slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

const activeDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const gotoslide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curslide === maxslide - 1) {
    curslide = 0;
  } else {
    curslide++;
  }
  gotoslide(curslide);
  activeDot(curslide);
};

const prevSlide = function () {
  if (curslide === 0) {
    curslide = maxslide - 1;
  } else curslide--;
  gotoslide(curslide);
  activeDot(curslide);
};
const init = function () {
  createDots();

  activeDot(0);
};
init();

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

dotContainer.addEventListener("click", function (e) {
  // console.log(e.target);
  const { slide } = e.target.dataset;
  // console.log(slide);
  gotoslide(slide);
  activeDot(slide);
});

/////////////////////////////////////////////////////////////
//STICKY NAVIGATION

const nav = document.querySelector(".navigation");
const hero = document.querySelector(".hero");

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const observers = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});
observers.observe(hero);

/////////////////////////////////////////////////////////////
//NAVIGATION

const open = document.querySelector(".open");
const close = document.querySelector(".close");
const navs = document.querySelector(".nav-links");

open.addEventListener("click", function () {
  navs.classList.add("opens");
  open.classList.remove("btn-opens");
  close.classList.add("btn-opens");
});

close.addEventListener("click", function () {
  navs.classList.remove("opens");
  close.classList.remove("btn-opens");
  open.classList.add("btn-opens");
});
