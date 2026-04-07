// 1. 설정값 (맨 위에 배치)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyR67v5pP_qP8QvS_1X-fF-7C9n-Y-P-Y-P-Y/exec'; // 본인의 GAS URL로 교체
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

// 모달 제어 함수
function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
    document.body.style.overflow = "hidden";
}
function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
    document.body.style.overflow = "";
}

// 가격 계산 로직 (자동 연동)
document.addEventListener('change', function(e) {
    if (e.target.closest('#studioForm')) {
        calculateStudio();
    }
});

function calculateStudio() {
    const form = document.getElementById("studioForm");
    if(!form) return 0;

    const dateVal = form.reservationDate.value;
    const timeVal = form.reservationTime.value;
    const hours = parseInt(form.rentalHours.value) || 0;
    
    if (timeVal && hours) {
        let [h, m] = timeVal.split(":").map(Number);
        let endH = (h + hours) % 24;
        document.getElementById("endTime").value = `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }

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

// 예약 폼 제출 이벤트
document.getElementById("studioForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const btn = document.getElementById("studioSubmitBtn");
    btn.disabled = true;
    btn.innerText = "예약 데이터 저장 중...";

    try {
        const form = e.target;
        const formData = new FormData(form);
        const totalPrice = calculateStudio();
        const dateVal = formData.get("reservationDate");
        const isWeekend = [0, 6].includes(new Date(dateVal).getDay()) ? "주말" : "평일";
        
        const tableId = formData.get("memoTableSettingDetails");
        const tableName = formData.get("memoTableSetting") ? (TABLE_PRICES[tableId]?.name || "선택안함") : "없음";
        
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

        const kakaoMsg = `[무인 셀프 스튜디오 예약]\n예약자: ${formData.get("customerName")}\n연락처: ${formData.get("phone")}\n예약일: ${dateVal} ${formData.get("reservationTime")} (${isWeekend})\n대여시간: ${formData.get("rentalHours")}시간 (종료: ${document.getElementById("endTime").value})\n성인/아기: ${formData.get("adultCount")}명 / ${formData.get("babyCount")}명\n기념일 테이블: ${tableName}\n추가 옵션: ${optText}\n총 예상 금액: ${totalPrice.toLocaleString()}원\n요청사항: ${formData.get("notes") || "없음"}`;

        // 구글 시트 저장전송
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
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
            })
        });

        const result = await response.json();

        if (result.result === "success") {
            // 1. 클립보드 복사
            await navigator.clipboard.writeText(kakaoMsg);
            
            // 2. 모달 닫기
            closeModal("studioModal");

            // 3. 최종 성공 안내 레이어 (팝업 차단 완전 회피형)
            const successHtml = `
                <div id="finalSuccessLayer" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999;display:flex;align-items:center;justify-content:center;padding:20px;">
                    <div style="background:white;padding:30px;border-radius:20px;text-align:center;max-width:350px;width:100%;">
                        <div style="font-size:40px;margin-bottom:10px;">✅</div>
                        <h2 style="margin-bottom:10px;font-size:20px;color:#333;">예약 접수 성공!</h2>
                        <p style="margin-bottom:20px;font-size:14px;color:#666;line-height:1.6;">예약 내용이 복사되었습니다.<br>아래 버튼을 눌러 카카오톡 채팅창에<br><b>'붙여넣기'</b>를 해주세요.</p>
                        <a href="${KAKAO_CHANNEL_URL}" 
                           style="display:block;background:#fee500;padding:15px;border-radius:12px;text-decoration:none;color:#3c1e1e;font-weight:bold;font-size:16px;">카카오톡으로 이동</a>
                    </div>
                </div>`;
            document.body.insertAdjacentHTML('beforeend', successHtml);
            form.reset();
        }
    } catch (e) {
        alert("데이터 저장 중 오류가 발생했습니다. 카카오 채널로 직접 문의 부탁드립니다.");
    } finally {
        btn.disabled = false;
        btn.innerText = "예약 접수";
    }
});
