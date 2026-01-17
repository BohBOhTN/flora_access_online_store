import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Textarea.module.css';

/**
 * Reusable Textarea component with validation states
 * Usage: 
 *   <Textarea name="message" placeholder="Votre message" rows={5} />
 */

const Textarea = forwardRef(function Textarea({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  className = '',
  ...props
}, ref) {
  const classNames = [
    styles.textareaWrapper,
    error && styles.hasError,
    disabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  const currentLength = value?.length || 0;

  return (
    <div className={classNames}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.textareaContainer}>
        <textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className={styles.textarea}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        {maxLength && (
          <span className={styles.charCount}>
            {currentLength}/{maxLength}
          </span>
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

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  className: PropTypes.string,
};

export default Textarea;
