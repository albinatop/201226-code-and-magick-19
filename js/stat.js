'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 50;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getNameShiftX = function (i) {
  return CLOUD_X + GAP + (GAP + TEXT_WIDTH) * i;
};

var getNameShiftY = function () {
  return CLOUD_Y + GAP + 200;
};

var getBarHeight = function (currentTime, maxTime) {
  return Math.round(BAR_HEIGHT * currentTime / maxTime);
};

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getBarColour = function (name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }
  return 'hsl(' + getRandomNumber(220, 250) + ', ' + getRandomNumber(10, 100) + '%, 70%)';
};

var renderGreetingText = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + 30, CLOUD_Y + 30);
  ctx.fillText('Список результатов: ', CLOUD_X + 30, CLOUD_Y + 50);
};

var renderPlayerName = function (ctx, name, i) {
  ctx.fillStyle = '#000';
  ctx.fillText(name, getNameShiftX(i), getNameShiftY());
};

var renderPlayerTime = function (ctx, playerTime, maxTime, i) {
  ctx.fillText(
      Math.round(playerTime), getNameShiftX(i), (CLOUD_Y + GAP + 30) + (BAR_HEIGHT - getBarHeight(playerTime, maxTime)) - 10
  );
};

var renderPlayerBar = function (ctx, playerName, playerTime, maxTime, i) {
  ctx.fillStyle = getBarColour(playerName);
  ctx.fillRect(
      getNameShiftX(i),
      (CLOUD_Y + GAP + 30) + (BAR_HEIGHT - getBarHeight(playerTime, maxTime)),
      TEXT_WIDTH,
      getBarHeight(playerTime, maxTime)
  );
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0, 7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderGreetingText(ctx);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    renderPlayerName(ctx, names[i], i);
    renderPlayerTime(ctx, times[i], maxTime, i);

    renderPlayerBar(ctx, names[i], times[i], maxTime, i);

    // вернём изначальный цвет теневого облака
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  }

};
