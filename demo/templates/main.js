define(["jquery", "components/weather/weather"], function($, weather) {

  // get the location
  navigator.geolocation.getCurrentPosition(function(locale) {

    var position = [locale.coords.latitude, locale.coords.longitude];

    weather(position, function(err, result) {
      $('#temp').html(result.condition.temp + 'º');
      $('#status').html(result.condition.symbols.join(''))
        .prop('className', result.condition.symbolLevel);

      $('#statusText').html(result.condition.text.toLowerCase());
      $('#time').html(result.title);
    });

  }, function(error) {
    alert(error.message);
  });

});
