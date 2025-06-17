// Burger-menu toggle
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Плавний скрол при кліку на меню
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", function() {
  // Пошук форми
  const contactForm = document.querySelector("#contact form");
  if(contactForm){
    contactForm.addEventListener("submit", function(e) {
      setTimeout(() => {
        contactForm.reset();
      }, 100); // даємо формі надіслати дані, і очищаємо через 0.1 секунди
    });
  }
});
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.querySelector("#contact form");
  const popup = document.getElementById("thankyou-popup");
  const popupClose = document.getElementById("popup-close");

  if(contactForm){
    contactForm.addEventListener("submit", function(e) {
      // Для Formspree потрібно залишатися на цій сторінці, а не переходити на Thank you page
      e.preventDefault(); // Скасовуємо дефолтну поведінку
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if(response.ok){
          contactForm.reset();
          popup.classList.remove("popup-hidden");
        } else {
          alert("Щось пішло не так. Спробуйте ще раз або напишіть на email.");
        }
      }).catch(() => {
        alert("Щось пішло не так. Спробуйте ще раз або напишіть на email.");
      });
    });
  }
  if(popupClose){
    popupClose.addEventListener("click", () => {
      popup.classList.add("popup-hidden");
    });
  }
});
//Плавний скрол повернення на початок сторінки
document.querySelector('.logo').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({top: 0, behavior: 'smooth'});
});



// Для з'явлення номеру телефону
document.addEventListener('DOMContentLoaded', function() {
  const topic = document.getElementById('topic');
  const phoneField = document.getElementById('phone-field');
  const phoneInput = document.getElementById('phone');
  if (topic && phoneField && phoneInput) {
    topic.addEventListener('change', function() {
      if (topic.value === 'Купівля риби оптом') {
        phoneField.style.display = 'block';
        phoneInput.required = true;
      } else {
        phoneField.style.display = 'none';
        phoneInput.required = false;
        phoneInput.value = '';
      }
    });
  }
});
