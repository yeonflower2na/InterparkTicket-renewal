// 헤더 불러오기
fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector(".header-include").innerHTML = data;
    let resInfo = document.querySelector(".res-hdr-top-right > .res-info");
    let resMenu = document.querySelector(".res-hdr-top-right > .res-menu");
    let sideMenuContainer = document.querySelector(".side-menu-container");

    resMenu.addEventListener("click", function () {
      document.querySelector(".header-include").style.zIndex =
        sideMenuContainer.style.transition = "all .6s ease";
      sideMenuContainer.style.transform = "translateX(0)";
    });
    document
      .querySelector(".side-menu-hdr > .close-btn")
      .addEventListener("click", function () {
        sideMenuContainer.style.transform = "translateX(100%)";
      });
    document
      .querySelector(".header-include-reservation .hdr-logo")
      .setAttribute("src", `img/header-img/header_logo.svg`);
    document
      .querySelector(".header-include-reservation .dropdown-icon")
      .setAttribute("src", `img/header-img/dropdown.svg`);

    //로그인 모달 불러오기
    fetch("login-modal.html")
      .then((res) => res.text())
      .then((data) => {
        document.querySelector(".login-modal-include").innerHTML = data;

        //===============//
        const loginSuccessBox = document.querySelector(".login-success-box");
        const loginBoxTop = document.querySelector(
          ".login-area .login-box-top"
        );
        const loginForm = document.querySelector(".login-box form");
        const recentReservationH5 = document.querySelector(
          ".recent-reservation-top>h5"
        );

        initLoginSetting();
        //로그인 모달 열기
        document
          .querySelector(".hdr-top-right .sub-login-link")
          .addEventListener("click", function () {
            document.querySelector(".login-modal").style.display = "flex";
          });
        resInfo.addEventListener("click", function () {
          document.querySelector(".login-modal").style.display = "flex";
        });
        // 로그인 모달 닫기
        document
          .querySelector(".login-modal .responsive-close-btn")
          .addEventListener("click", function () {
            document.querySelector(".login-modal").style.display = "none";
          });
        document
          .querySelector(".login-modal")
          .addEventListener("click", function (e) {
            if (e.target === this) {
              document.querySelector(".login-modal").style.display = "none";
            } else {
              console.log(e.target, this);
            }
          });

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
              alert("로그인에 성공하셨습니다.");
              userIdInput.value = null;
              userPwInput.value = null;
              loginBoxTop.style.display = "none";
              loginForm.style.display = "none";
              loginSuccessBox.style.display = "block";
              localStorage.setItem("loginState", JSON.stringify(true));
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
      })
      .catch((err) => console.log(err));
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

    //검색기능

    function searchFunction() {
      let searchInput = document.querySelector(".click-search-box input");
      let searchKeyword = document.querySelectorAll(".rec-search-keyword a");

      searchKeyword.forEach((a) => {
        a.addEventListener("click", function () {
          let method = "click";
          let keyword = this.textContent.split(" ").join("");
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

//페이지 로드 시 로그인 초기 설정
function initLoginSetting() {
  const loginSuccessBox = document.querySelector(".login-success-box");
  const loginBoxTop = document.querySelector(".login-area .login-box-top");
  const loginForm = document.querySelector(".login-box form");
  if (JSON.parse(localStorage.getItem("loginState")) == null) {
    localStorage.setItem("loginState", JSON.stringify(false));
  } else {
    if (JSON.parse(localStorage.getItem("loginState")) === true) {
      loginBoxTop.style.display = "none";
      loginForm.style.display = "none";
      loginSuccessBox.style.display = "block";
    } else {
      loginBoxTop.style.display = "flex";
      loginForm.style.display = "block";
      loginSuccessBox.style.display = "none";
    }
  }
  if (JSON.parse(localStorage.getItem("correctLoginInfo")) == null) {
    localStorage.setItem(
      "correctLoginInfo",
      JSON.stringify({ id: "abc123", pw: "abc123" })
    );
  }
}

const castSwiper = new Swiper(".castSwiper", {
  navigation: {
    nextEl: ".swiper-button-next.cast-next",
    prevEl: ".swiper-button-prev.cast-prev",
  },
  slidesPerView: 6,
  spaceBetween: 20,
  breakpoints: {
    1024: {
      slidesPerView: 6,
      slidesPerGroup: 6,
    },
    768: {
      slidesPerView: 5,
      slidesPerGroup: 5,
    },
    480: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    0: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});

//상세페이지 함수

function detailPage() {
  let getdetailData = JSON.parse(localStorage.getItem("detailData"));
  let copy = [...getdetailData];
  let getId = JSON.parse(localStorage.getItem("detailId"));
  let find = copy.find((a) => getId === a.id);
  let findIndex = copy.findIndex((a) => getId === a.id);
  localStorage.setItem("detailObj", JSON.stringify(find));

  //공연제목
  let title = document.querySelector("section.play-info-area > h1");
  title.innerText = `${find.title}`;
  //처음 하트 상태
  let interestHeart = document.querySelector(
    "section.play-info-area .interest .heart"
  );

  if (copy[findIndex].interested) {
    interestHeart.style.backgroundPosition = "right";
  } else {
    interestHeart.style.backgroundPosition = "left";
  }
  //관심 수
  let interestCount = document.querySelector(
    "section.play-info-area .interest .num"
  );
  interestCount.innerText = `${find.interest}`;
  //관심 하트 클릭
  interestHeart.addEventListener("click", function () {
    let count = parseInt(copy[findIndex].interest);
    let getInterestArr = JSON.parse(localStorage.getItem("InterestArr"));
    copy[findIndex].interested = !copy[findIndex].interested;

    if (copy[findIndex].interested) {
      this.style.backgroundPosition = "right";
      copy[findIndex].interest = count + 1;
      if (getInterestArr !== null) {
        let some = getInterestArr.some((a) => a.id === find.id);
        if (!some) {
          getInterestArr.push(find);
          if (getInterestArr.length > 5) {
            getInterestArr.shift();
          }
          localStorage.setItem("InterestArr", JSON.stringify(getInterestArr));
        }
      } else {
        localStorage.setItem("InterestArr", JSON.stringify([find]));
      }
    } else {
      this.style.backgroundPosition = "left";
      copy[findIndex].interest = count - 1;
      if (getInterestArr !== null) {
        let findIndex = getInterestArr.findIndex((a) => a.id === find.id);
        if (findIndex !== -1) {
          getInterestArr.splice(findIndex, 1);
        }
        localStorage.setItem("InterestArr", JSON.stringify(getInterestArr));
      }
    }
    interestCount.innerText = `${find.interest}`;
    localStorage.setItem("detailData", JSON.stringify(copy));
  });

  // 포스터
  let posterImg = document.querySelector(
    "section.play-info-area .play-info-left img"
  );
  posterImg.setAttribute("src", `${find.poster}`);
  posterImg.setAttribute("alt", `${find.title}`);
  //공연정보텍스트
  let location = document.querySelector(
    "section.play-info-area .play-info-right > li.location>span"
  );
  let period = document.querySelector(
    "section.play-info-area .play-info-right > li.period>span"
  );
  let time = document.querySelector(
    "section.play-info-area .play-info-right > li.time>span"
  );
  let age = document.querySelector(
    "section.play-info-area .play-info-right > li.age>span"
  );
  location.innerText = `${find.location}`;
  period.innerText = `${find.period}`;
  time.innerText = `${find.playTime}`;
  age.innerText = `${find.age}`;

  //출연진
  let castSwiperWrapper = document.querySelector(".castSwiper .swiper-wrapper");
  let castSwiperSlide = document.querySelectorAll(".castSwiper .swiper-slide");
  castSwiperSlide.forEach((a) => {
    a.remove();
  });
  let template = "";
  let castArr = find.castArr;
  if (castArr.length !== 0) {
    castArr.forEach((a) => {
      template += `<div class="swiper-slide">
                        <div class="imgWrap" >
                          <img class="cast-img" src="${a.img}" alt="${a.name}" />
                        </div>
                        <div class="txt">
                          <div class="role">${a.role}</div>
                          <div class="name">${a.name}</div>
                        </div>
                      </div>`;
    });
    castSwiperWrapper.insertAdjacentHTML("beforeend", template);
  } else {
    document.querySelector("section.cast-info-area").remove();
  }

  castSwiper.update();

  //탭01 상세정보
  let tap01 = document.querySelector(".play-tap-content01 ");
  let tap01Img = "";
  find.noticeArr.forEach((a, i) => {
    tap01Img += `<img src="${a}" alt="notice${i}"/>`;
  });

  template =
    `<div class="txt">
                    <h5>공연시간 정보</h5>
                    <p>
                    ${find.playTimeInfo}
                    </p>
                  </div>` +
    `
                  <div class="imgWrap">
                    ${tap01Img}
                  </div>`;
  [...tap01.children].forEach((a) => a.remove()); // 이 줄은 나중에 지울것
  tap01.insertAdjacentHTML("beforeend", template);

  //탭02 캐스팅정보
  let tap02 = document.querySelector(".play-tap-content02 ");
  let tap02Img = "";
  if (find.castInfo.length !== 0) {
    find.castInfo.forEach((a, i) => {
      tap02Img += `<img src="${a}" alt="castInfo01${i}"/>`;
    });
  } else {
    tap02Img = `<p style='color:var(--gray); margin-top:30px; '> 캐스팅 정보가 없습니다. </p>`;
    console.log(tap02Img);
  }
  tap02.insertAdjacentHTML("beforeend", tap02Img);

  // tap

  //변수
  const tapMenus = document.querySelectorAll(".play-tap-menu > li");
  const tapContents = document.querySelectorAll(".play-tap-content");
  //초기 탭 설정
  function initPlayTap() {
    tapMenus[0].classList.add("selected");
    tapContents[0].classList.add("show");
  }
  initPlayTap();
  //탭기능
  tapMenus.forEach((a) => {
    a.addEventListener("click", playTap);
  });

  function playTap() {
    tapMenus.forEach((b) => {
      if (this.dataset.index === b.dataset.index) {
        b.classList.add("selected");
      } else {
        b.classList.remove("selected");
      }
    });
    tapContents.forEach((b) => {
      if (this.dataset.index === b.dataset.index) {
        b.classList.add("show");
      } else {
        b.classList.remove("show");
      }
    });
  }

  // 예매하기 팝업
  let subPopup = document.querySelector(".sub-reservation-popup");

  document
    .querySelector(".sub-popup-bottom .sub-popup-close-btn")
    .addEventListener("click", function () {
      subPopup.style.display = "none";
    });

  // 예매하기 버튼 클릭이벤트
  document
    .querySelector(".reserve-btn-top")
    .addEventListener("click", clickReserveBtn);
  document
    .querySelector(".res-reserve-btn-top")
    .addEventListener("click", clickReserveBtn);

  function clickReserveBtn(e) {
    let getLogin = JSON.parse(localStorage.getItem("loginState"));

    if (getLogin) {
      window.open("sub-reservation-modal.html", "좌석선택", "width=1000px,height=1000px");
    } else {
      alert("로그인 후 이용하실 수 있습니다.");
      document.querySelector(".login-modal").style.display = "flex";
    }
  }
}

detailPage();
