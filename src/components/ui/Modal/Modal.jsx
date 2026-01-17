import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './Modal.module.css';

/**
 * Modal component for dialogs, alerts, and confirmations
 * Usage:
 *   <Modal isOpen={isOpen} onClose={handleClose} title="Success">
 *     <p>Your action was successful!</p>
 *   </Modal>
 */
function Modal({
  isOpen,
  onClose,
  title,
  children,
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  icon,
  actions,
  size = 'md',
}) {
  // Handle escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [onClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles[size]} ${styles[variant]}`}>
        {showCloseButton && (
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fermer"
          >
            <Icon name="close" size={20} />
          </button>
        )}

        {icon && (
          <div className={`${styles.iconContainer} ${styles[`icon${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
            <Icon name={icon} size={40} />
          </div>
        )}

        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.content}>
          {children}
        </div>

        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'success', 'error', 'warning', 'info']),
  showCloseButton: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  icon: PropTypes.string,
  actions: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Modal;
