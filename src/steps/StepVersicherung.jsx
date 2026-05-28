import Field from '../components/Field';

const VERSICHERUNGEN = [
  'ADAC Versicherung', 'Allianz', 'AXA', 'Cosmos Direkt', 'DA Direkt', 'DEVK',
  'Ergo', 'Generali', 'HUK-Coburg', 'HUK24', 'LVM', 'Mecklenburgische',
  'Nürnberger', 'R+V', 'Signal Iduna', 'Württembergische', 'Zurich', 'Andere',
];

export default function StepVersicherung({ data, onChange, onNext, onPrev }) {
  const f = (field) => ({
    value: data[field],
    onChange: e => onChange({ [field]: e.target.value }),
    className: data[field] ? 'filled' : '',
  });

  const canNext = data.gesellschaft && data.nummer;

  return (
    <div>
      <h2 className="step-title">📋 Versicherungsdaten</h2>
      <p className="step-subtitle">Ihre KFZ-Versicherungsinformationen</p>

      <div className="form-grid">
        <Field label="Versicherungsgesellschaft" required full>
          <select {...f('gesellschaft')}>
            <option value="">Bitte wählen...</option>
            {VERSICHERUNGEN.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Versicherungsnummer" required>
          <input type="text" placeholder="z.B. 123456789" {...f('nummer')} />
        </Field>
        <Field label="Schadennummer" optional>
          <input type="text" placeholder="Falls bereits vorhanden" {...f('schadennummer')} />
        </Field>
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>← Zurück</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>Weiter →</button>
      </div>
    </div>
  );
}
