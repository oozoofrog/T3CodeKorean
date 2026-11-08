export const koMessages = {
  "voice.speech.transcriptionFailed":
    "음성 인식에 실패했습니다. 설정 → 음성에서 대상을 확인하세요.",
  "voice.speech.microphoneFallback": "마이크 {index}",
  "voice.speech.cleanupFailedTitle": "인식한 텍스트 정리 실패",
  "voice.speech.cleanupFailedDescription": "원래 인식 결과를 추가했습니다.",
  "voice.speech.cleanupUnavailable":
    "초안의 환경을 사용할 수 없어 인식한 텍스트를 정리할 수 없습니다.",
  "voice.speech.startFailed": "음성 입력을 시작하지 못했습니다",
  "voice.speech.unavailable": "음성 입력을 사용할 수 없습니다",
  "voice.speech.modelNotReady": "모델이 준비되지 않았습니다. 다시 다운로드해 보세요.",
  "voice.speech.modelDownloadFailed":
    "모델을 다운로드하지 못했습니다. 이 환경의 연결을 확인하고 다시 시도하세요.",
  "app.voiceExtra.mcp.requestFailed": "요청에 실패했습니다.",
  "app.voiceExtra.mcp.approvalUnavailable": "T3가 여기서는 승인을 요청하지 못했습니다.",
  "app.voiceExtra.mcp.toolNotCallable": "이 앱에서는 해당 도구를 호출할 수 없습니다.",
  "app.voiceExtra.mcp.declined": "사용자가 거절했습니다.",
  "app.voiceExtra.mcp.linkNeedsClick": "링크는 앱 안에서 클릭해야만 열립니다.",
  "app.voiceExtra.mcp.messagesUnavailable": "여기서는 메시지를 사용할 수 없습니다.",
  "app.voiceExtra.mcp.allowTool": "{server}의 {tool} 실행을 허용할까요?\n{arguments}",
  "app.voiceExtra.mcp.sendMessage": "{server}에서 이 메시지를 보낼까요?\n{text}",
  "app.voiceExtra.mcp.saveFiles": "{server}의 {files}을(를) 저장할까요?",
  "app.voiceExtra.mcp.fileEmpty": "{file}에 내용이 없습니다.",
  "app.voiceExtra.mcp.fileTooLarge": "{file}이(가) 너무 커서 저장할 수 없습니다.",
  "app.voiceExtra.mcp.loadFailed": "{server} 앱을 불러올 수 없음",
  "app.voiceExtra.markdown.previewUnavailable": "이 클라이언트에는 미리보기 접근 권한이 없습니다.",
  "app.voiceExtra.markdown.environmentDisconnected": "환경이 연결되어 있지 않습니다.",
  "app.voiceExtra.link.installCancelled": "릴레이 클라이언트 설치가 취소되었습니다.",
  "app.voiceExtra.link.installIncomplete":
    "릴레이 클라이언트 설치가 최종 상태 없이 완료되었습니다.",
  "app.voiceExtra.link.wrongEnvironment": "릴레이가 다른 환경의 자격 증명을 반환했습니다.",
  "app.voiceExtra.link.wrongProvider":
    "릴레이가 다른 엔드포인트 제공업체의 자격 증명을 반환했습니다.",
  "app.voiceExtra.link.notConnected": "환경이 연결되어 있지 않습니다.",
  "app.voiceExtra.link.relayUrlMissing": "T3CODE_RELAY_URL이 구성되지 않았습니다.",
  "app.voiceExtra.worker.unreadableReply": "Office 엔진이 읽을 수 없는 응답을 보냈습니다",
  "app.voiceExtra.worker.callAborted": "호출이 중단되었습니다",
  "app.voiceExtra.worker.previewTimeout":
    "문서 미리보기에 시간이 너무 오래 걸렸습니다. 다른 앱에서 여세요.",
  "app.voiceExtra.worker.engineClosed": "Office 엔진이 닫혔습니다",
  "app.voiceExtra.worker.superseded": "새 호출로 대체되었습니다",
} as const;
