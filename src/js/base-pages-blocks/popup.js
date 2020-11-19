import gsap from 'gsap';
import {TimelineLite} from 'gsap';

gsap.registerPlugin(TimelineLite);

export default function popup() {

  let tl = gsap.timeline({ defaults: {duration: 1} });

  const openers = document.querySelectorAll('.popupOpener');

  for(let i = 0; i<openers.length; i++) {

    openers[i].addEventListener('click', () => {
       
      let popup = document.querySelector(openers[i].dataset.src);
      let popupBody = popup.querySelector('.popup_body');

      tl.to(popup, {display: 'flex', opacity: 1, duration: 0.5})
        .to(popupBody, {opacity: 1, duration: 0.5});

    });

  }

  let popups = document.querySelectorAll('.popup');

  


  for(let i = 0; i<popups.length; i++) {
    const hidePop = function() {
      let popupBody = popups[i].querySelector('.popup_body');
      tl.to(popupBody, {opacity: 0, duration: 0.5})
        .to(popups[i], {display: 'none', opacity: 0, duration: 0.5});
    };
    popups[i].querySelector('.popup_close').addEventListener('click', () => {
      let popupVideo = popups[i].querySelector('video');
      if(popupVideo) {
        popupVideo.pause();
      }
      hidePop();
    });
    popups[i].addEventListener('click', (e) => {
      if(e.target.tagName === 'SECTION' && e.target.className === 'popup') {
        hidePop();
      }
    });
  }

}
