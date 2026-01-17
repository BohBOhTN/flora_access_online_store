/**
 * Application-wide constants
 */

// Feature cards data used in HomePage
export const FEATURES = [
  {
    id: 'delivery',
    icon: 'truck',
    title: 'Livraison Gratuite',
    text: 'Gratuit partout en Tunisie dès 100 DT',
  },
  {
    id: 'authentic',
    icon: 'shield',
    title: 'Produits Authentiques',
    text: '100% originaux et certifiés',
  },
  {
    id: 'support',
    icon: 'chat',
    title: 'Service Client',
    text: 'À votre écoute 7j/7',
  },
  {
    id: 'payment',
    icon: 'creditCard',
    title: 'Paiement à la Livraison',
    text: 'Payez en toute sécurité',
  },
];

// Trust badges for hero section
export const TRUST_BADGES = [
  { id: 'authentic', icon: 'shieldCheck', text: '100% Authentique' },
  { id: 'delivery', icon: 'truck', text: 'Livraison Rapide' },
  { id: 'support', icon: 'chat', text: 'Support 7j/7' },
];

// Social media links
export const SOCIAL_LINKS = [
  { id: 'instagram', icon: 'instagram', url: 'https://www.instagram.com/flora_access_shop/', label: 'Instagram' },
  { id: 'facebook', icon: 'facebook', url: 'https://www.facebook.com/profile.php?id=61568308095427', label: 'Facebook' },
];

// Contact information
export const CONTACT_INFO = {
  phone: '+216 44 639 642',
  email: 'contact@floraaccess.tn',
  address: 'C119, Al-Maharas 3060, Sfax, Tunisie',
  workingHours: 'Lun - Sam: 9h - 18h',
  mapCoordinates: {
    lat: 34.525811217546114,
    lng: 10.49687644546298,
  },
  mapZoom: 17,
};

// Sort options for shop page
export const SORT_OPTIONS = [
  { value: 'default', label: 'Trier par défaut' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'rating', label: 'Meilleures notes' },
];

// Pagination
export const ITEMS_PER_PAGE = 12;

// Minimum order for free shipping
export const FREE_SHIPPING_THRESHOLD = 100;

// Shipping cost if below threshold
export const SHIPPING_COST = 7;

// App metadata
export const APP_NAME = 'FLORA Access';
export const APP_TAGLINE = 'Votre destination beauté en Tunisie';

// Order statuses
export const ORDER_STATUSES = {
  PENDING: {
    value: 'pending',
    label: 'En attente',
    color: '#f6ad55',
    icon: 'clock',
    description: 'Votre commande est en attente de confirmation',
  },
  CONFIRMED: {
    value: 'confirmed',
    label: 'Confirmée',
    color: '#4299e1',
    icon: 'checkCircle',
    description: 'Votre commande a été confirmée',
  },
  SHIPPING: {
    value: 'shipping',
    label: 'En cours de livraison',
    color: '#9f7aea',
    icon: 'truck',
    description: 'Votre commande est en route',
  },
  SHIPPED: {
    value: 'shipped',
    label: 'Livrée',
    color: '#48bb78',
    icon: 'check',
    description: 'Votre commande a été livrée',
  },
  CANCELLED: {
    value: 'cancelled',
    label: 'Annulée',
    color: '#e53e3e',
    icon: 'close',
    description: 'Votre commande a été annulée',
  },
};

// Payment methods
export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: {
    value: 'cash_on_delivery',
    label: 'Paiement à la livraison',
    description: 'Payez en espèces à la réception de votre commande',
    icon: 'creditCard',
  },
};

// Tunisian states/governorates for address
export const TUNISIAN_STATES = [
  { value: 'ariana', label: 'Ariana' },
  { value: 'beja', label: 'Béja' },
  { value: 'ben_arous', label: 'Ben Arous' },
  { value: 'bizerte', label: 'Bizerte' },
  { value: 'gabes', label: 'Gabès' },
  { value: 'gafsa', label: 'Gafsa' },
  { value: 'jendouba', label: 'Jendouba' },
  { value: 'kairouan', label: 'Kairouan' },
  { value: 'kasserine', label: 'Kasserine' },
  { value: 'kebili', label: 'Kébili' },
  { value: 'kef', label: 'Le Kef' },
  { value: 'mahdia', label: 'Mahdia' },
  { value: 'manouba', label: 'Manouba' },
  { value: 'medenine', label: 'Médenine' },
  { value: 'monastir', label: 'Monastir' },
  { value: 'nabeul', label: 'Nabeul' },
  { value: 'sfax', label: 'Sfax' },
  { value: 'sidi_bouzid', label: 'Sidi Bouzid' },
  { value: 'siliana', label: 'Siliana' },
  { value: 'sousse', label: 'Sousse' },
  { value: 'tataouine', label: 'Tataouine' },
  { value: 'tozeur', label: 'Tozeur' },
  { value: 'tunis', label: 'Tunis' },
  { value: 'zaghouan', label: 'Zaghouan' },
];

// Promo codes (in real app, this would come from backend)
export const PROMO_CODES = {
  FLORA10: {
    code: 'FLORA10',
    type: 'percentage',
    value: 10,
    description: '10% de réduction',
    minOrder: 0,
  },
  FLORA20: {
    code: 'FLORA20',
    type: 'percentage',
    value: 20,
    description: '20% de réduction',
    minOrder: 150,
  },
  BIENVENUE: {
    code: 'BIENVENUE',
    type: 'fixed',
    value: 15,
    description: '15 DT de réduction',
    minOrder: 50,
  },
  LIVRAISON: {
    code: 'LIVRAISON',
    type: 'free_shipping',
    value: 0,
    description: 'Livraison gratuite',
    minOrder: 0,
  },
};

