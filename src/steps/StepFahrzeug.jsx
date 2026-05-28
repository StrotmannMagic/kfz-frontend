import Field from '../components/Field';

const MARKEN = ['Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Opel', 'Ford', 'Toyota', 'Renault', 'Peugeot', 'Seat', 'Skoda', 'Hyundai', 'Kia', 'Fiat', 'Volvo', 'Andere'];
const JAHRE = Array.from({ length: 40 }, (_, i) => 2024 - i);

export default function StepFahrzeug({ data, onChange, onNext, onPrev }) {
  const f = (field) => ({
    value: data[field],
    onChange: e => onChange({ [field]: e.target.value }),
    className: data[field] ? 'filled' : '',
  });

  const canNext = data.kennzeichen && data.marke && data.modell && data.baujahr;

  return (
    <div>
      <h2 className="step-title">🚗 Fahrzeugdaten</h2>
      <p className="step-subtitle">Informationen zu Ihrem Fahrzeug</p>

      <div className="form-grid">
        <Field label="Kennzeichen" required full>
          <input
            type="text"
            placeholder="B-AB 1234"
            {...f('kennzeichen')}
            onChange={e => onChange({ kennzeichen: e.target.value.toUpperCase() })}
            style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}
          />
        </Field>
        <Field label="Fahrzeugmarke" required>
          <select {...f('marke')}>
            <option value="">Bitte wählen...</option>
            {MARKEN.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Modell" required>
          <input type="text" placeholder="z.B. Golf, 3er, A-Klasse" {...f('modell')} />
        </Field>
        <Field label="Baujahr" required>
          <select {...f('baujahr')}>
            <option value="">Bitte wählen...</option>
            {JAHRE.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </Field>
        <Field label="Fahrzeugidentifikationsnummer (FIN)" optional>
          <input type="text" placeholder="WBA3A5G59DNP26082" {...f('fin')} maxLength={17} />
        </Field>
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>← Zurück</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>Weiter →</button>
      </div>
    </div>
  );
}
