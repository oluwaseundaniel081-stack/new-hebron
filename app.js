/**
 * HEBRON INVESTMENT LIMITED - CLIENT LOGIC
 * Custom JavaScript (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  //  1. NAVIGATION, STICKY HEADER & MOBILE MENU
  // ==========================================
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Sticky Header Scrolled Class Toggle
  const handleScrollHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.classList.remove('bg-white/95');
      header.classList.add('bg-white/98');
    } else {
      header.classList.remove('scrolled');
      header.classList.remove('bg-white/98');
      header.classList.add('bg-white/95');
    }
  };
  window.addEventListener('scroll', handleScrollHeader);
  handleScrollHeader(); // Trigger immediately in case page is refreshed mid-scroll

  // Toggle Mobile Menu Open/Closed
  const toggleMobileNav = () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden'); // Prevent background scroll
  };

  menuToggle.addEventListener('click', toggleMobileNav);

  // Close Mobile Menu on link click
  const closeMobileNav = () => {
    menuToggle.classList.remove('active');
    mobileNav.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
  };

  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // Intersection Observer: Scroll spy nav highlighting
  const sections = document.querySelectorAll('section');
  const navObserverOptions = {
    root: null,
    threshold: 0.35,
    rootMargin: '-80px 0px 0px 0px' // adjust for header height
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Desktop nav links highlight
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));


  // ==========================================
  //  2. TOAST NOTIFICATION SYSTEM
  // ==========================================
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  const showToast = (title, message, isSuccess = true) => {
    clearTimeout(toastTimeout);
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Animate in
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    // Auto animate out after 4 seconds
    toastTimeout = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 4000);
  };


  // ==========================================
  //  3. PUBLISHING STOREFRONT (E-COMMERCE & PREVIEWS)
  // ==========================================
  const bookData = {
    'digital-frontier': {
      title: 'The Digital Frontier',
      tag: 'Technology & Strategy',
      price: '&#8358;8,500',
      numericPrice: 8500,
      img: 'images/book_digital_frontier.png',
      desc: 'An essential corporate manual written by Hebron’s computing and strategy lead. This book analyzes how media hubs can capitalize on cloud architectures, custom databases, and modern APIs to drive monetization and cross-industry workflow automation. Includes 12 practical case studies.'
    },
    'harmonic-synergy': {
      title: 'Harmonic Synergy',
      tag: 'Music & Culture',
      price: '&#8358;7,000',
      numericPrice: 7000,
      img: 'images/book_harmonic_synergy.png',
      desc: 'Exploring the cultural synthesis of modern sound production and audience consumption. This research volume traces the timeline of independent music development, digital licensing trends, and describes how software intelligence feeds the creation of contemporary audio assets.'
    },
    'modern-algorithms': {
      title: 'Modern Algorithms',
      tag: 'IT & Computing',
      price: '&#8358;9,500',
      numericPrice: 9500,
      img: 'images/book_modern_algorithms.png',
      desc: 'A complete handbook compiled for tech engineers and team leaders. It details reusable cloud design patterns, scalable data warehousing, server network configuration basics, and secure programming architectures for web and app development teams.'
    }
  };

  // Previews Modal References
  const detailsModal = document.getElementById('details-modal');
  const detailsCard = document.getElementById('details-card');
  const closeDetails = document.getElementById('close-details');
  const detailsModalBackdrop = document.getElementById('details-modal-backdrop');
  
  const detailsImg = document.getElementById('details-img');
  const detailsTag = document.getElementById('details-tag');
  const detailsTitle = document.getElementById('details-title');
  const detailsDesc = document.getElementById('details-desc');
  const detailsPrice = document.getElementById('details-price');
  const detailsBuyBtn = document.getElementById('details-buy-btn');

  let activeBookDetails = null;

  // Open Details Modal
  const openBookDetails = (bookId) => {
    const book = bookData[bookId];
    if (!book) return;

    activeBookDetails = book;
    detailsImg.src = book.img;
    detailsImg.alt = `${book.title} Book Cover`;
    detailsTag.textContent = book.tag;
    detailsTitle.textContent = book.title;
    detailsDesc.innerHTML = book.desc;
    detailsPrice.innerHTML = book.price;

    detailsModal.classList.remove('hidden');
    setTimeout(() => {
      detailsModal.classList.add('active');
      detailsCard.classList.remove('opacity-0', 'scale-95');
      detailsCard.classList.add('opacity-100', 'scale-100');
    }, 10);
  };

  // Close Details Modal
  const closeBookDetails = () => {
    detailsModal.classList.remove('active');
    detailsCard.classList.remove('opacity-100', 'scale-100');
    detailsCard.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
      detailsModal.classList.add('hidden');
      activeBookDetails = null;
    }, 300);
  };

  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookId = btn.getAttribute('data-book-id');
      openBookDetails(bookId);
    });
  });

  closeDetails.addEventListener('click', closeBookDetails);
  detailsModalBackdrop.addEventListener('click', closeBookDetails);

  // E-commerce Drawer References
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutDrawer = document.getElementById('checkout-drawer');
  const closeCheckout = document.getElementById('close-checkout');
  const checkoutModalBackdrop = document.getElementById('checkout-modal-backdrop');

  const checkoutItemImg = document.getElementById('checkout-item-img');
  const checkoutItemName = document.getElementById('checkout-item-name');
  const checkoutItemPrice = document.getElementById('checkout-item-price');
  const checkoutTotal = document.getElementById('checkout-total');
  const checkoutForm = document.getElementById('checkout-form');

  let checkoutActiveItem = null;

  const openCheckout = (name, price, img) => {
    checkoutActiveItem = { name, price, img };
    checkoutItemImg.src = img;
    checkoutItemImg.alt = name;
    checkoutItemName.textContent = name;
    
    const formattedPrice = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
    checkoutItemPrice.textContent = formattedPrice;
    checkoutTotal.textContent = formattedPrice;

    checkoutModal.classList.remove('hidden');
    setTimeout(() => {
      checkoutModal.classList.add('active');
      checkoutDrawer.classList.remove('translate-x-full');
      checkoutDrawer.classList.add('translate-x-0');
    }, 10);
  };

  const closeCheckoutDrawer = () => {
    checkoutModal.classList.remove('active');
    checkoutDrawer.classList.remove('translate-x-0', 'translate-x-full');
    checkoutDrawer.classList.add('translate-x-full');
    setTimeout(() => {
      checkoutModal.classList.add('hidden');
      checkoutActiveItem = null;
    }, 300);
  };

  document.querySelectorAll('.buy-now-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-item-name');
      const price = parseFloat(btn.getAttribute('data-item-price'));
      const img = btn.getAttribute('data-item-img');
      openCheckout(name, price, img);
    });
  });

  detailsBuyBtn.addEventListener('click', () => {
    if (activeBookDetails) {
      closeBookDetails();
      setTimeout(() => {
        openCheckout(activeBookDetails.title, activeBookDetails.numericPrice, activeBookDetails.img);
      }, 350);
    }
  });

  closeCheckout.addEventListener('click', closeCheckoutDrawer);
  checkoutModalBackdrop.addEventListener('click', closeCheckoutDrawer);

  // Handle Checkout submission
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('checkout-name').value;
    const email = document.getElementById('checkout-email').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    closeCheckoutDrawer();

    if (paymentMethod === 'paystack') {
      showToast('Redirecting...', `Redirecting ${name} to Paystack gateway for checkout. Check email for details.`);
    } else {
      showToast('Invoice Generated', `We have sent the bank details invoice to ${email}. Please complete transfer.`);
    }

    checkoutForm.reset();
  });


  // ==========================================
  //  4. MUSIC PLAYER LOGIC (HTML5 AUDIO PLAYBACK)
  // ==========================================
  const tracks = [
    {
      title: 'Afrobeat Horizons',
      artist: 'Hebron Studio Band',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      artwork: 'images/album_afrobeat_horizons.png',
      duration: '3:12'
    },
    {
      title: 'Acoustic Whispers',
      artist: 'Hebron Acoustic Trio',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      artwork: 'images/album_acoustic_whispers.png',
      duration: '3:38'
    },
    {
      title: 'Ambient Tech',
      artist: 'H.I.L. Electronic Lab',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      artwork: 'images/album_ambient_tech.png',
      duration: '5:44'
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let isMuted = false;
  let audio = new Audio();
  
  // Set initial track source
  audio.src = tracks[currentTrackIndex].url;
  audio.volume = 0.8;

  // DOM Player elements
  const currentArtwork = document.getElementById('current-track-artwork');
  const currentTitle = document.getElementById('current-track-title');
  const currentArtist = document.getElementById('current-track-artist');
  
  const playPauseBtn = document.getElementById('player-play-pause');
  const prevBtn = document.getElementById('player-prev');
  const nextBtn = document.getElementById('player-next');
  const muteBtn = document.getElementById('player-mute');
  
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const volumeIcon = document.getElementById('volume-icon');
  const muteIcon = document.getElementById('mute-icon');
  const volumeSlider = document.getElementById('volume-slider');
  
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');
  const timeCurrentDisplay = document.getElementById('time-current');
  const timeDurationDisplay = document.getElementById('time-duration');
  
  const tracklistItems = document.querySelectorAll('.track-item');
  const animationWaves = document.getElementById('player-animation-waves');

  // Helper: Format Time in min:sec
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Load Track Details into UI
  const loadTrack = (index) => {
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];
    
    // Update audio source
    audio.src = track.url;
    
    // Update player panel
    currentArtwork.src = track.artwork;
    currentArtwork.alt = `${track.title} Artwork`;
    currentTitle.textContent = track.title;
    currentArtist.textContent = track.artist;
    timeDurationDisplay.textContent = track.duration;
    progressBar.style.width = '0%';
    timeCurrentDisplay.textContent = '0:00';

    // Update tracklist highlight
    tracklistItems.forEach((item, idx) => {
      if (idx === currentTrackIndex) {
        item.classList.add('active');
        item.querySelector('.track-status-icon').innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        `;
      } else {
        item.classList.remove('active');
        item.querySelector('.track-status-icon').innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        `;
      }
    });
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const playTrack = () => {
    isPlaying = true;
    audio.play().catch(err => {
      console.warn("Audio autoplay blocked or stream failed:", err);
      // Soft fail fallback representation if network blocks Helix
    });
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    animationWaves.querySelectorAll('span').forEach(bar => {
      bar.style.animationPlayState = 'running';
    });
  };

  const pauseTrack = () => {
    isPlaying = false;
    audio.pause();
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    animationWaves.querySelectorAll('span').forEach(bar => {
      bar.style.animationPlayState = 'paused';
    });
  };

  // Previous & Next actions
  const prevTrack = () => {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = tracks.length - 1;
    loadTrack(newIndex);
    if (isPlaying) playTrack();
  };

  const nextTrack = () => {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= tracks.length) newIndex = 0;
    loadTrack(newIndex);
    if (isPlaying) playTrack();
  };

  // Mute toggle
  const toggleMute = () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    
    if (isMuted) {
      volumeIcon.classList.add('hidden');
      muteIcon.classList.remove('hidden');
      volumeSlider.value = 0;
    } else {
      volumeIcon.classList.remove('hidden');
      muteIcon.classList.add('hidden');
      volumeSlider.value = audio.volume;
    }
  };

  // Seek bar implementation
  const seekAudio = (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const width = rect.width;
    const clickX = e.clientX - rect.left;
    const duration = audio.duration;
    
    if (!isNaN(duration)) {
      audio.currentTime = (clickX / width) * duration;
    }
  };

  // Event Listeners for Player Control
  playPauseBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);
  muteBtn.addEventListener('click', toggleMute);

  // Volume slider event
  volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    audio.volume = val;
    if (val === 0) {
      isMuted = true;
      audio.muted = true;
      volumeIcon.classList.add('hidden');
      muteIcon.classList.remove('hidden');
    } else {
      isMuted = false;
      audio.muted = false;
      volumeIcon.classList.remove('hidden');
      muteIcon.classList.add('hidden');
    }
  });

  // Seek bar click
  progressContainer.addEventListener('click', seekAudio);

  // Sync progress bar and current time text
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    
    if (!isNaN(duration)) {
      const percentage = (currentTime / duration) * 100;
      progressBar.style.width = `${percentage}%`;
      timeCurrentDisplay.textContent = formatTime(currentTime);
      timeDurationDisplay.textContent = formatTime(duration);
    }
  });

  // Track finished callback
  audio.addEventListener('ended', () => {
    nextTrack();
  });

  // Select track from tracklist
  tracklistItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-track-index'));
      loadTrack(idx);
      playTrack();
    });
  });

  // Initialize: Load track but don't autoplay to avoid browser blocks
  loadTrack(0);
  animationWaves.querySelectorAll('span').forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });


  // ==========================================
  //  5. COMPUTING SERVICES: QUOTE FORM
  // ==========================================
  const quoteForm = document.getElementById('quote-form');

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect data
    const name = document.getElementById('quote-name').value;
    const email = document.getElementById('quote-email').value;
    const serviceSelect = document.getElementById('quote-service');
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;

    // Simulate submission progress
    showToast('Submitting...', `Processing your quote request for ${serviceText}...`);

    setTimeout(() => {
      // Success feedback
      showToast(
        'Request Logged!',
        `Thank you, ${name}. We have received your query for ${serviceText} and will reply to ${email} shortly.`,
        true
      );
      quoteForm.reset();
    }, 1500);
  });


  // ==========================================
  //  6. FOOTER: DIRECT CONTACT MESSAGE FORM
  // ==========================================
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;

    showToast('Sending...', 'Sending your direct message to Hebron Investments...');

    setTimeout(() => {
      showToast(
        'Message Sent!',
        `Hello ${name}, thank you for contacting us. We have received your query and will follow up at ${email}.`,
        true
      );
      contactForm.reset();
    }, 1500);
  });

});
