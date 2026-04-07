// 설정값
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_cxhePn/chat';

const TABLE_PRICES = {
  "pure": { name: "퓨어 테이블", price: 35000 },
  "royal-white": { name: "로얄 테이블 WHITE", price: 40000 },
  "royal-yellow": { name: "로얄 테이블 YELLOW", price: 40000 },
  "seorin": { name: "서린상", price: 45000 },
  "daon": { name: "다온상", price: 40000 },
  "hayeon": { name: "하연상", price: 35000 },
  "safari": { name: "사파리 테이블", price: 35000 },
  "bridal": { name: "브라이덜 샤워", price: 50000 }
};

// 모달 기본 함수
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  document.body.style.overflow = "";
}

// 실시간 자동 계산 로직 연동
document.addEventListener('change', function(e) {
  if (e.target.closest('#studioForm')) {
    calculateStudio();
  }
});

function calculateStudio() {
  const form = document.getElementById("studioForm");
  const dateVal = form.reservationDate.value;
  const timeVal = form.reservationTime.value;
  const hours = parseInt(form.rentalHours.value) || 0;
  
  // 1. 종료 시간 계산
  if (timeVal && hours) {
    let [h, m] = timeVal.split(":").map(Number);
    let endH = (h + hours) % 24;
    document.getElementById("endTime").value = `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  // 2. 가격 계산
  let total = 0;
  if (dateVal && hours > 0) {
    const isWeekend = [0, 6].includes(new Date(dateVal).getDay());
    if (hours === 1) total = isWeekend ? 70000 : 60000;
    else total = isWeekend ? 120000 : 100000;
  }

  const people = (parseInt(form.adultCount.value) || 0) + (parseInt(form.babyCount.value) || 0);
  if (people > 5) total += (people - 5) * 10000;

  const tableSelectWrap = document.getElementById("studioTableSelectWrap");
  if (form.memoTableSetting.checked) {
    tableSelectWrap.classList.remove("hidden");
    const tableId = form.memoTableSettingDetails.value;
    if (TABLE_PRICES[tableId]) total += TABLE_PRICES[tableId].price;
  } else {
    tableSelectWrap.classList.add("hidden");
  }

  if (form.baeksilHanbok.checked) total += 15000;
  if (form.dolDressClothing.checked) total += 35000;
  if (form.querySelector('input[name="cameraRental"]:checked').value !== "없음") total += 20000;
  if (form.iphoneSnap.checked) total += 50000;
  if (form.screenBackground.checked) total += 30000;
  if (form.calligraphyCard.checked) total += 9900;
  if (form.numberBalloon.checked) total += 5000;

  document.getElementById("studioTotalPrice").textContent = total.toLocaleString() + "원";
  return total;
}

// 폼 제출
document.getElementById("studioForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const btn = document.getElementById("studioSubmitBtn");
  btn.disabled = true;
  btn.innerText = "저장 중...";

  try {
    const form = e.target;
    const formData = new FormData(form);
    const totalPrice = calculateStudio();
    const dateVal = formData.get("reservationDate");
    const isWeekend = [0, 6].includes(new Date(dateVal).getDay()) ? "주말" : "평일";
    const tableId = formData.get("memoTableSettingDetails");
    const tableName = formData.get("memoTableSetting") ? (TABLE_PRICES[tableId]?.name || "선택안함") : "없음";
    
    // 옵션 텍스트 정리
    let opts = [];
    if(formData.get("baeksilHanbok")) opts.push("백일 한복");
    if(formData.get("dolDressClothing")) opts.push("돌 의상");
    const cam = formData.get("cameraRental");
    if(cam !== "없음") opts.push("카메라(" + cam + ")");
    if(formData.get("iphoneSnap")) opts.push("아이폰 스냅");
    if(formData.get("screenBackground")) opts.push("병풍");
    if(formData.get("calligraphyCard")) opts.push("캘리그라피 카드");
    if(formData.get("numberBalloon")) opts.push("숫자 풍선");
    const optText = opts.length > 0 ? opts.join(", ") : "없음";

    const kakaoMsg = `[무인 셀프 스튜디오 예약]
예약자: ${formData.get("customerName")}
연락처: ${formData.get("phone")}
예약일: ${dateVal} ${formData.get("reservationTime")} (${isWeekend})
대여시간: ${formData.get("rentalHours")}시간 (종료: ${document.getElementById("endTime").value})
성인/아기: ${formData.get("adultCount")}명 / ${formData.get("babyCount")}명
기념일 테이블: ${tableName}
추가 옵션: ${optText}
총 예상 금액: ${totalPrice.toLocaleString()}원
요청사항: ${formData.get("notes") || "없음"}`;

    // 서버 전송 데이터 준비
    const payload = {
      customerName: formData.get("customerName"),
      phone: formData.get("phone"),
      reservationDate: dateVal,
      reservationTime: formData.get("reservationTime"),
      rentalHours: formData.get("rentalHours"),
      adultCount: formData.get("adultCount"),
      babyCount: formData.get("babyCount"),
      tableName: tableName,
      options: optText,
      totalPrice: totalPrice.toLocaleString() + "원",
      notes: formData.get("notes")
    };

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.result === "success") {
      // 1. 클립보드 복사
      await navigator.clipboard.writeText(kakaoMsg);
      
      // 2. 기존 모달 닫기
      closeModal("studioModal");

      // 3. 안정적인 성공 안내 레이어 표시 (팝업 차단 우회)
const successHtml = `
        <div id="finalSuccessLayer" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;">
          <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:350px;width:100%;box-shadow:0 10px 25px rgba(0,0,0,0.2);">
            <div style="font-size:40px;margin-bottom:15px;">✅</div>
            <h2 style="margin-bottom:10px;font-size:22px;color:#333;letter-spacing:-1px;">예약 접수 완료!</h2>
            <p style="margin-bottom:25px;font-size:15px;color:#666;line-height:1.6;word-break:keep-all;">
              예약 내용이 <b>복사</b>되었습니다.<br>
              카카오톡 채팅창이 열리면<br>
              메시지창을 눌러 <b>붙여넣기</b> 해주세요.
            </p>
            <a href="${KAKAO_CHANNEL_URL}" 
               style="display:block;background:#fee500;padding:18px;border-radius:12px;text-decoration:none;color:#3c1e1e;font-weight:bold;font-size:18px;box-shadow:0 4px 10px rgba(254,229,0,0.3);">
               카카오톡 열기
            </a>
            <button onclick="document.getElementById('finalSuccessLayer').remove()" 
                    style="margin-top:15px;background:none;border:none;color:#999;text-decoration:underline;cursor:pointer;font-size:13px;">
              닫기
            </button>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', successHtml);
      form.reset();
    } else {
      alert("저장 실패: " + result.error);
    }
  } catch (e) {
    alert("시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  } finally {
    btn.disabled = false;
    btn.innerText = "예약 접수";
  }
});
