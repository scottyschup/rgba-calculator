(function () {
  function actualColor (num) {
    var rgbaFore = getValues(num), actualBack;
    if (rgbaFore[3] === 1) { return rgbaFore.slice(0, 3); }
    actualBack = num >= 2 ? actualColor(num - 1) : [255, 255, 255];
    return merge(rgbaFore, actualBack);
  }

  function adjustContrast (rgba, container, num) {
    if (isDarkColor(rgba)) {
      $(container).css('color', 'white');
      $('#actual' + num).css('border-color', 'white');
    } else {
      $(container).css('color', 'black');
      $('#actual' + num).css('border-color', 'black');
    }
  }

  function getValues (num) {
    var red, green, blue, alpha;
    red = $('#r' + num)[0].value;
    green = $('#g' + num)[0].value;
    blue = $('#b' + num)[0].value;
    alpha = $('#a' + num)[0].value;
    return [+red, +green, +blue, +alpha];
  }

  function hasAlpha (color) {
    return color.length == 4;
  }

  function isDarkColor (rgba) {
    if (rgba.length < 4) { rgba.push(1.0); }
    var val = (765 - (rgba[0] + rgba[1] + rgba[2])) * rgba[3];
    return val > 382;
  }

  function merge (rgbaFore, rgbBack) {
    var actualR,
        actualG,
        actualB,
        alpha = hasAlpha(rgbaFore) ? rgbaFore[3] : 1;
    actualR = rgbaFore[0] + (rgbBack[0] - rgbaFore[0]) * (1 - alpha);
    actualG = rgbaFore[1] + (rgbBack[1] - rgbaFore[1]) * (1 - alpha);
    actualB = rgbaFore[2] + (rgbBack[2] - rgbaFore[2]) * (1 - alpha);
    return [actualR, actualG, actualB].map(Math.round);
  }

  function updateAllValues (e) {
    $('.update').trigger('click');
  }

  function updateValues (e) {
    console.debug(e.currentTarget)
    var rgba,
        actual,
        container = e.currentTarget.parentElement,
        num = +e.currentTarget.name;

    rgba = getValues(num);
    actual = actualColor(num);
    $(container).css('background-color', `rgba(${rgba})`);
    $('#actual' + num).css('background-color', `rgb(${actual})`);
    $($('#actual' + num + '-text')[0]).html(actual.join(', '));

    adjustContrast(actual, container, num);
    while (num < 3) {
      console.log(num)
      num ++;
      $('#' + num + ' > .update').trigger('click');
    }
  }

  $('.update').click(updateValues);
  $('.update-all').click(updateAllValues);
  $('.update-all').trigger('click');
})();
