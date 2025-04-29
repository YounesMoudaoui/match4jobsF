import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/JobOfferList.css';
import { useNavigate } from 'react-router-dom';

const JobOfferList = () => {
    const [jobOffers, setJobOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJobOffer, setSelectedJobOffer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobOffers();
    }, []);

    const fetchJobOffers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/job-offers');
            setJobOffers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des offres d\'emploi');
            setLoading(false);
        }
    };

    const handleJobOfferClick = (jobOffer) => {
        setSelectedJobOffer(jobOffer);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJobOffer(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?')) {
            try {
                await axios.delete(`http://localhost:8080/api/job-offers/${id}`);
                setJobOffers(jobOffers.filter(offer => offer.id !== id));
            } catch (error) {
                console.error('Error deleting job offer:', error);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/job-offers/edit/${id}`);
    };

    const formatContractType = (type) => {
        const types = {
            'CDI': 'CDI',
            'CDD': 'CDD',
            'STAGE': 'Stage',
            'ALTERNANCE': 'Alternance'
        };
        return types[type] || type;
    };

    const formatWorkModality = (modality) => {
        const modalities = {
            'PRESENTIEL': 'Présentiel',
            'REMOTE': 'Télétravail',
            'HYBRID': 'Hybride'
        };
        return modalities[modality] || modality;
    };

    // Fonction pour formater les chaînes avec séparateurs
    const formatList = (listString) => {
        if (!listString) return '';
        return listString.split(',').map(item => item.trim()).join(', ');
    };

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;
    if (jobOffers.length === 0) return <div className="no-offers">Aucune offre d'emploi disponible</div>;

    return (
        <div className="job-offer-list">
            <h2>Mes Offres Publiées</h2>
            <div className="job-offers-grid">
                {jobOffers.map((jobOffer) => (
                    <div
                        key={jobOffer.id}
                        className="job-offer-card"
                    >
                        <div className="company-logo">
                            {jobOffer.logoUrl ? (
                                <img src={`http://localhost:8080${jobOffer.logoUrl}`} alt={`Logo ${jobOffer.company}`} />
                            ) : (
                                <div className="logo-placeholder">
                                    {jobOffer.company.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="job-offer-details" onClick={() => handleJobOfferClick(jobOffer)}>
                            <h3>{jobOffer.title}</h3>
                            <p className="company-name">{jobOffer.company}</p>
                            <p className="location">{jobOffer.location}</p>
                            <p className="contract-type">{formatContractType(jobOffer.contractType)}</p>
                            <p className="description">{jobOffer.description.substring(0, 150)}...</p>
                        </div>
                        <div className="job-offer-actions">
                            <button 
                                className="edit-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(jobOffer.id);
                                }}
                            >
                                Modifier
                            </button>
                            <button 
                                className="delete-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(jobOffer.id);
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedJobOffer && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseModal}>&times;</button>
                        <div className="modal-header">
                            <div className="company-logo">
                                {selectedJobOffer.logoUrl ? (
                                    <img src={`http://localhost:8080${selectedJobOffer.logoUrl}`} alt={`Logo ${selectedJobOffer.company}`} />
                                ) : (
                                    <div className="logo-placeholder">
                                        {selectedJobOffer.company.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="job-title">
                                <h2>{selectedJobOffer.title}</h2>
                                <p className="company-name">{selectedJobOffer.company}</p>
                                <p className="location">{selectedJobOffer.location}</p>
                                <p className="contract-type">{formatContractType(selectedJobOffer.contractType)}</p>
                                {selectedJobOffer.contractDuration && (
                                    <p className="contract-duration">Durée: {selectedJobOffer.contractDuration}</p>
                                )}
                                <p className="work-modality">Modalité: {formatWorkModality(selectedJobOffer.workModality)}</p>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="section">
                                <h3>Description</h3>
                                <p>{selectedJobOffer.description}</p>
                            </div>
                            
                            <div className="section">
                                <h3>Compétences techniques</h3>
                                <p>{formatList(selectedJobOffer.technicalSkills)}</p>
                            </div>
                            
                            <div className="section">
                                <h3>Compétences comportementales</h3>
                                <p>{formatList(selectedJobOffer.softSkills)}</p>
                            </div>
                            
                            <div className="section">
                                <h3>Éducation</h3>
                                <p>{selectedJobOffer.education}</p>
                            </div>
                            
                            <div className="section">
                                <h3>Expérience</h3>
                                <p>{selectedJobOffer.experience}</p>
                            </div>
                            
                            {selectedJobOffer.certifications && (
                                <div className="section">
                                    <h3>Certifications</h3>
                                    <p>{formatList(selectedJobOffer.certifications)}</p>
                                </div>
                            )}
                            
                            <div className="section">
                                <h3>Langues</h3>
                                <p>{formatList(selectedJobOffer.languages)}</p>
                            </div>
                            
                            <div className="section">
                                <h3>Rémunération</h3>
                                <p>{selectedJobOffer.salary}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="apply-button">Postuler</button>
                            <button className="delete-button" onClick={() => handleDelete(selectedJobOffer.id)}>Supprimer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobOfferList; 