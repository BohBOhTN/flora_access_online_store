import PropTypes from 'prop-types';
import ProductCard from '../../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

/**
 * Reusable Product Grid component
 * Usage: <ProductGrid products={products} columns={4} />
 */

function ProductGrid({ 
  products, 
  columns = 4,
  emptyMessage = "Aucun produit trouvé",
  emptyAction,
  className = '' 
}) {
  const classNames = [
    styles.grid,
    styles[`cols${columns}`],
    className,
  ].filter(Boolean).join(' ');

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M8 11h6" />
        </svg>
        <h3 className={styles.emptyTitle}>{emptyMessage}</h3>
        <p className={styles.emptyText}>
          Essayez de modifier vos critères de recherche ou de supprimer certains filtres.
        </p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className={classNames}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  columns: PropTypes.oneOf([2, 3, 4]),
  emptyMessage: PropTypes.string,
  emptyAction: PropTypes.node,
  className: PropTypes.string,
};

export default ProductGrid;
