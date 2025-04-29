import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Recrutez les meilleurs talents avec <span className="highlight">Web4Jobs</span></h1>
          <p className="hero-subtitle">La plateforme qui vous aide à trouver les candidats idéaux pour vos postes</p>
          <div className="hero-buttons">
            <Link to="/create-job-offer" className="btn btn-primary">Publier une offre d'emploi</Link>
            <Link to="/job-list" className="btn btn-secondary">Voir mes offres publiées</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Pourquoi choisir Web4Jobs pour vos recrutements ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Précision</h3>
            <p>Des profils ciblés et qualifiés qui correspondent exactement à vos besoins</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Rapidité</h3>
            <p>Processus de recrutement accéléré avec des candidats pré-qualifiés</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Simplicité</h3>
            <p>Interface intuitive pour gérer vos offres et suivre vos candidatures</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Performance</h3>
            <p>Statistiques détaillées sur la visibilité de vos offres</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Prêt à recruter vos futurs talents ?</h2>
          <p>Rejoignez les entreprises qui font confiance à Web4Jobs pour leurs recrutements</p>
          <Link to="/create-job-offer" className="btn btn-primary btn-large">Publier une offre maintenant</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 