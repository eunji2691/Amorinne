/* ===== Amorinne Static Website Script (Final Integrated Version 2.0) ===== */

// ===== 1. 설정값 (이 부분만 수정하세요) =====
// 구글 앱스 스크립트 배포 후 생성된 '웹 앱 URL'을 여기에 넣으세요.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxnoGjbVVpfCmXzaLzlmmoxwWpzfkjJboOZwWcGRbWdbcEFx6s1gY0MLUgts3ZGE2b1Jw/exec';
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_cxhePn/chat';

// ===== 2. 데이터 정의 =====
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
  { id: "calligraphyCard", name: "캘리그라피 카드", price: 9900 },
  { id: "iphoneSnap", name: "아이폰 스냅", price: 50000 },
  { id: "screenBackground", name: "병풍 추가", price: 30000 },
  { id: "numberBalloon", name: "대형 숫자 풍선", price: 5000 }
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

// ===== 3. 공통 UI 제어 =====
function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
}

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
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  if (modal && modalImg) {
    modalImg.src = img;
    modal.style.display = "flex";
  }
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  if (modal) modal.style.display = "none";
}

// ===== 4. 탭 제어 =====
document.querySelectorAll(".tab-btn[data-tab]").forEach(btn => {
  btn.addEventListener("click", function() {
    const tab = this.dataset.tab;
    document.querySelectorAll(".tab-btn[data-tab]").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    document.querySelectorAll("[id^='tab-']").forEach(el => el.classList.remove("active"));
    const target = document.getElementById("tab-" + tab);
    if (target) target.classList.add("active");
  });
});

document.querySelectorAll(".sub-tab-btn[data-subtab]").forEach(btn => {
  btn.addEventListener("click", function() {
    const subtab = this.dataset.subtab;
    const parent = this.dataset.parent;
    document.querySelectorAll(`.sub-tab-btn[data-parent="${parent}"]`).forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    document.querySelectorAll(`.sub-tab-btn[data-parent="${parent}"]`).forEach(b => {
      const st = document.getElementById("subtab-" + b.dataset.subtab);
      if (st) st.classList.remove("active");
    });
    const target = document.getElementById("subtab-" + subtab);
    if (target) target.classList.add("active");
  });
});

// ===== 5. 가격 계산 로직 =====
function isWeekend(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const day = d.getDay();
  return day === 0 || day === 6;
}

