import { Icon } from '../ui';
import styles from './InstagramFeed.module.css';
import floralLarge from '../../assets/floral-large.svg';

// Instagram posts data
const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    likes: 234,
    comments: 18,
    featured: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    likes: 189,
    comments: 12
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    likes: 312,
    comments: 24
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    likes: 156,
    comments: 8
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    likes: 278,
    comments: 15
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    likes: 198,
    comments: 11
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1583241475880-083f84372725?w=400&h=400&fit=crop',
    likes: 267,
    comments: 19
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
    likes: 145,
    comments: 7
  }
];

function InstagramFeed() {
  return (
    <section className={styles.instagramSection}>
      {/* Background Decorations */}
      <img src={floralLarge} alt="" className={`${styles.bgDecoration} ${styles.bgDecorationLeft}`} aria-hidden="true" />
      <img src={floralLarge} alt="" className={`${styles.bgDecoration} ${styles.bgDecorationRight}`} aria-hidden="true" />

      <div className={styles.sectionInner}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSubtitle}>
            <Icon name="instagram" size={24} className={styles.instagramIcon} />
            Suivez-nous
          </span>
          <h2 className={styles.sectionTitle}>Notre Univers Instagram</h2>
          <p className={styles.sectionDescription}>
            Découvrez nos dernières nouveautés, conseils beauté et inspirations sur Instagram
          </p>
        </div>

        {/* Instagram Grid */}
        <div className={styles.instagramGrid}>
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://instagram.com/floraaccess"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.postCard} ${index === 0 ? styles.featuredPost : ''}`}
            >
              <img
                src={post.image}
                alt={`Post Instagram ${post.id}`}
                className={styles.postImage}
                loading="lazy"
              />
              <div className={styles.postOverlay}>
                <Icon name="instagram" size={32} className={styles.overlayIcon} />
                <div className={styles.postStats}>
                  <span className={styles.stat}>
                    <Icon name="heart" size={16} fill="currentColor" strokeWidth={0} />
                    {post.likes}
                  </span>
                  <span className={styles.stat}>
                    <Icon name="chat" size={16} fill="currentColor" strokeWidth={0} />
                    {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className={styles.followWrapper}>
          <a
            href="https://instagram.com/floraaccess"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.followButton}
          >
            <Icon name="instagram" size={20} />
            Nous suivre
          </a>
          <span className={styles.handleText}>
            <a href="https://instagram.com/floraaccess" target="_blank" rel="noopener noreferrer">
              @floraaccess
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

export default InstagramFeed;
