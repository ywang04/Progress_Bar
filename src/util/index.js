export function generateProgressBars(data, targetElement) {
  let barUsage = '',
    progressBar = '';
  data.bars.forEach((element, index) => {
    barUsage = Math.floor(element * 100 / data.limit) + '%';
    progressBar = `<div class="progress" style="height:50px">
                      <div class="progress-bar progress-bar-info" data-limit="${data.limit}" data-current="${element}" style="width:${barUsage};height:50px">
                      <span class="progress-value" id="id-progress-${index}">${barUsage}</span>
                      </div>
                  </div>`;
    targetElement.insertAdjacentHTML('beforeend', progressBar);
  });
}

export function generateButtons(data, targetElement) {
  let button = '';
  data.buttons.forEach((element) => {
    button = `<button type="button" class="btn btn-info btn-space" value='${element}'>${element}</button>`;
    targetElement.insertAdjacentHTML('beforeend', button);
  });
}

export function generateDropDown(data, targetElement) {
  let option = ''
  data.bars.forEach((element, index) => {
    option = `<option value=${index}>#progress${index + 1}</option>`;
    targetElement.insertAdjacentHTML('beforeend', option);
  });
}

export function toggleClass(targetElement, oldClass, newClass) {
  if (targetElement.classList.contains(oldClass)) {
    targetElement.classList.replace(oldClass, newClass);
  }
}

export function changeProgressValue(buttonValue, index) {
  const progressSpan = document.getElementById(`id-progress-${index}`);
  const progressBar = progressSpan.parentNode;
  const limit = parseInt(progressBar.dataset.limit);
  const current = parseInt(progressBar.dataset.current);
  let newCurrent = current + parseInt(buttonValue);
  progressBar.dataset.current = newCurrent;
  const usage = Math.floor(newCurrent * 100 / limit);
  if (usage > 100) {
    toggleClass(progressBar, 'progress-bar-info', 'progress-bar-danger');
    progressBar.style.width = `${usage}%`;
    progressSpan.innerHTML = usage + '%';
  } else if (usage >= 0) {
    toggleClass(progressBar, 'progress-bar-danger', 'progress-bar-info');
    progressBar.style.width = `${usage}%`;
    progressSpan.innerHTML = usage + '%';
  } else {
    progressBar.style.width = '0%';
    progressSpan.innerHTML = '0%';
  }
}