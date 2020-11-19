import svg4everybody from 'svg4everybody';  
import detectTouch from './lib/detectTouch'; 
import MAIN_PAGE from './pages/main/mainPage';
import HEADER from './base-pages-blocks/header';
import FOOTER from './base-pages-blocks/footer';
import AHEAD from './base-pages-blocks/ahead';
import ARTICLE from './pages/article/article';
import KONKURSPAGE from './pages/konkurs/konkurs';
import POPUP from './base-pages-blocks/popup';
import SLIDERFADE from './base-pages-blocks/slide_easy';
import FORMSVALIDATE from './base-pages-blocks/formsvalidate';   

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  return false;
}


if(!!detectIE()) {

  if (!Number.isNan) {
    Object.defineProperty(Number, 'isNaN', {
      value: function(value) {
        return value !== value;
      }
    });
  }

  svg4everybody({ 
    nosvg: true,
    polyfill: true
  });

}
else{
  document.body.classList.add('not-ie');
}

const checkTouch = () => {
  if(detectTouch() && window.innerWidth<860) { document.body.classList.add('isTouch'); }
  else { document.body.classList.remove('isTouch'); }
};

checkTouch();

window.addEventListener('resize', () => {
  checkTouch();
});


const $lastNewsSliderContainer = document.querySelector('.mainSlider_container');
if(!!$lastNewsSliderContainer) MAIN_PAGE();

const $aheadFilterSelectorToggler = document.querySelector('.ahead_filter_button_foundPoint');
if(!!$aheadFilterSelectorToggler) AHEAD();

const $articleContainer = document.querySelector('.article');
if(!!$articleContainer) ARTICLE();

const $slider_konkurs = document.querySelector('.js_slider_konkurs');
if(!!$slider_konkurs) KONKURSPAGE();

const $popups = document.querySelectorAll('.popupOpener');
if(!!$popups) POPUP();

const $forms = document.querySelector('.forms');
if($forms) FORMSVALIDATE();

const $slidermy= document.querySelectorAll('.js_form-slider');
if(!!$slidermy) SLIDERFADE();


HEADER();
FOOTER();


