import { useRef } from 'react';

export default function FileUpload({ label, value, onChange, t }) {
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 1200;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        onChange({ name: file.name, dataUrl: canvas.toDataURL('image/jpeg', 0.8) });
      };
      img.onerror = () => {
        // Not an image (e.g. PDF) – store as-is
        onChange({ name: file.name, dataUrl: ev.target.result });
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  if (value) {
    const isImage = value.dataUrl && value.dataUrl.startsWith('data:image');
    return (
      <div style={{ border: '1.5px solid #10b981', borderRadius: 8, padding: '12px 16px', background: '#f0fdf4', display: 'flex', alignItems: 'center', gap: 12 }}>
        {isImage && (
          <img src={value.dataUrl} alt={value.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #d1d5db' }} />
        )}
        {!isImage && <span style={{ fontSize: 24 }}>📄</span>}
        <div style={{ flex: 1, fontSize: 13, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value.name}
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, flexShrink: 0 }}
        >
          {t?.upload?.remove || 'Remove'}
        </button>
      </div>
    );
  }

  return (
    <label
      className="upload-area"
      style={{ display: 'block' }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => handleFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <div className="upload-icon">📎</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t?.upload?.click || 'Click or drag file here'}</div>
      <div style={{ fontSize: 12 }}>{t?.upload?.types || 'JPG, PNG, PDF up to 10 MB'}</div>
    </label>
  );
}
