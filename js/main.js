/* ==========================================================================
   JAY MAHAKALI SEV USAL - MAIN INTERACTIVE LOGIC
   Outlet: Shop No. 9, Supan Serenity, Science City Rd, Sola, Ahmedabad
   Phone: 9316500189 | Hours: Daily 9:00 AM - 10:00 PM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStoreStatus();
  initSpiceMeter();
  initMenuFilters();
  initCateringCalculator();
  initFaqAccordion();
  initMobileMenu();
});

/* 1. Real-Time Store Status (9:00 AM - 10:00 PM IST) */
function initStoreStatus() {
  const statusBadges = document.querySelectorAll('.live-store-status');
  if (!statusBadges.length) return;

  function updateStatus() {
    // Current IST Time
    const now = new Date();
    // Convert to IST (UTC+5:30)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));
    const currentHour = istTime.getHours();
    const currentMinute = istTime.getMinutes();
    const currentTimeInMinutes = (currentHour * 60) + currentMinute;

    const openTimeInMinutes = 9 * 60; // 9:00 AM
    const closeTimeInMinutes = 22 * 60; // 10:00 PM

    const isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;

    statusBadges.forEach(badge => {
      if (isOpen) {
        badge.innerHTML = `<span class="live-indicator"></span> <strong>OPEN NOW</strong> (Closes 10:00 PM)`;
        badge.className = 'status-badge-open';
      } else {
        badge.innerHTML = `<span style="display:inline-block;width:8px;height:8px;background-color:#E74C3C;border-radius:50%;"></span> <strong>CLOSED NOW</strong> (Opens at 9:00 AM)`;
        badge.className = 'status-badge-open';
        badge.style.background = '#FDEDEC';
        badge.style.color = '#C0392B';
        badge.style.borderColor = '#C0392B';
      }
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000);
}

/* 2. Interactive Usal Styles (3 Ways to Enjoy Your Usal) */
function initSpiceMeter() {
  const spiceTabs = document.querySelectorAll('.spice-tab-btn');
  const spiceTitle = document.getElementById('spiceDisplayTitle');
  const spiceDesc = document.getElementById('spiceDisplayDesc');
  const spiceBadge = document.getElementById('spiceDisplayBadge');
  const spiceBtn = document.getElementById('spiceDisplayBtn');
  const spiceIcon = document.getElementById('spiceDisplayIcon');
  const spiceSub = document.getElementById('spiceDisplaySub');

  if (!spiceTabs.length || !spiceTitle) return;

  const styleData = {
    classic: {
      title: "The Classic Original (અસલી તીખો રસો)",
      desc: "Straight from the boiling cauldron! Unadulterated crimson Tari, tender green vatana, and crunchy Ratlami sev with fresh spring greens. If you love the authentic fiery kick of Gujarati street food, this is the master bowl.",
      badge: "THE ORIGINAL • AUTHENTIC KICK",
      btnText: "Order Classic Usal 🌶️",
      waText: "Hello Jay Mahakali! I want to order Classic Authentic Sev Usal.",
      icon: "🍲",
      sub: "BOILING TARI"
    },
    butter: {
      title: "Amul Butter Usal (અમૂલ બટર સેવ ઉસળ)",
      desc: "A generous slab of golden Amul Butter melts directly into the steaming hot Tari. The richness of the dairy beautifully coats the palate, softening the chili punch into a velvety, luscious gravy that is impossible to resist.",
      badge: "CHEF'S FAVORITE • VELVETY SMOOTH",
      btnText: "Order Butter Usal 🧈",
      waText: "Hello Jay Mahakali! I want to order Butter Sev Usal.",
      icon: "🧈",
      sub: "MELTING BUTTER"
    },
    cheese: {
      title: "Amul Cheese Usal (અમૂલ ચીઝ સેવ ઉસળ)",
      desc: "Blanketed with an avalanche of freshly grated Amul cheese. The shredded cheese melts into gooey savory threads that naturally tame the heat, making it the top pick for kids, teenagers, and anyone who prefers a milder, decadent flavor.",
      badge: "FAMILY HIT • MILD & CHEESY",
      btnText: "Order Cheese Usal 🧀",
      waText: "Hello Jay Mahakali! I want to order Cheese Sev Usal.",
      icon: "🧀",
      sub: "GRATED CHEESE"
    }
  };

  spiceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      spiceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const level = tab.getAttribute('data-level');
      const data = styleData[level];
      if (data) {
        spiceTitle.textContent = data.title;
        spiceDesc.textContent = data.desc;
        if (spiceBadge) spiceBadge.textContent = data.badge;
        if (spiceBtn) {
          spiceBtn.textContent = data.btnText;
          spiceBtn.href = `https://wa.me/919316500189?text=${encodeURIComponent(data.waText)}`;
        }
        if (spiceIcon) spiceIcon.textContent = data.icon;
        if (spiceSub) spiceSub.textContent = data.sub;
      }
    });
  });
}

