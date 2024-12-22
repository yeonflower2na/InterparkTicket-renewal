// 헤더 불러오기
fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector(".header-include").innerHTML = data;
    let resInfo = document.querySelector(".res-hdr-top-right > .res-info");
    let resMenu = document.querySelector(".res-hdr-top-right > .res-menu");
    let sideMenuContainer = document.querySelector(".side-menu-container");
    let sideMenuMatch = matchMedia("(min-width:1200px)");

    resMenu.addEventListener("click", function () {
      document.querySelector(".header-include").style.zIndex =
        Number(getComputedStyle(document.querySelector("main")).zIndex) + 1;
      sideMenuContainer.style.transform = "translateX(0)";
      sideMenuContainer.style.transition = "all .6s ease";
    });

    document
      .querySelector(".side-menu-hdr > .close-btn")
      .addEventListener("click", function () {
        sideMenuContainer.style.transform = "translateX(100%)";
      });

    //메인 반응형 사이드 회원정보 열기
    document
      .querySelector(".res-hdr-top-right > a:nth-child(1)")
      .addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector("main").style.zIndex =
          Number(
            getComputedStyle(document.querySelector(".header-include")).zIndex
          ) + 1;
        document.querySelector(".main-right").style.transition = "all .6s ease";
        document.querySelector(".main-right").style.transform = "translateX(0)";
      });

    sideMenuMatch.addEventListener("change", function () {
      if (this.matches) {
        sideMenuContainer.style.transform = "translateX(100%)";
      }
    });

    //검색창 클릭이벤트
    function clickSearchBox() {
      document.querySelector(".search-container").classList.add("show");
      document.querySelector(".header-include").style.position = "relative";
      document.querySelector("main").style.position = "relative";
      document.querySelector(".header-include").style.zIndex = 51;
      document.querySelector("main").style.zIndex = 50;
    }

    document
      .querySelector(".search-box")
      .addEventListener("click", function () {
        clickSearchBox();
      });

    document
      .querySelector(".search-close-btn")
      .addEventListener("click", function () {
        document.querySelector(".search-container").classList.remove("show");
      });
    //반응형 검색창 클릭이벤트
    document
      .querySelector(".search-box-responsive")
      .addEventListener("click", function () {
        clickSearchBox();
      });
    //검색기능

    function searchFunction() {
      let searchInput = document.querySelector(".click-search-box input");
      let searchKeyword = document.querySelectorAll(".rec-search-keyword a");

      searchKeyword.forEach((a) => {
        a.addEventListener("click", function () {
          let method = "click";
          let keyword = this.textContent.split(" ").join("");
          console.log(keyword);
          searchInputEvent(keyword, method);
        });
      });
      searchInput.addEventListener("input", function (e) {
        let method = "input";
        searchInputEvent(e.target.value.split(" ").join(""), method);
      });
    }
    searchFunction();
    function searchInputEvent(value, method) {
      console.log(value);
      let getTicketOpenData = JSON.parse(
        localStorage.getItem("ticketOpenData")
      );
      let searchTapContent = document.querySelector(".search-top-content");
      if (value.length > 0) {
        let filter = getTicketOpenData.filter((a) => {
          return a.title
            .split(" ")
            .join("")
            .includes(value.split(" ").join(""));
        });
        if ([...searchTapContent.children].length !== 0) {
          [...searchTapContent.children].forEach((a) => {
            a.remove();
          });
        }
        if (filter.length > 4) {
          filter = filter.splice(0, 4);
        }

        let template = "";

        filter.forEach((a) => {
          if (method === "input") {
            let title = a.title.split(" ").join("");

            let findString = value;

            let regex = new RegExp(findString, "g");

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
          } else if (method === "click") {
            template += `<a data-id="${a.id}" href="#none" class="search-top-item">
            <div class="imgWrap">
              <img src="${a.poster}" alt="${a.alt}" />
            </div>
            <span>${a.title}</span>
          </a>`;
          }
        });

        searchTapContent.insertAdjacentHTML("beforeend", template);
        document
          .querySelectorAll(".search-top-content .search-top-item")
          .forEach((a) => {
            a.addEventListener("click", function () {
              localStorage.setItem("detailId", JSON.stringify(this.dataset.id));
              location.href = "sub-reservation.html";
            });
          });
      }
    }
  })
  .catch((err) => console.log(err));
