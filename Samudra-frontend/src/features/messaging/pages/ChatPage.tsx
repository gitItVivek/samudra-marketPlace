import { useNavigate, useParams } from 'react-router-dom';
import { PageShell } from '@/shared/layout/PageShell';
import { Button } from '@/shared/components/Button/Button';

export function ChatPage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();

  return (
    <PageShell title="Chat" onBack={() => navigate('/chats')}>
      <p>Messaging API is not implemented yet.</p>
      <p>Conversation: {conversationId}</p>
      <Button variant="secondary" onClick={() => navigate('/chats')}>
        Back to inbox
      </Button>
    </PageShell>
  );
}