/* 3. Menu Category Filtering (Strictly NO PRICES) */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!filterBtns.length || !menuCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      menuCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Interactive Bulk Food Orders & Quantity Calculator */
function initCateringCalculator() {
  const guestSlider = document.getElementById('guestSlider');
  const guestCountDisplay = document.getElementById('guestCountDisplay');
  const eventTypeSelect = document.getElementById('eventTypeSelect');
  const summaryGuests = document.getElementById('summaryGuests');
  const summaryType = document.getElementById('summaryType');
  const summaryAddons = document.getElementById('summaryAddons');
  const btnWhatsAppQuote = document.getElementById('btnWhatsAppQuote');

  if (!guestSlider || !guestCountDisplay) return;

  function updateCateringSummary() {
    const guests = guestSlider.value;
    guestCountDisplay.textContent = guests + " Persons";
    if (summaryGuests) summaryGuests.textContent = guests + " Persons";

    const eventName = eventTypeSelect ? eventTypeSelect.options[eventTypeSelect.selectedIndex].text : "Gathering";
    if (summaryType) summaryType.textContent = eventName;

    // Check selected addons
    const selectedAddons = [];
    document.querySelectorAll('.calc-addon-check:checked').forEach(cb => {
      selectedAddons.push(cb.getAttribute('data-name'));
    });

    if (summaryAddons) {
      summaryAddons.textContent = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Standard Bulk Packets';
    }

    // Prepare WhatsApp Message
    if (btnWhatsAppQuote) {
      const waText = encodeURIComponent(
        `Hello Jay Mahakali Sev Usal (Science City),\n` +
        `I would like to place/inquire about a Bulk Food Order:\n` +
        `• Occasion: ${eventName}\n` +
        `• Quantity / Persons: ${guests} people\n` +
        `• Add-ons & Items: ${selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Standard Sev Usal Pack'}\n` +
        `Please confirm availability, packaging, and pickup/delivery details!`
      );
      btnWhatsAppQuote.href = `https://wa.me/919316500189?text=${waText}`;
    }
  }

  guestSlider.addEventListener('input', updateCateringSummary);
  if (eventTypeSelect) eventTypeSelect.addEventListener('change', updateCateringSummary);
  document.querySelectorAll('.calc-addon-check').forEach(cb => {
    cb.addEventListener('change', updateCateringSummary);
  });

  updateCateringSummary();
}

/* 5. FAQ Accordion for AEO / Snippets */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* 6. Mobile Navigation Menu */
function initMobileMenu() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener('click', () => {
    const isExpanded = navLinks.style.display === 'flex';
    if (isExpanded) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#FFFDF5';
      navLinks.style.borderBottom = '3px solid #1A120B';
      navLinks.style.padding = '1.5rem';
      navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
    }
  });
}

/* Helper to order single dish via WhatsApp */
window.orderDishViaWhatsApp = function(dishName) {
  const text = encodeURIComponent(
    `Hello Jay Mahakali Sev Usal (Science City),\n` +
    `I want to order: ${dishName}\n` +
    `Please confirm preparation time and takeaway/delivery details.`
  );
  window.open(`https://wa.me/919316500189?text=${text}`, '_blank');
};
