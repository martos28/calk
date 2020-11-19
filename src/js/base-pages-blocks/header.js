import isContains from '../lib/isContains';

export default function header() {


  const $header = document.querySelector('.header');

  const headerScrollBehavior = () => {
    window.scrollY>0 ? $header.classList.add('header--active') : $header.classList.remove('header--active');
  };
  window.addEventListener('scroll', headerScrollBehavior());
  headerScrollBehavior();

  const $menuOpenBtn = $header.querySelector('.header_menuToggler');
  const $menuCloseBtn = $header.querySelector('.header_menuCloseBtn');
  const $headerMenu = $header.querySelector('.header_nav');

  const menuToggleBehavior = isOpen => {

    if(isOpen) {

      $headerMenu.classList.add('header_nav--opened');
      $header.classList.add('header--menuOpened');
      document.body.classList.add('fixed');

    }
    else {

      $headerMenu.classList.remove('header_nav--opened');
      $header.classList.remove('header--menuOpened');
      document.body.classList.remove('fixed');

    }

  };

  $menuOpenBtn.addEventListener('click', () => {
    menuToggleBehavior(true);
  });

  $menuCloseBtn.addEventListener('click', () => {
    menuToggleBehavior(false);
  });


  const $searchToggler = $header.querySelector('#searchButton');
  const $searchForm = $header.querySelector('.header_search');
  const $searchInp = $header.querySelector('.header_search_input');

  $searchToggler.addEventListener('click', () => {
    $searchForm.classList.add('active');
    $searchToggler.style.opacity = 0;
    $searchInp.focus();
  });

  document.addEventListener('click', e => {

    if(!isContains(e, $searchToggler) && !isContains(e, $searchForm)) {

      $searchForm.classList.remove('active');
      $searchToggler.style.opacity = 1;

    }

  });

}
