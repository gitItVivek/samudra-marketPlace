import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MoreVertical, Phone, Plus, Send } from 'lucide-react';
import { PageShell } from '@/shared/layout/PageShell';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { formatPrice } from '@/shared/utils/format';
import { getConversation } from '@/features/messaging/mock';
import styles from './ChatPage.module.css';

const QUICK_REPLIES = [
  '👌 Deal!',
  'Is it still available?',
  "What's the lowest?",
  'Can you share more photos?',
];

export function ChatPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const conversation = getConversation(conversationId ?? 'demo');

  const chatHeader = (
    <header className={styles.chatHeader}>
      <button type="button" onClick={() => navigate(-1)} aria-label="Go back">
        <ArrowLeft size={22} />
      </button>
      <div className={styles.userRow}>
        <Avatar initials={conversation.participant.initials} online={conversation.participant.online} />
        <div>
          <p className={styles.userName}>{conversation.participant.name}</p>
          <p className={styles.online}>Online now</p>
        </div>
      </div>
      <div className={styles.headerActions}>
        <button type="button" aria-label="Call">
          <Phone size={20} />
        </button>
        <button type="button" aria-label="More">
          <MoreVertical size={20} />
        </button>
      </div>
    </header>
  );

  return (
    <PageShell title="" customHeader={chatHeader} noPadding>

      <Link to={`/listings/${conversation.listing.id}`} className={styles.listingBar}>
        <span className={styles.listingIcon}>{conversation.listing.icon}</span>
        <div className={styles.listingInfo}>
          <p className={styles.listingTitle}>{conversation.listing.title}</p>
          <p className={styles.listingMeta}>
            <span className={styles.listingPrice}>{formatPrice(conversation.listing.price)}</span>
            {' · '}
            Negotiable · Active
          </p>
        </div>
        <span className={styles.viewLink}>View</span>
      </Link>

      <div className={styles.safetyTip}>
        Never share payment details over chat. Meet in public. Report suspicious messages.
      </div>

      <div className={styles.messages}>
        <p className={styles.dateSep}>Today</p>
        {conversation.messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className={styles.systemMsg}>
                <Calendar size={14} />
                {msg.text}
              </div>
            );
          }
          const isSent = msg.type === 'sent';
          return (
            <div key={msg.id} className={`${styles.msgRow} ${isSent ? styles.sent : ''}`}>
              {!isSent && (
                <span className={styles.msgAvatar}>{msg.senderInitials}</span>
              )}
              <div>
                <div className={`${styles.bubble} ${isSent ? styles.bubbleSent : ''}`}>{msg.text}</div>
                {msg.time && <span className={styles.msgTime}>{msg.time}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.inputArea}>
        <div className={styles.quickReplies}>
          {QUICK_REPLIES.map((text) => (
            <button key={text} type="button" className={styles.chip}>
              {text}
            </button>
          ))}
        </div>
        <div className={styles.inputRow}>
          <button type="button" className={styles.attachBtn} aria-label="Attach">
            <Plus size={22} />
          </button>
          <input type="text" placeholder="Type a message..." className={styles.input} readOnly />
          <button type="button" className={styles.sendBtn} aria-label="Send">
            <Send size={18} />
          </button>
        </div>
      </div>
    </PageShell>
  );
}
