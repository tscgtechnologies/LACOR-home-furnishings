/**
 * LACOR Home Furnishings - Interactive Elements Script
 * Features: Sticky header, Mobile drawer, Scroll reveal, Active navigation, FAQ Accordion, WhatsApp Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. STICKY HEADER & BACK-TO-TOP BUTTON
  const header = document.querySelector('.main-header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Show/hide Back-to-Top button
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Scroll to top when back-to-top is clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  // 2. MOBILE DRAWER NAVIGATION
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openMobileMenu = () => {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop page scroll behind menu
  };

  const closeMobileMenu = () => {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore page scroll
  };

  hamburgerMenu.addEventListener('click', openMobileMenu);
  closeDrawer.addEventListener('click', closeMobileMenu);
  drawerOverlay.addEventListener('click', closeMobileMenu);

  // Close menu when links are clicked
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // 3. SCROLL REVEAL ANIMATION (Intersection Observer)
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, no need to keep observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Triggers when 15% of element is in viewport
    rootMargin: '0px 0px -50px 0px' // Offset slightly before entering
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });


  // 4. ACTIVE NAVIGATION LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Offset header height
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);


  // 5. FAQ ACCORDION INTERACTION
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      const isOpen = faqItem.classList.contains('open');

      // Close other open FAQ items first (Accordion behavior)
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('open')) {
          item.classList.remove('open');
          item.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle current FAQ item
      if (isOpen) {
        faqItem.classList.remove('open');
        faqAnswer.style.maxHeight = null;
      } else {
        faqItem.classList.add('open');
        // Set dynamic height using scrollHeight
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      }
    });
  });


  // 6. CONTACT FORM VALIDATION & WHATSAPP REDIRECTION
  const whatsappForm = document.getElementById('whatsappForm');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const productSelect = document.getElementById('product');
  const messageTextarea = document.getElementById('message');
  const formSuccess = document.getElementById('formSuccess');
  const successName = document.getElementById('successName');

  // Input elements change/keyup events to remove error classes
  nameInput.addEventListener('input', () => {
    nameInput.parentElement.classList.remove('error');
  });

  phoneInput.addEventListener('input', () => {
    phoneInput.parentElement.classList.remove('error');
  });

  productSelect.addEventListener('change', () => {
    productSelect.parentElement.classList.remove('error');
  });

  // Validation function
  const validateForm = () => {
    let isValid = true;

    // Name Validation
    if (nameInput.value.trim() === '') {
      nameInput.parentElement.classList.add('error');
      isValid = false;
    } else {
      nameInput.parentElement.classList.remove('error');
    }

    // Phone Validation (Indian Mobile Format: 10 digits starting with 6-9)
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
      phoneInput.parentElement.classList.add('error');
      isValid = false;
    } else {
      phoneInput.parentElement.classList.remove('error');
    }

    // Product Category Validation
    if (productSelect.value === '') {
      productSelect.parentElement.classList.add('error');
      isValid = false;
    } else {
      productSelect.parentElement.classList.remove('error');
    }

    return isValid;
  };

  // Form submit handler
  whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const product = productSelect.value;
      const customMessage = messageTextarea.value.trim();

      // Format Message for WhatsApp
      let textMessage = `Hello LACOR home furnishings, I am interested in ${product}.\n\n`;
      textMessage += `*Details:*\n`;
      textMessage += `• *Name:* ${name}\n`;
      textMessage += `• *Phone:* ${phone}\n`;
      
      if (customMessage !== '') {
        textMessage += `• *Requirements:* ${customMessage}`;
      } else {
        textMessage += `• *Message:* Please contact me with more information.`;
      }

      // Encode URL
      const encodedMsg = encodeURIComponent(textMessage);
      const whatsappNumber = '919239538535'; // LACOR Store WhatsApp (International format)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

      // Show success overlay UI
      successName.textContent = name;
      formSuccess.classList.add('active');

      // Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Reset form & UI
        whatsappForm.reset();
        formSuccess.classList.remove('active');
      }, 1800);
    }
  });

});
