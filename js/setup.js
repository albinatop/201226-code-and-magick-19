'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards[i] = {
    name: generateWizardName(),
    coatColor: generateCoatColor(),
    eyesColor: generateEyesColor()
  };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateWizardName() {
  return WIZARD_NAMES[getRandomInt(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(WIZARD_SURNAMES.length - 1)];
}

function generateCoatColor() {
  return COAT_COLORS[getRandomInt(COAT_COLORS.length - 1)];
}

function generateEyesColor() {
  return EYES_COLORS[getRandomInt(EYES_COLORS.length - 1)];
}

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
