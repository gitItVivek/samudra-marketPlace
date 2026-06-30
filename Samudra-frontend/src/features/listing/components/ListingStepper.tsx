import { Check } from 'lucide-react';
import styles from './ListingStepper.module.css';

const STEPS = ['Category', 'Details', 'Photos', 'Price & Review'];

interface ListingStepperProps {
  currentStep: number;
}

export function ListingStepper({ currentStep }: ListingStepperProps) {
  return (
    <div className={styles.stepper}>
      {STEPS.map((label, index) => {
        const stepNum = index + 1;
        const done = stepNum < currentStep;
        const active = stepNum === currentStep;
        return (
          <div key={label} className={styles.step}>
            <div
              className={`${styles.circle} ${done ? styles.done : ''} ${active ? styles.active : ''}`}
            >
              {done ? <Check size={14} /> : stepNum}
            </div>
            <span className={`${styles.label} ${active ? styles.labelActive : ''}`}>{label}</span>
            {index < STEPS.length - 1 && <div className={styles.line} />}
          </div>
        );
      })}
    </div>
  );
}
