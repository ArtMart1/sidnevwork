document.addEventListener('DOMContentLoaded', function () {
  const curtains = document.querySelectorAll('.curtain');
  curtains.forEach(curtain => {
    const line = curtain.querySelector('.line');
    const lightImage = curtain.querySelector('.light-image');
    const darkImage = curtain.querySelector('.dark-image');
    const triangle = curtain.querySelector('.triangle');
    const circle = curtain.querySelector('.circle');
    let isDragging = false;
    function updatePositionAndImages(position) {
      const containerWidth = lightImage.parentElement.offsetWidth;
      let newPosition = position;
      newPosition = Math.max(0, Math.min(containerWidth - line.offsetWidth, newPosition));
      line.style.left = `${newPosition}px`;
      const lightClipWidth = (newPosition / containerWidth) * 100;
      const darkClipWidth = ((containerWidth - newPosition - line.offsetWidth) / containerWidth) * 100;
      lightImage.style.clipPath = `inset(0% ${100 - lightClipWidth}% 0% 0%)`;
      darkImage.style.clipPath = `inset(0% 0% 0% ${100 - darkClipWidth}%)`;
      triangle.style.left = `${newPosition}px`;
      circle.style.left = `${newPosition}px`;
    }
    updatePositionAndImages(150);
    line.addEventListener('mousedown', function (event) {
      event.preventDefault();
      isDragging = true;
    });
    document.addEventListener('mousemove', function (event) {
      if (!isDragging) return;
      updatePositionAndImages(event.clientX - lightImage.parentElement.getBoundingClientRect().left);
    });
    document.addEventListener('mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
    });
  });
});

var scrolledRight = false;

function checkContainerPosition() {
  var containerElements = document.getElementsByClassName('container_bot');
  var mainContainer = document.querySelector('.main_container');
  var containerRect = mainContainer.getBoundingClientRect();
  var scrollLeftPosition = mainContainer.scrollLeft;
  for (var i = 0; i < containerElements.length; i++) {
      var containerElement = containerElements[i];
      var containerElementRect = containerElement.getBoundingClientRect();
      var containerLeftPosition = containerElementRect.left - containerRect.left;
      if (scrolledRight && containerLeftPosition >= 70 && containerLeftPosition <= 600) {
          containerElement.classList.add('active');
      } else {
          containerElement.classList.remove('active');
      }
  }
  requestAnimationFrame(checkContainerPosition);
}

document.querySelector('.main_container').addEventListener('scroll', function() {
  var scrollDirection = this.scrollLeft > 0 ? 'right' : 'left';
  if (scrollDirection === 'right' && !scrolledRight) {
    scrolledRight = true;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  checkContainerPosition();
});

document.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.querySelectorAll('.header_center ul li.nav-link');
  var lastVisibleSection = null;
  function addBorderToVisibleSection() {
      var windowWidth = window.innerWidth;
      var sections = document.querySelectorAll('.main_container > div');
      var currentVisibleSection = null;
      for (var i = 0; i < sections.length; i++) {
          var section = sections[i];
          if (section.id === 'line-container_big') continue;
          var rect = section.getBoundingClientRect();
          if (rect.left <= windowWidth && rect.right >= 0) {
              currentVisibleSection = section;
              break;
          }
      }
      if (currentVisibleSection !== lastVisibleSection) {
          if (lastVisibleSection) {
              var lastNavLink = document.querySelector('.header_center ul li.nav-link[data-section="' + lastVisibleSection.id + '"]');
              lastNavLink.classList.remove('border');
          }
          if (currentVisibleSection) {
              var currentNavLink = document.querySelector('.header_center ul li.nav-link[data-section="' + currentVisibleSection.id + '"]');
              currentNavLink.classList.add('border');
          }
          lastVisibleSection = currentVisibleSection;
      }
  }
  function loop() {
      addBorderToVisibleSection();
      requestAnimationFrame(loop);
  }
  function handleLoad() {
      loop();
  }
  window.addEventListener('load', handleLoad);
  var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
              sections = document.querySelectorAll('.main_container > div');
          }
      });
  });
  observer.observe(document.querySelector('.main_container'), { childList: true });
});
document.addEventListener("DOMContentLoaded", function() {
  var navLinks = document.querySelectorAll('.nav-link a');

  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function(event) {
      event.preventDefault();
      
      var targetId = this.getAttribute('href').substring(1);
      var targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        var container = document.querySelector('.main_container');
        var containerRect = container.getBoundingClientRect();
        var targetRect = targetSection.getBoundingClientRect();
        var scrollLeft = targetRect.left - containerRect.left + container.scrollLeft;
        scrollTo(container, scrollLeft, 1000);
      }
    });
  });
});

