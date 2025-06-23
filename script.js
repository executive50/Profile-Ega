document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
    }, 1000); // Adjust loading time as needed

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Toggle sections (About, Skills, Education)
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contentId = button.id.replace('Toggle', 'Content');
            const content = document.getElementById(contentId);
            const icon = button.querySelector('i');

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
            button.classList.toggle('active');
        });
    });

    // Initialize all toggle contents to be open by default
    document.querySelectorAll('.toggle-content').forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
        const buttonId = content.id.replace('Content', 'Toggle');
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('active');
            const icon = button.querySelector('i');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });

    // --- NEW FUNCTIONALITY FOR CONNECT AND MESSAGE BUTTONS ---

    // Connect Button (Email)
    const emailConnectBtn = document.getElementById('emailConnectBtn');
    if (emailConnectBtn) {
        emailConnectBtn.addEventListener('click', () => {
            window.location.href = 'mailto:ega272@gmail.com?subject=Connection Request from LinkedIn Profile&body=Hello Ega, I would like to connect with you.';
        });
    }

    // Message Button (WhatsApp)
    const whatsappMessageBtn = document.getElementById('whatsappMessageBtn');
    if (whatsappMessageBtn) {
        whatsappMessageBtn.addEventListener('click', () => {
            window.open('https://wa.me/6285691849263', '_blank'); // Menggunakan 62 untuk kode negara Indonesia
        });
    }

    // --- OLD MODAL AND NOTIFICATION (can be removed if not needed) ---
    // If you still want to use the modal for other purposes, keep this part.
    // Otherwise, you can remove the contactModal, closeModal, contactForm, and connectionNotification elements from HTML and their related JS here.

    // const messageBtn = document.getElementById('messageBtn'); // This ID is now whatsappMessageBtn
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    const connectionNotification = document.getElementById('connectionNotification');

    // // Open modal (if messageBtn is still used for modal)
    // if (messageBtn) {
    //     messageBtn.addEventListener('click', () => {
    //         contactModal.style.display = 'flex';
    //     });
    // }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            contactModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (contactModal) {
        window.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }

    // Handle form submission (if contactForm is still used)
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Message sent! (This is a dummy submission)');
            contactModal.style.display = 'none';
            contactForm.reset();
        });
    }

    // // Connect button notification (if connectBtn is still used for notification)
    // const connectBtn = document.getElementById('connectBtn'); // This ID is now emailConnectBtn
    // if (connectBtn) {
    //     connectBtn.addEventListener('click', () => {
    //         connectionNotification.style.display = 'block';
    //         setTimeout(() => {
    //             connectionNotification.style.display = 'none';
    //         }, 3000);
    //     });
    // }
});
