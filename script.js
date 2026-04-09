const USE_FAKE_SUBMIT = false;
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxE6gfTP11chqJCN2kB4wk-NVgPDlyygbGzRPhslzAadfQ1TJo_f2dtH1RdkB6yw0pa/exec';
const KAKAO_CHAT_URL = 'http://pf.kakao.com/_cxhePn/chat';


/* ===== Amorinne Static Website Script ===== */

// ===== DATA =====
const TABLE_DATA = [
  { id: "pure", name: "퓨어 테이블", desc: "차분한 화이트 톤에 은은한 온기를 더한 테이블", img: "images/pure.jpg", studioPrice: 35000, milestonePrice: 69000 },
  { id: "royal-white", name: "로얄 테이블 (WHITE)", desc: "아모린느의 시그니처 감성을 가장 우아하게 담아낸 테이블", img: "images/royalwhite.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "royal-yellow", name: "로얄 테이블 (YELLOW)", desc: "아모린느 시그니처 라인에 따뜻함을 더한 테이블", img: "images/royalyellow.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "seorin", name: "서린상", desc: "'상서로울 서' '맑을 린', 좋은 기운이 겹겹이 스며들기를 바라는 마음을 담았습니다", img: "images/seorin.jpg", studioPrice: 45000, milestonePrice: 99000 },
  { id: "daon", name: "다온상", desc: "'많을 다' '따뜻할 온', 차분함 속에 아이의 순간을 온기있게 담아냈습니다.", img: "images/daon.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "hayeon", name: "하연상", desc: "맑고 단정한 백색의 아름다움에 전통미를 더했습니다.", img: "images/hayeon.jpg", studioPrice: 35000, milestonePrice: 79000 },
  { id: "safari", name: "사파리 테이블", desc: "생기 넘치는 동물 소품과 자연스러운 우드감이 조화를 이루는 테이블", img: "images/safari.jpg", studioPrice: 35000, milestonePrice: 69000 },
  { id: "bridal", name: "브라이덜 샤워", desc: "예비 신부의 특별한 하루를 깨끗하고 우아한 분위기로 채워줍니다.", img: "images/bridal.JPG", studioPrice: 50000, milestonePrice: 80000 }
];

const STUDIO_OPTIONS = [
  { name: "캘리그라피 카드", desc: "자체제작 금박 캘리그라피 카드", price: 9900 },
  { name: "카메라 대여", desc: "미러리스 또는 폴라로이드(필름 10장 포함)", price: 20000 },
  { name: "아이폰 스냅", desc: "(1H) 원본일체+20장 내외 색감 보정(업로드 동의시 진행)", price: 50000 },
  { name: "병풍 추가", desc: "전통 병풍 배경 추가", price: 30000 },
  { name: "대형 숫자 풍선", desc: "생일/기념일 숫자 풍선", price: 5000 }
];

const MILESTONE_OPTIONS_DATA = [
  { name: "돌잡이 세트", desc: "전통 돌잡이 소품 세트", price: 10000, img: "images/toy.jpg" },
  { name: "범보의자/양털의자/돌방석", desc: "아기 의자 또는 돌방석", price: 5000 },
  { name: "접이식 테이블", desc: "추가 테이블", price: 10000 },
  { name: "고급 모형 과일", desc: "촬영용 모형 과일 세트", price: 10000 },
  { name: "모형 백설기", desc: "촬영용 모형 백설기", price: 5000 },
  { name: "모형 우드 백설기", desc: "우드 스타일 모형 백설기", price: 10000 },
  { name: "모형 백설기 케이크", desc: "케이크 형태 모형 백설기", price: 10000 },
  { name: "모형 시루떡", desc: "전통 시루떡 모형", price: 5000 },
  { name: "접시형 모형 떡", desc: "시루떡 / 무지개 절", price: 7000 },
  { name: "캘리그라피 카드", desc: "자체제작 금박 캘리그라피 카드", price: 9900 }
];

const HANBOK_ACCESSORY_DATA = [
  { name: "정자관", img: "images/acc1.jpg", price: 5000 },
  { name: "일반갓", img: "images/acc2.jpg", price: 5000 },
  { name: "유건", img: "images/acc3.jpg", price: 5000 },
  { name: "가채", img: "images/acc4.jpg", price: 5000 }
];

const BAEKIL_HANBOK_DATA = [
  { name: "남아한복 베이지", img: "images/b100beige.jpg" },
  { name: "남아한복 하늘", img: "images/b100sky.jpg" },
  { name: "남아한복 노랑", img: "images/b100yellow.jpg" },
  { name: "남아한복 초록", img: "images/b100green.jpg" },
  { name: "여아한복 베이지", img: "images/g100beige.jpg" },
  { name: "여아한복 노랑", img: "images/g100yellow.jpg" },
  { name: "여아한복 민트", img: "images/g100mint.jpg" },
  { name: "여아한복 색동", img: "images/g100colorful.jpg" }
];

const DOL_HANBOK_DATA = [
  { name: "남아한복 노랑", img: "images/b1yellow.jpg" },
  { name: "남아한복 하늘", img: "images/b1sky.jpg" },
  { name: "여아한복 색동", img: "images/g1colorful.jpg" },
  { name: "여아한복 하루", img: "images/g1haru.jpg" }
];

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
}

