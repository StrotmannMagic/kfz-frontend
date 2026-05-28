function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value}</span>
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

export default function StepSummary({ formData, images, onPrev, onSubmit, submitError, progress }) {
  const { personal, fahrzeug, versicherung, unfall, gegner, schaden } = formData;
  const isComplete = progress === 100;

  return (
    <div>
      <h2 className="step-title">✅ Zusammenfassung</h2>
      <p className="step-subtitle">
        Bitte überprüfen Sie alle Angaben vor dem Absenden
      </p>

      {!isComplete && (
        <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#9a3412' }}>
          ⚠️ Das Formular ist noch nicht vollständig ({progress}%). Bitte füllen Sie alle Pflichtfelder aus, bevor Sie absenden.
        </div>
      )}

      <Section title="Persönliche Daten" icon="👤">
        <Row label="Name" value={`${personal.vorname} ${personal.nachname}`} />
        <Row label="E-Mail" value={personal.email} />
        <Row label="Telefon" value={personal.telefon} />
        <Row label="Adresse" value={`${personal.strasse}, ${personal.plz} ${personal.ort}`} />
      </Section>

      <Section title="Fahrzeugdaten" icon="🚗">
        <Row label="Kennzeichen" value={fahrzeug.kennzeichen} />
        <Row label="Fahrzeug" value={`${fahrzeug.marke} ${fahrzeug.modell}`} />
        <Row label="Baujahr" value={fahrzeug.baujahr} />
        <Row label="FIN" value={fahrzeug.fin} />
      </Section>

      <Section title="Versicherung" icon="📋">
        <Row label="Gesellschaft" value={versicherung.gesellschaft} />
        <Row label="Versicherungsnr." value={versicherung.nummer} />
        <Row label="Schadennr." value={versicherung.schadennummer} />
      </Section>

      <Section title="Unfalldaten" icon="💥">
        <Row label="Datum / Uhrzeit" value={unfall.datum && unfall.uhrzeit ? `${unfall.datum} um ${unfall.uhrzeit} Uhr` : ''} />
        <Row label="Unfallort" value={unfall.ort} />
        <Row label="Polizei gerufen" value={unfall.polizei === 'ja' ? 'Ja' : unfall.polizei === 'nein' ? 'Nein' : ''} />
        <Row label="Aktenzeichen" value={unfall.aktenzeichen} />
        <Row label="Hergang" value={unfall.hergang} />
      </Section>

      {(gegner.name || gegner.kennzeichen) && (
        <Section title="Unfallgegner" icon="🤝">
          <Row label="Name" value={gegner.name} />
          <Row label="Kennzeichen" value={gegner.kennzeichen} />
          <Row label="Versicherung" value={gegner.versicherung} />
          <Row label="Versicherungsnr." value={gegner.versicherungsnummer} />
        </Section>
      )}

      <Section title="Schaden & Fotos" icon="📷">
        <Row label="Beschreibung" value={schaden.beschreibung} />
        <Row label="Fotos" value={images.length > 0 ? `${images.length} Foto${images.length > 1 ? 's' : ''} hochgeladen` : 'Keine Fotos'} />
      </Section>

      {images.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {images.map((img, i) => (
            <img key={i} src={img.dataUrl} alt={img.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '2px solid #e5e7eb' }} />
          ))}
        </div>
      )}

      {submitError && (
        <div className="error-message">{submitError}</div>
      )}

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>← Zurück bearbeiten</button>
        <button
          className="btn btn-success"
          onClick={onSubmit}
          disabled={!isComplete}
          title={!isComplete ? `Bitte erst alle Pflichtfelder ausfüllen (${progress}%)` : ''}
        >
          📤 Jetzt an Rita übermitteln
        </button>
      </div>
    </div>
  );
}
