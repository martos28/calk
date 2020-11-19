import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

export default function FOOTER() {

  gsap.registerPlugin(ScrollToPlugin);

  const $goTopBtn = document.querySelector('.footer_goTop');

  $goTopBtn.addEventListener('click', () => {
    gsap.to(window, {duration: 1.5, scrollTo: 0});
  });


}
