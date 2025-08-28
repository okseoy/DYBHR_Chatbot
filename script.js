// HTML 요소들을 가져옵니다.
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const inputContainer = document.getElementById('input-container');

// 챗봇의 전체 대화 시나리오 트리
const chatTree = {
  'start': {
    message: "안녕하세요! HR·노무 전문가 챗봇입니다.\n아래에서 궁금하신 항목을 선택해주세요.",
    options: {
      "severance_pay": { text: "퇴직금 안내" },
      "maternity_protection": { text: "모성보호 제도" },
      "joint_marketing_main": { text: "공동마케팅 안내" },
      "promotion_criteria": { text: "승진 기준 안내" } // 새로 추가된 메뉴
    }
  },
  'severance_pay': {
    message: "✅ 퇴직금 지급 기준 안내\n계속 근로기간이 1년 이상이고, 4주를 평균하여 1주 소정근로시간이 15시간 이상인 경우 지급 대상입니다.\n\n어디에 해당되시나요?",
    options: {
        "severance_staff": { text: "직원" },
        "severance_teacher": { text: "선생님" }
    }
  },
  'severance_staff': {
    message: "✅ 직원 퇴직금 안내\n저희는 퇴직연금제도를 운영 중이며, 신한은행 SOL 어플을 통해 직접 현재 적립된 금액을 확인하실 수 있습니다."
  },
  'severance_teacher': {
    message: "✅ 선생님 퇴직금 안내\n퇴직금은 '평균임금'을 기준으로 산정하여 지급됩니다.\n\n- 평균임금이란? 산정 사유가 발생한 날 이전 3개월 동안 선생님에게 지급된 임금 총액을 그 기간의 총 일수로 나눈 금액입니다. (수당은 성질에 따라 산입여부가 달라짐)"
  },
  'maternity_protection': {
    message: "✅ 모성보호 제도 공통 안내\n신청을 위한 서류는 기획·법무팀에 요청해주시고, 제도 사용 전 반드시 기획·법무팀과 사전 협의가 필요합니다.\n\n아래에서 궁금하신 제도를 선택해주세요.",
    options: {
        "maternity_imshin_danchuk": { text: "임신기 근로시간 단축" },
        "maternity_yuga_danchuk": { text: "육아기 근로시간 단축" },
        "maternity_chulsan_huga": { text: "출산전후휴가" },
        "maternity_baeooja_huga": { text: "배우자 출산휴가" },
        "maternity_yukgahujik": { text: "육아휴직" }
    }
  },
  'maternity_imshin_danchuk': {
    message: "✅ 임신기 근로시간 단축\n임신 12주 이내 또는 32주 이후의 근로자(유산, 조산 등 위험이 있는 경우 임신 전 기간)가 1일 2시간의 근로시간을 단축할 수 있는 제도입니다.\n\n- 신청방법: 단축 개시 예정일의 3일 전까지 단축근무신청서 및 의사의 진단서를 기획·법무팀에 제출하여 신청"
  },
  'maternity_yuga_danchuk': {
    message: "✅ 육아기 근로시간 단축\n만 12세 이하 또는 초등학교 6학년 이하의 자녀를 양육하기 위하여 근로시간을 주당 5~25시간을 단축할 수 있는 제도(단축 후 근로시간 15시간~35시간)입니다.\n\n- 신청방법: 단축을 시작하려는 날의 30일 전까지 단축근무신청서와 아이를 확인할 수 있는 서류(가족관계증명서, 주민등록등본 등)를 기획·법무팀에 제출하여 신청"
  },
  'maternity_chulsan_huga': {
    message: "✅ 출산전후휴가\n임신한 여성 근로자에게 90일의 출산전후휴가를 부여하는 제도이며, 90일 중 45일 이상은 출산 이후 부여되어야 합니다.\n\n- 신청방법: 그룹웨어-휴가신청-항목 '출산휴가'으로 휴가 신청"
  },
  'maternity_baeooja_huga': {
    message: "✅ 배우자 출산휴가\n배우자의 출산을 이유로 휴가를 고지하는 근로자에게 20일(근로제공의 의무가 있는 날, 휴일제외)의 휴가를 지급하는 제도입니다.\n\n- 신청방법: 그룹웨어-휴가신청-항목 '배우자 출산휴가'으로 휴가 신청"
  },
  'maternity_yukgahujik': {
    message: "✅ 육아휴직\n임신 중인 여성 근로자이거나, 만 8세 이하 또는 초등학교 2학년 이하의 자녀가 있는 근로자가 1년의 육아휴직을 사용하고, 정부가 급여를 지원하는 제도입니다.\n\n- 신청방법: 그룹웨어-휴가신청-항목 '육아휴직'으로 휴직 신청"
  },
  'joint_marketing_main': {
    message: "공동마케팅에 대해 무엇이 궁금하신가요?",
    options: {
      "joint_marketing_def": { text: "정의" },
      "joint_marketing_criteria": { text: "기간 기준" },
      "joint_marketing_mid_hire": { text: "중도입사자 기준" }
    }
  },
  'joint_marketing_def': {
    message: "✅ 정의\n연 4회, 정해진 학사 일정에 따라 모든 캠퍼스가 함께 진행하는 마케팅 활동입니다."
  },
  'joint_marketing_criteria': {
    message: "✅ 기간 기준\n1년은 총 4개의 시즌으로 나뉩니다.\n- 1분기: 1월~3월\n- 2분기: 4월~7월\n- 3분기: 8월~10월\n- 4분기: 11월~12월"
  },
  'joint_marketing_mid_hire': {
    message: "✅ 중도입사자 기준\n캠퍼스 발령 월을 기준으로 참여 횟수를 산정합니다.\n\n예시: 3월 입사자는 1분기부터 참여하므로 총 4회, 4월 입사자는 2분기부터 참여하므로 총 3회입니다."
  },

  // ▼ 승진 기준 (새로운 시나리오 적용) ▼
  'promotion_criteria': {
    message: "✅ 승진 기준 안내\n궁금하신 직급을 선택해주세요.",
    options: {
        "promotion_c2": { text: "C2" },
        "promotion_m1": { text: "M1" },
        "promotion_m2": { text: "M2" },
        "promotion_m3": { text: "M3" },
        "promotion_m4": { text: "M4" }
    }
  },
  'promotion_c2': {
    message: "✅ C2 승진 기준\nC1으로 입사 후 1년을 초과하여 근무한 경우 자동승진 처리됩니다."
  },
  'promotion_m1': {
    message: "✅ M1 승진 기준\n입사 후 30개월이 경과하면 M1 정규승진 후보가 됩니다."
  },
  'promotion_m2': {
    message: "✅ M2 승진 기준\nM1 직급에서 만 4년을 초과하여 근무한 경우, M2 정규승진 후보가 됩니다."
  },
  'promotion_m3': {
    message: "✅ M3 승진 기준\nM2 직급에서 만 5년을 초과하여 근무한 경우, M3 정규승진 후보가 됩니다."
  },
  'promotion_m4': {
    message: "✅ M4 승진 기준\nM3 직급에서 만 5년을 초과하여 근무한 경우, M4 정규승진 후보가 됩니다."
  }
};

