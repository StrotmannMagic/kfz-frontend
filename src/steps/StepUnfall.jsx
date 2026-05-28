import Field from '../components/Field';

export default function StepUnfall({ data, onChange, onNext, onPrev }) {
  const f = (field) => ({
    value: data[field],
    onChange: e => onChange({ [field]: e.target.value }),
    className: data[field] ? 'filled' : '',
  });

  const canNext = data.datum && data.uhrzeit && data.ort && data.hergang && data.polizei;

  return (
    <div>
      <h2 className="step-title">💥 Unfalldaten</h2>
      <p className="step-subtitle">Details zum Unfallereignis</p>

      <div className="form-grid">
        <Field label="Unfalldatum" required>
          <input type="date" {...f('datum')} />
        </Field>
        <Field label="Unfallzeit" required>
          <input type="time" {...f('uhrzeit')} />
        </Field>
        <Field label="Unfallort (Straße, Stadt)" required full>
          <input type="text" placeholder="Hauptstraße 5, 10115 Berlin" {...f('ort')} />
        </Field>
        <Field label="Unfallhergang" required full>
          <textarea
            placeholder="Bitte beschreiben Sie den Unfallhergang so genau wie möglich..."
            rows={5}
            {...f('hergang')}
          />
        </Field>
        <Field label="Wurde die Polizei gerufen?" required full>
          <div className="radio-group">
            {['ja', 'nein'].map(val => (
              <label key={val} className="radio-option">
                <input
                  type="radio"
                  name="polizei"
                  value={val}
                  checked={data.polizei === val}
                  onChange={() => onChange({ polizei: val })}
                />
                {val === 'ja' ? '✅ Ja' : '❌ Nein'}
              </label>
            ))}
          </div>
        </Field>
        {data.polizei === 'ja' && (
          <Field label="Polizeiliches Aktenzeichen" optional full>
            <input type="text" placeholder="z.B. POL-2024-12345" {...f('aktenzeichen')} />
          </Field>
        )}
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>← Zurück</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>Weiter →</button>
      </div>
    </div>
  );
}
