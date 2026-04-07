const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_cxhePn/chat';

// ===== Modal Logic =====
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
    document.body.style.overflow = 'auto';
  }
}

// Close modal on backdrop click
window.onclick = function(event) {
  if (event.target.classList.contains('modal-backdrop')) {
    event.target.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
};

// ===== Tab Logic =====
document.addEventListener('DOMContentLoaded', () => {
  // Main Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const serviceImages = document.querySelectorAll('.service-image');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      serviceImages.forEach(i => i.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${tabId}`).classList.add('active');
      document.getElementById(`service-img-${tabId}`).classList.add('active');
    });
  });

  // Sub Tabs
  const subTabBtns = document.querySelectorAll('.sub-tab-btn');
  subTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subTabId = btn.getAttribute('data-subtab');
      const parentId = btn.getAttribute('data-parent');
      
      const parentTab = document.getElementById(`tab-${parentId}`);
      parentTab.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
      parentTab.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`subtab-${subTabId}`).classList.add('active');
    });
  });

  // Studio Table Toggle
  const useTableCheckbox = document.getElementById('useTable');
  const tableSelectWrap = document.getElementById('studioTableSelectWrap');
  if (useTableCheckbox && tableSelectWrap) {
    useTableCheckbox.addEventListener('change', () => {
      tableSelectWrap.classList.toggle('hidden', !useTableCheckbox.checked);
      updateStudioPrice();
    });
  }

  // Price Update Listeners
  const studioForm = document.getElementById('studioForm');
  if (studioForm) {
    studioForm.addEventListener('change', updateStudioPrice);
    updateStudioPrice();
  }

  const milestoneForm = document.getElementById('milestoneForm');
  if (milestoneForm) {
    milestoneForm.addEventListener('change', updateMilestonePrice);
    updateMilestonePrice();
  }

  // Form Submissions
  if (studioForm) studioForm.addEventListener('submit', (e) => handleFormSubmit(e, 'studio'));
  if (milestoneForm) milestoneForm.addEventListener('submit', (e) => handleFormSubmit(e, 'milestone'));
  const dressForm = document.getElementById('dressForm');
  if (dressForm) dressForm.addEventListener('submit', (e) => handleFormSubmit(e, 'dress'));
});

// ===== Price Calculation =====
function updateStudioPrice() {
  const form = document.getElementById('studioForm');
  if (!form) return;

  const dateVal = form.reservationDate.value;
  const hours = parseInt(form.rentalHours.value) || 1;
  const adults = parseInt(form.adultCount.value) || 0;
  
  let basePrice = 0;
  const isWeekend = dateVal && (new Date(dateVal).getDay() === 0 || new Date(dateVal).getDay() === 6);

  if (isWeekend) {
    basePrice = hours === 1 ? 70000 : (hours === 2 ? 120000 : 120000 + (hours-2)*50000);
  } else {
    basePrice = hours === 1 ? 60000 : (hours === 2 ? 100000 : 100000 + (hours-2)*40000);
  }

  // Extra adults (over 5)
  if (adults > 5) basePrice += (adults - 5) * 5000;

  // Options
  if (form.memoTableSetting.checked) {
    const tableType = form.memoTableSettingDetails.value;
    if (tableType === 'pure' || tableType === 'hayeon' || tableType === 'safari') basePrice += 35000;
    else if (tableType === 'royal-white' || tableType === 'royal-yellow' || tableType === 'daon') basePrice += 40000;
    else if (tableType === 'seorin') basePrice += 45000;
    else if (tableType === 'bridal') basePrice += 50000;
  }

  if (form.baeksilHanbok.checked) basePrice += 15000;
  if (form.dolDressClothing.checked) basePrice += 35000;
  if (form.iphoneSnap.checked) basePrice += 50000;
  if (form.cameraRental.checked) basePrice += 20000;

  document.getElementById('studioTotalPrice').innerText = basePrice.toLocaleString() + '원';
}

