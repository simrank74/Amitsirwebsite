/* Shared UI helpers (no frameworks) */

function setYear() {
  const el = document.querySelector('[data-current-year]');
  if (el) el.textContent = String(new Date().getFullYear());
}

function setupMobileNav() {
  const btn = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (!btn || !nav) return;

  const setOpen = (open) => {
    nav.dataset.open = open ? 'true' : 'false';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  setOpen(false);

  btn.addEventListener('click', () => {
    const isOpen = nav.dataset.open === 'true';
    setOpen(!isOpen);
  });

  // Close after clicking a link (mobile UX)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    setOpen(false);
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      sessionType: String(data.get('sessionType') || '').trim(),
      preferredDate: String(data.get('preferredDate') || '').trim(),
      message: String(data.get('message') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      if (status) {
        status.textContent = 'Please fill in Name, Email, and Message.';
        status.dataset.kind = 'error';
      }
      return;
    }

    // Build a mailto draft (works offline without a backend)
    const subject = encodeURIComponent(`New photo session inquiry — ${payload.sessionType || 'General'}`);
    const body = encodeURIComponent(
      [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Type of Session Needed: ${payload.sessionType || '(not specified)'}`,
        `Preferred Date: ${payload.preferredDate || '(not specified)'}`,
        '',
        payload.message,
      ].join('\n')
    );

    const to = form.getAttribute('data-mailto') || '';
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = 'Thanks! Opening your email app to send the message…';
      status.dataset.kind = 'success';
    }

    window.location.href = mailto;
    form.reset();
  });
}

setYear();
setupMobileNav();
setupContactForm();



