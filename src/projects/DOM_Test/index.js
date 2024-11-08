"use-strict";

const questions = [
    {
        task: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        variants: [
            { text: "Пол деревни, за раз", isCorrect: false },
            { text: "Полдеревни, зараз", isCorrect: true },
            { text: "Пол-деревни, за раз", isCorrect: false },
        ],
        textForCorrect: "Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом.",
    },
    {
        task: "А эти слова как пишутся?",
        variants: [
            { text: "Капуччино и эспрессо", isCorrect: false },
            { text: "Каппуччино и экспресо", isCorrect: false },
            { text: "Капучино и эспрессо", isCorrect: true },
        ],
        textForCorrect: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо».",
    },
    {
        task: "Как нужно писать?",
        variants: [
            { text: "Черезчур", isCorrect: false },
            { text: "Черес-чур", isCorrect: false },
            { text: "Чересчур", isCorrect: true },
        ],
        textForCorrect: "Да! Правильное написание учим наизусть — «чересчур».",
    },
    {
        task: "Где допущена ошибка?",
        variants: [
            { text: "Аккордеон", isCorrect: false },
            { text: "Белиберда", isCorrect: false },
            { text: "Эпелепсия", isCorrect: true },
        ],
        textForCorrect: "Верно! Это слово пишется так: «эпИлепсия».",
    },
];

const finished = [];
let activeTask = null;
let clickDontActive = false;
let correctAns = 0;
let showResult = false;

const tasks = document.querySelector("#tasks");
const variantsAns = document.querySelector("#variants-ans");
const title = document.querySelector("#title");


function addListeners() {
    const variants = document.querySelectorAll(".variant-ans");
    variants.forEach((element) => {
        element.addEventListener("click", handleClick);
    });
}

function handleClick(event) {
    if (!clickDontActive) {
        const correctVariant = activeTask.variants.find((variant) => variant.isCorrect);
        const selectedElement = event.target.closest(".variant-ans");
        const value = selectedElement.dataset.value;
        const isCorrect = value === correctVariant.text;

        if (isCorrect) {
            correctAns++;
            selectedElement.style.backgroundColor = "#4CAF50";
        } else {
            selectedElement.style.backgroundColor = "#f44336";
        }

        const correctElement = document.querySelector(`[data-value="${correctVariant.text}"]`);
        correctElement.style.backgroundColor = "#4CAF50";

        addIconToLastTask(isCorrect);

        if (isCorrect) {
            addTextToVariant(activeTask.textForCorrect, correctElement);
        }

        document.querySelectorAll(".variant-ans").forEach((element) => {
            if (element !== correctElement) {
                element.classList.add("fly-down");
            }
        });

        clickDontActive = true;
        setTimeout(() => {
            clickDontActive = false;
            finished.push(activeTask);
            resetTask();
        }, 3000);
    }
}

function addIconToLastTask(isCorrect) {
    const taskElements = document.querySelectorAll(".task");
    const lastTaskElement = taskElements[taskElements.length - 1];

    const img = document.createElement("img");
    img.src = "./icons/" + (isCorrect ? "check.svg" : "cross.svg");
    img.alt = isCorrect ? "Правильно" : "Неправильно";
    img.style.width = "20px";
    img.style.height = "20px";
    img.style.marginLeft = "10px";

    lastTaskElement.appendChild(img);
}

function addTextToVariant(text, correctElement) {
    const explanation = document.createElement("p");
    explanation.textContent = text;
    explanation.style.marginTop = "10px";
    explanation.style.fontSize = "14px";
    explanation.style.color = "#333";
    correctElement.appendChild(explanation);
}

function resetTask() {
    variantsAns.innerHTML = "";
    main();
}

function getTaskHtml(task, index) {
    return `
        <div id="task" class="task">
            <p>${index}. ${task}</p>
        </div>
    `;
}

function getVariantAnsHtml(text) {
    return `
        <button class="variant-ans" data-value="${text}">
            <p>${text}</p>
        </button>
    `;
}

function getResultHtml() {
    return `
        <div>
            <p>Поздравляем!</p>
            <p>Всего правильных ответов: ${correctAns} из ${finished.length}</p>
        </div>
    `;
}

function getButtonShowResHtml() {
    return `
        <button id="button-show" class="variant-ans">
            <p>Показать результат</p>
        </button>
    `
}

function renderVariantsAns(variants) {
    variants.forEach((variant) => {
        variantsAns.innerHTML += getVariantAnsHtml(variant.text);
    });
}


function renderCorrectAns(variants) {
    variants.find((variant) => variant.isCorrect);

}

function renderTask(task, index) {
    tasks.innerHTML += getTaskHtml(task, index);
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function main() {
    if (questions.length > 0) {
        const randomIndex = getRandomNumber(0, questions.length - 1);
        const { task, variants } = questions[randomIndex];
        activeTask = questions[randomIndex];
        renderTask(task, finished.length + 1);
        renderVariantsAns(variants);
        addListeners();
        questions.splice(randomIndex, 1);
    } else if (!showResult) {
        variantsAns.innerHTML = getButtonShowResHtml();
        const button = document.querySelector("#button-show");
        button.addEventListener("click", () => {
            showResult = true;
            main();
        });
    }
    else {
        variantsAns.innerHTML = "";
        tasks.style.display = "flex";
        tasks.style.justifyContent = "center";
        tasks.innerHTML = getResultHtml();
    }
}


title.addEventListener("click", () => main());