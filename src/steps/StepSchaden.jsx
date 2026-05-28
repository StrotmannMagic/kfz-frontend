import Field from '../components/Field';

export default function StepSchaden({ data, onChange, images, setImages, onNext, onPrev }) {
  const canNext = data.beschreibung;

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(prev => [...prev, { name: file.name, dataUrl: ev.target.result }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeImage = (i) => {
    setImages(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <h2 className="step-title">📷 Schaden & Fotos</h2>
      <p className="step-subtitle">Beschreiben Sie den Schaden und laden Sie Fotos hoch</p>

      <div className="form-grid single">
        <Field label="Schadensbeschreibung" required full>
          <textarea
            placeholder="Beschreiben Sie den entstandenen Schaden so detailliert wie möglich (betroffene Fahrzeugteile, sichtbare Schäden, etc.)..."
            rows={5}
            value={data.beschreibung}
            onChange={e => onChange({ beschreibung: e.target.value })}
            className={data.beschreibung ? 'filled' : ''}
          />
        </Field>
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 13, color: '#374151' }}>
          Fotos <span className="optional-badge">optional, aber empfohlen</span>
        </label>
        <label className="upload-area">
          <input type="file" accept="image/*" multiple onChange={handleFiles} />
          <div className="upload-icon">📸</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Fotos hier klicken oder ablegen</div>
          <div style={{ fontSize: 13 }}>JPG, PNG, HEIC – Unfallfotos, Fahrzeugschaden, Umgebung</div>
        </label>

        {images.length > 0 && (
          <div className="image-preview-grid">
            {images.map((img, i) => (
              <div key={i} className="image-thumb">
                <img src={img.dataUrl} alt={img.name} />
                <button onClick={() => removeImage(i)} title="Entfernen">×</button>
              </div>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>
            {images.length} Foto{images.length > 1 ? 's' : ''} ausgewählt
          </p>
        )}
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>← Zurück</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>Weiter →</button>
      </div>
    </div>
  );
}
