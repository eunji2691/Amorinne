const USE_FAKE_SUBMIT = false;
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFPF96QrteSoDohwEz20Fujdrf0evF8At-oo3qUnWS6V5KtTtSuChoeLXXYmCqFGkWSA/exec';
const KAKAO_CHAT_URL = 'http://pf.kakao.com/_cxhePn/chat';


/* ===== Amorinne Static Website Script ===== */

// ===== DATA =====
const TABLE_DATA = [
  { id: "pure", name: "퓨어 테이블", desc: "차분한 화이트 톤에 은은한 온기를 더한 테이블", img: "images/pure.jpg", studioPrice: 35000, milestonePrice: 69000 },
  { id: "royal-white", name: "로얄 테이블 (WHITE)", desc: "아모린느의 시그니처 감성을 가장 우아하게 담아낸 테이블", img: "images/royalwhite.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "royal-yellow", name: "로얄 테이블 (YELLOW)", desc: "아모린느 시그니처 라인에 따뜻함을 더한 테이블", img: "images/royalyellow.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "seorin", name: "서린상", desc: "'상서로울 서(瑞)' '맑을 린(潾)', 좋은 기운이 겹겹이 스며들기를 바라는 마음을 담았습니다", img: "images/seorin.jpg", studioPrice: 45000, milestonePrice: 99000 },
  { id: "daon", name: "다온상", desc: "‘많을 다(多), 따뜻할 온(溫)’, 차분함 속에 아이의 순간을 온기있게 담아냈습니다.", img: "images/daon.jpg", studioPrice: 40000, milestonePrice: 89000 },
  { id: "hayeon", name: "하연상", desc: "맑고 단정한 백색의 아름다움에 전통미를 더했습니다.", img: "images/hayeon.jpg", studioPrice: 35000, milestonePrice: 79000 },
  { id: "safari", name: "사파리 테이블", desc: "생기 넘치는 동물 소품과 자연스러운 우드감이 조화를 이루는 테이블", img: "images/safari.jpg", studioPrice: 35000, milestonePrice: 69000 },
  { id: "bridal", name: "브라이덜 샤워", desc: "예비 신부의 특별한 하루를 깨끗하고 우아한 분위기로 채워줍니다.", img: "images/bridal.JPG", studioPrice: 50000, milestonePrice: 80000 }
];

const STUDIO_ONLY_TABLES = [
  {
    id: "yeonhwa",
    name: "프리미엄 연화상",
    desc: "스튜디오 촬영 85,000원<br>효도상(환갑·칠순) 100,000원<br>※ 효도상은 카카오톡 문의 예약",
    img: "images/yunwha.jpg",
    studioPrice: 85000
  }
];



const pureTableDetailHtml = `
  <p class="table-detail-desc">
    차분한 화이트 톤을 바탕으로<br><br>
    안개꽃과 우드 소품을 더해<br><br>
    공간에 은은한 온기를 담은 테이블입니다.<br><br>

    아이의 맑은 순간을<br>
    가장 담백하게 기록하고 싶은 날,<br><br>
    퓨어 테이블이 조용히 그 장면을 완성해줍니다.
  </p>

  <div class="detail-section">
    <h4>기본 구성</h4>
    <ul class="detail-list">
      <li>테이블보 및 범보의자 커버</li>
      <li>안개꽃 & 유리 화병</li>
      <li>촛대와 양초</li>
      <li>원형 떡접시 / 물결 떡접시</li>
      <li>명주실 & 명주실 접시</li>
      <li>화이트 모형 케이크 & 토퍼</li>
      <li>케이크 스탠드</li>
      <li>우드 사다리</li>
      <li>망사천 & 조화</li>
      <li>우드 피켓 / 우드 족자 & 꼭꼬핀</li>
    </ul>
  </div>

`;

const royalWhiteDetailHtml = `
  <p class="table-detail-desc">
    균형 잡힌 우드 구성과<br>
    부드러운 플로럴 포인트로<br><br>
    공간에 안정감 있는 중심을 만들어주는 테이블입니다.<br><br>

    양쪽에 배치된 센터피스가<br>
    아이를 자연스럽게 가운데로 모아주어<br>
    사진 속 장면이 한층 단정하게 완성됩니다.<br><br>

    아이의 표정과 함께<br>
    공간의 분위기까지 포근하게 남기고 싶은 날,<br><br>
    로얄 테이블이 따뜻한 중심이 되어줍니다.
  </p>

  <div class="detail-section">
    <h4>기본 구성</h4>
    <ul class="detail-list">
      <li>테이블보 및 범보의자 커버</li>
      <li>센터피스 2p</li>
      <li>우드 액자 & 우드 액자용 꽃</li>
      <li>우드 손잡이 촛대 & 우드 초</li>
      <li>꽃모양 떡접시 / 물결 떡접시</li>
      <li>명주실 & 명주실 접시</li>
      <li>우드 2단 모형 케이크 & 토퍼</li>
      <li>케이크 스탠드</li>
      <li>조화</li>
      <li>토끼 오브제</li>
      <li>우드 족자 & 꼭꼬핀</li>
    </ul>
  </div>
`;

const royalYellowDetailHtml = `
  <p class="table-detail-desc">
    균형 잡힌 우드 구성에<br>
    따뜻한 옐로우 플로럴 포인트를 더해<br><br>
    보다 밝고 화사한 분위기를 연출해주는 테이블입니다.<br><br>

    아이를 중심으로 자연스럽게 시선이 모이도록 구성되어<br>
    생동감 있고 사랑스러운 장면을 완성해줍니다.<br><br>

    화사한 분위기로<br>
    특별한 날을 더욱 밝게 남기고 싶을 때,<br><br>
    로얄 테이블 YELLOW가 좋은 선택이 됩니다.
  </p>

  <div class="detail-section">
    <h4>기본 구성</h4>
    <ul class="detail-list">
      <li>테이블보 및 범보의자 커버</li>
      <li>센터피스 2p (옐로우 플로럴)</li>
      <li>우드 액자 & 우드 액자용 꽃</li>
      <li>우드 손잡이 촛대 & 우드 초</li>
      <li>꽃모양 떡접시 / 물결 떡접시</li>
      <li>명주실 & 명주실 접시</li>
      <li>우드 2단 모형 케이크 & 토퍼</li>
      <li>케이크 스탠드</li>
      <li>조화</li>
      <li>토끼 오브제</li>
      <li>우드 족자 & 꼭꼬핀</li>
    </ul>
  </div>
`;

const daonDetailHtml = `
  <p class="table-detail-desc">
    ‘많을 다(多), 따뜻할 온(溫)’<br><br>

    다온상은<br>
    아이의 하루에 좋은 기운과<br>
    따뜻한 마음이<br>
    차곡차곡 쌓이기를 바라는 뜻을 담은 상차림입니다.<br><br>

    전통적인 요소를 바탕으로 하되<br>
    무겁지 않게,<br>
    지금의 공간과 사진에 자연스럽게 어우러지도록<br>
    아모린느의 시선으로 한 번 더 정리했습니다.<br><br>

    달항아리의 둥근 선과<br>
    소반, 명주실, 호롱등의 조화가<br>
    차분하지만 깊이 있는 분위기를 만들어주며<br>
    아이의 첫 기념일을 단정하게 완성해줍니다.
  </p>

  <div class="detail-section">
    <h4>기본 구성</h4>
    <ul class="detail-list">
      <li>테이블보 및 범보의자 커버</li>
      <li>족자 (나뭇가지 + 천 2장 + 꼭꼬핀)</li>
      <li>달항아리 & 조화 부케꽃</li>
      <li>호롱등잔 (호롱불 + 나무등잔+ 모형양초)</li>
      <li>자기그릇 & 엽전</li>
      <li>百日 토퍼</li>
      <li>나무 소반</li>
      <li>전통신</li>
      <li>원형 떡접시 2/ 타원형 긴 떡접시 1</li>
      <li>화병 & 나무 조화</li>
      <li>사방등 + 미니 양초</li>
      <li>개다리소반</li>
      <li>명주실</li>
    </ul>
  </div>

  <div class="detail-section">
    <h4>선택 옵션</h4>
    <ul class="detail-list">
      <li>테이블보 컬러 선택 (화이트 / 네이비)</li>
    </ul>
  </div>

    <div class="detail-section">
    <h4>연출 TIP</h4>
    <p class="table-detail-desc">
      다온상은 아이의 컨디션에 맞춰<br>
      연출방식을 조금씩 바꿔도 분위기가 흐트러지지 않아요.<br><br>
      범보의자 촬영도 좋지만,<br>
      방수요를 추가해서 편하게 눕혀 촬영해 보세요.<br><br>
      한복을 입은 모습도 물론 사랑스럽지만,<br>
      기저귀만 입혀 촬영해도<br>
      아기만의 보송한 분위기가 한껏 살아난답니다.<br><br>
    </p>
  </div>
`;

