import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import InstagramFeed from '../../components/InstagramFeed/InstagramFeed';
import { Icon, SectionHeader, Button } from '../../components/ui';
import { products, categories } from '../../data/products';
import { FEATURES, TRUST_BADGES } from '../../constants';
import floralDecor from '../../assets/floral-decoration.svg';
import floralLarge from '../../assets/floral-large.svg';
import styles from './HomePage.module.css';

function HomePage() {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className={styles.homePage}>
      {/* ============ HERO SECTION ============ */}
      <section className={styles.hero}>
        <div className={`${styles.heroDecorCircle} ${styles.decorCircle1}`}></div>
        <div className={`${styles.heroDecorCircle} ${styles.decorCircle2}`}></div>

        <div className={styles.heroInner}>
          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImageFrame}></div>
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=750&fit=crop"
                alt="Collection beaute Flora Access"
                className={styles.heroImage}
              />
              
              <Link to="/produit/3" className={`${styles.floatingCard} ${styles.floatingCardLeft}`}>
                <img 
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop"
                  alt="Sérum Éclat Rose"
                  className={styles.floatingCardImage}
                />
                <div className={styles.floatingCardInfo}>
                  <span className={styles.floatingCardName}>Sérum Éclat</span>
                  <span className={styles.floatingCardPrice}>89 DT</span>
                </div>
              </Link>
              
              <Link to="/produit/6" className={`${styles.floatingCard} ${styles.floatingCardRight}`}>
                <img 
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=100&h=100&fit=crop"
                  alt="Eau de Parfum Nuit d'Or"
                  className={styles.floatingCardImage}
                />
                <div className={styles.floatingCardInfo}>
                  <span className={styles.floatingCardName}>Nuit d'Or</span>
                  <span className={styles.floatingCardPrice}>150 DT</span>
                </div>
              </Link>

              <img src={floralLarge} alt="" className={styles.heroFloralTopRight} aria-hidden="true" />
              <img src={floralDecor} alt="" className={styles.heroFloralBottomLeft} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              Nouvelle Collection 2025
            </span>
            
            <h1 className={styles.heroTitle}>
              Reveillez Votre
              <span className={styles.heroTitleHighlight}>Beaute Naturelle</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Decouvrez notre selection exclusive de cosmetiques, parfums et soins 
              de beaute premium. Livraison gratuite partout en Tunisie.
            </p>

            <div className={styles.heroButtons}>
              <Link to="/boutique" className={styles.heroButtonPrimary}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Decouvrir
              </Link>
              <Link to="/boutique?isNew=true" className={styles.heroButtonSecondary}>
                Nouveautes
              </Link>
            </div>

            <div className={styles.trustBadges}>
              {TRUST_BADGES.map(badge => (
                <div key={badge.id} className={styles.trustBadge}>
                  <Icon name={badge.icon} size={18} />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span>Defiler</span>
          <Icon name="arrowDown" size={20} />
        </div>
      </section>

      {/* ============ CATEGORIES SECTION ============ */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionInner}>
          <SectionHeader subtitle="Explorez" title="Nos Catégories" />
          
          <div className={styles.categoriesGrid}>
            {categories.filter(cat => cat.id !== 'all').map(category => (
              <Link 
                key={category.id}
                to={`/boutique?category=${category.id}`}
                className={styles.categoryCard}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryName}>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEW ARRIVALS SECTION ============ */}
      <section className={styles.productsSection}>
        <img src={floralLarge} alt="" className={styles.sectionFloralLeft} aria-hidden="true" />
        <img src={floralLarge} alt="" className={styles.sectionFloralRight} aria-hidden="true" />
        
        <div className={styles.sectionInner}>
          <SectionHeader subtitle="Nouveautés" title="Arrivages Récents" />
          
          <div className={styles.productsGrid}>
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className={styles.viewAllWrapper}>
            <Button to="/boutique?isNew=true" variant="secondary" size="lg">
              Voir Toutes les Nouveautés
            </Button>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <div className={styles.featuresGrid}>
            {FEATURES.map((feature) => (
              <div key={feature.id} className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <Icon name={feature.icon} size={24} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BEST SELLERS SECTION ============ */}
      <section className={styles.productsSection}>
        <img src={floralLarge} alt="" className={styles.sectionFloralLeft} aria-hidden="true" />
        <img src={floralLarge} alt="" className={styles.sectionFloralRight} aria-hidden="true" />
        
        <div className={styles.sectionInner}>
          <SectionHeader subtitle="Les Plus Aimés" title="Meilleures Ventes" />
          
          <div className={styles.productsGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className={styles.viewAllWrapper}>
            <Button to="/boutique" variant="secondary" size="lg">
              Voir Tous les Produits
            </Button>
          </div>
        </div>
      </section>

      {/* ============ INSTAGRAM SECTION ============ */}
      <div className={styles.instagramWrapper}>
        <InstagramFeed />
      </div>

      {/* ============ NEWSLETTER SECTION ============ */}
      <section className={styles.newsletterSection}>
        <img src={floralLarge} alt="" className={`${styles.newsletterDecor} ${styles.newsletterDecorLeft}`} aria-hidden="true" />
        <img src={floralLarge} alt="" className={`${styles.newsletterDecor} ${styles.newsletterDecorRight}`} aria-hidden="true" />
        
        <div className={styles.sectionInner}>
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterIcon}>
              <Icon name="mail" size={32} />
            </div>
            <h2 className={styles.newsletterTitle}>Restez Informée</h2>
            <p className={styles.newsletterText}>
              Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives, 
              nouveautés et conseils beauté.
            </p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className={styles.newsletterInput}
                required
              />
              <Button type="submit" variant="primary">
                S'inscrire
              </Button>
            </form>
            <p className={styles.newsletterNote}>
              En vous inscrivant, vous acceptez de recevoir nos communications marketing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
