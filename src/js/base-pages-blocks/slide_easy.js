
import { Swiper, Navigation, Pagination, EffectFade } from 'swiper/js/swiper.esm.js';


Swiper.use([Navigation,Pagination,EffectFade]);

export default function SLIDERFADE() {
  const $fadeSliderContainer = document.querySelector('.js_form-slider');
  var fadeSlider = new Swiper($fadeSliderContainer, {
    autoHeight:true,
    simulateTouch:false,
    direction: 'horizontal',
    loop: false,
    slidesPerView:1,
    effect: 'fade', 
  });

  const btngo = document.querySelectorAll('.js-go');
  const popov = document.querySelectorAll('.popupOpener');
  if(btngo) {
    [...btngo].map(item => item.addEventListener('click', function(event) {
      const numSlidefromHtml = item.dataset.slide;
      console.log('bug1');
      fadeSlider.slideTo(numSlidefromHtml); 
    }));
  }
  if(popov) {
    [...popov].map(item => item.addEventListener('click', function(event) {
             
      setTimeout(() => fadeSlider.update(), 900);
      console.log('updater'); 
    }));
  }


    
    
} 