// 푸터 불러오기
fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelectorAll(".footer-include").forEach((a) => {
      a.innerHTML = data;
    });
  })
  .catch((err) => console.log(err));

//티켓 오픈 불러오기
fetch("data/main-ticket-open.json")
  .then((res) => res.json())
  .then((data) => {
    let copy = [...data];
    let template = "";
    let swiperWrapper = document.querySelector(
      ".ticket-open-swiper>.swiper-wrapper"
    );
    let getTicketOpenData = JSON.parse(localStorage.getItem("ticketOpenData"));

    if (getTicketOpenData === null) {
      localStorage.setItem("ticketOpenData", JSON.stringify(copy));
    }
    copy.forEach((a) => {
      template += `
  <div class="swiper-slide">
                    <a href="#none" data-id="${a.id}">
                      <img
                        src="${a.poster}"
                        alt="${a.alt}"
                      />
                    </a>
                    <div class="open-ticket-min">
                      <div class="seat small-text">${a.badge}</div>
                      <span class="basic-text">${a.openDate}</span>
                    </div>
                    <div class="open-ticket-tit">
                      <a href="#none" data-id="${a.id}">${a.title}
                        </a
                      >
                    </div>
                    <div class="open-ticket-desc tag-text">${a.method}</div>
                  </div>`;
    });

    swiperWrapper.insertAdjacentHTML("beforeend", template);

    document
      .querySelectorAll(".ticket-open-swiper .swiper-slide a")
      .forEach((a) => {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          let get = JSON.parse(localStorage.getItem("detailId"));
          localStorage.setItem("detailId", JSON.stringify(this.dataset.id));
          location.href = "sub-reservation.html";
        });
      });
    ticketOpenSwiper.update();
  })
  .catch((err) => console.log(err));
//상세페이지 데이터 로컬스토리지에 저장
fetch("data/sub-reservation.json")
  .then((res) => res.json())
  .then((data) => {
    let get = JSON.parse(localStorage.getItem("detailData"));

    if (get === null) {
      localStorage.setItem("detailData", JSON.stringify(data));
    }
  })
  .catch((err) => console.log(err));

//팝업 초기 설정
let popup = document.querySelectorAll(".popup");
function initPopup() {
  if (localStorage.getItem("tomorrow") !== null) {
    let today = new Date();
    let getTomorrow = localStorage.getItem("tomorrow");
    popup.forEach((a) => {
      a.style.display = "none";
    });

    if (today.getTime() > getTomorrow) {
      if (window.innerWidth > 1200) {
        popup[1].style.display = "block";
      } else {
        popup[0].style.display = "block";
      }
    }
  } else {
    popup.forEach((a) => {
      a.style.display = "none";
    });
    if (window.innerWidth > 1200) {
      console.log(popup[1]);
      popup[1].style.display = "block";
    } else {
      console.log(popup[0]);
      popup[0].style.display = "block";
    }
  }
}
initPopup();
//팝업 반응형(11.22)
let popupMatch = window.matchMedia("(max-width:1200px)");
popupMatch.addEventListener("change", function () {
  if (popup[0].style.display == "block") {
    popup[0].style.display = "none";
    popup[1].style.display = "block";
  } else if (popup[1].style.display == "block") {
    popup[1].style.display = "none";
    popup[0].style.display = "block";
  }
});

//팝업 닫기 버튼
document.querySelectorAll(".popup-right .popup-close-btn").forEach((a) => {
  a.addEventListener("click", function () {
    let checkbox = document.querySelectorAll(".popup-checkbox");
    checkbox.forEach((b) => {
      if (b.checked) {
        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        console.log(tomorrow.getTime());
        localStorage.setItem("tomorrow", tomorrow.getTime());
      }
      popup.forEach((c) => {
        c.style.display = "none";
      });
    });
  });
});

