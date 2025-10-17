document.addEventListener('DOMContentLoaded', function () {

    // 1. INICIALIZACIÓN DEL SLIDER (SWIPER.JS)
    const swiperContainer = document.querySelector('.swiper-container');
    if (swiperContainer) {
        new Swiper(swiperContainer, {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            pagination: { el: '.swiper-pagination', clickable: true },
        });
    }

    // 2. LÓGICA PARA PESTAÑAS Y GALERÍA MASONRY
    const tabsContainer = document.querySelector('.galeria-tabs');
    if (tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
        const galleryContents = document.querySelectorAll('.galeria-content');
        let masonryInstances = {}; 

        function setupGallery(galleryContentElement) {
            const grid = galleryContentElement.querySelector('.galeria-grid');
            if (!grid) return;

            if (masonryInstances[galleryContentElement.id]) {
                masonryInstances[galleryContentElement.id].layout();
                return;
            }
            
            if (grid.dataset.populated !== 'true') {
                const folder = grid.dataset.folder;
                const count = parseInt(grid.dataset.count, 10);
                const total = grid.dataset.total ? parseInt(grid.dataset.total, 10) : count;
                const limit = Math.min(count, total);
                const lightbox = grid.dataset.lightbox;
                const title = grid.dataset.title;
                let galleryHTML = '';

                for (let i = 1; i <= limit; i++) {
                    galleryHTML += `<a href="${folder}/foto (${i}).jpg" data-lightbox="${lightbox}" data-title="${title} - Foto ${i}" class="grid-item"><img src="${folder}/foto (${i}).jpg" alt="${title} - Foto ${i}" loading="lazy"></a>`;
                }
                grid.innerHTML = galleryHTML;
                grid.dataset.populated = 'true';
            }

            const imgLoad = imagesLoaded(grid);
            imgLoad.on('always', function() {
                masonryInstances[galleryContentElement.id] = new Masonry(grid, {
                    itemSelector: '.grid-item',
                    percentPosition: true,
                    gutter: 15
                });
            });
        }

        const activeGallery = document.querySelector('.galeria-content.active');
        if (activeGallery) {
            setupGallery(activeGallery);
        }

        tabsContainer.addEventListener('click', function (e) {
            const clicked = e.target.closest('.tab-btn');
            if (!clicked || clicked.classList.contains('active')) return;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            galleryContents.forEach(content => content.classList.remove('active'));

            clicked.classList.add('active');
            const targetGallery = document.querySelector(clicked.dataset.target);
            if (targetGallery) {
                targetGallery.classList.add('active');
                setupGallery(targetGallery);
            }
        });
    }

    // 3. OPCIONES DE LIGHTBOX2
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });

    // 4. LÓGICA PARA EL MENÚ HAMBURGUESA
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

});

