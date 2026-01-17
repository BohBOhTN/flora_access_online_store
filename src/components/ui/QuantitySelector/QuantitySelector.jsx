import PropTypes from 'prop-types';
import styles from './QuantitySelector.module.css';

/**
 * Reusable Quantity Selector component
 * Usage: <QuantitySelector value={1} min={1} max={10} onChange={setQty} />
 */

function QuantitySelector({ 
  value, 
  min = 1, 
  max = 99,
  size = 'md',
  onChange,
  disabled = false,
  className = '' 
}) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const classNames = [
    styles.selector,
    styles[size],
    disabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <button
        type="button"
        className={styles.button}
        onClick={decrease}
        disabled={disabled || value <= min}
        aria-label="Diminuer la quantité"
      >
        −
      </button>
      <span className={styles.value}>{value}</span>
      <button
        type="button"
        className={styles.button}
        onClick={increase}
        disabled={disabled || value >= max}
        aria-label="Augmenter la quantité"
      >
        +
      </button>
    </div>
  );
}

QuantitySelector.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default QuantitySelector;