// ===== MAIN TABS =====
document.querySelectorAll(".tab-btn[data-tab]").forEach(function(btn) {
  btn.addEventListener("click", function() {
    var tab = this.dataset.tab;

    // Update tab buttons
    document.querySelectorAll(".tab-btn[data-tab]").forEach(function(b) { b.classList.remove("active"); });
    this.classList.add("active");

    // Show/hide tab content
    document.querySelectorAll("[id^='tab-']").forEach(function(el) { el.classList.remove("active"); });
    var target = document.getElementById("tab-" + tab);
    if (target) target.classList.add("active");

    // Show/hide service images
    document.querySelectorAll("[id^='service-img-']").forEach(function(el) { el.style.display = "none"; });
    var img = document.getElementById("service-img-" + tab);
    if (img) img.style.display = "block";
  });
});

// ===== SUB TABS =====
document.querySelectorAll(".sub-tab-btn[data-subtab]").forEach(function(btn) {
  btn.addEventListener("click", function() {
    var subtab = this.dataset.subtab;
    var parent = this.dataset.parent;

    // Update sub-tab buttons within same parent
    document.querySelectorAll('.sub-tab-btn[data-parent="' + parent + '"]').forEach(function(b) { b.classList.remove("active"); });
    this.classList.add("active");

    // Show/hide sub-tab content - hide all subtabs for this parent first
    document.querySelectorAll('.sub-tab-btn[data-parent="' + parent + '"]').forEach(function(b) {
      var st = document.getElementById("subtab-" + b.dataset.subtab);
      if (st) st.classList.remove("active");
    });
    var target = document.getElementById("subtab-" + subtab);
    if (target) target.classList.add("active");
  });
});

// ===== RENDER TABLE CARDS =====
function renderTableCards(containerId, tables, priceKey) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var html = "";
  tables.forEach(function(t) {
    html += '<div class="card" onclick="openImageModal(\'' + t.name.replace(/'/g, "\\'") + '\', \'' + t.img + '\')">';
    html += '<div class="card-img-wrapper"><img src="' + t.img + '" alt="' + t.name + '" />';
    html += '<div class="card-img-overlay"><span>클릭하여 확대</span></div></div>';
    html += '<div class="card-header"><div><div class="card-title">' + t.name + '</div>';
    html += '<div class="card-desc">' + t.desc + '</div></div>';
    html += '<div class="card-price">' + t[priceKey].toLocaleString() + '원</div></div>';
    html += '</div>';
  });
  container.innerHTML = html;
}

// ===== RENDER STUDIO OPTIONS =====
function renderStudioOptions() {
  var container = document.getElementById("studio-options-list");
  if (!container) return;
  var html = '<div class="space-y-3">';

  // Hanbok section
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">백일 한복 (15,000원)</h4>';
  html += '<div class="gallery-grid">';
  BAEKIL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  // Dol hanbok section
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">돌 한복/드레스/정장 (35,000원)</h4>';
  html += '<div class="gallery-grid">';
  DOL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  // Other options
  STUDIO_OPTIONS.forEach(function(opt) {
    html += '<div class="card"><div class="card-header"><div><div class="card-title">' + opt.name + '</div>';
    html += '<div class="card-desc">' + opt.desc + '</div></div>';
    html += '<div class="card-price">' + opt.price.toLocaleString() + '원</div></div></div>';
  });

  html += '</div>';
  container.innerHTML = html;
}

