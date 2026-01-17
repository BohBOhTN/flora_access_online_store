import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { PageHeader, Icon, Input, Select, Textarea, Button } from '../../components/ui';
import { formatPrice } from '../../utils/formatters';
import { 
  TUNISIAN_STATES, 
  FREE_SHIPPING_THRESHOLD, 
  SHIPPING_COST,
  PAYMENT_METHODS 
} from '../../constants';
import styles from './CheckoutPage.module.css';

// Checkout steps
const STEPS = {
  INFORMATION: 1,
  SHIPPING: 2,
  REVIEW: 3,
};

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  
  const [currentStep, setCurrentStep] = useState(STEPS.INFORMATION);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    notes: '',
  });
  
  const [errors, setErrors] = useState({});

  // Redirect to cart if empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      navigate('/panier');
    }
  }, [cartItems, navigate, orderComplete]);

  const subtotal = getCartTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  // Validation
  const validateCustomerInfo = () => {
    const newErrors = {};
    
    if (!customerInfo.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!customerInfo.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!customerInfo.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/.test(customerInfo.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateShippingAddress = () => {
    const newErrors = {};
    
    if (!shippingAddress.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }
    if (!shippingAddress.city.trim()) {
      newErrors.city = 'La ville est requise';
    }
    if (!shippingAddress.state) {
      newErrors.state = 'Le gouvernorat est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === STEPS.INFORMATION) {
      if (validateCustomerInfo()) {
        setCurrentStep(STEPS.SHIPPING);
      }
    } else if (currentStep === STEPS.SHIPPING) {
      if (validateShippingAddress()) {
        setCurrentStep(STEPS.REVIEW);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > STEPS.INFORMATION) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newOrder = createOrder({
        cartItems,
        customerInfo,
        shippingAddress,
      });
      
      clearCart();
      setOrderComplete(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order confirmation screen
  if (orderComplete) {
    return (
      <div className={styles.checkoutPage}>
        <div className={styles.confirmationContainer}>
          <div className={styles.confirmationCard}>
            <div className={styles.confirmationIcon}>
              <Icon name="checkCircle" size={64} />
            </div>
            <h1 className={styles.confirmationTitle}>Commande confirmée !</h1>
            <p className={styles.confirmationText}>
              Merci pour votre commande. Vous recevrez un email de confirmation à{' '}
              <strong>{orderComplete.customerInfo.email}</strong>
            </p>
            
            <div className={styles.orderNumber}>
              <span className={styles.orderNumberLabel}>Numéro de commande</span>
              <span className={styles.orderNumberValue}>{orderComplete.id}</span>
            </div>
            
            <div className={styles.confirmationInfo}>
              <Icon name="truck" size={20} />
              <p>
                Votre commande sera livrée à l'adresse indiquée. 
                Le paiement se fera à la livraison.
              </p>
            </div>
            
            <div className={styles.confirmationActions}>
              <Button 
                variant="primary" 
                to={`/suivi-commande?order=${orderComplete.id}`}
                icon="package"
              >
                Suivre ma commande
              </Button>
              <Button variant="outline" to="/">
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <PageHeader
        title="Passer la commande"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Panier', to: '/panier' },
          { label: 'Commande' },
        ]}
      />

      <div className={styles.content}>
        <div className={styles.container}>
          {/* Progress Steps */}
          <div className={styles.progressSteps}>
            {[
              { step: STEPS.INFORMATION, label: 'Informations' },
              { step: STEPS.SHIPPING, label: 'Livraison' },
              { step: STEPS.REVIEW, label: 'Confirmation' },
            ].map(({ step, label }) => (
              <div
                key={step}
                className={`${styles.progressStep} ${
                  currentStep >= step ? styles.active : ''
                } ${currentStep > step ? styles.completed : ''}`}
              >
                <div className={styles.stepNumber}>
                  {currentStep > step ? <Icon name="check" size={16} /> : step}
                </div>
                <span className={styles.stepLabel}>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.checkoutLayout}>
            {/* Main Form */}
            <div className={styles.formSection}>
              {/* Step 1: Customer Information */}
              {currentStep === STEPS.INFORMATION && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>
                    <Icon name="user" size={24} />
                    Vos informations
                  </h2>
                  <div className={styles.form}>
                    <div className={styles.formRow}>
                      <Input
                        name="firstName"
                        label="Prénom"
                        placeholder="Votre prénom"
                        value={customerInfo.firstName}
                        onChange={handleCustomerChange}
                        error={errors.firstName}
                        required
                      />
                      <Input
                        name="lastName"
                        label="Nom"
                        placeholder="Votre nom"
                        value={customerInfo.lastName}
                        onChange={handleCustomerChange}
                        error={errors.lastName}
                        required
                      />
                    </div>
                    <Input
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="votre@email.com"
                      value={customerInfo.email}
                      onChange={handleCustomerChange}
                      error={errors.email}
                      required
                      icon="mail"
                    />
                    <Input
                      name="phone"
                      type="tel"
                      label="Téléphone"
                      placeholder="+216 XX XXX XXX"
                      value={customerInfo.phone}
                      onChange={handleCustomerChange}
                      error={errors.phone}
                      required
                      icon="phone"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === STEPS.SHIPPING && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>
                    <Icon name="truck" size={24} />
                    Adresse de livraison
                  </h2>
                  <div className={styles.form}>
                    <Input
                      name="address"
                      label="Adresse"
                      placeholder="Rue, numéro, appartement..."
                      value={shippingAddress.address}
                      onChange={handleShippingChange}
                      error={errors.address}
                      required
                      icon="mapPin"
                    />
                    <div className={styles.formRow}>
                      <Input
                        name="city"
                        label="Ville"
                        placeholder="Votre ville"
                        value={shippingAddress.city}
                        onChange={handleShippingChange}
                        error={errors.city}
                        required
                      />
                      <Select
                        name="state"
                        label="Gouvernorat"
                        options={TUNISIAN_STATES}
                        value={shippingAddress.state}
                        onChange={handleShippingChange}
                        error={errors.state}
                        required
                        placeholder="Sélectionner..."
                      />
                    </div>
                    <Input
                      name="postalCode"
                      label="Code postal"
                      placeholder="1000"
                      value={shippingAddress.postalCode}
                      onChange={handleShippingChange}
                    />
                    <Textarea
                      name="notes"
                      label="Instructions de livraison (optionnel)"
                      placeholder="Instructions particulières pour le livreur..."
                      value={shippingAddress.notes}
                      onChange={handleShippingChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === STEPS.REVIEW && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>
                    <Icon name="checkCircle" size={24} />
                    Récapitulatif de la commande
                  </h2>
                  
                  {/* Customer Info Summary */}
                  <div className={styles.reviewSection}>
                    <div className={styles.reviewHeader}>
                      <h3>Informations client</h3>
                      <button 
                        onClick={() => setCurrentStep(STEPS.INFORMATION)}
                        className={styles.editButton}
                      >
                        Modifier
                      </button>
                    </div>
                    <div className={styles.reviewDetails}>
                      <p><strong>{customerInfo.firstName} {customerInfo.lastName}</strong></p>
                      <p>{customerInfo.email}</p>
                      <p>{customerInfo.phone}</p>
                    </div>
                  </div>

                  {/* Shipping Summary */}
                  <div className={styles.reviewSection}>
                    <div className={styles.reviewHeader}>
                      <h3>Adresse de livraison</h3>
                      <button 
                        onClick={() => setCurrentStep(STEPS.SHIPPING)}
                        className={styles.editButton}
                      >
                        Modifier
                      </button>
                    </div>
                    <div className={styles.reviewDetails}>
                      <p>{shippingAddress.address}</p>
                      <p>{shippingAddress.city}, {TUNISIAN_STATES.find(s => s.value === shippingAddress.state)?.label}</p>
                      {shippingAddress.postalCode && <p>{shippingAddress.postalCode}</p>}
                      {shippingAddress.notes && (
                        <p className={styles.notes}>Note: {shippingAddress.notes}</p>
                      )}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className={styles.reviewSection}>
                    <h3>Mode de paiement</h3>
                    <div className={styles.paymentMethod}>
                      <Icon name={PAYMENT_METHODS.CASH_ON_DELIVERY.icon} size={24} />
                      <div>
                        <strong>{PAYMENT_METHODS.CASH_ON_DELIVERY.label}</strong>
                        <p>{PAYMENT_METHODS.CASH_ON_DELIVERY.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className={styles.reviewSection}>
                    <h3>Articles ({cartItems.length})</h3>
                    <div className={styles.reviewItems}>
                      {cartItems.map((item) => (
                        <div key={`${item.id}-${item.selectedColor}`} className={styles.reviewItem}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className={styles.reviewItemImage}
                          />
                          <div className={styles.reviewItemInfo}>
                            <span className={styles.reviewItemName}>{item.name}</span>
                            <span className={styles.reviewItemQty}>Qté: {item.quantity}</span>
                          </div>
                          <span className={styles.reviewItemPrice}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className={styles.formActions}>
                {currentStep > STEPS.INFORMATION && (
                  <Button 
                    variant="outline" 
                    onClick={handlePrevStep}
                    icon="chevronLeft"
                  >
                    Retour
                  </Button>
                )}
                {currentStep < STEPS.REVIEW ? (
                  <Button 
                    variant="primary" 
                    onClick={handleNextStep}
                    icon="chevronRight"
                    iconPosition="right"
                  >
                    Continuer
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    icon={isSubmitting ? undefined : 'check'}
                  >
                    {isSubmitting ? 'Traitement...' : 'Confirmer la commande'}
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className={styles.summarySection}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Récapitulatif</h3>
                
                <div className={styles.summaryItems}>
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}`} className={styles.summaryItem}>
                      <div className={styles.summaryItemImage}>
                        <img src={item.image} alt={item.name} />
                        <span className={styles.summaryItemQty}>{item.quantity}</span>
                      </div>
                      <div className={styles.summaryItemInfo}>
                        <span className={styles.summaryItemName}>{item.name}</span>
                        {item.selectedColor && (
                          <span className={styles.summaryItemColor}>{item.selectedColor}</span>
                        )}
                      </div>
                      <span className={styles.summaryItemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryTotals}>
                  <div className={styles.summaryRow}>
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Livraison</span>
                    <span className={shipping === 0 ? styles.freeShipping : ''}>
                      {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className={styles.freeShippingNote}>
                      Plus que {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} pour la livraison gratuite
                    </p>
                  )}
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className={styles.securityNote}>
                  <Icon name="lock" size={16} />
                  <span>Paiement sécurisé à la livraison</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
