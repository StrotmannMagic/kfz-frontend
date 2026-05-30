import Field from '../components/Field';
import FileUpload from '../components/FileUpload';

export default function StepDiebstahl({ data, onChange, onNext, onPrev, t }) {
  const s = t.diebstahl;

  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value });

  const canNext = data.datum && data.ort && data.beschreibung && data.polizei;

  return (
    <div>
      <h2 className="step-title">{s.title}</h2>
      <p className="step-subtitle">{s.subtitle}</p>

      <div className="form-grid">
        <Field label={s.datum} required>
          <input
            type="date"
            value={data.datum}
            onChange={set('datum')}
            className={data.datum ? 'filled' : ''}
          />
        </Field>
        <Field label={s.uhrzeit}>
          <input
            type="time"
            value={data.uhrzeit}
            onChange={set('uhrzeit')}
            className={data.uhrzeit ? 'filled' : ''}
          />
        </Field>
        <Field label={s.ort} required full>
          <input
            type="text"
            value={data.ort}
            onChange={set('ort')}
            className={data.ort ? 'filled' : ''}
          />
        </Field>
        <Field label={s.beschreibung} required full>
          <textarea
            value={data.beschreibung}
            onChange={set('beschreibung')}
            className={data.beschreibung ? 'filled' : ''}
            rows={4}
          />
        </Field>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#374151' }}>
          {s.polizei} <span style={{ color: '#ef4444' }}>*</span>
        </div>
        <div className="radio-group">
          {['ja', 'nein'].map((v) => (
            <label key={v} className="radio-option">
              <input
                type="radio"
                name="diebstahl-polizei"
                value={v}
                checked={data.polizei === v}
                onChange={() => onChange({ ...data, polizei: v })}
              />
              {v === 'ja' ? s.ja : s.nein}
            </label>
          ))}
        </div>

        {data.polizei === 'ja' && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: '#374151' }}>{s.polizei_upload}</div>
            <FileUpload
              value={data.polizei_bericht}
              onChange={(v) => onChange({ ...data, polizei_bericht: v })}
              t={t}
            />
          </div>
        )}
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>{t.nav.prev}</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>{t.nav.next}</button>
      </div>
    </div>
  );
}
