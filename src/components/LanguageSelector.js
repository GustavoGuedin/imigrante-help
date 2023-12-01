import React from 'react';
import { withTranslation } from 'react-i18next';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function LanguageSelector({ i18n }) {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { t } = useTranslation();

  return (
    <NavDropdown title={t('idioma')} id="basic-nav-dropdown">
      <NavDropdown.Item onClick={() => changeLanguage("pt")}>Português</NavDropdown.Item>
      <NavDropdown.Item onClick={() => changeLanguage("en")}>English</NavDropdown.Item>
      <NavDropdown.Item onClick={() => changeLanguage("es")}>Español</NavDropdown.Item>
      <NavDropdown.Item onClick={() => changeLanguage("fr")}>Français</NavDropdown.Item>
    </NavDropdown>
  );
}

export default withTranslation()(LanguageSelector);