const hayeonDetailHtml = `
  <p class="table-detail-desc">
    고요한 강처럼,<br>
    천천히 흐르는 분위기를 담은 상차림입니다.<br><br>

    하연상은<br>
    전통의 형식을 바탕으로 하되<br>
    화려한 장식 없이도<br>
    그 자체로 단아한 아름다움이 느껴지도록 정리된 상입니다.<br><br>

    절제된 구성과 차분한 색의 조화가<br>
    공간을 정돈해주고,<br>
    시선이 자연스럽게 아이에게 머물도록 도와줍니다.<br><br>

    조용한 하루를,<br>
    사진 속에서도 오래 바라볼 수 있게 남기고 싶은 날<br>
    하연상이 그 분위기를 정리해 줍니다.
  </p>

  <div class="detail-section">
    <h4>기본 구성</h4>
    <ul class="detail-list">
      <li>테이블보 및 범보의자 커버</li>
      <li>百日 족자 + 꼭꼬핀</li>
      <li>두루마리 보자기</li>
      <li>대형 꽃잎 소반 / 소형 꽃잎 소반</li>
      <li>명주실</li>
      <li>납작 화병 + 초록잎 조화</li>
      <li>원형 떡접시 2 / 나무 떡접시 1</li>
      <li>달항아리 + 호접란</li>
      <li>나무 촛대 + 미니 양초</li>
    </ul>

    <p class="detail-note">
      ※ 돌상 구성 시 족자는 다온상 족자로 대체됩니다.
    </p>
  </div>

  <div class="detail-section">
    <h4>선택 옵션</h4>
    <ul class="detail-list">
      <li>테이블보 컬러 선택 (화이트 / 네이비)</li>
    </ul>
  </div>

  <div class="detail-section">
    <h4>연출 TIP</h4>
    <p class="table-detail-desc">
      하연상은 여백이 예쁘게 살아나는 테이블이라<br>
      소품을 가득 채우기보다 공간감을 살려 촬영하면 더 단정하게 남습니다.<br><br>
      방수요를 추가해서 편하게 눕혀 촬영해 보세요.<br><br>
      한복을 입은 모습도 물론 사랑스럽지만,<br>
      기저귀만 입혀 촬영해도<br>
      아기만의 보송한 분위기가 한껏 살아난답니다.<br><br>
    </p>
  </div>
`;

const safariDetailHtml = `
  <p class="table-detail-desc">
    아기의 첫 기념일을<br>
    조금 더 아이답게,<br><br>

    조금 더 사랑스럽게 남기고 싶은 날을 위한 상차림입니다.<br><br>

    사파리 테이블은<br>
    동물 오브제를 활용해<br>
    아이의 호기심과 시선이 자연스럽게 머물도록 구성된 테이블이에요.<br><br>

    200일~500일 기념 촬영 테이블로도 인기있는 테이블입니다.<br><br>

    과하지 않은 장식 속에서<br>
    아이의 표정과 행동이 살아나<br>
    사진 속 장면이 한층 따뜻하게 완성됩니다.<br><br>

    기념이면서도<br>
    하루의 놀이처럼 즐길 수 있는 순간을 남기고 싶다면,<br>
    사파리 테이블이 그 이야기를 만들어줍니다.
  </p>

  <div class="detail-section">
    <h4>기본 구성</h4>
    <ul class="detail-list">
      <li>테이블보 및 범보의자 커버</li>
      <li>百日 족자 + 꼭꼬핀</li>
      <li>우드 피켓</li>
      <li>원형 떡접시</li>
      <li>우드 초</li>
      <li>아기 수달 2 & 수달 오브제</li>
      <li>올리브 조화</li>
      <li>우드 숫자(기념일에 따라 변경됨)</li>
      <li>다람쥐 오브제</li>
      <li>케이크 스탠드</li>
      <li>화이트 모형 케이크 & 토퍼</li>
      <li>나무 오브제 5종 + 자석 받침</li>
      <li>기린 오브제</li>
    </ul>
  </div>
  
    <p class="detail-note">
      ※ 백일상, 돌상 외 기타 기념일에는 족자가 제공되지 않습니다.
    </p>
  </div>

  <div class="detail-section">
    <h4>연출 TIP</h4>
    <p class="table-detail-desc">
      사파리 테이블은 아이의 시선과 반응이 그대로 장면이 되는 테이블입니다.<br>
      동물 오브제를 바라보는 순간이나 손을 뻗는 모습을 자연스럽게 담아보세요.<br><br>
      억지로 포즈를 잡기보다<br>
      아이가 편하게 놀 수 있는 분위기에서 촬영하면 훨씬 사랑스럽게 남습니다.
    </p>
  </div>
`;

const seorinDetailHtml = `
  <p class="table-detail-desc">
    과하지 않은 장식과<br>
    차분한 색감으로 완성된<br>
    담백하고 정돈된 분위기의 상차림입니다.<br><br>

    서린상은<br>
    공간에 자연스럽게 스며드는 구성을 중심으로<br>
    아이의 표정과 순간이 더욱 또렷하게 남도록 정리된 상입니다.<br><br>

    단정하게 정리된 오브제와<br>
    부드러운 흐름의 배치가 어우러져<br>
    사진 속 장면을 편안하게 완성해줍니다.<br>
  </p>

  <div class="detail-section">
    <h4>기본 구성</h4>
    <ul class="detail-list">
      <li>테이블보</li>
      <li>방수요 및 양단 베개(범보의자로 변경 가능)</li>
      <li>검정 소반</li>
      <li>도토리합</li>
      <li>일자 화병 + 붉은 조화</li>
      <li>명주실 + 검정 자기 그릇</li>
      <li>검정 접시 小 1, 大 1</li>
      <li>흰색 굽접시 2</li>
      <li>달항아리 + 다발 조화</li>
    </ul>
  </div>

  <div class="detail-section">
    <h4>선택 옵션</h4>
    <ul class="detail-list">
      <li>테이블보 컬러 선택 (화이트 / 네이비)</li>
    </ul>
  </div>

  <div class="detail-section">
    <h4>연출 TIP</h4>

    <p class="table-detail-desc">
      서린상은 과하지 않은 구성이 특징이라<br>
      아이의 표정과 움직임을 자연스럽게 담아주는 것이 중요합니다.<br><br>

      소품을 채우기보다는<br>
      여백을 살려 촬영하면 더 단정하고 분위기 있게 남아요.<br><br>

      범보의자 촬영도 좋지만,<br>
      아이를 편하게 눕혀 촬영하면<br>
      더욱 자연스럽고 부드러운 장면이 완성됩니다.
    </p>
  </div>
`;

const bridalDetailHtml = `
  <p class="table-detail-desc">
    🤍 브라이덜 샤워 세팅 🤍<br><br>

    설렘 가득한 순간을<br>
    자연스럽고 아름답게 남기기 위한 브라이덜 샤워 세팅입니다.<br><br>

    부드러운 색감과 플라워 디테일이 어우러져<br>
    과하지 않으면서도 특별한 분위기를 완성합니다.<br><br>

    소중한 사람들과 함께하는 시간 속에서<br>
    편안하게 머무는 순간들이<br>
    사진처럼 자연스럽게 남을 수 있도록 준비했습니다.
  </p>


    <p class="table-detail-desc">
      브라이덜 샤워 베일 3종,<br>
      선글라스, 부케 등 촬영에 필요한 기본 소품이 함께 제공됩니다.
    </p>


  <div class="detail-section">
    <h4>연출 TIP</h4>

    <p class="table-detail-desc">
      화이트, 크림톤의 의상은<br>
      전체 분위기를 부드럽고 깨끗하게 만들어주고,<br><br>

      올블랙으로 맞추시면<br>
      더욱 또렷하고 세련된 무드로 연출하실 수 있어요.<br><br>

      포즈를 잡기보다는<br>
      대화를 나누거나 웃는 순간을 그대로 담아보세요.<br>
      꾸미지 않은 장면이 가장 자연스럽게 남습니다.<br><br>

      베일, 선글라스, 부케 등의 소품을 활용해<br>
      가볍게 포인트를 주면<br>
      브라이덜 샤워 특유의 분위기를 더 잘 살릴 수 있어요.
    </p>
  </div>
`;