//팝업 스타일,내용 변경
function ChangePopupStyle() {
  let popupLeft = document.querySelectorAll(".popup-left");
  // console.log(popupLeft);
  let styleArr = [
    {
      color: "#AB2328",
      txt: '아직도 <img src="img/header-img/popToping_newwhite.png" alt="Toping"> 회원이 아니신가요?',
    },
    {
      color: "#8E43E7",
      txt: "스포츠를 즐기는 또 다른 즐거움,  스포츠 MD샵에서",
    },
    {
      color: "#010000",
      txt: "스타와 함께하는 나만의 방법, 스타 MD샵에서",
    },
    {
      color: "#0070F0",
      txt: "내 마음에 쏙 드는 그 작품,  ♡관심등록하고 새 소식을 놓치지 마세요! ",
    },
    {
      color: "#007446",
      txt: "11월의 달콤한 할인, 지금 바로 확인해 보기",
    },
    {
      color: "#2FC6C1",
      txt: "놀수록 놀라운 혜택, NOL카드로 최대 5만원 캐시백 혜택 받기",
    },
    {
      color: "#F569C4",
      txt: "05년생이라면 집중! 청년문화예술패스 신청하고 최대 15만원 지원받기",
    },
    {
      color: "#F48221",
      txt: "관람후기 작성하고 i-POINT 최대 10,000P  쌓으세요!",
    },
    {
      color: "#343854",
      txt: "인터파크에서만 즐길 수 있는 새로운 일본, 해외 공연 단독 판매로부터",
    },
    {
      color: "#E60F91",
      txt: "서두르세요! 다시 돌아오지 않는 EARLY  BIRD 할인 전시 ",
    },
    {
      color: "#D70021",
      txt: "누구와 여행 가시나요? 동행자별 맞춤여행 W트립",
    },
  ];
  ranNum = Math.floor(Math.random() * (styleArr.length - 1));
  popupLeft.forEach((a) => {
    a.innerHTML = styleArr[ranNum].txt;
  });
  popup.forEach((a) => {
    a.style.backgroundColor = `${styleArr[ranNum].color}`;
  });
}
ChangePopupStyle();

//로그인 필요한 변수
const loginSuccessBox = document.querySelector(".login-success-box");
const loginBoxTop = document.querySelector(".login-area .login-box-top");
const loginForm = document.querySelector(".login-box form");
const recentReservationList = document.querySelector(".recent-reservation ul");
const recentReservationH5 = document.querySelector(
  ".recent-reservation-top>h5"
);

const interestList = document.querySelector(".interest-perform ul");
const interestH5 = document.querySelector(".interest-perform-top>h5");

