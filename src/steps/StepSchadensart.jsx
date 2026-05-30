export default function StepSchadensart({ value, onChange, onNext, onPrev, t }) {
  const s = t.schadensart;

  const options = [
    { id: 'scheibe', icon: '🪟', label: s.scheibe },
    { id: 'unfall_gegner', icon: '🚗', label: s.unfall_gegner },
    { id: 'unfall_eigen', icon: '🔧', label: s.unfall_eigen },
    { id: 'diebstahl', icon: '🔓', label: s.diebstahl },
  ];

  return (
    <div>
      <h2 className="step-title">{s.title}</h2>
      <p className="step-subtitle">{s.subtitle}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              padding: '24px 16px',
              border: `2px solid ${value === opt.id ? '#1a56db' : '#d1d5db'}`,
              borderRadius: 12,
              background: value === opt.id ? '#eff6ff' : 'white',
              color: value === opt.id ? '#1a56db' : '#374151',
              cursor: 'pointer',
              fontWeight: value === opt.id ? 700 : 500,
              fontSize: 15,
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: 36 }}>{opt.icon}</span>
            <span style={{ textAlign: 'center', lineHeight: 1.3 }}>{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>{t.nav.prev}</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!value}>{t.nav.next}</button>
      </div>
    </div>
  );
}
