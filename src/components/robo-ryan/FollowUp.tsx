'use client';
import {useRef, useState} from 'react';
import type {ChatMessage} from '@/lib/robo-ryan';
import copy from '../../../content/robo-ryan-followup.json';

export function FollowUp({messages, emailAvailable, requestService}: {messages: ChatMessage[]; emailAvailable?: boolean; requestService: () => void}) {
  const [email, setEmail] = useState(''), [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false), [error, setError] = useState('');
  const requestId = useRef('');
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending || sent) return;
    setSending(true); setError('');
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/robo-ryan/follow-up', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email.trim(), requestId: requestId.current, messages: messages.slice(-30).map(({role, content}) => ({role, content}))}),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Not accepted');
      setSent(true); setEmail('');
    } catch {setError(copy.failure)} finally {setSending(false)}
  }
  return <div className="rr-followup">
    {sent ? <p role="status">{copy.success}</p> : emailAvailable && <form onSubmit={submit}>
      <label>{copy.email}<input type="email" autoComplete="email" required maxLength={254} value={email} disabled={sending} onChange={e => setEmail(e.target.value)}/></label>
      <p>{copy.consent}</p>
      <button type="submit" disabled={sending}>{sending ? copy.submitting : copy.submit}</button>
      {error && <p role="alert">{error}</p>}
    </form>}
    <button type="button" onClick={requestService}>{copy.service}</button>
  </div>;
}
