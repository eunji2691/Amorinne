const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_cxhePn/chat';

/* ===== DATA ===== */
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

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.toggle("active");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.remove("active");
}

/* ===== MODALS ===== */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

function openImageModal(name, img) {
  document.getElementById("imageModalTitle").textContent = name;
  document.getElementById("imageModalImg").src = img;
  document.getElementById("imageModalImg").alt = name;
  document.getElementById("imageModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

window.addEventListener("click", function(event) {
  if (event.target.classList.contains("modal-backdrop")) {
    event.target.classList.add("hidden");
    document.body.style.overflow = "";
  }
});

/* ===== TABS ===== */
function initTabs() {
  document.querySelectorAll(".tab-btn[data-tab]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const tab = this.dataset.tab;

      document.querySelectorAll(".tab-btn[data-tab]").forEach(function(b) {
        b.classList.remove("active");
      });
      this.classList.add("active");

      document.querySelectorAll("[id^='tab-']").forEach(function(el) {
        el.classList.remove("active");
      });
      const target = document.getElementById("tab-" + tab);
      if (target) target.classList.add("active");

      document.querySelectorAll("[id^='service-img-']").forEach(function(el) {
        el.style.display = "none";
      });
      const img = document.getElementById("service-img-" + tab);
      if (img) img.style.display = "block";
    });
  });

  document.querySelectorAll(".sub-tab-btn[data-subtab]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const subtab = this.dataset.subtab;
      const parent = this.dataset.parent;

      document.querySelectorAll('.sub-tab-btn[data-parent="' + parent + '"]').forEach(function(b) {
        b.classList.remove("active");
      });
      this.classList.add("active");

      document.querySelectorAll('.sub-tab-btn[data-parent="' + parent + '"]').forEach(function(b) {
        const st = document.getElementById("subtab-" + b.dataset.subtab);
        if (st) st.classList.remove("active");
      });

      const target = document.getElementById("subtab-" + subtab);
      if (target) target.classList.add("active");
    });
  });
}

