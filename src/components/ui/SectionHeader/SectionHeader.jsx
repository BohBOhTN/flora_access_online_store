import PropTypes from 'prop-types';
import styles from './SectionHeader.module.css';
import floralDivider from '../../../assets/floral-divider.svg';

/**
 * Reusable Section Header component
 * Used in: HomePage (Categories, New Arrivals, Best Sellers), etc.
 * Usage: <SectionHeader subtitle="Explore" title="Our Categories" />
 */

function SectionHeader({ 
  subtitle, 
  title, 
  showDivider = true,
  centered = true,
  className = '' 
}) {
  const classNames = [
    styles.sectionHeader,
    centered && styles.centered,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <h2 className={styles.title}>{title}</h2>
      {showDivider && (
        <img 
          src={floralDivider} 
          alt="" 
          className={styles.divider} 
          aria-hidden="true" 
        />
      )}
    </div>
  );
}

SectionHeader.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  showDivider: PropTypes.bool,
  centered: PropTypes.bool,
  className: PropTypes.string,
};

export default SectionHeader;
