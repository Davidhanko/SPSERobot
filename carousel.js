//I DO WARN YOU, ONLY GOD KNOWS HOW THIS WORKS, ONCE I WAKE UP TOMMOROW I WILL HAVE NO IDEA HOW I DID THIS

let slideIndex = 0; // SELECTS THE FIRST SLIDE
let slides = document.querySelectorAll('.carousel-screen');

// Add position: relative to each .carousel-screen element
slides.forEach(slide => {
  slide.style.position = 'relative';
});

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'block';

  // setTimeout(showSlides, 10000);
}

showSlides();

// We do -1 for slideIndex, cause we want to start at 1
// Example,
// If we didn't subtract 1, slideIndex would start at 1
// but slides[1] would actually refer to the second slide in the array (zero-indexed)
// By subtracting 1, we ensure that slides[slideIndex-1] refers to the correct slide
// where slideIndex starts at 1 for the first slide in the carousel

function nextSlide() {
  fadeOutCurrentSlide();
  setTimeout(() => {
    slides[slideIndex - 1].style.display = 'none';
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    setAnimations('next');
  }, 500); // Wait for fade-out animation to complete
}

function prevSlide() {
  fadeOutCurrentSlide();
  setTimeout(() => {
    slides[slideIndex - 1].style.display = 'none';
    slideIndex--;
    if (slideIndex < 1) {
      slideIndex = slides.length;
    }
    slides[slideIndex - 1].style.display = 'block';
    setAnimations('prev');
  }, 500); // Wait for fade-out animation to complete
}

function fadeOutCurrentSlide() {
  slides[slideIndex - 1].classList.add('slide-in-bottom');
  setTimeout(() => {
    slides[slideIndex - 1].classList.remove('slide-in-bottom');
  }, 500); // Remove fade-out class after 500ms
}

function setAnimations(direction) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('slide-in-left', 'slide-in-right');
  }

  if (direction === 'next') {
    slides[slideIndex - 1].classList.add('slide-in-right');
    if (slideIndex > 1) {
      slides[slideIndex - 2].classList.add('slide-in-left');
    } else {
      slides[slides.length - 1].classList.add('slide-in-left');
    }
  } else if (direction === 'prev') {
    slides[slideIndex - 1].classList.add('slide-in-left');
    if (slideIndex < slides.length) {
      slides[slideIndex].classList.add('slide-in-right');
    } else {
      slides[0].classList.add('slide-in-right');
    }
  }
}

//Make scroll work and disable scrolling when animation is happening
let scroll = true;
document.addEventListener('wheel', (event) => {
  if (scroll) {
    scroll = false;
    if (event.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    setTimeout(() => {
      scroll = true;
    }, 2000);
  }
});



//Made by Dávid Hanko, davihan11 on Discord