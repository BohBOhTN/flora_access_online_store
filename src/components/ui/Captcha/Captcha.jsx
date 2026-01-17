import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './Captcha.module.css';

/**
 * Reusable Captcha component - can be upgraded to Google reCAPTCHA or hCaptcha
 * Currently implements a simple math challenge
 * 
 * Usage: 
 *   <Captcha onVerify={(isValid) => setIsCaptchaValid(isValid)} />
 * 
 * Future upgrade path:
 *   - Add provider prop: 'simple' | 'recaptcha' | 'hcaptcha'
 *   - Add siteKey prop for external providers
 */

// Generate random math problem
const generateChallenge = () => {
  const operations = ['+', '-', '×'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1, num2, answer;
  
  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 10) + 5;
      num2 = Math.floor(Math.random() * num1);
      answer = num1 - num2;
      break;
    case '×':
      num1 = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      answer = num1 * num2;
      break;
    default:
      num1 = 1;
      num2 = 1;
      answer = 2;
  }
  
  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer: answer.toString(),
  };
};

function Captcha({
  onVerify,
  label = 'Vérification de sécurité',
  error,
  className = '',
}) {
  const [challenge, setChallenge] = useState(generateChallenge);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const refreshChallenge = useCallback(() => {
    setChallenge(generateChallenge());
    setUserAnswer('');
    setIsVerified(false);
    setHasAttempted(false);
    onVerify?.(false);
  }, [onVerify]);

  // Reset on mount
  useEffect(() => {
    refreshChallenge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserAnswer(value);
    setHasAttempted(false);
    setIsVerified(false);
    onVerify?.(false);
  };

  const handleVerify = () => {
    setHasAttempted(true);
    const isCorrect = userAnswer.trim() === challenge.answer;
    setIsVerified(isCorrect);
    onVerify?.(isCorrect);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleVerify();
    }
  };

  const classNames = [
    styles.captcha,
    isVerified && styles.verified,
    hasAttempted && !isVerified && styles.invalid,
    error && styles.hasError,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <label className={styles.label}>{label}</label>
      <div className={styles.challengeContainer}>
        <div className={styles.challenge}>
          <Icon name="shield" size={20} className={styles.shieldIcon} />
          <span className={styles.question}>{challenge.question}</span>
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={userAnswer}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Réponse"
            className={styles.input}
            disabled={isVerified}
            aria-label="Réponse au captcha"
          />
          <button
            type="button"
            onClick={handleVerify}
            className={styles.verifyButton}
            disabled={isVerified || !userAnswer.trim()}
          >
            {isVerified ? (
              <Icon name="check" size={16} />
            ) : (
              'Vérifier'
            )}
          </button>
          <button
            type="button"
            onClick={refreshChallenge}
            className={styles.refreshButton}
            aria-label="Nouveau captcha"
            title="Nouveau captcha"
          >
            <Icon name="refresh" size={16} />
          </button>
        </div>
      </div>
      {isVerified && (
        <span className={styles.successMessage}>
          <Icon name="checkCircle" size={14} />
          Vérifié avec succès
        </span>
      )}
      {hasAttempted && !isVerified && (
        <span className={styles.errorMessage}>
          Réponse incorrecte. Réessayez.
        </span>
      )}
      {error && !hasAttempted && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
}

Captcha.propTypes = {
  onVerify: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Captcha;
