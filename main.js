$(document).ready(function(){
  // for news section
  $.ajax({
    url: "http://api.mediastack.com/v1/news?access_key=f6c727eec0d645dc78467fd0a06eaa71&languages=en&countries=au,us,de,kr,sg&limit=30",
    method: 'GET',
    access_key: "f6c727eec0d645dc78467fd0a06eaa71",
    success: function(d){
        let articles = d.data

        articles.forEach(function(article) {
          let singlePost = $(`
            <div class="col-lg-6">
                <div class="single_post post_type3 mb30">
                  <div class="post_img">
                      <img class= "article_img" src="${article.image}"alt="">
                  </div>
                  <a href="${article.url}"></a>
                  <div class="single_post_text">
                    <div class="meta3">	<a href="${article.url}">${article.title}</a>
                    </div>
                    <div class="space-10"></div>
                    <p class="post-p">${article.description}</p>
                  </div>
                </div>
              </div>
          `);
          if(article.image != null) {
            return $("#latest > div").append(singlePost);
          }
        })
    }
  })


  // Search Bar
  let searchBtn = $('#search-btn')
  let inputBar = $('#inputbar')
  searchBtn.click(function(e){
    let searchText = inputBar.val()
    $.ajax({
      url: `http://api.mediastack.com/v1/news?access_key=f6c727eec0d645dc78467fd0a06eaa71&keywords=${searchText}&limit=10`,
      method: 'GET',
      access_key: "f6c727eec0d645dc78467fd0a06eaa71",
      success: function(f){
        $("#latest > div").empty();
        // searchText.
        let search = f.data
        search.forEach(function(searches){
          // console.log(searches)
          let singlePost = $(`
            <div class="col-lg-6">
                <div class="single_post post_type3 mb30">
                  <div class="post_img">
                      <img class= "article_img" src="${searches.image}"alt="">
                  </div>
                  <a href="${searches.url}"></a>
                  <div class="single_post_text">
                    <div class="meta3">	<a href="${searches.url}">${searches.title}</a>
                    </div>
                    <div class="space-10"></div>
                    <p class="post-p">${searches.description}</p>
                  </div>
                </div>
              </div>
          `);
          if(searches.image != null) {
            return $("#latest > div").append(singlePost);
          }
        })
          
          
      }
    })
  })
   
  

// Popular Article
$.ajax({
  url: "http://api.mediastack.com/v1/news?access_key=f6c727eec0d645dc78467fd0a06eaa71&languages=en&sort=popularity&limit=10&source=CNN Europe",
  method: 'GET',
  access_key: "f6c727eec0d645dc78467fd0a06eaa71",
  success: function(p){
    console.log(p)
    let popWidgets = p.data
    popWidgets.forEach(function(popWidget){
      if(popWidget.image != null){
        let widgetPost = $(`<div class="post_img">
        <div class="img_wrap">
          <a href="#">
            <img class="widget_image" src="${popWidget.image}" alt="">
          </a>
        </div>
      </div>
      <div class="single_post_text">
        <div class="meta2 meta_separator1">	<a href="#">${popWidget.title}</a>
        </div>
        <h4><a href="${popWidget.url}">${popWidget.description}</a></h4>
      </div>`)
      console.log(popWidget.title)
      console.log(popWidget.image)
      return $(".tab-content-widget > div").append(widgetPost);
    }
     })
    }
  })
})

// Carousel Page
$.ajax({
  url: "http://api.mediastack.com/v1/news?access_key=f6c727eec0d645dc78467fd0a06eaa71&languages=en&sort=popularity&limit=30&source=CNN Europe",
  method: 'GET',
  access_key: "f6c727eec0d645dc78467fd0a06eaa71",
  success: function(c){
    let carousels = c.data
    // console.log(c)
    carousels.forEach(function(carousel){
    $('.carousel_img').attr('src',`${carousel.image}`)
    })
  }
})

// Surprise Me
  let randBtn = $('#random-btn')
  randBtn.click(function(d){
    var random_cat = ["general", "business", "entertainment", "health", "science", "sports", "technology"]
    const random = Math.floor(Math.random() * random_cat.length);

    $.ajax({
      url: `http://api.mediastack.com/v1/news?access_key=f6c727eec0d645dc78467fd0a06eaa71&categories=${random_cat[random]}&limit=1&languages=en`,
      method: 'GET',
      access_key: "f6c727eec0d645dc78467fd0a06eaa71",
      success: function(f){
        console.log(f.data[0])
        window.location.replace(f.data[0].url)
      }
    })
  })