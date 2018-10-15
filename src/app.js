import * as Tools from './util';
import readData from './service';

function registerButtonsClick() {
    const buttonGroup = document.querySelector('.btn-group');
    buttonGroup.addEventListener('click', (event) => {
        let index = document.querySelector('.select-container').selectedIndex;
        changeProgressValue(event.target.value, index);
    });
}

function changeProgressValue(buttonValue, index = 0) {
    const progressSpan = document.getElementById(`id-progress-${index}`);
    const progressBar = progressSpan.parentNode;
    const limit = parseInt(progressBar.dataset.limit);
    const current = parseInt(progressBar.dataset.current);
    let newCurrent = current + parseInt(buttonValue);
    progressBar.dataset.current = newCurrent;
    const usage = Math.floor(newCurrent * 100 / limit);
    if (usage > 100) {
        Tools.toggleClass(progressBar, 'progress-bar-info', 'progress-bar-danger');
        progressBar.style.width = `${usage}%`;
        progressSpan.innerHTML = usage + '%';
    } else if (usage >= 0) {
        Tools.toggleClass(progressBar, 'progress-bar-danger', 'progress-bar-info');
        progressBar.style.width = `${usage}%`;
        progressSpan.innerHTML = usage + '%';
    } else {
        progressBar.style.width = '0%';
        progressSpan.innerHTML = '0%';
    }
}

function progressBarValueChange() {
    readData('http://pb-api.herokuapp.com/bars').then((data) => {
        const progressContainer = document.querySelector('.progress-container'),
            buttonGroup = document.querySelector('.btn-group'),
            selectContainer = document.querySelector('.select-container');
        const response = JSON.parse(data);
        console.log(response);
        Tools.generateProgressBars(response, progressContainer);
        Tools.generateButtons(response, buttonGroup);
        Tools.generateDropDown(response, selectContainer);
    }).then(() => {
        registerButtonsClick();
    }).catch((err) => {
        alert(err);
    })
}

const _init = () => {
    progressBarValueChange();
}

_init();


