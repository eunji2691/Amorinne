/**
 * 아모린느 (Amorinne) 통합 스크립트 v6.0
 * - 모든 예약 폼 통합 (스튜디오, 백일상, 드레스)
 * - 구글 시트 전송 + 클립보드 복사 + 카톡 이동
 * - 팝업 차단 방지 UX 적용
 */

const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_cxhePn/chat';

document.addEventListener('DOMContentLoaded', () => {
  // 1. 초기화: 모든 모달 숨기기
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));

  // 2. 메인 탭 전환
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.service-grid > div > .tab-content');
  const serviceImages = document.querySelectorAll('.service-image');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(c => c.classList.remove('active'));
      document.getElementById(`tab-${target}`).classList.add('active');

      serviceImages.forEach(img => img.style.display = 'none');
      document.getElementById(`service-img-${target}`).style.display = 'block';
    });
  });

  // 3. 서브 탭 전환
  const subTabBtns = document.querySelectorAll('.sub-tab-btn');
  subTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.dataset.parent;
      const target = btn.dataset.subtab;
      
      document.querySelectorAll(`#tab-${parent} .sub-tab-btn`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll(`#tab-${parent} .tab-content`).forEach(c => c.classList.remove('active'));
      document.getElementById(`subtab-${target}`).classList.add('active');
    });
  });

  // 4. 스튜디오 폼 실시간 계산 및 UI 제어
  const studioForm = document.getElementById('studioForm');
  if (studioForm) {
    studioForm.addEventListener('change', updateStudioPrice);
    studioForm.addEventListener('input', updateStudioPrice);
    
    // 테이블 선택창 토글
    const useTableCheck = document.getElementById('useTable');
    const tableWrap = document.getElementById('studioTableSelectWrap');
    if (useTableCheck && tableWrap) {
      useTableCheck.addEventListener('change', () => {
        tableWrap.classList.toggle('hidden', !useTableCheck.checked);
        updateStudioPrice();
      });
    }
  }

  // 5. 백일상/드레스 폼 실시간 계산
  const milestoneForm = document.getElementById('milestoneForm');
  if (milestoneForm) milestoneForm.addEventListener('change', updateMilestonePrice);

  const dressForm = document.getElementById('dressForm');
  if (dressForm) dressForm.addEventListener('change', updateDressPrice);

  // 6. 폼 제출 이벤트 연결 (이벤트 위임 방식)
  document.addEventListener('submit', (e) => {
    if (e.target.id === 'studioForm') {
      e.preventDefault();
      handleReservation(e.target, 'studio');
    } else if (e.target.id === 'milestoneForm') {
      e.preventDefault();
      handleReservation(e.target, 'milestone');
    } else if (e.target.id === 'dressForm') {
      e.preventDefault();
      handleReservation(e.target, 'dress');
    }
  });
});

// --- 공용 함수 ---

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function closeImageModal() {
  closeModal('imageModal');
}

// --- 가격 계산 로직 ---

function updateStudioPrice() {
  const form = document.getElementById('studioForm');
  if (!form) return;

  const dateVal = form.reservationDate.value;
  const hours = parseInt(form.rentalHours.value) || 0;
  const adults = parseInt(form.adultCount.value) || 0;
  const startTime = form.reservationTime.value;

  // 종료 시간 계산
  const endTimeInput = document.getElementById('endTime');
  if (startTime && hours) {
    let [h, m] = startTime.split(':').map(Number);
    h += hours;
    endTimeInput.value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  } else {
    endTimeInput.value = '';
  }

  let total = 0;
  if (hours > 0) {
    const isWeekend = dateVal ? ([0, 6].includes(new Date(dateVal).getDay())) : false;
    if (hours === 1) total = isWeekend ? 70000 : 60000;
    else if (hours === 2) total = isWeekend ? 120000 : 100000;
    else total = hours * (isWeekend ? 60000 : 50000);
  }

  // 인원 추가 (5인 초과시 인당 5000원)
  if (adults > 5) total += (adults - 5) * 5000;

  // 옵션
  if (form.useTable && form.useTable.checked) {
    const table = form.memoTableSettingDetails.value;
    const tablePrices = { 'pure': 35000, 'royal-white': 40000, 'royal-yellow': 40000, 'seorin': 45000, 'daon': 40000, 'hayeon': 35000, 'safari': 35000, 'bridal': 50000 };
    total += (tablePrices[table] || 0);
  }
  if (form.baeksilHanbok && form.baeksilHanbok.checked) total += 15000;
  if (form.dolDressClothing && form.dolDressClothing.checked) total += 35000;
  if (form.iphoneSnap && form.iphoneSnap.checked) total += 50000;
  if (form.cameraRental && form.cameraRental.checked) total += 20000;

  document.getElementById('studioTotalPrice').innerText = total.toLocaleString() + '원';
}