//오픈 공지 삼입,새 소식 삼입
const openNoticeData = [
  "뮤지컬 지킬앤하이드 (Jekyll ＆ Hy",
  "2024 브로콜리너마저 연말공연 - 매일 새롭",
  "WYBH 콘서트 Good bye 2024 new",
  "김필선 정규 1집 발매 기념 콘서트",
  "윤미라무용단 [화첩-공무도花] new",
];
const whatsNewData = [
  {
    tit: "KYUHYUN 10th Anniversary Asia Tour[COLORS］",
    date: "10/24(목) 14:00",
  },
  {
    tit: "2024 JAY B CONCERT TAPE: RE LOAD",
    date: "11/15(금) 20:00",
  },
  {
    tit: "존 카메론 미첼 내한 공연 [John Cameron Mitchell @ X-mas]",
    date: "11/11(월) 14:00",
  },
];
//나의관심공연
function insertInterestList() {
  let getInterestArr = JSON.parse(localStorage.getItem("InterestArr"));

  [...interestList.children].forEach((a) => a.remove());
  if (getInterestArr !== null) {
    if (getInterestArr.length !== 0) {
      let template = "";
      getInterestArr.forEach((a) => {
        template += `<li data-id="${a.id}"  onclick="interestListClick(this)"><a href="#none" class="basic-text" >${a.title}</a></li>`;
      });
      interestList.insertAdjacentHTML("beforeend", template);
    }
  }
}
//관심공연 클릭 시 상세페이지로 이동
function interestListClick(a) {
  localStorage.setItem("detailId", JSON.stringify(a.dataset.id));
  location.href = "sub-reservation/sub-reservation.html";
}
//최근예매내역
function insertRecentReservation() {
  let getRecentReservation = JSON.parse(
    localStorage.getItem("recentReservation")
  );

  [...recentReservationList.children].forEach((a) => {
    a.remove();
  });
  if (getRecentReservation !== null) {
    if (getRecentReservation.selectedArr.length !== 0) {
      let seats = "";
      getRecentReservation.selectedArr.forEach((a) => {
        seats += `<span style="margin-right:5px;">${a.section}석 ${a.order}</span>`;
      });
      recentReservationList.insertAdjacentHTML(
        "beforeend",
        `<li data-id=${getRecentReservation.detailObj.id} onclick="recentReservationClick(this)"><a href="#none" class="basic-text ">${getRecentReservation.detailObj.title}<span class="tag-text" style="font-weight:500">${getRecentReservation.detailObj.period}</span><span class="tag-text" style="margin-top:0px;">${seats}</span></a></li>`
      );
    }
  }
}
//최근예매내역 클릭 시 상세페이지로 이동
function recentReservationClick(a) {
  localStorage.setItem("detailId", JSON.stringify(a.dataset.id));
  location.href = "sub-reservation/sub-reservation.html";
}
//새소식
function insertWhatsNew() {
  let template = "";
  [...recentReservationList.children].forEach((a) => a.remove());
  whatsNewData.forEach((a) => {
    template += ` <li>
                <a href="none" class="basic-text">
                  ${a.tit}
                  <span class="tag-text">${a.date}</span>
                </a>
              </li>`;
  });
  recentReservationList.insertAdjacentHTML("beforeend", template);
}
//오픈공지
function insertOpenNotice() {
  let template = "";
  [...interestList.children].forEach((a) => a.remove());
  openNoticeData.forEach((a) => {
    template += `<li>
                <a href="#none" class="basic-text">${a}</a>
              </li>`;
  });
  interestList.insertAdjacentHTML("beforeend", template);
}

//페이지 로드 시 로그인 초기 설정
function initLoginSetting() {
  if (JSON.parse(localStorage.getItem("loginState")) == null) {
    localStorage.setItem("loginState", JSON.stringify(false));
  } else {
    if (JSON.parse(localStorage.getItem("loginState")) === true) {
      loginBoxTop.style.display = "none";
      loginForm.style.display = "none";
      loginSuccessBox.style.display = "block";
      loginBoxTop.style.display = "none";
      loginForm.style.display = "none";
      loginSuccessBox.style.display = "block";
      recentReservationH5.innerText = "최근예매내역";

      insertRecentReservation();

      interestH5.innerText = "나의 관심 공연";
      insertInterestList();
    } else {
      loginBoxTop.style.display = "flex";
      loginForm.style.display = "block";
      loginSuccessBox.style.display = "none";
      insertOpenNotice();
      insertWhatsNew();
    }
  }
  if (JSON.parse(localStorage.getItem("correctLoginInfo")) == null) {
    localStorage.setItem(
      "correctLoginInfo",
      JSON.stringify({ id: "abc123", pw: "abc123" })
    );
  }
}
initLoginSetting();

//로그인 버튼 누르면 (아이디:abc123,비밀번호:abc123)
document
  .querySelector(".login-area .login-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    let userIdInput = document.getElementById("login-id");
    let userPwInput = document.getElementById("login-pw");
    let getInfo = JSON.parse(localStorage.getItem("correctLoginInfo"));

    if (userIdInput.value === "" || userPwInput.value === "") {
      alert("빈 칸이 있습니다.");
    } else if (getInfo.id !== userIdInput.value) {
      alert("아이디가 올바르지 않습니다.");
    } else if (getInfo.pw !== userPwInput.value) {
      alert("비밀번호가 올바르지 않습니다.");
    } else if (
      getInfo.id === userIdInput.value &&
      getInfo.id === userIdInput.value
    ) {
      localStorage.setItem("loginState", JSON.stringify(true));

      alert("로그인에 성공하셨습니다.");
      userIdInput.value = null;
      userPwInput.value = null;
      loginBoxTop.style.display = "none";
      loginForm.style.display = "none";
      loginSuccessBox.style.display = "block";
      recentReservationH5.innerText = "최근예매내역";

      insertRecentReservation();

      interestH5.innerText = "나의 관심 공연";
      insertInterestList();
    }
  });
