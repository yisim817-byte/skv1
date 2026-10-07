# 분양조건 팝업 (3개 사이트 공용)

- 원본: `public/popup/skv1-popup.js` (설정은 맨 위 `CONFIG`), 이미지 `public/popup/skv1-building.jpg`
- 호스팅 주소: `https://www.skv1.site/popup/skv1-popup.js`
- 사용 사이트: skv1.site(`src/routes/__root.tsx`), 청라지식산업센터.store, 청라지식산업센터.site
  (다른 두 사이트는 위 주소를 `<script defer>`로 불러오기만 함)
- 조건 변경: `CONFIG.items` 수정 + `CONFIG.version` 변경 → 3개 사이트 동시 반영
- 즉시 내리기 `CONFIG.enabled = false`, 자동 종료 `CONFIG.expires = "YYYY-MM-DD"`
- 이 저장소와 `public/`는 공개다. 공개 승인된 문구 외 내부 조건·메모는 적지 않는다.
