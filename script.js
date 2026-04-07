/* ===== Amorinne Final Script (All-in-One Integrated Version) ===== */

const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_URL = 'https://pf.kakao.com/_cxhePn/chat';

// 1. 모달 제어 함수
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

// 2. 스튜디오 가격 및 시간 계산
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

    document.getElementById('studioTotalPrice').innerText = total.toLocaleString() + "원";

    // 종료 시간 계산
    if (time && hours) {
        let hr = parseInt(time.split(':')[0]);
        document.getElementById('studioEndTime').value = (hr + hours).toString().padStart(2, '0') + ":00";
    }
}

// 3. 백일상 가격 계산
function calculateMilestone() {
    const form = document.getElementById('milestoneForm');
    if (!form) return;
    const tableType = form.tableSelection.value;
    const prices = { 'pure': 69000, 'royal-white': 89000, 'royal-yellow': 89000, 'seorin': 99000, 'daon': 89000, 'hayeon': 79000, 'safari': 69000, 'bridal': 80000 };
    document.getElementById('milestoneTotalPrice').innerText = (prices[tableType] || 0).toLocaleString() + "원";
}

// 4. 드레스 가격 계산 (기본 0원 처리)
function calculateDress() {
    document.getElementById('dressTotalPrice').innerText = "0원 (피팅 후 결정)";
}

// 5. 공통 제출 로직 (클립보드 + 구글시트 + 카톡팝업)
async function handleFormSubmit(e, formId, typeName) {
    e.preventDefault();
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const totalPrice = document.querySelector(`#${formId} .price-display .amount`)?.innerText || 
                       document.getElementById(formId.replace('Form', 'TotalPrice'))?.innerText;

    // 카톡 메시지 생성 (상세 정보 포함)
    let msg = `[아모린느 ${typeName} 예약]\n`;
    msg += `성함: ${formData.get('customerName')}\n`;
    msg += `연락처: ${formData.get('phone')}\n`;
    
    if (formId === 'studioForm') {
        msg += `아기정보: ${formData.get('babyName') || '없음'} (${formData.get('babyEngName') || '-'}, ${formData.get('babyGender') || '-'})\n`;
        msg += `날짜: ${formData.get('reservationDate')}\n`;
        msg += `시간: ${formData.get('reservationTime')} (${formData.get('rentalHours')}시간)\n`;
        
        // 테이블 및 옵션 상세
        if (formData.get('memoTableSetting') === 'on') {
            const tableSelect = form.memoTableSettingDetails;
            msg += `테이블: ${tableSelect.options[tableSelect.selectedIndex].text}\n`;
        }
        let options = [];
        if (formData.get('baeksilHanbok') === 'on') options.push("백일한복");
        if (formData.get('dolDressClothing') === 'on') options.push("돌의상");
        if (formData.get('iphoneSnap') === 'on') options.push("아이폰스냅");
        if (formData.get('cameraRental') === 'on') options.push("카메라대여");
        msg += `추가옵션: ${options.length > 0 ? options.join(', ') : '없음'}\n`;
    } else if (formId === 'milestoneForm') {
        msg += `행사날짜: ${formData.get('eventDate')}\n`;
        const tableSelect = form.tableSelection;
        msg += `선택테이블: ${tableSelect.options[tableSelect.selectedIndex].text}\n`;
    } else if (formId === 'dressForm') {
        msg += `피팅날짜: ${formData.get('fittingDate')}\n`;
        msg += `행사날짜: ${formData.get('eventDate')}\n`;
    }
    
    msg += `총 예상금액: ${totalPrice}\n\n내용이 복사되었습니다. 채팅창에 붙여넣어주세요!`;

    // 클립보드 복사
    const textArea = document.createElement("textarea");
    textArea.value = msg;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // 구글 시트 전송 (백그라운드)
    fetch(APPS_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: JSON.stringify(Object.fromEntries(formData)) 
    }).catch(err => console.error("전송 실패:", err));

    // 즉시 카톡 안내 레이어 띄우기
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
                <button onclick="location.reload()" style="width:100%;background:#f5f5f5;border:none;padding:12px;border-radius:10px;color:#888;cursor:pointer;font-size:14px;">창 닫기</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', layerHtml);

    // 모달 닫기
    closeModal(formId.replace('Form', 'Modal'));
}

// 6. 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // 모든 모달 초기화 (강제 숨김)
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));

    // 스튜디오 폼 이벤트
    const studioForm = document.getElementById('studioForm');
    if (studioForm) {
        studioForm.addEventListener('change', calculateStudio);
        studioForm.addEventListener('submit', (e) => handleFormSubmit(e, 'studioForm', '스튜디오'));
    }

    // 백일상 폼 이벤트
    const milestoneForm = document.getElementById('milestoneForm');
    if (milestoneForm) {
        milestoneForm.addEventListener('change', calculateMilestone);
        milestoneForm.addEventListener('submit', (e) => handleFormSubmit(e, 'milestoneForm', '백일상'));
    }

    // 드레스 폼 이벤트
    const dressForm = document.getElementById('dressForm');
    if (dressForm) {
        dressForm.addEventListener('change', calculateDress);
        dressForm.addEventListener('submit', (e) => handleFormSubmit(e, 'dressForm', '의상'));
    }

    // 탭 전환 기능
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });
});

// 모바일 메뉴 제어
function toggleMobileMenu() { document.getElementById("mobileMenu").classList.toggle("active"); }
function closeMobileMenu() { document.getElementById("mobileMenu").classList.remove("active"); }
