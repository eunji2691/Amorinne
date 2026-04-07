// ==========================================
// 아모린느 최종 통합 스크립트 (v6.1)
// ==========================================

const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_cxhePn/chat';

// 1. 초기화 및 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
  console.log("Amorinne Script Initialized");
  
  // 모든 모달 초기화 (확실히 숨김)
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));

  // 탭 전환 이벤트
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // 메인 탭 버튼 활성화 상태 변경
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // 메인 탭 컨텐츠 표시
      document.querySelectorAll('.tabs + .service-grid .tab-content').forEach(c => {
        if (c.id === `tab-${tabId}`) c.classList.add('active');
        else c.classList.remove('active');
      });

      // 서비스 이미지 변경
      document.querySelectorAll('.service-image').forEach(img => {
        if (img.id === `service-img-${tabId}`) img.style.display = 'block';
        else img.style.display = 'none';
      });
    });
  });

  // 서브 탭 전환 이벤트
  const subTabBtns = document.querySelectorAll('.sub-tab-btn');
  subTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subTabId = btn.getAttribute('data-subtab');
      const parentId = btn.getAttribute('data-parent');
      
      // 해당 부모 탭 내의 서브 탭 버튼들만 처리
      const parentTab = document.getElementById(`tab-${parentId}`);
      parentTab.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // 해당 부모 탭 내의 서브 탭 컨텐츠들만 처리
      parentTab.querySelectorAll('.tab-content').forEach(c => {
        if (c.id === `subtab-${subTabId}`) c.classList.add('active');
        else c.classList.remove('active');
      });
    });
  });

  // 폼 실시간 계산 이벤트 연결
  const studioForm = document.getElementById('studioForm');
  if (studioForm) {
    studioForm.addEventListener('input', updateStudioPrice);
    studioForm.addEventListener('change', updateStudioPrice);
    studioForm.addEventListener('submit', (e) => handleFormSubmit(e, 'studio'));
    
    // 테이블 세팅 체크박스 토글
    const useTable = document.getElementById('useTable');
    const tableWrap = document.getElementById('studioTableSelectWrap');
    if (useTable && tableWrap) {
      useTable.addEventListener('change', () => {
        tableWrap.classList.toggle('hidden', !useTable.checked);
        updateStudioPrice();
      });
    }
  }

  const milestoneForm = document.getElementById('milestoneForm');
  if (milestoneForm) {
    milestoneForm.addEventListener('input', updateMilestonePrice);
    milestoneForm.addEventListener('change', updateMilestonePrice);
    milestoneForm.addEventListener('submit', (e) => handleFormSubmit(e, 'milestone'));
  }

  const dressForm = document.getElementById('dressForm');
  if (dressForm) {
    dressForm.addEventListener('input', updateDressPrice);
    dressForm.addEventListener('change', updateDressPrice);
    dressForm.addEventListener('submit', (e) => handleFormSubmit(e, 'dress'));
    
    // 양말/타이즈 컬러 토글
    const socksCheck = document.getElementById('dressNiceSocks');
    const socksWrap = document.getElementById('dressSocksColorWrap');
    if (socksCheck && socksWrap) {
      socksCheck.addEventListener('change', () => socksWrap.classList.toggle('hidden', !socksCheck.checked));
    }
    const tightsCheck = document.getElementById('dressTights');
    const tightsWrap = document.getElementById('dressTightsColorWrap');
    if (tightsCheck && tightsWrap) {
      tightsCheck.addEventListener('change', () => tightsWrap.classList.toggle('hidden', !tightsCheck.checked));
    }
  }
});

// 2. 모달 제어 함수
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // 스크롤 복구
  }
}

