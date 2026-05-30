import Field from '../components/Field';

export default function StepScheibe({ data, onChange, onNext, onPrev, t }) {
  const s = t.scheibe;

  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value });

  const canNext = data.reparatur && data.beschreibung;

  return (
    <div>
      <h2 className="step-title">{s.title}</h2>
      <p className="step-subtitle">{s.subtitle}</p>

      <div className="form-grid single">
        <Field label={s.reparatur} required>
          <select
            value={data.reparatur}
            onChange={set('reparatur')}
            className={data.reparatur ? 'filled' : ''}
          >
            <option value="">–</option>
            <option value="carglas">{s.reparatur_carglas}</option>
            <option value="werkstatt">{s.reparatur_werkstatt}</option>
            <option value="generali">{s.reparatur_generali}</option>
          </select>
        </Field>

        <Field label={s.beschreibung} required>
          <textarea
            value={data.beschreibung}
            onChange={set('beschreibung')}
            className={data.beschreibung ? 'filled' : ''}
            placeholder={s.beschreibung_hint}
            rows={4}
          />
        </Field>
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>{t.nav.prev}</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>{t.nav.next}</button>
      </div>
    </div>
  );
}