// ===== RENDER MILESTONE OPTIONS =====
function renderMilestoneOptions() {
  var container = document.getElementById("milestone-options-list");
  if (!container) return;
  var html = '<div class="space-y-3">';

  // Hanbok section
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">백일 한복 (15,000원)</h4>';
  html += '<div class="gallery-grid">';
  BAEKIL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  // Dol hanbok section
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">돌 한복/드레스/정장 (35,000원)</h4>';
  html += '<div class="gallery-grid">';
  DOL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  // Hanbok accessories
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">한복 악세사리 (각 5,000원)</h4>';
  html += '<div class="gallery-grid">';
  HANBOK_ACCESSORY_DATA.forEach(function(a) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + a.name.replace(/'/g, "\\'") + '\', \'' + a.img + '\')">';
    html += '<div class="aspect-square"><img src="' + a.img + '" alt="' + a.name + '" /></div>';
    html += '<p>' + a.name + '</p></div>';
  });
  html += '</div></div>';

  // Other options
  MILESTONE_OPTIONS_DATA.forEach(function(opt) {
    html += '<div class="card">';
    if (opt.img) {
      html += '<div class="card-img-wrapper" onclick="openImageModal(\'' + opt.name.replace(/'/g, "\\'") + '\', \'' + opt.img + '\')">';
      html += '<img src="' + opt.img + '" alt="' + opt.name + '" style="height:8rem;" />';
      html += '<div class="card-img-overlay"><span>클릭하여 확대</span></div></div>';
    }
    html += '<div class="card-header"><div><div class="card-title">' + opt.name + '</div>';
    html += '<div class="card-desc">' + opt.desc + '</div></div>';
    html += '<div class="card-price">' + opt.price.toLocaleString() + '원</div></div></div>';
  });

  html += '</div>';
  container.innerHTML = html;
}

// ===== IMAGE MODAL =====
function openImageModal(name, img) {
  document.getElementById("imageModalTitle").textContent = name;
  document.getElementById("imageModalImg").src = img;
  document.getElementById("imageModalImg").alt = name;
  document.getElementById("imageModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeImageModal() {
  document.getElementById("imageModal").classList.add("hidden");
  document.body.style.overflow = "";
}

// ===== RESERVATION MODALS =====
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  document.body.style.overflow = "";
}

// ===== PRICE CALCULATION =====
function isWeekend(dateStr) {
  if (!dateStr) return false;
  var d = new Date(dateStr);
  var day = d.getDay();
  return day === 0 || day === 6;
}

function getTablePrice(tableName, type) {
  var table = TABLE_DATA.find(function(t) {
    return t.name === tableName || tableName.includes(t.id);
  });
  if (!table) {
    // Match by select value
    var map = {
      "퓨어테이블": 0,
      "로얄 테이블(WHITE)": 1,
      "로얄 테이블(YELLOW)": 2,
      "서린상": 3,
      "다온상": 4,
      "하연상": 5,
      "사파리테이블": 6,
      "프리미엄 연화상(스튜디오 전용)": -1,
      "브라이덜샤워": 7
    };
    var idx = map[tableName];
    if (idx === -1) return 85000; // Premium
    if (idx !== undefined && TABLE_DATA[idx]) {
      return type === "studio" ? TABLE_DATA[idx].studioPrice : TABLE_DATA[idx].milestonePrice;
    }
  }
  if (table) return type === "studio" ? table.studioPrice : table.milestonePrice;
  return 0;
}

function validateReservationTime(input) {
  if (!input || !input.value) return;

  const parts = input.value.split(':');
  if (parts.length !== 2) return;

  const hour = parts[0];
  const minute = parts[1];

  if (minute !== '00' && minute !== '30') {
    alert('시작 시간은 00분 또는 30분만 선택할 수 있어요.');
    input.value = '';
    const endTimeInput = document.getElementById('endTime');
    if (endTimeInput) endTimeInput.value = '';
  }
}

function updateEndTime() {
  const reservationTimeInput = document.getElementById('reservationTime');
  const rentalHoursSelect = document.querySelector('#studioForm select[name="rentalHours"]');
  const endTimeInput = document.getElementById('endTime');

  if (!reservationTimeInput || !rentalHoursSelect || !endTimeInput) return;

  const startTime = reservationTimeInput.value;
  const rentalHours = rentalHoursSelect.value;

  if (!startTime || !rentalHours) {
    endTimeInput.value = '';
    return;
  }

  const parts = startTime.split(':');
  if (parts.length !== 2) {
    endTimeInput.value = '';
    return;
  }

  const startHour = parseInt(parts[0], 10);
  const startMinute = parseInt(parts[1], 10);
  const hoursToAdd = parseInt(rentalHours, 10);

  if (Number.isNaN(startHour) || Number.isNaN(startMinute) || Number.isNaN(hoursToAdd)) {
    endTimeInput.value = '';
    return;
  }

  const totalMinutes = startHour * 60 + startMinute + hoursToAdd * 60;
  const endHour = Math.floor((totalMinutes % (24 * 60)) / 60);
  const endMinute = totalMinutes % 60;

  const hh = String(endHour).padStart(2, '0');
  const mm = String(endMinute).padStart(2, '0');

  endTimeInput.value = `${hh}:${mm}`;
}


function updateStudioPrice() {
  var form = document.getElementById("studioForm");
  var total = 0;

  // Base price
  var dateStr = form.reservationDate.value;
  var hours = parseInt(form.rentalHours.value) || 0;
  var weekend = isWeekend(dateStr);

  if (hours === 1) total += weekend ? 70000 : 60000;
  else if (hours === 2) total += weekend ? 120000 : 100000;

  // Extra person fee
  var adults = parseInt(form.adultCount.value) || 0;
  var babies = parseInt(form.babyCount.value) || 0;
  var totalPeople = adults + babies;
  if (totalPeople > 5) total += (totalPeople - 5) * 10000;

  // Table setting
  if (form.memoTableSetting.checked && form.memoTableSettingDetails.value) {
    total += getTablePrice(form.memoTableSettingDetails.value, "studio");
  }

  // Options
  if (form.baekilHanbok.checked) total += 15000;
  if (form.dolDressClothing.checked) total += 35000;
  var cameraVal = form.querySelector('input[name="cameraRental"]:checked');
  if (cameraVal && cameraVal.value) total += 20000;
  if (form.iphoneSnap.checked) total += 50000;
  if (form.screenBackground.checked) total += 30000;
  if (form.calligraphyCard.checked) total += 9900;
  if (form.numberBalloon.checked) total += 5000;

  const conceptEls = document.querySelectorAll('input[name="extraConcept"]:checked');
  conceptEls.forEach(el => {
    if (el.value === '봄의 요람') total += 15000;
    if (el.value === '블루밍 데이') total += 10000;
  });
  
  document.getElementById("studioTotalPrice").textContent = total.toLocaleString() + "원";
}

function updateMilestonePrice() {
  var form = document.getElementById("milestoneForm");
  var total = 0;

  // Table price
  if (form.tableSelection.value) {
    total += getTablePrice(form.tableSelection.value, "milestone");
  }

  // Options
  if (form.baekil100Clothing.checked) total += 10000;
  if (form.baekil100Hanbok.checked) total += 15000;
  if (form.dolHanbok.checked) total += 35000;

  // Accessories
  if (form.acc_jeongjagwan.checked) total += 5000;
  if (form.acc_ilbangat.checked) total += 5000;
  if (form.acc_yugeon.checked) total += 5000;
  if (form.acc_gachae.checked) total += 5000;
  if (form.acc_meoritti.checked) total += 5000;

  if (form.bamboChair.checked) total += 5000;
  if (form.dolCushion.checked) total += 5000;
  if (form.waterproofMat.checked) total += 5000;
  if (form.foldingTable.checked) total += 10000;
  if (form.dolGrabbingSet.checked) total += 10000;
  if (form.premiumModelFruit.checked) total += 10000;
  if (form.modelBaekseolgi.checked) total += 5000;
  if (form.modelWoodBaekseolgi.checked) total += 10000;
  if (form.modelBaekseolgiCake.checked) total += 10000;
  if (form.modelSiruTteok.checked) total += 5000;
  if (form.modelPlateTeok.checked) total += 7000;
  if (form.calligraphyCard.checked) total += 9900;

  document.getElementById("milestoneTotalPrice").textContent = total.toLocaleString() + "원";
}

function updateDressPrice() {
  var form = document.getElementById("dressForm");
  var total = 0;

  // Fitting fee
  var fittingDate = form.fittingDate.value;
  if (fittingDate) {
    total += 30000;
  }

  // Options
  if (form.niceSocks.checked) total += 4000;
  if (form.tights.checked) total += 6000;
  if (form.hwadongBasket.checked) total += 5000;
  if (form.hwadongCar.checked) total += 30000;

  document.getElementById("dressTotalPrice").textContent = total.toLocaleString() + "원";
}

// ===== TOGGLE HELPERS =====
function toggleStudioTableSelect() {
  var wrap = document.getElementById("studioTableSelectWrap");
  var cb = document.getElementById("studioTableSetting");
  wrap.classList.toggle("hidden", !cb.checked);
}

function toggleDressSocksColor() {
  var wrap = document.getElementById("dressSocksColorWrap");
  var cb = document.getElementById("dressNiceSocks");
  wrap.classList.toggle("hidden", !cb.checked);
}

function toggleDressTightsColor() {
  var wrap = document.getElementById("dressTightsColorWrap");
  var cb = document.getElementById("dressTights");
  wrap.classList.toggle("hidden", !cb.checked);
}

// ===== FORM SUBMISSION =====
async function submitStudioForm(e) {
  e.preventDefault();

  try {
    const form = event.target;

    // form 안의 값 수집
    const formData = new FormData(form);
    const postData = Object.fromEntries(formData.entries());

    // 필요하면 여기서 studio 타입 표시
    postData.formType = 'studio';
    postData.submittedAt = new Date().toISOString();

    const conceptEls = form.querySelectorAll('input[name="extraConcept"]:checked');
postData.extraConcept = Array.from(conceptEls).map(el => el.value).join(', ');

    // 체크박스 처리 예시
    const tableTypeEl = form.querySelector('input[name="tableType"]:checked');
    if (tableTypeEl) {
      postData.tableType = tableTypeEl.value;
    }

    // 추가 옵션들 직접 보정이 필요하면 여기서 넣기
    const startTimeEl = document.querySelector('[name="reservationTime"], [name="startTime"]');
    const endTimeEl = document.querySelector('[name="endTime"]');
    const dateEl = document.querySelector('[name="reservationDate"], [name="date"]');
    const nameEl = document.querySelector('[name="name"]');
    const phoneEl = document.querySelector('[name="phone"]');
    const babyNameEl = document.querySelector('[name="babyName"]');
    const babyEnglishNameEl = document.querySelector('[name="babyEnglishName"]');
    const babyGenderEl = document.querySelector('[name="babyGender"]');
    const packageEl = document.querySelector('[name="packageType"]');
    const requestEl = document.querySelector('[name="request"]');
    const balloonNumberEl = document.querySelector('[name="balloonNumber"]');
const balloonColorEl = document.querySelector('[name="balloonColor"]');
    const baekilHanbokDetailEl = form.querySelector('[name="baekilHanbokDetail"]');

    if (dateEl && !postData.reservationDate && !postData.date) {
      postData.reservationDate = dateEl.value;
    }

    if (startTimeEl && !postData.reservationTime && !postData.startTime) {
      postData.startTime = startTimeEl.value;
    }

    if (endTimeEl) {
      postData.endTime = endTimeEl.value;
    }

    if (nameEl && !postData.name) postData.name = nameEl.value;
    if (phoneEl && !postData.phone) postData.phone = phoneEl.value;
    if (babyNameEl && !postData.babyName) postData.babyName = babyNameEl.value;
    if (babyEnglishNameEl && !postData.babyEnglishName) postData.babyEnglishName = babyEnglishNameEl.value;
    if (babyGenderEl && !postData.babyGender) postData.babyGender = babyGenderEl.value;
    if (packageEl && !postData.packageType) postData.packageType = packageEl.value;
    if (requestEl && !postData.request) postData.request = requestEl.value;
    if (postData.baekilHanbok === 'on') {
  if (baekilHanbokDetailEl && !postData.baekilHanbokDetail) {
    postData.baekilHanbokDetail = baekilHanbokDetailEl.value;
  }
}
    if (balloonNumberEl && !postData.balloonNumber) {
  postData.balloonNumber = balloonNumberEl.value;
}

if (balloonColorEl && !postData.balloonColor) {
  postData.balloonColor = balloonColorEl.value;
}

    // 가격 표시 요소가 있으면 같이 수집
   const priceEl = document.getElementById('studioTotalPrice');
if (priceEl) {
  postData.totalPrice = priceEl.textContent.trim();
}

    // 콘솔 확인용
    console.log('=== STUDIO SUBMIT DATA ===');
    console.log(postData);
    console.table(postData);

    if (USE_FAKE_SUBMIT) {
      // 임시 제출 모드
      alert('임시 제출 테스트 완료! 콘솔(F12)에서 전송 데이터를 확인하세요.');

      // 초기화
      form.reset();

      const endTimeInput = document.getElementById('endTime');
      if (endTimeInput) endTimeInput.value = '';

      if (typeof updateStudioPrice === 'function') {
        updateStudioPrice();
      }

      if (typeof toggleTableSettingDetails === 'function') {
        toggleTableSettingDetails();
      }

      if (typeof closeModal === 'function') {
        closeModal('studioModal');
      }

      return;
    }

    // ===== 실제 제출 모드 =====
    if (!APPS_SCRIPT_URL) {
      alert('Apps Script URL이 비어 있습니다.');
      return;
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    if (result.result === 'success') {
const kakaoMsg = buildStudioKakaoMessage(postData);
const copied = await copyTextSafely(kakaoMsg);

if (copied) {
  alert('예약 신청이 접수되었습니다.\n\n예약 정보가 복사되었습니다.\n카카오톡 채널 채팅창에 붙여넣기 해주세요.');
} else {
  alert('예약 신청이 접수되었습니다.\n\n카카오톡으로 이동 후 내용을 직접 붙여넣어 주세요.');
  console.log(kakaoMsg);
}

window.open(KAKAO_CHAT_URL, '_blank');

      form.reset();

      const endTimeInput = document.getElementById('endTime');
      if (endTimeInput) endTimeInput.value = '';

      if (typeof updateStudioPrice === 'function') {
        updateStudioPrice();
      }

      if (typeof toggleTableSettingDetails === 'function') {
        toggleTableSettingDetails();
      }

      if (typeof closeModal === 'function') {
        closeModal('studioModal');
      }
    } else {
      alert('제출은 되었지만 응답이 올바르지 않습니다.');
      console.log('submit result:', result);
    }

  } catch (error) {
    console.error('submitStudioForm error:', error);
    alert('제출 중 오류가 발생했습니다.');
  }
}

async function submitMilestoneForm(e) {
  e.preventDefault();

  try {
    var form = e.target;
    var data = new FormData(form);
    var postData = Object.fromEntries(data.entries());

    postData.formType = 'milestone';
    postData.submittedAt = new Date().toISOString();

    // 체크된 체크박스들 추가 수집
    var checkedOptions = form.querySelectorAll('input[type="checkbox"]:checked');
    checkedOptions.forEach(function(input) {
      if (!postData[input.name]) {
        postData[input.name] = input.value || 'on';
      }
    });

    // 라디오 선택값 보정
    var checkedRadios = form.querySelectorAll('input[type="radio"]:checked');
    checkedRadios.forEach(function(input) {
      postData[input.name] = input.value;
    });

    // 총 금액
    var priceEl = document.getElementById('milestoneTotalPrice');
    if (priceEl) {
      postData.totalPrice = priceEl.textContent.trim();
    }

    console.log('=== MILESTONE SUBMIT DATA ===');
    console.log(postData);
    console.table(postData);

    if (USE_FAKE_SUBMIT) {
      alert('임시 제출 테스트 완료! 콘솔(F12)에서 전송 데이터를 확인하세요.');

      if (typeof closeModal === 'function') {
        closeModal('milestoneModal');
      }

      form.reset();

      var totalPriceEl = document.getElementById('milestoneTotalPrice');
      if (totalPriceEl) totalPriceEl.textContent = '0원';

      if (typeof updateMilestonePrice === 'function') {
        updateMilestonePrice();
      }

      return;
    }

    if (!APPS_SCRIPT_URL) {
      alert('Apps Script URL이 비어 있습니다.');
      return;
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    if (result.result === 'success') {
const kakaoMsg = buildMilestoneKakaoMessage(postData);
const copied = await copyTextSafely(kakaoMsg);

if (copied) {
  alert('예약 신청이 접수되었습니다.\n\n예약 정보가 복사되었습니다.\n카카오톡 채널 채팅창에 붙여넣기 해주세요.');
} else {
  alert('예약 신청이 접수되었습니다.\n\n카카오톡으로 이동 후 내용을 직접 붙여넣어 주세요.');
  console.log(kakaoMsg);
}

window.open(KAKAO_CHAT_URL, '_blank');

      if (typeof closeModal === 'function') {
        closeModal('milestoneModal');
      }

      form.reset();

      var totalPriceEl = document.getElementById('milestoneTotalPrice');
      if (totalPriceEl) totalPriceEl.textContent = '0원';

      if (typeof updateMilestonePrice === 'function') {
        updateMilestonePrice();
      }
    } else {
      alert('제출은 되었지만 응답이 올바르지 않습니다.');
      console.log('submit result:', result);
    }

  } catch (error) {
    console.error('submitMilestoneForm error:', error);
    alert('제출 중 오류가 발생했습니다.');
  }
}

async function submitDressForm(e) {
  e.preventDefault();

  try {
    var form = e.target;
    var data = new FormData(form);
    var postData = Object.fromEntries(data.entries());

    // 니삭스: 체크했으면 색상만 남기고, 아니면 빈칸
if (postData.niceSocks === 'on') {
  postData.niceSocks = postData.niceSocksColor || '';
} else {
  postData.niceSocks = '';
}
postData.niceSocksColor = '';

// 타이즈: 체크했으면 색상만 남기고, 아니면 빈칸
if (postData.tights === 'on') {
  postData.tights = postData.tightsColor || '';
} else {
  postData.tights = '';
}
postData.tightsColor = '';

    postData.formType = 'dress';
    postData.submittedAt = new Date().toISOString();

    // 체크된 체크박스들 추가 수집
    var checkedOptions = form.querySelectorAll('input[type="checkbox"]:checked');
    checkedOptions.forEach(function(input) {
      if (!postData[input.name]) {
        postData[input.name] = input.value || 'on';
      }
    });

    // 라디오 선택값 보정
    var checkedRadios = form.querySelectorAll('input[type="radio"]:checked');
    checkedRadios.forEach(function(input) {
      postData[input.name] = input.value;
    });

    // 총 금액
    var priceEl = document.getElementById('dressTotalPrice');
    if (priceEl) {
      postData.totalPrice = priceEl.textContent.trim();
    }

    console.log('=== DRESS SUBMIT DATA ===');
    console.log(postData);
    console.table(postData);

    if (USE_FAKE_SUBMIT) {
      alert('임시 제출 테스트 완료! 콘솔(F12)에서 전송 데이터를 확인하세요.');

      if (typeof closeModal === 'function') {
        closeModal('dressModal');
      }

      form.reset();

      var totalPriceEl = document.getElementById('dressTotalPrice');
      if (totalPriceEl) totalPriceEl.textContent = '0원';

      if (typeof updateDressPrice === 'function') {
        updateDressPrice();
      }

      return;
    }

    if (!APPS_SCRIPT_URL) {
      alert('Apps Script URL이 비어 있습니다.');
      return;
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    if (result.result === 'success') {
const kakaoMsg = buildDressKakaoMessage(postData);
const copied = await copyTextSafely(kakaoMsg);

if (copied) {
  alert('예약 신청이 접수되었습니다.\n\n예약 정보가 복사되었습니다.\n카카오톡 채널 채팅창에 붙여넣기 해주세요.');
} else {
  alert('예약 신청이 접수되었습니다.\n\n카카오톡으로 이동 후 내용을 직접 붙여넣어 주세요.');
  console.log(kakaoMsg);
}

window.open(KAKAO_CHAT_URL, '_blank');
      
      if (typeof closeModal === 'function') {
        closeModal('dressModal');
      }

      form.reset();

      var totalPriceEl = document.getElementById('dressTotalPrice');
      if (totalPriceEl) totalPriceEl.textContent = '0원';

      if (typeof updateDressPrice === 'function') {
        updateDressPrice();
      }
    } else {
      alert('제출은 되었지만 응답이 올바르지 않습니다.');
      console.log('submit result:', result);
    }

  } catch (error) {
    console.error('submitDressForm error:', error);
    alert('제출 중 오류가 발생했습니다.');
  }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener("click", function(e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== ESC KEY CLOSE =====
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeImageModal();
    closeModal("studioModal");
    closeModal("milestoneModal");
    closeModal("dressModal");
  }
});

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function() {
  renderTableCards("studio-tables-list", TABLE_DATA, "studioPrice");
  renderTableCards("milestone-tables-list", TABLE_DATA, "milestonePrice");
  renderStudioOptions();
  renderMilestoneOptions();
});


function openConceptModal(imageSrc, title, price) {
  document.getElementById('conceptModalImg').src = imageSrc;
  document.getElementById('conceptModalImg').alt = title;
  document.getElementById('conceptModalTitle').textContent = title + ' (' + price + ')';
  document.getElementById('conceptImageModal').classList.add('show');
}

function closeConceptModal() {
  document.getElementById('conceptImageModal').classList.remove('show');
}

function buildStudioKakaoMessage(postData) {
const lines = [
  '[아모린느 스튜디오 예약]',
  '',
  '예약자명: ' + (postData.customerName || postData.name || ''),
  '연락처: ' + (postData.phone || ''),
  '아기 이름: ' + (postData.babyName || ''),
  '아기 영문이름: ' + (postData.babyEnglishName || ''),
  '성별: ' + (postData.babyGender || ''),
  '예약일: ' + (postData.reservationDate || ''),
  '시작 시간: ' + (postData.reservationTime || postData.startTime || ''),
  '종료 시간: ' + (postData.endTime || ''),
  '이용 시간: ' + ((postData.rentalHours || '') ? postData.rentalHours + '시간' : ''),
  '성인 인원: ' + (postData.adultCount || ''),
  '아기 인원: ' + (postData.babyCount || '')
];

  if (postData.memoTableSetting === 'on') {
    lines.push('기념일 테이블 세팅: 추가');
    if (postData.memoTableSettingDetails) {
      lines.push('테이블 종류: ' + postData.memoTableSettingDetails);
    }
  }

  if (postData.extraConcept) {
    lines.push('추가 컨셉: ' + postData.extraConcept);
  }

if (postData.baekilHanbok === 'on') {
  lines.push(
    '백일 한복: ' +
    (postData.baekilHanbokDetail || '선택')
  );
}
  if (postData.dolDressClothing === 'on') {
    lines.push('돌 한복/드레스/정장: 추가');
  }

  if (postData.cameraRental && postData.cameraRental !== 'none') {
    lines.push('카메라 대여: ' + postData.cameraRental);
  }

  if (postData.iphoneSnap === 'on') {
    lines.push('아이폰 스냅: 추가');
  }

  if (postData.screenBackground === 'on') {
    lines.push('병풍: 추가');
  }

  if (postData.calligraphyCard === 'on') {
    lines.push('자체제작 금박 캘리그라피 카드: 추가');
  }

if (postData.numberBalloon === 'on') {
  let balloonText = '대형 숫자 풍선';

  if (postData.balloonNumber || postData.balloonColor) {
    balloonText += ': ';
    if (postData.balloonNumber) balloonText += '숫자 ' + postData.balloonNumber;
    if (postData.balloonColor) balloonText += (postData.balloonNumber ? ', ' : '') + '색상 ' + postData.balloonColor;
  } else {
    balloonText += ': 추가';
  }

  lines.push(balloonText);
}

  if (postData.notes) {
    lines.push('요청사항: ' + postData.notes);
  }

  lines.push('');
  lines.push('최종 금액: ' + (postData.totalPrice || ''));
  lines.push('');
  lines.push('예약 가능 여부 확인해주세요.');

  return lines.filter(line => line !== null && line !== undefined).join('\n');
}

function buildMilestoneKakaoMessage(postData) {
  const lines = [
    '[아모린느 백일상/돌상 예약]',
    '',
    '예약자명: ' + (postData.customerName || ''),
    '연락처: ' + (postData.phone || ''),
    '아기 이름: ' + (postData.babyName || ''),
'성별: ' + (postData.babyGender || ''),
    '행사 날짜: ' + (postData.eventDate || '')
  ];

  if (postData.tableSelection) {
    lines.push('테이블: ' + postData.tableSelection);
  }

  if (postData.baekil100Clothing === 'on') {
    lines.push('백일 의상: 추가');
  }

  if (postData.baekil100Hanbok === 'on') {
    lines.push('백일 한복: 추가');
  }

  if (postData.dolHanbok === 'on') {
    lines.push('돌 한복: 추가');
  }

  if (postData.acc_jeongjagwan === 'on') {
    lines.push('정자관: 추가');
  }

  if (postData.acc_ilbangat === 'on') {
    lines.push('일반갓: 추가');
  }

    if (postData.acc_yugeon === 'on') {
    lines.push('유건: 추가');
  }

    if (postData.acc_gachae === 'on') {
    lines.push('가채: 추가');
  }


  if (postData.modelSiruTteok === 'on') {
    lines.push('모형 시루떡: 추가');
  }

  if (postData.modelPlateTeok === 'on') {
    lines.push('접시형 모형 떡: 추가');
  }

  if (postData.modelBaekseolgi === 'on') {
    lines.push('모형 백설기: 추가');
  }

  if (postData.modelWoodBaekseolgi === 'on') {
    lines.push('모형 우드 백설기: 추가');
  }

  if (postData.modelBaekseolgiCake === 'on') {
    lines.push('모형 백설기 케이크: 추가');
  }

  if (postData.premiumModelFruit === 'on') {
    lines.push('고급 모형 과일: 추가');
  }

  if (postData.foldingTable === 'on') {
    lines.push('접이식 테이블: 추가');
  }

  if (postData.bamboChair === 'on') {
    lines.push('범보의자/양털의자/돌방석: 추가');
  }

  if (postData.waterproofMat === 'on') {
    lines.push('방수요: 추가');
  }

  if (postData.dolGrabbingSet === 'on') {
    lines.push('돌잡이 세트: 추가');
  }

  if (postData.calligraphyCard === 'on') {
    lines.push('자체제작 금박 캘리그라피 카드: 추가');
  }

  if (postData.notes) {
    lines.push('요청사항: ' + postData.notes);
  }

  lines.push('');
  lines.push('최종 금액: ' + (postData.totalPrice || ''));
  lines.push('');
  lines.push('예약 가능 여부 확인해주세요.');

  return lines.filter(line => line !== null && line !== undefined).join('\n');
}

function buildDressKakaoMessage(postData) {
  const lines = [
    '[아모린느 정장/드레스 예약]',
    '',
    '예약자명: ' + (postData.customerName || ''),
    '연락처: ' + (postData.phone || ''),
    '아기 이름: ' + (postData.babyName || ''),
'성별: ' + (postData.babyGender || ''),
    '피팅 희망 날짜: ' + (postData.fittingDate || ''),
    '피팅 희망 시간: ' + (postData.fittingTime || ''),
    '행사 날짜: ' + (postData.eventDate || ''),
    '대여 상품: ' + (postData.rentalProduct || '')
  ];

  if (postData.niceSocks) {
    lines.push('니삭스: ' + postData.niceSocks);
  }

if (postData.tightsUse === 'on') {
  lines.push('타이즈 색상: ' + (postData.tights || '선택안함'));
}

  if (postData.hwadongBasket === 'on') {
    lines.push('화동 바구니: 추가');
  }

    if (postData.hwadongCar === 'on') {
    lines.push('화동카: 추가');
  }


  if (postData.notes) {
    lines.push('요청사항: ' + postData.notes);
  }

  lines.push('');
  lines.push('최종 금액: ' + (postData.totalPrice || ''));
  lines.push('');
  lines.push('예약 가능 여부 확인해주세요.');

  return lines.filter(line => line !== null && line !== undefined).join('\n');
}

async function copyTextSafely(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('clipboard copy failed:', error);
    return false;
  }
}


function toggleBalloonFields() {
  const checkbox = document.getElementById('studioBalloon');
  const fields = document.getElementById('balloonDetailFields');

  if (!checkbox || !fields) return;

  fields.style.display = checkbox.checked ? 'block' : 'none';

  if (!checkbox.checked) {
    const balloonNumberEl = document.querySelector('[name="balloonNumber"]');
    const balloonColorEl = document.querySelector('[name="balloonColor"]');

    if (balloonNumberEl) balloonNumberEl.value = '';
    if (balloonColorEl) balloonColorEl.value = '';
  }
}


function toggleStudioHanbokField() {
  const checkbox = document.getElementById('studioHanbok');
  const field = document.getElementById('studioHanbokField');

  if (!checkbox || !field) return;

  field.style.display = checkbox.checked ? 'block' : 'none';

  if (!checkbox.checked) {
    const input = document.querySelector('[name="baekilHanbokDetail"]');
    if (input) input.value = '';
  }
}
