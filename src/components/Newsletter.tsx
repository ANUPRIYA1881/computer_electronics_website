import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Lines, Reveal } from './ui';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'ok'>('idle');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? 'ok' : 'error');
  };
  return (
    <section className="section news" aria-labelledby="news-title">
      <div className="container news__inner">
        <Reveal><p className="eyebrow">Newsletter</p></Reveal>
        <Lines id="news-title" lines={['Stay ahead of what’s next.']} className="h2" delay={0.1} />
        <Reveal delay={0.2}><p className="lead">Get product launches, collection updates, and technology inspiration from NEXBYTE.</p></Reveal>
        <Reveal delay={0.3}>
          {state === 'ok' ? (
            <p className="news__ok" role="status"><CheckCircle2 size={20} aria-hidden="true" /> Thanks! (Demo only — nothing was saved or sent.)</p>
          ) : (
            <form className="news__form" onSubmit={submit} noValidate>
              <div className={`field ${state === 'error' ? 'has-err' : ''}`}>
                <label htmlFor="news-email" className="sr">Email address</label>
                <input id="news-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} aria-invalid={state === 'error'} aria-describedby="news-msg"
                  onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }} />
              </div>
              <button type="submit" className="btn btn--primary">Subscribe</button>
              <p id="news-msg" className={state === 'error' ? 'err' : 'muted'} role={state === 'error' ? 'alert' : undefined}>
                {state === 'error' ? 'Please enter a valid email address.' : 'Demo form: your email is not stored or sent anywhere.'}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