function updateEndTime() {
  const form = document.getElementById("studioForm");
  const startTime = form.reservationTime.value;
  const hours = form.rentalHours.value;
  const endTimeInput = document.getElementById("endTime");
  if (!startTime || !hours) {
    endTimeInput.value = "";
    return;
  }
  const [h, m] = startTime.split(":").map(Number);
  let endHour = h + parseInt(hours);
  endTimeInput.value = `${String(endHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function toggleTableSettingDetails() {
  const wrap = document.getElementById("studioTableSelectWrap");
  const cb = document.getElementById("studioTableSetting");
  if (wrap && cb) wrap.classList.toggle("hidden", !cb.checked);
  updateStudioPrice();
}

function updateStudioPrice() {
  const form = document.getElementById("studioForm");
  if (!form) return 0;
  let total = 0;
  const dateStr = form.reservationDate.value;
  const hours = parseInt(form.rentalHours.value) || 0;
  const weekend = isWeekend(dateStr);

  // 기본 대여료
  if (hours === 1) total += weekend ? 70000 : 60000;
  else if (hours === 2) total += weekend ? 120000 : 100000;

  // 인원 추가 (5명 초과 시 1인당 1만)
  const adults = parseInt(form.adultCount.value) || 0;
  const babies = parseInt(form.babyCount.value) || 0;
  if (adults + babies > 5) total += (adults + babies - 5) * 10000;

  // 테이블 세팅
  if (form.memoTableSetting.checked) {
    const tableId = form.memoTableSettingDetails.value;
    const table = TABLE_DATA.find(t => t.id === tableId);
    if (table) total += table.studioPrice;
  }

  // 유료 옵션
  if (form.baeksilHanbok.checked) total += 15000;
  if (form.dolDressClothing.checked) total += 35000;
  const camera = form.querySelector('input[name="cameraRental"]:checked');
  if (camera && camera.value !== "없음") total += 20000;
  if (form.iphoneSnap.checked) total += 50000;
  if (form.screenBackground.checked) total += 30000;
  if (form.calligraphyCard.checked) total += 9900;
  if (form.numberBalloon.checked) total += 5000;

  const display = document.getElementById("studioTotalPrice");
  if (display) display.textContent = total.toLocaleString() + "원";
  return total;
}

// ===== 6. 폼 제출 (핵심 로직) =====
async function submitStudioForm(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById("studioSubmitBtn");
  
  // 1. 버튼 비활성화
  submitBtn.disabled = true;
  submitBtn.innerText = "저장 중...";

  try {
    const formData = new FormData(form);
    const totalPrice = updateStudioPrice();
    const dateStr = formData.get("reservationDate");
    const dayType = isWeekend(dateStr) ? "주말" : "평일";
    
    // 테이블 정보 정리
    let tableInfo = "없음";
    if (formData.get("memoTableSetting") === "on") {
      const tableId = formData.get("memoTableSettingDetails");
      const table = TABLE_DATA.find(t => t.id === tableId);
      tableInfo = table ? table.name : "선택 안됨";
    }

    // 옵션 정보 정리
    let options = [];
    if (formData.get("baeksilHanbok") === "on") options.push("백일 한복");
    if (formData.get("dolDressClothing") === "on") options.push("돌 한복/드레스/정장");
    const camera = formData.get("cameraRental");
    if (camera && camera !== "없음") options.push(`카메라 대여(${camera})`);
    if (formData.get("iphoneSnap") === "on") options.push("아이폰 스냅");
    if (formData.get("screenBackground") === "on") options.push("병풍 추가");
    if (formData.get("calligraphyCard") === "on") options.push("캘리그라피 카드");
    if (formData.get("numberBalloon") === "on") options.push("숫자 풍선");
    const optionSummary = options.length > 0 ? options.join(", ") : "없음";

    // 카카오 전송 문구 생성
    const kakaoMsg = `[무인 셀프 스튜디오 예약]
예약자: ${formData.get("customerName")}
연락처: ${formData.get("phone")}
예약일: ${dateStr} ${formData.get("reservationTime")} (${dayType})
대여시간: ${formData.get("rentalHours")}시간 (종료: ${document.getElementById("endTime").value})
성인/아기: ${formData.get("adultCount")}명 / ${formData.get("babyCount")}명
기념일 테이블: ${tableInfo}
추가 옵션: ${optionSummary}
총 예상 금액: ${totalPrice.toLocaleString()}원
요청사항: ${formData.get("notes") || "없음"}`;

    // 전송 데이터 조립
    const postData = {
      reservationType: '무인 셀프 스튜디오',
      customerName: formData.get("customerName"),
      phone: formData.get("phone"),
      reservationDate: dateStr,
      reservationTime: formData.get("reservationTime"),
      rentalHours: formData.get("rentalHours"),
      endTime: document.getElementById("endTime").value,
      dayType: dayType,
      adultCount: formData.get("adultCount"),
      babyCount: formData.get("babyCount"),
      memoTableSetting: formData.get("memoTableSetting") === "on" ? "Y" : "N",
      memoTableSettingDetails: tableInfo,
      optionSummary: optionSummary,
      totalPrice: totalPrice,
      notes: formData.get("notes"),
      kakaoMessage: kakaoMsg,
      clientCreatedAt: new Date().toLocaleString()
    };

    // 2. Google Apps Script 전송
const response = await fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  },
  body: JSON.stringify(postData)
});

    const result = await response.json();

    if (result.result === "success") {
      // 3. 성공 처리
      alert("예약 접수가 완료되었습니다. 확인을 누르면 카카오톡 채널로 이동합니다.\n\n채팅창에 '붙여넣기'를 해서 예약 내용을 보내주세요!");
      
      // 클립보드 복사
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(kakaoMsg);
        } else {
          // 구형 브라우저 대응
          const textArea = document.createElement("textarea");
          textArea.value = kakaoMsg;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      } catch (err) {
        console.error("클립보드 복사 실패", err);
      }

      // 카카오 채널 열기
      window.open(KAKAO_CHANNEL_URL, '_blank');

      // 폼 초기화 및 닫기
      form.reset();
      document.getElementById("studioTotalPrice").textContent = "0원";
      document.getElementById("studioTableSelectWrap").classList.add("hidden");
      closeModal("studioModal");
    } else {
      throw new Error(result.error || "저장 실패");
    }
  } catch (error) {
    console.error(error);
    alert("오류가 발생했습니다: " + error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "예약 접수";
  }
}

// ===== 7. 초기화 및 기타 기능 =====
function renderTableCards(containerId, tables, priceKey) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let html = "";
  tables.forEach(t => {
    html += `<div class="card" onclick="openImageModal('${t.name}', '${t.img}')">
      <div class="card-img-wrapper"><img src="${t.img}" alt="${t.name}" />
      <div class="card-img-overlay"><span>클릭하여 확대</span></div></div>
      <div class="card-header"><div><div class="card-title">${t.name}</div>
      <div class="card-desc">${t.desc}</div></div>
      <div class="card-price">${t[priceKey].toLocaleString()}원</div></div>
    </div>`;
  });
  container.innerHTML = html;
}

function renderStudioOptions() {
  const container = document.getElementById("studio-options-list");
  if (!container) return;
  let html = '<div class="space-y-3">';
  
  // 한복 섹션
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">백일 한복 (15,000원)</h4><div class="gallery-grid">';
  BAEKIL_HANBOK_DATA.forEach(h => {
    html += `<div class="gallery-item" onclick="openImageModal('${h.name}', '${h.img}')"><div class="aspect-square"><img src="${h.img}" alt="${h.name}" /></div><p>${h.name}</p></div>`;
  });
  html += '</div></div>';

  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">돌 한복/드레스/정장 (35,000원)</h4><div class="gallery-grid">';
  DOL_HANBOK_DATA.forEach(h => {
    html += `<div class="gallery-item" onclick="openImageModal('${h.name}', '${h.img}')"><div class="aspect-square"><img src="${h.img}" alt="${h.name}" /></div><p>${h.name}</p></div>`;
  });
  html += '</div></div>';

  STUDIO_OPTIONS.forEach(opt => {
    html += `<div class="card"><div class="card-header"><div><div class="card-title">${opt.name}</div></div><div class="card-price">${opt.price.toLocaleString()}원</div></div></div>`;
  });
  container.innerHTML = html + '</div>';
}

// 초기 실행
document.addEventListener("DOMContentLoaded", () => {
  renderTableCards("studio-tables-list", TABLE_DATA, "studioPrice");
  renderStudioOptions();
  
  // ESC 키 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeImageModal();
      closeModal("studioModal");
      closeModal("milestoneModal");
      closeModal("dressModal");
    }
  });
});
