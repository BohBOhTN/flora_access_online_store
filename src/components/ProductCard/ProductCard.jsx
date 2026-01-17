import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { Icon, Badge, StarRating } from '../ui';
import { formatPrice, getCategoryLabel } from '../../utils/formatters';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, name, price, category, image, isNew, rating, stock, colors } = product;

  const isOutOfStock = stock === 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  return (
    <article className={`${styles.card} ${isOutOfStock ? styles.outOfStock : ''}`}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <Link to={`/produit/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className={styles.productImage}
            loading="lazy"
          />
        </Link>

        {/* New Badge */}
        {isNew && (
          <Badge variant="new" className={styles.badge}>
            Nouveau
          </Badge>
        )}

        {/* Quick Action - Wishlist */}
        <button 
          className={styles.quickAction}
          aria-label="Ajouter aux favoris"
        >
          <Icon name="heart" size={18} />
        </button>
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Category */}
        <span className={styles.category}>
          {getCategoryLabel(category)}
        </span>

        {/* Title */}
        <h3 className={styles.title}>
          <Link to={`/produit/${id}`} className={styles.titleLink}>
            {name}
          </Link>
        </h3>

        {/* Rating */}
        {rating && (
          <StarRating rating={rating} showValue size="md" />
        )}

        {/* Color Options - Always render for consistent height */}
        {colors && colors.length > 0 ? (
          <div className={styles.colors}>
            {colors.slice(0, 4).map((color, index) => (
              <span 
                key={index}
                className={styles.colorSwatch}
                style={{ backgroundColor: color }}
                title={`Couleur ${index + 1}`}
              />
            ))}
            {colors.length > 4 && (
              <span className={styles.colorMore}>+{colors.length - 4}</span>
            )}
          </div>
        ) : (
          <div className={styles.colorsPlaceholder}></div>
        )}

        {/* Price */}
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            {formatPrice(price)} <span className={styles.currency}>DT</span>
          </span>
        </div>

        {/* Add to Cart Button */}
        <button 
          className={styles.addButton}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          <Icon name="cart" size={16} />
          {isOutOfStock ? 'Indisponible' : 'Ajouter'}
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    rating: PropTypes.number,
    stock: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProductCard;
