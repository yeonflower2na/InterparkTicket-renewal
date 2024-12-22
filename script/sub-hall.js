// 헤더 불러오기
fetch('header.html')
  .then((res) => res.text())
  .then((data) => {
    document.querySelector('.header-include').innerHTML = data;
    let resInfo = document.querySelector('.res-hdr-top-right > .res-info');
    let resMenu = document.querySelector('.res-hdr-top-right > .res-menu');
    let sideMenuContainer = document.querySelector('.side-menu-container');

    resMenu.addEventListener('click', function () {
      document.querySelector('.header-include').style.zIndex =
        sideMenuContainer.style.transition = 'all .6s ease';
      sideMenuContainer.style.transform = 'translateX(0)';
    });
    document
      .querySelector('.side-menu-hdr > .close-btn')
      .addEventListener('click', function () {
        sideMenuContainer.style.transform = 'translateX(100%)';
      });
    document
      .querySelector('.header-include-hall .hdr-logo')
      .setAttribute('src', `img/sub-hall-img/hdr-subhall-logo.svg`);
    document
      .querySelector('.header-include-hall .dropdown-icon')
      .setAttribute('src', `img/sub-hall-img/hdr-subhall-dropdown.svg`);

    //로그인 모달 불러오기
    fetch('login-modal.html')
      .then((res) => res.text())
      .then((data) => {
        document.querySelector('.login-modal-include').innerHTML = data;

        //===============//
        const loginSuccessBox = document.querySelector('.login-success-box');
        const loginBoxTop = document.querySelector(
          '.login-area .login-box-top'
        );
        const loginForm = document.querySelector('.login-box form');
        const recentReservationH5 = document.querySelector(
          '.recent-reservation-top>h5'
        );

        initLoginSetting();
        //로그인 모달 열기
        document
          .querySelector('.hdr-top-right .sub-login-link')
          .addEventListener('click', function () {
            document.querySelector('.login-modal').style.display = 'flex';
          });
        resInfo.addEventListener('click', function () {
          document.querySelector('.login-modal').style.display = 'flex';
        });
        // 로그인 모달 닫기
        document
          .querySelector('.login-modal .responsive-close-btn')
          .addEventListener('click', function () {
            document.querySelector('.login-modal').style.display = 'none';
          });
        document
          .querySelector('.login-modal')
          .addEventListener('click', function (e) {
            if (e.target === this) {
              document.querySelector('.login-modal').style.display = 'none';
            } else {
              console.log(e.target, this);
            }
          });

        //로그인 버튼 누르면 (아이디:abc123,비밀번호:abc123)
        document
          .querySelector('.login-area .login-btn')
          .addEventListener('click', function (e) {
            e.preventDefault();
            let userIdInput = document.getElementById('login-id');
            let userPwInput = document.getElementById('login-pw');
            let getInfo = JSON.parse(localStorage.getItem('correctLoginInfo'));

            if (userIdInput.value === '' || userPwInput.value === '') {
              alert('빈 칸이 있습니다.');
            } else if (getInfo.id !== userIdInput.value) {
              alert('아이디가 올바르지 않습니다.');
            } else if (getInfo.pw !== userPwInput.value) {
              alert('비밀번호가 올바르지 않습니다.');
            } else if (
              getInfo.id === userIdInput.value &&
              getInfo.id === userIdInput.value
            ) {
              alert('로그인에 성공하셨습니다.');
              userIdInput.value = null;
              userPwInput.value = null;
              loginBoxTop.style.display = 'none';
              loginForm.style.display = 'none';
              loginSuccessBox.style.display = 'block';
              localStorage.setItem('loginState', JSON.stringify(true));
            }
          });
        document
          .querySelector('.login-success-box-top .logout-btn')
          .addEventListener('click', function (e) {
            e.preventDefault();
            alert('로그아웃 하셨습니다');
            loginBoxTop.style.display = 'flex';
            loginForm.style.display = 'block';
            loginSuccessBox.style.display = 'none';
            localStorage.setItem('loginState', JSON.stringify(false));
          });

        // 큐알 앱 로그인
        const appLoginBox = document.querySelector('.app-login-box');
        const radioWrap = document.querySelector('.login-area .radio-wrap');
        let remainInterVal = null;
        radioWrap.addEventListener('change', function (e) {
          let loginIdWrap = document.querySelector('.login-id-wrap');
          let loginPwWrap = document.querySelector('.login-pw-wrap');
          let loginBtn = document.querySelector('.login-area .login-btn');
          let desc = document.querySelector('.app-login-box > .desc');
          let remainingTime = document.querySelector('#remaining-time');
          if (remainInterVal !== null) {
            clearInterval(remainInterVal);
            desc.innerText = `카메라 실행 후 QR코드를 스캔해주세요.`;
            remainingTime.innerText = `남은시간 : 05분 00초`;
            remainingTime.style.color = 'var(--purple)';
          }
          if (e.target.value === '인터파크티켓앱') {
            appLoginBox.style.display = 'block';
            loginIdWrap.style.display = 'none';
            loginPwWrap.style.display = 'none';
            loginBtn.style.display = 'none';
            let remainMs = 300000;
            remainInterVal = setInterval((a, b) => {
              if (remainMs > 0) {
                let min = Math.floor(remainMs / 1000 / 60);
                let sec = Math.floor(remainMs / 1000);
                let m = `0${min}`;
                let s = `0${sec - min * 60}`;
                desc.innerText = `카메라 실행 후 QR코드를 스캔해주세요.`;
                remainingTime.innerText = `남은시간 : ${m.slice(
                  m.length - 2,
                  m.length
                )}분 ${s.slice(s.length - 2, s.length)}초`;
                remainMs -= 1000;
              } else {
                desc.innerText =
                  '로그인 인증시간이 만료되었습니다. 새로고침 후 다시 시도하세요';
                remainingTime.innerText = '남은시간 : 00분 00초';
                remainingTime.style.color = 'red';
                clearInterval(remainInterVal);
              }
            }, 1000);
          } else if (e.target.value === '간편로그인') {
            appLoginBox.style.display = 'none';
            loginIdWrap.style.display = 'block';
            loginPwWrap.style.display = 'block';
            loginBtn.style.display = 'block';
          }
        });
      })
      .catch((err) => console.log(err));
    function clickSearchBox() {
      document.querySelector('.search-container').classList.add('show');
      document.querySelector('.header-include').style.position = 'relative';

      document.querySelector('.header-include').style.zIndex = 51;
    }

    document
      .querySelector('.search-box')
      .addEventListener('click', function () {
        clickSearchBox();
      });

    document
      .querySelector('.search-close-btn')
      .addEventListener('click', function () {
        document.querySelector('.search-container').classList.remove('show');
      });

    //검색기능

    function searchFunction() {
      let searchInput = document.querySelector('.click-search-box input');
      let searchKeyword = document.querySelectorAll('.rec-search-keyword a');

      searchKeyword.forEach((a) => {
        a.addEventListener('click', function () {
          let method = 'click';
          let keyword = this.textContent.split(' ').join('');
          searchInputEvent(keyword, method);
        });
      });
      searchInput.addEventListener('input', function (e) {
        let method = 'input';
        searchInputEvent(e.target.value.split(' ').join(''), method);
      });
    }
    searchFunction();
    function searchInputEvent(value, method) {
      let getTicketOpenData = JSON.parse(
        localStorage.getItem('ticketOpenData')
      );
      let searchTapContent = document.querySelector('.search-top-content');
      if (value.length > 0) {
        let filter = getTicketOpenData.filter((a) => {
          return a.title
            .split(' ')
            .join('')
            .includes(value.split(' ').join(''));
        });
        if ([...searchTapContent.children].length !== 0) {
          [...searchTapContent.children].forEach((a) => {
            a.remove();
          });
        }
        if (filter.length > 4) {
          filter = filter.splice(0, 4);
        }

        let template = '';

        filter.forEach((a) => {
          if (method === 'input') {
            let title = a.title.split(' ').join('');

            let findString = value;

            let regex = new RegExp(findString, 'g');

            title = title.replace(
              regex,
              `<span style="color:var(--purple) ;font-weight:600; ">${findString}</span>`
            );

            template += `<a data-id="${a.id}" href="#none " class="search-top-item">
            <div class="imgWrap">
              <img src="${a.poster}" alt="${a.alt}" />
            </div>
            <span>${title}</span>
          </a>`;
          } else if (method === 'click') {
            template += `<a data-id="${a.id}" href="#none" class="search-top-item">
            <div class="imgWrap">
              <img src="${a.poster}" alt="${a.alt}" />
            </div>
            <span>${a.title}</span>
          </a>`;
          }
        });

        searchTapContent.insertAdjacentHTML('beforeend', template);
        document
          .querySelectorAll('.search-top-content .search-top-item')
          .forEach((a) => {
            a.addEventListener('click', function () {
              localStorage.setItem('detailId', JSON.stringify(this.dataset.id));
              location.href = 'sub-reservation.html';
            });
          });
      }
    }
  })
  .catch((err) => console.log(err));
