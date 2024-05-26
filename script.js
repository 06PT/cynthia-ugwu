function scrolling() {
    gsap.registerPlugin(ScrollTrigger);
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
  
      // for tablet smooth
      tablet: { smooth: true },
  
      // for mobile
      smartphone: { smooth: true },
    });
    locoScroll.on("scroll", ScrollTrigger.update);
  
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
  
      // follwoing line is not required to work pinning on touch screen
  
      /* pinType: document.querySelector(".smooth-scroll").style.transform
      ? "transform"
      : "fixed"*/
    });
}

function page1Anime(){
  var tl = gsap.timeline();
  tl.from(".nav",{
    y:'10',
    opacity:0,
    ease: Expo.easeInOut, 
    duration: 1, 
  })
  tl.to(".belem",{
    y:0,
    stagger:0.08,
    ease: Expo.easeInOut,
    duration:1.5
  })
  tl.to(".boundelem",{
    y:0,
    duration:1,
    ease:true
  })
   .from(".bottom",{
    opacity:0,
    x: -50,
    duration:1,
    ease:true
   })
}


function mouseFollower(){
  var cursor = document.querySelector(".circle")
  
  window.addEventListener("mousemove", function(dets){
      gsap.to(cursor, {
          x: dets.x,
          y: dets.y,
        });
  })
}

scrolling();
page1Anime();  
mouseFollower();



document.querySelectorAll(".elem").forEach(function(elem){
  var rotate = 0;
  var differ = 0;

  elem.addEventListener("mouseleave",function(dets){
    gsap.to(elem.querySelector("img"),{
      opacity:0,
      ease: Power4,
    })
  });

  elem.addEventListener("mousemove",function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top; 
    differ = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"),{
      opacity:1,
      ease: Power4,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-15, 15, differ)
    })
  });
  
});

