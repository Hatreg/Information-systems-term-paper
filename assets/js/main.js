const spinnerCase = document.querySelector('.form-item-status__spinner');
const resultCase = document.querySelector('.form-item-status__info');
const detailCalc = document.querySelector('#detailCalc');

document.querySelectorAll('.form-item__input').forEach(element => {
    element.addEventListener('focusin', e => {
        e.target.closest('.form-item').classList.add('form-item--active');
    });
});

document.querySelectorAll('.form-item__input').forEach(element => {
    element.addEventListener('focusout', e => {
        e.target.closest('.form-item').classList.remove('form-item--active');
    });
});

const calcButton = document.querySelector('#calculate');

calcButton.addEventListener('click', e => {
    e.preventDefault();
    setLoadAnim();
    resultCase.innerHtml = "Вычисляем Vbox & Vas. Подождите...";

    let mms = document.querySelector('#mms').value;
    let cms = document.querySelector('#cms').value;
    let rms = document.querySelector('#rms').value;
    let re = document.querySelector('#re').value;
    let bl = document.querySelector('#bl').value;
    let sd = document.querySelector('#sd').value;

    // Базовая валидация
    if (mms === "" || cms === "" || rms === "" || re === "" || bl === "" || sd === "") {
        resultCase.classList.add('error');
        resultCase.innerHTML = "Заполните все поля формы. Одно из полей не заполнено.";
        unsetLoadAnim();
    } else {
        resultCase.classList.remove('error');
        resultCase.innerHTML = "";
    }

    // Шаг 1. Получение Fs
    detailCalc.innerHTML = "1) Вычисление полной добротности динамика. Вычисление резонансной частоты динамика <b>Fs = 1/(2*pi*sqrt(Cms * Mms)</b><br>";
    let fs = (1/(2*3.14*Math.sqrt(cms * mms)));
    detailCalc.innerHTML += "Fs = "+ fs.toFixed(2) +"Гц;<br><br>";

    // Шаг 2. Получение Qms, Qes
    detailCalc.innerHTML += "2) Вычисление полной добротности динамика. Вычисление коэфициентов <b>Qms = (2*pi*Fs*Mms)/Rms, Qes = (2*pi*Fs*Mms*Re)/Bl^2</b><br>";
    let qms = ((2*3.14*fs*mms)/rms);
    let qes = (2*3.14*fs*mms*re)/Math.pow(bl,2);
    detailCalc.innerHTML += "Qms = "+ qms.toFixed(2) + ", Qes = "+qes.toFixed(2)+"; <br><br>";

    // Шаг 3. Получение Qts
    detailCalc.innerHTML += "Вычисление полной добротности динамика <b>Qts = (Qms*Qes)/(Qms + Qes)</b><br>";
    let qts = (qms*qes)/(qms+qes);
    detailCalc.innerHTML += "Qts = "+ qts.toFixed(2) + ";<br><br>";

    // Шаг 5. Вычисление Vas
    detailCalc.innerHTML += "Вычисление эквивалентного объема <b>Vas (л) = p*c^2*sd^2*Cms * 1000</b>;<br>";
    let vas = (1.18421 * Math.pow(346.1, 2) * Math.pow(sd, 2) * cms)*1000;
    detailCalc.innerHTML += "Vas = "+ vas.toFixed(2) + " литров;<br><br>";

    // Шаг 4. Получение Vbox и Vas

    let vbox = (vas/1000 * (2*Math.pow(qts, 2)))/(1-2*Math.pow(qts, 2)) * 1000;

    if(vbox < 0) {
        detailCalc.innerHTML += "<b>Данный динамик имеет высокую добротность не совместимую с типом акустического оформления - закрытый ящик.</b>";
    } else {
        detailCalc.innerHTML += "Вычисление <b>Vbox = Vas*2*Qts^2/(1-2*Qts^2)</b><br>";
        detailCalc.innerHTML += "Vbox = "+ vbox.toFixed(2) + "литров;<br><br>";
    }


    resultCase.classList.add('success');
    resultCase.innerHTML = "Значения подсчитаны успешно.";

    unsetLoadAnim();

});

const setLoadAnim = () => {
    spinnerCase.innerHTML = "<svg class=\"spinner\" viewBox=\"0 0 50 50\">\n" +
        "                                <circle class=\"path\" cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\" stroke-width=\"5\"></circle>\n" +
        "                            </svg>\n";
};

const unsetLoadAnim = () => {
    spinnerCase.innerHTML = "";
}