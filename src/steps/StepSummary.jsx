function Row({ label, value, missing }) {
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className="summary-value" style={{ color: (!value && missing) ? '#9ca3af' : undefined }}>
        {value || missing || '—'}
      </span>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="summary-section">
      <div className="summary-section-title">{icon} {title}</div>
      {children}
    </div>
  );
}

const SCHADENSART_LABELS = {
  scheibe: '🪟 Scheibenschaden / Glass Damage',
  unfall_gegner: '🚗 Unfall mit Unfallgegner / Accident with Third Party',
  unfall_eigen: '🔧 Unfall ohne Unfallgegner / Single Vehicle Accident',
  diebstahl: '🔓 Diebstahl / Theft',
};

export default function StepSummary({ formData, onPrev, onSubmit, submitError, submitting, isComplete, progress, honeypot, onHoneypot, t }) {
  const s = t.summary;
  const { personal, fahrzeug, schadensart, scheibe, unfall, eigenSchaden, gegner, gegnerSchaden, personenschaden, diebstahl } = formData;

  const docLabel = (doc) => doc ? t.summary.doc_attached : s.missing;
  const imgCount = (arr) => arr && arr.length > 0 ? t.summary.image_count(arr.length) : s.missing;

  return (
    <div>
      <h2 className="step-title">{s.title}</h2>
      <p className="step-subtitle">{s.subtitle}</p>

      {!isComplete && (
        <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#9a3412' }}>
          {s.incomplete_notice}
        </div>
      )}

      <Section title={s.personal} icon="👤">
        <Row label="Name" value={`${personal.vorname} ${personal.nachname}`.trim()} />
        <Row label="E-Mail" value={personal.email} />
        <Row label="Telefon / Phone" value={personal.telefon} />
        <Row label="Adresse / Address" value={[personal.strasse, personal.plz, personal.ort].filter(Boolean).join(', ')} />
      </Section>

      <Section title={s.fahrzeug} icon="🚗">
        <Row label="Kennzeichen / Plate" value={fahrzeug.kennzeichen} />
        <Row label="Marke / Make" value={fahrzeug.marke} />
      </Section>

      <Section title={s.schadensart} icon="📋">
        <Row label="Art / Type" value={SCHADENSART_LABELS[schadensart] || schadensart} />
      </Section>

      {schadensart === 'scheibe' && (
        <Section title={s.details} icon="🪟">
          <Row label="Reparatur / Repair" value={scheibe.reparatur} />
          <Row label="Beschreibung / Description" value={scheibe.beschreibung} />
        </Section>
      )}

      {(schadensart === 'unfall_gegner' || schadensart === 'unfall_eigen') && (
        <>
          <Section title="Fahrer / Driver" icon="🧑">
            <Row label="Name" value={unfall.fahrer_name} />
            <Row label="Führerschein Vorne" value={docLabel(unfall.fuehrerschein_vorne)} />
            <Row label="Führerschein Hinten" value={docLabel(unfall.fuehrerschein_hinten)} />
            <Row label="NIE / Ausweis" value={docLabel(unfall.nie_dokument)} />
          </Section>
          <Section title="Unfalldaten / Accident" icon="💥">
            <Row label="Datum" value={unfall.datum} />
            <Row label="Uhrzeit / Time" value={unfall.uhrzeit} />
            <Row label="Schuld / Fault" value={unfall.schuld} />
            <Row label="Ort / Location" value={unfall.ort} />
            <Row label="Hergang / Description" value={unfall.hergang} />
            <Row label="Unfallbogen" value={unfall.unfallbogen} />
            <Row label="Polizei" value={unfall.polizei} />
            <Row label="Zeugen / Witnesses" value={unfall.zeugen} />
            {unfall.zeugen === 'ja' && <Row label="Zeugendaten" value={unfall.zeugen_info} />}
          </Section>
          <Section title="Eigener Schaden / Own Damage" icon="🔧">
            <Row label="Beschreibung" value={eigenSchaden.beschreibung} />
            <Row label="Fotos / Photos" value={imgCount(eigenSchaden.bilder)} />
            <Row label="Werkstatt / Workshop" value={eigenSchaden.werkstatt} />
          </Section>
          {schadensart === 'unfall_gegner' && (
            <>
              <Section title="Unfallgegner / Third Party" icon="🤝">
                <Row label="Kennzeichen / Plate" value={gegner.kennzeichen} />
                <Row label="Land / Country" value={gegner.land} />
                <Row label="Marke / Make" value={gegner.marke_modell} />
                <Row label="Farbe / Color" value={gegner.farbe} />
                <Row label="Versicherung / Insurance" value={gegner.versicherung} />
                <Row label="Policenr." value={gegner.police_nr} />
                <Row label="Fahrername" value={gegner.fahrer_name} />
              </Section>
              <Section title="Gegner Schaden / Third Party Damage" icon="📷">
                <Row label="Beschreibung" value={gegnerSchaden.beschreibung} />
                <Row label="Fotos / Photos" value={imgCount(gegnerSchaden.bilder)} />
              </Section>
            </>
          )}
          <Section title="Personenschäden / Injuries" icon="🏥">
            <Row label="Personenschäden" value={personenschaden.hat_schaden} />
            {personenschaden.hat_schaden === 'ja' && (
              <>
                <Row label="Beschreibung" value={personenschaden.beschreibung} />
                <Row label="Arztbericht" value={docLabel(personenschaden.arztbericht)} />
              </>
            )}
          </Section>
        </>
      )}

      {schadensart === 'diebstahl' && (
        <Section title={s.details} icon="🔓">
          <Row label="Datum" value={diebstahl && diebstahl.datum} />
          <Row label="Uhrzeit / Time" value={diebstahl && diebstahl.uhrzeit} />
          <Row label="Ort / Location" value={diebstahl && diebstahl.ort} />
          <Row label="Beschreibung" value={diebstahl && diebstahl.beschreibung} />
          <Row label="Polizei" value={diebstahl && diebstahl.polizei} />
        </Section>
      )}

      {submitError && (
        <div className="error-message" style={{ marginBottom: 20 }}>
          {submitError}
        </div>
      )}

      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>{s.submit_note}</p>

      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <input type="text" name="website" value={honeypot} onChange={e => onHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev} disabled={submitting}>{t.nav.prev}</button>
        <button
          className="btn btn-success"
          onClick={onSubmit}
          disabled={!isComplete || submitting}
        >
          {submitting ? t.nav.submitting : t.nav.submit}
        </button>
      </div>
    </div>
  );
}
