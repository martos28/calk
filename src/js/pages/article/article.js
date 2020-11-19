import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm.js';
import gsap from 'gsap';

Swiper.use([Navigation, Pagination]); 

const setCaptionsHeight = (items, isResize=false) => {

  let height = 0;

  let current = 0;

  if(isResize) {

    for(let i = 0; i<items.length; i++) {

      if(items[i].style.display==='block') current = i;

      items[i].style.display = 'block';

    }

  }



  for(let i = 0; i<items.length; i++) {

    if(items[i].clientHeight>height) height = items[i].clientHeight;

    items[i].style.display = 'none';

  }

  items[0].parentNode.style.height = `${height}px`;

  if(isResize) items[current].style.display = 'block';

};

class ArticleSlider {
  constructor($el) {

    this.el = $el;

    this.parent = $el.parentNode.parentNode;

    this.prev = this.parent.querySelector('.article_slider_switchButton--prev');
    this.next = this.parent.querySelector('.article_slider_switchButton--next');

    this.captions = this.parent.querySelectorAll('.article_slider_caption');

  }
  init() {

    let vm = this;

    this.swiper = new Swiper(this.el, {
      direction: 'horizontal',
      speed: 750,
      navigation: {
        nextEl: this.next,
        prevEl: this.prev,
      },
      on: {
        slideChange(swiper) {
          if(vm.captions.length>0) vm.changeSlide(swiper);
        },
        init(swiper) {

          if(vm.captions.length>0) {

            setCaptionsHeight(vm.captions);

            window.addEventListener('resize', () => {
              setCaptionsHeight(vm.captions, true);
            });

            vm.changeSlide(swiper);

          }

        }
      }
    });

  }
  changeSlide(swiper) {

    for(let i=0; i<this.captions.length; i++) {

      if(this.captions[i].style.display === 'block') {
        gsap.to(
          this.captions[i],
          {
            display: 'none',
            opacity: 0,
            translateY: -10,
            duration: 0.5
          }
        );
      }

    }

    gsap.fromTo(
      this.captions[swiper.realIndex],
      {
        display: 'none',
        opacity: 0,
        translateY: 10
      },
      {
        display: 'block',
        opacity: 1,
        translateY: 0,
        duration: 0.75
      }
    );

  }

}

export default function article() {

  const $articleSlides = document.querySelectorAll('.article_slider_body');

  for(let i=0; i<$articleSlides.length; i++) {

    let slider = new ArticleSlider($articleSlides[i]);

    slider.init();

  }

  const shareImg = document.querySelector('.article_ahead_pic').src || document.querySelector('meta[name=ogimg]').content;

  const shareData = {
    url: `${location.href}/`,
    title: document.querySelector('meta[name=ogtitle]').content,
    text: document.querySelector('meta[name=ogdescription]').content,
    img: shareImg
  };

  const share = {
    vk: function() {
      let url  = 'http://vkontakte.ru/share.php?';
      url += 'url=' + encodeURIComponent(shareData.url);
      url += '&title=' + encodeURIComponent(shareData.text);
      url += '&image=' + encodeURIComponent(shareData.img);
      this.popup(url);
    },
    fb: function() {
      let url  = 'https://www.facebook.com/dialog/feed?app_id=294749321249487&display=popup';
      url += '&name=' + encodeURIComponent(shareData.title);
      url += '&description=' + encodeURIComponent(shareData.text);
      url += '&link=' + encodeURIComponent(shareData.url);
      this.popup(url);
    },
    tw: function() {
      let url  = 'http://twitter.com/share?';
      url += 'text=' + encodeURIComponent(shareData.title);
      url += '&url=' + encodeURIComponent(shareData.url);
      url += '&counturl=' + encodeURIComponent(shareData.url);
      this.popup(url);
    },
    ok: function() {
      let url = 'https://connect.ok.ru/offer';
      url += '?url=' + encodeURIComponent(shareData.url);
      url += '&title=' + encodeURIComponent(shareData.text);
      url += '&imageUrl=' + encodeURIComponent(shareData.img);
      this.popup(url);
    },
    popup: function(url) {
      window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
  };

  const $shareButtons = document.querySelectorAll('.article_share_item');

  for(let i=0; i<$shareButtons.length; i++) {

    $shareButtons[i].addEventListener('click', () => {

      share[$shareButtons[i].value].apply(share);

    });

  }

}
