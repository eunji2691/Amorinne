const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxiz6G4RqStsipTiHY32LK5uppI-KxmRiY-INn1TkmCte59zzlweYE0gK9gh7_HcNIE5g/exec';
const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_cxhePn';

// =====================================================================================================================
// 공용 모달 제어 함수 (openModal, closeModal)
// =====================================================================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // 스크롤 허용
    // 모달 닫을 때 폼 초기화 (선택 사항)
    const form = modal.querySelector('form');
    if (form) form.reset();
    // 스튜디오 모달의 경우 가격 및 종료 시간 초기화
    if (modalId === 'studioModal') {
      document.getElementById('studioTotalPrice').innerText = '0원';
      document.getElementById('endTime').value = '';
      document.getElementById('studioTableSelectWrap').classList.add('hidden');
    }
    // 백일상 모달의 경우 가격 초기화
    if (modalId === 'milestoneModal') {
      document.getElementById('milestoneTotalPrice').innerText = '0원';
    }
    // 드레스 모달의 경우 가격 초기화
    if (modalId === 'dressModal') {
      document.getElementById('dressTotalPrice').innerText = '0원';
      document.getElementById('dressSocksColorWrap').classList.add('hidden');
      document.getElementById('dressTightsColorWrap').classList.add('hidden');
    }
    // 완료 팝업이 열려있으면 닫기
    const finalOk = document.getElementById('finalOk');
    if (finalOk) finalOk.remove();
  }
}

// =====================================================================================================================
// 모바일 메뉴 토글
// =====================================================================================================================
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.remove('active');
}

// =====================================================================================================================
// 이미지 모달 제어
// =====================================================================================================================
function openImageModal(imgSrc, imgTitle) {
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imageModalImg');
  const modalTitle = document.getElementById('imageModalTitle');

  modalImg.src = imgSrc;
  modalTitle.innerText = imgTitle;
  imageModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const imageModal = document.getElementById('imageModal');
  imageModal.classList.add('hidden');
  document.body.style.overflow = '';
}

// =====================================================================================================================
// 서비스 탭 및 서브 탭 제어
// =====================================================================================================================
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const subTabButtons = document.querySelectorAll('.sub-tab-btn');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;

      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');

      document.querySelectorAll('.service-image').forEach(img => img.style.display = 'none');
      document.getElementById(`service-img-${tab}`).style.display = 'block';

      // 서브탭 초기화
      const activeSubTab = document.querySelector(`#tab-${tab} .sub-tab-btn`);
      if (activeSubTab) {
        document.querySelectorAll(`#tab-${tab} .sub-tab-btn`).forEach(btn => btn.classList.remove('active'));
        activeSubTab.classList.add('active');
        document.querySelectorAll(`#tab-${tab} .tab-content`).forEach(content => content.classList.remove('active'));
        document.getElementById(`subtab-${activeSubTab.dataset.subtab}`).classList.add('active');
      }
    });
  });

  subTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const subtab = button.dataset.subtab;
      const parentTab = button.dataset.parent;

      document.querySelectorAll(`#tab-${parentTab} .sub-tab-btn`).forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      document.querySelectorAll(`#tab-${parentTab} .tab-content`).forEach(content => content.classList.remove('active'));
      document.getElementById(`subtab-${subtab}`).classList.add('active');
    });
  });

  // 초기 로드 시 스튜디오 테이블 및 옵션 렌더링
  renderStudioTables();
  renderStudioOptions();
  renderMilestoneTables();
  renderMilestoneOptions();
});

