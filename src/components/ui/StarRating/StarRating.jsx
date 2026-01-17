import PropTypes from 'prop-types';
import styles from './StarRating.module.css';

/**
 * Reusable Star Rating component
 * Usage: <StarRating rating={4.5} showValue />
 */

function StarRating({ 
  rating, 
  maxStars = 5,
  size = 'md',
  showValue = false,
  className = '' 
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const renderStar = (index, type) => {
    const starId = `star-${index}-${Math.random().toString(36).substr(2, 9)}`;
    
    if (type === 'full') {
      return (
        <svg key={index} className={`${styles.star} ${styles[size]}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    
    if (type === 'half') {
      return (
        <svg key={index} className={`${styles.star} ${styles[size]}`} viewBox="0 0 24 24">
          <defs>
            <linearGradient id={starId}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path 
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
            fill={`url(#${starId})`} 
            stroke="currentColor" 
            strokeWidth="1" 
          />
        </svg>
      );
    }
    
    // Empty star
    return (
      <svg key={index} className={`${styles.star} ${styles[size]} ${styles.empty}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  };

  const stars = [];
  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars) {
      stars.push(renderStar(i, 'full'));
    } else if (i === fullStars && hasHalfStar) {
      stars.push(renderStar(i, 'half'));
    } else {
      stars.push(renderStar(i, 'empty'));
    }
  }

  const classNames = [styles.rating, className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className={styles.stars}>{stars}</div>
      {showValue && <span className={`${styles.value} ${styles[size]}`}>({rating})</span>}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  maxStars: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showValue: PropTypes.bool,
  className: PropTypes.string,
};

export default StarRating;