// 푸터 불러오기
fetch('footer.html')
  .then((res) => res.text())
  .then((data) => {
    document.querySelectorAll('.footer-include').forEach((a) => {
      a.innerHTML = data;
    });
  })
  .catch((err) => console.log(err));

//페이지 로드 시 로그인 초기 설정
function initLoginSetting() {
  const loginSuccessBox = document.querySelector('.login-success-box');
  const loginBoxTop = document.querySelector('.login-area .login-box-top');
  const loginForm = document.querySelector('.login-box form');
  if (JSON.parse(localStorage.getItem('loginState')) == null) {
    localStorage.setItem('loginState', JSON.stringify(false));
  } else {
    if (JSON.parse(localStorage.getItem('loginState')) === true) {
      loginBoxTop.style.display = 'none';
      loginForm.style.display = 'none';
      loginSuccessBox.style.display = 'block';
    } else {
      loginBoxTop.style.display = 'flex';
      loginForm.style.display = 'block';
      loginSuccessBox.style.display = 'none';
    }
  }
  if (JSON.parse(localStorage.getItem('correctLoginInfo')) == null) {
    localStorage.setItem(
      'correctLoginInfo',
      JSON.stringify({ id: 'abc123', pw: 'abc123' })
    );
  }
}

// hallLocationTapSwiper

