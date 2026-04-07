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
  { name: "백일한복 1", img: "images/b100beige.jpg" },
  { name: "백일한복 2", img: "images/b100sky.jpg" },
  { name: "백일한복 3", img: "images/b100yellow.jpg" },
  { name: "백일한복 4", img: "images/b100green.jpg" },
  { name: "백일한복 5", img: "images/g100beige.jpg" },
  { name: "백일한복 6", img: "images/g100yellow.jpg" },
  { name: "백일한복 7", img: "images/g100mint.jpg" },
  { name: "백일한복 8", img: "images/g100colorful.jpg" }
];

const DOL_HANBOK_DATA = [
  { name: "돌한복 1", img: "images/b1yellow.jpg" },
  { name: "돌한복 2", img: "images/b1sky.jpg" },
  { name: "돌한복 3", img: "images/g1colorful.jpg" },
  { name: "돌한복 4", img: "images/g1haru.jpg" }
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
  if (form.baeksilHanbok.checked) total += 15000;
  if (form.dolDressClothing.checked) total += 35000;
  var cameraVal = form.querySelector('input[name="cameraRental"]:checked');
  if (cameraVal && cameraVal.value) total += 20000;
  if (form.iphoneSnap.checked) total += 50000;
  if (form.screenBackground.checked) total += 30000;
  if (form.calligraphyCard.checked) total += 9900;
  if (form.numberBalloon.checked) total += 5000;

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
function submitStudioForm(e) {
  e.preventDefault();
  var form = e.target;
  var data = new FormData(form);
  var msg = "스튜디오 예약이 접수되었습니다!\n\n";
  msg += "예약자: " + data.get("customerName") + "\n";
  msg += "연락처: " + data.get("phone") + "\n";
  msg += "날짜: " + data.get("reservationDate") + "\n";
  msg += "시간: " + data.get("rentalHours") + "시간\n\n";
  msg += "카카오채널에서 예약 확정을 진행해주세요.\nhttp://pf.kakao.com/_cxhePn";
  alert(msg);
  closeModal("studioModal");
  form.reset();
  document.getElementById("studioTotalPrice").textContent = "0원";
}

function submitMilestoneForm(e) {
  e.preventDefault();
  var form = e.target;
  var data = new FormData(form);
  var msg = "백일상·돌상 대여 예약이 접수되었습니다!\n\n";
  msg += "예약자: " + data.get("customerName") + "\n";
  msg += "연락처: " + data.get("phone") + "\n";
  msg += "행사 날짜: " + data.get("eventDate") + "\n";
  msg += "테이블: " + data.get("tableSelection") + "\n\n";
  msg += "카카오채널에서 예약 확정을 진행해주세요.\nhttp://pf.kakao.com/_cxhePn";
  alert(msg);
  closeModal("milestoneModal");
  form.reset();
  document.getElementById("milestoneTotalPrice").textContent = "0원";
}

function submitDressForm(e) {
  e.preventDefault();
  var form = e.target;
  var data = new FormData(form);
  var msg = "정장·드레스 대여 예약이 접수되었습니다!\n\n";
  msg += "예약자: " + data.get("customerName") + "\n";
  msg += "연락처: " + data.get("phone") + "\n";
  msg += "피팅 날짜: " + data.get("fittingDate") + "\n";
  msg += "행사 날짜: " + data.get("eventDate") + "\n\n";
  msg += "카카오채널에서 예약 확정을 진행해주세요.\nhttp://pf.kakao.com/_cxhePn";
  alert(msg);
  closeModal("dressModal");
  form.reset();
  document.getElementById("dressTotalPrice").textContent = "0원";
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

function openImageModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = src;
}

function closeImageModal() {
  document.getElementById("imageModal").style.display = "none";
}

function updateEndTime() {
  const form = document.getElementById("studioForm");

  const startTime = form.reservationTime.value;
  const hours = form.rentalHours.value;

  if (!startTime || !hours) {
    document.getElementById("endTime").value = "";
    return;
  }

  const [h, m] = startTime.split(":").map(Number);
  let endHour = h + parseInt(hours);

  const endTimeStr =
    String(endHour).padStart(2, "0") + ":" + String(m).padStart(2, "0");

  document.getElementById("endTime").value = endTimeStr;
}



/* =========================
   아모린느 - 무인 셀프 스튜디오 예약
   Google Sheets 저장 + 카카오 채널 연결
========================= */

/* ===== 1. 여기 3개는 꼭 네 값으로 바꿔야 함 ===== */
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUKinT_MonHT9Wg254mBDDn0TJvXadTlbxpBU73g9jNjT3j41hOJS5g5y5Y3lbwCN0/exec';
const KAKAO_JS_KEY = '0363cbf7ba6ce9b5aff68c07b1c8b248';
const KAKAO_CHANNEL_ID = 'cxhePn'; // 추천: 언더바 없이 입력. 예) cxhePn
/* ===== 설정값 끝 ===== */

// 카카오 SDK 초기화
if (window.Kakao && !Kakao.isInitialized()) {
  Kakao.init(KAKAO_JS_KEY);
}

// 가격표
const STUDIO_PRICES = {
  weekday: { '1': 60000, '2': 100000 },
  weekend: { '1': 70000, '2': 120000 }
};

const TABLE_PRICES = {
  '퓨어테이블_35000': 35000,
  '로얄테이블WHITE_40000': 40000,
  '로얄테이블YELLOW_40000': 40000,
  '서린상_45000': 45000,
  '다온상_40000': 40000,
  '하연상_35000': 35000,
  '사파리테이블_35000': 35000,
  '프리미엄연화상_85000': 85000,
  '브라이덜샤워_50000': 50000
};

const CAMERA_PRICES = {
  '': 0,
  'mirrorless': 20000,
  'polaroid': 20000
};

function formatPrice(num) {
  return Number(num || 0).toLocaleString('ko-KR') + '원';
}

// 종료 시간 계산
function updateEndTime() {
  const reservationDate = document.getElementById('reservationDate')?.value;
  const reservationTime = document.getElementById('reservationTime')?.value;
  const rentalHours = document.getElementById('rentalHours')?.value;
  const endTimeInput = document.getElementById('endTime');

  if (!endTimeInput) return;

  if (reservationDate && reservationTime && rentalHours) {
    const startDateTime = new Date(`${reservationDate}T${reservationTime}:00`);
    startDateTime.setHours(startDateTime.getHours() + parseInt(rentalHours, 10));

    const endHours = String(startDateTime.getHours()).padStart(2, '0');
    const endMinutes = String(startDateTime.getMinutes()).padStart(2, '0');
    endTimeInput.value = `${endHours}:${endMinutes}`;
  } else {
    endTimeInput.value = '';
  }
}

// 테이블 상세 열기/닫기
function toggleTableSettingDetails() {
  const memoTableSetting = document.getElementById('memoTableSetting');
  const group = document.getElementById('tableSettingDetailsGroup');
  const select = document.getElementById('memoTableSettingDetails');

  if (!memoTableSetting || !group || !select) return;

  if (memoTableSetting.checked) {
    group.classList.remove('hidden');
  } else {
    group.classList.add('hidden');
    select.value = '';
  }
}

// 가격 계산
function updateStudioPrice() {
  const reservationDateStr = document.getElementById('reservationDate')?.value;
  const rentalHours = document.getElementById('rentalHours')?.value;
  const totalPriceEl = document.getElementById('studioTotalPrice');

  let basePrice = 0;

  if (reservationDateStr && rentalHours) {
    const reservationDate = new Date(reservationDateStr);
    const dayOfWeek = reservationDate.getDay();
    const dayType = (dayOfWeek === 0 || dayOfWeek === 6) ? 'weekend' : 'weekday';
    basePrice = STUDIO_PRICES[dayType][rentalHours] || 0;
  }

  let tablePrice = 0;
  const memoTableSetting = document.getElementById('memoTableSetting')?.checked;
  const memoTableSettingDetails = document.getElementById('memoTableSettingDetails')?.value;
  if (memoTableSetting && memoTableSettingDetails) {
    tablePrice = TABLE_PRICES[memoTableSettingDetails] || 0;
  }

  let optionPrice = 0;
  const checkOptions = [
    { id: 'baeksilHanbok', price: 15000 },
    { id: 'dolDressClothing', price: 35000 },
    { id: 'iphoneSnap', price: 50000 },
    { id: 'screenBackground', price: 30000 },
    { id: 'calligraphyCard', price: 9900 },
    { id: 'numberBalloon', price: 5000 }
  ];

  checkOptions.forEach(option => {
    const el = document.getElementById(option.id);
    if (el && el.checked) optionPrice += option.price;
  });

  const cameraRentalElement = document.querySelector('input[name="cameraRental"]:checked');
  const cameraValue = cameraRentalElement ? cameraRentalElement.value : '';
  optionPrice += CAMERA_PRICES[cameraValue] || 0;

  const totalPrice = basePrice + tablePrice + optionPrice;

  if (totalPriceEl) {
    totalPriceEl.textContent = formatPrice(totalPrice);
  }

  updateEndTime();
}



// 최종 제출
async function submitStudioForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = document.getElementById('studioSubmitBtn');
  const formData = new FormData(form);

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '저장 중...';
  }

  try {
    const data = {};

    // 기본값
    data.customerName = formData.get('customerName');
    data.phone = formData.get('phone');
    data.reservationDate = formData.get('reservationDate');
    data.reservationTime = formData.get('reservationTime');
    data.rentalHours = formData.get('rentalHours');
    data.adultCount = formData.get('adultCount') || '0';
    data.babyCount = formData.get('babyCount') || '0';
    data.notes = formData.get('notes') || '';

    // 필수값 검사
    if (!data.customerName || !data.phone || !data.reservationDate || !data.reservationTime || !data.rentalHours) {
      throw new Error('필수 입력 항목을 모두 채워주세요.');
    }

    updateEndTime();
    data.endTime = document.getElementById('endTime')?.value || '';

    // 평일/주말 판별
    const reservationDate = new Date(data.reservationDate);
    const dayOfWeek = reservationDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    data.dayType = isWeekend ? '주말' : '평일';

    // 금액 계산
    const basePrice = STUDIO_PRICES[isWeekend ? 'weekend' : 'weekday'][data.rentalHours] || 0;

    let tablePrice = 0;
    data.memoTableSetting = document.getElementById('memoTableSetting')?.checked ? 'Y' : 'N';
    data.memoTableSettingDetails = '';

 if (data.memoTableSetting === 'Y') {
  const selectedTable = document.getElementById('memoTableSettingDetails')?.value || '';
  if (!selectedTable) {
    throw new Error('기념일 테이블 셋팅을 선택해주세요.');
  }

  const tableNameMap = {
    '퓨어테이블_35000': '퓨어테이블',
    '로얄테이블WHITE_40000': '로얄 테이블(WHITE)',
    '로얄테이블YELLOW_40000': '로얄 테이블(YELLOW)',
    '서린상_45000': '서린상',
    '다온상_40000': '다온상',
    '하연상_35000': '하연상',
    '사파리테이블_35000': '사파리테이블',
    '프리미엄연화상_85000': '프리미엄 연화상(스튜디오 전용)',
    '브라이덜샤워_50000': '브라이덜샤워'
  };

  data.memoTableSettingDetails = tableNameMap[selectedTable] || selectedTable;
  tablePrice = TABLE_PRICES[selectedTable] || 0;
}

    let optionPrice = 0;
    const optionSummary = [];
    const priceDetails = [];

    priceDetails.push(`기본 ${data.rentalHours}시간 (${data.dayType}): ${formatPrice(basePrice)}`);

    if (tablePrice > 0) {
      priceDetails.push(`테이블 (${data.memoTableSettingDetails}): ${formatPrice(tablePrice)}`);
    }

    const paidOptions = [
      { id: 'baeksilHanbok', name: '백일한복', price: 15000 },
      { id: 'dolDressClothing', name: '돌 한복/드레스/정장', price: 35000 },
      { id: 'iphoneSnap', name: '아이폰 스냅', price: 50000 },
      { id: 'screenBackground', name: '병풍 추가', price: 30000 },
      { id: 'calligraphyCard', name: '자체제작 금박 캘리그라피 카드', price: 9900 },
      { id: 'numberBalloon', name: '대형 숫자 풍선', price: 5000 }
    ];

    paidOptions.forEach(option => {
      const el = document.getElementById(option.id);
      if (el && el.checked) {
        data[option.id] = 'Y';
        optionPrice += option.price;
        optionSummary.push(option.name);
        priceDetails.push(`${option.name}: ${formatPrice(option.price)}`);
      } else {
        data[option.id] = 'N';
      }
    });

    const cameraRentalElement = document.querySelector('input[name="cameraRental"]:checked');
    const cameraValue = cameraRentalElement ? cameraRentalElement.value : '';
    const cameraNameMap = {
      '': '없음',
      mirrorless: '미러리스',
      polaroid: '폴라로이드'
    };

    data.cameraRental = cameraNameMap[cameraValue] || '없음';

    const cameraPrice = CAMERA_PRICES[cameraValue] || 0;
    optionPrice += cameraPrice;

    if (cameraPrice > 0) {
      optionSummary.push(`카메라: ${data.cameraRental}`);
      priceDetails.push(`카메라 (${data.cameraRental}): ${formatPrice(cameraPrice)}`);
    }

    data.optionSummary = optionSummary.join(', ');
    data.priceDetails = priceDetails.join('\n');
    data.basePrice = basePrice;
    data.tablePrice = tablePrice;
    data.optionPrice = optionPrice;
    data.totalPrice = basePrice + tablePrice + optionPrice;

    data.reservationType = '무인 셀프 스튜디오';
    data.clientCreatedAt = new Date().toISOString();
    data.referrer = window.location.href;

    // 카카오 문구
data.kakaoMessage =
`[무인 셀프 스튜디오 예약]
예약자: ${data.customerName}
연락처: ${data.phone}
예약일: ${data.reservationDate} ${data.reservationTime} (${data.dayType})
대여시간: ${data.rentalHours}시간 (종료: ${data.endTime})
성인/아기: ${data.adultCount}명 / ${data.babyCount}명
기념일 테이블: ${document.getElementById('memoTableSetting').checked
  ? (document.getElementById('memoTableSettingDetails').options[document.getElementById('memoTableSettingDetails').selectedIndex]?.text || '없음')
  : '없음'}
추가 옵션: ${data.optionSummary || '없음'}
총 예상 금액: ${formatPrice(data.totalPrice)}
요청사항: ${data.notes || '없음'}`;

    data.originalJSON = JSON.stringify(data);

    // 시트 저장
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

// 저장 성공 확인
if (result.result !== 'success') {
  throw new Error(result.error || '예약 저장 실패');
}

// 사용자 안내
alert('예약 접수가 완료되었습니다.\n카카오톡 채널로 이동합니다.');

// 클립보드 복사
try {
  await navigator.clipboard.writeText(data.kakaoMessage);
} catch (err) {}

// 카카오톡 채널 열기
window.open('https://pf.kakao.com/_cxhePn/chat', '_blank');


    

    // 초기화
    form.reset();
    const endTimeInput = document.getElementById('endTime');
    if (endTimeInput) endTimeInput.value = '';
    updateStudioPrice();
    toggleTableSettingDetails();

    if (typeof closeModal === 'function') {
      closeModal('studioModal');
    }

  } catch (error) {
    console.error(error);
    alert(error.message || '예약 저장 중 오류가 발생했습니다.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '예약 접수';
    }
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', function () {
  const studioForm = document.getElementById('studioForm');
  if (studioForm) {
    updateStudioPrice();
    toggleTableSettingDetails();
  }
});
