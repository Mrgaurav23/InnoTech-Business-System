//Here Apply Locomotive for Smooth Scrolling
function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotive();

//Page2 changing Subject font
function fontChange() {
  let page2Text = document.querySelector(".page2 h1");

  let carrer = ["Operating System", "DBMS", "Machine Learning", "JAVA + DSA"];

  let carrerIndex = 0;

  function updateText() {
    page2Text.innerText = ` ${carrer[carrerIndex]} `;
    carrerIndex++;

    if (carrer.length == carrerIndex) {
      carrerIndex = 0;
    }
    setTimeout(updateText, 1500);
  }
}

//page2 box transiton Text
function page2Box() {
  let page2Box = document.querySelectorAll(".box");

  page2Box.forEach((dets) => {
    console.log(dets.childNodes[7]);
    dets.addEventListener("mouseenter", () => {
      dets.childNodes[7].style.opacity = 1;
      dets.childNodes[5].style.bottom = "15%";
    });
    dets.addEventListener("mouseleave", () => {
      dets.childNodes[7].style.opacity = 0;
      dets.childNodes[5].style.bottom = "3%";
    });
  });
}


// nav 

function navbar(){
  const navBar = document.querySelector(".full-div");
  const menu = document.querySelector(".nav-inner button");
  const page1Element = document.querySelector(".page1");
  let flag = 0;
  
  menu.addEventListener("click", () => {
    if (flag === 0) {
      navBar.style.top = "-150%";
      navBar.style.opacity = 0;
      menu.textContent = "Menu";
      menu.style.color = "#FFFFFF";
      menu.style.backgroundColor = "transparent";
      menu.style.border = "0.5px solid rgb(161, 161, 161)";
      menu.style.borderRadius = "20px";
      flag = 1;
    }
    else{
      navBar.style.top = "0%";
      navBar.style.opacity = 1;
      menu.textContent = "close";
      menu.style.backgroundColor = "#FFFFFF";
      menu.style.color = "#000000"
      flag = 0;
    }
  })
}

function call(){
  locomotive();
  fontChange();
  page2Box();
  navbar();
}
call();

gsap.to("#page2-box .box",{
  transform:"translateX(-100%)",
  scrollTrigger:{
    trigger:".page2",
    scroller:"body",
    markers:true,
    start:"top 30%",
    end: "top 10%",
    scrub: 2,
    pin: true,
  }
})
