import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Icon, PageHeader, Button } from '../../components/ui';
import { products, categories, brands, priceRanges } from '../../data/products';
import { SORT_OPTIONS } from '../../constants';
import styles from './ShopPage.module.css';

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // Get filter values from URL
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedBrand = searchParams.get('brand') || 'all';
  const selectedPrice = searchParams.get('price') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const showNewOnly = searchParams.get('isNew') === 'true';

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      result = result.filter(p => 
        p.brand.toLowerCase().replace(/\s+/g, '-') === selectedBrand
      );
    }

    // Filter by price range
    if (selectedPrice !== 'all') {
      const range = priceRanges.find(r => r.id === selectedPrice);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // Filter new arrivals only
    if (showNewOnly) {
      result = result.filter(p => p.isNew);
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default: newest first, then by id
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || a.id - b.id);
    }

    return result;
  }, [selectedCategory, selectedBrand, selectedPrice, searchQuery, showNewOnly, sortBy]);

  // Update URL params
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || value === '' || value === false) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
    setSortBy('default');
  };

  // Toggle mobile sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking overlay
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Get count of products per category
  const getCategoryCount = (catId) => {
    if (catId === 'all') return products.length;
    return products.filter(p => p.category === catId).length;
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategory !== 'all' || 
    selectedBrand !== 'all' || 
    selectedPrice !== 'all' || 
    searchQuery || 
    showNewOnly;

  // Sidebar content (reused for desktop and mobile)
  const SidebarContent = () => (
    <>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Filtres</h2>
        <button className={styles.closeButton} onClick={closeSidebar} aria-label="Fermer">
          ×
        </button>
      </div>

      {/* Categories */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Catégories</h3>
        <div className={styles.filterOptions}>
          {categories.map(cat => (
            <label key={cat.id} className={styles.filterOption}>
              <input
                type="radio"
                name="category"
                className={styles.filterCheckbox}
                checked={selectedCategory === cat.id}
                onChange={() => updateFilter('category', cat.id)}
              />
              <span className={styles.filterLabel}>{cat.name}</span>
              <span className={styles.filterCount}>{getCategoryCount(cat.id)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Prix</h3>
        <div className={styles.filterOptions}>
          {priceRanges.map(range => (
            <label key={range.id} className={styles.filterOption}>
              <input
                type="radio"
                name="price"
                className={styles.filterCheckbox}
                checked={selectedPrice === range.id}
                onChange={() => updateFilter('price', range.id)}
              />
              <span className={styles.filterLabel}>{range.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Marque</h3>
        <div className={styles.filterOptions}>
          {brands.map(brand => (
            <label key={brand.id} className={styles.filterOption}>
              <input
                type="radio"
                name="brand"
                className={styles.filterCheckbox}
                checked={selectedBrand === brand.id}
                onChange={() => updateFilter('brand', brand.id)}
              />
              <span className={styles.filterLabel}>{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* New Arrivals Toggle */}
      <div className={styles.filterCard}>
        <label className={styles.filterOption}>
          <input
            type="checkbox"
            className={styles.filterCheckbox}
            checked={showNewOnly}
            onChange={(e) => updateFilter('isNew', e.target.checked ? 'true' : '')}
          />
          <span className={styles.filterLabel}>Nouveautés uniquement</span>
        </label>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button className={styles.clearFilters} onClick={clearFilters}>
          Effacer les filtres
        </button>
      )}
    </>
  );

  return (
    <div className={styles.shopPage}>
      {/* Page Header */}
      <PageHeader 
        title="La Boutique"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Boutique' }
        ]}
      />

      {/* Shop Content */}
      <div className={styles.shopContent}>
        {/* Mobile Filter Bar */}
        <div className={styles.mobileFilterBar}>
          <button className={styles.filterButton} onClick={toggleSidebar}>
            <Icon name="filter" size={18} />
            Filtrer
          </button>
          <span className={styles.resultsCount}>
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
          </span>
          <select 
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Sidebar */}
        <aside className={styles.sidebar}>
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        <div 
          className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.open : ''}`}
          onClick={closeSidebar}
        />
        
        {/* Mobile Sidebar */}
        <aside className={`${styles.sidebarMobile} ${isSidebarOpen ? styles.open : ''}`}>
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Desktop Toolbar */}
          <div className={styles.toolBar}>
            <div className={styles.toolBarLeft}>
              <span className={styles.resultsCount}>
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </span>
            </div>
            <select 
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters Tags */}
          {hasActiveFilters && (
            <div className={styles.activeFilters}>
              {selectedCategory !== 'all' && (
                <span className={styles.filterTag}>
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button 
                    className={styles.filterTagRemove}
                    onClick={() => updateFilter('category', 'all')}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className={styles.filterTag}>
                  {brands.find(b => b.id === selectedBrand)?.name}
                  <button 
                    className={styles.filterTagRemove}
                    onClick={() => updateFilter('brand', 'all')}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedPrice !== 'all' && (
                <span className={styles.filterTag}>
                  {priceRanges.find(p => p.id === selectedPrice)?.name}
                  <button 
                    className={styles.filterTagRemove}
                    onClick={() => updateFilter('price', 'all')}
                  >
                    ×
                  </button>
                </span>
              )}
              {showNewOnly && (
                <span className={styles.filterTag}>
                  Nouveautés
                  <button 
                    className={styles.filterTagRemove}
                    onClick={() => updateFilter('isNew', '')}
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className={styles.filterTag}>
                  "{searchQuery}"
                  <button 
                    className={styles.filterTagRemove}
                    onClick={() => updateFilter('search', '')}
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid */}
          <div className={styles.productsGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <Icon name="search" size={48} className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>Aucun produit trouvé</h3>
                <p className={styles.emptyText}>
                  Essayez de modifier vos critères de recherche ou de supprimer certains filtres.
                </p>
                <Button variant="secondary" onClick={clearFilters}>
                  Effacer les filtres
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShopPage;
