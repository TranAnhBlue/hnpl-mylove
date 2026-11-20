import { createLetter, emptyPlan, hasPersonalLetter } from './anniversaryPlan';
import './AnniversaryEditor.css';

const fields = [
  ['memory', 'Một kỷ niệm bạn nhớ nhất', 'lần hai đứa đi dưới mưa…', 'Nối tiếp câu “Anh vẫn nhớ…”'],
  ['gratitude', 'Điều bạn muốn cảm ơn', 'đã luôn lắng nghe những chuyện nhỏ của anh…', 'Nối tiếp câu “Cảm ơn em vì…”'],
  ['promise', 'Một lời hứa cho năm thứ hai', 'dành một buổi tối mỗi tuần chỉ cho hai đứa…', 'Nối tiếp câu “Bước sang năm thứ hai, anh muốn…”'],
  ['wish', 'Điều ước chung (không bắt buộc)', 'Mong những năm tiếp theo, người bên cạnh vẫn là nhau.', 'Hiện khi chạm “Cùng nhau ước một điều”.'],
];

export default function AnniversaryEditor({ value, onChange }) {
  const plan = { ...emptyPlan, ...value };
  const update = (key, text) => onChange({ ...plan, [key]: text });
  const filled = fields.slice(0, 3).filter(([key]) => plan[key].trim()).length;
  return (
    <section className="anniversary-editor" aria-labelledby="anniversary-editor-title">
      <h3 id="anniversary-editor-title">Chuẩn bị kỷ niệm 1 năm</h3>
      <p>Tên hai bạn và ngày bắt đầu yêu lấy từ các ô phía trên. Điền thêm ba điều thật riêng để hoàn thành lá thư.</p>
      <p className="plan-progress">Đã điền {filled}/3 nội dung lá thư</p>
      <div className="plan-form-grid">
        {[['sender', 'Bạn xưng là'], ['recipient', 'Bạn gọi người ấy là']].map(([key, label]) => (
          <label key={key} htmlFor={`plan-${key}`}>{label}
            <input id={`plan-${key}`} value={plan[key]} maxLength={40} onChange={e => update(key, e.target.value)} placeholder={emptyPlan[key]} />
          </label>
        ))}
      </div>
      {fields.map(([key, label, placeholder, hint]) => (
        <label key={key} htmlFor={`plan-${key}`}>{label}
          <small id={`plan-${key}-hint`}>{hint}</small>
          <textarea id={`plan-${key}`} aria-describedby={`plan-${key}-hint`} value={plan[key]} placeholder={placeholder} maxLength={2000} rows={3} onChange={e => update(key, e.target.value)} />
        </label>
      ))}
      <h4>Thiệp hẹn bí mật (không bắt buộc)</h4>
      <p>Điền đủ ngày, giờ và địa điểm để bật thiệp hẹn trên trang chính. Để trống nếu bạn chưa chốt buổi hẹn.</p>
      <div className="plan-form-grid">
        <label htmlFor="plan-meetingDate">Ngày hẹn<input id="plan-meetingDate" type="date" value={plan.meetingDate} onChange={e => update('meetingDate', e.target.value)} /></label>
        <label htmlFor="plan-meetingTime">Giờ hẹn<input id="plan-meetingTime" type="time" value={plan.meetingTime} onChange={e => update('meetingTime', e.target.value)} /></label>
      </div>
      <label htmlFor="plan-meetingPlace">Địa điểm và địa chỉ<input id="plan-meetingPlace" value={plan.meetingPlace} maxLength={300} onChange={e => update('meetingPlace', e.target.value)} /></label>
      <label htmlFor="plan-invitation">Lời nhắn kèm thiệp<textarea id="plan-invitation" value={plan.invitation} maxLength={2000} rows={2} placeholder="Hôm đó em chỉ cần mang theo nụ cười nhé." onChange={e => update('invitation', e.target.value)} /></label>
      <details className="plan-preview">
        <summary>Xem trước lời đọc trong buổi hẹn</summary>
        {hasPersonalLetter(plan) ? createLetter(plan).map((line, i) => <p key={i}>{line}</p>) : <p>Điền đủ kỷ niệm, lời cảm ơn và lời hứa để xem lá thư riêng của bạn.</p>}
        <p>Chúc mừng một năm của chúng mình. Mình cùng viết tiếp năm thứ hai nhé.</p>
      </details>
      <details className="plan-preview">
        <summary>Kịch bản tối kỷ niệm · 60–90 phút</summary>
        <ol>
          <li><strong>Trước buổi hẹn:</strong> chuẩn bị hoa hoặc món yêu thích, kiểm tra app trên điện thoại và chọn vài ảnh để cùng xem.</li>
          <li><strong>Sau bữa ăn:</strong> “Có một góc nhỏ dành cho hai đứa mình.” Đưa điện thoại hoặc phong thư có QR dẫn đến app.</li>
          <li><strong>Cùng xem ảnh:</strong> kể lại ba khoảnh khắc: một lần vui, một lần được quan tâm và một ngày bình thường đáng nhớ.</li>
          <li><strong>Mở lá thư:</strong> đọc chậm lời riêng của bạn, rồi dành thời gian lắng nghe người ấy.</li>
          <li><strong>Cùng ước:</strong> mỗi người chọn một điều muốn cùng làm trong năm thứ hai.</li>
          <li><strong>Kết thúc:</strong> chụp một tấm ảnh mới, lưu vào app rồi cất điện thoại để ở bên nhau.</li>
        </ol>
      </details>
      <p>Nhấn <strong>Lưu</strong> ở đầu trang để cập nhật. Các ô đang nhập chỉ xuất hiện trên trang chính sau khi lưu thành công.</p>
    </section>
  );
}
