// xOarena/js/carousel.js
(function() {
  window.initCarousel = function() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    if (!track || dots.length === 0) return;

    let currentIndex = 0;
    const slideCount = track.children.length;
    let autoInterval;

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
      const next = (currentIndex + 1) % slideCount;
      goToSlide(next);
    }

    function startAuto() {
      autoInterval = setInterval(nextSlide, 3000);
    }

    function stopAuto() {
      clearInterval(autoInterval);
    }

    // Dot click
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAuto();
        goToSlide(parseInt(dot.dataset.index));
        startAuto();
      });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      stopAuto();
    });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          currentIndex = (currentIndex + 1) % slideCount;
        } else {
          currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        }
        goToSlide(currentIndex);
      }
      startAuto();
    });

    goToSlide(0);
    startAuto();
  };
})();