document
  .querySelector(".login-success-box-top .logout-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    alert("로그아웃 하셨습니다");
    loginBoxTop.style.display = "flex";
    loginForm.style.display = "block";
    loginSuccessBox.style.display = "none";
    recentReservationH5.innerText = "새소식";

    insertOpenNotice();
    interestH5.innerText = "오픈공지";
    insertWhatsNew();
    localStorage.setItem("loginState", JSON.stringify(false));
  });

// 큐알 앱 로그인
const appLoginBox = document.querySelector(".app-login-box");
const radioWrap = document.querySelector(".login-area .radio-wrap");
let remainInterVal = null;
radioWrap.addEventListener("change", function (e) {
  let loginIdWrap = document.querySelector(".login-id-wrap");
  let loginPwWrap = document.querySelector(".login-pw-wrap");
  let loginBtn = document.querySelector(".login-area .login-btn");
  let desc = document.querySelector(".app-login-box > .desc");
  let remainingTime = document.querySelector("#remaining-time");
  if (remainInterVal !== null) {
    clearInterval(remainInterVal);
    desc.innerText = `카메라 실행 후 QR코드를 스캔해주세요.`;
    remainingTime.innerText = `남은시간 : 05분 00초`;
    remainingTime.style.color = "var(--purple)";
  }
  if (e.target.value === "인터파크티켓앱") {
    appLoginBox.style.display = "block";
    loginIdWrap.style.display = "none";
    loginPwWrap.style.display = "none";
    loginBtn.style.display = "none";
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
          "로그인 인증시간이 만료되었습니다. 새로고침 후 다시 시도하세요";
        remainingTime.innerText = "남은시간 : 00분 00초";
        remainingTime.style.color = "red";
        clearInterval(remainInterVal);
      }
    }, 1000);
  } else if (e.target.value === "간편로그인") {
    appLoginBox.style.display = "none";
    loginIdWrap.style.display = "block";
    loginPwWrap.style.display = "block";
    loginBtn.style.display = "block";
  }
});

//오늘의 추천 탭 data
let recommendBgArr = [
  {
    id: 0,
    bgColor: "#0091CD",
  },
  {
    id: 1,
    bgColor: "#FF2E82",
  },
  {
    id: 2,
    bgColor: "#654D94",
  },
  {
    id: 3,
    bgColor: "#E7B524",
  },
  {
    id: 4,
    bgColor: "#D32F0F",
  },
];

//오늘의 추천 변수
const sectionRecommend = document.querySelector(".recommend");
const recommendLi = document.querySelectorAll(".rec-list>ul>li");
const recommendImg = document.querySelectorAll(".recommend-right>a>img");
const recommendTit = document.querySelectorAll(".musical-title h3");
const recommendDate = document.querySelectorAll(".musical-date");
const musicalFadeWrap = document.querySelectorAll(
  ".musical-txt-wrap > .musical-fade-wrap"
);
const musicalFadeWrapMobile = document.querySelectorAll(
  ".musical-txt-wrap-mobile>.musical-fade-wrap-mobile"
);

//오늘의 추천interVal
let idx = 1;
let recommendInterval = setInterval(() => {
  if (idx <= recommendBgArr.length - 1) {
    changeRecommendContent(idx);
    idx++;
  } else {
    idx = 1;
    changeRecommendContent(0);
  }
}, 3000);

function changeRecommendContent(idx) {
  sectionRecommend.classList.remove("fade");
  sectionRecommend.classList.add("fade");
  musicalFadeWrap.forEach((a) => {
    a.classList.remove("active");
  });
  musicalFadeWrap[idx].classList.add("active");
  musicalFadeWrapMobile.forEach((a) => {
    a.classList.remove("active");
  });
  musicalFadeWrapMobile[idx].classList.add("active");
  recommendLi.forEach((a, i) => {
    a.classList.remove("active");
  });
  recommendLi[idx].classList.add("active");
  recommendImg.forEach((a, i) => {
    a.classList.remove("active");
  });
  recommendImg[idx].classList.add("active");

  document.documentElement.style.setProperty(
    "--recommend-bgColor",
    recommendBgArr[idx].bgColor
  );
}

