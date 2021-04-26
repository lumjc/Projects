$(document).ready(function(){
    var settings = {
        "url": "http://api.mediastack.com/v1/news?access_key=f6c727eec0d645dc78467fd0a06eaa71&languages=en&countries=us",
        "method": "GET",
        "headers": {
        "Origin": "https://google.com",
          "access_key": "f6c727eec0d645dc78467fd0a06eaa71",
        },
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
})