// Функция для плавной анимации прокрутки
function scrollTo(element, to, duration) {
  var start = element.scrollLeft,
      change = to - start,
      currentTime = 0,
      increment = 20;

  var animateScroll = function() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    } else {
      element.scrollLeft += 1;
    }
  };
  animateScroll();
}
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};
document.addEventListener("DOMContentLoaded", function() {
  var headerLeftLink = document.querySelector('.header_left');

  headerLeftLink.addEventListener('click', function(event) {
    event.preventDefault();
    
    var targetId = this.getAttribute('href'); 
    var targetSection = document.querySelector(targetId);
      
    if (targetSection) {
      var offsetLeft = targetSection.offsetLeft + 1; 

      document.querySelector('.main_container').scroll({
        left: offsetLeft,
        behavior: 'smooth'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const lineContainer = document.querySelector('.line-container_big');
  const line = document.querySelector('.line_big');
  const circle = document.querySelector('.circle_big');
  const triangle = document.querySelector('.triangle_big');
  const mainContainer = document.querySelector('.main_container');

  let isDragging = false;
  let startX, startLeft;

  function onMouseDown(event) {
    isDragging = true;
    startX = event.clientX;
    startLeft = parseFloat(getComputedStyle(this).left);
    event.preventDefault(); 
  }
  function onMouseMove(event) {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    let newLeft = startLeft + deltaX;
    newLeft = Math.max(0, Math.min(window.innerWidth * 0.5, newLeft));
    line.style.left = circle.style.left = triangle.style.left = newLeft + 'px';
    const scrollLeft = newLeft * (mainContainer.scrollWidth - mainContainer.clientWidth) / (window.innerWidth * 0.5);
    mainContainer.scrollLeft = scrollLeft;

    event.preventDefault(); 
  }

  function onMouseUp(event) {
    isDragging = false;
  }

  function onScroll() {
    const maxScrollLeft = mainContainer.scrollWidth - mainContainer.clientWidth;
    const scrollLeft = mainContainer.scrollLeft;
    const newLeft = Math.max(0, Math.min(window.innerWidth * 0.5, scrollLeft * (window.innerWidth * 0.5) / (mainContainer.scrollWidth - mainContainer.clientWidth)));
    line.style.left = circle.style.left = triangle.style.left = newLeft + 'px';
    if (scrollLeft === maxScrollLeft) {
      line.style.left = circle.style.left = triangle.style.left = window.innerWidth * 0.5 + 'px';
    }
  }

  line.addEventListener('mousedown', onMouseDown);
  circle.addEventListener('mousedown', onMouseDown);
  triangle.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  mainContainer.addEventListener('scroll', onScroll);
});
var isTouchPad = function(e) {
  var isTrackPad = e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents;
  if (isTrackPad) {
      return true;
  }
  return e.wheelDeltaY ? Math.abs(e.wheelDeltaY) < 100 : false;
};

const button = document.getElementById('but_foot');
let isDown = false;
let isUp = false;
let hidWasVisible = false; // Переменная, чтобы отслеживать, был ли видим "hid" до нажатия кнопки

button.addEventListener('click', () => {
  const downContainers = document.querySelectorAll('.down');
  const upContainers = document.querySelectorAll('.up');
  const containerBots = document.querySelectorAll('.container_bot'); 
  const hidElements = document.querySelectorAll('.hid');

  downContainers.forEach(downContainer => {
    const containerBot = downContainer.querySelector('.container_bot');
    const imageContainers = downContainer.querySelectorAll('.image_container');

    if (!isDown) {
      containerBots.forEach(bot => { 
        bot.style.transition = 'opacity 1s';
        bot.style.opacity = '0'; 
      });

      containerBot.style.transition = 'opacity 1s';
      containerBot.style.opacity = '1'; 
      imageContainers.forEach(imageContainer => {
        
        imageContainer.style.marginTop = '0';
        imageContainer.style.transition = 'margin 1s';
      });
    } else {
      containerBot.style.transition = 'opacity 1s';
      containerBot.style.opacity = '0'; 
      imageContainers.forEach(imageContainer => {
        if (window.innerWidth < 1440) {
            imageContainer.style.marginTop = '220px';
        } else {
            imageContainer.style.marginTop = '294px';
        }
        imageContainer.style.transition = 'margin 1s';
    });
    }
  });
  isDown = !isDown;

  upContainers.forEach(upContainer => {
    const containerBot = upContainer.querySelector('.container_bot');
    if (!isUp) {
      containerBots.forEach(bot => { 
        bot.style.transition = 'opacity 1s';
        bot.style.opacity = '0'; 
      });
      containerBot.style.transition = 'opacity 1s';
      containerBot.style.opacity = '0'; 
    } else {
      containerBot.style.transition = 'opacity 1s';
      containerBot.style.opacity = '0'; 
    }
  });

  isUp = !isUp;

  hidElements.forEach(hidElement => {
    if (hidWasVisible && isDown) { 
      hidElement.style.transition = 'opacity 1s';
      hidElement.style.opacity = '0';
    } else if (!hidWasVisible && !isDown) { 
      hidElement.style.transition = 'opacity 1s';
      hidElement.style.opacity = '0';
    }
});

  hidWasVisible = !isDown && hidWasVisible;
  if (!isDown && !isUp) {
    removeInlineStyles(containerBots);
  }
});

const allImageContainers = document.querySelectorAll('.image_container');
const allContainerBots = document.querySelectorAll('.container_bot'); 
const allHidElements = document.querySelectorAll('.hid'); // Получаем все элементы с классом "hid"

allImageContainers.forEach(imageContainer => {
  imageContainer.addEventListener('click', () => {
    const containerBot = imageContainer.parentElement.querySelector('.container_bot');
    const hidElement = imageContainer.parentElement.querySelector('.hid');
    if (containerBot) {
      const botComputedStyle = window.getComputedStyle(containerBot);
      const botOpacity = botComputedStyle.getPropertyValue('opacity');

      if (botOpacity === '0') {
        allContainerBots.forEach(bot => {
          bot.style.transition = 'opacity 0s';
          bot.style.opacity = '0';
        });
        
        containerBot.style.transition = 'opacity 1s';

        setTimeout(function() {
            containerBot.style.opacity = '1';
        }, 500); 

        

        hideAllElements('.hid');
        if(isSmall){
          showElement(hidElement)
        }
      }
    }
  });
});

function removeInlineStyles(elements) {
  elements.forEach(element => {
    element.removeAttribute('style');
  });
}

function hideAllElements(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.style.transition = 'opacity 0s';
    element.style.opacity = '0';
  });
}

function showElement(element) {
  element.style.transition = 'opacity 1s';
setTimeout(function() {
  element.style.opacity = '1';
},500);

}
let isSmall = false;
function hideElementsWithClassHid() {
  let hidElements = document.querySelectorAll('.hid');
  hidElements.forEach(function(element) {
    if (window.getComputedStyle(element).display !== 'none') {
      element.style.opacity = '0';
    }
  });
}

function handleMouseOver() {
  let container = this.closest('.container');
  if(container.classList.contains('big')) {
    return; 
  }
  container.classList.remove('small');
  container.classList.add('large');
  let cards = container.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.classList.remove('small');
    card.classList.add('medium');
  });
}
function handleMouseOut() {
  let container = this.closest('.container');
  container.classList.remove('large');
  container.classList.add('small');
  let cards = container.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.classList.remove('medium');
    card.classList.add('small');
  });
}
function addEventListeners() {
  document.querySelectorAll('.image_container').forEach(function(imageContainer) {
    imageContainer.addEventListener('mouseover', handleMouseOver);
    imageContainer.addEventListener('mouseout', handleMouseOut);
    imageContainer.addEventListener('click', clickHandler);
  });
}
function removeEventListeners() {
  document.querySelectorAll('.image_container').forEach(function(imageContainer) {
    imageContainer.removeEventListener('mouseover', handleMouseOver);
    imageContainer.removeEventListener('mouseout', handleMouseOut);
    imageContainer.removeEventListener('click', clickHandler);
  });
}
function clickHandler() {
  let cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.classList.remove('large');
  });
  let containers = document.querySelectorAll('.container');
  containers.forEach(function(container) {
    container.classList.remove('big');
  });

  let cardsInContainer = this.querySelectorAll('.card');
  cardsInContainer.forEach(function(card) {
    card.classList.add('large');
    card.classList.remove('medium');
  });
  let container = this.closest('.container');
  container.classList.add('big');
}
document.querySelectorAll('#but_foot').forEach(function(button) {
  button.addEventListener('click', function() {
    let cardElements = document.querySelectorAll('.card');
    let containerElements = document.querySelectorAll('.container');
    let firstCardElement = document.getElementById('first_card');
    let lineContainers = document.querySelectorAll('.line-container');
    let imageContainers = document.querySelectorAll('.image_container');
    let containerBotElements = document.querySelectorAll('.down .container_bot');
    let folders = document.querySelectorAll('.folder');
    let wrappers = document.querySelectorAll('.wrapper');
    let logotipElements = document.querySelectorAll('.logotip');
    let merchElements = document.querySelectorAll('.merch_item')
    containerBotElements.forEach(function(containerBotElement) {
      if (!isSmall) {
        containerBotElement.classList.add('hidden');
      } else {
        containerBotElement.classList.remove('hidden');
      }
    });
    if (!isSmall) {
      addEventListeners();
      hideElementsWithClassHid();
    } else {
      removeEventListeners();
    }

    cardElements.forEach(function(card) {
      if (!isSmall) {
        card.classList.add('small');
      } else {
        
        card.classList.remove('small');
          card.classList.remove('large'); 
         }
    });
    
    folders.forEach(function(folder){
      if (!isSmall){
        folder.classList.remove('hidden')
      } else {
        folder.classList.add('hidden')
      }
    })
    wrappers.forEach(function(wrapper){
      if(!isSmall){
        wrapper.classList.add('hidden')
      } else{
        wrapper.classList.remove('hidden')
      }
    })
    
    logotipElements.forEach(function(logo){
      if(!isSmall){
        logo.classList.add('center')
      } else {
        logo.classList.remove('center')
      }
    })
    merchElements.forEach(function(merch){
      if(!isSmall){
        merch.classList.add('middle')
      }else{
        merch.classList.remove('middle')
      }
    })

    containerElements.forEach(function(container) {
      if (!isSmall) {
        container.classList.add('small');
      } else {
        
          container.classList.remove('small');
          container.classList.remove('big'); 
      }
    });

    lineContainers.forEach(function(lineContainer) {
      if (!isSmall) {
        lineContainer.classList.remove('fadeInDelayed');
        lineContainer.classList.add('fadeOut');
      } else {
        lineContainer.classList.add('fadeInDelayed');
        lineContainer.classList.remove('fadeOut');
      }
    });
    if (!isSmall) {
      firstCardElement.style.paddingLeft = '53px';
      firstCardElement.style.paddingRight = '6px';
      button.textContent = 'Scatter on the table';
    } else {
      firstCardElement.style.paddingLeft = '120px';
      firstCardElement.style.paddingRight = '60px';
      button.textContent = 'Tidy up the table';
    }

    isSmall = !isSmall;
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const scrollSpeed = 3; // Скорость скролла (чем больше число, тем медленнее)
  const scrollThreshold = 20; // Порог срабатывания скролла (в пикселях)
  const mainContainer = document.querySelector('.main_container');
  let scrollRight = false;
  let scrollLeft = false;

  document.addEventListener('mousemove', function(event) {
    if (isCursorNearRightEdge(event)) {
      scrollRight = true;
      scrollLeft = false;
    } else if (isCursorNearLeftEdge(event)) {
      scrollRight = false;
      scrollLeft = true;
    } else {
      scrollRight = false;
      scrollLeft = false;
    }
  });

  function isCursorNearRightEdge(event) {
    return (window.innerWidth - event.clientX) < scrollThreshold;
  }

  function isCursorNearLeftEdge(event) {
    return event.clientX < scrollThreshold;
  }

  // Функция для скролла вправо
  function scrollRightFunc() {
    if (scrollRight) {
      mainContainer.scrollBy(scrollSpeed, 0);
    }
  }

  // Функция для скролла влево
  function scrollLeftFunc() {
    if (scrollLeft) {
      mainContainer.scrollBy(-scrollSpeed, 0);
    }
  }

  // Запуск функций скроллинга через requestAnimationFrame
  function scrollLoop() {
    scrollRightFunc();
    scrollLeftFunc();
    requestAnimationFrame(scrollLoop);
  }
  
  // Запуск основного цикла скроллинга
  scrollLoop();
});





document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('preload-video');
  var preload = document.getElementById('preloader');
  video.play();
  setTimeout(function() {
    video.style.opacity = '0';
    video.style.transition = '1s';
  }, 4500);
  setTimeout(function() {
    preload.style.display= 'none';
  }, 5000);
});
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
var slider = document.getElementById("myRange");
var images = document.querySelectorAll(".slider-img");

