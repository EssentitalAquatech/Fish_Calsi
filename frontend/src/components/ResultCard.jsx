function ResultCard({ title, value, unit, items = [] }) {
  return (
    <div className="result-card">
      <div className="result-label">
        {title}
      </div>

      <div className="result-main">
        {value}
        {unit && (
          <span className="result-unit">
            {unit}
          </span>
        )}
      </div>

      {items.length > 0 && (
        <div className="result-details">
          {items.map((item, index) => (
            <div className="result-row" key={index}>
              <span>{item.label}</span>
              <strong>
                {item.value}
                {item.unit ? ` ${item.unit}` : ""}
              </strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultCard;