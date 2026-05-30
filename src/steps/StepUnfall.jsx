import Field from '../components/Field';
import FileUpload from '../components/FileUpload';

const compressImage = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 1200;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve({ name: file.name, dataUrl: canvas.toDataURL('image/jpeg', 0.8) });
    };
    img.onerror = () => resolve({ name: file.name, dataUrl: ev.target.result });
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

function SectionHeader({ children }) {
  return (
    <div style={{
      fontSize: 16, fontWeight: 700, color: '#1a56db',
      borderBottom: '2px solid #e5e7eb', paddingBottom: 8,
      marginTop: 32, marginBottom: 20,
    }}>
      {children}
    </div>
  );
}

function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="radio-group">
      {options.map((opt) => (
        <label key={opt.value} className="radio-option">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

export default function StepUnfall({ schadensart, unfall, eigenSchaden, gegner, gegnerSchaden, personenschaden, onChange, onNext, onPrev, t }) {
  const s = t.unfall;
  const withGegner = schadensart === 'unfall_gegner';

  const setUnfall = (k, v) => onChange({ unfall: { ...unfall, [k]: v } });
  const setEigen = (k, v) => onChange({ eigenSchaden: { ...eigenSchaden, [k]: v } });
  const setGegner = (k, v) => onChange({ gegner: { ...gegner, [k]: v } });
  const setGegnerSchaden = (k, v) => onChange({ gegnerSchaden: { ...gegnerSchaden, [k]: v } });
  const setPersonen = (k, v) => onChange({ personenschaden: { ...personenschaden, [k]: v } });

  const handleEigenBilder = async (e) => {
    const files = Array.from(e.target.files);
    const compressed = await Promise.all(files.map(compressImage));
    setEigen('bilder', [...(eigenSchaden.bilder || []), ...compressed]);
  };

  const handleGegnerBilder = async (e) => {
    const files = Array.from(e.target.files);
    const compressed = await Promise.all(files.map(compressImage));
    setGegnerSchaden('bilder', [...(gegnerSchaden.bilder || []), ...compressed]);
  };

  const canNext =
    unfall.fahrer_name && unfall.datum && unfall.schuld && unfall.ort && unfall.hergang &&
    unfall.unfallbogen && unfall.polizei && unfall.zeugen &&
    eigenSchaden.beschreibung && eigenSchaden.werkstatt &&
    personenschaden.hat_schaden;

  return (
    <div>
      <h2 className="step-title">{s.title}</h2>

      {/* === FAHRER === */}
      <SectionHeader>{s.fahrer_title}</SectionHeader>
      <div className="form-grid single">
        <Field label={s.fahrer_name} required>
          <input
            type="text"
            value={unfall.fahrer_name}
            onChange={(e) => setUnfall('fahrer_name', e.target.value)}
            className={unfall.fahrer_name ? 'filled' : ''}
          />
        </Field>
      </div>
      <div className="form-grid" style={{ marginTop: 16 }}>
        <Field label={s.fuehrerschein_vorne}>
          <FileUpload value={unfall.fuehrerschein_vorne} onChange={(v) => setUnfall('fuehrerschein_vorne', v)} t={t} />
        </Field>
        <Field label={s.fuehrerschein_hinten}>
          <FileUpload value={unfall.fuehrerschein_hinten} onChange={(v) => setUnfall('fuehrerschein_hinten', v)} t={t} />
        </Field>
        <Field label={s.nie_dokument} full>
          <FileUpload value={unfall.nie_dokument} onChange={(v) => setUnfall('nie_dokument', v)} t={t} />
        </Field>
      </div>

      {/* === UNFALLDATEN === */}
      <SectionHeader>{s.title}</SectionHeader>
      <div className="form-grid">
        <Field label={s.datum} required>
          <input
            type="date"
            value={unfall.datum}
            onChange={(e) => setUnfall('datum', e.target.value)}
            className={unfall.datum ? 'filled' : ''}
          />
        </Field>
        <Field label={s.uhrzeit}>
          <input
            type="time"
            value={unfall.uhrzeit}
            onChange={(e) => setUnfall('uhrzeit', e.target.value)}
            className={unfall.uhrzeit ? 'filled' : ''}
          />
        </Field>
        <Field label={s.schuld} required full>
          <select
            value={unfall.schuld}
            onChange={(e) => setUnfall('schuld', e.target.value)}
            className={unfall.schuld ? 'filled' : ''}
          >
            <option value="">–</option>
            <option value="eigen">{s.schuld_eigen}</option>
            <option value="fremd">{s.schuld_fremd}</option>
          </select>
        </Field>
        <Field label={s.ort} required full>
          <input
            type="text"
            value={unfall.ort}
            onChange={(e) => setUnfall('ort', e.target.value)}
            className={unfall.ort ? 'filled' : ''}
          />
        </Field>
        <Field label={s.hergang} required full>
          <textarea
            value={unfall.hergang}
            onChange={(e) => setUnfall('hergang', e.target.value)}
            className={unfall.hergang ? 'filled' : ''}
            rows={4}
          />
        </Field>
      </div>

      {/* Unfallbogen */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: '#374151' }}>
          {s.unfallbogen} <span style={{ color: '#ef4444' }}>*</span>
        </div>
        <RadioGroup
          name="unfallbogen"
          value={unfall.unfallbogen}
          onChange={(v) => setUnfall('unfallbogen', v)}
          options={[{ value: 'ja', label: s.ja }, { value: 'nein', label: s.nein }]}
        />
        {unfall.unfallbogen === 'ja' && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: '#374151' }}>{s.unfallbogen_upload}</div>
            <FileUpload value={unfall.unfallbogen_bild} onChange={(v) => setUnfall('unfallbogen_bild', v)} t={t} />
          </div>
        )}
      </div>

      {/* Polizei */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: '#374151' }}>
          {s.polizei} <span style={{ color: '#ef4444' }}>*</span>
        </div>
        <RadioGroup
          name="polizei"
          value={unfall.polizei}
          onChange={(v) => setUnfall('polizei', v)}
          options={[{ value: 'ja', label: s.ja }, { value: 'nein', label: s.nein }]}
        />
        {unfall.polizei === 'ja' && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: '#374151' }}>{s.polizei_upload}</div>
            <FileUpload value={unfall.polizei_bericht} onChange={(v) => setUnfall('polizei_bericht', v)} t={t} />
          </div>
        )}
      </div>

      {/* Zeugen */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: '#374151' }}>
          {s.zeugen} <span style={{ color: '#ef4444' }}>*</span>
        </div>
        <RadioGroup
          name="zeugen"
          value={unfall.zeugen}
          onChange={(v) => setUnfall('zeugen', v)}
          options={[{ value: 'ja', label: s.ja }, { value: 'nein', label: s.nein }]}
        />
        {unfall.zeugen === 'ja' && (
          <div style={{ marginTop: 12 }}>
            <div className="form-grid single">
              <Field label={s.zeugen_info}>
                <textarea
                  value={unfall.zeugen_info}
                  onChange={(e) => setUnfall('zeugen_info', e.target.value)}
                  className={unfall.zeugen_info ? 'filled' : ''}
                  rows={3}
                />
              </Field>
            </div>
          </div>
        )}
      </div>

      {/* === EIGENER SCHADEN === */}
      <SectionHeader>{s.eigenSchaden_title}</SectionHeader>
      <div className="form-grid single">
        <Field label={s.beschreibung} required>
          <textarea
            value={eigenSchaden.beschreibung}
            onChange={(e) => setEigen('beschreibung', e.target.value)}
            className={eigenSchaden.beschreibung ? 'filled' : ''}
            rows={3}
          />
        </Field>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: '#374151' }}>{s.bilder}</div>
        <label className="upload-area" style={{ display: 'block' }}>
          <input type="file" accept="image/*" multiple onChange={handleEigenBilder} style={{ display: 'none' }} />
          <div className="upload-icon">📷</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t.upload.click}</div>
          <div style={{ fontSize: 12 }}>{t.upload.types}</div>
        </label>
        {eigenSchaden.bilder && eigenSchaden.bilder.length > 0 && (
          <div className="image-preview-grid">
            {eigenSchaden.bilder.map((img, i) => (
              <div key={i} className="image-thumb">
                <img src={img.dataUrl} alt={img.name} />
                <button
                  type="button"
                  onClick={() => setEigen('bilder', eigenSchaden.bilder.filter((_, j) => j !== i))}
                >×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <Field label={s.werkstatt} required>
          <select
            value={eigenSchaden.werkstatt}
            onChange={(e) => setEigen('werkstatt', e.target.value)}
            className={eigenSchaden.werkstatt ? 'filled' : ''}
          >
            <option value="">–</option>
            <option value="eigen">{s.werkstatt_eigen}</option>
            <option value="generali">{s.werkstatt_generali}</option>
            <option value="offen">{s.werkstatt_offen}</option>
          </select>
        </Field>
        {eigenSchaden.werkstatt === 'eigen' && (
          <div style={{ marginTop: 12 }}>
            <div className="form-grid single">
              <Field label={s.werkstatt_daten}>
                <textarea
                  value={eigenSchaden.werkstatt_daten}
                  onChange={(e) => setEigen('werkstatt_daten', e.target.value)}
                  className={eigenSchaden.werkstatt_daten ? 'filled' : ''}
                  rows={2}
                />
              </Field>
              <Field label={s.gutachter_termin}>
                <input
                  type="date"
                  value={eigenSchaden.gutachter_termin}
                  onChange={(e) => setEigen('gutachter_termin', e.target.value)}
                  className={eigenSchaden.gutachter_termin ? 'filled' : ''}
                />
              </Field>
            </div>
          </div>
        )}
        {eigenSchaden.werkstatt === 'generali' && (
          <div style={{ marginTop: 10, padding: '10px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, fontSize: 14, color: '#1e40af' }}>
            {s.werkstatt_generali_info}
          </div>
        )}
        {eigenSchaden.werkstatt === 'offen' && (
          <div style={{ marginTop: 10, padding: '10px 14px', background: '#fefce8', border: '1px solid #fde68a', borderRadius: 8, fontSize: 14, color: '#92400e' }}>
            {s.werkstatt_offen_info}
          </div>
        )}
      </div>

      {/* === UNFALLGEGNER === */}
      {withGegner && (
        <>
          <SectionHeader>{s.gegner_title}</SectionHeader>
          <div className="form-grid">
            <Field label={s.gegner_kennzeichen}>
              <input
                type="text"
                value={gegner.kennzeichen}
                onChange={(e) => setGegner('kennzeichen', e.target.value.toUpperCase())}
                className={gegner.kennzeichen ? 'filled' : ''}
                style={{ textTransform: 'uppercase' }}
              />
            </Field>
            <Field label={s.gegner_land}>
              <input
                type="text"
                value={gegner.land}
                onChange={(e) => setGegner('land', e.target.value)}
                className={gegner.land ? 'filled' : ''}
              />
            </Field>
            <Field label={s.gegner_marke}>
              <input
                type="text"
                value={gegner.marke_modell}
                onChange={(e) => setGegner('marke_modell', e.target.value)}
                className={gegner.marke_modell ? 'filled' : ''}
              />
            </Field>
            <Field label={s.gegner_farbe}>
              <input
                type="text"
                value={gegner.farbe}
                onChange={(e) => setGegner('farbe', e.target.value)}
                className={gegner.farbe ? 'filled' : ''}
              />
            </Field>
            <Field label={s.gegner_versicherung}>
              <input
                type="text"
                value={gegner.versicherung}
                onChange={(e) => setGegner('versicherung', e.target.value)}
                className={gegner.versicherung ? 'filled' : ''}
              />
            </Field>
            <Field label={s.gegner_police} optional>
              <input
                type="text"
                value={gegner.police_nr}
                onChange={(e) => setGegner('police_nr', e.target.value)}
                className={gegner.police_nr ? 'filled' : ''}
              />
            </Field>
            <Field label={s.gegner_fahrer}>
              <input
                type="text"
                value={gegner.fahrer_name}
                onChange={(e) => setGegner('fahrer_name', e.target.value)}
                className={gegner.fahrer_name ? 'filled' : ''}
              />
            </Field>
            <Field label={s.gegner_geburtsdatum}>
              <input
                type="date"
                value={gegner.geburtsdatum}
                onChange={(e) => setGegner('geburtsdatum', e.target.value)}
                className={gegner.geburtsdatum ? 'filled' : ''}
              />
            </Field>
            <Field label={s.gegner_fuehrerschein}>
              <input
                type="date"
                value={gegner.fuehrerschein_datum}
                onChange={(e) => setGegner('fuehrerschein_datum', e.target.value)}
                className={gegner.fuehrerschein_datum ? 'filled' : ''}
              />
            </Field>
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: '#374151' }}>{s.gegner_ist_inhaber}</div>
            <RadioGroup
              name="gegner_ist_inhaber"
              value={gegner.ist_inhaber}
              onChange={(v) => setGegner('ist_inhaber', v)}
              options={[
                { value: 'ja', label: s.gegner_ja },
                { value: 'nein', label: s.gegner_nein },
                { value: 'unbekannt', label: s.gegner_unbekannt },
              ]}
            />
          </div>

          <SectionHeader>{s.gegnerSchaden_title}</SectionHeader>
          <div className="form-grid single">
            <Field label={s.beschreibung}>
              <textarea
                value={gegnerSchaden.beschreibung}
                onChange={(e) => setGegnerSchaden('beschreibung', e.target.value)}
                className={gegnerSchaden.beschreibung ? 'filled' : ''}
                rows={3}
              />
            </Field>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: '#374151' }}>{s.bilder}</div>
            <label className="upload-area" style={{ display: 'block' }}>
              <input type="file" accept="image/*" multiple onChange={handleGegnerBilder} style={{ display: 'none' }} />
              <div className="upload-icon">📷</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t.upload.click}</div>
              <div style={{ fontSize: 12 }}>{t.upload.types}</div>
            </label>
            {gegnerSchaden.bilder && gegnerSchaden.bilder.length > 0 && (
              <div className="image-preview-grid">
                {gegnerSchaden.bilder.map((img, i) => (
                  <div key={i} className="image-thumb">
                    <img src={img.dataUrl} alt={img.name} />
                    <button
                      type="button"
                      onClick={() => setGegnerSchaden('bilder', gegnerSchaden.bilder.filter((_, j) => j !== i))}
                    >×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* === PERSONENSCHÄDEN === */}
      <SectionHeader>{s.personenschaden_title}</SectionHeader>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: '#374151' }}>
          {s.personenschaden_hat} <span style={{ color: '#ef4444' }}>*</span>
        </div>
        <RadioGroup
          name="personenschaden_hat"
          value={personenschaden.hat_schaden}
          onChange={(v) => setPersonen('hat_schaden', v)}
          options={[{ value: 'ja', label: s.ja }, { value: 'nein', label: s.nein }]}
        />
        {personenschaden.hat_schaden === 'ja' && (
          <div style={{ marginTop: 16 }}>
            <div className="form-grid single">
              <Field label={s.personenschaden_beschreibung}>
                <textarea
                  value={personenschaden.beschreibung}
                  onChange={(e) => setPersonen('beschreibung', e.target.value)}
                  className={personenschaden.beschreibung ? 'filled' : ''}
                  rows={3}
                />
              </Field>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: '#374151' }}>{s.personenschaden_arzt}</div>
              <FileUpload value={personenschaden.arztbericht} onChange={(v) => setPersonen('arztbericht', v)} t={t} />
            </div>
          </div>
        )}
      </div>

      <div className="step-nav-buttons">
        <button className="btn btn-secondary" onClick={onPrev}>{t.nav.prev}</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>{t.nav.next}</button>
      </div>
    </div>
  );
}
