import { useState } from 'react';
import StepPersonal from './steps/StepPersonal';
import StepFahrzeug from './steps/StepFahrzeug';
import StepVersicherung from './steps/StepVersicherung';
import StepUnfall from './steps/StepUnfall';
import StepGegner from './steps/StepGegner';
import StepSchaden from './steps/StepSchaden';
import StepSummary from './steps/StepSummary';
import ProgressBar from './components/ProgressBar';
import './App.css';

const STEPS = [
  { id: 'personal',     label: 'Persönliche Daten',  icon: '👤' },
  { id: 'fahrzeug',     label: 'Fahrzeugdaten',       icon: '🚗' },
  { id: 'versicherung', label: 'Versicherung',         icon: '📋' },
  { id: 'unfall',       label: 'Unfalldaten',          icon: '💥' },
  { id: 'gegner',       label: 'Unfallgegner',         icon: '🤝' },
  { id: 'schaden',      label: 'Schaden & Fotos',      icon: '📷' },
  { id: 'summary',      label: 'Zusammenfassung',      icon: '✅' },
];

const INITIAL_DATA = {
  personal:     { vorname: '', nachname: '', email: '', telefon: '', strasse: '', plz: '', ort: '' },
  fahrzeug:     { kennzeichen: '', marke: '', modell: '', baujahr: '', fin: '' },
  versicherung: { gesellschaft: '', nummer: '', schadennummer: '' },
  unfall:       { datum: '', uhrzeit: '', ort: '', hergang: '', polizei: 'nein', aktenzeichen: '' },
  gegner:       { name: '', kennzeichen: '', versicherung: '', versicherungsnummer: '' },
  schaden:      { beschreibung: '' },
};

function getRequiredValues(data) {
  const { personal, fahrzeug, versicherung, unfall, schaden } = data;
  return [
    personal.vorname, personal.nachname, personal.email, personal.telefon,
    personal.strasse, personal.plz, personal.ort,
    fahrzeug.kennzeichen, fahrzeug.marke, fahrzeug.modell, fahrzeug.baujahr,
    versicherung.gesellschaft, versicherung.nummer,
    unfall.datum, unfall.uhrzeit, unfall.ort, unfall.hergang, unfall.polizei,
    schaden.beschreibung,
  ];
}

const TOTAL_REQUIRED = 19;

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const updateStep = (stepId, data) => {
    setFormData(prev => ({ ...prev, [stepId]: { ...prev[stepId], ...data } }));
  };

  const next = () => setCurrentStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setCurrentStep(s => Math.max(s - 1, 0));

  const filled = getRequiredValues(formData).filter(v => v && v.toString().trim() !== '').length;
  const progress = Math.round((filled / TOTAL_REQUIRED) * 100);

  const handleSubmit = async () => {
    setSubmitError('');
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, images }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setSubmitError(json.message);
      }
    } catch {
      setSubmitError('Verbindung zum Server nicht möglich. Bitte starten Sie das Backend (npm start im /backend Ordner).');
    }
  };

  if (submitted) {
    return (
      <div className="app-container">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Vielen Dank!</h2>
          <p>Ihr Schadenfall wurde erfolgreich übermittelt.<br />
          Rita wird sich so schnell wie möglich bei Ihnen melden.</p>
        </div>
      </div>
    );
  }

  const stepComponents = [
    <StepPersonal data={formData.personal} onChange={d => updateStep('personal', d)} onNext={next} />,
    <StepFahrzeug data={formData.fahrzeug} onChange={d => updateStep('fahrzeug', d)} onNext={next} onPrev={prev} />,
    <StepVersicherung data={formData.versicherung} onChange={d => updateStep('versicherung', d)} onNext={next} onPrev={prev} />,
    <StepUnfall data={formData.unfall} onChange={d => updateStep('unfall', d)} onNext={next} onPrev={prev} />,
    <StepGegner data={formData.gegner} onChange={d => updateStep('gegner', d)} onNext={next} onPrev={prev} />,
    <StepSchaden data={formData.schaden} onChange={d => updateStep('schaden', d)} images={images} setImages={setImages} onNext={next} onPrev={prev} />,
    <StepSummary formData={formData} images={images} onPrev={prev} onSubmit={handleSubmit} submitError={submitError} progress={progress} />,
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-logo">🚗</div>
        <div>
          <h1>KFZ-Schadensmeldung</h1>
          <p>Bitte füllen Sie alle Felder vollständig aus</p>
        </div>
      </header>

      <ProgressBar progress={progress} />

      <nav className="step-nav">
        {STEPS.map((step, i) => (
          <div
            key={step.id}
            className={`step-item ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
            onClick={() => setCurrentStep(i)}
          >
            <span className="step-icon">{i < currentStep ? '✓' : step.icon}</span>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </nav>

      <main className="form-card">
        {stepComponents[currentStep]}
      </main>
    </div>
  );
}
