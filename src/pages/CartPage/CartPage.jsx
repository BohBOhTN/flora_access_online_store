import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Icon, PageHeader, QuantitySelector, Button, Modal } from '../../components/ui';
import { formatPrice } from '../../utils/formatters';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, PROMO_CODES } from '../../constants';
import styles from './CartPage.module.css';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  
  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoModal, setPromoModal] = useState({ isOpen: false, type: null, message: '' });

  const subtotal = getCartTotal();
  
  // Calculate discount based on applied promo
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    if (appliedPromo.type === 'percentage') {
      return (subtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'fixed') {
      return appliedPromo.value;
    }
    return 0;
  };

  const discount = calculateDiscount();
  
  // Free shipping if promo or threshold met
  const isFreeShipping = appliedPromo?.type === 'free_shipping' || (subtotal - discount) >= FREE_SHIPPING_THRESHOLD;
  const shipping = isFreeShipping ? 0 : SHIPPING_COST;
  
  const total = subtotal - discount + shipping;

  // Handle promo code submission
  const handleApplyPromo = (e) => {
    e.preventDefault();
    
    const code = promoCode.trim().toUpperCase();
    
    if (!code) {
      setPromoModal({
        isOpen: true,
        type: 'error',
        message: 'Veuillez entrer un code promo.',
      });
      return;
    }

    const promo = PROMO_CODES[code];
    
    if (!promo) {
      setPromoModal({
        isOpen: true,
        type: 'error',
        message: 'Ce code promo n\'existe pas ou a expiré.',
      });
      return;
    }

    if (promo.minOrder > 0 && subtotal < promo.minOrder) {
      setPromoModal({
        isOpen: true,
        type: 'error',
        message: `Ce code nécessite un minimum de commande de ${promo.minOrder} DT. Votre panier actuel est de ${formatPrice(subtotal)} DT.`,
      });
      return;
    }

    // Success - apply the promo
    setAppliedPromo(promo);
    setPromoCode('');
    setPromoModal({
      isOpen: true,
      type: 'success',
      message: `Code "${promo.code}" appliqué avec succès ! ${promo.description}`,
    });
  };

  // Remove applied promo
  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const closeModal = () => {
    setPromoModal({ isOpen: false, type: null, message: '' });
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartPage}>
        {/* Page Header */}
        <PageHeader 
          title="Mon Panier"
          breadcrumbs={[
            { label: 'Accueil', to: '/' },
            { label: 'Panier' }
          ]}
          showFloral={false}
        />

        {/* Empty Cart */}
        <div className={styles.cartContent}>
          <div className={styles.emptyCart}>
            <Icon name="shoppingBag" size={64} className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Votre panier est vide</h2>
            <p className={styles.emptyText}>
              Découvrez notre collection et ajoutez vos produits préférés !
            </p>
            <Button to="/boutique" variant="primary" size="lg">
              Continuer mes achats
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      {/* Page Header */}
      <PageHeader 
        title="Mon Panier"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: `Panier (${cartItems.length} article${cartItems.length > 1 ? 's' : ''})` }
        ]}
        showFloral={false}
      />

      {/* Cart Content */}
      <div className={styles.cartContent}>
        <div className={styles.cartLayout}>
          {/* Cart Items */}
          <div className={styles.cartItems}>
            {/* Table Header - Desktop */}
            <div className={styles.cartTableHeader}>
              <span>Produit</span>
              <span>Prix</span>
              <span>Quantité</span>
              <span>Total</span>
              <span></span>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedColor}`} className={styles.cartItem}>
                {/* Product Image */}
                <div className={styles.itemImage}>
                  <Link to={`/produit/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                </div>

                {/* Product Details */}
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>
                    <Link to={`/produit/${item.id}`} className={styles.itemNameLink}>
                      {item.name}
                    </Link>
                  </h3>
                  <span className={styles.itemMeta}>{item.brand}</span>
                  {item.selectedColor && (
                    <span className={styles.itemColor}>
                      Couleur: 
                      <span 
                        className={styles.colorDot} 
                        style={{ backgroundColor: item.selectedColor }}
                      />
                    </span>
                  )}

                  {/* Mobile: Price, Quantity, Total Row */}
                  <div className={styles.mobileRow}>
                    <QuantitySelector
                      value={item.quantity}
                      min={1}
                      max={item.stock}
                      size="sm"
                      onChange={(newQty) => updateQuantity(item.id, newQty, item.selectedColor)}
                    />
                    <span className={styles.itemTotal}>
                      {formatPrice(item.price * item.quantity)} DT
                    </span>
                    <button 
                      className={styles.removeButton}
                      onClick={() => removeFromCart(item.id, item.selectedColor)}
                      aria-label="Supprimer"
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                </div>

                {/* Desktop Columns */}
                <div className={`${styles.itemPrice} ${styles.desktopColumn}`}>
                  {formatPrice(item.price)} DT
                </div>

                <div className={`${styles.desktopColumn}`}>
                  <QuantitySelector
                    value={item.quantity}
                    min={1}
                    max={item.stock}
                    size="sm"
                    onChange={(newQty) => updateQuantity(item.id, newQty, item.selectedColor)}
                  />
                </div>

                <div className={`${styles.itemTotal} ${styles.desktopColumn}`}>
                  {formatPrice(item.price * item.quantity)} DT
                </div>

                <div className={styles.desktopColumn}>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                    aria-label="Supprimer l'article"
                  >
                    <Icon name="trash" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <aside className={styles.cartSummary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Récapitulatif</h2>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Sous-total</span>
                  <span className={styles.summaryValue}>{formatPrice(subtotal)} DT</span>
                </div>

                {/* Show discount if promo applied */}
                {appliedPromo && discount > 0 && (
                  <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                    <span className={styles.summaryLabel}>
                      Réduction ({appliedPromo.code})
                      <button 
                        className={styles.removePromoBtn}
                        onClick={handleRemovePromo}
                        aria-label="Supprimer le code promo"
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </span>
                    <span className={styles.discountValue}>-{formatPrice(discount)} DT</span>
                  </div>
                )}

                {/* Free shipping promo indicator */}
                {appliedPromo?.type === 'free_shipping' && (
                  <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                    <span className={styles.summaryLabel}>
                      {appliedPromo.code}
                      <button 
                        className={styles.removePromoBtn}
                        onClick={handleRemovePromo}
                        aria-label="Supprimer le code promo"
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </span>
                    <span className={styles.discountValue}>Livraison offerte</span>
                  </div>
                )}

                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Livraison</span>
                  <span className={`${styles.summaryValue} ${isFreeShipping ? styles.freeShipping : ''}`}>
                    {isFreeShipping ? 'Gratuite' : `${formatPrice(shipping)} DT`}
                  </span>
                </div>

                {!isFreeShipping && subtotal < FREE_SHIPPING_THRESHOLD && (
                  <div className={styles.freeShippingNote}>
                    <Icon name="info" size={14} />
                    Livraison gratuite à partir de {FREE_SHIPPING_THRESHOLD} DT
                  </div>
                )}
              </div>

              <div className={styles.summaryTotal}>
                <span className={styles.totalLabel}>Total TTC</span>
                <span className={styles.totalValue}>{formatPrice(total)} DT</span>
              </div>

              <Link to="/commande" className={styles.checkoutButton}>
                Passer la commande
              </Link>

              <Link to="/boutique" className={styles.continueShoppingLink}>
                ← Continuer mes achats
              </Link>

              {/* Promo Code */}
              <div className={styles.promoSection}>
                <h4 className={styles.promoTitle}>Code promo</h4>
                {!appliedPromo ? (
                  <form className={styles.promoForm} onSubmit={handleApplyPromo}>
                    <input 
                      type="text" 
                      placeholder="Entrez votre code" 
                      className={styles.promoInput}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button type="submit" className={styles.promoButton}>
                      Appliquer
                    </button>
                  </form>
                ) : (
                  <div className={styles.appliedPromo}>
                    <Icon name="checkCircle" size={16} />
                    <span>Code <strong>{appliedPromo.code}</strong> appliqué</span>
                  </div>
                )}
              </div>

              {/* Security Note */}
              <div className={styles.securityNote}>
                <Icon name="lock" size={18} />
                Paiement 100% sécurisé
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Promo Code Modal */}
      <Modal
        isOpen={promoModal.isOpen}
        onClose={closeModal}
        variant={promoModal.type}
        icon={promoModal.type === 'success' ? 'checkCircle' : 'close'}
        title={promoModal.type === 'success' ? 'Code appliqué !' : 'Code invalide'}
        actions={
          <Button variant="primary" onClick={closeModal}>
            Compris
          </Button>
        }
      >
        <p>{promoModal.message}</p>
      </Modal>
    </div>
  );
}

export default CartPage;