const STUDIO_OPTIONS = [
  { name: "캘리그라피 카드", desc: "자체제작 금박 캘리그라피 카드", price: 9900 },
  { name: "카메라 대여", desc: "미러리스 또는 폴라로이드(필름 10장 포함)", price: 20000 },
  { name: "아이폰 스냅", desc: "(1H) 원본일체+20장 내외 색감 보정(업로드 동의시 진행)", price: 50000 },
  { name: "병풍 추가", desc: "전통 병풍 배경 추가", price: 30000 },
  { name: "대형 숫자 풍선", desc: "생일/기념일 숫자 풍선", price: 5000 }
];

const MILESTONE_OPTIONS_DATA = [
  { name: "돌잡이 세트", desc: "전통 돌잡이 소품 세트", price: 10000, img: "images/toy.jpg" },
  { name: "범보의자/양털의자/돌방석", desc: "아기 의자 또는 돌방석", price: 5000 },
  { name: "접이식 테이블", desc: "추가 테이블", price: 10000 },
  { name: "고급 모형 과일", desc: "촬영용 모형 과일 세트", price: 10000 },
  { name: "모형 백설기", desc: "촬영용 모형 백설기", price: 5000 },
  { name: "모형 우드 백설기", desc: "우드 스타일 모형 백설기", price: 10000 },
  { name: "모형 백설기 케이크", desc: "케이크 형태 모형 백설기", price: 10000 },
  { name: "모형 시루떡", desc: "전통 시루떡 모형", price: 5000 },
  { name: "접시형 모형 떡", desc: "시루떡 / 무지개 절", price: 7000 },
  { name: "캘리그라피 카드", desc: "자체제작 금박 캘리그라피 카드", price: 9900 }
];

const HANBOK_ACCESSORY_DATA = [
  { name: "정자관", img: "images/acc1.jpg", price: 5000 },
  { name: "일반갓", img: "images/acc2.jpg", price: 5000 },
  { name: "유건", img: "images/acc3.jpg", price: 5000 },
  { name: "가채", img: "images/acc4.jpg", price: 5000 }
];

const BAEKIL_HANBOK_DATA = [
  { name: "남아한복 베이지", img: "images/b100beige.jpg" },
  { name: "남아한복 하늘", img: "images/b100sky.jpg" },
  { name: "남아한복 노랑", img: "images/b100yellow.jpg" },
  { name: "남아한복 초록", img: "images/b100green.jpg" },
  { name: "여아한복 베이지", img: "images/g100beige.jpg" },
  { name: "여아한복 노랑", img: "images/g100yellow.jpg" },
  { name: "여아한복 민트", img: "images/g100mint.jpg" },
  { name: "여아한복 색동", img: "images/g100colorful.jpg" }
];

const DOL_HANBOK_DATA = [
  { name: "남아한복 노랑", img: "images/b1yellow.jpg" },
  { name: "남아한복 하늘", img: "images/b1sky.jpg" },
  { name: "여아한복 색동", img: "images/g1colorful.jpg" },
  { name: "여아한복 하루", img: "images/g1haru.jpg" }
];

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
}

// ===== MAIN TABS =====
document.querySelectorAll(".tab-btn[data-tab]").forEach(function(btn) {
  btn.addEventListener("click", function() {
    var tab = this.dataset.tab;

    // Update tab buttons
    document.querySelectorAll(".tab-btn[data-tab]").forEach(function(b) { b.classList.remove("active"); });
    this.classList.add("active");

    // Show/hide tab content
    document.querySelectorAll("[id^='tab-']").forEach(function(el) { el.classList.remove("active"); });
    var target = document.getElementById("tab-" + tab);
    if (target) target.classList.add("active");

    // Show/hide service images
    document.querySelectorAll("[id^='service-img-']").forEach(function(el) { el.style.display = "none"; });
    var img = document.getElementById("service-img-" + tab);
    if (img) img.style.display = "block";
  });
});

// ===== SUB TABS =====
document.querySelectorAll(".sub-tab-btn[data-subtab]").forEach(function(btn) {
  btn.addEventListener("click", function() {
    var subtab = this.dataset.subtab;
    var parent = this.dataset.parent;

    // Update sub-tab buttons within same parent
    document.querySelectorAll('.sub-tab-btn[data-parent="' + parent + '"]').forEach(function(b) { b.classList.remove("active"); });
    this.classList.add("active");

    // Show/hide sub-tab content - hide all subtabs for this parent first
    document.querySelectorAll('.sub-tab-btn[data-parent="' + parent + '"]').forEach(function(b) {
      var st = document.getElementById("subtab-" + b.dataset.subtab);
      if (st) st.classList.remove("active");
    });
    var target = document.getElementById("subtab-" + subtab);
    if (target) target.classList.add("active");
  });
});

