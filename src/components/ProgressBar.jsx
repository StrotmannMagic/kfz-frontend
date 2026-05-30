export default function ProgressBar({ progress, t }) {
  const colorClass = progress === 100 ? 'done' : progress >= 70 ? 'high' : progress >= 40 ? 'medium' : 'low';

  const headerLabel = t?.progress?.label || 'Fortschritt';
  const completeLabel = t?.progress?.complete || '✅ Vollständig – bereit zum Absenden!';
  const percentFn = t?.progress?.percent || ((p) => `${p}% ausgefüllt`);
  const label = progress === 100 ? completeLabel : percentFn(progress);

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span>{headerLabel}</span>
        <span style={{ color: progress === 100 ? '#10b981' : '#374151' }}>{label}</span>
      </div>
      <div className="progress-track">
        <div className={`progress-fill ${colorClass}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
