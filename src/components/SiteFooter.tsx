import { PRIVACY_URL, TERMS_URL } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-desc">
          혁신적인 직선형 드라이브인을 갖춘
          <br />
          청라에 다시 없을 비즈니스 캠퍼스
        </p>
        <div className="footer-logo-box">
          <img
            className="footer-logo"
            src="/skv1/assets/images/common/footer-logo-white.png"
            alt="청라 SK V1"
          />
          <img className="sigong" src="/skv1/assets/images/common/sigong.png" alt="교보자산신탁" />
        </div>
        <ul className="footer-address">
          <li>현장 : 인천시 서구 파랑로 451</li>
          <li>지식산업센터 : 574호실</li>
          <li>분양창고 : 26호실</li>
          <li>근린생활시설 : 46호실</li>
        </ul>
        <p className="footer-info">
          인천서구 청라동202-2번지 지산, 공장 및 근생 신축사 / 교보자산신탁(주) / 사업자번호 :
          205-59-00603
        </p>
        <ul className="footer-notes">
          <li>
            본 홈페이지에 사용된 CG, 이미지 및 영상은 소비자의 이해를 돕기 위해 제작된 것으로 실제와
            차이가 있을 수 있습니다.
          </li>
          <li>
            개발사업과 관련된 사항은 지자체 및 개발주체, 관계기관의 사정에 따라 변경 또는 취소될 수
            있으며, 당사와는 무관합니다.
          </li>
        </ul>
        <p className="footer-copy">© SK V1 All rights reserved.</p>
        <p className="footer-op">
          홈페이지 운영·관리 | 휴메인코리아
          <br />
          SITE OPERATED BY HUMANE KOREA
        </p>
        <div className="footer-btn-box">
          <a href={TERMS_URL} target="_blank" rel="noreferrer">
            이용약관
          </a>
          <a href={PRIVACY_URL} target="_blank" rel="noreferrer">
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  );
}
