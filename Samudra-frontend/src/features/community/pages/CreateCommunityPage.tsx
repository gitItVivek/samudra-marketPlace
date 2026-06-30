import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import { createCommunity } from '@/api/communities';
import { useAuth } from '@/features/identity/context/AuthContext';
import { useBrowseFilters } from '@/shared/context/BrowseFiltersContext';
import { uiCategoryToApiForCommunity } from '@/shared/constants/categoryMapping';
import { parseCityState, slugify } from '@/shared/utils/location';
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
  const { accessToken } = useAuth();
  const { city, state } = useBrowseFilters();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('property');
  const [cityInput, setCityInput] = useState(`${city}, ${state}`);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!accessToken) {
      navigate('/auth/login');
      return;
    }
    setSubmitting(true);
    setError(null);
    const { city: c, state: s } = parseCityState(cityInput);
    const finalSlug = slug.trim() || slugify(name);
    try {
      const created = await createCommunity(
        {
          name: name.trim(),
          slug: finalSlug,
          description: description.trim() || undefined,
          categoryType: uiCategoryToApiForCommunity(category),
          city: c,
          state: s,
        },
        accessToken,
      );
      navigate(`/communities/${created.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create community');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell title="Create community" onBack={() => navigate('/communities')}>
      <label className={styles.field}>
        Community name <span className={styles.req}>*</span>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slug) setSlug(slugify(e.target.value));
          }}
        />
      </label>

      <label className={styles.field}>
        URL slug
        <div className={styles.slug}>
          <span>samudra.in/c/</span>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
      </label>

      <label className={styles.field}>
        Description
        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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
          <input type="text" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
        </div>
      </label>

      {error && <p>{error}</p>}

      <Button variant="primary" fullWidth onClick={handleCreate} disabled={submitting || !name.trim()}>
        {submitting ? 'Creating…' : 'Create community'}
      </Button>
    </PageShell>
  );
}
