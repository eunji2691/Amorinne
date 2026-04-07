// ===== 설정값 =====
const APPS_SCRIPT_URL = '여기에_새로_받은_웹앱_URL을_넣으세요';
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_cxhePn/chat';

// 가격 데이터
const TABLE_DATA = [
  { id: "pure", name: "퓨어 테이블", studioPrice: 35000 },
  { id: "royal-white", name: "로얄 테이블 (WHITE )", studioPrice: 40000 },
  { id: "royal-yellow", name: "로얄 테이블 (YELLOW)", studioPrice: 40000 },
  { id: "seorin", name: "서린상", studioPrice: 45000 },
  { id: "daon", name: "다온상", studioPrice: 40000 },
  { id: "hayeon", name: "하연상", studioPrice: 35000 },
  { id: "safari", name: "사파리 테이블", studioPrice: 35000 },
  { id: "bridal", name: "브라이덜 샤워", studioPrice: 50000 }
];

// 모달 제어 함수
function openModal(id) { document.getElementById(id).classList.remove("hidden"); document.body.style.overflow = "hidden"; }
function closeModal(id) { document.getElementById(id).classList.add("hidden"); document.body.style.overflow = ""; }

// 종료 시간 자동 계산
function updateEndTime() {
  const form = document.getElementById("studioForm");
  const startTime = form.reservationTime.value;
  const hours = form.rentalHours.value;
  if (!startTime || !hours) return;
  const [h, m] = startTime.split(":").map(Number);
  document.getElementById("endTime").value = `${String(h + parseInt(hours)).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// 가격 실시간 계산
function updateStudioPrice() {
  const form = document.getElementById("studioForm");
  let total = 0;
  const isWeekend = [0, 6].includes(new Date(form.reservationDate.value).getDay());
  const hours = parseInt(form.rentalHours.value) || 0;

  if (hours === 1) total += isWeekend ? 70000 : 60000;
  else if (hours === 2) total += isWeekend ? 120000 : 100000;

  const people = (parseInt(form.adultCount.value) || 0) + (parseInt(form.babyCount.value) || 0);
  if (people > 5) total += (people - 5) * 10000;

  if (form.memoTableSetting.checked) {
    const table = TABLE_DATA.find(t => t.id === form.memoTableSettingDetails.value);
    if (table) total += table.studioPrice;
  }

  if (form.baeksilHanbok.checked) total += 15000;
  if (form.dolDressClothing.checked) total += 35000;
  if (form.querySelector('input[name="cameraRental"]:checked')?.value !== "없음") total += 20000;
  if (form.iphoneSnap.checked) total += 50000;
  if (form.screenBackground.checked) total += 30000;
  if (form.calligraphyCard.checked) total += 9900;
  if (form.numberBalloon.checked) total += 5000;

  document.getElementById("studioTotalPrice").textContent = total.toLocaleString() + "원";
  return total;
}

// 폼 제출 (핵심)
async function submitStudioForm(event) {
  event.preventDefault();
  const btn = document.getElementById("studioSubmitBtn");
  btn.disabled = true; btn.innerText = "저장 중...";

  try {
    const form = event.target;
    const formData = new FormData(form);
    const totalPrice = updateStudioPrice();
    
    // 카카오 문구 생성
    const kakaoMsg = `[무인 셀프 스튜디오 예약]\n예약자: ${formData.get("customerName")}\n연락처: ${formData.get("phone")}\n예약일: ${formData.get("reservationDate")} ${formData.get("reservationTime")}\n총 금액: ${totalPrice.toLocaleString()}원`;

    // 서버 전송
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        customerName: formData.get("customerName"),
        phone: formData.get("phone"),
        reservationDate: formData.get("reservationDate"),
        reservationTime: formData.get("reservationTime"),
        rentalHours: formData.get("rentalHours"),
        endTime: document.getElementById("endTime").value,
        totalPrice: totalPrice,
        kakaoMessage: kakaoMsg,
        notes: formData.get("notes")
      })
    });

    const result = await response.json();

    if (result.result === "success") {
      // 클립보드 복사
      const el = document.createElement('textarea');
      el.value = kakaoMsg; document.body.appendChild(el);
      el.select(); document.execCommand('copy'); document.body.removeChild(el);

      // 성공 안내창 (절대 안 막히는 방식)
      const html = `
        <div id="finalOk" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;">
          <div style="background:white;padding:30px;border-radius:15px;text-align:center;max-width:320px;">
            <h2 style="margin-bottom:15px;">접수 완료!</h2>
            <p style="margin-bottom:20px;font-size:14px;color:#666;">내용이 복사되었습니다.  
아래 버튼을 눌러 카카오톡에 붙여넣어주세요.</p>
            <a href="${KAKAO_CHANNEL_URL}" target="_blank" style="display:block;background:#fee500;padding:15px;border-radius:10px;text-decoration:none;color:#3c1e1e;font-weight:bold;">카카오톡으로 이동</a>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', html);
      closeModal("studioModal");
    } else { alert("저장 실패: " + result.error); }
  } catch (e) { alert("오류 발생: " + e.message); }
  finally { btn.disabled = false; btn.innerText = "예약 접수"; }
}
