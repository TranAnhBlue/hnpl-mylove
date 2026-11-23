import './AnniversaryEditionBadge.css';

export default function AnniversaryEditionBadge({ note = 'Đức Anh & Phương Linh · 27/11/2025 — 27/11/2026' }) {
  return (
    <div className="anniversary-edition-badge" aria-label="Phiên bản đặc biệt kỷ niệm một năm">
      <span aria-hidden="true">♡</span>
      <div>
        <strong>Phiên bản kỷ niệm 1 năm</strong>
        <small>{note}</small>
      </div>
    </div>
  );
}
