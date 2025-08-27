// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

// Initialize all functionality
function initializeApp() {
	setupSmoothScrolling();
	setupHeaderEffects();
	setupScrollAnimations();
	setupProjectCardInteractions();
	setupParallaxEffects();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
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
}

// Header background change on scroll
function setupHeaderEffects() {
	const header = document.querySelector('.header');

	window.addEventListener('scroll', () => {
		if (window.scrollY > 100) {
			header.style.background = 'rgba(26, 31, 36, 0.98)';
		} else {
			header.style.background = 'rgba(26, 31, 36, 0.95)';
		}
	});
}

// Scroll animations using Intersection Observer
function setupScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			}
		});
	}, observerOptions);

	// Observe all elements with fade-in class
	document.querySelectorAll('.fade-in').forEach(el => {
		observer.observe(el);
	});
}

// Project card interactions
function setupProjectCardInteractions() {
	const projectCards = document.querySelectorAll('.project-card');

	projectCards.forEach(card => {
		// Float animation on hover
		card.addEventListener('mouseenter', () => {
			card.style.animation = 'float 2s ease-in-out infinite';
		});

		card.addEventListener('mouseleave', () => {
			card.style.animation = 'none';
		});

		// 3D tilt effect
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const rotateX = (y - centerY) / 10;
			const rotateY = (centerX - x) / 10;

			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
		});

		card.addEventListener('mouseleave', () => {
			card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
		});
	});
}

// Parallax effect for hero background
function setupParallaxEffects() {
	const parallaxElement = document.querySelector('.hero-bg');

	if (parallaxElement) {
		window.addEventListener('scroll', () => {
			const scrolled = window.pageYOffset;
			const speed = scrolled * 0.5;
			parallaxElement.style.transform = `translateY(${speed}px)`;
		});
	}
}

// Utility functions
const utils = {
	// Throttle function for performance optimization
	throttle: function (func, limit) {
		let inThrottle;
		return function () {
			const args = arguments;
			const context = this;
			if (!inThrottle) {
				func.apply(context, args);
				inThrottle = true;
				setTimeout(() => inThrottle = false, limit);
			}
		};
	},

	// Debounce function for performance optimization
	debounce: function (func, wait, immediate) {
		let timeout;
		return function () {
			const context = this, args = arguments;
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},

	// Check if element is in viewport
	isInViewport: function (element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}
};

// Performance optimized scroll handler
const optimizedScrollHandler = utils.throttle(() => {
	// Header effects
	const header = document.querySelector('.header');
	if (window.scrollY > 100) {
		header.style.background = 'rgba(26, 31, 36, 0.98)';
	} else {
		header.style.background = 'rgba(26, 31, 36, 0.95)';
	}

	// Parallax effects
	const parallaxElement = document.querySelector('.hero-bg');
	if (parallaxElement) {
		const scrolled = window.pageYOffset;
		const speed = scrolled * 0.5;
		parallaxElement.style.transform = `translateY(${speed}px)`;
	}
}, 16); // ~60fps

// Replace individual scroll listeners with optimized version
window.addEventListener('scroll', optimizedScrollHandler);

// Loading animation
function showLoadingComplete() {
	document.body.classList.add('loaded');

	// Trigger initial animations
	setTimeout(() => {
		const heroContent = document.querySelector('.hero-content');
		if (heroContent) {
			heroContent.style.animation = 'fadeInUp 1s ease-out';
		}
	}, 100);
}

// Call loading complete when page is fully loaded
window.addEventListener('load', showLoadingComplete);

// Additional interactive features
function setupAdvancedInteractions() {
	// Logo hover effect
	const logo = document.querySelector('.logo');
	if (logo) {
		logo.addEventListener('mouseenter', () => {
			logo.style.transform = 'translateY(-2px) scale(1.05)';
		});

		logo.addEventListener('mouseleave', () => {
			logo.style.transform = 'translateY(0) scale(1)';
		});
	}

	// CTA button ripple effect
	const ctaButton = document.querySelector('.cta-button');
	if (ctaButton) {
		ctaButton.addEventListener('click', function (e) {
			const ripple = document.createElement('span');
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;

			ripple.style.width = ripple.style.height = size + 'px';
			ripple.style.left = x + 'px';
			ripple.style.top = y + 'px';
			ripple.classList.add('ripple');

			this.appendChild(ripple);

			setTimeout(() => {
				ripple.remove();
			}, 600);
		});
	}
}

// Initialize advanced interactions
document.addEventListener('DOMContentLoaded', setupAdvancedInteractions);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
	// Arrow key navigation for project cards
	if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
		const cards = document.querySelectorAll('.project-card');
		const focusedCard = document.activeElement;
		const currentIndex = Array.from(cards).indexOf(focusedCard);

		if (currentIndex !== -1) {
			e.preventDefault();
			let nextIndex;

			if (e.key === 'ArrowLeft') {
				nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
			} else {
				nextIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
			}

			cards[nextIndex].focus();
		}
	}
});

// Make project cards focusable for accessibility
document.querySelectorAll('.project-card').forEach((card, index) => {
	card.setAttribute('tabindex', '0');
	card.setAttribute('role', 'button');
	card.setAttribute('aria-label', `Project card ${index + 1}`);
});

// Error handling for animations
function handleAnimationErrors() {
	try {
		// Check if animations are supported
		if (!window.CSS || !CSS.supports('animation', 'fadeInUp 1s ease-out')) {
			console.warn('CSS animations may not be fully supported');
			// Fallback: remove animation classes
			document.querySelectorAll('.fade-in').forEach(el => {
				el.classList.add('visible');
			});
		}
	} catch (error) {
		console.error('Animation setup error:', error);
	}
}

// Initialize error handling
handleAnimationErrors();