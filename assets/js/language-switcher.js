(() => {
  const STORAGE_KEY = 'm3l-language';
  const FALLBACK_LANGUAGE = 'pt-br';

  const TITLES = {
    'pt-br': 'M3L Architecture',
    'en-us': 'M3L Architecture',
  };

  const DESCRIPTIONS = {
    'pt-br': 'M3L Architecture — Modular in 3 Layers. Um padrão arquitetural para backends modulares, claros, coesos e sustentáveis.',
    'en-us': 'M3L Architecture — Modular in 3 Layers. An architectural pattern for modular, clear, cohesive, and sustainable backends.',
  };

  function normalizeLanguage(language) {
    return language === 'en-us' ? 'en-us' : 'pt-br';
  }

  function detectBrowserLanguage() {
    const browserLanguage = (navigator.language || '').toLowerCase();

    if (browserLanguage.startsWith('pt')) {
      return 'pt-br';
    }

    if (browserLanguage.startsWith('en')) {
      return 'en-us';
    }

    return FALLBACK_LANGUAGE;
  }

  function applyLocalizedAttributes(language) {
    document.querySelectorAll('[data-aria-label-pt-br]').forEach((element) => {
      const value = language === 'pt-br'
        ? element.dataset.ariaLabelPtBr
        : element.dataset.ariaLabelEnUs;

      if (value) {
        element.setAttribute('aria-label', value);
      }
    });
  }

  function applyLanguage(language, persist = true) {
    const selectedLanguage = normalizeLanguage(language);
    const select = document.getElementById('language-switcher');

    document.querySelectorAll('.lang').forEach((element) => {
      element.hidden = true;
    });

    document.querySelectorAll(`.lang.${selectedLanguage}`).forEach((element) => {
      element.hidden = false;
    });

    applyLocalizedAttributes(selectedLanguage);

    document.documentElement.lang = selectedLanguage === 'pt-br' ? 'pt-BR' : 'en-US';
    document.documentElement.setAttribute('data-language', selectedLanguage);
    document.title = TITLES[selectedLanguage] ?? TITLES[FALLBACK_LANGUAGE];

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        DESCRIPTIONS[selectedLanguage] ?? DESCRIPTIONS[FALLBACK_LANGUAGE]
      );
    }

    if (select) {
      select.value = selectedLanguage;
    }

    if (persist) {
      localStorage.setItem(STORAGE_KEY, selectedLanguage);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('language-switcher');
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    const initialLanguage = savedLanguage
      ? normalizeLanguage(savedLanguage)
      : detectBrowserLanguage();

    applyLanguage(initialLanguage, Boolean(savedLanguage));

    if (select) {
      select.addEventListener('change', (event) => {
        applyLanguage(event.target.value, true);
      });
    }
  });
})();
