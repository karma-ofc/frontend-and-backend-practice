// форматирование номера
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 11 && (cleaned.startsWith('7') || cleaned.startsWith('8'))) {
        return '+7 (' + cleaned.substring(1, 4) + ') ' + cleaned.substring(4, 7) + '-' + cleaned.substring(7, 9) + '-' + cleaned.substring(9, 11);
    } else if (cleaned.length === 10) {
        return '+7 (' + cleaned.substring(0, 3) + ') ' + cleaned.substring(3, 6) + '-' + cleaned.substring(6, 8) + '-' + cleaned.substring(8, 10);
    }
    
    return phone;
}

// валидация почты
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// форматирование ввода телефона
function formatPhoneInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('7') || value.startsWith('8')) {
        value = value.substring(1);
    }
    
    if (value.length > 0) {
        let formattedValue = '+7 (';
        
        if (value.length > 0) {
            formattedValue += value.substring(0, 3);
        }
        if (value.length > 3) {
            formattedValue += ') ' + value.substring(3, 6);
        }
        if (value.length > 6) {
            formattedValue += '-' + value.substring(6, 8);
        }
        if (value.length > 8) {
            formattedValue += '-' + value.substring(8, 10);
        }
        
        input.value = formattedValue;
    }
}

// отправка формы
function submitForm() {
    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const email = formData.get('email');
    if (!validateEmail(email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }

    let phone = formData.get('phone');
    phone = formatPhoneNumber(phone);

    const data = {
        name: formData.get('name'),
        phone: phone,
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };

    console.log('Данные формы:', data);

    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');

    const contactModal = document.getElementById('contactModal');
    contactModal.close();

    // очистка формы
    form.reset();
}

// закрытие модального окна
function closeModal() {
    const contactModal = document.getElementById('contactModal');
    contactModal.close();
    
    // очистка формы
    const form = document.getElementById('feedbackForm');
    form.reset();
}

// автозаполнение номера
function autoFillPhone() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput && !phoneInput.value) {
        phoneInput.value = '+7 (';
        phoneInput.addEventListener('keydown', function(e) {
            if (!/[\d\b\t]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const contactModal = document.getElementById('contactModal');
    const phoneInput = document.getElementById('phone');
    
    if (contactModal) {
        contactModal.addEventListener('show', function() {
            autoFillPhone();
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneInput(this);
        });
        
        phoneInput.addEventListener('blur', function() {
            if (this.value) {
                this.value = formatPhoneNumber(this.value);
            }
        });
        
        phoneInput.setAttribute('maxlength', '18');
    }
    
    // закрытие модального окна по клику на фон
    if (contactModal) {
        contactModal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });
    }

    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && event.target.type !== 'textarea') {
                event.preventDefault();
            }
        });
    }
});