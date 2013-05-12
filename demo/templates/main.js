define(["jquery", "components/yahooWeather/dist/yahooWeather"], function($, yahooWeather) {

  // get the location
  navigator.geolocation.getCurrentPosition(function(locale) {

    var position = [locale.coords.latitude, locale.coords.longitude];

    yahooWeather(position, function(err, weather) {
      $('#temp').html(weather.condition.temp + 'º');
      $('#status').html(weather.condition.symbols.join(''))
        .prop('className', weather.condition.symbolLevel);

      $('#statusText').html(weather.condition.text.toLowerCase());
      $('#time').html(weather.title);
    });

  }, function(error) {
    alert(error.message);
  });

});
