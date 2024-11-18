
// Toggle menu function
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); 
}

// Add event listener to the menu icon
document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

   // Search Bar 
function searchServices() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const services = document.querySelectorAll('.service');

    // Clear previous highlights
    services.forEach(service => {
        service.style.backgroundColor = ''; // reset background color
    });

    // Find and highlight matching service
    for (let service of services) {
        const serviceName = service.getAttribute('data-service-name').toLowerCase();

        if (serviceName.includes(searchInput)) {
            // Highlight the service
            service.style.backgroundColor = '#ffff99'; // light yellow highlight

            // Scroll to the service
            service.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break; // stop after finding the first match
        }
    }
}

// Booking Form & Booking Summary 
document.addEventListener("DOMContentLoaded", function () {
    const proceedToBookingFormButton = document.getElementById("proceed-to-booking-form");
    const bookingFormSection = document.getElementById("booking-form");
    const bookingSummarySection = document.getElementById("booking-summary");
    const bookingConfirmationSection = document.getElementById("booking-confirmation");
    const appointmentForm = document.getElementById("appointment-form");
    const confirmServices = document.getElementById("confirm-services");
    const confirmDate = document.getElementById("confirm-date");
    const confirmTime = document.getElementById("confirm-time");
    const confirmName = document.getElementById("confirm-name");
    const confirmContact = document.getElementById("confirm-contact");
    const confirmEmail = document.getElementById("confirm-email");

    // Array to hold booked services
    let bookedServices = [];
    let totalAmount = 0;

    // Function to add a service to the booking summary
    function bookService(serviceName, servicePrice) {
        if (!bookedServices.includes(serviceName)) {
            bookedServices.push(serviceName);
            totalAmount += servicePrice; 
        }
        updateBookingSummary();
    }

    
    // Function to update the booking summary display
    function updateBookingSummary() {
        const summaryContent = document.getElementById("summary-content");
        summaryContent.innerHTML = ""; // Clear previous content

        // Display each booked service
        if (bookedServices.length > 0) {
            bookedServices.forEach(service => {
                const serviceItem = document.createElement("p");
                serviceItem.textContent = service;
                summaryContent.appendChild(serviceItem);
            });
            
            // Display the total amount
            const totalItem = document.createElement("p");
            totalItem.innerHTML = `<strong>Total: $${totalAmount}</strong>`;
            summaryContent.appendChild(totalItem);

            proceedToBookingFormButton.disabled = false; 
        } else {
            summaryContent.textContent = "No services selected.";
            proceedToBookingFormButton.disabled = true; 
        }
    }

    // Proceed to booking form when button is clicked
    proceedToBookingFormButton.addEventListener("click", function () {
        if (bookedServices.length > 0) {
            bookingFormSection.style.display = "block";
            bookingSummarySection.style.display = "none";
        }
    });

    
    appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form details
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const email = document.getElementById("email").value;

        // Populate confirmation section with booked services and form details
        confirmServices.textContent = bookedServices.join(", ");
        confirmDate.textContent = date;
        confirmTime.textContent = time;
        confirmName.textContent = name;
        confirmContact.textContent = contact;
        confirmEmail.textContent = email; 

        // Show confirmation and hide form
        bookingFormSection.style.display = "none";
        bookingConfirmationSection.style.display = "block";
    });

     // Update the sendConfirmationEmail function
     window.sendConfirmationEmail = function () {
        const date = confirmDate.textContent;
        const time = confirmTime.textContent;
        const name = confirmName.textContent;
        const contact = confirmContact.textContent;
        const email = confirmEmail.textContent; 
        const services = bookedServices.join(", ");
        const emailStatus = document.getElementById("email-status"); 
    
        console.log("Sending confirmation email with details:");
        console.log("Date:", date);
        console.log("Time:", time);
        console.log("Name:", name);
        console.log("Contact:", contact);
        console.log("Email:", email);
        console.log("Services:", services);
    
        if (name && contact && services && email) {
            emailStatus.textContent = `Confirmation email sent to ${email} for the following services: ${services} on ${date} at ${time}.`;
            emailStatus.style.color = 'green'; // Indicate success
        } else {
            emailStatus.textContent = "Unable to send email. Please ensure all information is filled out.";
            emailStatus.style.color = 'red'; // Indicate error
        }
    };
    

    // Initially disable the proceed button
    proceedToBookingFormButton.disabled = true;

    // Make bookService available globally so it can be called by button click
    window.bookService = bookService;
});

// Show or hide the button based on scroll position
window.onscroll = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block"; // Show button when scrolled down
    } else {
        scrollToTopBtn.style.display = "none"; // Hide button at the top
    }
};

// Scroll to the top of the page smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