function updateMilestonePrice() {
  const form = document.getElementById('milestoneForm');
  if (!form) return;
  const table = form.tableSelection.value;
  let price = 0;
  if (table.includes('퓨어') || table.includes('사파리')) price = 69000;
  else if (table.includes('로얄') || table.includes('다온')) price = 89000;
  else if (table.includes('서린')) price = 99000;
  else if (table.includes('하연')) price = 79000;
  else if (table.includes('브라이덜')) price = 80000;
  document.getElementById('milestoneTotalPrice').innerText = price.toLocaleString() + '원';
}

// ===== Form Handling & Kakao Integration =====
async function handleFormSubmit(e, type) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalBtnText = btn.innerText;

  btn.disabled = true;
  btn.innerText = "저장 중...";

  const formData = new FormData(form);
  const data = { type: type };
  formData.forEach((value, key) => { data[key] = value; });

  // Build Kakao Message
  let msg = "";
  if (type === 'studio') {
    const price = document.getElementById('studioTotalPrice').innerText;
    const options = [];
    if (data.memoTableSetting) options.push(`테이블 세팅(${data.memoTableSettingDetails})`);
    if (data.baeksilHanbok) options.push("백일 한복");
    if (data.dolDressClothing) options.push("돌 의상");
    if (data.iphoneSnap) options.push("아이폰 스냅");
    if (data.cameraRental) options.push("카메라 대여");

    msg = `[아모린느 스튜디오 예약]
성함: ${data.customerName}
연락처: ${data.phone}
아기정보: ${data.babyName || '-'}(${data.babyEnglishName || '-'}), ${data.babyGender || '-'}
날짜: ${data.reservationDate}
시간: ${data.reservationTime} (${data.rentalHours}시간)
인원: 성인 ${data.adultCount} / 아기 ${data.babyCount}
선택옵션: ${options.length > 0 ? options.join(', ') : '없음'}
금액: ${price}`;
  } else if (type === 'milestone') {
    const price = document.getElementById('milestoneTotalPrice').innerText;
    msg = `[백일상/돌상 대여 예약]
성함: ${data.customerName}
연락처: ${data.phone}
날짜: ${data.eventDate}
선택: ${data.tableSelection}
금액: ${price}`;
  } else {
    msg = `[정장/드레스 대여 예약]
성함: ${data.customerName}
연락처: ${data.phone}
날짜: ${data.eventDate}
상품: ${data.rentalProduct || '피팅 후 결정'}`;
  }

  // Copy to Clipboard
  copyToClipboard(msg);

  // Show Success UI Immediately (to avoid popup blocking)
  showSuccessUI(KAKAO_CHANNEL_URL);

  // Send to Google Sheets in background
  try {
    fetch(APPS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error("Sheet save error:", err);
  }

  btn.disabled = false;
  btn.innerText = originalBtnText;
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Copy failed', err);
  }
  document.body.removeChild(textarea);
}

function showSuccessUI(url) {
  const html = `
    <div id="finalOk" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
      <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:350px;width:100%;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
        <div style="font-size:40px;margin-bottom:15px;">✅</div>
        <h2 style="margin-bottom:10px;color:#333;">예약 접수 완료!</h2>
        <p style="margin-bottom:25px;font-size:15px;color:#666;line-height:1.5;">예약 내용이 자동으로 복사되었습니다.<br>아래 버튼을 눌러 카카오톡 채팅창에<br><b>'붙여넣기'</b>하여 보내주세요.</p>
        <a href="${url}" target="_blank" onclick="document.getElementById('finalOk').remove()" style="display:block;background:#fee500;padding:16px;border-radius:12px;text-decoration:none;color:#3c1e1e;font-weight:bold;font-size:16px;box-shadow:0 4px 10px rgba(254,229,0,0.3);">카카오톡으로 내용 보내기</a>
        <button onclick="document.getElementById('finalOk').remove()" style="margin-top:15px;background:none;border:none;color:#999;cursor:pointer;font-size:14px;text-decoration:underline;">닫기</button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('active');
}
