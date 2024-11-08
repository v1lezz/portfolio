let distance = null;
let isWork = false;

// Окно с вопросом при загрузке страницы
window.onload = () => {
    const popup = document.getElementById('popup');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const message = document.getElementById('message');
    const content = document.getElementById('content');

    yesBtn.addEventListener('click', () => {
        popup.style.display = 'none'; // Скрыть всплывающее окно
        content.classList.add('content-active'); // Показать содержимое
        isWork = true;  // Устанавливаем флаг работы
        message.innerText = 'Жизнь продолжается, и мы должны двигаться дальше';
        startApp(); // Запуск приложения после подтверждения
    });

    noBtn.addEventListener('click', () => {
        popup.style.display = 'none'; // Скрыть всплывающее окно
        message.innerText = 'Камень остается на месте';
    });
};

// Логика работы с транспортом
const startApp = () => {
    const fuelInput = document.getElementById('fuel');
    const fuelAmount = document.getElementById('fuel-amount');
    const result = document.getElementById('result');
    const lengtData = document.getElementById('lenght')

    // Получение дистанции через prompt
    const getDistance = () => {
        let getData = false;
        while (!getData) {
            distance = prompt("Введите длину пути (в километрах):");
            if (distance > 0) {
                getData = true;  // Завершение цикла при корректном вводе
            } else {
                alert("Длина пути должна быть больше 0");
            }
        }
    };

    if (isWork) {
        getDistance();  // Вызов получения дистанции только если isWork = true
        lengtData.innerText = `Вы ввели следующую длинну в км: ${distance}`
    }

    // Отображение текущего значения ползунка
    fuelInput.addEventListener('input', () => {
        fuelAmount.innerText = fuelInput.value;
    });

    // Функции для расчёта расхода топлива
    const calculateFuel = (consumption) => (distance) => distance * (consumption / 100);
    const motoFuelConsumption = calculateFuel(5);  // Расход для мотоцикла
    const carFuelConsumption = calculateFuel(10);  // Расход для машины

    // Функция проверки наличия топлива
    const checkFuel = (neededFuel, availableFuel) => {
        if (neededFuel <= availableFuel) {
            result.innerHTML = 'Хватит бензина! 😊';
        } else {
            result.innerHTML = 'Не хватит бензина 😞';
        }
    };

    // Универсальная функция для проверки топлива
    const handleFuelCheck = (consumptionFn, event) => {
        event.preventDefault();
        if (distance) {
            const neededFuel = consumptionFn(distance);
            checkFuel(neededFuel, fuelInput.value);
        } else {
            alert('Пожалуйста, введите корректную длину пути.');
        }
    };

    // Обработчики кнопок
    document.getElementById('moto-btn').addEventListener('click', (event) => {
        handleFuelCheck(motoFuelConsumption, event);
    });

    document.getElementById('car-btn').addEventListener('click', (event) => {
        handleFuelCheck(carFuelConsumption, event);
    });
};