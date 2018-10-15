import * as Tools from './util';
import readData from './service';

function registerButtonsClick() {
    const buttonGroup = document.querySelector('.btn-group');
    buttonGroup.addEventListener('click', (event) => {
        let index = document.querySelector('.select-container').selectedIndex;
        Tools.changeProgressValue(event.target.value, index);
    });
}

function progressBarValueChange() {
    readData('http://pb-api.herokuapp.com/bars').then((data) => {
        const progressContainer = document.querySelector('.progress-container'),
            buttonGroup = document.querySelector('.btn-group'),
            selectContainer = document.querySelector('.select-container');
        const response = JSON.parse(data);
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


