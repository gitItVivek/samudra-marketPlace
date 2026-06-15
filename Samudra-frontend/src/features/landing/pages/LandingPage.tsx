import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Users,
  Wrench,
} from 'lucide-react';
import { ROUTES } from '@/app/paths';
import { useTypewriter } from '@/features/landing/hooks/useTypewriter';
import { LandingHeader } from '@/features/landing/components/LandingHeader/LandingHeader';
import { Button } from '@/shared/components/Button/Button';
import styles from './LandingPage.module.css';

const TYPEWRITER_PHRASES = [
  'Find a flat near work.',
  'Sell your old iPhone.',
  'Find a flatmate.',
  'Hire someone local.',
  'Plan a weekend trip together.',
  'Post what you need.',
];

const LISTING_CARDS = [
  { emoji: '🏠', price: '₹18,000/mo', title: '2BHK · Koramangala · Furnished', city: 'Bengaluru', ago: '2h ago' },
  { emoji: '📱', price: '₹14,500', title: 'iPhone 12 · 64GB · Good condition', city: 'Pune', ago: '4h ago' },
  { emoji: '🏍️', price: '₹65,000', title: 'Royal Enfield Classic 350 · 2021', city: 'Hyderabad', ago: '1d ago' },
  { emoji: '🛋️', price: '₹8,000', title: '3-seater sofa · IKEA · Like new', city: 'Mumbai', ago: '3h ago' },
  { emoji: '🔧', price: '₹500 onwards', title: 'AC service & repair · Same day', city: 'Chennai', ago: 'Today' },
];

const FEATURES = [
  {
    icon: ShoppingBag,
    title: 'Buy & sell goods and services',
    body: 'Furniture, bikes, tuition, photography — list with clear prices and photos so buyers know exactly what they are getting.',
  },
  {
    icon: ShieldCheck,
    title: 'Profiles you can trust',
    body: 'See verification, ratings, and listing history before you message. Know who you are dealing with from the start.',
  },
  {
    icon: Building2,
    title: 'Rentals & requirements',
    body: 'Browse owner listings or post what you need — a 2BHK, a flatmate, a tutor. Requirements stay visible to the right people.',
    featured: true,
  },
  {
    icon: MessageCircle,
    title: 'Chat tied to listings',
    body: 'Every conversation stays linked to the listing. Negotiate, agree on a meetup, and close the loop in one thread.',
  },
  {
    icon: Wrench,
    title: 'Local services',
    body: 'AC repair, packers, wedding photographers — discover providers in your city with reviews from real customers.',
  },
  {
    icon: Users,
    title: 'Post a want-ad',
    body: 'Looking for something specific? Say it once. Sellers and neighbours who have it can come to you.',
  },
];

const SAMUDRA_OFFERS = [
  'Verified seller & buyer profiles',
  'Listings with photos, prices, and locality',
  'Direct chat — no middleman required',
  'Post requirements as well as items for sale',
  'Community groups by city and interest',
  'Seller ratings from real transactions',
];

const COMMUNITIES = [
  { emoji: '🏠', name: 'Flats & Flatmates Bangalore', meta: '12.4k members · Property' },
  { emoji: '📱', name: 'Used Phones Mumbai', meta: '8.1k members · Electronics' },
  { emoji: '✈️', name: 'Travel Mates Delhi NCR', meta: '3.8k members · Travel' },
  { emoji: '🛋️', name: 'Furniture & Home Hyderabad', meta: '4.5k members · Home' },
];

const CITIES = [
  'Bengaluru',
  'Mumbai',
  'Delhi NCR',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Ahmedabad',
  'Kolkata',
  'Kochi',
  'Chandigarh',
  'Jaipur',
];

