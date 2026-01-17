import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './Button.module.css';

/**
 * Reusable Button component with multiple variants
 * Usage: 
 *   <Button variant="primary">Click me</Button>
 *   <Button variant="secondary" to="/shop">Go to shop</Button>
 *   <Button variant="icon" icon="heart" aria-label="Like" />
 */

function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  to,
  href,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className={styles.icon} />
      )}
      {children && <span className={styles.text}>{children}</span>}
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className={styles.icon} />
      )}
    </>
  );

  // Render as Link if "to" prop is provided (internal navigation)
  if (to) {
    return (
      <Link to={to} className={classNames} {...props}>
        {content}
      </Link>
    );
  }

  // Render as anchor if "href" prop is provided (external link)
  if (href) {
    return (
      <a 
        href={href} 
        className={classNames} 
        target="_blank" 
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'icon']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  to: PropTypes.string,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
