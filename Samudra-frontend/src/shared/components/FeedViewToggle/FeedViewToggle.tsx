import { LayoutGrid, Sparkles } from 'lucide-react';
import { useFeedView, type FeedViewMode } from '@/app/FeedViewContext';
import styles from './FeedViewToggle.module.css';

const OPTIONS: { mode: FeedViewMode; label: string; icon: typeof Sparkles }[] = [
  { mode: 'curated', label: 'Discover', icon: Sparkles },
  { mode: 'grid', label: 'Grid', icon: LayoutGrid },
];

interface FeedViewToggleProps {
  compact?: boolean;
}

export function FeedViewToggle({ compact }: FeedViewToggleProps) {
  const { mode, setMode } = useFeedView();

  return (
    <div
      className={`${styles.toggle} ${compact ? styles.compact : ''}`}
      role="group"
      aria-label="Listing feed view"
    >
      {OPTIONS.map(({ mode: m, label, icon: Icon }) => (
        <button
          key={m}
          type="button"
          className={`${styles.option} ${mode === m ? styles.optionActive : ''}`}
          onClick={() => setMode(m)}
          aria-pressed={mode === m}
        >
          <Icon size={compact ? 16 : 18} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