// 3. 가격 계산 로직 (스튜디오)
function updateStudioPrice() {
  const form = document.getElementById('studioForm');
  if (!form) return;

  const dateVal = form.reservationDate.value;
  const hours = parseInt(form.rentalHours.value) || 0;
  const adults = parseInt(form.adultCount.value) || 0;
  const babies = parseInt(form.babyCount.value) || 0;
  
  let total = 0;
  
  if (hours > 0 && dateVal) {
    const day = new Date(dateVal).getDay();
    const isWeekend = (day === 0 || day === 6);
    
    // 기본 대여료
    if (hours === 1) total = isWeekend ? 70000 : 60000;
    else if (hours === 2) total = isWeekend ? 120000 : 100000;
    
    // 인원 추가 (기준 2인 초과시 인당 1만)
    const extraPeople = Math.max(0, (adults + babies) - 2);
    total += (extraPeople * 10000);
    
    // 테이블 세팅
    if (form.memoTableSetting.checked) {
      const table = form.memoTableSettingDetails.value;
      const tablePrices = {
        'pure': 35000, 'royal-white': 40000, 'royal-yellow': 40000,
        'seorin': 45000, 'daon': 40000, 'hayeon': 35000, 'safari': 35000, 'bridal': 50000
      };
      total += (tablePrices[table] || 0);
    }
    
    // 기타 옵션
    if (form.baeksilHanbok.checked) total += 15000;
    if (form.dolDressClothing.checked) total += 35000;
    if (form.iphoneSnap.checked) total += 50000;
    if (form.cameraRental.checked) total += 20000;
  }

  document.getElementById('studioTotalPrice').innerText = total.toLocaleString() + "원";
  
  // 종료 시간 계산
  const startTime = form.reservationTime.value;
  const endTimeInput = document.getElementById('endTime');
  if (startTime && hours > 0) {
    let [h, m] = startTime.split(':').map(Number);
    h += hours;
    endTimeInput.value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  } else {
    endTimeInput.value = "";
  }
}

// 4. 가격 계산 로직 (백일상)
function updateMilestonePrice() {
  const form = document.getElementById('milestoneForm');
  if (!form) return;

  let total = 0;
  const table = form.tableSelection.value;
  const tablePrices = {
    '퓨어테이블': 69000, '로얄 테이블(WHITE)': 89000, '로얄 테이블(YELLOW)': 89000,
    '서린상': 99000, '다온상': 89000, '하연상': 79000, '사파리테이블': 69000, '브라이덜샤워': 80000
  };
  total += (tablePrices[table] || 0);

  if (form.baekil100Clothing.checked) total += 10000;
  if (form.baekil100Hanbok.checked) total += 15000;
  if (form.dolHanbok.checked) total += 35000;
  if (form.acc_jeongjagwan && form.acc_jeongjagwan.checked) total += 5000;
  if (form.acc_ilbangat && form.acc_ilbangat.checked) total += 5000;
  if (form.acc_yugeon && form.acc_yugeon.checked) total += 5000;
  if (form.acc_gachae && form.acc_gachae.checked) total += 5000;
  if (form.acc_meoritti && form.acc_meoritti.checked) total += 5000;
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

  document.getElementById('milestoneTotalPrice').innerText = total.toLocaleString() + "원";
}

// 5. 가격 계산 로직 (드레스)
function updateDressPrice() {
  const form = document.getElementById('dressForm');
  if (!form) return;

  let total = 0;
  if (form.niceSocks.checked) total += 4000;
  if (form.tights.checked) total += 6000;
  if (form.hwadongBasket.checked) total += 5000;
  if (form.hwadongCar.checked) total += 30000;

  document.getElementById('dressTotalPrice').innerText = total.toLocaleString() + "원";
}

