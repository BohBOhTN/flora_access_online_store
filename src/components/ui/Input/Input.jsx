import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './Input.module.css';

/**
 * Reusable Input component with icon support and validation states
 * Usage: 
 *   <Input name="email" type="email" placeholder="Email" />
 *   <Input name="search" icon="search" placeholder="Rechercher..." />
 */

const Input = forwardRef(function Input({
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  icon,
  iconPosition = 'left',
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) {
  const classNames = [
    styles.inputWrapper,
    error && styles.hasError,
    disabled && styles.disabled,
    icon && styles[`icon${iconPosition.charAt(0).toUpperCase() + iconPosition.slice(1)}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputContainer}>
        {icon && iconPosition === 'left' && (
          <Icon name={icon} size={18} className={styles.icon} />
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={styles.input}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <Icon name={icon} size={18} className={styles.icon} />
        )}
      </div>
      {error && (
        <span id={`${name}-error`} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'tel', 'password', 'number', 'search']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
