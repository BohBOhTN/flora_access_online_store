import PropTypes from 'prop-types';
import styles from './Badge.module.css';

/**
 * Reusable Badge component for product labels
 * Usage: <Badge variant="new">Nouveau</Badge>
 */

function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}) {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'new', 'sale', 'outOfStock', 'lowStock', 'inStock']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Badge;
