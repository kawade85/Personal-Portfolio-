/*This file will handle navigation, smooth scrolling, active link highlighting, the mobile navigation toggle, and contact form validation.
*/
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling and Active Nav Link Highlight
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const header = document.querySelector('header'); // Get the header element

    // Function to set active link
    const setActiveLink = () => {
        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for sticky header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Only consider internal links for active state highlighting
            if (link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentActive)) {
                    link.classList.add('active');
                }
            }
        });
    };

    // Event listener for scroll to highlight active link
    window.addEventListener('scroll', setActiveLink);

    // Event listener for click on nav links for smooth scroll and active state
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHref = e.target.getAttribute('href'); // Get the href value

            // --- IMPORTANT CHANGE HERE ---
            // Check if the href starts with '#' (i.e., it's an internal section link)
            if (targetHref && targetHref.startsWith('#')) {
                e.preventDefault(); // Prevent default only for internal links (smooth scroll)

                const targetSection = document.querySelector(targetHref); // Now targetHref is a valid selector like '#home'
                if (targetSection) {
                    const headerOffset = header.offsetHeight; // Use the cached header element
                    const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // If the href does NOT start with '#', it's an external link (like your PDF)
            // In this case, we DO NOT preventDefault(), letting the browser handle it
            // This means target="_blank" on your PDF link will work as intended.

            // Close mobile nav if open (this applies to all clicks, which is fine)
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                nav.querySelectorAll('li').forEach((item, index) => {
                    item.style.animation = ''; // Clear animation
                });
            }
        });
    });

    // Mobile Navigation Toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        // Animate links
        nav.querySelectorAll('li').forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            let isValid = true;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const subjectError = document.getElementById('subject-error');
            const messageError = document.getElementById('message-error');
            const formSuccess = document.getElementById('form-success');

            // Clear previous errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            subjectError.style.display = 'none';
            messageError.style.display = 'none';
            formSuccess.style.display = 'none';

            // Validate Name
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required.';
                nameError.style.display = 'block';
                isValid = false;
            }

            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                isValid = false;
            }

            // Validate Subject
            if (subjectInput.value.trim() === '') {
                subjectError.textContent = 'Subject is required.';
                subjectError.style.display = 'block';
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required.';
                messageError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                // If all fields are valid, you can simulate form submission
                // In a real project, you would send this data to a backend server (e.g., using fetch API)
                console.log('Form Submitted Successfully!');
                console.log('Name:', nameInput.value);
                console.log('Email:', emailInput.value);
                console.log('Subject:', subjectInput.value);
                console.log('Message:', messageInput.value);

                formSuccess.textContent = 'Thank you for your message! We will get back to you shortly.';
                formSuccess.style.display = 'block';

                // Optionally, clear the form after successful submission
                contactForm.reset();
            }
        });
    }

    // Initial check for active link when page loads
    setActiveLink();
});