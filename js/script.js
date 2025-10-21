// Data konselor tetap (tidak bisa diubah user)
const counselors = [
    { 
        id: 1, 
        name: "Anne", 
        fullName: "Anne Timang", 
        specialization: "Anxiety & Depression", 
        email: "ruangteduh2025@gmail.com", 
        wa: "6281247127769",
        photo: "assets/images/counselors/anne.jpg"
    },
    { 
        id: 2, 
        name: "Beatrix", 
        fullName: "Maria Beatrix Borin", 
        specialization: "Relationship Issues", 
        email: "ruangteduh2025@gmail.com", 
        wa: "6281247127769",
        photo: "assets/images/counselors/beatrix.jpg"
    },
    { 
        id: 3, 
        name: "Nazifa", 
        fullName: "Nazifa Nur Syahira", 
        specialization: "Stress Management", 
        email: "ruangteduh2025@gmail.com", 
        wa: "6281247127769",
        photo: "assets/images/counselors/zifa.jpg"
    },
    { 
        id: 4, 
        name: "AL", 
        fullName: "Achmad Rofi Alfarizi", 
        specialization: "Career Counseling", 
        email: "ruangteduh2025@gmail.com", 
        wa: "6281247127769",
        photo: "assets/images/counselors/al.jpg"
    },
    { 
        id: 5, 
        name: "Difa", 
        fullName: "Difawarindah Pasaribu", 
        specialization: "Self-Esteem", 
        email: "ruangteduh2025@gmail.com", 
        wa: "6281247127769",
        photo: "assets/images/counselors/difa.jpg"
    },
    { 
        id: 6, 
        name: "Dedek", 
        fullName: "Muhammad Ridho Lifandri", 
        specialization: "Family Therapy", 
        email: "ruangteduh2025@gmail.com", 
        wa: "6281247127769",
        photo: "assets/images/counselors/dedek.jpg"
    },
    { 
        id: 7, 
        name: "Einzella", 
        fullName: "Einzella Riil Salsabiela", 
        specialization: "Trauma Recovery", 
        email: "ruangteduh2025@gmail.com", 
        wa: "6281247127769",
        photo: "assets/images/counselors/einzela.jpg"
    }
];

// Data tim
const teamPhotos = [
    {
        id: 1,
        src: "assets/images/team/barcelona.jpg",
        alt: "Tim Ruang Teduh 1",
        title: "Tim Konseling",
        description: "Bersama-sama kami siap membantu Anda menemukan ketenangan."
    },
    {
        id: 2,
        src: "assets/images/team/rdr-2.jpg",
        alt: "Tim Ruang Teduh 2",
        title: "Sesi Diskusi",
        description: "Ruang diskusi hangat untuk berbagi cerita dan pengalaman."
    },
    {
        id: 3,
        src: "assets/images/team/mike-mentzer.jpg",
        alt: "Tim Ruang Teduh 3",
        title: "Workshop Mental Health",
        description: "Workshop rutin untuk meningkatkan kesehatan mental bersama."
    }
];

// Initialize comments from localStorage
let comments = [];

try {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
        comments = JSON.parse(savedComments);
    }
} catch (error) {
    console.error("Error loading comments from localStorage:", error);
    comments = [];
}

// Save comments to localStorage
function saveComments() {
    try {
        localStorage.setItem('comments', JSON.stringify(comments));
    } catch (error) {
        console.error("Error saving comments to localStorage:", error);
    }
}
// Render counselor cards (read-only)
function renderCounselors() {
    const grid = document.getElementById('counselorGrid');
    if (!grid) return;
    
    grid.innerHTML = counselors.map(counselor => `
        <div class="counselor-card card-gradient rounded-xl overflow-hidden border border-slate-700 flex flex-col h-full">
            <div class="photo-container w-full h-40 overflow-hidden">
                <img src="${counselor.photo}" alt="${counselor.fullName}" class="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105">
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-base md:text-lg font-semibold mb-1">${counselor.name}</h3>
                <p class="text-xs md:text-sm text-gray-300 mb-4 font-medium flex-grow">${counselor.fullName}</p>
                <div class="space-y-2 mt-auto">
                    <a href="mailto:${counselor.email}" 
                       class="block bg-blue-600 hover:bg-blue-700 py-2 px-3 md:px-4 rounded-lg transition-all transform hover:scale-105 text-xs md:text-sm">
                        <i class="fas fa-envelope mr-1 md:mr-2"></i>Email
                    </a>
                    <a href="https://wa.me/${counselor.wa}" 
                       target="_blank"
                       class="block bg-green-600 hover:bg-green-700 py-2 px-3 md:px-4 rounded-lg transition-all transform hover:scale-105 text-xs md:text-sm">
                        <i class="fab fa-whatsapp mr-1 md:mr-2"></i>WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}


// Render team photos
function renderTeamPhotos() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = teamPhotos.map(photo => `
        <div class="bg-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 hover:scale-105">
            <div class="h-64 overflow-hidden">
                <img src="${photo.src}" alt="${photo.alt}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${photo.title}</h3>
                <p class="text-gray-300">${photo.description}</p>
            </div>
        </div>
    `).join('');
}

// Render comments
function renderComments() {
    const container = document.getElementById('commentsContainer');
    if (!container) return;
    
    if (comments.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400">Belum ada komentar. Jadilah yang pertama!</p>';
        return;
    }
    
    container.innerHTML = comments.map(comment => `
        <div class="comment-item bg-slate-700 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-red-400">${escapeHtml(comment.name)}</h4>
                <span class="text-xs text-gray-400">${formatDate(comment.timestamp)}</span>
            </div>
            <p class="text-gray-300 text-sm md:text-base">${escapeHtml(comment.message)}</p>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format date
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-3 md:px-6 rounded-lg shadow-lg z-50 animate-pulse';
    notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Render initial data
    renderCounselors();
    renderTeamPhotos();
    renderComments();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });
    
    // Comment form submission
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('commentName');
            const messageInput = document.getElementById('commentMessage');
            
            if (nameInput && messageInput) {
                const name = nameInput.value.trim();
                const message = messageInput.value.trim();
                
                if (name && message) {
                    const newComment = {
                        name: name,
                        message: message,
                        timestamp: Date.now()
                    };
                    
                    comments.unshift(newComment);
                    saveComments();
                    renderComments();
                    
                    // Reset form
                    nameInput.value = '';
                    messageInput.value = '';
                    
                    showNotification('Komentar berhasil dikirim!');
                }
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Add active state to nav links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Handle orientation change for mobile devices
    window.addEventListener('orientationchange', function() {
        // Re-render components after orientation change
        setTimeout(function() {
            renderCounselors();
            renderTeamPhotos();
            renderComments();
        }, 300);
    });
    
    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});