// =====================================================================================================================
// 스튜디오 테이블 및 옵션 데이터 (실제 데이터로 교체 필요)
// =====================================================================================================================
const studioTablesData = [
  { id: 'pure', name: '퓨어', price: 35000, img: 'images/table_pure.jpg' },
  { id: 'royal-white', name: '로얄 WHITE', price: 40000, img: 'images/table_royal_white.jpg' },
  { id: 'royal-yellow', name: '로얄 YELLOW', price: 40000, img: 'images/table_royal_yellow.jpg' },
  { id: 'seorin', name: '서린상', price: 45000, img: 'images/table_seorin.jpg' },
  { id: 'daon', name: '다온상', price: 40000, img: 'images/table_daon.jpg' },
  { id: 'hayeon', name: '하연상', price: 35000, img: 'images/table_hayeon.jpg' },
  { id: 'safari', name: '사파리', price: 35000, img: 'images/table_safari.jpg' },
  { id: 'bridal', name: '브라이덜 샤워', price: 50000, img: 'images/table_bridal.jpg' },
];

const studioOptionsData = [
  { id: 'baeksilHanbok', name: '백일 한복', price: 15000, img: 'images/option_hanbok.jpg' },
  { id: 'dolDressClothing', name: '돌 의상', price: 35000, img: 'images/option_dress.jpg' },
  { id: 'iphoneSnap', name: '아이폰 스냅', price: 50000, img: 'images/option_iphone.jpg' },
  { id: 'cameraRental', name: '카메라 대여', price: 20000, img: 'images/option_camera.jpg' },
];

const milestoneTablesData = [
  { id: 'pureTable', name: '퓨어 테이블', price: 69000, img: 'images/milestone_pure.jpg' },
  { id: 'royalWhiteTable', name: '로얄 테이블 WHITE', price: 89000, img: 'images/milestone_royal_white.jpg' },
  { id: 'royalYellowTable', name: '로얄 테이블 YELLOW', price: 89000, img: 'images/milestone_royal_yellow.jpg' },
  { id: 'seorinTable', name: '서린상', price: 99000, img: 'images/milestone_seorin.jpg' },
  { id: 'daonTable', name: '다온상', price: 89000, img: 'images/milestone_daon.jpg' },
  { id: 'hayeonTable', name: '하연상', price: 79000, img: 'images/milestone_hayeon.jpg' },
  { id: 'safariTable', name: '사파리 테이블', price: 69000, img: 'images/milestone_safari.jpg' },
  { id: 'bridalShower', name: '브라이덜 샤워', price: 80000, img: 'images/milestone_bridal.jpg' },
];

const milestoneOptionsData = [
  { id: 'msClothing', name: '백일 의상', price: 10000, img: 'images/milestone_option_clothing.jpg' },
  { id: 'msHanbok', name: '백일 한복', price: 15000, img: 'images/milestone_option_hanbok.jpg' },
  { id: 'msDolHanbok', name: '돌 한복/드레스/정장', price: 35000, img: 'images/milestone_option_dol.jpg' },
  { id: 'acc_jeongjagwan', name: '한복 악세사리 - 정자관', price: 5000, img: 'images/milestone_option_acc_jeongjagwan.jpg' },
  { id: 'acc_ilbangat', name: '한복 악세사리 - 일반갓', price: 5000, img: 'images/milestone_option_acc_ilbangat.jpg' },
  { id: 'acc_yugeon', name: '한복 악세사리 - 유건', price: 5000, img: 'images/milestone_option_acc_yugeon.jpg' },
  { id: 'acc_gachae', name: '한복 악세사리 - 가채', price: 5000, img: 'images/milestone_option_acc_gachae.jpg' },
  { id: 'acc_meoritti', name: '한복 악세사리 - 머리띠', price: 5000, img: 'images/milestone_option_acc_meoritti.jpg' },
  { id: 'msBambo', name: '범보의자/양털의자/돌방석', price: 5000, img: 'images/milestone_option_bambo.jpg' },
  { id: 'msCushion', name: '돌방석', price: 5000, img: 'images/milestone_option_cushion.jpg' },
  { id: 'msMat', name: '방수요(베개 추가 +5,000)', price: 5000, img: 'images/milestone_option_mat.jpg' },
  { id: 'msTable', name: '접이식 테이블', price: 10000, img: 'images/milestone_option_table.jpg' },
  { id: 'msGrabbing', name: '돌잡이 세트', price: 10000, img: 'images/milestone_option_grabbing.jpg' },
  { id: 'msFruit', name: '고급 모형 과일', price: 10000, img: 'images/milestone_option_fruit.jpg' },
  { id: 'msBaekseolgi', name: '모형 백설기', price: 5000, img: 'images/milestone_option_baekseolgi.jpg' },
  { id: 'msWoodBaekseolgi', name: '모형 우드 백설기', price: 10000, img: 'images/milestone_option_wood_baekseolgi.jpg' },
  { id: 'msCake', name: '모형 백설기 케이크', price: 10000, img: 'images/milestone_option_cake.jpg' },
  { id: 'msSiru', name: '모형 시루떡', price: 5000, img: 'images/milestone_option_siru.jpg' },
  { id: 'msPlate', name: '접시형 모형 떡', price: 7000, img: 'images/milestone_option_plate.jpg' },
  { id: 'msCalligraphy', name: '자체제작 금박 캘리그라피 카드', price: 9900, img: 'images/milestone_option_calligraphy.jpg' },
];