function updateMilestonePrice() {
  const form = document.getElementById('milestoneForm');
  let total = 0;
  const table = form.tableSelection.value;
  if (table.includes('69,000')) total += 69000;
  else if (table.includes('89,000')) total += 89000;
  else if (table.includes('99,000')) total += 99000;
  else if (table.includes('79,000')) total += 79000;
  else if (table.includes('80,000')) total += 80000;

  if (form.baekil100Clothing.checked) total += 10000;
  if (form.baekil100Hanbok.checked) total += 15000;
  if (form.dolHanbok.checked) total += 35000;
  if (form.bamboChair.checked) total += 5000;
  if (form.foldingTable.checked) total += 10000;
  if (form.dolGrabbingSet.checked) total += 10000;

  document.getElementById('milestoneTotalPrice').innerText = total.toLocaleString() + '원';
}

function updateDressPrice() {
  const form = document.getElementById('dressForm');
  let total = 0;
  if (form.niceSocks.checked) total += 3000;
  if (form.tights.checked) total += 6000;
  if (form.hwadongBasket.checked) total += 5000;
  if (form.hwadongCar.checked) total += 30000;
  document.getElementById('dressTotalPrice').innerText = total.toLocaleString() + '원';
}

// --- 예약 처리 메인 로직 ---

async function handleReservation(form, type) {
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerText;
  btn.disabled = true;
  btn.innerText = "저장 중...";

  try {
    const formData = new FormData(form);
    const data = { type: type };
    formData.forEach((value, key) => data[key] = value);
    
    // 1. 카톡 메시지 생성
    let msg = "";
    if (type === 'studio') {
      const options = [];
      if (data.memoTableSetting === 'on') options.push(`테이블: ${data.memoTableSettingDetails}`);
      if (data.baeksilHanbok === 'on') options.push("백일 한복");
      if (data.dolDressClothing === 'on') options.push("돌 의상");
      if (data.iphoneSnap === 'on') options.push("아이폰 스냅");
      if (data.cameraRental === 'on') options.push("카메라 대여");

      msg = `[아모린느 스튜디오 예약]
성함: ${data.customerName}
연락처: ${data.phone}
아기정보: ${data.babyName || '-'}(${data.babyEnglishName || '-'}), ${data.babyGender || '-'}
날짜: ${data.reservationDate}
시간: ${data.reservationTime} (${data.rentalHours}시간)
인원: 성인 ${data.adultCount}, 아기 ${data.babyCount}
옵션: ${options.length > 0 ? options.join(', ') : '없음'}
금액: ${document.getElementById('studioTotalPrice').innerText}
요청: ${data.notes || '없음'}`;
    } else if (type === 'milestone') {
      msg = `[아모린느 백일상/돌상 대여]
성함: ${data.customerName}
연락처: ${data.phone}
행사일: ${data.eventDate}
테이블: ${data.tableSelection}
금액: ${document.getElementById('milestoneTotalPrice').innerText}`;
    } else {
      msg = `[아모린느 의상 대여]
성함: ${data.customerName}
연락처: ${data.phone}
피팅일: ${data.fittingDate}
행사일: ${data.eventDate}
상품: ${data.rentalProduct || '미정'}`;
    }

    // 2. 클립보드 복사
    copyToClipboard(msg);

    // 3. 구글 시트 전송 (비동기)
    fetch(APPS_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    }).catch(err => console.error("Sheet Save Error:", err));

    // 4. 성공 팝업 띄우기 (팝업 차단 방지용)
    showSuccessLayer(msg);
    closeModal(`${type}Modal`);

  } catch (e) {
    alert("오류가 발생했습니다: " + e.message);
  } finally {
    btn.disabled = false;
    btn.innerText = originalText;
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

function showSuccessLayer(msg) {
  const layerId = 'finalSuccessLayer';
  if (document.getElementById(layerId)) document.getElementById(layerId).remove();

  const html = `
    <div id="${layerId}" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;">
      <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:350px;width:100%;box-shadow:0 10px 40px rgba(0,0,0,0.3);">
        <div style="font-size:40px;margin-bottom:15px;">✅</div>
        <h2 style="margin-bottom:10px;font-size:1.5rem;color:#333;">예약 접수 완료!</h2>
        <p style="margin-bottom:20px;font-size:0.95rem;color:#666;line-height:1.6;">
          예약 내용이 자동으로 복사되었습니다.<br>
          <strong>[카카오톡으로 이동]</strong> 버튼을 누른 후<br>
          채팅창에 <strong>'붙여넣기'</strong>해서 보내주세요.
        </p>
        <a href="${KAKAO_CHANNEL_URL}" target="_blank" onclick="document.getElementById('${layerId}').remove()" 
           style="display:block;background:#fee500;padding:16px;border-radius:12px;text-decoration:none;color:#3c1e1e;font-weight:bold;font-size:1.1rem;box-shadow:0 4px 10px rgba(254,229,0,0.3);">
           카카오톡으로 내용 보내기
        </a>
        <button onclick="document.getElementById('${layerId}').remove()" style="margin-top:15px;background:none;border:none;color:#999;text-decoration:underline;cursor:pointer;font-size:0.85rem;">닫기</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}