// 6. 폼 제출 핸들러 (통합)
async function handleFormSubmit(e, type) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalBtnText = btn.innerText;

  // 1. 데이터 수집
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.type = type;
  
  // 2. 카톡 메시지 생성
  let msg = "";
  if (type === 'studio') {
    const tableText = data.memoTableSetting ? ` (${data.memoTableSettingDetails})` : " 없음";
    const options = [];
    if (data.baeksilHanbok) options.push("백일 한복");
    if (data.dolDressClothing) options.push("돌 의상");
    if (data.iphoneSnap) options.push("아이폰 스냅");
    if (data.cameraRental) options.push("카메라 대여");
    
    msg = `[아모린느 스튜디오 예약]\n` +
          `성함: ${data.customerName}\n` +
          `연락처: ${data.phone}\n` +
          `아기정보: ${data.babyName || '-'} / ${data.babyEnglishName || '-'} / ${data.babyGender || '-'}\n` +
          `날짜: ${data.reservationDate}\n` +
          `시간: ${data.reservationTime} (${data.rentalHours}시간)\n` +
          `인원: 성인 ${data.adultCount} / 아기 ${data.babyCount}\n` +
          `테이블: ${tableText}\n` +
          `추가옵션: ${options.length > 0 ? options.join(', ') : '없음'}\n` +
          `금액: ${document.getElementById('studioTotalPrice').innerText}\n` +
          `요청: ${data.notes || '없음'}`;
  } else if (type === 'milestone') {
    const options = [];
    if (data.baekil100Clothing) options.push("백일 의상");
    if (data.baekil100Hanbok) options.push("백일 한복");
    if (data.dolHanbok) options.push("돌 한복/드레스/정장");
    
    msg = `[아모린느 테이블 대여 예약]\n` +
          `성함: ${data.customerName}\n` +
          `연락처: ${data.phone}\n` +
          `아기정보: ${data.babyName || '-'} / ${data.babyGender || '-'}\n` +
          `행사날짜: ${data.eventDate}\n` +
          `선택테이블: ${data.tableSelection}\n` +
          `금액: ${document.getElementById('milestoneTotalPrice').innerText}\n` +
          `요청: ${data.notes || '없음'}`;
  } else {
    msg = `[아모린느 의상 대여 예약]\n` +
          `성함: ${data.customerName}\n` +
          `연락처: ${data.phone}\n` +
          `아기정보: ${data.babyName || '-'} / ${data.babyGender || '-'}\n` +
          `피팅날짜: ${data.fittingDate}\n` +
          `행사날짜: ${data.eventDate}\n` +
          `상품명: ${data.rentalProduct || '피팅 후 결정'}\n` +
          `금액: ${document.getElementById('dressTotalPrice').innerText}\n` +
          `요청: ${data.notes || '없음'}`;
  }

  // 3. 클립보드 복사
  try {
    await navigator.clipboard.writeText(msg);
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = msg;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  // 4. 즉시 완료 레이어 팝업 (팝업 차단 방지)
  const finalLayer = `
    <div id="finalOkLayer" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;">
      <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:340px;width:100%;box-shadow:0 10px 25px rgba(0,0,0,0.2);">
        <div style="font-size:40px;margin-bottom:15px;">✅</div>
        <h2 style="margin-bottom:10px;font-size:20px;color:#333;">예약 접수 완료!</h2>
        <p style="margin-bottom:25px;font-size:14px;color:#666;line-height:1.6;">예약 내용이 복사되었습니다.<br>아래 버튼을 눌러 카카오톡 채팅창에<br><b>'붙여넣기'</b>해서 보내주세요.</p>
        <a href="${KAKAO_CHANNEL_URL}" target="_blank" onclick="document.getElementById('finalOkLayer').remove()" style="display:block;background:#fee500;color:#3c1e1e;padding:16px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:16px;box-shadow:0 4px 10px rgba(254,229,0,0.3);">카카오톡으로 내용 보내기</a>
        <button onclick="document.getElementById('finalOkLayer').remove()" style="margin-top:15px;background:none;border:none;color:#999;font-size:13px;text-decoration:underline;cursor:pointer;">닫기</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', finalLayer);
  closeModal(`${type}Modal`);

  // 5. 서버 전송 (백그라운드)
  btn.disabled = true;
  btn.innerText = "전송 중...";
  try {
    await fetch(APPS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.error("Server save failed", e);
  } finally {
    btn.disabled = false;
    btn.innerText = originalBtnText;
  }
}
