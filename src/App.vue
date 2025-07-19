<script setup>
// Placeholder for any future script logic
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

// Import LanguageSwitcher
import LanguageSwitcher from './components/LanguageSwitcher.vue';

// Use i18n
const { t, tm, locale } = useI18n();

// Import logo images
import univ1Logo from '../public/logos/univ1.png';
import univ2Logo from '../public/logos/univ2.png';
import univ3Logo from '../public/logos/univ3.png';

// Universities data loaded from i18n
const rawUniversitiesData = computed(() => tm('universities.data'));
const logos = [univ1Logo, univ2Logo, univ3Logo];
const universities = computed(() =>
  rawUniversitiesData.value.map((u, idx) => ({
    logo: logos[idx],
    name: u.name,
    description: u.description,
    departments: u.departments
  }))
);

// Config for Advantages Section (use i18n translation keys)
const advantagesConfig = [
  { icon: 'fa-award', titleKey: 'advantages.recognition.title', descriptionKey: 'advantages.recognition.description' },
  { icon: 'fa-euro-sign', titleKey: 'advantages.costs.title', descriptionKey: 'advantages.costs.description' },
  { icon: 'fa-hand-holding-heart', titleKey: 'advantages.livingCosts.title', descriptionKey: 'advantages.livingCosts.description' },
  { icon: 'fa-graduation-cap', titleKey: 'advantages.multilingualEducation.title', descriptionKey: 'advantages.multilingualEducation.description' },
  { icon: 'fa-globe-europe', titleKey: 'advantages.location.title', descriptionKey: 'advantages.location.description' },
  { icon: 'fa-id-card', titleKey: 'advantages.citizenship.title', descriptionKey: 'advantages.citizenship.description' },
  { icon: 'fa-handshake', titleKey: 'advantages.diplomaRecognition.title', descriptionKey: 'advantages.diplomaRecognition.description' },
  { icon: 'fa-university', titleKey: 'advantages.mutualEducation.title', descriptionKey: 'advantages.mutualEducation.description' }
];

// Config for Residency Steps (use i18n translation keys)
const residencyStepsConfig = [
  { icon: 'fa-user-graduate', titleKey: 'advantages.residencySteps.step1.title', descriptionKey: 'advantages.residencySteps.step1.description' },
  { icon: 'fa-briefcase', titleKey: 'advantages.residencySteps.step2.title', descriptionKey: 'advantages.residencySteps.step2.description' },
  { icon: 'fa-home', titleKey: 'advantages.residencySteps.step3.title', descriptionKey: 'advantages.residencySteps.step3.description' },
  { icon: 'fa-passport', titleKey: 'advantages.residencySteps.step4.title', descriptionKey: 'advantages.residencySteps.step4.description' },
  { icon: 'fa-flag-checkered', titleKey: 'advantages.residencySteps.step5.title', descriptionKey: 'advantages.residencySteps.step5.description' },
  { icon: 'fa-id-badge', titleKey: 'advantages.residencySteps.step6.title', descriptionKey: 'advantages.residencySteps.step6.description' }
];

// Config for Application Process Section (use i18n translation keys)
const processStepsConfig = [
  { number: 1, titleKey: 'process.step1.title', descriptionKey: 'process.step1.description' },
  { number: 2, titleKey: 'process.step2.title', descriptionKey: 'process.step2.description' },
  { number: 3, titleKey: 'process.step3.title', descriptionKey: 'process.step3.description' },
  { number: 4, titleKey: 'process.step4.title', descriptionKey: 'process.step4.description' }
];

// Config for Statistics Section (use i18n translation keys)
const statsConfig = [
  { icon: 'fa-user-graduate', value: '1200+', labelKey: 'stats.graduates' },
  { icon: 'fa-briefcase', value: '5+', labelKey: 'stats.experience' },
  { icon: 'fa-university', value: '15+', labelKey: 'stats.universities' },
  { icon: 'fa-passport', value: '98%', labelKey: 'stats.visaSuccess' }
];

const mobileMenuOpen = ref(false);

const newsImages = ref([
  '/images/news1.jpeg',
  '/images/news2.jpeg',
  '/images/news3.jpeg'
]);

// Load news updates from i18n
const newsUpdates = computed(() => tm('news.data'));

// Testimonials config - loaded from i18n messages
const testimonials = computed(() => tm('testimonials.data'));

// Computed property for language-specific logo
const logoSrc = computed(() => {
  return locale.value === 'en' ? '/IKRA_logo_eng.png' : '/IKRA_logo.png';
});

