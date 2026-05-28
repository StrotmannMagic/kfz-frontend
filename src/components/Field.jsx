export default function Field({ label, required, optional, children, full }) {
  return (
    <div className={`form-group${full ? ' full' : ''}`}>
      <label>
        {label}
        {required && <span className="required">*</span>}
        {optional && <span className="optional-badge">optional</span>}
      </label>
      {children}
    </div>
  );
}