/* ===== RENDER ===== */
function renderTableCards(containerId, tables, priceKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let html = "";
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

function renderStudioOptions() {
  const container = document.getElementById("studio-options-list");
  if (!container) return;

  let html = '<div class="space-y-3">';

  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">백일 한복 (15,000원)</h4>';
  html += '<div class="gallery-grid">';
  BAEKIL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">돌 한복/드레스/정장 (35,000원)</h4>';
  html += '<div class="gallery-grid">';
  DOL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  STUDIO_OPTIONS.forEach(function(opt) {
    html += '<div class="card"><div class="card-header"><div><div class="card-title">' + opt.name + '</div>';
    html += '<div class="card-desc">' + opt.desc + '</div></div>';
    html += '<div class="card-price">' + opt.price.toLocaleString() + '원</div></div></div>';
  });

  html += '</div>';
  container.innerHTML = html;
}

function renderMilestoneOptions() {
  const container = document.getElementById("milestone-options-list");
  if (!container) return;

  let html = '<div class="space-y-3">';

  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">백일 한복 (15,000원)</h4>';
  html += '<div class="gallery-grid">';
  BAEKIL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">돌 한복/드레스/정장 (35,000원)</h4>';
  html += '<div class="gallery-grid">';
  DOL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">한복 악세사리 (각 5,000원)</h4>';
  html += '<div class="gallery-grid">';
  HANBOK_ACCESSORY_DATA.forEach(function(a) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + a.name.replace(/'/g, "\\'") + '\', \'' + a.img + '\')">';
    html += '<div class="aspect-square"><img src="' + a.img + '" alt="' + a.name + '" /></div>';
    html += '<p>' + a.name + '</p></div>';
  });
  html += '</div></div>';

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

/* ===== PRICE ===== */
function isWeekend(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const day = d.getDay();
  return day === 0 || day === 6;
}

function getTablePrice(tableName, type) {
  const table = TABLE_DATA.find(function(t) {
    return t.name === tableName || tableName.includes(t.id);
  });

  if (!table) {
    const map = {
      "퓨어테이블": 0,
      "로얄 테이블(WHITE)": 1,
      "로얄 테이블(YELLOW)": 2,
      "서린상": 3,
      "다온상": 4,
      "하연상": 5,
      "사파리테이블": 6,
      "브라이덜샤워": 7
    };

    const index = map[tableName];
    if (index === undefined) return 0;
    return type === "studio" ? TABLE_DATA[index].studioPrice : TABLE_DATA[index].milestonePrice;
  }

  return type === "studio" ? table.studioPrice : table.milestonePrice;
}

function updateStudioPrice() {
  const form = document.getElementById("studioForm");
  if (!form) return;

  const dateVal = form.reservationDate.value;
  const hours = parseInt(form.rentalHours.value, 10) || 1;
  const adults = parseInt(form.adultCount.value, 10) || 0;
  const babies = parseInt(form.babyCount.value, 10) || 0;

  let total = 0;

  if (isWeekend(dateVal)) {
    total = hours === 1 ? 70000 : (hours === 2 ? 120000 : 120000 + (hours - 2) * 50000);
  } else {
    total = hours === 1 ? 60000 : (hours === 2 ? 100000 : 100000 + (hours - 2) * 40000);
  }

  const totalPeople = adults + babies;
  if (totalPeople > 5) {
    total += (totalPeople - 5) * 5000;
  }

  if (form.memoTableSetting.checked) {
    total += getTablePrice(form.memoTableSettingDetails.value, "studio");
  }

  if (form.baeksilHanbok.checked) total += 15000;
  if (form.dolDressClothing.checked) total += 35000;
  if (form.iphoneSnap.checked) total += 50000;
  if (form.cameraRental.checked) total += 20000;

  document.getElementById("studioTotalPrice").innerText = total.toLocaleString() + "원";
}

function updateMilestonePrice() {
  const form = document.getElementById("milestoneForm");
  if (!form) return;

  const table = form.tableSelection.value;
  let price = 0;

  if (table.includes("퓨어") || table.includes("사파리")) price = 69000;
  else if (table.includes("로얄") || table.includes("다온")) price = 89000;
  else if (table.includes("서린")) price = 99000;
  else if (table.includes("하연")) price = 79000;
  else if (table.includes("브라이덜")) price = 80000;

  document.getElementById("milestoneTotalPrice").innerText = price.toLocaleString() + "원";
}

/* ===== FORM / KAKAO ===== */
async function handleFormSubmit(e, type) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalBtnText = btn ? btn.innerText : "";

  if (btn) {
    btn.disabled = true;
    btn.innerText = "저장 중...";
  }

  const formData = new FormData(form);
  const data = { type: type };
  formData.forEach((value, key) => {
    data[key] = value;
  });

  let msg = "";

  if (type === "studio") {
    const price = document.getElementById("studioTotalPrice").innerText;
    const options = [];

    if (data.memoTableSetting) options.push(`테이블 세팅(${data.memoTableSettingDetails})`);
    if (data.baeksilHanbok) options.push("백일 한복");
    if (data.dolDressClothing) options.push("돌 의상");
    if (data.iphoneSnap) options.push("아이폰 스냅");
    if (data.cameraRental) options.push("카메라 대여");

    msg = `[아모린느 스튜디오 예약]
성함: ${data.customerName}
연락처: ${data.phone}
아기정보: ${data.babyName || "-"} (${data.babyEnglishName || "-"}) / ${data.babyGender || "-"}
날짜: ${data.reservationDate}
시간: ${data.reservationTime} (${data.rentalHours}시간)
인원: 성인 ${data.adultCount || 0} / 아기 ${data.babyCount || 0}
선택옵션: ${options.length > 0 ? options.join(", ") : "없음"}
요청사항: ${data.notes || "-"}
금액: ${price}`;
  } else if (type === "milestone") {
    const price = document.getElementById("milestoneTotalPrice").innerText;
    msg = `[백일상/돌상 대여 예약]
성함: ${data.customerName}
연락처: ${data.phone}
날짜: ${data.eventDate}
선택: ${data.tableSelection}
요청사항: ${data.notes || "-"}
금액: ${price}`;
  } else {
    msg = `[정장/드레스 대여 예약]
성함: ${data.customerName}
연락처: ${data.phone}
날짜: ${data.eventDate}
상품: ${data.rentalProduct || "피팅 후 결정"}
요청사항: ${data.notes || "-"}`;
  }

  copyToClipboard(msg);
  showSuccessUI(KAKAO_CHANNEL_URL);

  try {
    fetch(APPS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error("Sheet save error:", err);
  }

  if (btn) {
    btn.disabled = false;
    btn.innerText = originalBtnText;
  }
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Copy failed", err);
  }

  document.body.removeChild(textarea);
}

function showSuccessUI(url) {
  const old = document.getElementById("finalOk");
  if (old) old.remove();

  const html = `
    <div id="finalOk" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
      <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:350px;width:100%;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
        <div style="font-size:40px;margin-bottom:15px;">✅</div>
        <h2 style="margin-bottom:10px;color:#333;">예약 접수 완료!</h2>
        <p style="margin-bottom:25px;font-size:15px;color:#666;line-height:1.5;">예약 내용이 자동으로 복사되었습니다.<br>아래 버튼을 눌러 카카오톡 채팅창에<br><b>붙여넣기</b>하여 보내주세요.</p>
        <a href="${url}" target="_blank" onclick="document.getElementById('finalOk').remove()" style="display:block;background:#fee500;padding:16px;border-radius:12px;text-decoration:none;color:#3c1e1e;font-weight:bold;font-size:16px;box-shadow:0 4px 10px rgba(254,229,0,0.3);">카카오톡으로 내용 보내기</a>
        <button onclick="document.getElementById('finalOk').remove()" style="margin-top:15px;background:none;border:none;color:#999;cursor:pointer;font-size:14px;text-decoration:underline;">닫기</button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", html);
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", function() {
  initTabs();

  renderTableCards("studio-tables-list", TABLE_DATA, "studioPrice");
  renderTableCards("milestone-tables-list", TABLE_DATA, "milestonePrice");
  renderStudioOptions();
  renderMilestoneOptions();

  const useTableCheckbox = document.getElementById("useTable");
  const tableSelectWrap = document.getElementById("studioTableSelectWrap");
  if (useTableCheckbox && tableSelectWrap) {
    useTableCheckbox.addEventListener("change", function() {
      tableSelectWrap.classList.toggle("hidden", !useTableCheckbox.checked);
      updateStudioPrice();
    });
  }

  const studioForm = document.getElementById("studioForm");
  if (studioForm) {
    studioForm.addEventListener("change", updateStudioPrice);
    studioForm.addEventListener("submit", function(e) {
      handleFormSubmit(e, "studio");
    });
    updateStudioPrice();
  }

  const milestoneForm = document.getElementById("milestoneForm");
  if (milestoneForm) {
    milestoneForm.addEventListener("change", updateMilestonePrice);
    milestoneForm.addEventListener("submit", function(e) {
      handleFormSubmit(e, "milestone");
    });
    updateMilestonePrice();
  }

  const dressForm = document.getElementById("dressForm");
  if (dressForm) {
    dressForm.addEventListener("submit", function(e) {
      handleFormSubmit(e, "dress");
    });
  }
});
