import { useState } from 'react';
import './Anniversary.css';
import { createLetter, hasPersonalLetter, meetingLabel } from './anniversaryPlan';
import './AnniversaryEditor.css';

export default function Anniversary({ name1, name2, plan = {} }) {
  const [letterOpen, setLetterOpen] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const [invitationOpen, setInvitationOpen] = useState(false);
  const personalLetter = hasPersonalLetter(plan);
  const recipient = plan.recipient || 'em';
  const sender = (plan.sender || 'Anh').toLocaleLowerCase('vi');
  const hasInvitation = Boolean(meetingLabel(plan) && plan.meetingTime && plan.meetingPlace?.trim());

  return (
    <section className="anniversary" aria-labelledby="anniversary-title">
      <div className="anniversary-glow" aria-hidden="true" />
      <div className="anniversary-celebration">
        <span className="anniversary-celebration-icon" aria-hidden="true">♡</span>
        <p className="anniversary-eyebrow">HAPPY FIRST ANNIVERSARY</p>
        <h3>Chúc mừng 1 năm<br />của chúng ta!</h3>
        <p>Một năm có nhau. Một hành trình đáng nhớ.<br />Và một tình yêu vẫn đang viết tiếp mỗi ngày.</p>
        <button type="button" className="anniversary-wish-button" onClick={() => setWishCount(count => count + 1)}>
          {wishCount ? 'Gửi thêm một điều ước ♡' : 'Cùng nhau ước một điều ♡'}
        </button>
        <div className="anniversary-wish" role="status" aria-live="polite" aria-atomic="true">
          {wishCount > 0 && (plan.wish?.trim()
            ? <p>{plan.wish}</p>
            : <p>Mong năm thứ hai, và nhiều năm nữa,<br /><strong>người bên cạnh vẫn là nhau.</strong></p>)}
        </div>
        {wishCount > 0 && (
          <div key={wishCount} className="anniversary-hearts" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} style={{ '--heart-left': `${5 + i * 6}%`, '--heart-delay': `${(i % 5) * 0.18}s`, '--heart-drift': `${(i % 2 ? 1 : -1) * (20 + i * 3)}px` }}>♥</span>
            ))}
          </div>
        )}
      </div>
      <div className="anniversary-copy">
        <p className="anniversary-eyebrow">KỶ NIỆM MỘT NĂM YÊU NHAU</p>
        <p className="anniversary-names">{name1 || 'Anh'} <span aria-label="và">&</span> {name2 || 'Em'}</p>
        <h2 id="anniversary-title">Một năm bên nhau.<br /><em>Vẫn muốn chọn nhau.</em></h2>
        <p className="anniversary-intro">Giữa bao nhiêu điều đổi thay, thật may vì chúng mình vẫn có nhau. Cảm ơn {recipient} đã làm những ngày bình thường trở thành những ngày {sender} muốn nhớ.</p>
        <div className="anniversary-actions">
          <button type="button" aria-expanded={letterOpen} aria-controls="anniversary-letter" onClick={() => setLetterOpen(!letterOpen)}>
            <span aria-hidden="true">♡</span> {letterOpen ? 'Gấp lại lá thư' : `Có một lá thư dành cho ${recipient}`}
          </button>
          <a href="/love-slideshow">Xem lại những khoảnh khắc</a>
          <a href="/anniversary-surprise">Mở bất ngờ năm thứ hai ♡</a>
        </div>
        <p className="anniversary-footnote">Một năm đầu tiên, và còn nhiều cái nắm tay phía trước.</p>
      </div>
      <figure className="anniversary-photo">
        <img src="/images/love1.jpg" alt="Một khoảnh khắc của chúng mình" />
        <figcaption>Nơi có {recipient}, là nơi {sender} muốn ở lại.</figcaption>
        <span className="anniversary-seal" aria-hidden="true">1<br /><small>năm yêu</small></span>
      </figure>
      <div id="anniversary-letter" className="anniversary-letter" hidden={!letterOpen}>
        <span className="anniversary-letter-heart" aria-hidden="true">♡</span>
        <p className="anniversary-eyebrow">GỬI NGƯỜI {sender.toLocaleUpperCase('vi')} THƯƠNG</p>
        <h3>Mình đã có một năm thật đẹp, {personalLetter ? plan.recipient || 'em' : 'em'} nhỉ?</h3>
        {personalLetter ? createLetter(plan).map((paragraph, index) => (
          <p key={index} className="personal-letter-paragraph">{paragraph}</p>
        )) : <>
        <p>Anh không biết từ lúc nào, những điều nhỏ bé có em lại trở thành phần anh mong đợi nhất trong ngày. Một tin nhắn, một tiếng cười, hay chỉ đơn giản là được ngồi cạnh em, chẳng cần nói gì nhiều.</p>
        <p>Cảm ơn em vì đã cùng anh đi qua một năm này. Vì những dịu dàng, vì sự kiên nhẫn, và vì đã để anh được là một phần trong thế giới của em.</p>
        <p>Ở chặng đường tiếp theo, anh mong chúng mình vẫn dành thời gian lắng nghe nhau, vẫn nắm tay sau những ngày không dễ dàng, và vẫn tìm thấy niềm vui trong những điều thật nhỏ.</p>
        </>}
        <p className="anniversary-letter-ending">Một năm đã qua, anh vẫn muốn nắm tay em thật lâu.<br />Cùng nhau viết tiếp thật nhiều năm hạnh phúc nữa nhé.</p>
        <p className="anniversary-signature">Thương {personalLetter ? plan.recipient || 'em' : 'em'}, hôm nay và những ngày sau.<br />{name1 || plan.sender || 'Anh'} ♡</p>
      </div>
      {hasInvitation && <section className="anniversary-invitation" aria-labelledby="invitation-title">
        <p className="anniversary-eyebrow">MỘT BẤT NGỜ NHỎ DÀNH CHO NGƯỜI THƯƠNG</p>
        <h3 id="invitation-title">Mình có một cuộc hẹn</h3>
        <button type="button" aria-expanded={invitationOpen} aria-controls="anniversary-invitation-details" onClick={() => setInvitationOpen(!invitationOpen)}>{invitationOpen ? 'Gấp lại thiệp hẹn' : 'Mở thiệp hẹn của chúng mình ♡'}</button>
        <div id="anniversary-invitation-details" hidden={!invitationOpen}>
          <p><strong>{meetingLabel(plan)}</strong></p>
          <p>{plan.meetingPlace}</p>
          {plan.invitation?.trim() && <p>{plan.invitation}</p>}
        </div>
      </section>}
    </section>
  );
}
