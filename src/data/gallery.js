const galleryItems = [
  {
    image: './pasta do junior/optimized/Banquete de casamento luxuoso com flores e velas.jpg',
    alt: 'Mesa de casamento decorada com flores e velas',
    width: 1674,
    height: 939,
    categories: ['decoracao'],
    title: 'Banquete de casamento',
    caption: 'Flores e velas compõem uma mesa preparada para celebrar.'
  },
  {
    image: './pasta do junior/optimized/Elegância Dourada no Jardim Festivo.jpg',
    alt: 'Jardim preparado para uma celebração com detalhes dourados',
    width: 1449,
    height: 1085,
    categories: ['exteriores', 'decoracao'],
    title: 'Elegância no jardim',
    caption: 'Um espaço exterior vestido para uma ocasião especial.'
  },
  {
    image: './pasta do junior/optimized/Jardim Mediterrânico ao Entardecer.jpg',
    alt: 'Jardim mediterrânico do Mandinbra ao entardecer',
    width: 1824,
    height: 862,
    categories: ['exteriores'],
    title: 'Jardim ao entardecer',
    caption: 'Uma perspetiva do jardim na luz suave do fim do dia.'
  },
  {
    image: './pasta do junior/optimized/Jardim iluminado junto à piscina.jpg',
    alt: 'Jardim iluminado junto à piscina',
    width: 1460,
    height: 1077,
    categories: ['exteriores', 'piscina', 'noturno'],
    title: 'Jardim junto à piscina',
    caption: 'Iluminação exterior junto à zona da piscina.'
  },
  {
    image: './pasta do junior/optimized/Pátio Mediterrânico Iluminado Junto à Piscina.jpg',
    alt: 'Pátio mediterrânico iluminado junto à piscina',
    width: 1462,
    height: 1076,
    categories: ['exteriores', 'piscina', 'noturno'],
    title: 'Pátio iluminado',
    caption: 'Uma vista do pátio e da piscina ao cair da noite.'
  },
  {
    image: './pasta do junior/optimized/Receção Noturna junto à Piscina.jpg',
    alt: 'Receção noturna preparada junto à piscina',
    width: 1697,
    height: 927,
    categories: ['piscina', 'noturno'],
    title: 'Receção junto à piscina',
    caption: 'O ambiente da piscina durante uma receção à noite.'
  },
  {
    image: './pasta do junior/optimized/Receção Noturna no Jardim Tropical.jpg',
    alt: 'Receção noturna num jardim tropical',
    width: 1123,
    height: 1401,
    categories: ['exteriores', 'noturno'],
    title: 'Receção no jardim tropical',
    caption: 'Jardim e iluminação numa celebração ao ar livre.'
  },
  {
    image: './pasta do junior/optimized/Receção Romântica à Beira da Piscina.jpg',
    alt: 'Receção romântica decorada à beira da piscina',
    width: 1754,
    height: 896,
    categories: ['piscina', 'decoracao'],
    title: 'Receção à beira da piscina',
    caption: 'Decoração preparada para uma celebração especial.'
  },
  {
    image: './pasta do junior/optimized/Resort com Piscina e Decoração Festiva.jpg',
    alt: 'Piscina do Mandinbra integrada numa decoração festiva',
    width: 1475,
    height: 1066,
    categories: ['exteriores', 'piscina', 'decoracao'],
    title: 'Piscina em ambiente festivo',
    caption: 'Uma perspetiva da piscina com decoração de evento.'
  }
];

const galleryGrid = document.getElementById('gallery-grid');
const galleryFilters = document.querySelector('.gallery-filters');
const galleryDialog = document.getElementById('gallery-dialog');

if (galleryGrid) {
  galleryGrid.innerHTML = galleryItems
    .map(
      (item) => `
        <article class="gallery-card" data-categories="${item.categories.join(' ')}">
          <figure>
            <button class="gallery-image-button" type="button" aria-label="Ampliar fotografia: ${item.title}">
              <img src="${item.image}" alt="${item.alt}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" />
            </button>
            <figcaption>
              <span class="category">${item.categories
                .map((category) => ({
                  exteriores: 'Espaços exteriores',
                  piscina: 'Piscina',
                  decoracao: 'Decoração',
                  noturno: 'Ambiente noturno'
                })[category])
                .join(' · ')}</span>
              <strong>${item.title}</strong>
              <span>${item.caption}</span>
            </figcaption>
          </figure>
        </article>
      `
    )
    .join('');

  galleryGrid.addEventListener('click', (event) => {
    const button = event.target.closest('.gallery-image-button');

    if (!button || !galleryDialog) {
      return;
    }

    const image = button.querySelector('img');
    const dialogImage = galleryDialog.querySelector('.gallery-dialog-image');
    const dialogCaption = galleryDialog.querySelector('.gallery-dialog-caption');

    if (!image || !dialogImage || !dialogCaption) {
      return;
    }

    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = image.alt;
    galleryDialog.showModal();
  });
}

if (galleryFilters && galleryGrid) {
  galleryFilters.addEventListener('click', (event) => {
    const button = event.target.closest('.gallery-filter');

    if (!button) {
      return;
    }

    const selectedCategory = button.dataset.filter;

    galleryFilters.querySelectorAll('.gallery-filter').forEach((filter) => {
      const isSelected = filter === button;
      filter.classList.toggle('is-active', isSelected);
      filter.setAttribute('aria-pressed', String(isSelected));
    });

    galleryGrid.querySelectorAll('.gallery-card').forEach((card) => {
      const categories = card.dataset.categories.split(' ');
      card.hidden = selectedCategory !== 'todas' && !categories.includes(selectedCategory);
    });
  });
}

if (galleryDialog) {
  const closeButton = galleryDialog.querySelector('.gallery-dialog-close');

  closeButton?.addEventListener('click', () => galleryDialog.close());

  galleryDialog.addEventListener('click', (event) => {
    if (event.target === galleryDialog) {
      galleryDialog.close();
    }
  });
}
