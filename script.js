// Создаем пчелок, летящих справа налево
function createBees() {
    const beesContainer = document.querySelector('.bees-container');
    if (!beesContainer) return;
    
    const beeCount = 10;
    
    for (let i = 0; i < beeCount; i++) {
        const bee = document.createElement('div');
        bee.className = 'bee';
        bee.textContent = '🐝';
        
        // Функция для установки случайной позиции по вертикали
        function setRandomTop() {
            const topPos = 15 + Math.random() * 70;
            bee.style.top = topPos + '%';
        }
        
        // Устанавливаем начальную позицию
        setRandomTop();
        
        // Начальная позиция справа
        bee.style.left = '100%';
        
        // Случайная задержка анимации (0-5 секунд) для разнообразия
        const delay = Math.random() * 5;
        bee.style.animationDelay = delay + 's';
        
        // Случайная длительность полета (10-20 секунд)
        const duration = 10 + Math.random() * 10;
        bee.style.animationDuration = duration + 's';
        
        // Когда анимация завершается (пчела долетела до края), респавниваем её
        bee.addEventListener('animationiteration', () => {
            setRandomTop();
        });
        
        beesContainer.appendChild(bee);
    }
}

// Создаем пчелок при загрузке
createBees();

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к секциям
document.querySelectorAll('.product-card, .benefit-item, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Обработка формы
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});

