import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateJobOffer.css';

const CreateJobOffer = () => {
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
    });
    const [logo, setLogo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            formDataToSend.append('jobOffer', new Blob([JSON.stringify(formData)], {
                type: 'application/json'
            }));
            if (logo) {
                formDataToSend.append('logo', logo);
            }

            const response = await axios.post('http://localhost:8080/api/job-offers', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess('Offre d\'emploi créée avec succès !');
            setFormData({
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
            });
            setLogo(null);
        } catch (err) {
            setError('Erreur lors de la création de l\'offre d\'emploi. Veuillez réessayer.');
            console.error('Error:', err);
        }
    };

    return (
        <div className="create-job-offer">
            <h2>Créer une nouvelle offre d'emploi</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleSubmit} className="job-offer-form">
                <div className="form-group half-width">
                    <label htmlFor="title">Titre du poste *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group half-width">
                    <label htmlFor="company">Entreprise *</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group half-width">
                    <label htmlFor="location">Localisation *</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group half-width">
                    <label htmlFor="contractType">Type de contrat *</label>
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

                <div className="form-group full-width">
                    <label htmlFor="description">Description détaillée *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div className="form-group half-width">
                    <label htmlFor="technicalSkills">Compétences techniques *</label>
                    <textarea
                        id="technicalSkills"
                        name="technicalSkills"
                        value={formData.technicalSkills}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="small"
                        placeholder="Ex: Java, Spring Boot, React, etc."
                    ></textarea>
                </div>

                <div className="form-group half-width">
                    <label htmlFor="softSkills">Compétences comportementales *</label>
                    <textarea
                        id="softSkills"
                        name="softSkills"
                        value={formData.softSkills}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="small"
                        placeholder="Ex: Travail en équipe, Communication, etc."
                    ></textarea>
                </div>

                <div className="form-group half-width">
                    <label htmlFor="education">Éducation demandée *</label>
                    <textarea
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        required
                        rows="2"
                        className="small"
                        placeholder="Ex: Bac+5 en informatique"
                    ></textarea>
                </div>

                <div className="form-group half-width">
                    <label htmlFor="experience">Expérience souhaitée *</label>
                    <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        rows="2"
                        className="small"
                        placeholder="Ex: 3-5 ans d'expérience"
                    ></textarea>
                </div>

                <div className="form-group half-width">
                    <label htmlFor="certifications">Certifications</label>
                    <textarea
                        id="certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        rows="2"
                        className="small"
                        placeholder="Ex: AWS Certified, Scrum Master"
                    ></textarea>
                </div>

                <div className="form-group half-width">
                    <label htmlFor="languages">Langues requises *</label>
                    <textarea
                        id="languages"
                        name="languages"
                        value={formData.languages}
                        onChange={handleInputChange}
                        required
                        rows="2"
                        className="small"
                        placeholder="Ex: Français (courant), Anglais (intermédiaire)"
                    ></textarea>
                </div>

                <div className="form-group half-width">
                    <label htmlFor="salary">Rémunération *</label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: 15000 Dhs"
                    />
                </div>

                <div className="form-group half-width">
                    <label htmlFor="workModality">Modalité de travail *</label>
                    <select
                        id="workModality"
                        name="workModality"
                        value={formData.workModality}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="PRESENTIEL">Présentiel</option>
                        <option value="HYBRIDE">Hybride</option>
                        <option value="DISTANCIEL">Distanciel</option>
                    </select>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="logo">Logo de l'entreprise</label>
                    <input
                        type="file"
                        id="logo"
                        name="logo"
                        onChange={handleLogoChange}
                        accept="image/*"
                    />
                </div>

                <button type="submit" className="submit-button">
                    Publier l'offre d'emploi
                </button>
            </form>
        </div>
    );
};

export default CreateJobOffer; 