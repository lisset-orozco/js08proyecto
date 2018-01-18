console.log('Animated-Scroll');

const getInitialScroll = () => document.documentElement.scrollTop;
const getFinalScroll = element => element.getBoundingClientRect().top + getInitialScroll();
// getBoundingClientRect > devuelve todas las coordenadas de un elemento

const animatedScrollTo = (targetElement, time) => {
  let initialPosition = getInitialScroll(),
    finalPosition = getFinalScroll(targetElement),
    distanceToScroll = finalPosition - initialPosition,
    scrollFragment = Math.ceil(distanceToScroll / time);
  animatedScroll(scrollFragment, finalPosition);
};

const animatedScroll = (scrollFragment, finalPosition) => {
  let animatedScroll = setInterval(function() {
    document.documentElement.scrollTop += scrollFragment;
    if (scrollFragment > 0) {
      if (document.documentElement.scrollTop > finalPosition - (scrollFragment / 2))
        clearInterval(animatedScroll);
    } else {
      // console.log(document.documentElement.scrollTop); // 253
      // console.log(scrollFragment); // -0
      // console.log(finalPosition); // 21

      if (document.documentElement.scrollTop < finalPosition - (scrollFragment / 2)) { 
        clearInterval(animatedScroll);
      }
    } 
  /* if (targetElement.id === 'top') {
      // console.log(targetElement.id);
      // console.log(document.documentElement.scrollTop);
      document.documentElement.scrollTop --;
      if (document.documentElement.scrollTop <= 0)
        clearInterval(animatedScroll);
    } else {   
      if (document.documentElement.scrollTop >= finalPosition)
        clearInterval(animatedScroll);
    }*/
  }, 1);
};

const animatedScrollEvent = (originElement, time) => {
  if (originElement.tagName === 'A' && originElement.hash !== '') {
    let targetElement = document.getElementById(originElement.hash.slice(1));
    
    originElement.addEventListener('click', ev => {
      ev.preventDefault();
      animatedScrollTo(targetElement, time);
    });
  }
};

const animatedScrollAllLinks = (time) => {
  let links = document.links;
  for (let link of links) {
    animatedScrollEvent(link, time);
  }
};

animatedScrollAllLinks(500);
// ya no necesitamos el destino 'cap2' si no el origen 'link2'
// animatedScrollEvent(document.getElementById('link2'), 500);

/*
let animatedScroll = setInterval(function() {
  // debugger;
  document.documentElement.scrollTop += 10;
}, 10);
*/