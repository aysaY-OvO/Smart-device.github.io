import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions, accordions} from './modules/accordion/init-accordion';
import {initPhoneMask} from './utils/phone-mask';

// ---------------------------------
const headerLogotype = document.querySelector('[data-logotype="header-logotype"]');
const previewButton = document.querySelector('[data-button="preview-button"]');
const accordionParent = document.querySelector('.accordion');
const aboutBlock = document.querySelector('.about');
const aboutHiddenText = aboutBlock.querySelectorAll('.is-hidden');
const aboutButton = aboutBlock.querySelector('.about__button');
const mobileWidthOnlyHidden = aboutBlock.querySelector('.mobile-width-hidden');
const productsTitle = document.querySelector('[data-title="products-title"]');
const accordionButtons = document.querySelectorAll('[data-accordion="button"]');

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------
  const mobileBreakpoint = window.matchMedia('(min-width: 320px)');
  const tabletBreakpoint = window.matchMedia('(max-width: 767px)');

  const onChangeHeaderLogotype = () => {
    if (mobileBreakpoint.matches) {
      headerLogotype.setAttribute('xlink:href', './img/sprite.svg#logotype-mobile');
    } else if (tabletBreakpoint.matches) {
      headerLogotype.setAttribute('xlink:href', './img/sprite.svg#logotype-desktop');
    }
  };

  const onChangePreviewButton = () => {
    if (mobileBreakpoint.matches) {
      previewButton.textContent = 'бесплатная консультация';
    } else if (tabletBreakpoint.matches) {
      previewButton.textContent = 'Получить бесплатную консультацию';
    }
  };

  const accordionsBreakpointChecker = () => {
    if (tabletBreakpoint.matches) {
      accordions.closeAllAccordion(accordionParent);
    } else {
      accordions.fullUpdate();
    }
  };

  const showTabletText = () => {
    if (mobileBreakpoint.matches) {
      mobileWidthOnlyHidden.classList.add('mobile-width-hidden');
    } else if (tabletBreakpoint.matches) {
      mobileWidthOnlyHidden.classList.remove('mobile-width-hidden');
    }
  };

  const removeTabIndex = () => {
    accordionButtons.forEach((button) => {
      if (tabletBreakpoint.matches) {
        button.removeAttribute('tabIndex');
      } else {
        button.setAttribute('tabIndex', -1);
      }
    });
  };

  const showText = (btn, content) => {
    btn.addEventListener('click', () => {
      if (content.classList.contains('is-hidden')) {
        content.classList.remove('is-hidden');
        mobileWidthOnlyHidden.classList.remove('mobile-width-hidden');
        btn.textContent = 'Свернуть';
      } else {
        content.classList.add('is-hidden');
        mobileWidthOnlyHidden.classList.add('mobile-width-hidden');
        btn.textContent = 'Подробнее';
      }
    });
  };

  const onChangeProductsTitle = () => {
    if (tabletBreakpoint.matches) {
      productsTitle.innerHTML = 'Товары и&nbsp;услуги <br> Smart Device';
    } else {
      productsTitle.innerHTML = 'Smart Device предлагает следующие товары и&nbsp;услуги';
    }
  };

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    mobileBreakpoint.addListener(showTabletText);
    tabletBreakpoint.addListener(accordionsBreakpointChecker);
    mobileBreakpoint.addListener(onChangeProductsTitle);
    mobileBreakpoint.addListener(onChangePreviewButton);
    mobileBreakpoint.addListener(onChangeHeaderLogotype);
    tabletBreakpoint.addListener(removeTabIndex);
    initPhoneMask();
    aboutHiddenText.forEach((text) => {
      showText(aboutButton, text);
    });
    const form = new Form();
    window.form = form;
    form.init();
    initModals();
    initAccordions();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
