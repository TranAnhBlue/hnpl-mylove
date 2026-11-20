import { useState } from 'react';
import './Anniversary.css';

export default function Anniversary({ name1, name2 }) {
  const [letterOpen, setLetterOpen] = useState(false);
  const [wishCount, setWishCount] = useState(0);

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
          {wishCount > 0 && <p>Mong năm thứ hai, và nhiều năm nữa,<br /><strong>người bên cạnh vẫn là nhau.</strong></p>}
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
        <p className="anniversary-intro">Giữa bao nhiêu điều đổi thay, thật may vì chúng mình vẫn có nhau. Cảm ơn em đã làm những ngày bình thường trở thành những ngày anh muốn nhớ.</p>
        <div className="anniversary-actions">
          <button type="button" aria-expanded={letterOpen} aria-controls="anniversary-letter" onClick={() => setLetterOpen(!letterOpen)}>
            <span aria-hidden="true">♡</span> {letterOpen ? 'Gấp lại lá thư' : 'Có một lá thư dành cho em'}
          </button>
          <a href="/love-slideshow">Xem lại những khoảnh khắc</a>
        </div>
        <p className="anniversary-footnote">Một năm đầu tiên, và còn nhiều cái nắm tay phía trước.</p>
      </div>
      <figure className="anniversary-photo">
        <img src="/images/love1.jpg" alt="Một khoảnh khắc của chúng mình" />
        <figcaption>Nơi có em, là nơi anh muốn ở lại.</figcaption>
        <span className="anniversary-seal" aria-hidden="true">1<br /><small>năm yêu</small></span>
      </figure>
      <div id="anniversary-letter" className="anniversary-letter" hidden={!letterOpen}>
        <span className="anniversary-letter-heart" aria-hidden="true">♡</span>
        <p className="anniversary-eyebrow">GỬI NGƯỜI ANH THƯƠNG</p>
        <h3>Mình đã có một năm thật đẹp, em nhỉ?</h3>
        <p>Anh không biết từ lúc nào, những điều nhỏ bé có em lại trở thành phần anh mong đợi nhất trong ngày. Một tin nhắn, một tiếng cười, hay chỉ đơn giản là được ngồi cạnh em, chẳng cần nói gì nhiều.</p>
        <p>Cảm ơn em vì đã cùng anh đi qua một năm này. Vì những dịu dàng, vì sự kiên nhẫn, và vì đã để anh được là một phần trong thế giới của em.</p>
        <p>Ở chặng đường tiếp theo, anh mong chúng mình vẫn dành thời gian lắng nghe nhau, vẫn nắm tay sau những ngày không dễ dàng, và vẫn tìm thấy niềm vui trong những điều thật nhỏ.</p>
        <p className="anniversary-letter-ending">Nếu được bắt đầu lại, anh vẫn muốn gặp em.<br />Và lại cùng em viết tiếp câu chuyện của chúng mình.</p>
        <p className="anniversary-signature">Thương em, hôm nay và những ngày sau.<br />{name1 || 'Anh'} ♡</p>
      </div>
    </section>
  );
}
