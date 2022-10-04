let headerSelectBoxs = document.querySelectorAll(
  "header #one .container .left-side .selectBox"
);
let sliderLeftArrow = document.querySelector("main #slider .container .left");
let sliderRightArrow = document.querySelector("main #slider .container .right");
let navsCollapseIcons = document.querySelectorAll(
  "header #three .container .navs li .icon"
);
let openMenuIcon = document.querySelector("header #two .container > .icon");
let closeMenuIcon = document.querySelector(
  "header #three .container .head > .icon"
);
let offerRightArrow = document.querySelector("main #offers .container .right");
let offerLeftArrow = document.querySelector("main #offers .container .left");
let postsRightArrow = document.querySelector("main #posts .container .right");
let postsLeftArrow = document.querySelector("main #posts .container .left");
let footerRightArrow = document.querySelector(
  "footer .row #footer-slider .right"
);
let footerLeftArrow = document.querySelector(
  "footer .row #footer-slider .left"
);
let footerCollapseIcons = document.querySelectorAll(
  "footer .row #tabs .box .icon"
);
let onAppearAnimation = document.querySelectorAll(".be-animated");
//###########
//###########
//###########
//###########
// setting on load animation
let loadObserver = new IntersectionObserver(
  (enteries) =>
    enteries.forEach((entery) => {
      if (entery.isIntersecting === true) {
        entery.target.classList.remove("be-animated");
      }
    }),
  { threshold: [0] }
);

onAppearAnimation.forEach((e) => loadObserver.observe(e));
//###########
//###########
//###########
//###########
// setting up header select menus
window.onclick = function (e) {
  if (e.target === headerSelectBoxs[0] || e.target === headerSelectBoxs[1]) {
    headerSelectBoxs.forEach((box) => {
      if (e.target !== box) {
        box.classList.remove("active");
      }
    });
    e.target.classList.toggle("active");
  } else {
    headerSelectBoxs.forEach((box) => box.classList.remove("active"));
  }
};
headerSelectBoxs.forEach((box) => {
  [...box.lastElementChild.children].forEach((li) => {
    li.addEventListener("click", function () {
      li.parentElement.parentElement.firstElementChild.innerHTML =
        li.innerHTML.replace(/<img.*?>/gi, "");
      li.parentElement.parentElement.classList.remove("active");
    });
  });
});
//###########
//###########
//###########
//###########
// setting up images slider Class
class imgsSlider {
  constructor(rightArrow, leftArrow, hasAnimatedText = false) {
    let imgsCounter = 1;

    function moveBoxLeft() {
      //fixing on resize offset
      window.onresize = () => {
        rightArrow.parentElement.firstElementChild.style.setProperty(
          "margin-left",
          `${
            parseInt(
              getComputedStyle(
                rightArrow.parentElement.firstElementChild
              ).getPropertyValue("--boxMargin")
            ) *
            (parseInt(
              getComputedStyle(
                rightArrow.parentElement.firstElementChild
              ).getPropertyValue("--sliderCount")
            ) -
              1)
          }%`
        );
        if (leftArrow.classList.contains("disabled")) {
          rightArrow.parentElement.firstElementChild.style.setProperty(
            "margin-left",
            "0%"
          );
        }
      };

      rightArrow.parentElement.firstElementChild.style.setProperty(
        "margin-left",
        `${
          parseFloat(
            getComputedStyle(
              rightArrow.parentElement.firstElementChild
            ).getPropertyValue("--boxMargin")
          ) * imgsCounter
        }%`
      );
      imgsCounter++;
      if (imgsCounter > 1) {
        leftArrow.classList.remove("disabled");
        leftArrow.addEventListener("click", moveBoxRight);
      }

      if (
        imgsCounter ===
        parseInt(
          getComputedStyle(
            rightArrow.parentElement.firstElementChild
          ).getPropertyValue("--sliderCount")
        )
      ) {
        rightArrow.classList.add("disabled");
        rightArrow.removeEventListener("click", moveBoxLeft);
      }
      if (hasAnimatedText) {
        let imgsBoxs = [...rightArrow.parentElement.children].filter((child) =>
          child.classList.contains("box")
        );

        imgsBoxs.forEach((box) => {
          box.classList.remove("active");
        });
        imgsBoxs[imgsCounter - 1].classList.add("active");
      }
    }
    function moveBoxRight() {
      leftArrow.parentElement.firstElementChild.style.setProperty(
        "margin-left",
        `${
          parseFloat(
            getComputedStyle(
              rightArrow.parentElement.firstElementChild
            ).getPropertyValue("--boxMargin")
          ) *
          (imgsCounter - 2)
        }%`
      );
      imgsCounter--;
      if (imgsCounter === 1) {
        leftArrow.classList.add("disabled");
        leftArrow.removeEventListener("click", moveBoxRight);
      }
      if (
        imgsCounter <
        parseInt(
          getComputedStyle(
            rightArrow.parentElement.firstElementChild
          ).getPropertyValue("--sliderCount")
        )
      ) {
        rightArrow.classList.remove("disabled");
        rightArrow.addEventListener("click", moveBoxLeft);
      }
      if (hasAnimatedText) {
        let imgsBoxs = [...leftArrow.parentElement.children].filter((child) =>
          child.classList.contains("box")
        );

        imgsBoxs.forEach((box) => {
          box.classList.remove("active");
        });
        imgsBoxs[imgsCounter - 1].classList.add("active");
      }
    }
    rightArrow.addEventListener("click", moveBoxLeft);
  }
}
// top slider
let firstSlider = new imgsSlider(sliderRightArrow, sliderLeftArrow, true);
// ###########
// ###########
// ###########
// ###########
// setting up mobile nav bar collapse icons and opening the menu functionality
document
  .querySelector("header #three .container")
  .style.setProperty("transition", "var(--main-trans)");
navsCollapseIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.parentElement.children[1].classList.toggle("active");
    icon.parentElement.children[2].classList.toggle("active");
    icon.parentElement.children[3].classList.toggle("active");
  });
});

openMenuIcon.addEventListener("click", () => {
  document.querySelector("header #three .container").classList.add("active");
});
closeMenuIcon.addEventListener("click", () => {
  document.querySelector("header #three .container").classList.remove("active");
});
// ########
// ########
// ########
// ########

// offers Slider
let Offersslidder = new imgsSlider(offerRightArrow, offerLeftArrow);
// ########
// ########
// ########
// ########
//setting up shop-one functionality
document
  .querySelectorAll("main .first-catg .container .sort li")
  .forEach((link) => {
    link.addEventListener("click", function () {
      document
        .querySelectorAll("main .first-catg .container .sort li")
        .forEach((link) => {
          link.classList.remove("active");
        });
      this.classList.add("active");
    });
  });
document
  .querySelectorAll("main .first-catg .container ul:first-child li")
  .forEach((link) => {
    link.addEventListener("click", function () {
      document
        .querySelectorAll("main .first-catg .container ul:first-child li")
        .forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
      document
        .querySelectorAll("main #shop-one .container .product")
        .forEach((box) => {
          if (
            box.dataset.catg
              .split(" ")
              .indexOf(this.innerHTML.replace(" ", "")) === -1
          ) {
            box.classList.add("disable");
            setTimeout(() => {
              box.style.setProperty("display", "none");
            }, 200);
          } else {
            box.style.setProperty("display", "initial");
            setTimeout(() => {
              box.classList.remove("disable");
            }, 200);
          }
        });
    });
  });
// ########
// ########
// ########
// ########
//setting up shop-two functionality
document
  .querySelectorAll("main .second-catg .container ul:first-child li")
  .forEach((link) => {
    link.addEventListener("click", function () {
      document
        .querySelectorAll("main .second-catg .container ul:first-child li")
        .forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
      document
        .querySelectorAll("main #shop-two .container .product")
        .forEach((box) => {
          box.classList.add("disable");
          box.style.setProperty("display", "none");
        });
      document
        .querySelectorAll("main #shop-two .container .product")
        .forEach((box) => {
          if (
            box.dataset.catg
              .split(" ")
              .indexOf(this.innerHTML.replace(" ", "")) != -1
          ) {
            box.style.setProperty("display", "initial");
            setTimeout(() => {
              box.classList.remove("disable");
            }, 200);
          }
        });
    });
  });
// ########
// ########
// ########
// ########
//setting yp posts slider functionality
let postsSlider = new imgsSlider(postsRightArrow, postsLeftArrow);
// ########
// ########
// ########
// ########
//setting up footer slider functionality
let footerSlider = new imgsSlider(footerRightArrow, footerLeftArrow);
// ########
// ########
// ########
// ########
// setting up mobile footer collapse icons functionality
footerCollapseIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.parentElement.children[1].classList.toggle("active");
    icon.parentElement.children[2].classList.toggle("active");
    icon.parentElement.children[4].classList.toggle("active");
  });
});

//disabling cursor only if platform is mobile
window.onload = function () {
  setTimeout(() => {
    let styleEle = document.createElement("style");
    styleEle.id = "style";
    if (navigator.userAgent.match(/Mobi/gi) != null) {
      styleEle.append("*{cursor: none !important;}");
      document.body.appendChild(styleEle);
    }
  });
};
window.onresize = disableCursor;
function disableCursor() {
  setTimeout(() => {
    let styleEle = document.createElement("style");
    styleEle.id = "style";
    if (navigator.userAgent.match(/Mobi/gi) != null) {
      styleEle.append("*{cursor: none !important;}");
      if (!(document.body.lastElementChild.id === "style")) {
        document.body.appendChild(styleEle);
      }
    } else {
      document
        .querySelectorAll("body > #style")
        .forEach((ele) => document.body.removeChild(ele));
    }
  }, 100);
}
