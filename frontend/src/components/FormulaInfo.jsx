function FormulaInfo({ title, children, source }) {
  return (
    <div className="formula-info">
      <h3>{title}</h3>

      <div className="formula-content">
        {children}
      </div>

      {source && (
        <p className="formula-source">
          Source: {source}
        </p>
      )}
    </div>
  );
}

export default FormulaInfo;