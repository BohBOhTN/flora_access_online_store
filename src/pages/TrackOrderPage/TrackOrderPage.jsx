import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { PageHeader, Icon, Input, Button, Captcha } from '../../components/ui';
import { formatPrice } from '../../utils/formatters';
import { ORDER_STATUSES } from '../../constants';
import styles from './TrackOrderPage.module.css';

function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const { trackOrder, getStatusDetails } = useOrder();
  
  const [formData, setFormData] = useState({
    orderNumber: searchParams.get('order') || '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState({});
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Auto-search if order number is in URL
  useEffect(() => {
    if (searchParams.get('order')) {
      // If we have order from URL, we need name + captcha still
      setFormData(prev => ({ ...prev, orderNumber: searchParams.get('order') }));
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.orderNumber.trim()) {
      newErrors.orderNumber = 'Le numéro de commande est requis';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!isCaptchaValid) {
      newErrors.captcha = 'Veuillez compléter la vérification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Reset search results when form changes
    setOrder(null);
    setNotFound(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSearching(true);
    setNotFound(false);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const foundOrder = trackOrder(
      formData.orderNumber,
      formData.firstName,
      formData.lastName
    );
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setNotFound(true);
    }
    
    setIsSearching(false);
  };

  const getStatusIcon = (status) => {
    const statusDetails = getStatusDetails(status);
    return statusDetails?.icon || 'clock';
  };

  const getStatusColor = (status) => {
    const statusDetails = getStatusDetails(status);
    return statusDetails?.color || '#666';
  };

  const getStatusLabel = (status) => {
    const statusDetails = getStatusDetails(status);
    return statusDetails?.label || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-TN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Progress steps for order status
  const statusOrder = [
    ORDER_STATUSES.PENDING.value,
    ORDER_STATUSES.CONFIRMED.value,
    ORDER_STATUSES.SHIPPING.value,
    ORDER_STATUSES.SHIPPED.value,
  ];

  const getCurrentStepIndex = (status) => {
    if (status === ORDER_STATUSES.CANCELLED.value) return -1;
    return statusOrder.indexOf(status);
  };

  return (
    <div className={styles.trackOrderPage}>
      <PageHeader
        title="Suivre ma commande"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Suivi de commande' },
        ]}
      />

      <div className={styles.content}>
        <div className={styles.container}>
          {!order ? (
            <>
              {/* Search Form */}
              <div className={styles.searchSection}>
                <div className={styles.searchCard}>
                  <div className={styles.searchHeader}>
                    <Icon name="package" size={32} className={styles.searchIcon} />
                    <h2>Trouver votre commande</h2>
                    <p>
                      Entrez votre numéro de commande et vos informations pour suivre l'état de votre livraison.
                    </p>
                  </div>

                  {notFound && (
                    <div className={styles.errorAlert}>
                      <Icon name="close" size={20} />
                      <div>
                        <strong>Commande non trouvée</strong>
                        <p>Vérifiez votre numéro de commande et vos informations personnelles.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <Input
                      name="orderNumber"
                      label="Numéro de commande"
                      placeholder="FL-XXXXXXXX-XXXXX"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      error={errors.orderNumber}
                      required
                      icon="package"
                    />
                    
                    <div className={styles.formRow}>
                      <Input
                        name="firstName"
                        label="Prénom"
                        placeholder="Votre prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        required
                      />
                      <Input
                        name="lastName"
                        label="Nom"
                        placeholder="Votre nom"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        required
                      />
                    </div>

                    <Captcha
                      onVerify={setIsCaptchaValid}
                      error={errors.captcha}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSearching}
                    >
                      {isSearching ? 'Recherche...' : 'Suivre ma commande'}
                    </Button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Order Details */}
              <div className={styles.orderSection}>
                {/* Back button */}
                <button 
                  onClick={() => setOrder(null)} 
                  className={styles.backButton}
                >
                  <Icon name="chevronLeft" size={20} />
                  Nouvelle recherche
                </button>

                {/* Order Header */}
                <div className={styles.orderHeader}>
                  <div className={styles.orderInfo}>
                    <h2>Commande {order.id}</h2>
                    <span className={styles.orderDate}>
                      Passée le {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <div 
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    <Icon name={getStatusIcon(order.status)} size={16} />
                    {getStatusLabel(order.status)}
                  </div>
                </div>

                {/* Status Progress */}
                {order.status !== ORDER_STATUSES.CANCELLED.value && (
                  <div className={styles.progressSection}>
                    <h3>Progression de la commande</h3>
                    <div className={styles.progressTrack}>
                      {statusOrder.map((status, index) => {
                        const currentIndex = getCurrentStepIndex(order.status);
                        const isCompleted = index <= currentIndex;
                        const isCurrent = index === currentIndex;
                        const statusDetails = getStatusDetails(status);
                        
                        return (
                          <div 
                            key={status}
                            className={`${styles.progressStep} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''}`}
                          >
                            <div className={styles.progressIcon}>
                              {isCompleted ? (
                                <Icon name="check" size={16} />
                              ) : (
                                <Icon name={statusDetails?.icon || 'clock'} size={16} />
                              )}
                            </div>
                            <span className={styles.progressLabel}>{statusDetails?.label}</span>
                            {index < statusOrder.length - 1 && (
                              <div className={`${styles.progressLine} ${isCompleted && index < currentIndex ? styles.completed : ''}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cancelled Notice */}
                {order.status === ORDER_STATUSES.CANCELLED.value && (
                  <div className={styles.cancelledNotice}>
                    <Icon name="close" size={24} />
                    <div>
                      <strong>Commande annulée</strong>
                      <p>Cette commande a été annulée. Contactez-nous pour plus d'informations.</p>
                    </div>
                  </div>
                )}

                <div className={styles.orderGrid}>
                  {/* Order Items */}
                  <div className={styles.orderCard}>
                    <h3>
                      <Icon name="shoppingBag" size={20} />
                      Articles commandés
                    </h3>
                    <div className={styles.orderItems}>
                      {order.items.map((item) => (
                        <div key={`${item.id}-${item.selectedColor}`} className={styles.orderItem}>
                          <img src={item.image} alt={item.name} className={styles.itemImage} />
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>{item.name}</span>
                            {item.selectedColor && (
                              <span className={styles.itemColor}>{item.selectedColor}</span>
                            )}
                            <span className={styles.itemQty}>Quantité: {item.quantity}</span>
                          </div>
                          <span className={styles.itemPrice}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.orderTotals}>
                      <div className={styles.totalRow}>
                        <span>Sous-total</span>
                        <span>{formatPrice(order.subtotal)}</span>
                      </div>
                      <div className={styles.totalRow}>
                        <span>Livraison</span>
                        <span>{order.shipping === 0 ? 'Gratuite' : formatPrice(order.shipping)}</span>
                      </div>
                      <div className={`${styles.totalRow} ${styles.totalFinal}`}>
                        <span>Total</span>
                        <span>{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery & Status History */}
                  <div className={styles.orderSidebar}>
                    {/* Delivery Address */}
                    <div className={styles.orderCard}>
                      <h3>
                        <Icon name="mapPin" size={20} />
                        Adresse de livraison
                      </h3>
                      <div className={styles.addressInfo}>
                        <p><strong>{order.customerInfo.firstName} {order.customerInfo.lastName}</strong></p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                        {order.shippingAddress.postalCode && <p>{order.shippingAddress.postalCode}</p>}
                        <p>{order.customerInfo.phone}</p>
                      </div>
                    </div>

                    {/* Status History */}
                    <div className={styles.orderCard}>
                      <h3>
                        <Icon name="clock" size={20} />
                        Historique
                      </h3>
                      <div className={styles.statusHistory}>
                        {order.statusHistory.map((entry, index) => (
                          <div key={index} className={styles.historyEntry}>
                            <div 
                              className={styles.historyDot}
                              style={{ backgroundColor: getStatusColor(entry.status) }}
                            />
                            <div className={styles.historyContent}>
                              <span className={styles.historyStatus}>{getStatusLabel(entry.status)}</span>
                              <span className={styles.historyDate}>{formatDate(entry.timestamp)}</span>
                              {entry.note && <span className={styles.historyNote}>{entry.note}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackOrderPage;
