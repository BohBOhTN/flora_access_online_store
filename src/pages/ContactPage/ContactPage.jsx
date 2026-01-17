import { useState } from 'react';
import { PageHeader, Icon, Input, Textarea, Button, Captcha } from '../../components/ui';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';
import styles from './ContactPage.module.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    if (!isCaptchaValid) {
      newErrors.captcha = 'Veuillez compléter la vérification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsCaptchaValid(false);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: 'mapPin',
      title: 'Adresse',
      content: CONTACT_INFO.address,
    },
    {
      icon: 'phone',
      title: 'Téléphone',
      content: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
    },
    {
      icon: 'mail',
      title: 'Email',
      content: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      icon: 'clock',
      title: 'Horaires',
      content: CONTACT_INFO.workingHours,
    },
  ];

  return (
    <div className={styles.contactPage}>
      <PageHeader
        title="Contactez-nous"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Contact' },
        ]}
      />

      <div className={styles.content}>
        <div className={styles.container}>
          {/* Intro Section */}
          <div className={styles.intro}>
            <h2 className={styles.introTitle}>Nous sommes à votre écoute</h2>
            <p className={styles.introText}>
              Une question sur nos produits ? Besoin d'un conseil beauté personnalisé ? 
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
            </p>
          </div>

          <div className={styles.grid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <Icon name="mail" size={24} className={styles.cardIcon} />
                  Envoyez-nous un message
                </h3>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <Icon name="checkCircle" size={20} />
                    <span>Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessageBox}>
                    <Icon name="close" size={20} />
                    <span>Une erreur s'est produite. Veuillez réessayer.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <Input
                      name="name"
                      label="Nom complet"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                      icon="user"
                    />
                    <Input
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                      icon="mail"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <Input
                      name="phone"
                      type="tel"
                      label="Téléphone"
                      placeholder="+216 XX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      icon="phone"
                    />
                    <Input
                      name="subject"
                      label="Sujet"
                      placeholder="Sujet de votre message"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      required
                    />
                  </div>

                  <Textarea
                    name="message"
                    label="Message"
                    placeholder="Écrivez votre message ici..."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                    rows={5}
                    maxLength={1000}
                  />

                  <Captcha
                    onVerify={setIsCaptchaValid}
                    error={errors.captcha}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info & Map */}
            <div className={styles.infoSection}>
              {/* Contact Details */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <Icon name="mapPin" size={24} className={styles.cardIcon} />
                  Nos coordonnées
                </h3>
                <div className={styles.contactList}>
                  {contactDetails.map((item) => (
                    <div key={item.title} className={styles.contactItem}>
                      <div className={styles.contactIcon}>
                        <Icon name={item.icon} size={20} />
                      </div>
                      <div className={styles.contactContent}>
                        <span className={styles.contactLabel}>{item.title}</span>
                        {item.href ? (
                          <a href={item.href} className={styles.contactLink}>
                            {item.content}
                          </a>
                        ) : (
                          <span className={styles.contactValue}>{item.content}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className={styles.socialSection}>
                  <span className={styles.socialLabel}>Suivez-nous</span>
                  <div className={styles.socialLinks}>
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={social.label}
                      >
                        <Icon name={social.icon} size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>
                  <Icon name="mapPin" size={24} className={styles.cardIcon} />
                  Notre boutique
                </h3>
                <div className={styles.mapContainer}>
                  <iframe
                    title="Localisation Flora Access Shop"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${CONTACT_INFO.mapCoordinates.lng - 0.003}%2C${CONTACT_INFO.mapCoordinates.lat - 0.002}%2C${CONTACT_INFO.mapCoordinates.lng + 0.003}%2C${CONTACT_INFO.mapCoordinates.lat + 0.002}&layer=mapnik&marker=${CONTACT_INFO.mapCoordinates.lat}%2C${CONTACT_INFO.mapCoordinates.lng}`}
                    className={styles.map}
                    loading="lazy"
                  />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${CONTACT_INFO.mapCoordinates.lat},${CONTACT_INFO.mapCoordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  <Icon name="externalLink" size={14} />
                  Voir sur Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
