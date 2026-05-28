export default function ProgressBar({ progress }) {
  const colorClass = progress === 100 ? 'done' : progress >= 70 ? 'high' : progress >= 40 ? 'medium' : 'low';
  const label = progress === 100 ? '✅ Vollständig – bereit zum Absenden!' : `${progress}% ausgefüllt`;

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span>Fortschritt</span>
        <span style={{ color: progress === 100 ? '#10b981' : '#374151' }}>{label}</span>
      </div>
      <div className="progress-track">
        <div className={`progress-fill ${colorClass}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
