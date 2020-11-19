import {gsap} from 'gsap';
import interact from 'interactjs';
import isContains from '../lib/isContains';

export default function ahead() {

  const $aheadFilterSelectorToggler = document.querySelector('.ahead_filter_button_foundPoint');
  const $aheadFilterSelectorList = document.querySelector('.ahead_filter_list_foundPoint');
  const $aheadFilterSelector = document.querySelector('.ahead_filter_selector_foundPoint');

  const toggleFreshNewsFilterSelectorList = isOpened => {

    if(isOpened) {
      gsap.fromTo($aheadFilterSelectorList, {
        display: 'block',
        opacity: 1
      }, {
        display: 'none',
        opacity: 0,
        autokill: true,
        duration: 0.7
      });
    }
    else {
      gsap.fromTo($aheadFilterSelectorList, {
        display: 'none',
        opacity: 0
      }, {
        display: 'block',
        opacity: 1,
        autokill: true,
        duration: 0.7
      });
    }

  };

  $aheadFilterSelectorToggler.addEventListener('click', () => {

    toggleFreshNewsFilterSelectorList( $aheadFilterSelectorList.style.display === 'block' );

  });

  document.addEventListener('click', e => {

    if (!isContains(e, $aheadFilterSelector) && $aheadFilterSelectorList.style.display === 'block') {

      toggleFreshNewsFilterSelectorList(true);

    }

  });


  const $aheadMap = document.querySelector('.ahead_filter_map');
  const $aheadMapWrapper = document.querySelector('.ahead_mapWrapper');
  const $aheadMapZoomers = document.querySelectorAll('.ahead_mapZoomer');


  let mapScale = 1;

  const scaleMap = (value, btn) => {

    mapScale += parseInt(value)/10;

    gsap.to($aheadMap, {scaleX: mapScale, scaleY: mapScale, duration: 0.25, autokill: true, onComplete: checkScaleState(btn)});

  };

  const checkScaleState = btn => {

    if(mapScale<=1) {
      btn.disabled = true;
    }
    else if(mapScale>=2) {
      btn.disabled = true;
    }
    else {

      console.log(mapScale);

      for(let i = 0; i<$aheadMapZoomers.length; i++) {
        $aheadMapZoomers[i].disabled = false;
      }
    }


  };

  for(let i = 0; i<$aheadMapZoomers.length; i++) {

    $aheadMapZoomers[i].addEventListener('click', () => {

      scaleMap($aheadMapZoomers[i].dataset.v, $aheadMapZoomers[i]);

    });

  }



  interact('.ahead_mapWrapper')
    .draggable({
      // enable inertial throwing
      inertia: false,
      // enable autoScroll
      autoScroll: true,

      listeners: {
        start() {
          $aheadMap.style.cursor = 'move';
        },
        end() {
          $aheadMap.style.cursor = 'default';
        },
        move(event) {
          var target = $aheadMapWrapper;
          // keep the dragged position in the data-x/data-y attributes
          var x = (parseFloat($aheadMapWrapper.getAttribute('data-x')) || 0) + event.dx;
          var y = (parseFloat($aheadMapWrapper.getAttribute('data-y')) || 0) + event.dy;

          gsap.to($aheadMap, {translateY: y, translateX: x, duration: 0.001, autokill: true});

          // update the posiion attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        },
      }
    });


}
