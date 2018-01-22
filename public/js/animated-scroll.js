'use strict';

console.log('Animated-Scroll');

var getInitialScroll = function getInitialScroll() {
  return document.documentElement.scrollTop;
};
var getFinalScroll = function getFinalScroll(element) {
  return element.getBoundingClientRect().top + getInitialScroll();
};
// getBoundingClientRect > devuelve todas las coordenadas de un elemento

var animatedScrollTo = function animatedScrollTo(targetElement, time) {
  var initialPosition = getInitialScroll(),
      finalPosition = getFinalScroll(targetElement),
      distanceToScroll = finalPosition - initialPosition,
      scrollFragment = Math.ceil(distanceToScroll / time);
  animatedScroll(scrollFragment, finalPosition);
};

var animatedScroll = function animatedScroll(scrollFragment, finalPosition) {
  var animatedScroll = setInterval(function () {
    document.documentElement.scrollTop += scrollFragment;
    if (scrollFragment > 0) {
      if (document.documentElement.scrollTop > finalPosition - scrollFragment / 2) clearInterval(animatedScroll);
    } else {
      // console.log(document.documentElement.scrollTop); // 253
      // console.log(scrollFragment); // -0
      // console.log(finalPosition); // 21

      if (document.documentElement.scrollTop < finalPosition - scrollFragment / 2) {
        clearInterval(animatedScroll);
      }
    }
  }, 1);
};

var animatedScrollEvent = function animatedScrollEvent(originElement, time) {
  if (originElement.tagName === 'A' && originElement.hash !== '') {
    var targetElement = document.getElementById(originElement.hash.slice(1));

    originElement.addEventListener('click', function (ev) {
      ev.preventDefault();
      animatedScrollTo(targetElement, time);
    });
  }
};

var animatedScrollAllLinks = function animatedScrollAllLinks(time) {
  var links = document.links;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var link = _step.value;

      animatedScrollEvent(link, time);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

animatedScrollAllLinks(500);
// ya no necesitamos el destino 'cap2' si no el origen 'link2'
// animatedScrollEvent(document.getElementById('link2'), 500);