const dressOptionsData = [
  { id: 'dressNiceSocks', name: '니삭스', price: 4000 },
  { id: 'dressTights', name: '타이즈', price: 6000 },
  { id: 'dressBasket', name: '화동바구니', price: 5000 },
  { id: 'dressCar', name: '화동카', price: 30000 },
];

function renderStudioTables() {
  const container = document.getElementById('studio-tables-list');
  if (!container) return;
  container.innerHTML = studioTablesData.map(table => `
    <div class="image-card" onclick="openImageModal('${table.img}', '${table.name}')">
      <img src="${table.img}" alt="${table.name}" />
      <div class="image-card-text">
        <h4>${table.name}</h4>
        <p>${table.price.toLocaleString()}원</p>
      </div>
    </div>
  `).join('');
}

function renderStudioOptions() {
  const container = document.getElementById('studio-options-list');
  if (!container) return;
  container.innerHTML = studioOptionsData.map(option => `
    <div class="image-card" onclick="openImageModal('${option.img}', '${option.name}')">
      <img src="${option.img}" alt="${option.name}" />
      <div class="image-card-text">
        <h4>${option.name}</h4>
        <p>${option.price.toLocaleString()}원</p>
      </div>
    </div>
  `).join('');
}

function renderMilestoneTables() {
  const container = document.getElementById('milestone-tables-list');
  if (!container) return;
  container.innerHTML = milestoneTablesData.map(table => `
    <div class="image-card" onclick="openImageModal('${table.img}', '${table.name}')">
      <img src="${table.img}" alt="${table.name}" />
      <div class="image-card-text">
        <h4>${table.name}</h4>
        <p>${table.price.toLocaleString()}원</p>
      </div>
    </div>
  `).join('');
}

function renderMilestoneOptions() {
  const container = document.getElementById('milestone-options-list');
  if (!container) return;
  container.innerHTML = milestoneOptionsData.map(option => `
    <div class="image-card" onclick="openImageModal('${option.img}', '${option.name}')">
      <img src="${option.img}" alt="${option.name}')">
      <div class="image-card-text">
        <h4>${option.name}</h4>
        <p>${option.price.toLocaleString()}원</p>
      </div>
    </div>
  `).join('');
}

