// Базовая стоимость для каждого типа пиццы
const basePrices = {
    margarita: 450,
    pepperoni: 550,
    fourCheese: 600
};

// Дополнительные стоимости для размеров
const sizePrices = {
    standard: 0,
    large: 100,
    xl: 200
};

// Дополнительная стоимость для двойного сыра
const extraCheesePrice = 50;

// Получаем элементы DOM
const quantityInput = document.getElementById('quantity');
const pizzaTypeRadios = document.querySelectorAll('input[name="pizzaType"]');
const optionsSelect = document.getElementById('options');
const optionsGroup = document.getElementById('optionsGroup');
const propertyCheckbox = document.getElementById('property');
const propertyGroup = document.getElementById('propertyGroup');
const totalPriceElement = document.getElementById('totalPrice');

// Функция для пересчета стоимости
function calculateTotal() {
    // Получаем текущие значения
    const quantity = parseInt(quantityInput.value) || 0;
    const selectedType = document.querySelector('input[name="pizzaType"]:checked').value;
    const selectedOption = optionsSelect.value;
    const propertySelected = propertyCheckbox.checked;

    // Рассчитываем базовую стоимость
    let total = basePrices[selectedType] * quantity;

    // Добавляем стоимость размера (если применимо)
    if (selectedType === 'pepperoni') {
        total += sizePrices[selectedOption] * quantity;
    }

    // Добавляем стоимость двойного сыра (если применимо)
    if (selectedType === 'fourCheese' && propertySelected) {
        total += extraCheesePrice * quantity;
    }

    // Обновляем отображение цены
    totalPriceElement.textContent = total + ' руб.';
}

// Функция для обновления видимости элементов формы
function updateFormVisibility() {
    const selectedType = document.querySelector('input[name="pizzaType"]:checked').value;

    // Показываем/скрываем опции и свойства в зависимости от типа пиццы
    switch(selectedType) {
        case 'margarita':
            // Маргарита - нет дополнительных опций
            optionsGroup.classList.add('hidden');
            propertyGroup.classList.add('hidden');
            break;
        case 'pepperoni':
            // Пепперони - только выбор размера
            optionsGroup.classList.remove('hidden');
            propertyGroup.classList.add('hidden');
            break;
        case 'fourCheese':
            // Четыре сыра - только двойной сыр
            optionsGroup.classList.add('hidden');
            propertyGroup.classList.remove('hidden');
            break;
    }
}

// Назначаем обработчики событий
quantityInput.addEventListener('input', calculateTotal);

pizzaTypeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        updateFormVisibility();
        calculateTotal();
    });
});

optionsSelect.addEventListener('change', calculateTotal);
propertyCheckbox.addEventListener('change', calculateTotal);

// Инициализация формы
updateFormVisibility();
calculateTotal();