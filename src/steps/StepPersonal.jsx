import Field from '../components/Field';

export default function StepPersonal({ data, onChange, onNext }) {
  const f = (field) => ({
    value: data[field],
    onChange: e => onChange({ [field]: e.target.value }),
    className: data[field] ? 'filled' : '',
  });

  const canNext = data.vorname && data.nachname && data.email && data.telefon && data.strasse && data.plz && data.ort;

  return (
    <div>
      <h2 className="step-title">👤 Persönliche Daten</h2>
      <p className="step-subtitle">Ihre Kontaktdaten für die Schadensbearbeitung</p>

      <div className="form-grid">
        <Field label="Vorname" required>
          <input type="text" placeholder="Max" {...f('vorname')} />
        </Field>
        <Field label="Nachname" required>
          <input type="text" placeholder="Mustermann" {...f('nachname')} />
        </Field>
        <Field label="E-Mail-Adresse" required>
          <input type="email" placeholder="max@example.de" {...f('email')} />
        </Field>
        <Field label="Telefonnummer" required>
          <input type="tel" placeholder="+49 170 1234567" {...f('telefon')} />
        </Field>
        <Field label="Straße und Hausnummer" required full>
          <input type="text" placeholder="Musterstraße 12" {...f('strasse')} />
        </Field>
        <Field label="PLZ" required>
          <input type="text" placeholder="12345" {...f('plz')} maxLength={5} />
        </Field>
        <Field label="Ort" required>
          <input type="text" placeholder="Berlin" {...f('ort')} />
        </Field>
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>
          Weiter →
        </button>
      </div>
    </div>
  );
}