// =====================================================================================================================
// 스튜디오 예약 폼 로직
// =====================================================================================================================
const studioForm = document.getElementById('studioForm');
if (studioForm) {
  const studioTotalPriceElement = document.getElementById('studioTotalPrice');
  const endTimeInput = document.getElementById('endTime');
  const useTableCheckbox = document.getElementById('useTable');
  const studioTableSelectWrap = document.getElementById('studioTableSelectWrap');
  const studioTableSelect = studioForm.querySelector('select[name="memoTableSettingDetails"]');

  const STUDIO_BASE_PRICES = {
    '평일': { '1': 60000, '2': 100000 },
    '주말': { '1': 70000, '2': 120000 }
  };

  const STUDIO_OPTION_PRICES = {
    'pure': 35000,
    'royal-white': 40000,
    'royal-yellow': 40000,
    'seorin': 45000,
    'daon': 40000,
    'hayeon': 35000,
    'safari': 35000,
    'bridal': 50000,
    'baeksilHanbok': 15000,
    'dolDressClothing': 35000,
    'iphoneSnap': 50000,
    'cameraRental': 20000
  };

  function updateStudioPrice() {
    let totalPrice = 0;
    const reservationDate = studioForm.elements['reservationDate'].value;
    const reservationTime = studioForm.elements['reservationTime'].value;
    const rentalHours = parseInt(studioForm.elements['rentalHours'].value);
    const adultCount = parseInt(studioForm.elements['adultCount'].value);

    if (reservationDate && reservationTime && rentalHours) {
      const date = new Date(reservationDate);
      const dayOfWeek = date.getDay(); // 0:일, 1:월, ..., 6:토
      const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
      const dayType = isWeekend ? '주말' : '평일';

      if (STUDIO_BASE_PRICES[dayType] && STUDIO_BASE_PRICES[dayType][rentalHours]) {
        totalPrice += STUDIO_BASE_PRICES[dayType][rentalHours];
      }

      // 종료 시간 계산
      const [hours, minutes] = reservationTime.split(':').map(Number);
      const endDateTime = new Date(date);
      endDateTime.setHours(hours + rentalHours, minutes);
      endTimeInput.value = endDateTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else {
      endTimeInput.value = '';
    }

    // 5인 초과 인원 추가 요금 (성인 + 아기)
    const babyCount = parseInt(studioForm.elements['babyCount'].value);
    const totalPeople = adultCount + babyCount;
    if (totalPeople > 5) {
      totalPrice += (totalPeople - 5) * 5000; // 1인당 5천원 추가
    }

    // 테이블 세팅 옵션
    if (useTableCheckbox.checked && studioTableSelect.value) {
      totalPrice += STUDIO_OPTION_PRICES[studioTableSelect.value] || 0;
    }

    // 기타 유료 옵션
    studioForm.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      if (checkbox.name !== 'memoTableSetting') {
        totalPrice += STUDIO_OPTION_PRICES[checkbox.name] || 0;
      }
    });

    studioTotalPriceElement.innerText = totalPrice.toLocaleString() + '원';
  }

  // 이벤트 리스너 연결
  ['reservationDate', 'reservationTime', 'rentalHours', 'adultCount', 'babyCount'].forEach(name => {
    const element = studioForm.elements[name];
    if (element) element.addEventListener('change', updateStudioPrice);
  });

  useTableCheckbox.addEventListener('change', () => {
    if (useTableCheckbox.checked) {
      studioTableSelectWrap.classList.remove('hidden');
    } else {
      studioTableSelectWrap.classList.add('hidden');
      studioTableSelect.value = ''; // 선택 초기화
    }
    updateStudioPrice();
  });
  studioTableSelect.addEventListener('change', updateStudioPrice);

  studioForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.name !== 'memoTableSetting') {
      checkbox.addEventListener('change', updateStudioPrice);
    }
  });

  // 폼 제출 처리
  studioForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById('studioSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = '예약 접수 중...';

    const formData = new FormData(studioForm);
    const data = {
      type: '무인 셀프 스튜디오',
      customerName: formData.get('customerName'),
      phone: formData.get('phone'),
      babyName: formData.get('babyName'),
      babyEngName: formData.get('babyEngName'),
      babyGender: formData.get('babyGender'),
      reservationDate: formData.get('reservationDate'),
      reservationTime: formData.get('reservationTime'),
      rentalHours: formData.get('rentalHours'),
      endTime: endTimeInput.value, // 계산된 종료 시간
      adultCount: formData.get('adultCount'),
      babyCount: formData.get('babyCount'),
      memoTableSetting: formData.get('memoTableSetting') ? (formData.get('memoTableSettingDetails') || '선택 안함') : '사용 안함',
      baeksilHanbok: formData.get('baeksilHanbok') ? '예' : '아니오',
      dolDressClothing: formData.get('dolDressClothing') ? '예' : '아니오',
      iphoneSnap: formData.get('iphoneSnap') ? '예' : '아니오',
      cameraRental: formData.get('cameraRental') ? '예' : '아니오',
      notes: formData.get('notes'),
      totalPrice: studioTotalPriceElement.innerText,
    };

    // 카카오톡 메시지 생성
    let kakaoMsg = `[아모린느 스튜디오 예약]\n`;
    kakaoMsg += `성함: ${data.customerName}\n`;
    kakaoMsg += `연락처: ${data.phone}\n`;
    if (data.babyName) kakaoMsg += `아기 이름: ${data.babyName}\n`;
    if (data.babyEngName) kakaoMsg += `아기 영문 이름: ${data.babyEngName}\n`;
    if (data.babyGender) kakaoMsg += `아기 성별: ${data.babyGender}\n`;
    kakaoMsg += `날짜: ${data.reservationDate}\n`;
    kakaoMsg += `시간: ${data.reservationTime} (${data.rentalHours}시간)\n`;
    kakaoMsg += `종료: ${data.endTime}\n`;
    kakaoMsg += `성인: ${data.adultCount}명, 아기: ${data.babyCount}명\n`;
    
    // 테이블 세팅 상세 포함
    if (data.memoTableSetting !== '사용 안함') {
      const selectedTable = studioTablesData.find(t => t.id === formData.get('memoTableSettingDetails'));
      if (selectedTable) {
        kakaoMsg += `테이블: ${selectedTable.name} (${selectedTable.price.toLocaleString()}원)\n`;
      } else {
        kakaoMsg += `테이블: ${data.memoTableSetting} (가격 정보 없음)\n`;
      }
    }

    // 유료 옵션 상세 포함
    const selectedOptions = [];
    studioOptionsData.forEach(option => {
      if (formData.get(option.id)) {
        selectedOptions.push(`${option.name} (${option.price.toLocaleString()}원)`);
      }
    });
    if (selectedOptions.length > 0) {
      kakaoMsg += `추가 옵션: ${selectedOptions.join(', ')}\n`;
    }

    kakaoMsg += `요청사항: ${data.notes || '없음'}\n`;
    kakaoMsg += `총 예상 금액: ${data.totalPrice}\n`;
    kakaoMsg += `\n내용이 복사되었습니다. 채팅창에 붙여넣어주세요!`;

    // 클립보드 복사 시도 (await 없이 즉시 실행)
    try {
      await navigator.clipboard.writeText(kakaoMsg);
    } catch (err) {
      // 구형 브라우저 또는 보안 문제 시 대체 (document.execCommand는 더 이상 권장되지 않음)
      const textarea = document.createElement('textarea');
      textarea.value = kakaoMsg;
      textarea.style.position = 'fixed'; // off-screen
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('클립보드 복사 실패 (execCommand):', err);
      }
      document.body.removeChild(textarea);
    }

    // 서버 전송 (await 없이 진행하여 UI 블로킹 방지)
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // CORS 문제 방지
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString(),
    }).then(response => {
      // no-cors 모드에서는 response.ok나 response.json()을 직접 사용할 수 없음
      // 성공 여부는 Google Apps Script의 로깅으로 확인하거나, 다른 방식으로 처리해야 함
      console.log('데이터 전송 시도 완료 (no-cors 모드)');
    }).catch(error => {
      console.error('데이터 전송 중 오류 발생:', error);
    }).finally(() => {
      // 서버 응답과 관계없이 성공 팝업 띄우기
      showCompletionPopup(kakaoMsg);
      submitBtn.disabled = false;
      submitBtn.innerText = '예약 접수 및 카카오톡 이동';
    });
  });

  // 초기 가격 계산
  updateStudioPrice();
}

