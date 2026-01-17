import { Link } from 'react-router-dom';
import { Icon } from '../ui';
import { SOCIAL_LINKS, CONTACT_INFO } from '../../constants';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/boutique', label: 'Boutique' },
    { to: '/boutique?isNew=true', label: 'Nouveautés' },
    { to: '/contact', label: 'Contact' },
  ];

  const categoryLinks = [
    { to: '/boutique?category=maquillage', label: 'Maquillage' },
    { to: '/boutique?category=soins', label: 'Soins' },
    { to: '/boutique?category=parfums', label: 'Parfums' },
    { to: '/boutique?category=accessoires', label: 'Accessoires' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.footerLogo}>
              <img 
                src="/assets/FloraLogo.png" 
                alt="Flora Access Shop" 
                className={styles.footerLogoImage}
              />
              <span className={styles.footerLogoText}>
                <span className={styles.footerLogoTitle}>FLORA</span>
                <span className={styles.footerLogoSubtitle}>Access Shop</span>
              </span>
            </div>
            <p className={styles.brandDescription}>
              Votre destination beauté en Tunisie. Découvrez notre sélection de cosmétiques, 
              parfums et soins de qualité premium.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" className={styles.socialLink} aria-label="Facebook">
                <Icon name="facebook" size={20} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="https://instagram.com" className={styles.socialLink} aria-label="Instagram">
                <Icon name="instagram" size={20} />
              </a>
              <a href="https://tiktok.com" className={styles.socialLink} aria-label="TikTok">
                <Icon name="tiktok" size={20} fill="currentColor" strokeWidth={0} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Navigation</h4>
            <nav className={styles.footerLinks}>
              {navigationLinks.map((link) => (
                <Link key={link.to} to={link.to} className={styles.footerLink}>
                  <Icon name="chevronRight" size={14} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Catégories</h4>
            <nav className={styles.footerLinks}>
              {categoryLinks.map((link) => (
                <Link key={link.to} to={link.to} className={styles.footerLink}>
                  <Icon name="chevronRight" size={14} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.contactItem}>
              <Icon name="mapPin" size={18} />
              <span>{CONTACT_INFO.address}</span>
            </div>
            <div className={styles.contactItem}>
              <Icon name="phone" size={18} />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className={styles.contactItem}>
              <Icon name="mail" size={18} />
              <span>{CONTACT_INFO.email}</span>
            </div>
            
            {/* Newsletter */}
            <div className={styles.newsletter}>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterButton}>
                  OK
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} FLORA Access Shop. Tous droits réservés.
          </p>
          <div className={styles.paymentMethods}>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Paiement sécurisé</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
