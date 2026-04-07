/* ===== Amorinne Static Website Script (Final Stable Version 3.0) ===== */

// ===== 1. 설정값 =====
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUKinT_MonHT9Wg254mBDDn0TJvXadTlbxpBU73g9jNjT3j41hOJS5g5y5Y3lbwCN0/exec';
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_cxhePn/chat';

// ===== 2. 데이터 정의 =====
const TABLE_DATA = [
  { id: "pure", name: "퓨어 테이블", studioPrice: 35000, milestonePrice: 69000 },
  { id: "royal-white", name: "로얄 테이블 (WHITE)", studioPrice: 40000, milestonePrice: 89000 },
  { id: "royal-yellow", name: "로얄 테이블 (YELLOW)", studioPrice: 40000, milestonePrice: 89000 },
  { id: "seorin", name: "서린상", studioPrice: 45000, milestonePrice: 99000 },
  { id: "daon", name: "다온상", studioPrice: 40000, milestonePrice: 89000 },
  { id: "hayeon", name: "하연상", studioPrice: 35000, milestonePrice: 79000 },
  { id: "safari", name: "사파리 테이블", studioPrice: 35000, milestonePrice: 69000 },
  { id: "bridal", name: "브라이덜 샤워", studioPrice: 50000, milestonePrice: 80000 }
];

// ===== 3. 공통 UI 제어 =====
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

function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
}

// ===== 4. 가격 및 시간 계산 =====
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

  if (hours === 1) total += weekend ? 70000 : 60000;
  else if (hours === 2) total += weekend ? 120000 : 100000;

  const adults = parseInt(form.adultCount.value) || 0;
  const babies = parseInt(form.babyCount.value) || 0;
  if (adults + babies > 5) total += (adults + babies - 5) * 10000;

  if (form.memoTableSetting.checked) {
    const tableId = form.memoTableSettingDetails.value;
    const table = TABLE_DATA.find(t => t.id === tableId);
    if (table) total += table.studioPrice;
  }

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

// ===== 5. 폼 제출 및 카카오 연동 (최종 UX) =====
async function submitStudioForm(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById("studioSubmitBtn");
  
  submitBtn.disabled = true;
  submitBtn.innerText = "저장 중...";

  try {
    const formData = new FormData(form);
    const totalPrice = updateStudioPrice();
    const dateStr = formData.get("reservationDate");
    const dayType = isWeekend(dateStr) ? "주말" : "평일";
    
    let tableInfo = "없음";
    if (formData.get("memoTableSetting") === "on") {
      const tableId = formData.get("memoTableSettingDetails");
      const table = TABLE_DATA.find(t => t.id === tableId);
      tableInfo = table ? table.name : "선택 안됨";
    }

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

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    if (result.result === "success") {
      // 1. 클립보드 복사
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(kakaoMsg);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = kakaoMsg;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      } catch (err) { console.error(err); }

      // 2. 성공 안내 UI 표시 (팝업 차단 방지를 위해 버튼 클릭 유도)
      const successModalHtml = `
        <div id="successModal" class="modal-backdrop" style="z-index:10000;">
          <div class="modal" style="text-align:center; padding:2rem;">
            <h3 style="margin-bottom:1rem; color:var(--primary);">예약 접수 완료!</h3>
            <p style="margin-bottom:1.5rem; font-size:0.9rem; line-height:1.6;">
              예약 내용이 클립보드에 복사되었습니다.<br>
              아래 버튼을 눌러 카카오톡 채널 채팅창에<br>
              <b>'붙여넣기'</b>를 해서 보내주시면 예약이 확정됩니다.
            </p>
            <button onclick="location.href='${KAKAO_CHANNEL_URL}'" class="btn btn-primary" style="width:100%; margin-bottom:0.5rem;">카카오톡으로 내용 보내기</button>
            <button onclick="document.getElementById('successModal').remove();" class="btn btn-outline" style="width:100%;">닫기</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', successModalHtml);

      // 3. 기존 폼 초기화 및 모달 닫기
      form.reset();
      document.getElementById("studioTotalPrice").textContent = "0원";
      document.getElementById("studioTableSelectWrap").classList.add("hidden");
      closeModal("studioModal");
    } else {
      throw new Error(result.error || "저장 실패");
    }
  } catch (error) {
    alert("오류가 발생했습니다: " + error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "예약 접수";
  }
}

// ===== 6. 초기화 =====
document.addEventListener("DOMContentLoaded", () => {
  // 스무스 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ESC 키 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal("studioModal");
      closeModal("milestoneModal");
      closeModal("dressModal");
      const successModal = document.getElementById('successModal');
      if (successModal) successModal.remove();
    }
  });
});