// =====================================================================================================================
// 백일상/돌상 예약 폼 로직
// =====================================================================================================================
const milestoneForm = document.getElementById('milestoneForm');
if (milestoneForm) {
  const milestoneTotalPriceElement = document.getElementById('milestoneTotalPrice');

  const MILESTONE_PRICES = {
    '퓨어테이블': 69000,
    '로얄 테이블 WHITE': 89000,
    '로얄 테이블 YELLOW': 89000,
    '서린상': 99000,
    '다온상': 89000,
    '하연상': 79000,
    '사파리테이블': 69000,
    '브라이덜샤워': 80000,
  };

  const MILESTONE_OPTION_PRICES = {
    'msClothing': 10000,
    'msHanbok': 15000,
    'msDolHanbok': 35000,
    'acc_jeongjagwan': 5000,
    'acc_ilbangat': 5000,
    'acc_yugeon': 5000,
    'acc_gachae': 5000,
    'acc_meoritti': 5000,
    'msBambo': 5000,
    'msCushion': 5000,
    'msMat': 5000,
    'msTable': 10000,
    'msGrabbing': 10000,
    'msFruit': 10000,
    'msBaekseolgi': 5000,
    'msWoodBaekseolgi': 10000,
    'msCake': 10000,
    'msSiru': 5000,
    'msPlate': 7000,
    'msCalligraphy': 9900,
  };

  function updateMilestonePrice() {
    let totalPrice = 0;
    const tableSelection = milestoneForm.elements['tableSelection'].value;

    if (MILESTONE_PRICES[tableSelection]) {
      totalPrice += MILESTONE_PRICES[tableSelection];
    }

    milestoneForm.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      totalPrice += MILESTONE_OPTION_PRICES[checkbox.name] || 0;
    });

    milestoneTotalPriceElement.innerText = totalPrice.toLocaleString() + '원';
  }

  milestoneForm.querySelectorAll('select, input[type="checkbox"]').forEach(element => {
    element.addEventListener('change', updateMilestonePrice);
  });

  milestoneForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = milestoneForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = '예약 접수 중...';

    const formData = new FormData(milestoneForm);
    const data = {
      type: '백일상·돌상 대여',
      customerName: formData.get('customerName'),
      phone: formData.get('phone'),
      eventDate: formData.get('eventDate'),
      tableSelection: formData.get('tableSelection'),
      notes: formData.get('notes'),
      totalPrice: milestoneTotalPriceElement.innerText,
    };

    // 옵션 상세 추가
    const selectedOptions = [];
    milestoneForm.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      const optionName = document.querySelector(`label[for="${checkbox.id}"]`)?.innerText.split('(')[0].trim() || checkbox.name;
      const optionPrice = MILESTONE_OPTION_PRICES[checkbox.name];
      selectedOptions.push(`${optionName} (${optionPrice.toLocaleString()}원)`);
    });
    if (selectedOptions.length > 0) {
      data.options = selectedOptions.join(', ');
    }

    // 카카오톡 메시지 생성
    let kakaoMsg = `[아모린느 백일상/돌상 예약]\n`;
    kakaoMsg += `성함: ${data.customerName}\n`;
    kakaoMsg += `연락처: ${data.phone}\n`;
    kakaoMsg += `행사 날짜: ${data.eventDate}\n`;
    kakaoMsg += `테이블: ${data.tableSelection}\n`;
    if (data.options) kakaoMsg += `추가 옵션: ${data.options}\n`;
    kakaoMsg += `요청사항: ${data.notes || '없음'}\n`;
    kakaoMsg += `총 예상 금액: ${data.totalPrice}\n`;
    kakaoMsg += `\n내용이 복사되었습니다. 채팅창에 붙여넣어주세요!`;

    try {
      await navigator.clipboard.writeText(kakaoMsg);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = kakaoMsg;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('클립보드 복사 실패 (execCommand):', err);
      }
      document.body.removeChild(textarea);
    }

    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString(),
    }).then(response => {
      console.log('데이터 전송 시도 완료 (no-cors 모드)');
    }).catch(error => {
      console.error('데이터 전송 중 오류 발생:', error);
    }).finally(() => {
      showCompletionPopup(kakaoMsg);
      submitBtn.disabled = false;
      submitBtn.innerText = '예약 접수';
    });
  });

  updateMilestonePrice();
}

