import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Icon, Badge, StarRating, QuantitySelector, Button } from '../../components/ui';
import { products, categories } from '../../data/products';
import { formatPrice, getCategoryLabel, getStockStatus } from '../../utils/formatters';
import floralDecor from '../../assets/floral-decoration.svg';
import styles from './ProductPage.module.css';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Find product by id
  const product = products.find(p => p.id === parseInt(id));
  
  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedColor(product?.colors?.[0] || null);
    setShowSuccess(false);
  }, [id, product]);

  if (!product) {
    return (
      <div className={styles.productPage}>
        <div className={styles.productSection}>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>Produit non trouvé</h2>
            <p>Désolé, ce produit n'existe pas.</p>
            <Button to="/boutique" variant="primary" style={{ marginTop: '1rem' }}>
              Retour à la boutique
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { name, price, category, brand, description, image, colors, stock, isNew, rating } = product;

  // Get category name
  const categoryName = getCategoryLabel(category, categories);

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Get stock status with CSS class mapping
  const stockInfo = getStockStatus(stock);
  const stockStatusClass = {
    'En stock': styles.inStock,
    'Rupture de stock': styles.outOfStock,
  }[stockInfo.label] || styles.lowStock;

  return (
    <div className={styles.productPage}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <div className={styles.breadcrumbInner}>
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>Accueil</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link to="/boutique" className={styles.breadcrumbLink}>Boutique</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link to={`/boutique?category=${category}`} className={styles.breadcrumbLink}>
              {categoryName}
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className={styles.productSection}>
        <div className={styles.productGrid}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              {/* Floral Decorations */}
              <img 
                src={floralDecor} 
                alt="" 
                className={`${styles.floralOverlay} ${styles.floralTopLeft}`}
                aria-hidden="true"
              />
              <img 
                src={floralDecor} 
                alt="" 
                className={`${styles.floralOverlay} ${styles.floralBottomRight}`}
                aria-hidden="true"
              />

              {/* Badges */}
              <div className={styles.imageBadges}>
                {isNew && <span className={`${styles.badge} ${styles.badgeNew}`}>Nouveau</span>}
              </div>

              {/* Main Image */}
              <img 
                src={image} 
                alt={name} 
                className={styles.mainImage}
              />
            </div>

            {/* Thumbnail Gallery (placeholder for multiple images) */}
            <div className={styles.thumbnailGallery}>
              <button className={`${styles.thumbnail} ${styles.active}`}>
                <img src={image} alt={`${name} - Vue 1`} />
              </button>
              <button className={styles.thumbnail}>
                <img src={image} alt={`${name} - Vue 2`} />
              </button>
              <button className={styles.thumbnail}>
                <img src={image} alt={`${name} - Vue 3`} />
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className={styles.detailsSection}>
            {/* Category & Brand */}
            <span className={styles.productCategory}>{brand}</span>

            {/* Title */}
            <h1 className={styles.productTitle}>{name}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <StarRating rating={rating} showValue />
              <span className={styles.reviewCount}>12 avis</span>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              <span className={styles.price}>
                {formatPrice(price)} <span className={styles.currency}>DT</span>
              </span>
            </div>

            {/* Description */}
            <p className={styles.description}>{description}</p>

            <div className={styles.divider}></div>

            {/* Color Selection */}
            {colors && colors.length > 0 && (
              <div className={styles.optionSection}>
                <span className={styles.optionLabel}>
                  Couleur: <span style={{ fontWeight: 'normal', color: 'var(--color-text-muted)' }}>
                    {selectedColor ? 'Sélectionnée' : 'Choisir'}
                  </span>
                </span>
                <div className={styles.colorOptions}>
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`${styles.colorSwatch} ${selectedColor === color ? styles.selected : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Couleur ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className={styles.optionSection}>
              <span className={styles.optionLabel}>Quantité</span>
              <QuantitySelector
                value={quantity}
                min={1}
                max={stock}
                onChange={handleQuantityChange}
                disabled={stock === 0}
              />
            </div>

            {/* Stock Status */}
            <div className={`${styles.stockStatus} ${stockStatusClass}`}>
              <span className={styles.stockDot}></span>
              {stockInfo.label}
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button 
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={stock === 0}
              >
                <Icon name="shoppingBag" size={20} />
                Ajouter au panier
              </button>
              <button className={styles.wishlistButton} aria-label="Ajouter aux favoris">
                <Icon name="heart" size={20} />
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className={styles.successMessage}>
                <Icon name="check" size={20} />
                Produit ajouté au panier avec succès !
              </div>
            )}

            {/* Info Cards */}
            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <Icon name="truck" size={20} />
                <span className={styles.infoCardText}>Livraison rapide</span>
              </div>
              <div className={styles.infoCard}>
                <Icon name="shield" size={20} />
                <span className={styles.infoCardText}>100% Authentique</span>
              </div>
              <div className={styles.infoCard}>
                <Icon name="refresh" size={20} />
                <span className={styles.infoCardText}>Retour gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