const hallLocationTapSwiper = new Swiper('.hallLocationTapSwiper', {
  navigation: {
    nextEl: '.swiper-button-next.hall-tap-next',
    prevEl: '.swiper-button-prev.hall-tap-prev',
  },
  pagination: {
    el: '.swiper-pagination.hall-tap-pagination',
    clickable: true,
  },

  slidesPerView: 'auto',
  initialSlide: 4,
  spaceBetween: 20,
  centeredSlides: true,
  slideToClickedSlide: true,
  //hall location tap
  on: {
    init: function (e) {
      let hallLocationTapMenu = document.querySelectorAll(
        '.hallLocationTapSwiper .swiper-slide'
      );

      let find = locationArr.find((a) => {
        return (
          a.place.split('').join('') ===
          hallLocationTapMenu[this.activeIndex].dataset.name
        );
      });
    },
    activeIndexChange: function () {
      let hallLogoImg = document.querySelectorAll(
        '.hall-location-logo-wrap img'
      );
      let hallLocationTapMenu = document.querySelectorAll(
        '.hallLocationTapSwiper .swiper-slide'
      );
      let hallLocationTapContent = document.querySelectorAll(
        '.hall-location .tap-content>ul>li>a>img'
      );
      hallLogoImg.forEach((a) => {
        a.classList.remove('selected');
      });
      hallLogoImg[this.realIndex].classList.add('selected');
      hallLocationTapContent.forEach((a, i) => {
        a.setAttribute(
          'src',
          `img/sub-hall-img/${hallLocationTapMenu[this.realIndex].dataset.name}0${
            i + 1
          }.gif`
        );
      });

      let find = locationArr.find((a) => {
        return (
          a.place.split('').join('') ===
          hallLocationTapMenu[this.activeIndex].dataset.name
        );
      });
      cityhall = new naver.maps.LatLng(find.lat[0], find.lat[1]);
      map.panTo(cityhall);
      naver.maps.Event.trigger(map, 'resize');
      map.setCenter(cityhall);
    },
  },
});

//hallAdSwiper
const hallAdSwiper = new Swiper('.hallAdSwiper', {
  navigation: {
    nextEl: '.swiper-button-next.hall-ad-next',
    prevEl: '.swiper-button-prev.hall-ad-prev',
  },
  pagination: {
    el: '.swiper-pagination.hall-ad-pagination',
  },
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    0: {
      slidesPerView: 1,
    },
  },
});

