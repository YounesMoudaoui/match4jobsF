import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/UpdateJobOffer.css';

const UpdateJobOffer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        contractType: 'CDI',
        description: '',
        technicalSkills: '',
        softSkills: '',
        education: '',
        experience: '',
        certifications: '',
        languages: '',
        salary: '',
        contractDuration: '',
        workModality: 'PRESENTIEL',
        logoUrl: '',
    });
    const [logo, setLogo] = useState(null);
    const [currentLogo, setCurrentLogo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchJobOffer = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/job-offers/${id}`);
                if (response.data) {
                    setFormData(response.data);
                    if (response.data.logoUrl) {
                        setCurrentLogo(response.data.logoUrl);
                    }
                } else {
                    setError('Aucune donnée reçue du serveur');
                }
            } catch (err) {
                setError('Erreur lors du chargement de l\'offre d\'emploi');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobOffer();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const formDataToSend = new FormData();
            
            // Créer un objet avec les données du formulaire
            const jobOfferData = {
                ...formData,
                // Assurez-vous que les champs sont correctement nommés
                title: formData.title,
                company: formData.company,
                location: formData.location,
                contractType: formData.contractType,
                description: formData.description,
                technicalSkills: formData.technicalSkills,
                softSkills: formData.softSkills,
                education: formData.education,
                experience: formData.experience,
                certifications: formData.certifications,
                languages: formData.languages,
                salary: formData.salary,
                contractDuration: formData.contractDuration,
                workModality: formData.workModality,
                logoUrl: formData.logoUrl
            };
            
            // Ajouter l'objet jobOffer au FormData
            formDataToSend.append('jobOffer', new Blob([JSON.stringify(jobOfferData)], {
                type: 'application/json'
            }));
            
            // Ajouter le logo si un nouveau a été sélectionné
            if (logo) {
                formDataToSend.append('logo', logo);
            }

            // Envoyer la requête
            const response = await axios.put(`http://localhost:8080/api/job-offers/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Réponse du serveur:', response.data);
            setSuccess('Offre d\'emploi mise à jour avec succès !');
            
            // Rediriger vers la liste des offres après un court délai
            setTimeout(() => {
                navigate('/job-list');
            }, 2000);
        } catch (err) {
            setError('Erreur lors de la mise à jour de l\'offre d\'emploi. Veuillez réessayer.');
            console.error('Error:', err);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Chargement de l'offre d'emploi...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={() => navigate('/job-offers')} className="back-button">
                    Retour à la liste
                </button>
            </div>
        );
    }

    return (
        <div className="create-job-offer-container update-job-offer-container">
            <h2>Modifier l'offre d'emploi</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit} className="job-offer-form">
                <div className="form-group">
                    <label htmlFor="title">Titre du poste</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="company">Entreprise</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Localisation</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contractType">Type de contrat</label>
                    <select
                        id="contractType"
                        name="contractType"
                        value={formData.contractType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="STAGE">Stage</option>
                        <option value="ALTERNANCE">Alternance</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="technicalSkills">Compétences techniques (séparées par des virgules)</label>
                    <input
                        type="text"
                        id="technicalSkills"
                        name="technicalSkills"
                        value={formData.technicalSkills}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="softSkills">Compétences comportementales (séparées par des virgules)</label>
                    <input
                        type="text"
                        id="softSkills"
                        name="softSkills"
                        value={formData.softSkills}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="education">Formation requise</label>
                    <input
                        type="text"
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="experience">Expérience requise</label>
                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="certifications">Certifications (séparées par des virgules)</label>
                    <input
                        type="text"
                        id="certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="languages">Langues (séparées par des virgules)</label>
                    <input
                        type="text"
                        id="languages"
                        name="languages"
                        value={formData.languages}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Rémunération</label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contractDuration">Durée du contrat</label>
                    <input
                        type="text"
                        id="contractDuration"
                        name="contractDuration"
                        value={formData.contractDuration}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="workModality">Modalité de travail</label>
                    <select
                        id="workModality"
                        name="workModality"
                        value={formData.workModality}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="PRESENTIEL">Présentiel</option>
                        <option value="REMOTE">Télétravail</option>
                        <option value="HYBRID">Hybride</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="logo">Logo de l'entreprise</label>
                    {currentLogo && (
                        <div className="current-logo">
                            <img 
                                src={`http://localhost:8080${currentLogo}`} 
                                alt="Logo actuel" 
                                className="logo-preview"
                            />
                            <p>Logo actuel</p>
                        </div>
                    )}
                    <input
                        type="file"
                        id="logo"
                        name="logo"
                        onChange={handleLogoChange}
                        accept="image/*"
                    />
                    <p className="help-text">Laissez vide pour conserver le logo actuel</p>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">Mettre à jour</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateJobOffer; 