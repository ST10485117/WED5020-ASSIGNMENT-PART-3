/* Isinkwa Bakery - Part 3 JavaScript */
document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Mobile menu toggle ---------- */
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.nav-menu');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }

    /* ---------- 2.1 Accordion (FAQ) ---------- */
    document.querySelectorAll('.accordion-header').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var panel = btn.nextElementSibling;
            var open = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!open));
            panel.style.maxHeight = open ? null : panel.scrollHeight + 'px';
        });
    });

    /* ---------- 2.1 Tabs (menu categories) ---------- */
    var tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var cat = btn.dataset.category;
            tabButtons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var catSelect = document.getElementById('categoryFilter');
            if (catSelect) { catSelect.value = cat; }
            renderMenu();
        });
    });

    /* ---------- 2.2 Dynamic menu + search / filter / sort ---------- */
    var menuData = [
        { name: 'Artisan Sourdough', cat: 'bread', price: 35, img: 'artisan-sourdough-loaf.svg', alt: 'Round artisan sourdough loaf with a crisp crust', desc: 'Traditional sourdough with a crisp crust and soft, airy interior. Fermented for 24 hours.' },
        { name: 'Whole Wheat Loaf', cat: 'bread', price: 28, img: 'whole-wheat-loaf.svg', alt: 'Sliced whole wheat loaf with a nutty texture', desc: 'Nutritious whole wheat bread with a hearty texture and rich, nutty flavour.' },
        { name: 'Rye Bread', cat: 'bread', price: 32, img: 'rye-bread-caraway.svg', alt: 'Dark rye bread with caraway seeds', desc: 'Dark, dense rye bread with caraway seeds. Perfect for sandwiches.' },
        { name: 'Ciabatta', cat: 'bread', price: 30, img: 'ciabatta-loaf.svg', alt: 'Italian ciabatta loaf with open crumb', desc: 'Italian-style bread with a crispy crust and open crumb structure.' },
        { name: 'Butter Croissant', cat: 'pastry', price: 22, img: 'butter-croissant.svg', alt: 'Golden flaky butter croissant', desc: 'Flaky, buttery layers of perfection. Made with French-style butter.' },
        { name: 'Pain au Chocolat', cat: 'pastry', price: 25, img: 'pain-au-chocolat.svg', alt: 'Pain au chocolat pastry with dark chocolate', desc: 'Buttery pastry wrapped around rich dark chocolate.' },
        { name: 'Danish Pastry', cat: 'pastry', price: 24, img: 'danish-pastry.svg', alt: 'Danish pastry with cheese filling and fruit', desc: 'Flaky pastry with sweet cheese filling and fruit topping.' },
        { name: 'Blueberry Muffin', cat: 'pastry', price: 18, img: 'blueberry-muffin.svg', alt: 'Blueberry muffin with crumb topping', desc: 'Moist muffin bursting with fresh blueberries and a crumb topping.' },
        { name: 'Carrot Cake', cat: 'cake', price: 40, img: 'carrot-cake-slice.svg', alt: 'Slice of carrot cake with cream cheese frosting', desc: 'Moist carrot cake with walnuts and cream cheese frosting. (Slice)' },
        { name: 'Chocolate Brownie', cat: 'cake', price: 35, img: 'chocolate-brownie.svg', alt: 'Fudgy chocolate brownie with dark chocolate chunks', desc: 'Rich, fudgy brownie with dark chocolate chunks.' },
        { name: 'Lemon Drizzle', cat: 'cake', price: 38, img: 'lemon-drizzle-cake.svg', alt: 'Lemon drizzle cake slice with citrus glaze', desc: 'Tangy lemon cake with a sweet citrus glaze. (Slice)' }
    ];

    var grid = document.getElementById('menuGrid');
    var searchInput = document.getElementById('menuSearch');
    var sortSelect = document.getElementById('menuSort');
    var catSelect = document.getElementById('categoryFilter');
    var countEl = document.getElementById('resultCount');

    function renderMenu() {
        if (!grid) { return; }
        var term = searchInput ? searchInput.value.trim().toLowerCase() : '';
        var cat = catSelect ? catSelect.value : 'all';
        var sort = sortSelect ? sortSelect.value : 'default';

        var items = menuData.filter(function (i) {
            var matchCat = cat === 'all' || i.cat === cat;
            var matchTerm = !term || i.name.toLowerCase().indexOf(term) > -1 || i.desc.toLowerCase().indexOf(term) > -1;
            return matchCat && matchTerm;
        });

        if (sort === 'price-asc') { items.sort(function (a, b) { return a.price - b.price; }); }
        if (sort === 'price-desc') { items.sort(function (a, b) { return b.price - a.price; }); }
        if (sort === 'name') { items.sort(function (a, b) { return a.name.localeCompare(b.name); }); }

        grid.innerHTML = '';
        items.forEach(function (i) {
            var card = document.createElement('article');
            card.className = 'menu-item';
            card.innerHTML =
                '<div class="menu-item-image"><img src="images/' + i.img + '" alt="' + i.alt + '" loading="lazy"></div>' +
                '<div class="menu-item-info"><h3>' + i.name + '</h3>' +
                '<p class="menu-item-desc">' + i.desc + '</p>' +
                '<span class="menu-item-price">R' + i.price + '</span></div>';
            grid.appendChild(card);
        });

        if (countEl) {
            countEl.textContent = items.length + (items.length === 1 ? ' item found' : ' items found');
        }
        if (!items.length) {
            grid.innerHTML = '<p class="no-results">No items match your search. Try a different word.</p>';
        }
    }

    if (searchInput) { searchInput.addEventListener('input', renderMenu); }
    if (sortSelect) { sortSelect.addEventListener('change', renderMenu); }
    if (catSelect) {
        catSelect.addEventListener('change', function () {
            tabButtons.forEach(function (b) { b.classList.toggle('active', b.dataset.category === catSelect.value); });
            renderMenu();
        });
    }
    renderMenu();

    /* ---------- 2.1 Gallery + Lightbox ---------- */
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
        var lbImg = lightbox.querySelector('img');
        var lbCap = lightbox.querySelector('.lightbox-caption');
        var thumbs = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
        var current = 0;

        function show(i) {
            current = (i + thumbs.length) % thumbs.length;
            var t = thumbs[current].querySelector('img');
            lbImg.src = t.src;
            lbImg.alt = t.alt;
            lbCap.textContent = t.alt;
        }
        function openLb(i) { show(i); lightbox.classList.add('open'); document.body.style.overflow = 'hidden'; }
        function closeLb() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }

        thumbs.forEach(function (el, i) {
            el.addEventListener('click', function () { openLb(i); });
            el.addEventListener('keydown', function (e) { if (e.key === 'Enter') { openLb(i); } });
        });
        lightbox.querySelector('.lb-close').addEventListener('click', closeLb);
        lightbox.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
        lightbox.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
        lightbox.addEventListener('click', function (e) { if (e.target === lightbox) { closeLb(); } });
        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('open')) { return; }
            if (e.key === 'Escape') { closeLb(); }
            if (e.key === 'ArrowRight') { show(current + 1); }
            if (e.key === 'ArrowLeft') { show(current - 1); }
        });
    }

    /* ---------- 2.1 Interactive map (Leaflet) ---------- */
    var mapEl = document.getElementById('storeMap');
    if (mapEl && window.L) {
        var stores = [
            { name: 'Main Store - Woodstock', lat: -33.9275, lng: 18.4490, info: '123 Victoria Street, Woodstock<br>Mon-Fri 6:30am - 4:00pm' },
            { name: 'V&amp;A Waterfront Market', lat: -33.9036, lng: 18.4206, info: 'V&amp;A Waterfront, Cape Town<br>Mon-Sat 9:00am - 6:00pm' }
        ];
        var map = L.map('storeMap').setView([-33.915, 18.435], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        var markers = stores.map(function (s) {
            return L.marker([s.lat, s.lng]).addTo(map).bindPopup('<strong>' + s.name + '</strong><br>' + s.info);
        });
        document.querySelectorAll('.map-btn').forEach(function (b) {
            b.addEventListener('click', function () {
                var idx = Number(b.dataset.store);
                map.flyTo([stores[idx].lat, stores[idx].lng], 15);
                markers[idx].openPopup();
            });
        });
    }

    /* ---------- 4. Forms: validation + AJAX ---------- */
    function setError(input, msg) {
        var group = input.closest('.form-group');
        var err = group.querySelector('.error-msg');
        if (!err) {
            err = document.createElement('span');
            err.className = 'error-msg';
            err.setAttribute('role', 'alert');
            group.appendChild(err);
        }
        err.textContent = msg;
        input.classList.toggle('invalid', !!msg);
        input.classList.toggle('valid', !msg && input.value.trim() !== '');
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }

    function validateField(input) {
        var v = input.value.trim();
        var msg = '';
        if (input.required && !v) {
            msg = 'This field is required.';
        } else if (v) {
            if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
                msg = 'Please enter a valid email address (e.g. name@example.com).';
            } else if (input.type === 'tel' && !/^(\+27|0)[0-9]{9}$/.test(v.replace(/[\s-]/g, ''))) {
                msg = 'Enter a valid South African number, e.g. 082 123 4567.';
            } else if (input.name === 'name' && v.length < 2) {
                msg = 'Name must be at least 2 characters.';
            } else if (input.tagName === 'TEXTAREA' && v.length < 10) {
                msg = 'Message must be at least 10 characters.';
            } else if (input.type === 'date') {
                var today = new Date(); today.setHours(0, 0, 0, 0);
                if (new Date(v) < today) { msg = 'Please choose today or a future date.'; }
            } else if (input.type === 'number' && (Number(v) < Number(input.min) || Number(v) > Number(input.max))) {
                msg = 'Enter a number between ' + input.min + ' and ' + input.max + '.';
            }
        }
        setError(input, msg);
        return !msg;
    }

    function prepareForm(form) {
        var fields = form.querySelectorAll('input:not([type=checkbox]), select, textarea');
        fields.forEach(function (f) {
            f.addEventListener('blur', function () { validateField(f); });
            f.addEventListener('input', function () { if (f.classList.contains('invalid')) { validateField(f); } });
        });
        return fields;
    }

    /* Enquiry form: validate, then calculate a quote (processed response) */
    var enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        var eFields = prepareForm(enquiryForm);
        var dateInput = document.getElementById('date-needed');
        if (dateInput) { dateInput.min = new Date().toISOString().split('T')[0]; }

        var prices = { 'custom-order': 450, 'catering': 120, 'event': 180, 'other': 0 };
        var leadDays = { 'custom-order': 2, 'catering': 7, 'event': 7, 'other': 2 };

        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = true;
            eFields.forEach(function (f) { if (!validateField(f)) { ok = false; } });
            if (!ok) {
                var first = enquiryForm.querySelector('.invalid');
                if (first) { first.focus(); }
                return;
            }
            var subject = enquiryForm.subject.value;
            var qty = Number(enquiryForm.quantity.value || 1);
            var box = document.getElementById('enquiryResponse');
            var cost = subject === 'other' ? 'We will confirm pricing after reviewing your message.' :
                'Estimated cost: R' + (prices[subject] * (subject === 'custom-order' ? 1 : qty)).toLocaleString('en-ZA') +
                (subject === 'custom-order' ? ' (starting price, final price depends on design)' : ' (R' + prices[subject] + ' per person x ' + qty + ')');
            var earliest = new Date(); earliest.setDate(earliest.getDate() + leadDays[subject]);
            var requested = enquiryForm['date-needed'].value ? new Date(enquiryForm['date-needed'].value) : null;
            var avail = (!requested || requested >= earliest) ?
                'Good news - we can accommodate your date.' :
                'Your date is inside our lead time. The earliest available date is ' + earliest.toDateString() + '.';

            box.innerHTML = '<h3>Thank you, ' + enquiryForm.name.value.trim() + '!</h3>' +
                '<p>' + cost + '</p><p>' + avail + '</p>' +
                '<p>A confirmation will be sent to ' + enquiryForm.email.value.trim() + '.</p>';
            box.hidden = false;
            box.scrollIntoView({ behavior: 'smooth', block: 'center' });

            /* AJAX submission (asynchronous, page does not reload) */
            var data = new FormData(enquiryForm);
            fetch('https://formspree.io/f/your-form-id', { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
                .catch(function () { /* demo endpoint - response above is shown regardless */ });
            enquiryForm.reset();
            eFields.forEach(function (f) { f.classList.remove('valid', 'invalid'); });
        });
    }

    /* Contact form: validate, then compile message into a mailto email */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        var cFields = prepareForm(contactForm);
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = true;
            cFields.forEach(function (f) { if (!validateField(f)) { ok = false; } });
            if (!ok) {
                var first = contactForm.querySelector('.invalid');
                if (first) { first.focus(); }
                return;
            }
            var body = 'Name: ' + contactForm.name.value + '\nEmail: ' + contactForm.email.value +
                '\nPhone: ' + contactForm.phone.value + '\nType: ' + contactForm.type.value +
                '\n\nMessage:\n' + contactForm.message.value;
            var link = 'mailto:info@isinkwabakery.co.za?subject=' +
                encodeURIComponent('Website message: ' + contactForm.type.value) +
                '&body=' + encodeURIComponent(body);
            var box = document.getElementById('contactResponse');
            box.innerHTML = '<h3>Your message is ready</h3><p>Thank you, ' + contactForm.name.value.trim() +
                '. Click below to send it from your email app.</p>' +
                '<a class="btn btn-primary" href="' + link + '">Send Email</a>';
            box.hidden = false;
            box.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    /* Newsletter / quick form on contact page uses same validation */
    var quick = document.getElementById('quickContactForm');
    if (quick) { prepareForm(quick); }
});
