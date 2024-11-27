
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); 
}

document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

const userSignedIn = localStorage.getItem("userSignedIn") === "true";
const userName = localStorage.getItem("userName");

const userIcon = document.getElementById("userIcon");
const userNameDisplay = document.getElementById("userNameDisplay");
const signOutBtn = document.getElementById("signOutBtn");

function updateUI() {
   if (userSignedIn && userName) {
  userIcon.style.display = "none";
  userNameDisplay.style.display = "block";
  userNameDisplay.textContent = userName; 
  signOutBtn.style.display = "block";

} else {
   userIcon.style.display = "block";
   userNameDisplay.style.display = "none";
   signOutBtn.style.display = "none"; 
}
}

   signOutBtn.addEventListener("click", () => {
      localStorage.removeItem("userSignedIn");
      localStorage.removeItem("userName");

      updateUI();

      userIcon.style.display = "block";
      userNameDisplay.style.display = "none";
      signOutBtn.style.display = "none";

      window.location.href = "http://127.0.0.1:5500/index.html";
    });

  userIcon.addEventListener("click", () => {
    alert("Redirecting to Log In page...");
    window.location.href = "LogIn.html";
  });

  updateUI();




   // Search Bar 
function searchServices() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const services = document.querySelectorAll('.service');

    services.forEach(service => {
        service.style.backgroundColor = ''; 
    });

    for (let service of services) {
        const serviceName = service.getAttribute('data-service-name').toLowerCase();

        if (serviceName.includes(searchInput)) {
            service.style.backgroundColor = '#ffff99'; 
            service.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
        }
    }
}
 
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

    let bookedServices = [];
    let totalAmount = 0;

    function bookService(serviceName, servicePrice) {
        if (!bookedServices.includes(serviceName)) {
            bookedServices.push(serviceName);
            totalAmount += servicePrice; 
        }
        updateBookingSummary();
    }

    function updateBookingSummary() {
        const summaryContent = document.getElementById("summary-content");
        summaryContent.innerHTML = "";

        if (bookedServices.length > 0) {
            bookedServices.forEach(service => {
                const serviceItem = document.createElement("p");
                serviceItem.textContent = service;
                summaryContent.appendChild(serviceItem);
            });
            
            const totalItem = document.createElement("p");
            totalItem.innerHTML = `<strong>Total: $${totalAmount}</strong>`;
            summaryContent.appendChild(totalItem);

            proceedToBookingFormButton.disabled = false; 
        } else {
            summaryContent.textContent = "No services selected.";
            proceedToBookingFormButton.disabled = true; 
        }
    }

    proceedToBookingFormButton.addEventListener("click", function () {
        if (bookedServices.length > 0) {
            bookingFormSection.style.display = "block";
            bookingSummarySection.style.display = "none";
        }
    });

    
    appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const email = document.getElementById("email").value;

        confirmServices.textContent = bookedServices.join(", ");
        confirmDate.textContent = date;
        confirmTime.textContent = time;
        confirmName.textContent = name;
        confirmContact.textContent = contact;
        confirmEmail.textContent = email; 

        bookingFormSection.style.display = "none";
        bookingConfirmationSection.style.display = "block";
    });

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
            emailStatus.style.color = 'green'; 
        } else {
            emailStatus.textContent = "Unable to send email. Please ensure all information is filled out.";
            emailStatus.style.color = 'red';
        }
    };
    
    proceedToBookingFormButton.disabled = true;

    window.bookService = bookService;
});

window.onscroll = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block"; 
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

  