function updateOpacity(value) {
  var opacityFirst, opacitySecond;

  if (value <= 24) {
    opacityFirst = 1;
    opacitySecond = value / 24;
  } else if (value >= 76) {
    opacityFirst = (100 - value) / 24;
    opacitySecond = 1;
  } else {
    opacityFirst = 1;
    opacitySecond = 1;
  }
  images[0].style.opacity = opacityFirst;
  images[1].style.opacity = opacitySecond;
}
function snapToPosition() {
  var value = parseInt(slider.value);
  if (value <= 24) {
    slider.value = 0;
    updateOpacity(0);
  } else if (value >= 76) {
    slider.value = 100;
    updateOpacity(100);
  } else {
    slider.value = 50;
    updateOpacity(50);
  }
}

updateOpacity(slider.value); 
slider.oninput = function() {
  updateOpacity(this.value); 
};

slider.onmouseup = function() {
  snapToPosition();
};

const folderImages = document.querySelectorAll('.folder-img');
folderImages.forEach(folderImage => {
  folderImage.addEventListener('click', function() {
      const parent = this.parentNode;
      const wrapper = parent.previousElementSibling;
      const siblings = Array.from(parent.parentNode.children).filter(child => child !== parent);
      const folder = this.closest('.folder');
      wrapper.classList.toggle('hidden');
      folder.classList.toggle('hidden');
      siblings.forEach(sibling => {
          const siblingWrapper = sibling.querySelector('.wrapper');
          const siblingFolder = sibling.querySelector('.folder');
          if (siblingWrapper && siblingFolder) {
              siblingWrapper.classList.add('hidden');
              siblingFolder.classList.add('hidden');
          }
      });
  });
});


var initialLink = null;
function clickLink(link) {
  if (link) {
    link.click();
  }
}
if (button) {
  button.addEventListener('click', function() {
    var borderElements = document.querySelectorAll('.border');
    var links = [];
    borderElements.forEach(function(borderElement) {
      var link = borderElement.querySelector('a');
      if (link) {
        links.push(link);
      }
    });
    if (links.length > 0) {
      initialLink = links[0];
setTimeout(function() {
  clickLink(initialLink); 
}, 1150); 
    }
  });
}
function updateProgress(percent) {
  document.getElementById('progress').innerText = `${percent}%`;
}
function simulateLoading() {
  let percent = 0;
  const interval = setInterval(() => {
    percent += 1;
    updateProgress(percent);
    if (percent >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        document.getElementById('progress').style.display = 'none';
      }, 1000); 
    }
  }, 45); 
}
simulateLoading();
const scrollContainer = document.querySelector('.main_container');

scrollContainer.addEventListener('wheel', (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY; 
});

let aboutMerch = document.querySelector('.about_merch');
  if(!isSmall){
    aboutMerch.classList.add('margin')
  } else{
    aboutMerch.classList.remove('margin')
  }
