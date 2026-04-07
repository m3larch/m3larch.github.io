(() => {
  const STORAGE_KEY = 'm3l-language';
  const LANGUAGE_FALLBACK = 'pt-br';
  const TITLES = {
    'pt-br': 'M3L Architecture',
    'en-us': 'M3L Architecture',
  };

  const DESCRIPTIONS = {
    'pt-br': 'M3L Architecture — Modular in 3 Layers. Um padrão arquitetural para backends modulares, claros, coesos e sustentáveis.',
    'en-us': 'M3L Architecture — Modular in 3 Layers. An architectural pattern for modular, clear, cohesive, and sustainable backends.',
  };

  const normalizeLanguage = (lang) => lang === 'en-us' ? 'en-us' : LANGUAGE_FALLBACK;

  const applyLocalizedAttributes = (lang) => {
    document.querySelectorAll('[data-aria-label-pt-br]').forEach((element) => {
      const value = lang === 'pt-br' ? element.dataset.ariaLabelPtBr : element.dataset.ariaLabelEnUs;
      if (value) {
        element.setAttribute('aria-label', value);
      }
    });
  };

  const applyLanguage = (language) => {
    const lang = normalizeLanguage(language);
    const select = document.getElementById('language-switcher');

    document.querySelectorAll('.lang').forEach((element) => {
      element.hidden = true;
    });

    document.querySelectorAll(`.lang.${lang}`).forEach((element) => {
      element.hidden = false;
    });

    applyLocalizedAttributes(lang);

    document.documentElement.lang = lang === 'pt-br' ? 'pt-BR' : 'en-US';
    document.documentElement.setAttribute('data-language', lang);
    document.title = TITLES[lang] ?? TITLES[LANGUAGE_FALLBACK];

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', DESCRIPTIONS[lang] ?? DESCRIPTIONS[LANGUAGE_FALLBACK]);
    }

    if (select) {
      select.value = lang;
    }

    localStorage.setItem(STORAGE_KEY, lang);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('language-switcher');
    const savedLanguage = normalizeLanguage(localStorage.getItem(STORAGE_KEY));
    const browserLanguage = (navigator.language || '').toLowerCase();
    const detectedLanguage = browserLanguage.startsWith('en') ? 'en-us' : LANGUAGE_FALLBACK;
    const initialLanguage = localStorage.getItem(STORAGE_KEY) ? savedLanguage : detectedLanguage;

    applyLanguage(initialLanguage);

    if (select) {
      select.addEventListener('change', (event) => {
        applyLanguage(event.target.value);
      });
    }
  });
})();
