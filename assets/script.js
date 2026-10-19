

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  updateCopyrightYear();
  initialiseNavbarScrollEffect();
  initialiseContactForm();
  initialiseMessageCounter();
  initialiseRevealAnimations();
});

function updateCopyrightYear() {
  const yearElements = document.querySelectorAll("[data-current-year]");
  const currentYear = new Date().getFullYear();

  yearElements.forEach(function (element) {
    element.textContent = currentYear;
  });
}

function initialiseNavbarScrollEffect() {
  const navbar = document.querySelector(".site-navbar");
  if (!navbar) return;

  const updateNavbar = function () {
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 20);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

function initialiseMessageCounter() {
  const messageField = document.getElementById("message");
  const counter = document.getElementById("messageCount");

  if (!messageField || !counter) return;

  const updateCount = function () {
    counter.textContent = String(messageField.value.length);
  };

  messageField.addEventListener("input", updateCount);
  updateCount();
}

function initialiseContactForm() {
  const form = document.getElementById("portfolioContactForm");
  const feedback = document.getElementById("formFeedback");

  if (!form || !feedback) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    feedback.textContent = "";
    feedback.className = "form-feedback";

    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const confirmation = document.getElementById("confirmDetails");

    const fields = [name, email, subject, message, confirmation];
    fields.forEach(function (field) {
      field.classList.remove("is-invalid");
    });

    let isValid = true;

    if (name.value.trim().length < 2) {
      name.classList.add("is-invalid");
      isValid = false;
    }

    if (!email.checkValidity() || email.value.trim() === "") {
      email.classList.add("is-invalid");
      isValid = false;
    }

    if (subject.value.trim().length < 3) {
      subject.classList.add("is-invalid");
      isValid = false;
    }

    if (message.value.trim().length < 10) {
      message.classList.add("is-invalid");
      isValid = false;
    }

    if (!confirmation.checked) {
      confirmation.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      feedback.textContent = "Please correct the highlighted fields and try again.";
      feedback.classList.add("feedback-error");
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const recipient = "alvinmaxrashid@gmail.com";
    const emailSubject = encodeURIComponent(subject.value.trim());
    const emailBody = encodeURIComponent(
      "Name: " + name.value.trim() + "\n" +
      "Email: " + email.value.trim() + "\n\n" +
      "Message:\n" + message.value.trim()
    );

    feedback.textContent =
      "Your details passed validation. Your email application should open with the message prepared. Send it from that application to complete delivery.";
    feedback.classList.add("feedback-success");

    window.location.href =
      "mailto:" + recipient + "?subject=" + emailSubject + "&body=" + emailBody;
  });
}

function initialiseRevealAnimations() {
  const items = document.querySelectorAll(
    ".feature-card, .gallery-card, .timeline-card, .skill-panel"
  );

  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  items.forEach(function (item) {
    item.classList.add("reveal-ready");
  });

  const observer = new IntersectionObserver(function (entries, currentObserver) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (item) {
    observer.observe(item);
  });
}
