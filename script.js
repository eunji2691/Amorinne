/* ===== Amorinne Final Script (Original Restoration + New Features) ===== */

const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_URL = 'https://pf.kakao.com/_cxhePn/chat';

// 1. 모달 제어 (공용)
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function openImageModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.style.display = 'flex';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.style.display = 'none';
}

// 2. 스튜디오 가격 및 시간 계산
function updateStudioPrice() {
    const form = document.getElementById('studioForm');
    if (!form) return;

    let total = 0;
    const date = form.reservationDate.value;
    const hours = parseInt(form.rentalHours.value) || 0;
    const time = form.reservationTime.value;

    // 기본 대여료
    if (date && hours > 0) {
        const day = new Date(date).getDay();
        const isWeekend = (day === 0 || day === 6);
        if (hours === 1) total = isWeekend ? 70000 : 60000;
        else if (hours === 2) total = isWeekend ? 120000 : 100000;
    }

    // 인원 추가
    const adults = parseInt(form.adultCount.value) || 0;
    const babies = parseInt(form.babyCount.value) || 0;
    if (adults + babies > 5) total += (adults + babies - 5) * 10000;

    // 테이블 세팅
    const useTable = document.getElementById('useTable');
    const tableWrap = document.getElementById('studioTableSelectWrap');
    if (useTable && useTable.checked) {
        tableWrap.classList.remove('hidden');
        const tableType = form.memoTableSettingDetails.value;
        const prices = { pure: 35000, 'royal-white': 40000, 'royal-yellow': 40000, seorin: 45000, daon: 40000, hayeon: 35000, safari: 35000, bridal: 50000 };
        total += prices[tableType] || 0;
    } else if (tableWrap) {
        tableWrap.classList.add('hidden');
    }

    // 기타 옵션
    if (form.baeksilHanbok.checked) total += 15000;
    if (form.dolDressClothing.checked) total += 35000;
    if (form.iphoneSnap.checked) total += 50000;
    if (form.cameraRental.checked) total += 20000;

    document.getElementById('studioTotalPrice').innerText = total.toLocaleString() + "원";

    // 종료 시간 계산
    if (time && hours) {
        let [h, m] = time.split(':').map(Number);
        document.getElementById('endTime').value = (h + hours).toString().padStart(2, '0') + ":" + m.toString().padStart(2, '0');
    }
}

// 3. 백일상 가격 계산
function updateMilestonePrice() {
    const form = document.getElementById('milestoneForm');
    if (!form) return;
    const tablePrices = { "퓨어테이블": 69000, "로얄 테이블(WHITE)": 89000, "로얄 테이블(YELLOW)": 89000, "서린상": 99000, "다온상": 89000, "하연상": 79000, "사파리테이블": 69000, "브라이덜샤워": 80000 };
    let total = tablePrices[form.tableSelection.value] || 0;
    
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(cb => {
        if (['baekil100Clothing', 'foldingTable', 'dolGrabbingSet', 'premiumModelFruit', 'modelWoodBaekseolgi', 'modelBaekseolgiCake'].includes(cb.name)) total += 10000;
        else if (cb.name === 'baekil100Hanbok') total += 15000;
        else if (cb.name === 'dolHanbok') total += 35000;
        else if (['bamboChair', 'dolCushion', 'waterproofMat', 'modelBaekseolgi', 'modelSiruTteok'].includes(cb.name)) total += 5000;
        else if (cb.name === 'modelPlateTeok') total += 7000;
        else if (cb.name === 'calligraphyCard') total += 9900;
        else if (cb.name.startsWith('acc_')) total += 5000;
    });
    document.getElementById('milestoneTotalPrice').innerText = total.toLocaleString() + "원";
}

// 4. 드레스 가격 계산
function updateDressPrice() {
    const form = document.getElementById('dressForm');
    let total = 0;
    if (form.niceSocks.checked) total += 4000;
    if (form.tights.checked) total += 6000;
    if (form.hwadongBasket.checked) total += 5000;
    if (form.hwadongCar.checked) total += 30000;
    document.getElementById('dressTotalPrice').innerText = total.toLocaleString() + "원 (피팅비 별도)";
}

function toggleDressSocksColor() { document.getElementById('dressSocksColorWrap').classList.toggle('hidden', !document.getElementById('dressNiceSocks').checked); }
function toggleDressTightsColor() { document.getElementById('dressTightsColorWrap').classList.toggle('hidden', !document.getElementById('dressTights').checked); }

