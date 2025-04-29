// Initialize Leaflet Map
function initMap() {
    // Coordinates for Maco, Davao de Oro, Philippines
    const macoLocation = { lat: 7.3619, lng: 126.1047 };

    // Create map centered on Maco
    const map = L.map('map').setView(macoLocation, 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker for Maco
    const marker = L.marker(macoLocation).addTo(map)
        .bindPopup('Escape to Maco Office<br>Contact: +63 912 345 6789')
        .openPopup();
}

$(document).ready(function() {
    // Initialize the map
    initMap();

    // Mobile menu toggle
    $('.mobile-menu').click(function() {
        $('.nav-links').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });

    // Character counter for message textarea
    const messageField = $('#message');
    const currentCount = $('#current-count');
    const maxCount = $('#max-count');
    const maxLength = 1000;

    messageField.attr('maxlength', maxLength);
    maxCount.text(maxLength);

    messageField.on('input', function() {
        const currentLength = $(this).val().length;
        currentCount.text(currentLength);

        // Change color when approaching limit
        if (currentLength > maxLength * 0.9) {
            currentCount.css('color', '#dc3545');
        } else if (currentLength > maxLength * 0.7) {
            currentCount.css('color', '#ffc107');
        } else {
            currentCount.css('color', '');
        }
    });

    // Form validation
    $('#contact-form').submit(function(e) {
        e.preventDefault();

        let isValid = true;

        // Reset errors
        $('.error-message').hide();
        $('.input-with-icon input, .input-with-icon textarea').removeClass('shake');

        // Validate name
        const name = $('#name').val().trim();
        if (name === '') {
            $('#name-error').text('Please enter your name').show();
            $('#name').parent().addClass('shake');
            isValid = false;
        } else if (name.length < 2) {
            $('#name-error').text('Name must be at least 2 characters').show();
            $('#name').parent().addClass('shake');
            isValid = false;
        }

        // *********Validate email*********
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            $('#email-error').text('Please enter your email address').show();
            $('#email').parent().addClass('shake');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $('#email-error').text('Please enter a valid email address').show();
            $('#email').parent().addClass('shake');
            isValid = false;
        }

        //********* */ Validate subject*********
        const subject = $('#subject').val().trim();
        if (subject === '') {
            $('#subject-error').text('Please enter a subject').show();
            $('#subject').parent().addClass('shake');
            isValid = false;
        }

        // Validate message
        const message = $('#message').val().trim();
        if (message === '') {
            $('#message-error').text('Please enter your message').show();
            $('#message').parent().addClass('shake');
            isValid = false;
        } else if (message.length < 10) {
            $('#message-error').text('Message must be at least 10 characters').show();
            $('#message').parent().addClass('shake');
            isValid = false;
        }

        // If form is valid, submit
        if (isValid) {
            // Configure toastr notifications
            toastr.options = {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                timeOut: 5000
            };

            // Simulate form submission
            const btn = $(this).find('button[type="submit"]');
            const originalText = btn.html();

            btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
            btn.prop('disabled', true);

            // Simulate AJAX request with timeout
            setTimeout(function() {
                // Reset form
                $('#contact-form')[0].reset();
                currentCount.text('0');

                // Show success message
                toastr.success('Your message has been sent successfully. We will get back to you soon!', 'Thank You!');

                // Reset button
                btn.html(originalText);
                btn.prop('disabled', false);
            }, 2000);
        }
    });

    // Input focus effects
    $('.input-with-icon input, .input-with-icon textarea').focus(function() {
        $(this).parent().find('i').addClass('active');
    }).blur(function() {
        $(this).parent().find('i').removeClass('active');
    });

    // FAQ accordion
    $('.faq-question').click(function() {
        const parent = $(this).parent();

        if (parent.hasClass('active')) {
            parent.removeClass('active');
        } else {
            $('.faq-item').removeClass('active');
            parent.addClass('active');
        }
    });

    // Image rotation for contact images
    const images = [
        '../images/maco-scenery.jpg',
        '../images/maco-waterfall.jpg',
        '../images/maco-mountain.jpg'
    ];

    let currentImage = 0;

    // Change image every 5 seconds
    setInterval(function() {
        currentImage = (currentImage + 1) % images.length;
        $('#contact-image').fadeOut(500, function() {
            $(this).attr('src', images[currentImage]);
            $(this).fadeIn(500);
        });
    }, 5000);

    // Animation on scroll
    $(window).scroll(function() {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();

        $('.contact-card').each(function() {
            const elementTop = $(this).offset().top;

            if (elementTop < (scrollTop + windowHeight - 100)) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    });

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
});