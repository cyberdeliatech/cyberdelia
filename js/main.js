// ========================================
// EMAILJS CONFIGURATION
// ========================================

const EMAILJS_PUBLIC_KEY = "UkgeRvIW4bf1of0e6";
const EMAILJS_SERVICE_ID = "service_oxs8712";
const EMAILJS_TEMPLATE_ID = "template_1ps63nr";

emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY
});


// ========================================
// CONTACT FORM
// ========================================

const leadForm = document.getElementById("leadForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (leadForm) {
  leadForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;

    submitBtn.innerHTML =
      'Sending... <i class="fa-solid fa-spinner fa-spin ml-2"></i>';

    formStatus.className = "form-status";
    formStatus.textContent = "";

    try {
      const response = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        leadForm
      );

      console.log("EmailJS success:", response);

      formStatus.className = "form-status success";

      formStatus.textContent =
        "✓ Request sent successfully. Thank you! Naiff will get back to you shortly.";

      leadForm.reset();

    } catch (error) {
      console.error("EmailJS Error:", error);

      formStatus.className = "form-status error";

      formStatus.innerHTML =
        'Unable to send the request right now. Please call <strong>(786) 300-1144</strong>.';

    } finally {
      submitBtn.disabled = false;

      submitBtn.innerHTML =
        'Submit Request <i class="fa-solid fa-paper-plane ml-2"></i>';
    }
  });
}


// ========================================
// MOBILE MENU
// ========================================

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {

  mobileMenuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");

  });

}


// Close mobile menu when a link is clicked

document.querySelectorAll(".mobile-link").forEach((link) => {

  link.addEventListener("click", () => {

    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");

  });

});