// =====================================================================================================================
// 정장/드레스 대여 폼 로직
// =====================================================================================================================
const dressForm = document.getElementById('dressForm');
if (dressForm) {
  const dressTotalPriceElement = document.getElementById('dressTotalPrice');
  const dressNiceSocksCheckbox = document.getElementById('dressNiceSocks');
  const dressSocksColorWrap = document.getElementById('dressSocksColorWrap');
  const dressTightsCheckbox = document.getElementById('dressTights');
  const dressTightsColorWrap = document.getElementById('dressTightsColorWrap');

  const DRESS_OPTION_PRICES = {
    'niceSocks': 4000,
    'tights': 6000,
    'hwadongBasket': 5000,
    'hwadongCar': 30000,
  };

  function updateDressPrice() {
    let totalPrice = 0;

    dressForm.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      totalPrice += DRESS_OPTION_PRICES[checkbox.name] || 0;
    });

    dressTotalPriceElement.innerText = totalPrice.toLocaleString() + '원 (피팅비 별도)';
  }

  function toggleDressSocksColor() {
    if (dressNiceSocksCheckbox.checked) {
      dressSocksColorWrap.classList.remove('hidden');
    } else {
      dressSocksColorWrap.classList.add('hidden');
      dressSocksColorWrap.querySelector('select').value = 'black'; // 기본값으로 초기화
    }
  }

  function toggleDressTightsColor() {
    if (dressTightsCheckbox.checked) {
      dressTightsColorWrap.classList.remove('hidden');
    } else {
      dressTightsColorWrap.classList.add('hidden');
      dressTightsColorWrap.querySelector('select').value = 'black'; // 기본값으로 초기화
    }
  }

  dressForm.querySelectorAll('select, input[type="checkbox"]').forEach(element => {
    element.addEventListener('change', updateDressPrice);
  });
  dressNiceSocksCheckbox.addEventListener('change', toggleDressSocksColor);
  dressTightsCheckbox.addEventListener('change', toggleDressTightsColor);

  dressForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = dressForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = '예약 접수 중...';

    const formData = new FormData(dressForm);
    const data = {
      type: '정장·드레스 대여',
      customerName: formData.get('customerName'),
      phone: formData.get('phone'),
      fittingDate: formData.get('fittingDate'),
      eventDate: formData.get('eventDate'),
      rentalProduct: formData.get('rentalProduct') || '피팅 후 선택',
      notes: formData.get('notes'),
      totalPrice: dressTotalPriceElement.innerText,
    };

    // 옵션 상세 추가
    const selectedOptions = [];
    dressOptionsData.forEach(option => {
      if (formData.get(option.id)) {
        let optionDetail = option.name;
        if (option.id === 'dressNiceSocks' && formData.get('niceSocksColor')) {
          optionDetail += ` (${formData.get('niceSocksColor') === 'black' ? '검정' : '흰색'})`;
        }
        if (option.id === 'dressTights' && formData.get('tightsColor')) {
          optionDetail += ` (${formData.get('tightsColor') === 'black' ? '검정' : '흰색'})`;
        }
        selectedOptions.push(`${optionDetail} (${option.price.toLocaleString()}원)`);
      }
    });
    if (selectedOptions.length > 0) {
      data.options = selectedOptions.join(', ');
    }

    // 카카오톡 메시지 생성
    let kakaoMsg = `[아모린느 정장/드레스 대여]\n`;
    kakaoMsg += `성함: ${data.customerName}\n`;
    kakaoMsg += `연락처: ${data.phone}\n`;
    kakaoMsg += `피팅 날짜: ${data.fittingDate}\n`;
    kakaoMsg += `행사 날짜: ${data.eventDate}\n`;
    kakaoMsg += `대여 상품: ${data.rentalProduct}\n`;
    if (data.options) kakaoMsg += `추가 옵션: ${data.options}\n`;
    kakaoMsg += `요청사항: ${data.notes || '없음'}\n`;
    kakaoMsg += `총 예상 금액: ${data.totalPrice}\n`;
    kakaoMsg += `\n내용이 복사되었습니다. 채팅창에 붙여넣어주세요!`;

    try {
      await navigator.clipboard.writeText(kakaoMsg);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = kakaoMsg;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('클립보드 복사 실패 (execCommand):', err);
      }
      document.body.removeChild(textarea);
    }

    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString(),
    }).then(response => {
      console.log('데이터 전송 시도 완료 (no-cors 모드)');
    }).catch(error => {
      console.error('데이터 전송 중 오류 발생:', error);
    }).finally(() => {
      showCompletionPopup(kakaoMsg);
      submitBtn.disabled = false;
      submitBtn.innerText = '예약 접수';
    });
  });

  updateDressPrice();
}

