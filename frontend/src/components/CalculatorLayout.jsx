
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const CalculatorLayout = ({
  calculators,
  activeCalculator,
  onSelect,
  children,
}) => {
  return (
    <div className="app">
      <Navbar />

      <div className="calculator-page">
        <Sidebar
          calculators={calculators}
          activeCalculator={activeCalculator}
          onSelect={onSelect}
        />

        <main className="calculator-main">
          {children}
        </main>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-company">
            <strong>Essential Aquatech - </strong>
            <span>
              Building the Intelligence Layer for Aquaculture
            </span>
          </div>

          <div className="footer-links">
            <a
              href="https://fishhaat.com"
              target="_blank"
              rel="noreferrer"
            >
              FishHaat
            </a>

            <a
              href="https://essentialaquatech.in"
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Essential Aquatech. All rights reserved.
        </div>






{/* Floating Action Buttons */}
<div className="floating-actions">

  {/* MeenAmma WhatsApp */}
  <a
    href="https://wa.me/919046226703"
    target="_blank"
    rel="noreferrer"
    className="floating-action meenamma-action"
    aria-label="Ask anything about fish farming to MeenAmma"
  >
    <span className="floating-action-icon whatsapp-icon">
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L.05 24l6.3-1.65a11.88 11.88 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.44-8.42ZM12.06 21.8a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.88 9.88 0 1 1 8.37 4.63Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </span>

    <span className="floating-action-text">
      <strong>Ask MeenAmma</strong>
      <small>Ask anything about fish farming</small>
    </span>
  </a>


  {/* FishHaat Products */}
  <a
    href="https://fishhaat.com"
    target="_blank"
    rel="noreferrer"
    className="floating-action fishhaat-action"
    aria-label="Fish Farming Products - FishHaat"
  >
    <span className="fishhaat-logo-wrap">
      <img
        src="/logo.jpeg"
        alt="FishHaat"
        className="fishhaat-floating-logo"
      />
    </span>

    <span className="floating-action-text">
      <strong>Fish Farming Products</strong>
      <small>Shop on FishHaat</small>
    </span>
  </a>

</div>






        
      </footer>
    </div>
  );
};

export default CalculatorLayout;