// hallRecommend
const hallRecommend = document.querySelector('.hall-recommend-wrapper');
const hallRecommendItems = Array.from(hallRecommend.children);
let currentIndex = 0;

function updateCarousel() {
  let positions;
  if (window.innerWidth > 1200) {
    positions = [
      { class: 'hall-recommend-far-left-4' },
      { class: 'hall-recommend-far-left-3' },
      { class: 'hall-recommend-far-left-2' },
      { class: 'hall-recommend-far-left-1' },
      { class: 'hall-recommend-left' },
      { class: 'hall-recommend-center' },
      { class: 'hall-recommend-right' },
      { class: 'hall-recommend-far-right-1' },
      { class: 'hall-recommend-far-right-2' },
      { class: 'hall-recommend-far-right-3' },
      { class: 'hall-recommend-far-right-4' },
    ];
  } else if (window.innerWidth > 768) {
    positions = [
      { class: 'hall-recommend-far-left-1' },
      { class: 'hall-recommend-left' },
      { class: 'hall-recommend-center' },
      { class: 'hall-recommend-right' },
      { class: 'hall-recommend-far-right-1' },
    ];
  } else {
    positions = [
      { class: 'hall-recommend-left' },
      { class: 'hall-recommend-center' },
      { class: 'hall-recommend-right' },
    ];
  }

  hallRecommendItems.forEach((item, index) => {
    item.className = 'hall-recommend-item';
    const positionIndex =
      (index - currentIndex + hallRecommendItems.length) %
      hallRecommendItems.length;

    if (positions[positionIndex]) {
      item.classList.add(positions[positionIndex].class);
    }
  });
}

// 슬라이드 이동 함수
function moveNext() {
  currentIndex = (currentIndex + 1) % hallRecommendItems.length;
  updateCarousel();
}
function movePrev() {
  currentIndex =
    (currentIndex - 1 + hallRecommendItems.length) % hallRecommendItems.length;
  updateCarousel();
}

let startX = 0;
let isDragging = false;

document
  .querySelector('.hall-recommend-container')
  .addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    e.preventDefault();
  });

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  if (diff > 100) {
    movePrev();
    isDragging = false;
  } else if (diff < -100) {
    moveNext();
    isDragging = false;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document
  .querySelector('.hall-recommend-container')
  .addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - startX;
  if (diff > 100) {
    movePrev();
    isDragging = false;
  } else if (diff < -100) {
    moveNext();
    isDragging = false;
  }
});

document.addEventListener('touchend', () => {
  isDragging = false;
});

updateCarousel();

setInterval(moveNext, 5000);
window.addEventListener('resize', updateCarousel);

//best기획 탭

//best기획 변수
const bestPlanTap = document.querySelectorAll('.hall-best-plan .right-box>li');
const bestPlanImg = document.querySelectorAll('.hall-best-plan .left-box>a');

//best기획 interVal
idx = 1;

let bestPlanInterVal = setInterval(() => {
  if (idx <= bestPlanTap.length - 1) {
    changeBestPlanContent(idx);
    idx++;
  } else {
    changeBestPlanContent(0);
    idx = 1;
  }
}, 3000);

//best기획 초기 설정
function initBestPlan() {
  bestPlanTap[0].classList.add('selected');
  bestPlanImg[0].classList.add('selected');
}
initBestPlan();

//best기획 탭 호버 시
bestPlanTap.forEach((a, i) => {
  bestPlanTap[i].addEventListener('mouseover', function () {
    changeBestPlanContent(i);
    clearInterval(bestPlanInterVal);
    idx = i + 1;
    bestPlanInterVal = setInterval(() => {
      if (idx <= bestPlanTap.length - 1) {
        changeBestPlanContent(idx);
        idx++;
      } else {
        changeBestPlanContent(0);
        idx = 1;
      }
    }, 3000);
  });
});

function changeBestPlanContent(i) {
  bestPlanImg.forEach((b) => {
    b.classList.remove('selected');
  });
  bestPlanTap.forEach((c) => {
    c.classList.remove('selected');
  });
  bestPlanTap[i].classList.add('selected');
  bestPlanImg[i].classList.add('selected');
}

//hallTourSwiper01
let hallTourSwiper01 = new Swiper('.hallTourSwiper01', {
  slidesPerView: 7.5,
  spaceBetween: 50,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
  },
  loop: true,
  speed: 3000,
  breakpoints: {
    1400: {
      slidesPerView: 7,
      spaceBetween: 50,
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 3.5,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
let hallTourSwiper02 = new Swiper('.hallTourSwiper02', {
  slidesPerView: 7.5,
  spaceBetween: 50,
  autoplay: {
    delay: 1,
    reverseDirection: true,
    disableOnInteraction: false,
  },
  breakpoints: {
    1400: {
      slidesPerView: 7,
      spaceBetween: 50,
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 3.5,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  loop: true,
  speed: 3000,
});

//hallTourSwiper호버하면 멈춰지게
document.querySelectorAll('.hallTourSwiper01').forEach((a) => {
  a.addEventListener('mouseover', function () {
    hallTourSwiper01.autoplay.stop();
  });
  a.addEventListener('mouseout', function () {
    hallTourSwiper01.autoplay.start();
  });
});
document.querySelectorAll('.hallTourSwiper02').forEach((a) => {
  a.addEventListener('mouseover', function () {
    hallTourSwiper02.autoplay.stop();
  });
  a.addEventListener('mouseout', function () {
    hallTourSwiper02.autoplay.start();
  });
});

//대표 공연 반응형 호버 이벤트
let hallTapList = document.querySelectorAll(
  '.hall-location .tap-content > ul > li '
);
hallTapList.forEach((a) => {
  a.addEventListener('mouseenter', function () {
    if (window.innerWidth > 1024) {
      this.children[0].style.transform = `translateY(-20px)`;
    } else {
      this.children[0].style.transform = `scale(1.1)`;

      hallTapList.forEach((b) => {
        b.style.zIndex = 0;
      });
      this.style.zIndex = 1;
    }
  });

  a.addEventListener('mouseleave', function (e) {
    if (window.innerWidth > 1024) {
      this.children[0].style.transform = `translateY(0)`;
    } else {
      this.children[0].style.transform = `scale(1)`;
    }
    hallTapList.forEach((b) => {
      b.style.zIndex = 0;
    });
  });
});

//공연장 애니메이션
let hallLocation = document.querySelector('.hall-location');
let hdrHall = document.querySelector('.header-include-hall');
let hallLocationScale = hallLocation.parentElement;

matchMedia('(max-width : 768px)').addEventListener('change', function () {
  if (this.matches) {
    window.removeEventListener('scroll', hallLocationScrollEvent);
    hallLocation.style.transition = 'none';
    hallLocation.style.opacity = `1`;
    hallLocation.style.transform = `perspective(0) translate3d(0,0,0) rotateY(0deg)`;
  } else {
    let progress = this.scrollY / this.innerHeight;
    if (progress === 0) {
      window.addEventListener('scroll', hallLocationScrollEvent);
    }
  }
});
function initHallEvent() {
  if (window.innerWidth >= 768) {
    window.addEventListener('scroll', hallLocationScrollEvent);
  } else {
    hallLocation.style.transition = 'none';
    hallLocation.style.opacity = `1`;
    hallLocation.style.transform = `perspective(0) translate3d(0,0,0) rotateY(0deg)`;
  }
}
initHallEvent();

function hallLocationScrollEvent() {
  let tapArea = document.querySelector('.hall-location .tap-area');
  let progress = this.scrollY / this.innerHeight;
  hallLocation.style.transition = 'all 0.5s linear';
  if (progress <= 1) {
    hallLocation.style.opacity = `${progress}`;
    hallLocation.style.transform = `perspective(800px) translate3d(0,0,${
      300 * (progress - 1)
    }px) rotateY(0deg)`;
  } else if (progress > 1) {
    progress = 1;
    hallLocation.style.boxShadow = 'none';
    hallLocation.style.opacity = `${progress}`;
    hallLocation.style.transform = `perspective(800px) translate3d(0,0,${
      300 * (progress - 1)
    }px) rotateY(0deg)`;
  }
  if (300 * (progress - 1) === 0) {
    window.removeEventListener('scroll', hallLocationScrollEvent);
  }
  // resizeMap(map, cityhall, progress);
}

// function resizeMap(map, center, progress) {
//   setTimeout(function () {
// // naver.maps.Event.trigger(map, 'resize');
// map.setCenter(cityhall);
//     if (progress > 1) {
//       window.removeEventListener('scroll', hallLocationScrollEvent);
//     }
//   }, 0);
// }