// =================== 핵심 로직 (수정할 필요 없음) ===================

let stateHistory = ['start'];

function displayCurrentState() {
  const currentState = stateHistory[stateHistory.length - 1];
  const node = chatTree[currentState];
  
  if (!node) return;
  
  const messageElement = addMessage(node.message, 'bot');
  const allButtonsContainer = document.createElement('div');
  
  if (node.options) {
    inputContainer.style.display = 'none';
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'message-options';

    for (const nextState in node.options) {
      const button = document.createElement('button');
      button.className = 'chat-option-button';
      button.innerText = node.options[nextState].text;
      
      button.addEventListener('click', () => {
        allButtonsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
        stateHistory.push(nextState);
        setTimeout(displayCurrentState, 300);
      });
      optionsContainer.appendChild(button);
    }
    allButtonsContainer.appendChild(optionsContainer);
  } else {
    inputContainer.style.display = 'flex';
  }

  if (currentState !== 'start') {
      const navContainer = document.createElement('div');
      navContainer.className = 'navigation-options';

      const backButton = document.createElement('button');
      backButton.className = 'chat-nav-button';
      backButton.innerText = '« 뒤로 가기';
      backButton.addEventListener('click', () => {
          allButtonsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
          stateHistory.pop();
          setTimeout(displayCurrentState, 300);
      });
      navContainer.appendChild(backButton);

      const startButton = document.createElement('button');
      startButton.className = 'chat-nav-button';
      startButton.innerText = '처음으로';
      startButton.addEventListener('click', () => {
          allButtonsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
          stateHistory = ['start'];
          setTimeout(displayCurrentState, 300);
      });
      navContainer.appendChild(startButton);
      allButtonsContainer.appendChild(navContainer);
  }
  
  messageElement.appendChild(allButtonsContainer);
}

function handleTextInput() {
  const userInputText = userInput.value.trim();
  if (userInputText === "") return;
  addMessage(userInputText, 'user');
  userInput.value = "";
}

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = text.replace(/\n/g, '<br>');
    messageElement.className = `message ${sender}-message`;
    chatMessages.appendChild(messageElement);
    setTimeout(() => {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 0);
    return messageElement;
}

sendButton.addEventListener('click', handleTextInput);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleTextInput();
    }
});

displayCurrentState();