import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Lightbulb, MapPin, X } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';
import { ListingStepper } from '@/features/listing/components/ListingStepper';
import styles from './PostListingPage.module.css';

const CONDITIONS = ['New', 'Used — Good', 'Used — Fair', 'For parts'];

export function PostListingPage() {
  const navigate = useNavigate();
  const { step: stepParam } = useParams();
  const parsed = stepParam ? parseInt(stepParam, 10) : 2;
  const step = Number.isNaN(parsed) ? 2 : parsed;
  const [condition, setCondition] = useState('Used — Good');
  const [negotiable, setNegotiable] = useState(true);

  const goStep = (n: number) => navigate(n === 2 ? '/sell' : `/sell/${n}`);

  return (
    <PageShell
      title="Post a listing"
      rightActions="none"
      headerAction={
        <button type="button" className={styles.saveDraft}>
          Save draft
        </button>
      }
      onBack={() => navigate('/')}
      stickyFooter={
        step === 2 ? (
          <Button variant="primary" fullWidth onClick={() => goStep(3)}>
            Next — Photos
            <ArrowRight size={18} />
          </Button>
        ) : (
          <div className={styles.navFooter}>
            {step > 1 && (
              <Button variant="outline" onClick={() => goStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 4 && (
              <Button variant="primary" fullWidth onClick={() => goStep(step + 1)}>
                Next
              </Button>
            )}
          </div>
        )
      }
    >
      <ListingStepper currentStep={step} />

      {step === 1 && (
        <div className={styles.placeholder}>
          <p>Step 1 — Category</p>
          <p className={styles.hint}>Select a category to continue.</p>
        </div>
      )}

      {step === 2 && (
        <div className={styles.form}>
          <div className={styles.qualityCard}>
            <div className={styles.qualityHeader}>
              <span>Listing quality score</span>
              <span className={styles.qualityPct}>55%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '55%' }} />
            </div>
            <p className={styles.qualityStatus}>55% · Good</p>
            <p className={styles.qualityTip}>
              <Lightbulb size={14} />
              Add more photos and a detailed description to reach 90%+ and get 3x more responses.
            </p>
          </div>

          <label className={styles.field}>
            Title <span className={styles.required}>*</span>
            <input type="text" defaultValue="iPhone 12 · 64GB · Space Grey" />
          </label>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Category</span>
            <div className={styles.breadcrumb}>
              <span className={styles.catPill}>Electronics</span>
              <span>›</span>
              <span>Mobiles</span>
              <span>›</span>
              <span>Apple</span>
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              Condition <span className={styles.required}>*</span>
            </span>
            <div className={styles.pills}>
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.pill} ${condition === c ? styles.pillActive : ''}`}
                  onClick={() => setCondition(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              Photos <span className={styles.required}>*</span>
            </span>
            <p className={styles.hint}>First photo is your cover. Good lighting = more buyers.</p>
            <div className={styles.photoGrid}>
              {['📱', '📦', '🔋'].map((icon, i) => (
                <div key={i} className={styles.photoThumb}>
                  <span>{icon}</span>
                  <button type="button" className={styles.removePhoto} aria-label="Remove">
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button type="button" className={styles.addPhoto}>
                +
              </button>
            </div>
            <p className={styles.photoCount}>3 / 10 photos added · Add 7 more (recommended)</p>
          </div>

          <label className={styles.field}>
            Description
            <textarea
              rows={4}
              defaultValue="Used for 18 months, no scratches on screen. Battery health 87%. Original box and charger included."
            />
          </label>

          <label className={styles.field}>
            Price <span className={styles.required}>*</span>
            <div className={styles.priceInput}>
              <span>₹</span>
              <input type="text" defaultValue="14,500" />
            </div>
          </label>

          <div className={styles.negotiableBox}>
            <span>Negotiable</span>
            <button
              type="button"
              className={`${styles.toggle} ${negotiable ? styles.toggleOn : ''}`}
              onClick={() => setNegotiable(!negotiable)}
              aria-pressed={negotiable}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>

          <label className={styles.field}>
            Location
            <div className={styles.locationInput}>
              <MapPin size={18} />
              <input type="text" defaultValue="Koramangala, Bengaluru" />
            </div>
          </label>
        </div>
      )}

      {step === 3 && (
        <div className={styles.placeholder}>
          <p>Step 3 — Photos</p>
          <p className={styles.hint}>Upload and reorder photos. Coming soon.</p>
        </div>
      )}

      {step === 4 && (
        <div className={styles.placeholder}>
          <p>Step 4 — Price & Review</p>
          <p className={styles.hint}>Review your listing before publishing. Coming soon.</p>
        </div>
      )}
    </PageShell>
  );
}
