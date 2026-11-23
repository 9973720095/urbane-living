// Email links that always do something.
// A mailto: link only opens a mail APP. On many computers there is none (people use Gmail in the browser),
// so the click seems to do nothing. For every mailto: link on the site (no change needed in sections):
//  - the mail app is still asked to open (normal mailto)
//  - the address is copied, and a small card offers "Gmail" / "Outlook" (opens a new mail in the browser)

const CARD_ID = 'ul-mail-card';
let hideTimer;

const copy = (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(() => true, () => false);
  } catch (e) { /* fall through */ }
  return Promise.resolve(false);
};

const closeCard = () => {
  const card = document.getElementById(CARD_ID);
  if (card) card.remove();
};

const showCard = (email, subject, copied) => {
  closeCard();
  const q = (s) => encodeURIComponent(s || '');
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${q(email)}${subject ? `&su=${q(subject)}` : ''}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${q(email)}${subject ? `&subject=${q(subject)}` : ''}`;

  const card = document.createElement('div');
  card.id = CARD_ID;
  card.className = 'ul-mail-card';
  card.setAttribute('role', 'status');
  card.innerHTML = `
    <div class="ul-mail-card__top">
      <span class="ul-mail-card__icon" aria-hidden="true">✉</span>
      <span class="ul-mail-card__text">
        <strong>${copied ? 'Email address copied' : 'Write to us at'}</strong>
        <span class="ul-mail-card__addr"></span>
      </span>
      <button type="button" class="ul-mail-card__close" aria-label="Close">×</button>
    </div>
    <p class="ul-mail-card__hint">Mail app did not open? Write from your browser:</p>
    <div class="ul-mail-card__btns">
      <a class="ul-mail-card__btn ul-mail-card__btn--red" target="_blank" rel="noopener noreferrer">Gmail</a>
      <a class="ul-mail-card__btn" target="_blank" rel="noopener noreferrer">Outlook</a>
    </div>`;
  card.querySelector('.ul-mail-card__addr').textContent = email; // text, never HTML
  const [g, o] = card.querySelectorAll('.ul-mail-card__btn');
  g.href = gmail;
  o.href = outlook;
  card.querySelector('.ul-mail-card__close').addEventListener('click', closeCard);
  card.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  document.body.appendChild(card);
  clearTimeout(hideTimer);
  hideTimer = setTimeout(closeCard, 12000);
};

export const startMailHelper = () => {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || e.defaultPrevented) return;
    const raw = a.getAttribute('href').slice(7);
    const [addr, query = ''] = raw.split('?');
    const email = decodeURIComponent(addr);
    if (!email) return;
    const subject = new URLSearchParams(query).get('subject') || '';
    // the normal mailto still runs (opens the mail app where there is one)
    copy(email).then((copied) => showCard(email, subject, copied));
  });
};