// Add navbar scroll effect and parallax effect for collage
onMounted(() => {
  // Apply initial shimmer to IKRA text for 3 seconds
  setTimeout(() => {
    const ikraText = document.getElementById('ikra-text');
    if (ikraText) {
      ikraText.classList.add('shimmer-initial');
      
      // Remove the class after 3 seconds
      setTimeout(() => {
        ikraText.classList.remove('shimmer-initial');
      }, 5000);
    }
  }, 500); // Small delay to ensure DOM is fully loaded

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for collage
    const collageSection = document.querySelector('.about');
    if (collageSection) {
      const collageImages = document.querySelectorAll('.collage-image');
      const scrollPosition = window.scrollY;
      
      // Check if collage is in viewport
      const rect = collageSection.getBoundingClientRect();
      const isInViewport = (
        rect.top <= window.innerHeight &&
        rect.bottom >= 0
      );
      
      if (isInViewport) {
        collageImages.forEach((image) => {
          // Different parallax speeds based on image position
          let speed = 0;
          
          if (image.classList.contains('main-img')) {
            speed = 0.02; // Slowest for center image
          } else if (
            image.classList.contains('img-top-left') || 
            image.classList.contains('img-top-right') ||
            image.classList.contains('img-bottom-left') ||
            image.classList.contains('img-bottom-right')
          ) {
            speed = 0.04; // Medium for corner images
          } else {
            speed = 0.06; // Fastest for middle edge images
          }
          
          const yOffset = (scrollPosition - rect.top) * speed;
          image.style.transform = `${image.style.transform.split('translateZ')[0]} translateZ(${5 + yOffset}px)`;
        });
      }
    }
    
    // Animation for testimonial cards when they come into view
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
      const rect = testimonialsSection.getBoundingClientRect();
      const isInViewport = (
        rect.top <= window.innerHeight - 200 &&
        rect.bottom >= 200
      );
      
      if (isInViewport) {
        testimonialsSection.classList.add('in-view');
      }
    }
  });
  
  // Add 3D tilt effect on mouse move for the collage
  const collageContainer = document.querySelector('.collage-container');
  if (collageContainer) {
    const images = collageContainer.querySelectorAll('.collage-image');
    
    collageContainer.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = collageContainer.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - top) / height - 0.5;  // -0.5 to 0.5
      
      // Apply rotation to container
      collageContainer.style.transform = `perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
      
      // Apply movement to images based on their position
      images.forEach(image => {
        let speedX = 0;
        let speedY = 0;
        
        // Main image moves less
        if (image.classList.contains('main-img')) {
          speedX = x * 10;
          speedY = y * 10;
        } 
        // Corner images move more
        else if (
          image.classList.contains('img-top-left') || 
          image.classList.contains('img-top-right') ||
          image.classList.contains('img-bottom-left') ||
          image.classList.contains('img-bottom-right')
        ) {
          speedX = x * 20;
          speedY = y * 20;
        } 
        // Middle images move most
        else {
          speedX = x * 25;
          speedY = y * 25;
        }
        
        // Extract existing transform
        let transform = image.style.transform || window.getComputedStyle(image).transform;
        
        // Replace or add the translation values
        if (transform.includes('translate3d')) {
          // Update existing translate3d
          transform = transform.replace(/translate3d\([^)]+\)/, `translate3d(${speedX}px, ${speedY}px, 5px)`);
        } else {
          // Add translate3d
          transform += ` translate3d(${speedX}px, ${speedY}px, 5px)`;
        }
        
        image.style.transform = transform;
      });
    });
    
    // Reset position when mouse leaves
    collageContainer.addEventListener('mouseleave', () => {
      collageContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      images.forEach(image => {
        // Extract original transform classes
        let classes = Array.from(image.classList);
        let relevantClass = classes.find(cls => 
          cls.includes('img-top') || 
          cls.includes('img-middle') || 
          cls.includes('img-bottom') || 
          cls === 'main-img'
        );
        
        // Reset to original transform from CSS
        if (relevantClass) {
          const computedStyle = window.getComputedStyle(image);
          image.style.transform = '';
        }
      });
    });
    
    // Reset position when mouse enters (to ensure clean state)
    collageContainer.addEventListener('mouseenter', () => {
      collageContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      images.forEach(image => {
        image.style.transform = '';
      });
    });
  }
});

// Config for About Us Section
const aboutParagraphs = computed(() => tm('about.paragraphs'));
const aboutFeatures = computed(() => tm('about.features'));
</script>

<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-content">
        <button class="mobile-menu-button" @click="mobileMenuOpen = !mobileMenuOpen">
          <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
        <a href="#" class="logo-container">
          <img :src="logoSrc" :srcset="logoSrc + ' 2x'" :alt="locale.value === 'en' ? 'IKRA Education Consultancy Logo' : 'İKRA Eğitim Danışmanlığı Logo'" class="logo-image">
        </a>
        <div class="nav-right">
        <ul :class="['nav-links', { open: mobileMenuOpen }]">
            <li><a href="#">{{ t('nav.home') }}</a></li>
            <li><a href="#avantajlar">{{ t('nav.advantages') }}</a></li>
            <li><a href="#basvuru-sureci">{{ t('nav.application') }}</a></li>
            <li><a href="#referanslar">{{ t('nav.testimonials') }}</a></li>
            <li><a href="#universiteler">{{ t('nav.universities') }}</a></li>
            <li><a href="#stats">{{ t('nav.stats') }}</a></li>
            <li><a href="#hakkimizda">{{ t('nav.about') }}</a></li>
            <li><a href="#updates">{{ t('nav.news') }}</a></li>
            <li><a href="#iletisim">{{ t('nav.contact') }}</a></li>
        </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>

    <!-- Hero Section (Enhanced) -->
    <section class="hero container-full-width">
      <div class="hero-overlay"></div>
      <div class="hero-decoration-left"></div>
      <div class="hero-decoration-right"></div>
      <div class="hero-brand-showcase">
        <div class="hero-brand-logo-container">
          <img :src="logoSrc" :srcset="logoSrc + ' 2x'" :alt="locale.value === 'en' ? 'IKRA Education Consultancy Logo' : 'İKRA Eğitim Danışmanlığı Logo'" class="hero-brand-logo">
        </div>
      </div>
      <div class="container hero-content">
        <div class="hero-text">
          <div class="badge-container">
            <div class="badge">{{ t('hero.badge') }}</div>
          </div>
          <h1 v-html="t('hero.title', [
            `<span class='highlight'>${t('hero.titleHighlight1')}</span>`,
            `<span id='ikra-text' class='highlight-red'>${t('hero.titleHighlight2')}</span>`
          ])"></h1>
          <p>{{ t('hero.description') }}</p>
          <div class="cta-group">
            <a href="#iletisim" class="btn primary hero-btn">{{ t('hero.applyNow') }}</a>
            <a href="#avantajlar" class="btn secondary hero-btn-secondary">{{ t('hero.discoverAdvantages') }}</a>
          </div>
          <div class="trust-indicators" style="display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; justify-content: center !important; gap: 2rem !important; width: 100% !important; margin-bottom: 3rem !important;">
            <div class="indicator" style="display: flex !important; flex-direction: row !important; align-items: center !important; white-space: nowrap !important;">
              <i class="fas fa-check-circle"></i>
              <span>{{ t('hero.experience') }}</span>
            </div>
            <div class="indicator" style="display: flex !important; flex-direction: row !important; align-items: center !important; white-space: nowrap !important;">
              <i class="fas fa-check-circle"></i>
              <span>{{ t('hero.students') }}</span>
            </div>
            <div class="indicator" style="display: flex !important; flex-direction: row !important; align-items: center !important; white-space: nowrap !important;">
              <i class="fas fa-check-circle"></i>
              <span>{{ t('hero.visaSuccess') }}</span>
            </div>
          </div>
          <div class="explore-more">
            <span>{{ t('hero.exploreMore') }}</span>
            <div class="scroll-indicator">
              <span class="scroll-arrow"></span>
              <span class="scroll-arrow"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Advantages Section (NEW) -->
    <section id="avantajlar" class="advantages">
      <div class="container">
        <h2 class="section-title">{{ t('advantages.title') }}</h2>
        <p class="section-subtitle">{{ t('advantages.subtitle') }}</p>
        
        <div class="advantages-grid">
          <div v-for="(advantage, index) in advantagesConfig" :key="index" class="advantage-card">
            <div class="advantage-icon">
              <i :class="'fas ' + advantage.icon"></i>
            </div>
            <h3 class="advantage-title">{{ t(advantage.titleKey) }}</h3>
            <p class="advantage-description">{{ t(advantage.descriptionKey) }}</p>
          </div>
        </div>
        
        <div class="residency-citizenship">
          <div class="residency-header">
            <h3>{{ t('advantages.residency.title') }}</h3>
            <p class="residency-intro">{{ t('advantages.residency.intro') }}</p>
          </div>
          
          <div class="residency-steps">
            <div v-for="(step, index) in residencyStepsConfig" :key="index" class="residency-step">
              <div class="step-icon">
                <i :class="'fas ' + step.icon"></i>
              </div>
              <div class="step-content">
                <h4>{{ t(step.titleKey) }}</h4>
                <p>{{ t(step.descriptionKey) }}</p>
              </div>
            </div>
          </div>
          
          <div class="residency-note">
            <div class="note-icon">
              <i class="fas fa-info-circle"></i>
            </div>
            <p>{{ t('advantages.note') }}</p>
          </div>
          
          <!-- Diploma Recognition Section -->
          <div class="residency-note diploma-recognition">
            <div class="note-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <p>{{ t('advantages.diplomaNote') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Process Section -->
    <section id="basvuru-sureci" class="process">
      <div class="container">
        <h2 class="section-title">{{ t('process.title') }}</h2>
        <div class="process-steps-grid">
          <div v-for="(step, index) in processStepsConfig" :key="index" class="step-card">
            <div class="step-number">{{ step.number }}</div>
            <h3>{{ t(step.titleKey) }}</h3>
            <p>{{ t(step.descriptionKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="referanslar" class="testimonials">
      <div class="container">
        <h2 class="section-title">{{ t('testimonials.title') }}</h2>
        <div class="testimonial-grid">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
            <div class="testimonial-content">
              <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
              <p>{{ testimonial.quote }}</p>
              <div class="testimonial-author">
                <div class="author-name">- {{ testimonial.author }}</div>
                <div class="author-program">({{ testimonial.program }})</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Destinations/Universities Section -->
    <section id="universiteler" class="universities">
      <div class="container">
        <h2 class="section-title">{{ t('universities.title') }}</h2>
        <p class="section-subtitle">{{ t('universities.subtitle') }}</p>
        
        <div class="universities-grid">
          <div v-for="(uni, index) in universities" :key="uni.logo" class="university-card">
            <div class="university-header">
              <div class="university-logo-container">
                <img :src="uni.logo" :alt="uni.name" class="university-logo" />
              </div>
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
            
            <div class="university-content">
              <p class="university-description">{{ uni.description }}</p>
              
              <div class="university-departments-wrapper">
                <h4 class="departments-title">{{ t('universities.departments') }}</h4>
                <div class="department-grid">
                  <div v-for="dept in uni.departments" :key="dept" class="department-item">
                    <i class="fas fa-graduation-cap department-icon"></i>
                    <span>{{ dept }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section id="stats" class="stats">
      <div class="container">
        <h2 class="section-title">{{ t('stats.title') }}</h2>
        <p class="section-subtitle">{{ t('stats.subtitle') }}</p>
        <div class="stats-grid">
          <div v-for="(stat, index) in statsConfig" :key="index" class="stat-card">
            <i :class="'fas ' + stat.icon + ' stat-icon'" aria-hidden="true"></i>
            <h3>{{ stat.value }}</h3>
            <p>{{ t(stat.labelKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="hakkimizda" class="about">
      <div class="container">
        <h2 class="section-title">{{ t('about.title') }}</h2>
        <div class="about-content-wrapper">
          <div class="about-image">
            <!-- collage -->
            <div class="collage-container">
              <!-- Ana kolaj görselleri -->
              <div class="collage-image main-img">
                <img src="/images/about-collage/H9.jpeg" alt="Kampüs Yaşamı" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              
              <!-- Üst kolaj görselleri -->
              <div class="collage-image img-top-left">
                <img src="/images/about-collage/H1.jpeg" alt="Makedonya Kampüsü" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              <div class="collage-image img-top-right">
                <img src="/images/about-collage/H8.jpeg" alt="Makedonya Eğitim" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              
              <!-- Orta kolaj görselleri -->
              <div class="collage-image img-middle-left">
                <img src="/images/about-collage/H6.jpeg" alt="Öğrenci Hayatı" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              <div class="collage-image img-middle-right">
                <img src="/images/about-collage/H3.jpeg" alt="Üniversite Kütüphanesi" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              
              <!-- Alt kolaj görselleri -->
              <div class="collage-image img-bottom-left">
                <img src="/images/about-collage/H4.jpeg" alt="Eğitim Olanakları" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              <div class="collage-image img-bottom-right">
                <img src="/images/about-collage/H7.jpeg" alt="Üniversite Deneyimi" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              
              <!-- Dışta kalan görseller -->
              <div class="collage-image img-top-middle">
                <img src="/images/about-collage/H5.jpeg" alt="Makedonya Eğitim Sistemi" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              <div class="collage-image img-bottom-middle">
                <img src="/images/about-collage/H2.jpeg" alt="Makedonya Mimarisi" class="collage-img">
                <div class="img-overlay"></div>
              </div>
              
              <!-- Dekoratif desenler -->
              <div class="collage-pattern pattern-1"></div>
              <div class="collage-pattern pattern-2"></div>
            </div>
            <div class="about-experience-badge">
              <span class="about-experience-number">5+</span>
              <span class="about-experience-text">{{ t('about.experience') }}</span>
            </div>
          </div>
          <div class="about-text">
            <div class="about-text-header">
              <div class="about-tag">{{ t('about.tag') }}</div>
              <h3 v-html="t('about.subtitle')" class="about-subtitle"></h3>
            </div>
            <div class="about-paragraphs">
              <p v-for="(p, i) in aboutParagraphs" :key="i">{{ p }}</p>
            </div>
            <div class="about-features">
              <div v-for="(feature, i) in aboutFeatures" :key="i" class="about-feature">
                <div class="feature-icon-circle">
                  <i class="fas fa-check feature-icon"></i>
                </div>
                <span>{{ feature }}</span>
              </div>
            </div>
            <div class="about-cta">
              <a href="#iletisim" class="btn primary about-btn">{{ t('about.contactUs') }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Updates Section -->
    <section id="updates" class="updates">
      <div class="container">
        <h2 class="section-title">{{ t('news.title') }}</h2>
        <div class="update-grid">
          <div class="update-card" v-for="(update, index) in newsUpdates" :key="index">
            <div class="update-image">
              <img :src="update.image" :alt="update.title" />
              <div class="update-date">
                <span class="date-day">{{ update.date.day }}</span>
                <span class="date-month">{{ update.date.month }}</span>
          </div>
        </div>
            <div class="update-content">
              <h3 class="update-title">{{ update.title }}</h3>
              <p class="update-summary">{{ update.summary }}</p>
          </div>
          </div>
          </div>
        <!-- 'Tüm Haberler' button removed as requested -->
      </div>
    </section>

    <!-- Contact Section -->
    <section id="iletisim" class="contact">
      <div class="container">
        <h2 class="section-title">{{ t('contact.title') }}</h2>
        <p class="contact-subtitle">{{ t('contact.subtitle') }}</p>
        
        <div class="contact-wrapper">
          <div class="contact-info">
            <div class="contact-info-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
          </div>
              <div class="contact-text">
                <h3>{{ t('contact.address.title') }}</h3>
                <p>{{ t('contact.address.value') }}</p>
          </div>
          </div>
            
            <div class="contact-info-item">
              <div class="contact-icon">
                <i class="fab fa-whatsapp"></i>
          </div>
              <div class="contact-text">
                <h3>{{ t('contact.whatsapp.title') }}</h3>
                <p>{{ t('contact.whatsapp.value') }}</p>
        </div>
      </div>
            
            <div class="contact-info-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
          </div>
              <div class="contact-text">
                <h3>{{ t('contact.email.title') }}</h3>
                <p><a href="mailto:info@ikra-education.com">info@ikra-education.com</a></p>
          </div>
          </div>
            
            <div class="contact-social">
              <a href="https://www.instagram.com/ikraegitim/" target="_blank" class="contact-social-icon">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/ikra.yurtdisi.danismanligi" target="_blank" class="contact-social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://api.whatsapp.com/send?phone=38975623575" target="_blank" class="contact-social-icon">
                <i class="fab fa-whatsapp"></i>
              </a>
          </div>
          </div>
          
          <div class="contact-form-container">
            <form action="#" method="post" class="contact-form">
              <div class="form-group">
                <label for="name">{{ t('contact.form.name') }}</label>
                <input type="text" id="name" name="name" :placeholder="t('contact.form.name')" required>
          </div>
              
              <div class="form-group">
                <label for="email">{{ t('contact.form.email') }}</label>
                <input type="email" id="email" name="email" :placeholder="t('contact.form.email')" required>
        </div>
              
              <div class="form-group">
                <label for="phone">{{ t('contact.form.phone') }}</label>
                <input type="tel" id="phone" name="phone" :placeholder="t('contact.form.phone')" required>
      </div>
              
              <div class="form-group">
                <label for="message">{{ t('contact.form.message') }}</label>
                <textarea id="message" name="message" :placeholder="t('contact.form.messagePlaceholder')" rows="4" required></textarea>
              </div>
              
              <button type="submit" class="btn primary contact-btn">
                <span>{{ t('contact.form.send') }}</span>
                <i class="fas fa-paper-plane"></i>
              </button>
        </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Floating Social Icons -->
    <div class="social-icons">
      <a href="https://www.instagram.com/ikraegitim/" target="_blank" class="social-icon instagram" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://facebook.com/ikra.yurtdisi.danismanligi" target="_blank" class="social-icon facebook" aria-label="Facebook">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://api.whatsapp.com/send?phone=38975623575" target="_blank" class="social-icon whatsapp" aria-label="WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>
  </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p v-html="t('footer.copyright', [new Date().getFullYear()])"></p>
        </div>
    </footer>

  </div>
</template>

<style>
/* Global Resets and Base Styles */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

:root {
  --primary-color: #dc3545; /* Bootstrap Red */
  --primary-color-saturated: #d10019; /* More saturated red */
  --secondary-color: #0d6efd; /* Bootstrap Blue */
  --dark-bg: #212529; /* Bootstrap Dark */
  --light-bg: #ffffff;
  --light-gray-bg: #f8f9fa; /* Bootstrap Light Gray */
  --text-light: #ffffff;
  --text-dark: #212529; /* Bootstrap Dark Text */
  --text-muted: #6c757d; /* Bootstrap Muted Text */
  --gradient-bg: linear-gradient(90deg, #0d6efd, #dc3545); /* Updated Gradient */
  --border-color: #dee2e6; /* Bootstrap Border Color */
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Poppins', sans-serif; /* Updated font */
  background-color: var(--light-bg);
  color: var(--text-dark);
  overflow-x: hidden;
  scroll-behavior: smooth;
  margin-top: 0; /* Ensure no default top margin */
  min-width: 100%;
  max-width: 100%;
}

body {
  margin-top: 0; /* Ensure no default top margin */
}

#app {
  width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  margin-top: 0; /* Ensure no spacing */
  padding-top: 0; /* Ensure no spacing */
  margin: 0; /* Ensure no margins */
  padding: 0; /* Ensure no padding */
}

.container {
  width: 100%;
  max-width: 1200px; /* Limit content width */
  margin: 0 auto;
  padding: 0 2rem; /* Side padding */
  box-sizing: border-box;
}

/* Create a full-width container just for the hero section */
.container-full-width {
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: none;
  position: relative;
}

section {
    padding: 4rem 0; /* Vertical padding for sections */
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
}

.section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: var(--primary-color);
    margin: 0.5rem auto 0;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px; /* Pill shape */
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}
.btn:hover {
  transform: translateY(-2px);
}
.btn.primary {
  background-color: var(--primary-color);
  color: var(--text-light);
}
.btn.primary:hover {
  background-color: #bb2d3b; /* Darker red */
}
.btn.secondary {
  background-color: var(--secondary-color);
  color: var(--text-light);
}
.btn.secondary:hover {
  background-color: #0a58ca; /* Darker blue */
}

/* FIRST_EDIT: Insert global hover CSS before closing global style */
/* Gradient hover effect for IKRA text using Macedonian flag colors */
#ikra-text {
  color: #fff !important;
  display: inline !important;
  vertical-align: baseline !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  transition: transform 0.3s ease !important;
  position: relative !important;
  overflow: hidden !important;
  animation: shimmer 1.5s infinite !important;
}

@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

#ikra-text:hover {
  background-image: linear-gradient(90deg, #CE1126, #FFD700, #CE1126) !important;
  background-size: 200% auto !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: transparent !important;
  transform: translateY(-3px) !important;
  animation: shimmer 1.5s infinite !important;
}

/* Initial load shimmer effect - same as hover effect but applied on page load */
.shimmer-initial {
  background-image: linear-gradient(90deg, #CE1126, #FFD700, #CE1126) !important;
  background-size: 200% auto !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: transparent !important;
  transform: translateY(-3px) !important;
  animation: shimmer 1.5s infinite !important;
}
</style>

<style scoped>
/* Navbar - Enhanced */
.navbar {
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background-color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.navbar.scrolled .logo-image {
  height: 70px;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0 5%;
  box-sizing: border-box;
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo-container {
  text-decoration: none;
  position: relative;
  margin: 0;
  padding: 0;
}

.logo-image {
  height: 80px;
  width: auto;
  display: block;
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease;
  filter: none;
  image-rendering: crisp-edges;
  backface-visibility: hidden;
}

.logo-image:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.7));
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.8rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  position: relative;
  padding: 0.5rem 0;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

/* Hero Section (Enhanced) */
.hero {
  background: url('/images/north-macedonia.png') no-repeat center center/cover;
  color: var(--text-light);
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden; /* For decorative elements */
  width: 100vw;
  max-width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  box-sizing: border-box;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(0,0,0,0.65) 0%, 
    rgba(0,0,0,0.5) 50%, 
    rgba(0,0,0,0.4) 100%);
  z-index: 1;
}

/* Decorative elements */
.hero-decoration-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at top left, rgba(220, 53, 69, 0.2), transparent 70%);
  z-index: 1;
  border-bottom-right-radius: 100%;
  opacity: 0.7;
}

.hero-decoration-right {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle at bottom right, rgba(13, 110, 253, 0.2), transparent 70%);
  z-index: 1;
  border-top-left-radius: 100%;
  opacity: 0.7;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1rem;
  max-width: 1000px;
  margin-left: 10%;
  padding-top: 40px; /* Add padding to create more space from navbar */
}

.hero-text {
  animation: fadeIn 1s ease-out;
  max-width: 600px;
  text-align: left;
}

/* Badge container and styling */
.badge-container {
  margin-bottom: 2.5rem;
  margin-top: 1.5rem;
  position: relative;
}

.badge {
  display: inline-block;
  background-color: rgba(220, 53, 69, 0.15);
  color: var(--primary-color);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  border: 1px solid rgba(220, 53, 69, 0.3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  backdrop-filter: blur(5px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Heading styling */
.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.highlight {
  color: #fff;
  font-weight: 800;
  position: relative;
  display: inline-block;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.3);
  text-decoration-thickness: 5px;
  text-underline-offset: 5px;
}

.highlight-red {
  color: var(--primary-color);
  font-weight: 800;
  position: relative;
  display: inline-block;
  text-shadow: 0 0 15px rgba(220, 53, 69, 0.8) !important;
  letter-spacing: 1.5px !important;
  transition: all 0.3s ease;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 2px;
}

.highlight-red:hover {
  color: #ff4757;
  text-shadow: 0 0 25px rgba(220, 53, 69, 0.9) !important;
  transform: translateY(-3px);
}

.hero p {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0,0,0,0.3);
  color: rgba(255, 255, 255, 0.9);
}

/* CTA group styling */
.cta-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.hero-btn {
  padding: 1rem 2.5rem;
  font-size: 1rem;
  background-color: var(--primary-color-saturated); /* More saturated red */
  box-shadow: 0 4px 15px rgba(209, 0, 25, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

.hero-btn-secondary {
  background-color: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 0.95rem 2.45rem;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  backdrop-filter: blur(10px);
}

.hero-btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-5px);
}

.hero-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.hero-btn:hover {
  transform: translateY(-5px);
  background-color: #b50016; /* Darker shade on hover */
  box-shadow: 0 8px 20px rgba(209, 0, 25, 0.5);
}

.hero-btn:hover::before {
  left: 100%;
}

/* Trust indicators */
.trust-indicators {
  display: flex !important;
  flex-direction: row !important;
  gap: 2rem !important;
  margin-bottom: 3rem !important;
  flex-wrap: nowrap !important; /* Prevent wrapping */
  justify-content: flex-start !important;
  width: auto !important;
  min-width: fit-content !important;
}

.indicator {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  color: rgba(255, 255, 255, 0.9) !important;
  white-space: nowrap !important; /* Prevent wrapping within indicator */
}

.indicator i {
  color: var(--primary-color) !important;
  font-size: 1rem !important;
}

/* Explore more section */
.explore-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.explore-more span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  letter-spacing: 1px;
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.scroll-arrow {
  display: block;
  width: 15px;
  height: 15px;
  border-right: 3px solid rgba(255, 255, 255, 0.8);
  border-bottom: 3px solid rgba(255, 255, 255, 0.8);
  transform: rotate(45deg);
  animation: scrollArrow 2s infinite;
}

.scroll-arrow:nth-child(2) {
  animation-delay: 0.2s;
}

@keyframes scrollArrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-10px, -10px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(10px, 10px);
  }
}

/* Logo styling */
.hero-brand-showcase {
  position: absolute;
  top: 47%;
  right: 1.5%;
  transform: translateY(-50%);
  z-index: 3;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: transparent;
  overflow: visible;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.hero-brand-showcase:hover {
  transform: translateY(-50%);
}

.hero-brand-showcase:hover .hero-brand-logo-container {
  box-shadow: none;
}

/* Outer blur layer - extremely minimal blur */
.hero-brand-showcase::before {
  content: none !important;
}

/* Middle blur layer - soft blur */
.hero-brand-showcase::after {
  content: none !important;
}

/* Inner container - main blur area */
.hero-brand-logo-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent !important;
  backdrop-filter: none !important;
  padding: 1.5rem;
  box-shadow: none;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.hero-brand-logo {
  width: 100%;
  height: auto;
  max-width: 560px;
  filter: none;
  image-rendering: crisp-edges;
  backface-visibility: hidden;
  animation: 
    logoFloat 12s cubic-bezier(0.42, 0, 0.58, 1) infinite, 
    logoGlow 8s ease-in-out infinite, 
    logoFadeIn 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition: all 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
  transform-origin: center center;
  will-change: transform, filter;
}

.hero-brand-logo:hover {
  filter: brightness(1.05);
}

@keyframes logoFloat {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-12px) rotate(0.5deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(8px) rotate(-0.5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes logoGlow {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  }
  40% {
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.5));
  }
  60% {
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.4));
  }
}

@keyframes logoFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
    filter: blur(5px) brightness(0.8);
  }
  70% {
    opacity: 0.9;
    filter: blur(0px) brightness(1);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0) brightness(1);
  }
}

/* Updated responsive styles for logo sizes */
@media (max-width: 1200px) {
  .hero-brand-logo {
    max-width: 500px; /* Doubled from 250px */
  }
}

@media (max-width: 991px) {
  .hero-brand-showcase {
    position: relative;
    top: 110px;
    right: auto;
    transform: none;
    max-width: 560px; /* Doubled from 280px */
    margin: 0 auto 2rem;
    background: transparent;
    padding: 0;
  }
  
  .hero-brand-logo-container {
    padding: 1.2rem;
  }
  
  .hero-brand-logo {
    max-width: 440px; /* Doubled from 220px */
  }
  
  .hero-brand-showcase:hover {
    transform: scale(1.03);
  }
}

@media (max-width: 768px) {
  .hero-brand-showcase {
    top: 100px;
    max-width: 460px; /* Doubled from 230px */
  }
  
  .hero-brand-logo {
    max-width: 360px; /* Doubled from 180px */
  }
}

@media (max-width: 480px) {
  .hero-brand-showcase {
    top: 90px;
    max-width: 360px; /* Doubled from 180px */
  }
  
  .hero-brand-logo {
    max-width: 280px; /* Doubled from 140px */
  }
}

/* Destinations Section - Completely Redesigned */
.universities {
  background-color: var(--light-bg);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.universities::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(0,0,0,0.02) 1px, transparent 1px),
    radial-gradient(circle at 90% 80%, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 30px 30px, 40px 40px;
  z-index: 0;
}

.universities .container {
  position: relative;
  z-index: 1;
}

.universities .section-subtitle {
  text-align: center;
  color: var(--text-muted);
  margin-top: -0.5rem;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.universities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2.5rem;
}

.university-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.university-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}

.university-header {
  padding: 2rem 2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.university-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.university-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 12px;
  padding: 0.5rem;
  background-color: white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.07);
  transition: transform 0.3s ease;
}

.university-card:hover .university-logo {
  transform: scale(1.05);
}

.university-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0;
  line-height: 1.4;
}

.university-content {
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}

.university-description {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
  min-height: auto;
  margin-bottom: 1rem;
  overflow: visible;
  display: block;
  -webkit-line-clamp: unset;
  -webkit-box-orient: unset;
}

.university-departments-wrapper {
  margin-top: 0;
  margin-bottom: 0;
  position: relative;
  padding-top: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.departments-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  position: relative;
  display: block;
  padding-bottom: 0.75rem;
  height: auto;
  line-height: 1.2;
  text-align: center;
}

.departments-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 40px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 2px;
  transform: translateX(-50%);
}

.university-departments-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03), rgba(0,0,0,0));
}

/* Popüler Bölümler için Grid görünümü */
.department-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.8rem;
}

/* Departman kartlarının stilleri */
.department-item {
  background-color: var(--light-gray-bg);
  color: var(--text-dark);
  font-size: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--primary-color);
  font-weight: 500;
  transition: all 0.25s ease;
  box-shadow: 0 3px 10px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Departmanlar için mezuniyet şapkası ikonu */
.department-icon {
  color: var(--primary-color);
  margin-right: 0.7rem;
  font-size: 0.85rem;
  opacity: 0.8;
  transition: transform 0.3s ease;
}

/* Departman metni için esneklik */
.department-item span {
  flex: 1;
}

/* Departman kartı sol kenardaki çizgi */
.department-item::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 0;
  width: 3px;
  height: 100%;
  background-color: var(--primary-color);
  opacity: 0.7;
}

/* Departman kartı hover efekti */
.department-item:hover {
  background-color: rgba(220, 53, 69, 0.08);
  transform: translateY(-2px) translateX(2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

/* Departman ikonu hover efekti */
.department-item:hover .department-icon {
  transform: scale(1.1);
  opacity: 1;
}

/* Responsive düzenlemeler */
@media (max-width: 992px) {
  .universities-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .university-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .university-content {
    padding: 1.25rem 1.5rem 1.5rem;
  }
  
  .university-logo {
    width: 100px;
    height: 100px;
  }

  .department-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.6rem;
  }
  
  .department-item {
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .universities {
    padding: 4rem 0;
  }
  
  .universities-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .department-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

@media (max-width: 480px) {
  .university-logo {
    width: 80px;
    height: 80px;
  }
  
  .university-name {
    font-size: 1.2rem;
  }
  
  .university-description {
    font-size: 0.9rem;
  }
  
  .department-grid {
    grid-template-columns: 1fr;
  }
}

/* About Section */
.about {
  background-color: var(--light-bg);
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
}

.about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(0,0,0,0.02) 1px, transparent 1px),
    radial-gradient(circle at 90% 80%, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 30px 30px, 40px 40px;
  z-index: 0;
}

.about .container {
  position: relative;
  z-index: 1;
}

.about-content-wrapper {
  display: flex;
  gap: 4rem;
  margin-top: 2.5rem;
  align-items: center;
}

.about-image {
  flex: 0 0 45%;
  position: relative;
  padding: 20px;
}

.collage-container {
  position: relative;
  width: 100%;
  height: 450px;
  perspective: 1000px;
  transform-style: preserve-3d;
  z-index: 1;
  border-radius: 20px;
  overflow: visible;
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: collageAppear 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes collageAppear {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.collage-image {
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.25);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform, box-shadow;
}

.collage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
  filter: brightness(0.95);
  will-change: transform, filter;
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.01), rgba(0,0,0,0.1));
  opacity: 0;
  transition: opacity 0.5s ease;
}

.collage-image:hover .img-overlay {
  opacity: 1;
}

.collage-image:hover .collage-img {
  transform: scale(1.05);
  filter: brightness(1.02);
}

@keyframes glowEffect {
  0%, 100% {
    box-shadow: 0 15px 35px rgba(0,0,0,0.25);
  }
  50% {
    box-shadow: 0 15px 35px rgba(220, 53, 69, 0.3);
  }
}

/* Ana görsel - Bayrak */
.main-img {
  top: 50%;
  left: 50%;
  width: 190px;
  height: 190px;
  z-index: 1; /* Keep lowest z-index */
  transform: translate(-50%, -50%) translateZ(0px);
  border-radius: 50%;
  overflow: hidden;
  filter: drop-shadow(0 0 15px rgba(220, 53, 69, 0.2));
  animation: flagBreathing 6s ease-in-out infinite;
}

@keyframes flagBreathing {
  0%, 100% {
    box-shadow: 0 0 20px rgba(220, 53, 69, 0.4);
    transform: translate(-50%, -50%) translateZ(0px) scale(1);
  }
  50% {
    box-shadow: 0 0 30px rgba(220, 53, 69, 0.6);
    transform: translate(-50%, -50%) translateZ(0px) scale(1.03);
  }
}

/* Üst görseller */
.img-top-left {
  top: 23.5%;
  left: 28%;
  width: 160px;
  height: 160px;
  z-index: 9; /* Saat yönünün tersi yönde en yüksek z-index */
  transform: translate(-50%, -50%) translateZ(5px) rotate(-5deg);
  --rotation: -5deg;
  animation: orbitAnimation 20s ease-in-out infinite 0s, glowEffect 8s ease-in-out infinite 0.5s;
}

.img-top-right {
  top: 23.5%;
  left: 72%;
  width: 160px;
  height: 160px;
  z-index: 7; /* Saat yönünde ikinci */
  transform: translate(-50%, -50%) translateZ(5px) rotate(5deg);
  --rotation: 5deg;
  animation: orbitAnimation 20s ease-in-out infinite 2.5s, glowEffect 8s ease-in-out infinite 1.5s;
}

/* Orta üst görsel */
.img-top-middle {
  left: 50%;
  top: 16.5%;
  width: 160px;
  height: 160px;
  z-index: 8; /* Saat yönünde ilk */
  transform: translate(-50%, -50%) translateZ(5px) rotate(0deg);
  --rotation: 0deg;
  animation: orbitAnimation 20s ease-in-out infinite 1.25s, glowEffect 8s ease-in-out infinite 1s;
}

/* Orta görseller */
.img-middle-left {
  top: 50%;
  left: 16.5%;
  width: 160px;
  height: 160px;
  z-index: 2; /* Saat yönünün tersi yönde ikinci */
  transform: translate(-50%, -50%) translateZ(5px) rotate(-5deg);
  --rotation: -5deg;
  animation: orbitAnimation 20s ease-in-out infinite 3.75s, glowEffect 8s ease-in-out infinite 2s;
}

.img-middle-right {
  top: 50%;
  left: 83.5%;
  width: 160px;
  height: 160px;
  z-index: 6; /* Saat yönünde üçüncü */
  transform: translate(-50%, -50%) translateZ(5px) rotate(5deg);
  --rotation: 5deg;
  animation: orbitAnimation 20s ease-in-out infinite 6.25s, glowEffect 8s ease-in-out infinite 2.5s;
}

/* Alt görseller */
.img-bottom-left {
  top: 76.5%;
  left: 28%;
  width: 160px;
  height: 160px;
  z-index: 3; /* Saat yönünün tersi yönde üçüncü */
  transform: translate(-50%, -50%) translateZ(5px) rotate(5deg);
  --rotation: 5deg;
  animation: orbitAnimation 20s ease-in-out infinite 5s, glowEffect 8s ease-in-out infinite 3s;
}

.img-bottom-right {
  top: 76.5%;
  left: 72%;
  width: 160px;
  height: 160px;
  z-index: 5; /* Saat yönünde dördüncü */
  transform: translate(-50%, -50%) translateZ(5px) rotate(-5deg);
  --rotation: -5deg;
  animation: orbitAnimation 20s ease-in-out infinite 7.5s, glowEffect 8s ease-in-out infinite 3.5s;
}

/* Alt orta görsel */
.img-bottom-middle {
  left: 50%;
  top: 83.5%;
  width: 160px;
  height: 160px;
  z-index: 4;
  transform: translate(-50%, -50%) translateZ(5px) rotate(0deg);
  --rotation: 0deg;
  animation: orbitAnimation 20s ease-in-out infinite 8.75s, glowEffect 8s ease-in-out infinite 4s;
}

@keyframes orbitAnimation {
  0%, 100% {
    transform: translate(-50%, -50%) translateZ(5px) rotate(var(--rotation, 0deg));
  }
  25% {
    transform: translate(-50%, -50%) translateZ(8px) rotate(calc(var(--rotation, 0deg) + 1deg)) scale(1.02);
  }
  50% {
    transform: translate(-50%, -50%) translateZ(10px) rotate(calc(var(--rotation, 0deg) + 0deg)) scale(1.03);
  }
  75% {
    transform: translate(-50%, -50%) translateZ(8px) rotate(calc(var(--rotation, 0deg) - 1deg)) scale(1.02);
  }
}

/* Dekoratif desenler */
.collage-pattern {
  position: absolute;
  border: 2px dashed rgba(220, 53, 69, 0.15);
  border-radius: 20px;
  z-index: 2; /* Keep between flag and other images */
}

.pattern-1 {
  width: 380px;
  height: 350px;
  top: 10%;
  left: 5%;
  transform: translateZ(-5px) rotate(-3deg);
  animation: patternFloat 15s ease-in-out infinite;
}

.pattern-2 {
  width: 350px;
  height: 320px;
  top: 15%;
  left: 10%;
  transform: translateZ(-10px) rotate(2deg);
  animation: patternFloat 15s ease-in-out infinite reverse;
}

@keyframes patternFloat {
  0%, 100% {
    transform: translateZ(-5px) rotate(-3deg);
  }
  50% {
    transform: translateZ(-5px) rotate(0deg);
  }
}

/* Hover efektleri */
.collage-container:hover .main-img {
  animation-play-state: paused;
  transform: translate(-50%, -50%) translateZ(5px) scale(1.05);
  box-shadow: 0 0 30px rgba(220, 53, 69, 0.6);
}

.collage-container:hover .img-top-left,
.collage-container:hover .img-top-right, 
.collage-container:hover .img-top-middle,
.collage-container:hover .img-middle-left,
.collage-container:hover .img-middle-right,
.collage-container:hover .img-bottom-left,
.collage-container:hover .img-bottom-right,
.collage-container:hover .img-bottom-middle {
  animation-play-state: paused;
  transform: translate(-50%, -50%) translateZ(15px) rotate(var(--rotation, 0deg)) scale(1.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.about-experience-badge {
  position: absolute;
  right: 20px;
  bottom: 30px;
  width: 110px;
  height: 110px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 10px 25px rgba(220, 53, 69, 0.3);
  animation: pulse 2s infinite;
  z-index: 10;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(220, 53, 69, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
  }
}

.about-experience-number {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.about-experience-text {
  font-size: 0.85rem;
  text-align: center;
  line-height: 1.2;
  margin-top: 0.25rem;
  font-weight: 500;
}

.about-text {
  flex: 1;
}

.about-text-header {
  margin-bottom: 1.5rem;
}

.about-tag {
  display: inline-block;
  background-color: rgba(220, 53, 69, 0.08);
  color: var(--primary-color);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.about-subtitle {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-dark);
  line-height: 1.4;
  position: relative;
  padding-bottom: 1.2rem;
  margin-bottom: 1.5rem;
}

.about-subtitle::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 2px;
}

.about-paragraphs {
  margin-bottom: 2.5rem;
}

.about-paragraphs p {
  margin: 0 0 1.25rem;
  line-height: 1.7;
  color: var(--text-muted);
  text-align: left;
  max-width: none;
}

.about-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.about-feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-icon-circle {
  width: 26px;
  height: 26px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.feature-icon {
  color: white;
  font-size: 0.7rem;
}

.about-feature span {
  font-weight: 500;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.about-cta {
  margin-top: 2.5rem;
}

.about-btn {
  padding: 0.85rem 2.5rem;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 8px 20px rgba(220, 53, 69, 0.2);
  border-radius: 30px;
  transition: all 0.3s ease;
}

.about-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(220, 53, 69, 0.3);
}

/* Responsive adjustments for About Section */
@media (max-width: 1200px) {
  .collage-container {
    height: 500px;
    transform: scale(0.95);
  }
  
  .main-img {
    width: 170px;
    height: 170px;
    border-radius: 50%;
  }
  
  .img-top-left, .img-top-right,
  .img-middle-left, .img-middle-right,
  .img-bottom-left, .img-bottom-right,
  .img-top-middle, .img-bottom-middle {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 992px) {
  .about-content-wrapper {
    flex-direction: column;
    gap: 3rem;
  }
  
  .about-image {
    flex: 0 0 100%;
    max-width: 550px;
    margin: 0 auto;
    padding: 20px 40px;
  }
  
  .collage-container {
    height: 450px;
    transform: scale(0.9);
    margin: 0 auto;
  }
  
  .about-experience-badge {
    width: 100px;
    height: 100px;
    right: 30px;
    bottom: 20px;
  }
  
  .about-experience-number {
    font-size: 2rem;
  }
  
  .about-experience-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 4rem 0;
  }
  
  .about-image {
    max-width: 450px;
    padding: 10px 20px;
  }
  
  .collage-container {
    height: 420px;
    transform: scale(0.8);
    margin-bottom: 30px;
  }
  
  .main-img {
    width: 160px;
    height: 160px;
  }
  
  .img-top-left, .img-top-right,
  .img-middle-left, .img-middle-right,
  .img-bottom-left, .img-bottom-right {
    width: 130px;
    height: 130px;
  }
  
  .img-top-middle, .img-bottom-middle {
    width: 110px;
    height: 110px;
  }
  
  .pattern-1, .pattern-2 {
    opacity: 0.4;
  }
  
  .about-feature span {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .about-image {
    max-width: 100%;
    padding: 0 10px;
  }
  
  .collage-container {
    height: 360px;
    transform: scale(0.65);
    margin-bottom: 20px;
  }
  
  .main-img {
    width: 140px;
    height: 140px;
  }
  
  .img-top-left, .img-top-right,
  .img-middle-left, .img-middle-right,
  .img-bottom-left, .img-bottom-right {
    width: 120px;
    height: 120px;
  }
  
  /* Keep the core circular pattern in mobile view */
  .img-top-middle, .img-bottom-middle {
    opacity: 0.7;
    width: 90px;
    height: 90px;
  }
  
  .about-experience-badge {
    width: 90px;
    height: 90px;
    right: 20px;
    bottom: 10px;
  }
  
  .about-experience-number {
    font-size: 1.8rem;
  }
  
  .about-experience-text {
    font-size: 0.7rem;
  }
  
  .about-features {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
}

/* Updates Section */
.updates {
  background: var(--gradient-bg);
  position: relative;
  padding: 6rem 0 8rem;
  z-index: 1;
}

.updates::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/pattern-overlay.png');
  background-size: 200px;
  opacity: 0.1;
  z-index: -1;
}

.updates .section-title {
  color: var(--text-light);
  text-align: center;
  margin-bottom: 3.5rem;
  font-weight: 700;
  position: relative;
  font-size: 2.8rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.updates .section-title::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
    background-color: var(--text-light);
  margin: 1rem auto 0;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.update-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  justify-content: center;
  margin-bottom: 4rem;
}

.update-card {
  background-color: var(--light-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.update-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.update-image {
  position: relative;
  overflow: hidden;
  height: 210px;
}

.update-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.update-card:hover img {
  transform: scale(1.1);
}

.update-date {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--primary-color-saturated);
  color: var(--text-light);
  padding: 0.6rem 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.update-card:hover .update-date {
  transform: scale(1.08);
  background-color: #b50016;
}

.date-day {
  font-size: 1.5rem;
  line-height: 1;
  margin-bottom: 2px;
  font-weight: 700;
}

.date-month {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.update-content {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background-color: var(--light-bg);
}

.update-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: var(--text-dark);
  line-height: 1.3;
  text-align: center;
}

.update-summary {
  color: var(--text-muted);
  margin-bottom: 1.8rem;
  line-height: 1.6;
  flex-grow: 1;
  font-size: 0.95rem;
  text-align: center;
}

.update-link-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.update-link {
  color: var(--secondary-color);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  transition: all 0.3s;
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  background-color: rgba(13, 110, 253, 0.05);
}

.update-link i {
  margin-left: 0.5rem;
  transition: transform 0.3s;
  font-size: 0.85rem;
}

.update-link:hover {
  color: var(--primary-color-saturated);
  background-color: rgba(209, 0, 25, 0.05);
  transform: translateY(-3px);
}

.update-link:hover i {
  transform: translateX(5px);
}

.update-all-link {
  text-align: center;
  margin-top: 3rem;
  position: relative;
  z-index: 5;
}

.update-all-link .btn {
  background-color: var(--light-bg);
  color: var(--dark-bg);
  border: none;
  padding: 1.1rem 2.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 30px;
  letter-spacing: 0.5px;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.update-all-link .btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.7s ease;
}

.update-all-link .btn i {
  margin-left: 0.8rem;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.update-all-link .btn:hover {
  background-color: var(--primary-color-saturated);
  color: var(--text-light);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.update-all-link .btn:hover::after {
  left: 100%;
}

.update-all-link .btn:hover i {
  transform: translateX(6px);
}

@media (max-width: 992px) {
  .update-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .update-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 2rem;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .update-card {
    max-width: 100%;
  }
  
  .update-title {
    font-size: 1.2rem;
  }
  
  .update-summary {
    font-size: 0.9rem;
  }

  .update-all-link .btn {
    padding: 0.9rem 2.2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .updates {
    padding: 4rem 0;
  }

  .updates .section-title {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }

  .update-image {
    height: 180px;
  }

  .update-content {
    padding: 1.5rem;
  }

  .update-date {
    padding: 0.5rem 0.9rem;
  }

  .date-day {
    font-size: 1.3rem;
  }

  .date-month {
    font-size: 0.8rem;
  }

  .update-all-link .btn {
    padding: 0.8rem 2rem;
  }
}

/* Statistics Section */
.stats {
  background-color: var(--light-gray-bg);
  background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 10px 10px;
  padding: 5rem 0;
}
.stats .section-title::after {
    background-color: var(--secondary-color);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}
.stat-card {
  background-color: var(--light-bg);
  padding: 2.5rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}
.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}
.stat-card h3 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin: 1.2rem 0 0.5rem;
  line-height: 1;
}
.stat-card p {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Statistics Section Enhancements */
.section-subtitle {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.stat-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  margin: 0 auto;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 12px;
  font-size: 2rem;
  box-shadow: 0 8px 20px rgba(13, 110, 253, 0.25);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
  background-color: #0b5ed7;
}

@media (max-width: 992px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }
  
  .stat-card {
    padding: 2rem 1.5rem;
  }
  
  .stat-icon {
    width: 60px;
    height: 60px;
    font-size: 1.8rem;
  }
  
  .stat-card h3 {
    font-size: 2.5rem;
  }
}

/* Application Process Section */
.process {
  background-color: var(--light-gray-bg);
  background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 10px 10px;
  padding: 5rem 0;
}
.process-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.step-card {
  background-color: var(--light-bg);
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}
.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.12);
}
.step-card .step-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--text-light);
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0 auto 1.5rem;
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
  position: relative;
  z-index: 1;
}
.step-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-weight: 600;
}
.step-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}
.step-card::before {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  width: 100px;
  height: 100px;
  background-color: rgba(220, 53, 69, 0.05);
  border-radius: 50%;
  z-index: 0;
}

@media (max-width: 992px) {
  .process-steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .process-steps-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
}

/* Testimonials Section */
.testimonials {
  background-color: var(--light-bg);
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(0,0,0,0.02) 1px, transparent 1px),
    radial-gradient(circle at 90% 80%, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 30px 30px, 40px 40px;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.testimonials::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.03) 0%, rgba(255, 255, 255, 0) 50%, rgba(13, 110, 253, 0.03) 100%);
  z-index: 0;
}

.testimonials::after {
  content: '';
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(220, 53, 69, 0.08) 0%, rgba(220, 53, 69, 0) 70%);
  z-index: 0;
}

.testimonials .container {
  position: relative;
  z-index: 1;
}

.testimonials .section-title {
  margin-bottom: 3.5rem;
  position: relative;
}

.testimonials .section-title::after {
  width: 80px;
  height: 4px;
  background: var(--gradient-bg);
  margin: 1rem auto 0;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: var(--light-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  height: 100%;
  border: 1px solid rgba(0,0,0,0.04);
  opacity: 0;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--gradient-bg);
  opacity: 0.7;
  transition: opacity 0.3s ease, height 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.testimonial-card:hover::before {
  opacity: 1;
  height: 7px;
}

.testimonial-content {
  padding: 2.5rem 2rem;
  position: relative;
}

.quote-icon {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  color: rgba(220, 53, 69, 0.1);
  font-size: 2rem;
  transition: all 0.3s ease;
}

.testimonial-card:hover .quote-icon {
  color: rgba(220, 53, 69, 0.2);
  transform: scale(1.1) rotate(-5deg);
}

.testimonial-card p {
  font-style: italic;
  color: var(--text-dark);
  margin: 0 0 1.5rem;
  line-height: 1.7;
  font-size: 1rem;
  position: relative;
  padding-left: 1.2rem;
  padding-top: 0.8rem;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1.5rem;
  position: relative;
  padding-top: 1rem;
}

.testimonial-author::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 1px;
  background: var(--gradient-bg);
  opacity: 0.5;
}

.author-name {
  font-weight: 600;
  background: var(--gradient-bg);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1rem;
}

.author-program {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

@media (max-width: 992px) {
  .testimonial-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .testimonial-content {
    padding: 2rem 1.8rem;
  }
}

@media (max-width: 768px) {
  .testimonials {
    padding: 5rem 0;
  }
  
  .testimonial-grid {
    grid-template-columns: 1fr;
    max-width: 550px;
    margin: 0 auto;
  }

  .testimonials::after {
    width: 150px;
    height: 150px;
    bottom: -30px;
    right: -30px;
  }
}

@media (max-width: 480px) {
  .testimonial-content {
    padding: 1.8rem 1.5rem;
  }
  
  .quote-icon {
    font-size: 1.8rem;
    top: 1.2rem;
    left: 1.2rem;
  }
  
  .testimonial-card p {
    font-size: 0.95rem;
  }
}

/* Contact Section */
.contact {
  background-color: var(--light-bg);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.contact::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(13, 110, 253, 0.03) 0%, rgba(255, 255, 255, 0) 50%, rgba(220, 53, 69, 0.03) 100%);
  z-index: 0;
}

.contact::after {
  content: '';
  position: absolute;
  top: 20%;
  right: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(13, 110, 253, 0.05) 0%, rgba(13, 110, 253, 0) 70%);
  z-index: 0;
}

.contact .container {
  position: relative;
  z-index: 1;
}

.contact .section-title {
  margin-bottom: 1.5rem;
}

.contact .section-title::after {
  background: var(--gradient-bg);
  width: 80px;
  height: 4px;
  margin: 1rem auto 0;
}

.contact-subtitle {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 3.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.contact-wrapper {
  display: flex;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--light-bg);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Contact Info Styles */
.contact-info {
  flex: 0 0 35%;
  background: var(--primary-color); /* Changed from gradient to solid color */
  padding: 3.5rem 2.5rem;
  color: var(--text-light);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.contact-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/pattern-overlay.png') repeat;
  background-size: 200px;
  opacity: 0.05;
  z-index: 0;
}

.contact-info-item {
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
}

.contact-info-item:last-of-type {
  margin-bottom: 3rem;
}

.contact-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  font-size: 1.2rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.contact-info-item:hover .contact-icon {
  background-color: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.contact-text {
  flex: 1;
}

.contact-text h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.contact-text p {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
  line-height: 1.4;
}

.contact-social {
  display: flex;
  gap: 1.2rem;
  margin-top: 1rem;
  position: relative;
  z-index: 1;
  justify-content: center;
}

.contact-social-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-light);
  border-radius: 50%;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.contact-social-icon:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

/* Contact Form Styles */
.contact-form-container {
  flex: 1;
  padding: 3rem;
  background-color: var(--light-bg);
}

.contact-form {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
}

.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-dark);
  transition: all 0.3s ease;
  position: absolute;
  top: -10px;
  left: 12px;
  background-color: var(--light-bg);
  padding: 0 8px;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
}

.form-group input:focus + label,
.form-group textarea:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group textarea:not(:placeholder-shown) + label {
  opacity: 1;
  transform: translateY(0);
}

.contact-form input,
.contact-form textarea {
  padding: 1.2rem;
  border: 1px solid var(--border-color);
  background-color: var(--light-bg);
  color: var(--text-dark);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--secondary-color);
  outline: none;
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.1);
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.75;
}

.contact-btn {
  padding: 1rem 2rem;
  width: auto;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  background: var(--gradient-bg);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.contact-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.contact-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(220, 53, 69, 0.2);
}

.contact-btn:hover::after {
  left: 100%;
}

.contact-btn i {
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.contact-btn:hover i {
  transform: translateX(3px);
}

/* Responsive Design */
@media (max-width: 992px) {
  .contact-wrapper {
    flex-direction: column;
    max-width: 800px;
  }
  
  .contact-info {
    flex: 0 0 auto;
    padding: 2rem;
  }
  
  .contact-info-item {
    margin-bottom: 1.8rem;
  }
  
  .contact-social {
    margin-top: 1.5rem;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 4rem 0;
  }
  
  .contact-form-container {
    padding: 2rem;
  }
  
  .contact-info-item {
    gap: 1rem;
  }
  
  .contact-icon {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .contact-wrapper {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  }
  
  .contact-info {
    padding: 2rem 1.5rem;
  }
  
  .contact-info-item {
    gap: 0.8rem;
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
  
  .contact-text h3 {
    font-size: 1.1rem;
  }
  
  .contact-text p {
    font-size: 0.9rem;
  }
  
  .contact-form-container {
    padding: 1.8rem 1.5rem;
  }
  
  .contact-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Footer */
.footer {
    background-color: transparent; /* Remove background */
    color: var(--text-muted); /* Use standard muted text color */
    text-align: center;
    padding: 2.5rem 0;
    margin-top: 5rem;
}
.footer p {
    margin: 0;
    font-size: 1rem; /* Slightly larger font */
    font-weight: 500; /* Medium weight */
}


/* Floating Social Icons */
.social-icons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column; /* Stack icons vertically */
  gap: 0.8rem;
  z-index: 1001; /* Ensure it's above other content */
}
.social-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%; /* Circular icons */
  color: var(--text-light);
  text-decoration: none;
  font-size: 1.2rem; /* Adjust size for text placeholders */
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, background-color 0.3s;
}
.social-icon:hover {
  transform: scale(1.1);
}

/* Specific colors for each icon (examples) */
.social-icon.instagram {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
}
.social-icon.facebook {
  background-color: #1877F2;
}
.social-icon.whatsapp {
  background-color: #25D366;
}

/* Hero Brand Showcase */
.hero-brand-showcase {
  position: absolute;
  top: 47%;
  right: 6%;
  transform: translateY(-50%);
  z-index: 3;
  max-width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-brand-logo {
  width: 100%;
  height: auto;
  max-width: 560px;
  filter: none;
  image-rendering: crisp-edges;
  backface-visibility: hidden;
  animation: 
    logoFloat 12s cubic-bezier(0.42, 0, 0.58, 1) infinite, 
    logoGlow 8s ease-in-out infinite, 
    logoFadeIn 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition: all 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
  transform-origin: center center;
  will-change: transform, filter;
}

.hero-brand-logo:hover {
  filter: brightness(1.05);
}

@keyframes logoFloat {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-12px) rotate(0.5deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(8px) rotate(-0.5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes logoGlow {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  }
  40% {
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.5));
  }
  60% {
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.4));
  }
}

@keyframes logoFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
    filter: blur(5px) brightness(0.8);
  }
  70% {
    opacity: 0.9;
    filter: blur(0px) brightness(1);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0) brightness(1);
  }
}

/* Responsive adjustments for the enhanced logo showcase */
@media (max-width: 1200px) {
  .hero-brand-showcase {
    right: 5%;
    max-width: 28%;
  }
  
  .hero-content {
    margin-left: 5%;
  }
  
  .hero h1 {
    font-size: 3rem;
  }
}

@media (max-width: 991px) {
  .hero-brand-showcase {
    position: relative;
    top: 110px;
    right: auto;
    transform: none;
    max-width: 560px; /* Doubled from 280px */
    margin: 0 auto 2rem;
    background: transparent;
    padding: 0;
  }
  
  .hero-brand-logo-container {
    background: radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0.04) 0%,
      rgba(0, 0, 0, 0.02) 60%,
      rgba(0, 0, 0, 0) 95%
    );
    padding: 1.2rem;
    border-radius: 50%;
  }
  
  .hero-brand-showcase:hover {
    transform: scale(1.03);
  }
  
  .hero-content {
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    text-align: center;
    padding-top: 180px;
  }
  
  .hero-text {
    text-align: center;
  }
  
  .cta-group {
    justify-content: center;
  }
  
  .trust-indicators {
    justify-content: center !important;
    width: 100%;
    display: flex !important;
    flex-direction: row !important;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .badge-container {
    margin-bottom: 2rem;
  }
  
  .explore-more {
    margin-top: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-brand-showcase {
    top: 100px;
    max-width: 460px; /* Doubled from 230px */
  }
  
  .hero h1 {
    font-size: 2.2rem;
  }
  
  .hero p {
    font-size: 1.1rem;
  }
  
  .hero-btn, .hero-btn-secondary {
    padding: 0.85rem 1.5rem;
    font-size: 0.9rem;
  }
  
  /* Add more forceful styles for trust indicators */
  .trust-indicators {
    flex-direction: row !important;
    justify-content: center !important;
    margin-bottom: 2rem !important;
    gap: 1.2rem !important;
    width: 100% !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
  }
  
  .hero-content {
    padding-top: 180px;
  }
  
  .badge-container {
    margin-bottom: 1.5rem;
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-brand-showcase {
    top: 90px;
    max-width: 360px; /* Doubled from 180px */
  }
  
  .hero h1 {
    font-size: 1.8rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
  
  .cta-group {
    flex-direction: column;
    width: 100%;
  }
  
  .hero-btn, .hero-btn-secondary {
    width: 100%;
    text-align: center;
  }
  
  .badge-container {
    margin-bottom: 1.5rem;
    margin-top: 1rem;
  }
  
  .badge {
    font-size: 0.7rem;
  }
  
  /* Add more forceful styles for trust indicators on small screens */
  .trust-indicators {
    gap: 0.8rem !important;
    justify-content: center !important;
    padding: 0 5px !important;
    margin: 0 auto 2rem auto !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
  }
  
  .indicator {
    font-size: 0.85rem !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .indicator i {
    font-size: 0.9rem !important;
    margin-right: 0.3rem !important;
  }
}

/* Animation for testimonial cards */
@keyframes testimonialAppear {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.testimonials:not(.in-view) .testimonial-card {
  opacity: 0;
  transform: translateY(30px);
}

.testimonials.in-view .testimonial-card {
  animation: testimonialAppear 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.testimonials.in-view .testimonial-card:nth-child(1) {
  animation-delay: 0.1s;
}

.testimonials.in-view .testimonial-card:nth-child(2) {
  animation-delay: 0.2s;
}

.testimonials.in-view .testimonial-card:nth-child(3) {
  animation-delay: 0.3s;
}

.testimonials.in-view .testimonial-card:nth-child(4) {
  animation-delay: 0.4s;
}

.testimonials.in-view .testimonial-card:nth-child(5) {
  animation-delay: 0.5s;
}

.testimonials.in-view .testimonial-card:nth-child(6) {
  animation-delay: 0.6s;
}

/* Advantages Section Styles */
.advantages {
  background-color: var(--light-bg);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.advantages::before {
  content: '';
  position: absolute;
  top: -10%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: var(--gradient-bg);
  border-radius: 50%;
  opacity: 0.05;
  z-index: 0;
}

.advantages::after {
  content: '';
  position: absolute;
  bottom: -15%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: var(--gradient-bg);
  border-radius: 50%;
  opacity: 0.05;
  z-index: 0;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-top: -2rem;
  margin-bottom: 3rem;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.advantage-card {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.advantage-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.advantage-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--gradient-bg);
}

.advantage-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: var(--gradient-bg);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.advantage-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.advantage-description {
  color: var(--text-muted);
  line-height: 1.6;
}

/* Residency and Citizenship Section */
.residency-citizenship {
  background-color: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  margin-top: 2rem;
  border: 1px solid var(--border-color);
}

.residency-header {
  text-align: center;
  margin-bottom: 3rem;
}

.residency-header h3 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-dark);
  background: var(--gradient-bg);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.residency-intro {
  max-width: 800px;
  margin: 0 auto;
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 1.1rem;
}

.residency-steps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.residency-step {
  display: flex;
  align-items: flex-start;
  background-color: var(--light-gray-bg);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.residency-step:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.step-icon {
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1.5rem;
  background: var(--gradient-bg);
  color: white;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.step-content p {
  color: var(--text-muted);
  line-height: 1.6;
}

.residency-note {
  display: flex;
  align-items: center;
  background-color: rgba(13, 110, 253, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 5px solid var(--secondary-color);
  margin-bottom: 1.5rem;
}

.residency-note:last-child {
  margin-bottom: 0;
}

.diploma-recognition {
  background-color: rgba(220, 53, 69, 0.05);
  border-left: 5px solid var(--primary-color);
}

.diploma-recognition .note-icon {
  color: var(--primary-color);
}

.note-icon {
  font-size: 2rem;
  color: var(--secondary-color);
  margin-right: 1.5rem;
}

.residency-note p {
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Responsive Styles for Advantages Section */
@media (max-width: 1200px) {
  .advantages-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 992px) {
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .residency-steps {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .advantages-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .advantage-card {
    padding: 1.5rem;
  }
  
  .residency-citizenship {
    padding: 2rem;
  }
  
  .residency-header h3 {
    font-size: 1.75rem;
  }
  
  .residency-intro {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .residency-step {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .step-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .residency-note {
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-left: none;
    border-top: 5px solid var(--secondary-color);
  }
  
  .note-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .advantages::before,
  .advantages::after {
    width: 250px;
    height: 250px;
  }
}

/* Also add this to your navbar links to include the new section */
</style>

// Insert mobile-responsive adjustments
@media (max-width: 768px) {
  .update-grid, .advantages-grid, .process-steps-grid, .testimonial-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
    padding: 0 1rem !important;
  }
  .hero .section-title { font-size: 2rem !important; }
  .hero p { font-size: 1rem !important; }
  .container { padding: 0 1rem !important; }
  .navbar-content {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
  .nav-links {
    flex-wrap: wrap !important;
    gap: 1rem !important;
    justify-content: flex-start !important;
  }
}

// End of mobile adjustments
<style scoped>
/* Ensure email link in contact section displays in white */
.contact-text a {
  color: #ffffff !important;
  text-decoration: none !important;
}
</style>