// ===== RENDER TABLE CARDS =====
function renderTableCards(containerId, tables, priceKey) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var html = "";
  var renderTables = tables.slice();

  // 무인 스튜디오 탭에만 연화상 추가
  if (containerId === "studio-tables-list") {
    renderTables = renderTables.concat(STUDIO_ONLY_TABLES);
  }

  renderTables.forEach(function(t) {
    var clickEvent = "";

    // 백일상·돌상 대여 탭에서만 상세 내용 팝업 적용
    if (containerId === "milestone-tables-list") {

      if (t.id === "pure") {
        clickEvent = "openTableDetailModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "', '"
          + t.desc.replace(/'/g, "\\'")
          + "', pureTableDetailHtml)";
      }

      else if (t.id === "royal-white") {
        clickEvent = "openTableDetailModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "', '"
          + t.desc.replace(/'/g, "\\'")
          + "', royalWhiteDetailHtml)";
      }

      else if (t.id === "royal-yellow") {
        clickEvent = "openTableDetailModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "', '"
          + t.desc.replace(/'/g, "\\'")
          + "', royalYellowDetailHtml)";
      }

      else if (t.id === "seorin") {
        clickEvent = "openTableDetailModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "', '"
          + t.desc.replace(/'/g, "\\'")
          + "', seorinDetailHtml)";
      }

      else if (t.id === "daon") {
        clickEvent = "openTableDetailModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "', '"
          + t.desc.replace(/'/g, "\\'")
          + "', daonDetailHtml)";
      }

      else if (t.id === "hayeon") {
        clickEvent = "openTableDetailModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "', '"
          + t.desc.replace(/'/g, "\\'")
          + "', hayeonDetailHtml)";
      }

      else if (t.id === "safari") {
        clickEvent = "openTableDetailModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "', '"
          + t.desc.replace(/'/g, "\\'")
          + "', safariDetailHtml)";
      }

      else if (t.id === "bridal") {
        clickEvent = "openTableDetailModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "', '"
          + t.desc.replace(/'/g, "\\'")
          + "', bridalDetailHtml)";
      }

      else {
        clickEvent = "openImageModal('"
          + t.name.replace(/'/g, "\\'")
          + "', '"
          + t.img
          + "')";
      }

    } else {
      // 무인 스튜디오 탭은 전부 이미지 팝업
      clickEvent = "openImageModal('"
        + t.name.replace(/'/g, "\\'")
        + "', '"
        + t.img
        + "')";
    }

    html += '<div class="card" onclick="' + clickEvent + '">';
    html += '<div class="card-img-wrapper"><img src="' + t.img + '" alt="' + t.name + '" />';
    html += '<div class="card-img-overlay"><span>클릭하여 확대</span></div></div>';
    html += '<div class="card-header"><div><div class="card-title">' + t.name + '</div>';
    html += '<div class="card-desc">' + t.desc + '</div></div>';
    html += '<div class="card-price">' + t[priceKey].toLocaleString() + '원</div></div>';
    html += '</div>';
  });

  container.innerHTML = html;
}

// ===== RENDER STUDIO OPTIONS =====
function renderStudioOptions() {
  var container = document.getElementById("studio-options-list");
  if (!container) return;
  var html = '<div class="space-y-3">';

  // Hanbok section
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">백일 한복 (15,000원)</h4>';
  html += '<div class="gallery-grid">';
  BAEKIL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  // Dol hanbok section
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">돌 한복/드레스/정장 (35,000원)</h4>';
  html += '<div class="gallery-grid">';
  DOL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  // Other options
  STUDIO_OPTIONS.forEach(function(opt) {
    html += '<div class="card"><div class="card-header"><div><div class="card-title">' + opt.name + '</div>';
    html += '<div class="card-desc">' + opt.desc + '</div></div>';
    html += '<div class="card-price">' + opt.price.toLocaleString() + '원</div></div></div>';
  });

  html += '</div>';
  container.innerHTML = html;
}

// ===== RENDER MILESTONE OPTIONS =====
function renderMilestoneOptions() {
  var container = document.getElementById("milestone-options-list");
  if (!container) return;
  var html = '<div class="space-y-3">';

  // Hanbok section
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">백일 한복 (15,000원)</h4>';
  html += '<div class="gallery-grid">';
  BAEKIL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  // Dol hanbok section
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">돌 한복/드레스/정장 (35,000원)</h4>';
  html += '<div class="gallery-grid">';
  DOL_HANBOK_DATA.forEach(function(h) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + h.name.replace(/'/g, "\\'") + '\', \'' + h.img + '\')">';
    html += '<div class="aspect-square"><img src="' + h.img + '" alt="' + h.name + '" /></div>';
    html += '<p>' + h.name + '</p></div>';
  });
  html += '</div></div>';

  // Hanbok accessories
  html += '<div style="margin-bottom:1rem;"><h4 style="font-weight:600;font-size:0.875rem;margin-bottom:0.5rem;">한복 악세사리 (각 5,000원)</h4>';
  html += '<div class="gallery-grid">';
  HANBOK_ACCESSORY_DATA.forEach(function(a) {
    html += '<div class="gallery-item" onclick="openImageModal(\'' + a.name.replace(/'/g, "\\'") + '\', \'' + a.img + '\')">';
    html += '<div class="aspect-square"><img src="' + a.img + '" alt="' + a.name + '" /></div>';
    html += '<p>' + a.name + '</p></div>';
  });
  html += '</div></div>';

  // Other options
  MILESTONE_OPTIONS_DATA.forEach(function(opt) {
    html += '<div class="card">';
    if (opt.img) {
      html += '<div class="card-img-wrapper" onclick="openImageModal(\'' + opt.name.replace(/'/g, "\\'") + '\', \'' + opt.img + '\')">';
      html += '<img src="' + opt.img + '" alt="' + opt.name + '" style="height:8rem;" />';
      html += '<div class="card-img-overlay"><span>클릭하여 확대</span></div></div>';
    }
    html += '<div class="card-header"><div><div class="card-title">' + opt.name + '</div>';
    html += '<div class="card-desc">' + opt.desc + '</div></div>';
    html += '<div class="card-price">' + opt.price.toLocaleString() + '원</div></div></div>';
  });

  html += '</div>';
  container.innerHTML = html;
}

// ===== IMAGE MODAL =====
function openImageModal(name, img) {
  document.getElementById("imageModalTitle").textContent = name;
  document.getElementById("imageModalImg").src = img;
  document.getElementById("imageModalImg").alt = name;

  const descEl = document.getElementById("imageModalDesc");
  const extraEl = document.getElementById("imageModalExtra");

  if (descEl) descEl.textContent = "";
  if (extraEl) extraEl.innerHTML = "";

  document.getElementById("imageModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const modalBody = document.querySelector("#imageModal .modal-body");
  if (modalBody) modalBody.scrollTop = 0;
}

function closeImageModal() {
  document.getElementById("imageModal").classList.add("hidden");
  document.body.style.overflow = "";
}

function openTableDetailModal(title, image, desc, extraHtml) {
  document.getElementById('imageModalTitle').textContent = title;
  document.getElementById('imageModalImg').src = image;
  document.getElementById('imageModalImg').alt = title;
  document.getElementById('imageModalDesc').textContent = desc || '';
  document.getElementById('imageModalExtra').innerHTML = extraHtml || '';

  document.getElementById('imageModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const modalBody = document.querySelector('#imageModal .modal-body');
  if (modalBody) modalBody.scrollTop = 0;
}
// ===== RESERVATION MODALS =====
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  document.body.style.overflow = "";
}

// ===== PRICE CALCULATION =====
function isWeekend(dateStr) {
  if (!dateStr) return false;
  var d = new Date(dateStr);
  var day = d.getDay();
  return day === 0 || day === 6;
}

function getTablePrice(tableName, type) {
  var table = TABLE_DATA.find(function(t) {
    return t.name === tableName || tableName.includes(t.id);
  });
  if (!table) {
    // Match by select value
    var map = {
      "퓨어테이블": 0,
      "로얄 테이블(WHITE)": 1,
      "로얄 테이블(YELLOW)": 2,
      "서린상": 3,
      "다온상": 4,
      "하연상": 5,
      "사파리테이블": 6,
      "프리미엄 연화상(스튜디오 전용)": -1,
      "브라이덜샤워": 7
    };
    var idx = map[tableName];
    if (idx === -1) return 85000; // Premium
    if (idx !== undefined && TABLE_DATA[idx]) {
      return type === "studio" ? TABLE_DATA[idx].studioPrice : TABLE_DATA[idx].milestonePrice;
    }
  }
  if (table) return type === "studio" ? table.studioPrice : table.milestonePrice;
  return 0;
}

function validateReservationTime(input) {
  if (!input || !input.value) return;

  const parts = input.value.split(':');
  if (parts.length !== 2) return;

  const hour = parts[0];
  const minute = parts[1];

  if (minute !== '00' && minute !== '30') {
    alert('시작 시간은 00분 또는 30분만 선택할 수 있어요.');
    input.value = '';
    const endTimeInput = document.getElementById('endTime');
    if (endTimeInput) endTimeInput.value = '';
  }
}

function updateEndTime() {
  const reservationTimeInput = document.getElementById('reservationTime');
  const rentalHoursSelect = document.querySelector('#studioForm select[name="rentalHours"]');
  const endTimeInput = document.getElementById('endTime');

  if (!reservationTimeInput || !rentalHoursSelect || !endTimeInput) return;

  const startTime = reservationTimeInput.value;
  const rentalHours = rentalHoursSelect.value;

  if (!startTime || !rentalHours) {
    endTimeInput.value = '';
    return;
  }

  const parts = startTime.split(':');
  if (parts.length !== 2) {
    endTimeInput.value = '';
    return;
  }

  const startHour = parseInt(parts[0], 10);
  const startMinute = parseInt(parts[1], 10);
  const hoursToAdd = parseInt(rentalHours, 10);

  if (Number.isNaN(startHour) || Number.isNaN(startMinute) || Number.isNaN(hoursToAdd)) {
    endTimeInput.value = '';
    return;
  }

  const totalMinutes = startHour * 60 + startMinute + hoursToAdd * 60;
  const endHour = Math.floor((totalMinutes % (24 * 60)) / 60);
  const endMinute = totalMinutes % 60;

  const hh = String(endHour).padStart(2, '0');
  const mm = String(endMinute).padStart(2, '0');

  endTimeInput.value = `${hh}:${mm}`;
}


function updateStudioPrice() {
  var form = document.getElementById("studioForm");
  var total = 0;

  // Base price
  var dateStr = form.reservationDate.value;
  var hours = parseInt(form.rentalHours.value) || 0;
  var weekend = isWeekend(dateStr);

  if (hours === 1) total += weekend ? 70000 : 60000;
  else if (hours === 2) total += weekend ? 120000 : 100000;

  // Extra person fee
  var adults = parseInt(form.adultCount.value) || 0;
  var babies = parseInt(form.babyCount.value) || 0;
  var totalPeople = adults + babies;
  if (totalPeople > 5) total += (totalPeople - 5) * 10000;

  // Table setting
  if (form.memoTableSetting.checked && form.memoTableSettingDetails.value) {
    total += getTablePrice(form.memoTableSettingDetails.value, "studio");
  }

  // Options
  if (form.baekilHanbok.checked) total += 15000;
  if (form.dolDressClothing.checked) total += 35000;
  var cameraVal = form.querySelector('input[name="cameraRental"]:checked');
  if (cameraVal && cameraVal.value) total += 20000;
  if (form.iphoneSnap.checked) total += 50000;
  if (form.screenBackground.checked) total += 30000;
  if (form.calligraphyCard.checked) total += 9900;
  if (form.numberBalloon.checked) total += 5000;

  const conceptEls = document.querySelectorAll('input[name="extraConcept"]:checked');
  conceptEls.forEach(el => {
    if (el.value === '봄의 요람') total += 15000;
    if (el.value === '블루밍 데이') total += 10000;
  });
  
  document.getElementById("studioTotalPrice").textContent = total.toLocaleString() + "원";
}

function updateMilestonePrice() {
  var form = document.getElementById("milestoneForm");
  var total = 0;

  // Table price
  if (form.tableSelection.value) {
    total += getTablePrice(form.tableSelection.value, "milestone");
  }

  // Options
if (form.babyClothes && form.babyClothes.checked) total += 10000;
if (form.baekilHanbok && form.baekilHanbok.checked) total += 15000;
if (form.dolDressClothing && form.dolDressClothing.checked) total += 35000;

  // Accessories
  if (form.acc_jeongjagwan.checked) total += 5000;
  if (form.acc_ilbangat.checked) total += 5000;
  if (form.acc_yugeon.checked) total += 5000;
  if (form.acc_gachae.checked) total += 5000;

  if (form.bumboChair.checked) total += 5000;
  if (form.dolCushion.checked) total += 5000;
if (form.waterproofMat.checked) total += 10000;
  if (form.foldingTable.checked) total += 10000;
  if (form.dolGrabbingSet.checked) total += 10000;
  if (form.premiumModelFruit.checked) total += 10000;
  if (form.modelBaekseolgi.checked) total += 5000;
  if (form.modelWoodBaekseolgi.checked) total += 10000;
  if (form.modelBaekseolgiCake.checked) total += 10000;
  if (form.modelSiruTteok.checked) total += 5000;
  if (form.modelPlateTeok.checked) total += 7000;
  if (form.calligraphyCard.checked) total += 9900;

  document.getElementById("milestoneTotalPrice").textContent = total.toLocaleString() + "원";
}

function updateDressPrice() {
  var form = document.getElementById("dressForm");
  var total = 0;

  // Fitting fee
  var fittingDate = form.fittingDate.value;
  if (fittingDate) {
    total += 30000;
  }

  // Options
if (form.niceSocks.checked) total += 4000;
if (form.tightsUse.checked) total += 6000;
  if (form.hwadongBasket.checked) total += 5000;
  if (form.hwadongCar.checked) total += 30000;

  document.getElementById("dressTotalPrice").textContent = total.toLocaleString() + "원";
}

// ===== TOGGLE HELPERS =====
function toggleStudioTableSelect() {
  var wrap = document.getElementById("studioTableSelectWrap");
  var cb = document.getElementById("studioTableSetting");
  wrap.classList.toggle("hidden", !cb.checked);
}

function toggleDressSocksColor() {
  var wrap = document.getElementById("dressSocksColorWrap");
  var cb = document.getElementById("dressNiceSocks");
  wrap.classList.toggle("hidden", !cb.checked);
}

function toggleDressTightsColor() {
  var wrap = document.getElementById("dressTightsColorWrap");
  var cb = document.getElementById("dressTights");
  wrap.classList.toggle("hidden", !cb.checked);
}

// ===== FORM SUBMISSION =====
async function submitStudioForm(e) {
  e.preventDefault();

  try {
    const form = event.target;

    // form 안의 값 수집
    const formData = new FormData(form);
    const postData = Object.fromEntries(formData.entries());

    // 필요하면 여기서 studio 타입 표시
    postData.formType = 'studio';
    postData.submittedAt = new Date().toISOString();

    const conceptEls = form.querySelectorAll('input[name="extraConcept"]:checked');
postData.extraConcept = Array.from(conceptEls).map(el => el.value).join(', ');

    // 체크박스 처리 예시
    const tableTypeEl = form.querySelector('input[name="tableType"]:checked');
    if (tableTypeEl) {
      postData.tableType = tableTypeEl.value;
    }

    // 추가 옵션들 직접 보정이 필요하면 여기서 넣기
    const startTimeEl = document.querySelector('[name="reservationTime"], [name="startTime"]');
    const endTimeEl = document.querySelector('[name="endTime"]');
    const dateEl = document.querySelector('[name="reservationDate"], [name="date"]');
    const nameEl = document.querySelector('[name="name"]');
    const phoneEl = document.querySelector('[name="phone"]');
    const babyNameEl = document.querySelector('[name="babyName"]');
    const babyEnglishNameEl = document.querySelector('[name="babyEnglishName"]');
    const babyGenderEl = document.querySelector('[name="babyGender"]');
    const packageEl = document.querySelector('[name="packageType"]');
    const requestEl = document.querySelector('[name="request"]');
    const balloonNumberEl = document.querySelector('[name="balloonNumber"]');
const balloonColorEl = document.querySelector('[name="balloonColor"]');
    const baekilHanbokDetailEl = form.querySelector('[name="baekilHanbokDetail"]');
    const dolDressClothingDetailEl = form.querySelector('[name="dolDressClothingDetail"]');
    const babyClothesDetailEl = form.querySelector('[name="babyClothesDetail"]');


    if (dateEl && !postData.reservationDate && !postData.date) {
      postData.reservationDate = dateEl.value;
    }

    if (startTimeEl && !postData.reservationTime && !postData.startTime) {
      postData.startTime = startTimeEl.value;
    }

    if (endTimeEl) {
      postData.endTime = endTimeEl.value;
    }

    if (nameEl && !postData.name) postData.name = nameEl.value;
    if (phoneEl && !postData.phone) postData.phone = phoneEl.value;
    if (babyNameEl && !postData.babyName) postData.babyName = babyNameEl.value;
    if (babyEnglishNameEl && !postData.babyEnglishName) postData.babyEnglishName = babyEnglishNameEl.value;
    if (babyGenderEl && !postData.babyGender) postData.babyGender = babyGenderEl.value;
    if (packageEl && !postData.packageType) postData.packageType = packageEl.value;
    if (requestEl && !postData.request) postData.request = requestEl.value;
    if (postData.baekilHanbok === 'on') {
  if (baekilHanbokDetailEl && !postData.baekilHanbokDetail) {
    postData.baekilHanbokDetail = baekilHanbokDetailEl.value;
  }
}
    if (postData.dolDressClothing === 'on') {
  if (dolDressClothingDetailEl && !postData.dolDressClothingDetail) {
    postData.dolDressClothingDetail = dolDressClothingDetailEl.value;
  }
}
  if (postData.babyClothes === 'on') {
  if (babyClothesDetailEl && !postData.babyClothesDetail) {
    postData.babyClothesDetail = babyClothesDetailEl.value;
  }
}
    if (balloonNumberEl && !postData.balloonNumber) {
  postData.balloonNumber = balloonNumberEl.value;
}

if (balloonColorEl && !postData.balloonColor) {
  postData.balloonColor = balloonColorEl.value;
}

    // 가격 표시 요소가 있으면 같이 수집
   const priceEl = document.getElementById('studioTotalPrice');
if (priceEl) {
  postData.totalPrice = priceEl.textContent.trim();
}

    // 콘솔 확인용
    console.log('=== STUDIO SUBMIT DATA ===');
    console.log(postData);
    console.table(postData);

    if (USE_FAKE_SUBMIT) {
      // 임시 제출 모드
      alert('임시 제출 테스트 완료! 콘솔(F12)에서 전송 데이터를 확인하세요.');

      // 초기화
      form.reset();

      const endTimeInput = document.getElementById('endTime');
      if (endTimeInput) endTimeInput.value = '';

      if (typeof updateStudioPrice === 'function') {
        updateStudioPrice();
      }

      if (typeof toggleTableSettingDetails === 'function') {
        toggleTableSettingDetails();
      }

      if (typeof closeModal === 'function') {
        closeModal('studioModal');
      }

      return;
    }

    // ===== 실제 제출 모드 =====
    if (!APPS_SCRIPT_URL) {
      alert('Apps Script URL이 비어 있습니다.');
      return;
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    });

    const result = await response.json();

if (result.result === 'success') {
  const kakaoMsg = buildStudioKakaoMessage(postData);
  const copied = await copyTextSafely(kakaoMsg);

  if (copied) {
    alert('예약 신청이 접수되었습니다.\n\n예약 정보가 복사되었습니다.\n카카오톡 채팅창에 붙여넣어 주세요.');

    setTimeout(() => {
      window.location.href = KAKAO_CHAT_URL;
    }, 200);
  } else {
    showCopyFallback(kakaoMsg);
  }

  form.reset();

  const endTimeInput = document.getElementById('endTime');
  if (endTimeInput) endTimeInput.value = '';

  if (typeof updateStudioPrice === 'function') {
    updateStudioPrice();
  }

  if (typeof toggleTableSettingDetails === 'function') {
    toggleTableSettingDetails();
  }

  if (typeof closeModal === 'function') {
    closeModal('studioModal');
  }
} else {
  alert('제출은 되었지만 응답이 올바르지 않습니다.');
  console.log('submit result:', result);
}

  } catch (error) {
    console.error('submitStudioForm error:', error);
    alert('제출 중 오류가 발생했습니다.');
  }
}

async function submitMilestoneForm(e) {
  e.preventDefault();

  try {
    var form = e.target;
    var data = new FormData(form);
    var postData = Object.fromEntries(data.entries());

    postData.formType = 'milestone';
    postData.submittedAt = new Date().toISOString();

    // 체크된 체크박스들 추가 수집
    var checkedOptions = form.querySelectorAll('input[type="checkbox"]:checked');
    checkedOptions.forEach(function(input) {
      if (!postData[input.name]) {
        postData[input.name] = input.value || 'on';
      }
    });

    // 라디오 선택값 보정
    var checkedRadios = form.querySelectorAll('input[type="radio"]:checked');
    checkedRadios.forEach(function(input) {
      postData[input.name] = input.value;
    });

    // 총 금액
    var priceEl = document.getElementById('milestoneTotalPrice');
    if (priceEl) {
      postData.totalPrice = priceEl.textContent.trim();
    }

    console.log('=== MILESTONE SUBMIT DATA ===');
    console.log(postData);
    console.table(postData);

    if (USE_FAKE_SUBMIT) {
      alert('임시 제출 테스트 완료! 콘솔(F12)에서 전송 데이터를 확인하세요.');

      if (typeof closeModal === 'function') {
        closeModal('milestoneModal');
      }

      form.reset();

      var totalPriceEl = document.getElementById('milestoneTotalPrice');
      if (totalPriceEl) totalPriceEl.textContent = '0원';

      if (typeof updateMilestonePrice === 'function') {
        updateMilestonePrice();
      }

      return;
    }

    if (!APPS_SCRIPT_URL) {
      alert('Apps Script URL이 비어 있습니다.');
      return;
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    });

const result = await response.json();

if (result.result === 'success') {
  const kakaoMsg = buildMilestoneKakaoMessage(postData);
  const copied = await copyTextSafely(kakaoMsg);

  if (copied) {
    alert('예약 신청이 접수되었습니다.\n\n예약 내용이 복사되었어요.\n카카오톡 채팅창에 붙여넣어 보내주세요.');

    setTimeout(() => {
      window.location.href = KAKAO_CHAT_URL;
    }, 200);
  } else {
    showCopyFallback(kakaoMsg);
  }

  form.reset();

  const totalPriceEl = document.getElementById('milestoneTotalPrice');
  if (totalPriceEl) totalPriceEl.textContent = '0원';

  if (typeof updateMilestonePrice === 'function') {
    updateMilestonePrice();
  }

  if (typeof closeModal === 'function') {
    closeModal('milestoneModal');
  }
} else {
  alert('제출은 되었지만 응답이 올바르지 않습니다.');
  console.log('submit result:', result);
}

  } catch (error) {
    console.error('submitMilestoneForm error:', error);
    alert('제출 중 오류가 발생했습니다.');
  }
}

async function submitDressForm(e) {
  e.preventDefault();

  try {
    var form = e.target;
    var data = new FormData(form);
    var postData = Object.fromEntries(data.entries());

// 니삭스
if (postData.niceSocks === 'on') {
  postData.niceSocks = postData.niceSocksColor || '';
} else {
  postData.niceSocks = '';
}
postData.niceSocksColor = '';

// 타이즈
if (postData.tightsUse === 'on') {
  postData.tights = postData.tights || '';
} else {
  postData.tights = '';
}

    postData.formType = 'dress';
    postData.submittedAt = new Date().toISOString();

    // 체크된 체크박스들 추가 수집
    var checkedOptions = form.querySelectorAll('input[type="checkbox"]:checked');
    checkedOptions.forEach(function(input) {
      if (!postData[input.name]) {
        postData[input.name] = input.value || 'on';
      }
    });

    // 라디오 선택값 보정
    var checkedRadios = form.querySelectorAll('input[type="radio"]:checked');
    checkedRadios.forEach(function(input) {
      postData[input.name] = input.value;
    });

    // 총 금액
    var priceEl = document.getElementById('dressTotalPrice');
    if (priceEl) {
      postData.totalPrice = priceEl.textContent.trim();
    }

    console.log('=== DRESS SUBMIT DATA ===');
    console.log(postData);
    console.table(postData);

    if (USE_FAKE_SUBMIT) {
      alert('임시 제출 테스트 완료! 콘솔(F12)에서 전송 데이터를 확인하세요.');

      if (typeof closeModal === 'function') {
        closeModal('dressModal');
      }

      form.reset();

      var totalPriceEl = document.getElementById('dressTotalPrice');
      if (totalPriceEl) totalPriceEl.textContent = '0원';

      if (typeof updateDressPrice === 'function') {
        updateDressPrice();
      }

      return;
    }

    if (!APPS_SCRIPT_URL) {
      alert('Apps Script URL이 비어 있습니다.');
      return;
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    });

    const result = await response.json();

if (result.result === 'success') {
  const kakaoMsg = buildDressKakaoMessage(postData);
  const copied = await copyTextSafely(kakaoMsg);

  if (copied) {
    alert('예약 신청이 접수되었습니다.\n\n예약 내용이 복사되었어요.\n카카오톡 채팅창에 붙여넣어 보내주세요.');

    setTimeout(() => {
      window.location.href = KAKAO_CHAT_URL;
    }, 200);
  } else {
    showCopyFallback(kakaoMsg);
  }

  form.reset();

  var totalPriceEl = document.getElementById('dressTotalPrice');
  if (totalPriceEl) totalPriceEl.textContent = '0원';

  if (typeof updateDressPrice === 'function') {
    updateDressPrice();
  }
} else {
  alert('제출은 되었지만 응답이 올바르지 않습니다.');
  console.log('submit result:', result);
}

  } catch (error) {
    console.error('submitDressForm error:', error);
    alert('제출 중 오류가 발생했습니다.');
  }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener("click", function(e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== ESC KEY CLOSE =====
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeImageModal();
    closeModal("studioModal");
    closeModal("milestoneModal");
    closeModal("dressModal");
  }
});

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function() {
  renderTableCards("studio-tables-list", TABLE_DATA, "studioPrice");
  renderTableCards("milestone-tables-list", TABLE_DATA, "milestonePrice");
  renderStudioOptions();
  renderMilestoneOptions();
});


function openConceptModal(imageSrc, title, price) {
  document.getElementById('conceptModalImg').src = imageSrc;
  document.getElementById('conceptModalImg').alt = title;
  document.getElementById('conceptModalTitle').textContent = title + ' (' + price + ')';
  document.getElementById('conceptImageModal').classList.add('show');
}

function closeConceptModal() {
  document.getElementById('conceptImageModal').classList.remove('show');
}

function buildStudioKakaoMessage(postData) {
const basicLines = [
  '👶 기본 정보',
  '예약자: ' + (postData.customerName || postData.name || '') +
    ((postData.phone) ? ' (' + postData.phone + ')' : ''),
  '아기 정보: ' + (postData.babyName || '') +
    ((postData.babyEnglishName) ? ' (' + postData.babyEnglishName + ')' : '') +
    ((postData.babyGender) ? ' (' + postData.babyGender + ')' : '')
];

const reservationLines = [
  '📌 예약 내용',
  '예약일: ' + (postData.reservationDate || ''),
  '이용 시간: ' +
    ((postData.rentalHours || '') ? postData.rentalHours + '시간' : '') +
    ((postData.reservationTime || postData.startTime || postData.endTime)
      ? ' (' + (postData.reservationTime || postData.startTime || '') + '-' + (postData.endTime || '') + ')'
      : ''
    ),
  '기념일 종류: ' + (postData.eventType === '기타'
    ? (postData.eventTypeEtc || '기타')
    : (postData.eventType || '')
  ),
  '총 인원: ' +
    ((Number(postData.adultCount || 0) + Number(postData.babyCount || 0))) +
    '인 (성인 ' + (postData.adultCount || 0) + ', 아기 ' + (postData.babyCount || 0) + ')'
];

  const optionLines = [];

const tableLines = [];
const conceptLines = [];
const outfitLines = [];
const extraLines = [];

// 테이블 세팅
if (postData.memoTableSetting === 'on') {
  if (postData.memoTableSettingDetails && postData.memoTableSettingDetails.trim() !== '') {
    tableLines.push('- ' + postData.memoTableSettingDetails);
  } else {
    tableLines.push('- 선택안함');
  }
}

// 추가 컨셉
if (postData.extraConcept) {
  const concepts = postData.extraConcept.split(',').map(v => v.trim()).filter(Boolean);
  concepts.forEach(c => conceptLines.push('- ' + c));
}

// 의상 (여기만 의상!)
if (postData.baekilHanbok === 'on') {
  outfitLines.push('- 백일 한복: ' + (postData.baekilHanbokDetail || '선택'));
}

if (postData.dolDressClothing === 'on') {
  outfitLines.push('- 돌 한복/드레스/정장: ' + (postData.dolDressClothingDetail || '선택'));
}

// 기타 (카메라 / 스냅 포함)
if (postData.cameraRental && postData.cameraRental !== 'none') {
  extraLines.push('- 카메라 대여: ' + postData.cameraRental);
}

if (postData.iphoneSnap === 'on') {
  extraLines.push('- 아이폰 스냅');
}

if (postData.screenBackground === 'on') {
  extraLines.push('- 병풍');
}

if (postData.calligraphyCard === 'on') {
  extraLines.push('- 금박 캘리그라피 카드');
}

if (postData.numberBalloon === 'on') {
  const balloonText = [
    postData.balloonNumber ? '숫자 ' + postData.balloonNumber : '',
    postData.balloonColor ? '색상 ' + postData.balloonColor : ''
  ].filter(Boolean).join(', ');
  extraLines.push('- 대형 숫자 풍선' + (balloonText ? ' (' + balloonText + ')' : ''));
}

// 카테고리 정리
if (tableLines.length) optionLines.push('[테이블 세팅]', ...tableLines);
if (conceptLines.length) optionLines.push('[추가 컨셉]', ...conceptLines);
if (outfitLines.length) optionLines.push('[의상]', ...outfitLines);
if (extraLines.length) optionLines.push('[기타]', ...extraLines);

  const lines = [
    '[아모린느 스튜디오 예약 🤍]',
    '',
    ...basicLines,
    '',
    '━━━━━━━━━━━━━━━',
    '',
    ...reservationLines
  ];

  if (optionLines.length) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━');
    lines.push('');
    lines.push('📦 선택 옵션');
    lines.push(...optionLines);
  }

  if (postData.notes) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━');
    lines.push('');
    lines.push('📝 요청사항');
    lines.push(postData.notes);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('💰 최종 금액');
  lines.push(postData.totalPrice || '');
  lines.push('');
  lines.push('예약 가능 여부 확인 후 안내 부탁드립니다 🤍');

  return lines.filter(Boolean).join('\n');
}

function buildMilestoneKakaoMessage(postData) {
const basicLines = [
  '👶 기본 정보',
  '예약자: ' + (postData.customerName || postData.name || '') +
    ((postData.phone) ? ' (' + postData.phone + ')' : ''),
  '아기 정보: ' + (postData.babyName || '') +
    ((postData.babyGender) ? ' (' + postData.babyGender + ')' : '')
];

const reservationLines = [
  '📌 예약 내용',
  '행사 날짜: ' + (postData.eventDate || ''),
  '기념일 종류: ' + (postData.eventType === '기타'
    ? (postData.eventTypeEtc || '기타')
    : (postData.eventType || '')
  )
];
  
  if (postData.tableSelection) {
    reservationLines.push('테이블: ' + postData.tableSelection);
  }

const optionLines = [];

const outfitLines = [];
const accessoryLines = [];
const furnitureLines = [];
const propLines = [];
const extraLines = [];

// 의상
if (postData.babyClothes === 'on') {
  outfitLines.push('- 백일 의상: ' + (postData.babyClothesDetail || '선택'));
}

if (postData.baekilHanbok === 'on') {
  outfitLines.push('- 백일 한복: ' + (postData.baekilHanbokDetail || '선택'));
}

if (postData.dolDressClothing === 'on') {
  outfitLines.push('- 돌 한복/드레스/정장: ' + (postData.dolDressClothingDetail || '선택'));
}

// 한복 악세사리
if (postData.acc_jeongjagwan === 'on') accessoryLines.push('- 정자관');
if (postData.acc_ilbangat === 'on') accessoryLines.push('- 일반갓');
if (postData.acc_yugeon === 'on') accessoryLines.push('- 유건');
if (postData.acc_gachae === 'on') accessoryLines.push('- 가채');

// 의자 / 테이블
if (postData.bumboChair === 'on') furnitureLines.push('- 범보의자');
if (postData.dolCushion === 'on') furnitureLines.push('- 돌방석');
if (postData.waterproofMat === 'on') furnitureLines.push('- 방수요 및 양단 베개');
if (postData.foldingTable === 'on') furnitureLines.push('- 접이식 테이블');

// 모형 소품
if (postData.premiumModelFruit === 'on') propLines.push('- 고급 모형 과일');
if (postData.modelBaekseolgi === 'on') propLines.push('- 모형 백설기');
if (postData.modelWoodBaekseolgi === 'on') propLines.push('- 모형 우드 백설기');
if (postData.modelBaekseolgiCake === 'on') propLines.push('- 모형 백설기 케이크');
if (postData.modelSiruTteok === 'on') propLines.push('- 모형 시루떡');
if (postData.modelPlateTeok === 'on') propLines.push('- 접시형 모형 떡');

// 기타
if (postData.dolGrabbingSet === 'on') extraLines.push('- 돌잡이 세트');
if (postData.calligraphyCard === 'on') extraLines.push('- 금박 캘리그라피 카드');

// 카테고리 정리
if (outfitLines.length) optionLines.push('[의상]', ...outfitLines);
if (accessoryLines.length) optionLines.push('[한복 악세사리]', ...accessoryLines);
if (furnitureLines.length) optionLines.push('[의자/테이블]', ...furnitureLines);
if (propLines.length) optionLines.push('[모형 소품]', ...propLines);
if (extraLines.length) optionLines.push('[기타]', ...extraLines);


  const lines = [
    '[아모린느 백일상·돌상 예약 🤍]',
    '',
    ...basicLines,
    '',
    '━━━━━━━━━━━━━━━',
    '',
    ...reservationLines
  ];

  if (optionLines.length) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━');
    lines.push('');
    lines.push('📦 선택 옵션');
    lines.push(...optionLines);
  }

  if (postData.notes) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━');
    lines.push('');
    lines.push('📝 요청사항');
    lines.push(postData.notes);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('💰 최종 금액');
  lines.push(postData.totalPrice || '');
  lines.push('');
  lines.push('예약 가능 여부 확인 후 안내 부탁드립니다 🤍');

  return lines.filter(Boolean).join('\n');
}

function buildDressKakaoMessage(postData) {
const basicLines = [
  '👶 기본 정보',
  '예약자: ' + (postData.customerName || postData.name || '') +
    ((postData.phone) ? ' (' + postData.phone + ')' : ''),
  '아기 정보: ' + (postData.babyName || '') +
    ((postData.babyGender) ? ' (' + postData.babyGender + ')' : '')
];

 const reservationLines = [
  '📌 예약 내용',
  '피팅 희망 일시: ' +
    (postData.fittingDate || '') +
    ((postData.fittingTime) ? ' (' + postData.fittingTime + ')' : ''),
  '행사종류: ' + (postData.eventType === '기타'
    ? (postData.eventTypeEtc || '기타')
    : (postData.eventType || '')
  ),
  '행사 날짜: ' + (postData.eventDate || ''),
  '대여 상품: ' + (postData.rentalProduct || '')
];

const optionLines = [];

if (postData.niceSocks) {
  optionLines.push('- 니삭스: ' + postData.niceSocks);
}

if (postData.tights) {
  optionLines.push('- 타이즈 색상: ' + postData.tights);
}

if (postData.hwadongBasket === 'on') {
  optionLines.push('- 화동 바구니 추가');
}

if (postData.hwadongCar === 'on') {
  optionLines.push('- 화동카 추가');
}
  
  const lines = [
    '[아모린느 정장·드레스 예약 🤍]',
    '',
    ...basicLines,
    '',
    '━━━━━━━━━━━━━━━',
    '',
    ...reservationLines
  ];

  if (optionLines.length) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━');
    lines.push('');
    lines.push('📦 선택 옵션');
    lines.push(...optionLines);
  }

  if (postData.notes) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━');
    lines.push('');
    lines.push('📝 요청사항');
    lines.push(postData.notes);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('💰 최종 금액');
  lines.push(postData.totalPrice || '');
  lines.push('');
  lines.push('예약 가능 여부 확인 후 안내 부탁드립니다 🤍');

  return lines.filter(Boolean).join('\n');
}

async function copyTextSafely(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.error('clipboard copy failed:', error);
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, 99999);

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (error) {
    console.error('fallback copy failed:', error);
    return false;
  }
}

function showCopyFallback(message) {
  const oldModal = document.getElementById('copyFallbackModal');
  if (oldModal) oldModal.remove();

  const modal = document.createElement('div');
  modal.id = 'copyFallbackModal';

  modal.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.6);
      display:flex;
      justify-content:center;
      align-items:center;
      z-index:99999;
      padding:20px;
      box-sizing:border-box;
    ">
      <div style="
        background:#fff;
        width:100%;
        max-width:520px;
        border-radius:14px;
        padding:20px;
        box-sizing:border-box;
      ">
        <h3 style="margin:0 0 12px; font-size:20px;">예약 내용을 카카오톡으로 보내주세요 🤍</h3>

        <p style="font-size:14px; line-height:1.6; margin:0 0 12px;">
          아래 내용을 길게 눌러 전체 복사하신 후<br>
          카카오톡 채팅창에 붙여넣어 보내주시면 됩니다 :)
        </p>

        <textarea readonly id="fallbackCopyText" style="
          width:100%;
          height:220px;
          padding:12px;
          border:1px solid #ddd;
          border-radius:10px;
          box-sizing:border-box;
          resize:none;
          font-size:14px;
          line-height:1.5;
        ">${message}</textarea>

        <p style="font-size:12px; color:#777; margin:10px 0 0; line-height:1.5;">
          ※ 카카오톡/인스타 앱 안에서는 자동 복사가 제한될 수 있어요.
        </p>

        <div style="display:flex; gap:10px; margin-top:14px;">
          <button type="button" id="copyBtn" style="
            flex:1;
            height:46px;
            border:none;
            border-radius:10px;
            background:#f1f1f1;
            cursor:pointer;
            font-size:14px;
          ">문구 복사하기</button>

          <button type="button" id="openKakaoBtn" style="
            flex:1;
            height:46px;
            border:none;
            border-radius:10px;
            background:#fee500;
            cursor:pointer;
            font-size:14px;
            font-weight:600;
          ">카카오톡 열기</button>
        </div>

        <button type="button" id="closeCopyModalBtn" style="
          width:100%;
          margin-top:10px;
          height:40px;
          border:none;
          background:transparent;
          color:#666;
          cursor:pointer;
        ">닫기</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const textArea = document.getElementById('fallbackCopyText');

  document.getElementById('copyBtn').onclick = async function () {
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    const copied = await copyTextSafely(message);
    if (copied) {
      alert('문구가 복사되었습니다!');
    } else {
      alert('자동 복사가 제한됩니다. 위 내용을 길게 눌러 복사해주세요.');
    }
  };

  document.getElementById('openKakaoBtn').onclick = function () {
    window.location.href = KAKAO_CHAT_URL;
  };

  document.getElementById('closeCopyModalBtn').onclick = function () {
    modal.remove();
  };

  setTimeout(() => {
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);
  }, 100);
}


function toggleBalloonFields() {
  const checkbox = document.getElementById('studioBalloon');
  const fields = document.getElementById('balloonDetailFields');

  if (!checkbox || !fields) return;

  fields.style.display = checkbox.checked ? 'block' : 'none';

  if (!checkbox.checked) {
    const balloonNumberEl = document.querySelector('[name="balloonNumber"]');
    const balloonColorEl = document.querySelector('[name="balloonColor"]');

    if (balloonNumberEl) balloonNumberEl.value = '';
    if (balloonColorEl) balloonColorEl.value = '';
  }
}


function toggleStudioHanbokField() {
  const checkbox = document.getElementById('studioHanbok');
  const field = document.getElementById('studioHanbokField');

  if (!checkbox || !field) return;

  field.style.display = checkbox.checked ? 'block' : 'none';

  if (!checkbox.checked) {
    const input = document.querySelector('[name="baekilHanbokDetail"]');
    if (input) input.value = '';
  }
}


function toggleStudioDolDressField() {
  const checkbox = document.getElementById('studioDolDress');
  const field = document.getElementById('studioDolDressField');

  if (!checkbox || !field) return;

  field.style.display = checkbox.checked ? 'block' : 'none';

  if (!checkbox.checked) {
    const input = document.querySelector('[name="dolDressClothingDetail"]');
    if (input) input.value = '';
  }
}

function toggleTableBabyClothesField() {
  const checkbox = document.getElementById('tableBabyClothes');
  const field = document.getElementById('tableBabyClothesField');

  if (!checkbox || !field) return;

  field.style.display = checkbox.checked ? 'block' : 'none';

  if (!checkbox.checked) {
    const input = document.querySelector('[name="babyClothesDetail"]');
    if (input) input.value = '';
  }
}

function toggleTableBaekilHanbokField() {
  const checkbox = document.getElementById('tableBaekilHanbok');
  const field = document.getElementById('tableBaekilHanbokField');

  if (!checkbox || !field) return;

  field.style.display = checkbox.checked ? 'block' : 'none';

  if (!checkbox.checked) {
    const input = document.querySelector('[name="baekilHanbokDetail"]');
    if (input) input.value = '';
  }
}

function toggleTableDolDressField() {
  const checkbox = document.getElementById('tableDolDress');
  const field = document.getElementById('tableDolDressField');

  if (!checkbox || !field) return;

  field.style.display = checkbox.checked ? 'block' : 'none';

  if (!checkbox.checked) {
    const input = document.querySelector('[name="dolDressClothingDetail"]');
    if (input) input.value = '';
  }
}


function toggleNotice(element) {
  const allContents = document.querySelectorAll('.notice-content');
  const allTitles = document.querySelectorAll('.notice-title');

  const content = element.nextElementSibling;
  const isOpen = content.style.display === "block";

  // 전부 닫기 + 강조 제거
  allContents.forEach(c => c.style.display = "none");
  allTitles.forEach(t => t.classList.remove('active'));

  // 클릭한거만 열기
  if (!isOpen) {
    content.style.display = "block";
    element.classList.add('active');
  }
}


function openNoticeImage(src) {
  const modal = document.getElementById('noticeImageModal');
  const modalImg = document.getElementById('noticeModalImg');

  modalImg.src = src;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeNoticeImage() {
  const modal = document.getElementById('noticeImageModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}


function toggleStudioEventTypeEtc() {
  const select = document.querySelector('#studioModal [name="eventType"]');
  const wrap = document.getElementById('studioEventTypeEtcWrap');
  const input = wrap ? wrap.querySelector('[name="eventTypeEtc"]') : null;

  if (!select || !wrap || !input) return;

  if (select.value === '기타') {
    wrap.style.display = 'block';
    input.required = true;
  } else {
    wrap.style.display = 'none';
    input.required = false;
    input.value = '';
  }
}

function toggleMilestoneEventTypeEtc() {
  const select = document.querySelector('#milestoneModal [name="eventType"]');
  const wrap = document.getElementById('milestoneEventTypeEtcWrap');
  const input = wrap ? wrap.querySelector('[name="eventTypeEtc"]') : null;

  if (!select || !wrap || !input) return;

  if (select.value === '기타') {
    wrap.style.display = 'block';
    input.required = true;
  } else {
    wrap.style.display = 'none';
    input.required = false;
    input.value = '';
  }
}

function toggleDressEventTypeEtc() {
  const select = document.querySelector('#dressModal [name="eventType"]');
  const wrap = document.getElementById('dressEventTypeEtcWrap');
  const input = wrap ? wrap.querySelector('[name="eventTypeEtc"]') : null;

  if (!select || !wrap || !input) return;

  if (select.value === '기타') {
    wrap.style.display = 'block';
    input.required = true;
  } else {
    wrap.style.display = 'none';
    input.required = false;
    input.value = '';
  }
}
