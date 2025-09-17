const categories = document.querySelectorAll('.pill-ca');
const skills = document.querySelectorAll('#skills-container .pill');

categories.forEach(category => {
    category.addEventListener('click', () => {
        categories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');

        const filter = category.getAttribute('data-filter');

        skills.forEach(skill => {
            if (filter === 'all' || skill.getAttribute('data-category') === filter) {
                skill.style.display = 'inline-block';
            } else {
                skill.style.display = 'none';
            }
        });
    });
});



$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        navText: [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            992: { items: 2 },
            1200: { items: 3 }
        }
    });
});








document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const statusBox = document.getElementById("formStatus");
  const sendBtn = document.getElementById("send-btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    // Show loader
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
            <div class="form-snackbar success text-center p-2" style="background-color: #112131; color: white;">
              ✅ Thank you! Your message has been sent successfully.
            </div>`;
          form.reset();
        } else {
          statusBox.innerHTML = `
            <div class="form-snackbar error text-center p-2" style="background-color: #112131; color: white;">
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
        // Hide message after 5 seconds
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
    const name = document.getElementById("nameInput");
    const email = document.getElementById("emailInput");
    const subject = document.getElementById("subjectInput");
    const message = document.getElementById("messageTextarea");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    // Clear previous errors
    [name, email, subject, message].forEach(input => {
        input.classList.remove("error", "success");
    });
    [nameError, emailError, subjectError, messageError].forEach(el => el.textContent = "");

    let isValid = true;

    if (name.value.trim() === "") {
        setRequiredError("nameError");
        name.classList.add("error");
        isValid = false;
    } else if (name.value.trim().length < 4) {
        nameError.textContent = "Name must be at least 4 characters.";
        name.classList.add("error");
        isValid = false;
    } else {
        name.classList.add("success");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        setRequiredError("emailError");
        email.classList.add("error");
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        email.classList.add("error");
        isValid = false;
    } else {
        email.classList.add("success");
    }

    if (subject.value.trim() === "") {
        setRequiredError("subjectError");
        subject.classList.add("error");
        isValid = false;
    } else {
        subject.classList.add("success");
    }

    if (message.value.trim() === "") {
        setRequiredError("messageError");
        message.classList.add("error");
        isValid = false;
    } else if (message.value.trim().length < 10) {
        messageError.textContent = "Message must be at least 10 characters.";
        message.classList.add("error");
        isValid = false;
    } else {
        message.classList.add("success");
    }

    return isValid;
}

