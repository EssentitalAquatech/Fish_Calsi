import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="app-navbar">
      {/* Left - Company */}
      <div className="navbar-left">
        <img
          src="https://res.cloudinary.com/p8fs2e1n/image/upload/v1779070641/Logo1.png"
          alt="Essential Aquatech"
          className="company-logo"
        />

        <div className="company-info">
          <div className="company-name">
            Essential Aquatech
          </div>

          <div className="company-subtitle">
            Intelligent Aquaculture Solutions
          </div>
        </div>
      </div>

      {/* Center - Title */}
      <div className="navbar-center">
        <h1>
          {t("app.title", "Fish Farming Calculator")}
        </h1>
      </div>

      {/* Right - Language */}
     <div className="navbar-right">
  <span className="language-icon" title="Choose Language">
    🌐
  </span>

  <LanguageSelector />
</div>
    </header>
  );
};

export default Navbar;