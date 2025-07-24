---
layout: null
sitemap: false
serviceworker: true
---

{% if site.serviceworker and jekyll.environment == 'production' %}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceworker.js")
  })
}
{% endif %}

if (window.location.pathname.endsWith('/contact')) {
  // Get the form element with the id "contact-form"
  const contactForm = document.getElementById('contact-form');
  
  // Get the submit button
  const submitButton = contactForm.querySelector('button[type=submit]');
  
  // Get the textarea element
  const messageField = contactForm.querySelector('textarea');
  
  // Set the CSS for the textarea
  messageField.style.boxSizing = 'border-box';
  messageField.style.overflow = 'hidden';
  
  // Function to handle form submission event
  const submitForm = async event => {
    event.preventDefault();
  
    // Get the contactForm data
    const formData = new FormData(event.target);
  
    // Disable all contactForm elements
    contactForm.querySelectorAll('input, textarea').forEach(input => (input.disabled = true));
  
    // Change the button text to "Sending message..."
    submitButton.textContent = 'Bericht versturen...';
    submitButton.className = 'btn btn-lg btn-primary disabled';
  
    // Send the form to the Cloudflare Workers API
    try {
      const response = await fetch('/contact', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      submitButton.textContent = data.message;
  
      if (data.success) {
        submitButton.className = 'btn btn-lg btn-success disabled';
      } else {
        submitButton.className = 'btn btn-lg btn-danger disabled';
      }
    } catch (error) {
      submitButton.textContent = 'Error sending message';
      submitButton.className = 'btn btn-lg btn-danger disabled';
    }
  };
  
  // Function to resize the textarea
  const resizeMessageField = event => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };
  
  // Add an event listener to the form element
  contactForm.addEventListener('submit', submitForm);
  
  // Add an event listener to the textarea
  messageField.addEventListener('input', resizeMessageField);
};
