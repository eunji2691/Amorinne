/* ===== Amorinne Final Script (All-in-One Integrated Version) ===== */

const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_URL = 'https://pf.kakao.com/_cxhePn/chat';

// 1. 데이터 정의 (콘텐츠 복구용)
const TABLE_DATA = [
  { id: "pure", name: "퓨어 테이블", desc: "차분한 화이트 톤에 은은한 온기를 더한 테이블", img: "images/pure.jpg", studioPrice: 35000, milestonePrice: 69000 },
  { id: "royal-white", name: "로얄 테이블 (WHITE)", desc: "아모린느의 시그니처 감성을 가장 우아하게 담아낸 테이블", img: "images/royalwhite.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "royal-yellow", name: "로얄 테이블 (YELLOW)", desc: "아모린느 시그니처 라인에 따뜻함을 더한 테이블", img: "images/royalyellow.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "seorin", name: "서린상", desc: "좋은 기운이 겹겹이 스며들기를 바라는 마음을 담았습니다", img: "images/seorin.jpg", studioPrice: 45000, milestonePrice: 99000 },
  { id: "daon", name: "다온상", desc: "차분함 속에 아이의 순간을 온기있게 담아냈습니다.", img: "images/daon.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "hayeon", name: "하연상", desc: "맑고 단정한 백색의 아름다움에 전통미를 더했습니다.", img: "images/hayeon.jpg", studioPrice: 35000, milestonePrice: 79000 },
  { id: "safari", name: "사파리 테이블", desc: "생기 넘치는 동물 소품과 자연스러운 우드감이 조화를 이루는 테이블", img: "images/safari.jpg", studioPrice: 35000, milestonePrice: 69000 },
  { id: "bridal", name: "브라이덜 샤워", desc: "예비 신부의 특별한 하루를 깨끗하고 우아한 분위기로 채워줍니다.", img: "images/bridal.JPG", studioPrice: 50000, milestonePrice: 80000 }
];

const BAEKIL_HANBOK_DATA = [
  { name: "백일한복 1", img: "images/b100beige.jpg" }, { name: "백일한복 2", img: "images/b100sky.jpg" },
  { name: "백일한복 3", img: "images/b100yellow.jpg" }, { name: "백일한복 4", img: "images/b100green.jpg" },
  { name: "백일한복 5", img: "images/g100beige.jpg" }, { name: "백일한복 6", img: "images/g100yellow.jpg" },
  { name: "백일한복 7", img: "images/g100mint.jpg" }, { name: "백일한복 8", img: "images/g100colorful.jpg" }
];

const DOL_HANBOK_DATA = [
  { name: "돌한복 1", img: "images/b1yellow.jpg" }, { name: "돌한복 2", img: "images/b1sky.jpg" },
  { name: "돌한복 3", img: "images/g1colorful.jpg" }, { name: "돌한복 4", img: "images/g1haru.jpg" }
];

// 2. 모달 제어 함수
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

function openImageModal(name, img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    if (modal && modalImg) {
        modalImg.src = img;
        modal.classList.add("active");
    }
}

function closeImageModal() {
    const modal = document.getElementById("imageModal");
    if (modal) modal.classList.remove("active");
}

// 3. 스튜디오 가격 및 시간 계산
function calculateStudio() {
    const form = document.getElementById('studioForm');
    if (!form) return;

    let total = 0;
    const date = form.reservationDate.value;
    const hours = parseInt(form.rentalHours.value) || 0;
    const time = form.reservationTime.value;

    if (date && hours > 0) {
        const isWeekend = [0, 6].includes(new Date(date).getDay());
        if (hours === 1) total = isWeekend ? 70000 : 60000;
        else if (hours === 2) total = isWeekend ? 120000 : 100000;
    }

    const adults = parseInt(form.adultCount.value) || 0;
    const babies = parseInt(form.babyCount.value) || 0;
    if (adults + babies > 5) total += (adults + babies - 5) * 10000;

    const tableCb = form.querySelector('input[name="memoTableSetting"]');
    const tableWrap = document.getElementById('studioTableSelectWrap');
    if (tableCb && tableCb.checked) {
        if (tableWrap) tableWrap.classList.remove('hidden');
        const tableType = form.memoTableSettingDetails.value;
        const table = TABLE_DATA.find(t => t.id === tableType);
        total += table ? table.studioPrice : 0;
    } else {
        if (tableWrap) tableWrap.classList.add('hidden');
    }

    if (form.baeksilHanbok.checked) total += 15000;
    if (form.dolDressClothing.checked) total += 35000;
    if (form.iphoneSnap.checked) total += 50000;
    if (form.cameraRental.checked) total += 20000;

    document.getElementById('studioTotalPrice').innerText = total.toLocaleString() + "원";

    if (time && hours) {
        let hr = parseInt(time.split(':')[0]);
        document.getElementById('studioEndTime').value = (hr + hours).toString().padStart(2, '0') + ":00";
    }
}

// 4. 백일상 가격 계산
function calculateMilestone() {
    const form = document.getElementById('milestoneForm');
    if (!form) return;
    const tableType = form.tableSelection.value;
    const table = TABLE_DATA.find(t => t.id === tableType);
    document.getElementById('milestoneTotalPrice').innerText = (table ? table.milestonePrice : 0).toLocaleString() + "원";
}

// 5. 드레스 가격 계산
function calculateDress() {
    document.getElementById('dressTotalPrice').innerText = "0원 (피팅 후 결정)";
}

// 6. 공통 제출 로직
async function handleFormSubmit(e, formId, typeName) {
    e.preventDefault();
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const totalPrice = document.getElementById(formId.replace('Form', 'TotalPrice')).innerText;

    let msg = `[아모린느 ${typeName} 예약]\n`;
    msg += `성함: ${formData.get('customerName')}\n`;
    msg += `연락처: ${formData.get('phone')}\n`;
    
    if (formId === 'studioForm') {
        msg += `아기정보: ${formData.get('babyName') || '없음'} (${formData.get('babyEngName') || '-'}, ${formData.get('babyGender') || '-'})\n`;
        msg += `날짜: ${formData.get('reservationDate')}\n`;
        msg += `시간: ${formData.get('reservationTime')} (${formData.get('rentalHours')}시간)\n`;
        if (formData.get('memoTableSetting') === 'on') {
            const tableId = formData.get('memoTableSettingDetails');
            const table = TABLE_DATA.find(t => t.id === tableId);
            msg += `테이블: ${table ? table.name : '선택안됨'}\n`;
        }
        let options = [];
        if (formData.get('baeksilHanbok') === 'on') options.push("백일한복");
        if (formData.get('dolDressClothing') === 'on') options.push("돌의상");
        if (formData.get('iphoneSnap') === 'on') options.push("아이폰스냅");
        if (formData.get('cameraRental') === 'on') options.push("카메라대여");
        msg += `추가옵션: ${options.length > 0 ? options.join(', ') : '없음'}\n`;
    } else if (formId === 'milestoneForm') {
        msg += `행사날짜: ${formData.get('eventDate')}\n`;
        const tableId = formData.get('tableSelection');
        const table = TABLE_DATA.find(t => t.id === tableId);
        msg += `선택테이블: ${table ? table.name : '선택안됨'}\n`;
    } else if (formId === 'dressForm') {
        msg += `피팅날짜: ${formData.get('fittingDate')}\n`;
        msg += `행사날짜: ${formData.get('eventDate')}\n`;
    }
    
    msg += `총 예상금액: ${totalPrice}\n\n내용이 복사되었습니다. 채팅창에 붙여넣어주세요!`;

    const textArea = document.createElement("textarea");
    textArea.value = msg;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    fetch(APPS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(Object.fromEntries(formData)) });

    const layerHtml = `
        <div id="finalLayer" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999;display:flex;align-items:center;justify-content:center;padding:20px;">
            <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:340px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,0.4);">
                <div style="font-size:40px;margin-bottom:15px;">✨</div>
                <h3 style="margin-bottom:15px;font-size:20px;font-weight:bold;color:#333;">예약 접수 완료!</h3>
                <p style="margin-bottom:25px;line-height:1.6;color:#666;font-size:15px;">예약 정보가 <b>복사</b>되었습니다.<br>아래 버튼을 눌러 카카오톡 채팅창에<br><span style="color:#E64A19;font-weight:bold;">'붙여넣기'</span>만 해주시면 끝납니다!</p>
                <a href="${KAKAO_URL}" target="_blank" style="display:block;background:#fee500;padding:16px;text-decoration:none;color:#3c1e1e;font-weight:bold;border-radius:12px;font-size:17px;margin-bottom:10px;">카카오톡 열기</a>
                <button onclick="location.reload()" style="width:100%;background:#f5f5f5;border:none;padding:12px;border-radius:10px;color:#888;cursor:pointer;font-size:14px;">창 닫기</button>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', layerHtml);
    closeModal(formId.replace('Form', 'Modal'));
}

// 7. 콘텐츠 렌더링 함수
function renderContent() {
    const studioTableContainer = document.getElementById('studio-tables-list');
    const milestoneTableContainer = document.getElementById('milestone-tables-list');
    const studioOptionsContainer = document.getElementById('studio-options-list');

    if (studioTableContainer) {
        studioTableContainer.innerHTML = TABLE_DATA.map(t => `
            <div class="card" onclick="openImageModal('${t.name}', '${t.img}')">
                <div class="card-img-wrapper"><img src="${t.img}" alt="${t.name}" /></div>
                <div class="card-header"><div><div class="card-title">${t.name}</div><div class="card-desc">${t.desc}</div></div><div class="card-price">${t.studioPrice.toLocaleString()}원</div></div>
            </div>`).join('');
    }

    if (milestoneTableContainer) {
        milestoneTableContainer.innerHTML = TABLE_DATA.map(t => `
            <div class="card" onclick="openImageModal('${t.name}', '${t.img}')">
                <div class="card-img-wrapper"><img src="${t.img}" alt="${t.name}" /></div>
                <div class="card-header"><div><div class="card-title">${t.name}</div><div class="card-desc">${t.desc}</div></div><div class="card-price">${t.milestonePrice.toLocaleString()}원</div></div>
            </div>`).join('');
    }

    if (studioOptionsContainer) {
        let html = '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;margin-bottom:0.5rem;">백일 한복 (1.5만)</h4><div class="gallery-grid">';
        html += BAEKIL_HANBOK_DATA.map(h => `<div class="gallery-item" onclick="openImageModal('${h.name}', '${h.img}')"><img src="${h.img}" alt="${h.name}" /><p>${h.name}</p></div>`).join('');
        html += '</div></div><div style="margin-bottom:1rem;"><h4 style="font-weight:600;margin-bottom:0.5rem;">돌 한복/드레스/정장 (3.5만)</h4><div class="gallery-grid">';
        html += DOL_HANBOK_DATA.map(h => `<div class="gallery-item" onclick="openImageModal('${h.name}', '${h.img}')"><img src="${h.img}" alt="${h.name}" /><p>${h.name}</p></div>`).join('');
        html += '</div></div>';
        studioOptionsContainer.innerHTML = html;
    }
}

// 8. 초기화
document.addEventListener('DOMContentLoaded', function() {
    renderContent();
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));

    const studioForm = document.getElementById('studioForm');
    if (studioForm) {
        studioForm.addEventListener('change', calculateStudio);
        studioForm.addEventListener('submit', (e) => handleFormSubmit(e, 'studioForm', '스튜디오'));
    }

    const milestoneForm = document.getElementById('milestoneForm');
    if (milestoneForm) {
        milestoneForm.addEventListener('change', calculateMilestone);
        milestoneForm.addEventListener('submit', (e) => handleFormSubmit(e, 'milestoneForm', '백일상'));
    }

    const dressForm = document.getElementById('dressForm');
    if (dressForm) {
        dressForm.addEventListener('change', calculateDress);
        dressForm.addEventListener('submit', (e) => handleFormSubmit(e, 'dressForm', '의상'));
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
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
});

function toggleMobileMenu() { document.getElementById("mobileMenu").classList.toggle("active"); }
function closeMobileMenu() { document.getElementById("mobileMenu").classList.remove("active"); }
