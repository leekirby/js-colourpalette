// Requires jQuery

function getColours() {

  var regexHex = /#/gi;
  // var regexRgba = /rgb/gi;

  var result;
  var indices = [];
  var cssFile = $('link')[0].href;

  $.when($.get(cssFile))
    .done(function(response) {

      var pageCSS = response;

      while((result = regexHex.exec(pageCSS)) ) {
        var string = pageCSS.substr(result.index, 7);
        if(jQuery.inArray(string, indices) === -1) {
          indices.push(string);  
        }
      }


      indices.sort();

      // while ( (result = regexRgba.exec(pageCSS)) ) {
      //   var string = pageCSS.substr(result.index, 25);

      //   if(jQuery.inArray(string, indices) === -1) {
      //     indices.push(string);  
      //   }

      // }
      
      var bodyPadding = $("body").css('padding-bottom');
      bodyPadding = parseInt(bodyPadding);

      $("body").append("<div class=\"devcom-pallete\"></div>");
      $('body').css('padding-bottom', bodyPadding + 70);

      $('.devcom-pallete').css({
        position: 'fixed',
        bottom: 0,
        height: '90px',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '10px',
        textAlign: 'center'
      });

      $('.devcom-pallete').append('<div class="devcom-pallete-items"></div>');


      $.each( indices, function( key, value ) {
        $('.devcom-pallete-items').append('<div class="devcom-pallete-item" style="background-color:' + value + '" title="' + value + '"></div>');
      });

      $('.devcom-pallete-item').css({
        border: '1px solid #808080',
        margin: '0 5px 0 5px',
        display: 'inline-block',
        width: '40px',
        height: '40px',
        cursor: 'pointer'
      });


      $('.devcom-pallete').append('<div class="devcom-pallete-colour"></div>');

      $('.devcom-pallete-colour').css({
        margin: '0 5px 0 5px',
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '12px'
      });

      $('.devcom-pallete-colour').html('Select a colour');

      $('.devcom-pallete-item').click(function() {

        var colorRgb = $(this).css('background-color');
        var colorHex = colorToHex(colorRgb);

        $('.devcom-pallete-colour').html('RGB: ' + colorRgb + ' / HEX: ' + colorHex);

      });

    });

 }

  function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
  };

