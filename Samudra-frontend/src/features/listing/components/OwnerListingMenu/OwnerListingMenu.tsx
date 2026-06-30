import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { deleteListing } from '@/api/listings';
import { useAuth } from '@/features/identity/context/AuthContext';
import styles from './OwnerListingMenu.module.css';

interface OwnerListingMenuProps {
  listingId: string;
  listingTitle: string;
  onDeleted?: () => void;
}

export function OwnerListingMenu({ listingId, listingTitle, onDeleted }: OwnerListingMenuProps) {
  const menuId = useId();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleDelete = async () => {
    if (!accessToken) return;
    const confirmed = window.confirm(
      `Delete "${listingTitle}"? This cannot be undone.`,
    );
    if (!confirmed) return;
    setDeleting(true);
    setOpen(false);
    try {
      await deleteListing(listingId, accessToken);
      onDeleted?.();
      navigate('/me/listings', { replace: true });
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Failed to delete listing');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Listing options"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        disabled={deleting}
        onClick={() => setOpen((v) => !v)}
      >
        <MoreVertical size={20} />
      </button>
      {open && (
        <ul id={menuId} className={styles.menu} role="menu">
          <li role="none">
            <button
              type="button"
              className={styles.menuItem}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate(`/listings/${listingId}/edit`);
              }}
            >
              <Pencil size={16} />
              Edit listing
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              className={`${styles.menuItem} ${styles.danger}`}
              role="menuitem"
              onClick={() => void handleDelete()}
            >
              <Trash2 size={16} />
              Delete listing
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