const QUOTES = [
  {
    text: 'Found a furnished flat in Koramangala in three days. The seller profile made the whole process feel straightforward.',
    name: 'Aditi P.',
    role: 'Software engineer · Bengaluru',
    initials: 'AP',
    color: '#9FE1CB',
  },
  {
    text: 'Sold my MacBook the same evening I listed it. Clear photos, direct chat, done.',
    name: 'Rahul K.',
    role: 'Product manager · Mumbai',
    initials: 'RK',
    color: '#CECBF6',
  },
  {
    text: 'Posted that I needed a flatmate — got three serious responses from people in my area within a day.',
    name: 'Sneha M.',
    role: 'UX designer · Pune',
    initials: 'SM',
    color: '#F4C0D1',
  },
];

const HOW_STEPS = [
  { n: '01', title: 'Sign up free', desc: 'Email, Google, or Facebook. Browse listings without a long onboarding.' },
  { n: '02', title: 'Set your city', desc: 'See what is nearby — listings, services, and communities for your area.' },
  { n: '03', title: 'Browse or post', desc: 'Explore the feed or list something in a few guided steps.' },
  { n: '04', title: 'Chat & meet', desc: 'Message directly, agree on terms, and complete the deal your way.' },
];

export function LandingPage() {
  const typewriterText = useTypewriter(TYPEWRITER_PHRASES);

  return (
    <div className={styles.page}>
      <LandingHeader />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Community marketplace for Indian cities</p>

          <h1 className={styles.heroTitle}>
            Buy, sell, and connect
            <span className={styles.heroTitleAccent}> in your neighbourhood</span>
          </h1>
          <p className={styles.typewriter} aria-live="polite">
            {typewriterText}
            <span className={styles.cursor} />
          </p>
          <p className={styles.heroLead}>
            Samudra helps you buy, sell, rent, and connect locally — with trusted profiles,
            clear listings, and communities built for real neighbourhood needs.
          </p>

          <div className={styles.heroCtas}>
            <Link to={ROUTES.authRegister}>
              <Button variant="primary" className={styles.heroPrimaryBtn}>
                Get started — it&apos;s free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to={ROUTES.home}>
              <Button variant="outline" className={styles.heroSecondaryBtn}>
                Browse listings
              </Button>
            </Link>
          </div>

          <ul className={styles.socialProof}>
            <li>No listing fees to start</li>
            <li>Verified profiles</li>
            <li>Direct chat</li>
            <li>Local communities</li>
          </ul>
        </div>
      </section>

      <div className={styles.cardsStripWrap}>
        <div className={styles.cardsStrip}>
        {LISTING_CARDS.map((card) => (
          <article key={card.title} className={styles.stripCard}>
            <div className={styles.stripCardImg}>{card.emoji}</div>
            <div className={styles.stripCardBody}>
              <p className={styles.stripPrice}>{card.price}</p>
              <p className={styles.stripTitle}>{card.title}</p>
              <p className={styles.stripMeta}>
                <MapPin size={12} />
                {card.city} · {card.ago}
              </p>
            </div>
          </article>
        ))}
        </div>
      </div>

      <section id="why" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.whyGrid}>
            <div>
              <p className={styles.eyebrow}>Why Samudra</p>
              <h2 className={styles.sectionTitle}>
                Built for how <em>India actually lives.</em>
              </h2>
              <p className={styles.sectionLead}>
                Working professionals in metros need speed and trust. Students, homemakers,
                and freelancers in tier-2 cities need a local pulse — the same platform,
                tuned to your rhythm.
              </p>
              <div className={styles.audienceCards}>
                <article className={styles.audienceCard}>
                  <Building2 size={20} />
                  <div>
                    <h3>Metro cities</h3>
                    <p>List near your office, sell before you move, find services after a long day.</p>
                  </div>
                </article>
                <article className={styles.audienceCard}>
                  <MapPin size={20} />
                  <div>
                    <h3>Tier-2 cities</h3>
                    <p>Your neighbourhood marketplace — flats, bikes, tuition, and trusted local sellers.</p>
                  </div>
                </article>
              </div>
            </div>
            <aside className={styles.offersPanel}>
              <h3 className={styles.offersTitle}>
                What Samudra <em>gives you</em>
              </h3>
              <ul className={styles.offersList}>
                {SAMUDRA_OFFERS.map((item) => (
                  <li key={item}>
                    <span className={styles.checkIcon}>
                      <Check size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section id="features" className={`${styles.section} ${styles.sectionTinted}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>What you can do</p>
          <h2 className={styles.sectionTitle}>
            One platform. <em>Every local need.</em>
          </h2>
          <div className={styles.featureGrid}>
            {FEATURES.map(({ icon: Icon, title, body, featured }) => (
              <article
                key={title}
                className={`${styles.featureCard} ${featured ? styles.featureCardFeatured : ''}`}
              >
                <div className={styles.featureIcon}>
                  <Icon size={20} />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="communities" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.communitiesGrid}>
            <div>
              <p className={styles.eyebrow}>Communities</p>
              <h2 className={styles.sectionTitle}>
                Your city has groups for <em>everything.</em>
              </h2>
              <p className={styles.sectionLead}>
                Flats and flatmates, travel plans, hobby circles — join communities where
                people already share your locality and interests. Post once; the right
                neighbours see it.
              </p>
              <Link to={ROUTES.home}>
                <Button variant="primary">Explore communities</Button>
              </Link>
            </div>
            <div className={styles.communityCards}>
              {COMMUNITIES.map((c) => (
                <div key={c.name} className={styles.communityCard}>
                  <span className={styles.communityEmoji}>{c.emoji}</span>
                  <div>
                    <p className={styles.communityName}>{c.name}</p>
                    <p className={styles.communityMeta}>{c.meta}</p>
                  </div>
                  <span className={styles.communityJoin}>Join</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cities" className={`${styles.section} ${styles.citiesSection}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Where we are</p>
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
            Your city is probably <em>on here.</em>
          </h2>
          <p className={`${styles.sectionLead} ${styles.centered}`}>
            Starting with major metros and expanding to every city that deserves a focused local marketplace.
          </p>
          <div className={styles.cityPills}>
            {CITIES.map((city) => (
              <span key={city} className={styles.cityPill}>
                {city}
              </span>
            ))}
            <span className={`${styles.cityPill} ${styles.cityPillMuted}`}>+ More coming soon</span>
          </div>
        </div>
      </section>

      <section id="how" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={`${styles.eyebrow} ${styles.centered}`}>Getting started</p>
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
            Up and running in <em>under two minutes.</em>
          </h2>
          <div className={styles.howGrid}>
            {HOW_STEPS.map((step) => (
              <article key={step.n} className={styles.howStep}>
                <p className={styles.howNumber}>{step.n}</p>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.quoteStrip}>
        {QUOTES.map((q) => (
          <blockquote key={q.name} className={styles.quoteCard}>
            <p>&ldquo;{q.text}&rdquo;</p>
            <footer>
              <span className={styles.quoteAvatar} style={{ background: q.color }}>
                {q.initials}
              </span>
              <span>
                <strong>{q.name}</strong>
                <span className={styles.quoteRole}>{q.role}</span>
              </span>
            </footer>
          </blockquote>
        ))}
      </div>

      <footer className={styles.footer}>
        <Link to={ROUTES.landing} className={styles.footerBrand}>
          Samudra
        </Link>
        <p className={styles.footerTagline}>Marketplace for metros &amp; tier-2 India</p>
        <div className={styles.footerLinks}>
          <Link to={ROUTES.home}>Browse</Link>
          <Link to={ROUTES.authLogin}>Log in</Link>
          <Link to={ROUTES.authRegister}>Sign up</Link>
        </div>
        <p className={styles.footerCopy}>© {new Date().getFullYear()} Samudra Market</p>
      </footer>
    </div>
  );
}
