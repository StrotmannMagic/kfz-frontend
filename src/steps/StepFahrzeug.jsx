import Field from '../components/Field';

export default function StepFahrzeug({ data, onChange, onNext, onPrev, t }) {
  const s = t.fahrzeug;

  const f = (field) => ({
    value: data[field],
    onChange: e => onChange({ [field]: e.target.value }),
    className: data[field] ? 'filled' : '',
  });

  const canNext = data.kennzeichen && data.marke;

  return (
    <div>
      <h2 className="step-title">{s.title}</h2>
      <p className="step-subtitle">{s.subtitle}</p>

      <div className="form-grid">
        <Field label={s.kennzeichen} required>
          <input
            type="text"
            placeholder="MA-1234-AB"
            {...f('kennzeichen')}
            onChange={e => onChange({ ...data, kennzeichen: e.target.value.toUpperCase() })}
            style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}
          />
        </Field>
        <Field label={s.marke} required>
          <input type="text" placeholder="z.B. Volkswagen, BMW, Seat" {...f('marke')} />
        </Field>
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>{t.nav.prev}</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>{t.nav.next}</button>
      </div>
    </div>
  );
}
