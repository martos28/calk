import { Swiper, Navigation, Pagination, Autoplay } from 'swiper/js/swiper.esm.js';
  
import gsap from 'gsap';

Swiper.use([Navigation, Pagination, Autoplay ]);


export default function mainPage() {

  const $lastNewsSliderContainer = document.querySelector('.mainSlider_container');
  const $lastNewsSliderImages = document.querySelectorAll('.mainSlider_img');

  const lastNewsSlider = new Swiper($lastNewsSliderContainer, {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 750,
    pagination: {
      el: '.mainSlider_pagination',
      bulletClass: 'mainSlider_pagination_bullet',
      bulletActiveClass: 'mainSlider_pagination_bullet--active',
      clickable: true
    },
  });
  
  lastNewsSlider.on('slideChange', function(sw) {
    for (let i=0; i<$lastNewsSliderImages.length; i++) {
      if(i !== lastNewsSlider.realIndex) { 
        $lastNewsSliderImages[i].classList.remove('mainSlider_img--active');
      }
      else {
        $lastNewsSliderImages[i].classList.add('mainSlider_img--active');
      }
    }
      
  }); 



  const $freshNewsFilterMapPoints = document.querySelectorAll('.freshNews_filter_map_point');

  for(let i = 0; i<$freshNewsFilterMapPoints.length; i++) {

    $freshNewsFilterMapPoints[i].addEventListener('click', () => {
      console.log($freshNewsFilterMapPoints[i].dataset.point);
    });

  }

  const $video = document.querySelector('.main-media_video_item');
  const $videoPlayToggler = document.querySelector('.main-media_video_play');
  const $videoBlock = document.querySelector('.main-media_video');
  const $videoContentBlock = $videoBlock.querySelector('.main-media_video_data');

  $videoBlock.addEventListener('click', () => {

    if($video.paused) {

      $video.play();
      gsap.to($videoPlayToggler, {opacity:0, duration: 0.5, autokill: true});
      gsap.to($videoContentBlock, {opacity:0, translateY: '100%', duration: 0.5, delay: 0.25, autokill: true});

    }
    else {

      $video.pause();
      gsap.to($videoPlayToggler, {opacity:1, duration: 0.5, delay: 0.25, autokill: true});
      gsap.to($videoContentBlock, {opacity:1, translateY: '0%', duration: 0.5, autokill: true});

    }


  });

  $video.addEventListener('ended', () => {

    $video.pause();
    $video.currentTime = 0;

    gsap.to($videoPlayToggler, {opacity:1, duration: 0.5, delay: 0.25, autokill: true});
    gsap.to($videoContentBlock, {opacity:1, translateY: '0%', duration: 0.5, autokill: true});

  });


}
