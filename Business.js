$(document).ready(function(){
    // for news section
    $.ajax({
      url: "http://api.mediastack.com/v1/news?access_key=9324c3707e865e16a6dcb0a91d2dfdd2&languages=en&categories=business&limit=10",
      method: 'GET',
      access_key: "9324c3707e865e16a6dcb0a91d2dfdd2",
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
              return $("#latest > div").append(singlePost);
          })
      }
    })
  
  
    Search Bar
    let searchBtn = $('#search-btn')
    let inputBar = $('#inputbar')
    searchBtn.click(function(e){
      let searchText = inputBar.val()
      $.ajax({
        url: `http://api.mediastack.com/v1/news?access_key=9324c3707e865e16a6dcb0a91d2dfdd2&keywords=${searchText}&limit=1000`,
        method: 'GET',
        access_key: "9324c3707e865e16a6dcb0a91d2dfdd2",
        success: function(f){
          $("#latest > div").empty();
          let search = f.data
          search.forEach(function(searches){
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
              $("#latest > div").append(singlePost);
            }
          })
            
            
        }
      })
    })
     
    
  
  // Popular Article
  $.ajax({
    url: "http://api.mediastack.com/v1/news?access_key=9324c3707e865e16a6dcb0a91d2dfdd2&languages=en&sort=popularity&limit=10&source=CNN Europe",
    method: 'GET',
    access_key: "9324c3707e865e16a6dcb0a91d2dfdd2",
    success: function(p){
      let popWidgets = p.data
      popWidgets.forEach(function(popWidget){
        if(popWidget.image != null){
          let widgetPost = $(`<div class="single_post widgets_small">
          <div class="post_img">
            <div class="img_wrap">
              <a href="${popWidget.url}">
              <img class="widget_image" src="${popWidget.image}" alt="">
              </a>
            </div>
            </div>
            <div class="single_post_text">
            <div class="meta2 meta_separator1">${popWidget.title}<a href="${popWidget.url}"></a>
            </div>
            <h4><a href="${popWidget.url}"></a></h4>
            </div>
        </div>`)
         $(".tab-content-widget > div").append(widgetPost);
      }
       })
      }
    })
  })
  
  
  // Surprise Me
    let randBtn = $('#random-btn')
    randBtn.click(function(d){
      var random_cat = ["general", "business", "entertainment", "health", "science", "sports", "technology"]
      const random = Math.floor(Math.random() * random_cat.length);
  
      $.ajax({
        url: `http://api.mediastack.com/v1/news?access_key=9324c3707e865e16a6dcb0a91d2dfdd2&categories=${random_cat[random]}&limit=1&languages=en`,
        method: 'GET',
        access_key: "9324c3707e865e16a6dcb0a91d2dfdd2",
        success: function(f){
          window.location.href = f.data[0].url
        }
      })
    })