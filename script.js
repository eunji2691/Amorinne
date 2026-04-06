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
  { id: "bridal", name: "브라이덜 샤워", desc: "예비 신부의 특별한 하루를 깨끗하고 우아한 분위기로 채워줍니다.", img: "images/bridal.jpg", studioPrice: 50000, milestonePrice: 80000 }
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
