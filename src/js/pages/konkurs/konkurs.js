import { Swiper, Pagination } from 'swiper/js/swiper.esm.js';
Swiper.use([Pagination]);  
class fuulW_Slider {
  constructor($el) {
    this.el = $el;
    this.parent = $el.parentNode.parentNode;
    this.bulletsEl = this.parent.querySelector('.swiper-pagination');
  }
  init() {
    let vm = this;
    this.swiper = new Swiper(this.el, {
      direction: 'horizontal',
      speed: 750,
      pagination: {
        el: vm.bulletsEl,
        type: 'bullets',
        clickable: true
      },
    });
  }
}
export default function konkurspage() {
  const $konkursSlides = document.querySelectorAll('.js_slider_konkurs');
  for(let i=0; i<$konkursSlides.length; i++) {
    let slider = new fuulW_Slider($konkursSlides[i]);
    slider.init();
  }
}
