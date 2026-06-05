import { Link } from 'react-router-dom';
import { PageShell } from '@/shared/layout/PageShell';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { chatInbox } from '@/features/messaging/mock';
import styles from './ChatInboxPage.module.css';

export function ChatInboxPage() {
  return (
    <PageShell title="Chats">
      <ul className={styles.list}>
        {chatInbox.map((chat) => (
          <li key={chat.id}>
            <Link to={`/chats/${chat.id}`} className={styles.row}>
              <Avatar initials={chat.participantInitials} online={chat.online} />
              <div className={styles.body}>
                <div className={styles.top}>
                  <span className={styles.name}>{chat.participantName}</span>
                  <span className={styles.time}>{chat.time}</span>
                </div>
                <p className={styles.listing}>{chat.listingTitle}</p>
                <p className={styles.preview}>{chat.lastMessage}</p>
              </div>
              {chat.unread && <span className={styles.unread} aria-label="Unread" />}
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
