import Field from '../components/Field';

export default function StepPersonal({ data, onChange, onNext, onPrev, t }) {
  const s = t.personal;

  const f = (field) => ({
    value: data[field],
    onChange: e => onChange({ [field]: e.target.value }),
    className: data[field] ? 'filled' : '',
  });

  const canNext = data.vorname && data.nachname && data.email && data.telefon && data.strasse && data.plz && data.ort;

  return (
    <div>
      <h2 className="step-title">{s.title}</h2>
      <p className="step-subtitle">{s.subtitle}</p>

      <div className="form-grid">
        <Field label={s.vorname} required>
          <input type="text" placeholder="Max" {...f('vorname')} />
        </Field>
        <Field label={s.nachname} required>
          <input type="text" placeholder="Mustermann" {...f('nachname')} />
        </Field>
        <Field label={s.email} required>
          <input type="email" placeholder="name@example.com" {...f('email')} />
        </Field>
        <Field label={s.telefon} required>
          <input type="tel" placeholder="+34 600 000 000" {...f('telefon')} />
        </Field>
        <Field label={s.strasse} required full>
          <input type="text" placeholder="Musterstraße 12" {...f('strasse')} />
        </Field>
        <Field label={s.plz} required>
          <input type="text" placeholder="28001" {...f('plz')} />
        </Field>
        <Field label={s.ort} required>
          <input type="text" placeholder="Madrid" {...f('ort')} />
        </Field>
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>
          {t.nav.next}
        </button>
      </div>
    </div>
  );
}