//오늘의 추천 초기 설정
function initRecommend() {
  recommendLi[0].classList.add("active");
  changeRecommendContent(0);
}
initRecommend();

//오늘의 추천 탭 호버 시
recommendLi.forEach((a, i) => {
  a.addEventListener("mouseover", function () {
    if (i == recommendBgArr[i].id) {
      changeRecommendContent(i);
      clearInterval(recommendInterval);
      idx = i + 1;
      recommendInterval = setInterval(() => {
        if (idx <= recommendBgArr.length - 1) {
          changeRecommendContent(idx);
          idx++;
        } else {
          idx = 1;
          changeRecommendContent(0);
        }
      }, 3000);
    }
  });
});

//main-right 스크롤 이벤트
let lastFooterPosition = 0;
const scrollHeight = document.documentElement.scrollHeight;
let mainRightScrollMatch = window.matchMedia("(min-width:1200px)");
mainRightScrollMatch.addEventListener("change", function () {
  const hdrHeight = document.querySelector(".header-include").clientHeight;
  const popupHeight = popup[0].clientHeight + popup[1].clientHeight;
  const mainRightTop = document.querySelector(".main-right-top");
  const mainRightHeight = document.querySelector(".main-right").clientHeight;
  const footerPc = document.querySelector(".footer-include-pc");
  if (this.matches) {
    window.addEventListener("scroll", mainRightScrollEvent);
  } else {
    window.removeEventListener("scroll", mainRightScrollEvent);
    lastFooterPosition = 0;
    mainRightTop.style.top = 0;
    footerPc.style.bottom = 0;
    footerPc.style.top = "auto";
  }
});
window.addEventListener("scroll", mainRightScrollEvent);
function mainRightScrollEvent() {
  const hdrHeight = document.querySelector(".header-include").clientHeight;
  const popupHeight = popup[0].clientHeight + popup[1].clientHeight;
  const mainRightTop = document.querySelector(".main-right-top");
  const mainRightHeight = document.querySelector(".main-right").clientHeight;
  const footerPc = document.querySelector(".footer-include-pc");

  if (this.scrollY <= 10) {
    mainRightTop.style.top = 0;
  } else if (
    this.scrollY > hdrHeight + popupHeight + 35 &&
    this.scrollY < mainRightHeight / 4
  ) {
    mainRightTop.style.top = `${
      this.scrollY - (hdrHeight + popupHeight + 35)
    }px`;
    footerPc.style.bottom = "auto";
    lastFooterPosition =
      this.scrollY - (hdrHeight + popupHeight + 35) + mainRightTop.clientHeight;
    footerPc.style.top = `${lastFooterPosition}px`;
  } else if (
    this.scrollY >= mainRightHeight / 4 &&
    this.scrollY + this.innerHeight < scrollHeight
  ) {
    if (lastFooterPosition != 0) {
      if (this.scrollY > lastFooterPosition + hdrHeight + popupHeight + 35) {
        footerPc.style.top = `${
          this.scrollY - (hdrHeight + popupHeight + 35)
        }px`;
      }
    } else {
      if (
        this.scrollY - (hdrHeight + popupHeight + 35) >=
        mainRightTop.clientHeight +
          parseFloat(getComputedStyle(mainRightTop).top)
      ) {
        footerPc.style.top = `${
          this.scrollY - (hdrHeight + popupHeight + 35)
        }px`;
      }
    }
  }
}

//메인 반응형 사이드 회원정보
let mainRightMatch = window.matchMedia("(min-width:1200px)");
mainRightMatch.addEventListener("change", function () {
  if (this.matches) {
    document.querySelector(".main-right").style.transform = "translateX(0)";
  } else {
    document.querySelector(".main-right").style.transition = "none";
    document.querySelector(".main-right").style.transform = "translateX(100%)";
  }
});
//닫기
document
  .querySelector(".main-right-top .responsive-close-btn")
  .addEventListener("click", function () {
    document.querySelector(".main-right").style.transform = "translateX(100%)";
  });
