import "./Input.css";

export function Input({ error, ...props }) {
  return (
    <>
      <input {...props} className="input" />
      {error && <div className="error">{error}</div>}
    </>
  );
}
