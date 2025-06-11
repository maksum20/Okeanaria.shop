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

// Масив із відгуками
const defaultReviews = [
  {
    name: "Ірина С.",
    text: "Замовляю по телефону тільки тут! Завжди свіжа риба, персонал дуже ввічливий. Рекомендую!",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Олександр П.",
    text: "Подзвонив та замовив продукцію, забрав в магазині — все швидко й якісно. Дякую!",
    stars: 4,
    img: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Віталій Р.",
    text: "Смачна риба, гарний вибір, все свіже. Дуже задоволений!",
    stars: 5,
    img: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Ольга Л.",
    text: "Купувала креветки для свята — всі гості в захваті! Буду звертатись ще.",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/4.jpg"
  },
{
    name: "Дмитро Б.",
    text: "Дякую за якісний сервіс! Завжди приємно купувати в “Океанарії”.",
    stars: 5,
    img: "https://randomuser.me/api/portraits/men/5.jpg"
},
  {
    name: "Тетяна В.",
    text: "Великий вибір, свіжа риба. Все супер, рекомендую всім!",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    name: "Людмила К.",
    text: "Дуже приємний персонал, допомогли з вибором. Буду купувати ще!",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    name: "Артем З.",
    text: "Великий вибір, якість топ. Навіть діти полюбили цю рибу.",
    stars: 5,
    img: "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
    name: "Роман І.",
    text: "Все завжди свіже і за адекватною ціною. Однозначно рекомендую!",
    stars: 4,
    img: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    name: "Олена Ф.",
    text: "Тут найсмачніший лосось! Завжди купляю тільки тут.",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/10.jpg"
  },
  {
    name: "Євген С.",
    text: "Зручний сайт, зручно обирати продукти. Все просто і швидко!",
    stars: 5,
    img: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Ігор К.",
    text: "Чудова якість, хороші бонуси. Буду рекомендувати друзям!",
    stars: 4,
    img: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    name: "Марина Н.",
    text: "Дуже задоволена обслуговуванням. Спасибі за індивідуальний підхід!",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/13.jpg"
  },
  {
    name: "Катерина Ю.",
    text: "Риба дуже смачна і свіжа. Сервіс приємний, все подобається!",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/14.jpg"
  }
];

//При першому завантаженні — зберегти в LocalStorage, якщо там пусто
if (!localStorage.getItem('reviews')) {
  localStorage.setItem('reviews', JSON.stringify(defaultReviews));
}

// Рендер відгуків з LocalStorage
const reviewsBlock = document.querySelector('.review-grid');
function loadReviews() {
  reviewsBlock.innerHTML = '';
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.forEach(r => {
    const starsHtml = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
    reviewsBlock.innerHTML += `
      <div class="review-card">
        <img src="${r.img}" alt="review">
        <div>
          <strong>${r.name}</strong>
          <p>${r.text}</p>
          <div style="color:#ffb400">${starsHtml}</div>
        </div>
      </div>
    `;
  });
}
//додємо новий відгук з форми
const reviewForm = document.getElementById('reviewForm');
const stars = document.querySelectorAll('.star-rating span');
const starValueInput = document.getElementById('starValueInput');
let selectedStars = 1;

// Встановлюємо по default кількість зірок
stars.forEach((s, idx) => {
  s.classList.toggle('active', idx < selectedStars);
});

// hover підсвічує до обраної зірки
stars.forEach((star, i) => {
  star.addEventListener('mouseenter', () => {
    stars.forEach((s, idx) => {
      s.classList.toggle('hovered', idx <= i);
    });
  });
  star.addEventListener('mouseleave', () => {
    stars.forEach((s, idx) => {
      s.classList.remove('hovered');
      s.classList.toggle('active', idx < selectedStars);
    });
  });
  star.addEventListener('click', () => {
    selectedStars = i + 1;
    starValueInput.value = selectedStars;
    stars.forEach((s, idx) => {
      s.classList.toggle('active', idx < selectedStars);
    });
  });
});

// Надсилання форми
reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = reviewForm.reviewName.value.trim();
  const text = reviewForm.reviewText.value.trim();
  const stars = +starValueInput.value;
  //default іконка для користувача:
  const img = "icon.jpg";
  if(name && text && stars) {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.unshift({ name, text, stars, img });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews();
    reviewForm.reset();
    starValueInput.value = 5;
    starsEls.forEach((s, i) => { if(i < 5) s.classList.add('selected'); else s.classList.remove('selected'); });
  }
});

// Показати при завантаженні
window.addEventListener('DOMContentLoaded', loadReviews);