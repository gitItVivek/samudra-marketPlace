import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, X } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import styles from './CreateCommunityPage.module.css';

const CATEGORIES = [
  { id: 'property', label: 'Property', icon: '🏠' },
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'vehicles', label: 'Vehicles', icon: '🏍️' },
  { id: 'furniture', label: 'Furniture', icon: '🛋️' },
  { id: 'services', label: 'Services', icon: '🔧' },
  { id: 'other', label: 'Other', icon: '📦' },
];

export function CreateCommunityPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('property');
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const [rules] = useState([
    'Only post listings relevant to this community',
    'Always mention price and locality clearly',
  ]);

  return (
    <PageShell title="Create community" onBack={() => navigate('/communities')}>
      <div className={styles.cover}>
        <span>Add cover image (optional)</span>
      </div>

      <label className={styles.field}>
        Community name <span className={styles.req}>*</span>
        <input type="text" defaultValue="Flats & Flatmates Bangalore" />
        <span className={styles.hint}>Be specific — a clear name gets more members</span>
      </label>

      <label className={styles.field}>
        URL slug
        <div className={styles.slug}>
          <span>samudra.in/c/</span>
          <input type="text" defaultValue="flats-flatmates-bangalore" />
        </div>
      </label>

      <label className={styles.field}>
        Description
        <textarea
          rows={3}
          defaultValue="Find roommates, PGs and rental flats across Bangalore."
        />
      </label>

      <div className={styles.field}>
        <span className={styles.label}>
          Category <span className={styles.req}>*</span>
        </span>
        <div className={styles.catGrid}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`${styles.catCard} ${category === c.id ? styles.catActive : ''}`}
              onClick={() => setCategory(c.id)}
            >
              <span>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <label className={styles.field}>
        City <span className={styles.req}>*</span>
        <div className={styles.cityInput}>
          <MapPin size={18} />
          <input type="text" defaultValue="Bengaluru, Karnataka" />
        </div>
      </label>

      <div className={styles.field}>
        <span className={styles.label}>Privacy</span>
        <button
          type="button"
          className={`${styles.privacyCard} ${privacy === 'public' ? styles.privacyActive : ''}`}
          onClick={() => setPrivacy('public')}
        >
          <strong>Public</strong>
          <span>Anyone can find, join and see listings</span>
        </button>
        <button
          type="button"
          className={`${styles.privacyCard} ${privacy === 'private' ? styles.privacyActive : ''}`}
          onClick={() => setPrivacy('private')}
        >
          <strong>Private</strong>
          <span>Members must request to join · you approve</span>
        </button>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Community rules (optional)</span>
        <ul className={styles.rulesList}>
          {rules.map((rule, i) => (
            <li key={i}>
              {rule}
              <button type="button" aria-label="Remove rule">
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.addRule}>
          <input type="text" placeholder="Add a rule..." />
          <button type="button" aria-label="Add">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <Button variant="primary" fullWidth onClick={() => navigate('/communities')}>
        Create community
      </Button>
    </PageShell>
  );
}
