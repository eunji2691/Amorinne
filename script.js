// [주의] 구글 앱스 스크립트 주소를 본인 것으로 수정하세요!
const APPS_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_URL = 'https://pf.kakao.com/_cxhePn/chat';

// 모달 열기/닫기
function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
    document.body.style.overflow = "hidden";
}
function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
    document.body.style.overflow = "";
}

window.addEventListener('load', function() {
    const form = document.getElementById('studioForm');
    if(!form) return;

    // 가격 계산 로직
    function calculate() {
        let total = 0;
        const date = form.reservationDate.value;
        const hours = parseInt(form.rentalHours.value) || 0;
        const time = form.reservationTime.value;

        if(date && hours > 0) {
            const isWeekend = [0, 6].includes(new Date(date).getDay());
            total = (hours === 1) ? (isWeekend ? 70000 : 60000) : (isWeekend ? 120000 : 100000);
        }

        const people = (parseInt(form.adultCount.value) || 0) + (parseInt(form.babyCount.value) || 0);
        if(people > 5) total += (people - 5) * 10000;

        if(form.memoTableSetting.checked) {
            document.getElementById('studioTableSelectWrap').classList.remove('hidden');
            total += 40000;
        } else {
            document.getElementById('studioTableSelectWrap').classList.add('hidden');
        }

        if(form.baeksilHanbok.checked) total += 15000;
        if(form.dolDressClothing.checked) total += 35000;
        if(form.iphoneSnap.checked) total += 50000;
        if(form.cameraRental.checked) total += 20000;

        document.getElementById('studioTotalPrice').innerText = total.toLocaleString() + "원";
        
        if(time && hours) {
            let hr = parseInt(time.split(':')[0]);
            document.getElementById('endTime').value = (hr + hours) + ":00";
        }
    }

    form.addEventListener('change', calculate);

// 폼 제출 이벤트 (순서 변경: 카톡 팝업 먼저 -> 저장은 백그라운드)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const totalPrice = document.getElementById('studioTotalPrice').innerText;
        
        // 1. 전송할 메시지 미리 만들기
        const msg = `[아모린느 예약접수]\n성함: ${formData.get('customerName')}\n날짜: ${formData.get('reservationDate')}\n시간: ${formData.get('reservationTime')} (${formData.get('rentalHours')}시간)\n금액: ${totalPrice}\n\n내용이 복사되었습니다. 채팅창에 붙여넣어주세요!`;

        // 2. 클립보드 복사 시도
        navigator.clipboard.writeText(msg).then(() => {
            console.log("복사 완료");
        }).catch(err => {
            console.error("복사 실패: ", err);
        });

        // 3. 구글 서버로 데이터 전송 (기다리지 않고 바로 다음으로 넘어감)
        fetch(APPS_URL, { 
            method: 'POST', 
            mode: 'no-cors', // 에러 방지용 설정
            body: JSON.stringify(Object.fromEntries(formData)) 
        });

        // 4. 즉시 카카오톡 이동 팝업 띄우기
        document.body.insertAdjacentHTML('beforeend', `
            <div id="finalLayer" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:999999;display:flex;align-items:center;justify-content:center;">
                <div style="background:white;padding:30px;border-radius:15px;text-align:center;max-width:300px;box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                    <p style="margin-bottom:20px;line-height:1.6;color:#333;">
                        예약 정보가 <b>복사</b>되었습니다.<br>
                        아래 버튼을 눌러 카카오톡에<br>
                        <b>'붙여넣기'</b> 해주세요!
                    </p>
                    <a href="${KAKAO_URL}" target="_blank" style="display:block;background:#fee500;padding:15px;text-decoration:none;color:black;font-weight:bold;border-radius:10px;font-size:1.1rem;">카카오톡 열기</a>
                    <button onclick="document.getElementById('finalLayer').remove()" style="margin-top:15px;background:none;border:none;color:#999;text-decoration:underline;cursor:pointer;">닫기</button>
                </div>
            </div>
        `);

        // 모달 닫기 및 폼 초기화
        closeModal('studioModal');
        form.reset();
    });
