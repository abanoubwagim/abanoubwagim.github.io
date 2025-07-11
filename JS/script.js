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
      768: { items: 2 },
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
      768: { items: 2 },
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
      992: { items: 2 } // 2 items per row
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

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default submit

    const isValid = validateForm();

    if (isValid) {
      fetch("https://formsubmit.co/abanoubwagim@gmail.com", {
        method: "POST",
        body: new FormData(form),
      })
        .then((response) => {
          if (response.ok) {
            form.innerHTML = `
              <div class="alert alert-success text-center">
                ✅ Thank you! Your message has been sent successfully.
              </div>`;
          } else {
            alert("❌ Something went wrong. Please try again.");
          }
        })
        .catch(() => alert("❌ Network error. Please try again."));
    }
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