// Переключение темы Dark/Light
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;

    function updateThemeIcon(theme) {
        // Когда dark тема - показываем солнце (чтобы переключиться на light)
        // Когда light тема - показываем луну (чтобы переключиться на dark)
        if (theme === 'light-theme') {
            themeIcon.textContent = '🌙';
        } else {
            themeIcon.textContent = '☀️';
        }
    }

    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // По умолчанию dark тема
        body.classList.add('dark-theme');
        updateThemeIcon('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        const header = document.querySelector('.header');
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        }
        // Принудительно устанавливаем желтый цвет хедера после переключения темы
        if (header) {
            header.style.setProperty('background', '#FFFF00', 'important');
            header.style.setProperty('box-shadow', '0 2px 20px rgba(255, 255, 0, 0.5)', 'important');
        }
    });

    // Переключение языков
    const translations = {
        ru: {
            nav: {
                home: 'Главная',
                about: 'О нас',
                aboutProducts: 'О наших продуктах',
                products: 'Ассортимент',
                benefits: 'Польза',
                contact: 'Контакты'
            },
            hero: {
                title: 'Варенье и Натуральный Мед',
                subtitle: 'В стиках',
                description: 'Варенье и натуральный мед в удобных индивидуальных пакетиках-стиках по 13-14г. Идеально для отелей, кафе, детских садов, офисов и студий красоты.',
                priceLabel: '1 стик',
                order: 'Заказать'
            },
            aboutUs: {
                title: 'О нас',
                item1Title: 'Более 16 лет проверены временем',
                item1Desc: 'Мы работаем на рынке более 16 лет и заслужили доверие наших клиентов',
                item2Title: 'Собственное производство',
                item2Desc: 'Весь процесс производства находится под нашим контролем',
                item3Title: 'Каждый стик сделан с любовью',
                item3Desc: 'Мы вкладываем душу в каждый продукт, который производим',
                item4Title: 'Соответствие всем ГОСТам',
                item4Desc: 'Наш продукт соответствует всем государственным стандартам качества'
            },
            about: {
                title: 'О Наших Продуктах',
                text1: 'Мы предлагаем варенье и натуральный мед в удобных индивидуальных пакетиках-стиках по 13-14 грамм. Идеальное решение для бизнеса: отели, кафе, офисы, салоны, поликлиники, бани, магазины, школы, университеты и столовые.',
                text2: 'Каждый стик - это качественный продукт в индивидуальной упаковке. Цена за 1 стик всегда одинаковая - 70 тенге, независимо от количества заказа.',
                feature1: 'Упаковка стиками',
                feature1Desc: '13-14 грамм в каждом стике',
                feature2: 'Выгодная цена',
                feature2Desc: '70 〒 за стик',
                feature3: 'Для бизнеса',
                feature3Desc: 'Подходит для всех видов бизнеса'
            },
            products: {
                title: 'Ассортимент',
                raspberry: 'Малина',
                raspberryDesc: 'Варенье малина в стиках по 13-14г',
                strawberry: 'Клубника',
                strawberryDesc: 'Варенье клубника в стиках по 13-14г',
                currant: 'Смородина',
                currantDesc: 'Варенье смородина в стиках по 13-14г',
                honey: 'Натуральный Мёд',
                honeyDesc: 'Натуральный мед в стиках по 13-14г',
                priceNote: 'за стик',
                packaging: 'Фасовка и цены',
                packagingNote: 'Цена за стик — 70 〒',
                minOrder: 'Минимальный заказ: 5250 〒',
                delivery: 'Доставка по Астане',
                packaging80: '75 стиков (1 кг)'
            },
            kz: {
                packagingNote: '1 стиктің бағасы әрқашан бірдей — 70 〒',
                minOrder: 'Ең төменгі тапсырыс: 5500 〒'
            },
            benefits: {
                title: 'Подходит для бизнеса',
                hotel: 'Отели',
                hotelDesc: 'Идеально для завтраков и сервиса номеров',
                cafe: 'Кафе',
                cafeDesc: 'Удобно для сервировки столов и чайных церемоний',
                office: 'Офис',
                officeDesc: 'Для перерывов и кофе-брейков сотрудников',
                salon: 'Салон',
                salonDesc: 'Добавьте уют в ожидании ваших клиентов',
                clinic: 'Поликлиники',
                clinicDesc: 'Удобно для пациентов и персонала',
                sauna: 'Бани',
                saunaDesc: 'Идеально для отдыха и расслабления',
                shop: 'Магазины',
                shopDesc: 'Упаковка стиками для продажи',
                school: 'Школы',
                schoolDesc: 'Удобно для школьных столовых',
                university: 'Университеты',
                universityDesc: 'Для студенческих столовых и кафетериев',
                canteen: 'Столовые',
                canteenDesc: 'Идеально для общественного питания'
            },
            contact: {
                title: 'Свяжитесь с Нами',
                contacts: 'Наши Контакты',
                phone: 'Телефон:',
                phoneValue: 'бухгалтерии',
                email: 'Email:',
                address: 'Адрес:',
                addressValue: 'Казахстан',
                name: 'Ваше имя',
                emailPlaceholder: 'Ваш email',
                message: 'Ваше сообщение',
                send: 'Отправить'
            },
            footer: {
                copyright: '© 2024 Dala dami. Все права защищены.',
                tagline: '🍯 Варенье и натуральный мед в стиках'
            }
        },
        kz: {
            nav: {
                home: 'Басты бет',
                about: 'Біз туралы',
                aboutProducts: 'Біздің өнімдер туралы',
                products: 'Ассортимент',
                benefits: 'Пайда',
                contact: 'Байланыс'
            },
            hero: {
                title: 'Шырын және Табиғи Бал',
                subtitle: 'Стиктерде',
                description: '13-14г жеке пакеттердегі-стиктердегі ыңғайлы шырын және табиғи бал. Қонақ үйлер, кафе, балабақшалар, кеңселер және сәнділік студиялары үшін идеалды.',
                priceLabel: '1 стик',
                order: 'Тапсырыс беру'
            },
            aboutUs: {
                title: 'Біз туралы',
                item1Title: '16 жылдан астам уақытпен тексерілген',
                item1Desc: 'Біз нарықта 16 жылдан астам жұмыс істеп, клиенттеріміздің сенімін алдық',
                item2Title: 'Өз өндірісі',
                item2Desc: 'Барлық өндіріс процесі біздің бақылауымызда',
                item3Title: 'Әрбір стик махаббатпен жасалған',
                item3Desc: 'Біз өндіретін әрбір өнімге жан саламыз',
                item4Title: 'Барлық ГОСТ стандарттарына сәйкестік',
                item4Desc: 'Біздің өніміміз барлық мемлекеттік сапа стандарттарына сәйкес келеді'
            },
            about: {
                title: 'Біздің Өнімдер Туралы',
                text1: 'Біз 13-14 грамм жеке пакеттерде-стиктерде ыңғайлы шырын және табиғи бал ұсынамыз. Бизнес үшін идеалды шешім: қонақ үйлер, кафе, кеңселер, салондар, поликлиникалар, баңылар, дүкендер, мектептер, университеттер және асханалар.',
                text2: 'Әрбір стик - жеке орамадағы сапалы өнім. 1 стиктің бағасы әрқашан бірдей - 70 теңге, тапсырыс санына қарамастан.',
                feature1: 'Стик орама',
                feature1Desc: 'Әр стикте 13-14 грамм',
                feature2: 'Тиімді баға',
                feature2Desc: 'Стикке 70 〒',
                feature3: 'Бизнес үшін',
                feature3Desc: 'Барлық бизнес түрлеріне сәйкес келеді'
            },
            products: {
                title: 'Ассортимент',
                raspberry: 'Малина',
                raspberryDesc: '13-14г стиктердегі малина шырыны',
                strawberry: 'Құлпынай',
                strawberryDesc: '13-14г стиктердегі құлпынай шырыны',
                currant: 'Қарақат',
                currantDesc: '13-14г стиктердегі қарақат шырыны',
                honey: 'Табиғи Бал',
                honeyDesc: '13-14г стиктердегі табиғи бал',
                priceNote: 'стикке',
                packaging: 'Орау және бағалар',
                packagingNote: 'Стик бағасы — 70 〒',
                minOrder: 'Ең төменгі тапсырыс: 5250 〒',
                delivery: 'Астанаға жеткізу',
                packaging80: '75 стик (1 кг)'
            },
            benefits: {
                title: 'Бизнес үшін сәйкес',
                hotel: 'Қонақ үйлер',
                hotelDesc: 'Таңғы ас және бөлме қызметі үшін идеалды',
                cafe: 'Кафе',
                cafeDesc: 'Үстел қызметі және шай рәсімі үшін ыңғайлы',
                kindergarten: 'Балабақша',
                kindergartenDesc: 'Стик орама балаларға ыңғайлы',
                office: 'Кеңсе',
                officeDesc: 'Қызметкерлердің үзілістері мен кофе-брейктері үшін',
                beauty: 'Сәнділік студиялары',
                beautyDesc: 'Клиенттеріңіздің күту уақытына жайлылық қосыңыз'
            },
            contact: {
                title: 'Бізбен Байланысыңыз',
                contacts: 'Біздің Байланыстар',
                phone: 'Телефон:',
                phoneValue: 'есепшілік',
                email: 'Email:',
                address: 'Мекенжай:',
                addressValue: 'Қазақстан',
                name: 'Атыңыз',
                emailPlaceholder: 'Сіздің email',
                message: 'Сіздің хабарламаңыз',
                send: 'Жіберу'
            },
            footer: {
                copyright: '© 2024 Dala dami. Барлық құқықтар қорғалған.',
                tagline: '🍯 Стиктердегі шырын және табиғи бал'
            }
        }
    };

    let currentLang = localStorage.getItem('language') || 'ru';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        const t = translations[lang];

        // Обновляем навигацию
        document.querySelectorAll('.nav-menu a')[0].textContent = t.nav.home;
        document.querySelectorAll('.nav-menu a')[1].textContent = t.nav.about;
        document.querySelectorAll('.nav-menu a')[2].textContent = t.nav.aboutProducts;
        document.querySelectorAll('.nav-menu a')[3].textContent = t.nav.products;
        document.querySelectorAll('.nav-menu a')[4].textContent = t.nav.benefits;
        document.querySelectorAll('.nav-menu a')[5].textContent = t.nav.contact;
        
        // Обновляем hero секцию
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        const priceLabel = document.querySelector('.price-label');
        const orderBtn = document.querySelector('.hero .btn-primary');
        
        if (heroTitle) heroTitle.textContent = t.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
        if (heroDescription) heroDescription.textContent = t.hero.description;
        if (priceLabel) priceLabel.textContent = t.hero.priceLabel;
        if (orderBtn) orderBtn.textContent = t.hero.order;

        // Обновляем about-us секцию
        const aboutUsSection = document.querySelector('#about-us');
        if (aboutUsSection) {
            const aboutUsTitle = aboutUsSection.querySelector('.section-title');
            if (aboutUsTitle) aboutUsTitle.textContent = t.aboutUs.title;
            const aboutUsItems = aboutUsSection.querySelectorAll('.about-us-item');
            if (aboutUsItems[0]) {
                const h3 = aboutUsItems[0].querySelector('h3');
                const p = aboutUsItems[0].querySelector('p');
                if (h3) h3.textContent = t.aboutUs.item1Title;
                if (p) p.textContent = t.aboutUs.item1Desc;
            }
            if (aboutUsItems[1]) {
                const h3 = aboutUsItems[1].querySelector('h3');
                const p = aboutUsItems[1].querySelector('p');
                if (h3) h3.textContent = t.aboutUs.item2Title;
                if (p) p.textContent = t.aboutUs.item2Desc;
            }
            if (aboutUsItems[2]) {
                const h3 = aboutUsItems[2].querySelector('h3');
                const p = aboutUsItems[2].querySelector('p');
                if (h3) h3.textContent = t.aboutUs.item3Title;
                if (p) p.textContent = t.aboutUs.item3Desc;
            }
            if (aboutUsItems[3]) {
                const h3 = aboutUsItems[3].querySelector('h3');
                const p = aboutUsItems[3].querySelector('p');
                if (h3) h3.textContent = t.aboutUs.item4Title;
                if (p) p.textContent = t.aboutUs.item4Desc;
            }
        }

        // Обновляем about секцию
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const aboutTexts = aboutSection.querySelectorAll('.about-text p');
            if (aboutTexts[0]) aboutTexts[0].textContent = t.about.text1;
            if (aboutTexts[1]) aboutTexts[1].textContent = t.about.text2;
            const aboutTitle = aboutSection.querySelector('.section-title');
            if (aboutTitle) aboutTitle.textContent = t.about.title;
            const features = aboutSection.querySelectorAll('.feature');
            if (features[0]) {
                const h3 = features[0].querySelector('h3');
                const p = features[0].querySelector('p');
                if (h3) h3.textContent = t.about.feature1;
                if (p) p.textContent = t.about.feature1Desc;
            }
            if (features[1]) {
                const h3 = features[1].querySelector('h3');
                const p = features[1].querySelector('p');
                if (h3) h3.textContent = t.about.feature2;
                if (p) p.textContent = t.about.feature2Desc;
            }
            if (features[2]) {
                const h3 = features[2].querySelector('h3');
                const p = features[2].querySelector('p');
                if (h3) h3.textContent = t.about.feature3;
                if (p) p.textContent = t.about.feature3Desc;
            }
        }

        // Обновляем products секцию
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            const productsTitle = productsSection.querySelector('.section-title');
            if (productsTitle) productsTitle.textContent = t.products.title;
            const productCards = productsSection.querySelectorAll('.product-card');
            if (productCards[0]) {
                const h3 = productCards[0].querySelector('h3');
                const p = productCards[0].querySelector('p');
                if (h3) h3.textContent = t.products.raspberry;
                if (p) p.textContent = t.products.raspberryDesc;
            }
            if (productCards[1]) {
                const h3 = productCards[1].querySelector('h3');
                const p = productCards[1].querySelector('p');
                if (h3) h3.textContent = t.products.strawberry;
                if (p) p.textContent = t.products.strawberryDesc;
            }
            if (productCards[2]) {
                const h3 = productCards[2].querySelector('h3');
                const p = productCards[2].querySelector('p');
                if (h3) h3.textContent = t.products.currant;
                if (p) p.textContent = t.products.currantDesc;
            }
            if (productCards[3]) {
                const h3 = productCards[3].querySelector('h3');
                const p = productCards[3].querySelector('p');
                if (h3) h3.textContent = t.products.honey;
                if (p) p.textContent = t.products.honeyDesc;
            }
            productsSection.querySelectorAll('.product-price-note').forEach(el => el.textContent = t.products.priceNote);
            const packagingTitle = productsSection.querySelector('.packaging-title');
            const packagingNote = productsSection.querySelector('.packaging-note');
            const packagingMinOrder = productsSection.querySelector('.packaging-min-order');
            const packagingDelivery = productsSection.querySelector('.packaging-delivery');
            const packagingCount = productsSection.querySelector('.packaging-count');
            const packagingPrice = productsSection.querySelector('.packaging-price');
            if (packagingTitle) packagingTitle.textContent = t.products.packaging;
            if (packagingNote) packagingNote.textContent = t.products.packagingNote;
            if (packagingMinOrder) packagingMinOrder.textContent = t.products.minOrder;
            if (packagingDelivery) packagingDelivery.textContent = t.products.delivery;
            if (packagingCount) packagingCount.textContent = t.products.packaging80;
            if (packagingPrice) packagingPrice.textContent = '5250 〒';
        }

        // Обновляем benefits секцию
        const benefitsSection = document.querySelector('#benefits');
        if (benefitsSection) {
            const benefitsTitle = benefitsSection.querySelector('.section-title');
            if (benefitsTitle) benefitsTitle.textContent = t.benefits.title;
            const benefitItems = benefitsSection.querySelectorAll('.benefit-item');
            if (benefitItems[0]) {
                const h3 = benefitItems[0].querySelector('h3');
                const p = benefitItems[0].querySelector('p');
                if (h3) h3.textContent = t.benefits.hotel;
                if (p) p.textContent = t.benefits.hotelDesc;
            }
            if (benefitItems[1]) {
                const h3 = benefitItems[1].querySelector('h3');
                const p = benefitItems[1].querySelector('p');
                if (h3) h3.textContent = t.benefits.cafe;
                if (p) p.textContent = t.benefits.cafeDesc;
            }
            if (benefitItems[2]) {
                const h3 = benefitItems[2].querySelector('h3');
                const p = benefitItems[2].querySelector('p');
                if (h3) h3.textContent = t.benefits.office;
                if (p) p.textContent = t.benefits.officeDesc;
            }
            if (benefitItems[3]) {
                const h3 = benefitItems[3].querySelector('h3');
                const p = benefitItems[3].querySelector('p');
                if (h3) h3.textContent = t.benefits.salon;
                if (p) p.textContent = t.benefits.salonDesc;
            }
            if (benefitItems[4]) {
                const h3 = benefitItems[4].querySelector('h3');
                const p = benefitItems[4].querySelector('p');
                if (h3) h3.textContent = t.benefits.clinic;
                if (p) p.textContent = t.benefits.clinicDesc;
            }
            if (benefitItems[5]) {
                const h3 = benefitItems[5].querySelector('h3');
                const p = benefitItems[5].querySelector('p');
                if (h3) h3.textContent = t.benefits.sauna;
                if (p) p.textContent = t.benefits.saunaDesc;
            }
            if (benefitItems[6]) {
                const h3 = benefitItems[6].querySelector('h3');
                const p = benefitItems[6].querySelector('p');
                if (h3) h3.textContent = t.benefits.shop;
                if (p) p.textContent = t.benefits.shopDesc;
            }
            if (benefitItems[7]) {
                const h3 = benefitItems[7].querySelector('h3');
                const p = benefitItems[7].querySelector('p');
                if (h3) h3.textContent = t.benefits.school;
                if (p) p.textContent = t.benefits.schoolDesc;
            }
            if (benefitItems[8]) {
                const h3 = benefitItems[8].querySelector('h3');
                const p = benefitItems[8].querySelector('p');
                if (h3) h3.textContent = t.benefits.university;
                if (p) p.textContent = t.benefits.universityDesc;
            }
            if (benefitItems[9]) {
                const h3 = benefitItems[9].querySelector('h3');
                const p = benefitItems[9].querySelector('p');
                if (h3) h3.textContent = t.benefits.canteen;
                if (p) p.textContent = t.benefits.canteenDesc;
            }
        }

        // Обновляем contact секцию
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const contactTitle = contactSection.querySelector('.section-title');
            if (contactTitle) contactTitle.textContent = t.contact.title;
            const contactInfoH3 = contactSection.querySelector('.contact-info h3');
            if (contactInfoH3) contactInfoH3.textContent = t.contact.contacts;
            const contactItems = contactSection.querySelectorAll('.contact-item');
            if (contactItems[0]) contactItems[0].innerHTML = `<strong>${t.contact.phone}</strong> ${t.contact.phoneValue}`;
            if (contactItems[1]) contactItems[1].innerHTML = `<strong>${t.contact.email}</strong> info@honey-nature.ru`;
            if (contactItems[2]) contactItems[2].innerHTML = `<strong>${t.contact.address}</strong> ${t.contact.addressValue}`;
            const nameInput = contactSection.querySelector('.contact-form input[type="text"]');
            const emailInput = contactSection.querySelector('.contact-form input[type="email"]');
            const textarea = contactSection.querySelector('.contact-form textarea');
            const sendBtn = contactSection.querySelector('.contact-form .btn-primary');
            if (nameInput) nameInput.placeholder = t.contact.name;
            if (emailInput) emailInput.placeholder = t.contact.emailPlaceholder;
            if (textarea) textarea.placeholder = t.contact.message;
            if (sendBtn) sendBtn.textContent = t.contact.send;
        }

        // Обновляем footer
        const footerTexts = document.querySelectorAll('.footer p');
        footerTexts[0].textContent = t.footer.copyright;
        footerTexts[1].textContent = t.footer.tagline;

        // Обновляем атрибут lang
        document.documentElement.lang = lang;
    }

    // Инициализируем язык при загрузке
    updateLanguage(currentLang);

    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Анимация: убираем active с всех кнопок
            langButtons.forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'scale(0.95)';
            });
            
            // Анимация: добавляем active выбранной кнопке с анимацией
            setTimeout(() => {
                this.classList.add('active');
                this.style.transform = 'scale(1.05)';
                
                // Возвращаем размер
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }, 100);
            
            // Обновляем язык
            updateLanguage(lang);
        });
        
        // Устанавливаем активную кнопку при загрузке
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
});

// Header всегда остается неоново-желтым
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    if (header) {
        // Устанавливаем желтый цвет и добавляем обработчик на переключение темы
        header.style.setProperty('background', '#FFFF00', 'important');
        
        // Следим за изменениями классов body и принудительно устанавливаем желтый цвет
        const bodyObserver = new MutationObserver(() => {
            header.style.setProperty('background', '#FFFF00', 'important');
            header.style.setProperty('box-shadow', '0 2px 20px rgba(255, 255, 0, 0.5)', 'important');
        });
        
        bodyObserver.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
});

// Добавляем эффект при наведении на кнопки
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Скрытие/показ header при прокрутке
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Очищаем предыдущий таймаут
    clearTimeout(scrollTimeout);
    
    // Если прокрутка вниз и больше 100px
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add('hidden');
    } 
    // Если прокрутка вверх
    else if (currentScroll < lastScrollTop) {
        header.classList.remove('hidden');
    }
    
    // Если в самом верху страницы, показываем header
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

