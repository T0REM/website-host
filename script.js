
function showSection(sectionName) {
    // Hide ALL OF THE sections :3
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from ALL conatiners
    const containers = document.querySelectorAll('.nav-container');
    containers.forEach(container => {
        container.classList.remove('active');
    });

    // Show selected one
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Add active to selected one
    const activeContainer = document.querySelector('[onclick="showSection(\'' + sectionName + '\')"]');
    if (activeContainer) {
        activeContainer.classList.add('active');
    }
}

function showGalleryItem(index) {
    // Update current index
    currentGalleryIndex = index;
    
    // Hide all GIFs
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        item.classList.remove('active');
    });

    // Show selected GIF
    if (items[index]) {
        items[index].classList.add('active');
    }

    // Update progress line position
    const progressLine = document.querySelector('.gallery-progress-line');
    if (progressLine) {
        const percentage = (index / 2) * 70; // 0%, 35%, 70% for positions 0, 1, 2 (max is 70% to prevent the actual progress line from passing the actual bar!!)
        progressLine.style.left = percentage + '%';
    }
    
    // Update arrow states
    updateArrowStates();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    showGalleryItem(0);
});

// Add smooth scrolling and animations
document.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Create leaf animation on click or hover
function createLeafAnimation(event) {
    event.preventDefault();

    const container = document.getElementById('leaf-animation-container');
    const leaf = document.createElement('div');
    leaf.className = 'leaf-animation';

    // Position the leaf at the mouse location
    leaf.style.left = event.clientX + 'px';
    leaf.style.top = event.clientY + 'px';

    container.appendChild(leaf);

    // Remove the leaf after animation is done doing its thing
    setTimeout(() => {
        if (container.contains(leaf)) {
            container.removeChild(leaf);
        }
    }, 2000);
}

// Handle gallery progress line clickies
function handleGalleryClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    
    let index = 0;
    if (percentage < 0.35) {
        index = 0;
    } else if (percentage < 0.70) {
        index = 1;
    } else {
        index = 2;
    }
    
    showGalleryItem(index);
}

// Gallery navigation functionaluty/functions
let currentGalleryIndex = 0;
const totalGalleryItems = 3;

function nextGalleryItem() {
    if (currentGalleryIndex < totalGalleryItems - 1) {
        currentGalleryIndex++;
        showGalleryItem(currentGalleryIndex);
        updateArrowStates();
    }
}

function previousGalleryItem() {
    if (currentGalleryIndex > 0) {
        currentGalleryIndex--;
        showGalleryItem(currentGalleryIndex);
        updateArrowStates();
    }
}

function updateArrowStates() {
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    
    if (prevArrow && nextArrow) {
        if (currentGalleryIndex === 0) {
            prevArrow.classList.add('disabled');
        } else {
            prevArrow.classList.remove('disabled');
        }
        
        if (currentGalleryIndex === totalGalleryItems - 1) {
            nextArrow.classList.add('disabled');
        } else {
            nextArrow.classList.remove('disabled');
        }
    }
}

// Add click animation to all clickable things
document.addEventListener('click', function(event) {
    // Only create animation for specific things
    if (event.target && event.target.closest) {
        if (event.target.closest('.nav-container') || 
            event.target.closest('.cta-button') || 
            event.target.closest('.gallery-controls') ||
            event.target.closest('.social-button') ||
            event.target.closest('.gallery-arrow')) {
            createLeafAnimation(event);
        }
    }
});

// Add hover animation to buttons
document.addEventListener('mouseenter', function(event) {
    // Create leaf animation on hover for buttons
    if (event.target && event.target.closest) {
        if (event.target.closest('.nav-container') || 
            event.target.closest('.cta-button') || 
            event.target.closest('.social-button') ||
            event.target.closest('.gallery-arrow')) {
            createLeafAnimation(event);
        }
    }
}, true);