// =====================================================================================================================
// 예약 완료 팝업 (모든 폼에서 공용 사용)
// =====================================================================================================================
function showCompletionPopup(kakaoMsg) {
  const existingPopup = document.getElementById('finalOk');
  if (existingPopup) existingPopup.remove(); // 기존 팝업이 있으면 제거

  const html = `
    <div id="finalOk" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:99999;display:flex;align-items:center;justify-content:center;">
      <div style="background:white;padding:30px;border-radius:15px;text-align:center;max-width:320px;">
        <h2 style="margin-bottom:15px;">예약 접수 완료!</h2>
        <p style="margin-bottom:20px;font-size:14px;color:#666;">예약 내용이 복사되었습니다.<br>아래 버튼을 눌러 카카오톡에 붙여넣어주세요.</p>
        <a href="${KAKAO_CHANNEL_URL}" target="_blank" rel="noopener noreferrer" style="display:block;background:#fee500;padding:15px;border-radius:10px;text-decoration:none;color:#3c1e1e;font-weight:bold;">카카오톡으로 내용 보내기</a>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);

  // 모든 모달 닫기
  closeModal('studioModal');
  closeModal('milestoneModal');
  closeModal('dressModal');
}

// =====================================================================================================================
// 초기화 및 이벤트 리스너 (DOM 로드 후 실행)
// =====================================================================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Kakao SDK 초기화
  if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init('YOUR_JAVASCRIPT_KEY'); // 여기에 실제 카카오 JavaScript 키를 넣어주세요.
  }

  // 모든 모달 초기 상태 hidden 및 z-index 정리
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.add('hidden');
    modal.style.zIndex = '9998'; // 일반 모달은 9998
  });
  // 완료 팝업은 99999로 가장 위에 오도록 설정
  const finalOk = document.getElementById('finalOk');
  if (finalOk) finalOk.style.zIndex = '99999';

  // 이미지 카드 클릭 이벤트 (갤러리 이미지 확대)
  document.querySelectorAll('.image-card').forEach(card => {
    card.addEventListener('click', (event) => {
      const imgSrc = card.querySelector('img').src;
      const imgTitle = card.querySelector('h4') ? card.querySelector('h4').innerText : '';
      openImageModal(imgSrc, imgTitle);
    });
  });

  // 모바일 메뉴 토글 버튼 이벤트 리스너 (HTML에 onclick 있음)
  // 탭 버튼 이벤트 리스너 (DOMContentLoaded에 이미 있음)

  // 초기 가격 계산 (모든 폼)
  if (studioForm) updateStudioPrice();
  if (milestoneForm) updateMilestonePrice();
  if (dressForm) updateDressPrice();
});

