$(document).ready(function () {
  $(".owl-services").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      992: { items: 3 }
    }
  });
});


$(document).ready(function () {
  $(".project-carousel-fr").owlCarousel({
    rtl: true,
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      992: { items: 2 }
    }
  });
});



$(document).ready(function () {
  $(".project-carousel-sc").owlCarousel({
    rtl: false, 
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 2 }
    }
  });

 
});


document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const statusBox = document.getElementById("formStatus");
  const sendBtn = document.getElementById("send-btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    
    sendBtn.disabled = true;
    statusBox.innerHTML = '<div class="form-loader mx-auto"></div>';

    fetch("https://formsubmit.co/abanoubwagim@gmail.com", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: new FormData(form),
    })
      .then((response) => {
        if (response.ok) {
          statusBox.innerHTML = `
            <div class="form-snackbar success text-center">
              ✅ Thank you! Your message has been sent successfully.
            </div>`;
          form.reset();
        } else {
          statusBox.innerHTML = `
            <div class="form-snackbar error text-center">
              ❌ Something went wrong. Please try again.
            </div>`;
        }
      })
      .catch(() => {
        statusBox.innerHTML = `
          <div class="form-snackbar error text-center">
            ❌ Network error. Please check your connection.
          </div>`;
      })
      .finally(() => {
        sendBtn.disabled = false;
        setTimeout(() => {
          statusBox.innerHTML = "";
        }, 5000);
      });
  });
});



function setRequiredError(errorId) {
  const el = document.getElementById(errorId);
  if (el) el.textContent = "The field is required.";
}

function validateForm() {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const message = document.getElementById("messageTextarea").value.trim();

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

 
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  let isValid = true;

  if (name === "") {
    setRequiredError("nameError");
    isValid = false;
  } else if (name.length < 4) {
    nameError.textContent = "Name must be at least 4 characters.";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    setRequiredError("emailError");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (message === "") {
    setRequiredError("messageError");
    isValid = false;
  }

  return isValid;
}

