import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Icon } from '../ui';
import styles from './Navbar.module.css';
import FloraLogo from '../../assets/FloraLogo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const cartItemsCount = getCartItemsCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className={styles.navbar}>
      <nav className={styles.navbarInner}>
        {/* Mobile Menu Button */}
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Menu de navigation"
        >
          <span className={styles.menuIcon}></span>
        </button>

        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img 
            src={FloraLogo}
            alt="Flora Access Shop" 
            className={styles.logoImage}
          />
          <span className={styles.logoText}>
            <span className={styles.logoTitle}>FLORA</span>
            <span className={styles.logoSubtitle}>Access Shop</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/boutique" 
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Boutique
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/suivi-commande" 
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Suivre Commande
            </NavLink>
          </li>
        </ul>

        {/* Actions */}
        <div className={styles.navActions}>
          {/* Search Button */}
          <button 
            className={styles.actionButton}
            onClick={toggleSearch}
            aria-label="Rechercher"
          >
            <Icon name="search" size={20} />
          </button>

          {/* Cart Button */}
          <Link 
            to="/panier" 
            className={`${styles.actionButton} ${styles.cartButton}`}
            aria-label={`Panier (${cartItemsCount} articles)`}
          >
            <Icon name="cart" size={20} />
            {cartItemsCount > 0 && (
              <span className={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </nav>

      {/* Search Overlay */}
      <div 
        className={`${styles.searchOverlay} ${isSearchOpen ? styles.open : ''}`}
        onClick={(e) => e.target === e.currentTarget && toggleSearch()}
      >
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </form>
        <button className={styles.closeSearch} onClick={toggleSearch} aria-label="Fermer">
          ×
        </button>
      </div>
    </header>
  );
}

export default Navbar;
