/* ===== Amorinne Final Script v5.0 (Event Delegation & Immediate UX) ===== */

const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_URL = 'https://pf.kakao.com/_cxhePn/chat';

// 1. 공통 모달 제어 (최상단 배치)
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

// 2. 스튜디오 가격 계산 로직
function calculateStudio() {
    const form = document.getElementById('studioForm');
    if (!form) return;

    let total = 0;
    const date = form.reservationDate.value;
    const hours = parseInt(form.rentalHours.value) || 0;
    const time = form.reservationTime.value;

    // 기본 대여료
    if (date && hours > 0) {
        const isWeekend = [0, 6].includes(new Date(date).getDay());
        if (hours === 1) total = isWeekend ? 70000 : 60000;
        else if (hours === 2) total = isWeekend ? 120000 : 100000;
    }

    // 인원 추가
    const adults = parseInt(form.adultCount.value) || 0;
    const babies = parseInt(form.babyCount.value) || 0;
    if (adults + babies > 5) total += (adults + babies - 5) * 10000;

    // 테이블 세팅
    const tableCb = form.querySelector('input[name="memoTableSetting"]');
    const tableWrap = document.getElementById('studioTableSelectWrap');
    if (tableCb && tableCb.checked) {
        if (tableWrap) tableWrap.classList.remove('hidden');
        const tableType = form.memoTableSettingDetails.value;
        const prices = { 'pure': 35000, 'royal-white': 40000, 'royal-yellow': 40000, 'seorin': 45000, 'daon': 40000, 'hayeon': 35000, 'safari': 35000, 'bridal': 50000 };
        total += prices[tableType] || 0;
    } else {
        if (tableWrap) tableWrap.classList.add('hidden');
    }

    // 유료 옵션
    if (form.baeksilHanbok.checked) total += 15000;
    if (form.dolDressClothing.checked) total += 35000;
    if (form.iphoneSnap.checked) total += 50000;
    if (form.cameraRental.checked) total += 20000;

    const priceDisplay = document.getElementById('studioTotalPrice');
    if (priceDisplay) priceDisplay.innerText = total.toLocaleString() + "원";

    // 종료 시간 계산
    const endTimeInput = document.getElementById('endTime');
    if (time && hours && endTimeInput) {
        let hr = parseInt(time.split(':')[0]);
        endTimeInput.value = (hr + hours).toString().padStart(2, '0') + ":00";
    }
}

// 3. 이벤트 위임 (100% 작동 보장)
document.addEventListener('change', function(e) {
    if (e.target.closest('#studioForm')) {
        calculateStudio();
    }
});

document.addEventListener('submit', function(e) {
    const form = e.target.closest('#studioForm');
    if (!form) return;

    e.preventDefault();
    
    const formData = new FormData(form);
    const totalPrice = document.getElementById('studioTotalPrice').innerText;
    
    // 카톡 메시지 생성
    const msg = `[아모린느 스튜디오 예약]\n성함: ${formData.get('customerName')}\n날짜: ${formData.get('reservationDate')}\n시간: ${formData.get('reservationTime')} (${formData.get('rentalHours')}시간)\n금액: ${totalPrice}\n\n내용이 복사되었습니다. 채팅창에 붙여넣어주세요!`;

    // 클립보드 복사
    const textArea = document.createElement("textarea");
    textArea.value = msg;
    document.body.appendChild(textArea);
    textArea.select();
    try { document.execCommand('copy'); } catch (err) { console.error(err); }
    document.body.removeChild(textArea);

    // 구글 시트 전송 (백그라운드)
    fetch(APPS_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: JSON.stringify(Object.fromEntries(formData)) 
    }).catch(err => console.error("전송 실패:", err));

    // 즉시 카톡 팝업 표시
    const layerHtml = `
        <div id="finalLayer" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999;display:flex;align-items:center;justify-content:center;padding:20px;">
            <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:340px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,0.4);">
                <div style="font-size:40px;margin-bottom:15px;">✨</div>
                <h3 style="margin-bottom:15px;font-size:20px;font-weight:bold;color:#333;">예약 접수 완료!</h3>
                <p style="margin-bottom:25px;line-height:1.6;color:#666;font-size:15px;">
                    예약 정보가 <b>복사</b>되었습니다.<br>
                    아래 버튼을 눌러 카카오톡 채팅창에<br>
                    <span style="color:#E64A19;font-weight:bold;">'붙여넣기'</span>만 해주시면 끝납니다!
                </p>
                <a href="${KAKAO_URL}" target="_blank" style="display:block;background:#fee500;padding:16px;text-decoration:none;color:#3c1e1e;font-weight:bold;border-radius:12px;font-size:17px;margin-bottom:10px;">카카오톡 열기</a>
                <button onclick="document.getElementById('finalLayer').remove()" style="width:100%;background:#f5f5f5;border:none;padding:12px;border-radius:10px;color:#888;cursor:pointer;font-size:14px;">닫기</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', layerHtml);

    // 정리
    closeModal('studioModal');
    form.reset();
    document.getElementById('studioTotalPrice').innerText = "0원";
});

// 4. 기존 모달 기능 유지 (milestone, dress 등)
function toggleMobileMenu() { document.getElementById("mobileMenu").classList.toggle("active"); }
function closeMobileMenu() { document.getElementById("mobileMenu").classList.remove("active"); }

// 기존 백일상/드레스 폼 제출 (기존 로직 유지용 껍데기)
function submitMilestoneForm(e) { e.preventDefault(); alert('백일상 예약 로직을 연결해주세요.'); }
function submitDressForm(e) { e.preventDefault(); alert('의상 예약 로직을 연결해주세요.'); }
