import Field from '../components/Field';

export default function StepGegner({ data, onChange, onNext, onPrev }) {
  const f = (field) => ({
    value: data[field],
    onChange: e => onChange({ [field]: e.target.value }),
    className: data[field] ? 'filled' : '',
  });

  return (
    <div>
      <h2 className="step-title">🤝 Unfallgegner</h2>
      <p className="step-subtitle">Daten des Unfallgegners (falls vorhanden – alle Felder optional)</p>

      <div className="form-grid">
        <Field label="Name des Unfallgegners" optional full>
          <input type="text" placeholder="Max Mustermann" {...f('name')} />
        </Field>
        <Field label="Kennzeichen des Gegners" optional>
          <input
            type="text"
            placeholder="M-XY 5678"
            {...f('kennzeichen')}
            onChange={e => onChange({ kennzeichen: e.target.value.toUpperCase() })}
            style={{ textTransform: 'uppercase' }}
          />
        </Field>
        <Field label="Versicherung des Gegners" optional>
          <input type="text" placeholder="z.B. Allianz" {...f('versicherung')} />
        </Field>
        <Field label="Versicherungsnummer des Gegners" optional>
          <input type="text" placeholder="z.B. 987654321" {...f('versicherungsnummer')} />
        </Field>
      </div>

      <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: '12px 16px', marginTop: 20, fontSize: 14, color: '#92400e' }}>
        💡 Wenn Sie die Daten des Unfallgegners nicht haben, können Sie diesen Schritt überspringen.
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>← Zurück</button>
        <button className="btn btn-primary" onClick={onNext}>Weiter →</button>
      </div>
    </div>
  );
}
