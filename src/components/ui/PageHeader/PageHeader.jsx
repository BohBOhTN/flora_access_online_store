import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './PageHeader.module.css';
import floralDecor from '../../../assets/floral-decoration.svg';

/**
 * Reusable Page Header with breadcrumb navigation
 * Usage: <PageHeader title="La Boutique" breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Boutique' }]} />
 */

function PageHeader({ 
  title, 
  breadcrumbs = [],
  showFloral = true,
  className = '' 
}) {
  const classNames = [styles.pageHeader, className].filter(Boolean).join(' ');

  return (
    <header className={classNames}>
      {showFloral && (
        <>
          <img 
            src={floralDecor} 
            alt="" 
            className={`${styles.floral} ${styles.floralLeft}`} 
            aria-hidden="true" 
          />
          <img 
            src={floralDecor} 
            alt="" 
            className={`${styles.floral} ${styles.floralRight}`} 
            aria-hidden="true" 
          />
        </>
      )}
      
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        
        {breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className={styles.crumbItem}>
                {crumb.to ? (
                  <Link to={crumb.to} className={styles.crumbLink}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={styles.crumbCurrent}>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className={styles.separator}>/</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ),
  showFloral: PropTypes.bool,
  className: PropTypes.string,
};

export default PageHeader;