// 5. 제출 및 카톡 연동
async function handleFormSubmit(e, formId, typeName) {
    e.preventDefault();
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const totalPrice = document.getElementById(formId.replace('Form', 'TotalPrice')).innerText;

    let msg = `[아모린느 ${typeName} 예약]\n`;
    msg += `성함: ${formData.get('customerName')}\n`;
    msg += `연락처: ${formData.get('phone')}\n`;

    if (formId === 'studioForm') {
        msg += `아기정보: ${formData.get('babyName') || '-'} (${formData.get('babyEngName') || '-'}, ${formData.get('babyGender') || '-'}) \n`;
        msg += `날짜: ${formData.get('reservationDate')}\n`;
        msg += `시간: ${formData.get('reservationTime')} (${formData.get('rentalHours')}시간)\n`;
        if (formData.get('memoTableSetting') === 'on') msg += `테이블: ${formData.get('memoTableSettingDetails')}\n`;
        let opts = [];
        if (formData.get('baeksilHanbok')) opts.push("백일한복");
        if (formData.get('dolDressClothing')) opts.push("돌의상");
        if (formData.get('iphoneSnap')) opts.push("아이폰스냅");
        if (formData.get('cameraRental')) opts.push("카메라대여");
        if (opts.length > 0) msg += `옵션: ${opts.join(', ')}\n`;
    } else if (formId === 'milestoneForm') {
        msg += `행사날짜: ${formData.get('eventDate')}\n`;
        msg += `테이블: ${formData.get('tableSelection')}\n`;
    } else if (formId === 'dressForm') {
        msg += `피팅날짜: ${formData.get('fittingDate')}\n`;
        msg += `행사날짜: ${formData.get('eventDate')}\n`;
    }

    msg += `금액: ${totalPrice}\n\n내용이 복사되었습니다. 채팅창에 붙여넣어주세요!`;

    // 클립보드 복사
    const el = document.createElement('textarea');
    el.value = msg;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // 서버 전송 (비동기)
    fetch(APPS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(Object.fromEntries(formData)) });

    // 완료 레이어 팝업
    const layer = `
        <div id="finalLayer" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;">
            <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:320px;width:100%;">
                <h3 style="margin-bottom:15px;font-weight:bold;">접수 완료!</h3>
                <p style="margin-bottom:20px;color:#666;font-size:14px;line-height:1.6;">예약 내용이 복사되었습니다.<br>아래 버튼을 눌러 카카오톡 채팅창에<br><b>'붙여넣기'</b> 해주세요.</p>
                <a href="${KAKAO_URL}" target="_blank" style="display:block;background:#fee500;padding:15px;border-radius:10px;text-decoration:none;color:#3c1e1e;font-weight:bold;margin-bottom:10px;">카카오톡으로 이동</a>
                <button onclick="location.reload()" style="width:100%;background:#eee;border:none;padding:10px;border-radius:10px;color:#666;cursor:pointer;">닫기</button>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', layer);
    closeModal(formId.replace('Form', 'Modal'));
}

// 6. 초기화 및 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
    // 탭 제어
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
            
            // 이미지 변경 로직 (원본 유지)
            document.querySelectorAll('.service-image').forEach(img => img.style.display = 'none');
            document.getElementById('service-img-' + btn.dataset.tab).style.display = 'block';
        });
    });

    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.dataset.parent;
            document.querySelectorAll(`.sub-tab-btn[data-parent="${parent}"]`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll(`.tab-content[id^="subtab-${parent}"]`).forEach(c => c.classList.remove('active'));
            document.getElementById('subtab-' + btn.dataset.subtab).classList.add('active');
        });
    });

    // 폼 이벤트
    const sForm = document.getElementById('studioForm');
    if (sForm) {
        sForm.addEventListener('change', updateStudioPrice);
        sForm.addEventListener('submit', (e) => handleFormSubmit(e, 'studioForm', '스튜디오'));
    }
    const mForm = document.getElementById('milestoneForm');
    if (mForm) {
        mForm.addEventListener('submit', (e) => handleFormSubmit(e, 'milestoneForm', '백일상'));
    }
    const dForm = document.getElementById('dressForm');
    if (dForm) {
        dForm.addEventListener('submit', (e) => handleFormSubmit(e, 'dressForm', '의상'));
    }
});

function toggleMobileMenu() { document.getElementById("mobileMenu").classList.toggle("active"); }
function closeMobileMenu() { document.getElementById("mobileMenu").classList.remove("active"); }
