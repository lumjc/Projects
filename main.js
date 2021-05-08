let MEDIASTACK_API_KEY = "4e5e19d619749ae048eb17688fea40ce";

function getNews(category) {
  let url = "http://api.mediastack.com/v1/news?access_key=" + MEDIASTACK_API_KEY + "&languages=en&countries=au,us,de,kr,sg&limit=20";
  if (category == "Business") {
    url += "&categories=business";
  }

  if (category == "Health") {
    url += "&categories=health";
  }

  if (category == 'Entertainment'){
    url += "&categories=entertainment"
  }

  console.log(url);

  $.ajax({
    url: url,
    method: 'GET',
    access_key: MEDIASTACK_API_KEY,
    success: function(d){
        let articles = d.data
        console.log(articles)
        articles.forEach(function(article) {
          let singlePost = $(`
            <div class="card">
		<img src="${article.image}" alt="" class="card-img-top">
		<div class="card-body">
		  <h5 class="card-title">${article.title}</h5>
		  <p class="card-text">${article.description}</p>
		 <a href="${article.url}" class="btn btn-outline-success btn-sm">Read More</a>
		</div>
	   </div>
          `);
          // if(article.image != null) {
            return $("#latest > div").append(singlePost);
          // }
        })
    }
  })
}

$(document).ready(function(){
  // for news section
  // $.ajax({
  //   url: "http://api.mediastack.com/v1/news?access_key=" + MEDIASTACK_API_KEY + "&languages=en&countries=au,us,de,kr,sg&limit=20",
  //   method: 'GET',
  //   access_key: MEDIASTACK_API_KEY,
  //   success: function(d){
  //       let articles = d.data

  //       articles.forEach(function(article) {
  //         let singlePost = $(`
  //           <div class="card">
	// 	<img src="${article.image}" alt="" class="card-img-top">
	// 	<div class="card-body">
	// 	  <h5 class="card-title">${article.title}</h5>
	// 	  <p class="card-text">${article.description}</p>
	// 	 <a href="${article.url}" class="btn btn-outline-success btn-sm">Read More</a>
	// 	</div>
	//    </div>
  //         `);
  //         if(article.image != null) {
  //           return $("#latest > div").append(singlePost);
  //         }
  //       })
  //   }
  // })


  // Search Bar
  let searchBtn = $('#search-btn')
  let inputBar = $('#inputbar')
  searchBtn.click(function(e){
    let searchText = inputBar.val()
    $.ajax({
      url: `http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_API_KEY}&keywords=${searchText}&limit=100`,
      method: 'GET',
      access_key: MEDIASTACK_API_KEY,
      success: function(f){
        $("#latest > div").empty();
        let search = f.data
        search.forEach(function(searches){
          let singlePost = $(`
          <div class="card">
          <img src="${searches.image}" alt="" class="card-img-top">
          <div class="card-body">
          <h5 class="card-title">${searches.title}</h5>
          <p class="card-text">${searches.description}</p>
          <a href="${searches.url}" class="btn btn-outline-success btn-sm">Read More</a>
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
  url: "http://api.mediastack.com/v1/news?access_key=" + MEDIASTACK_API_KEY + "&languages=en&sort=popularity&limit=10&source=CNN Europe",
  method: 'GET',
  access_key: MEDIASTACK_API_KEY,
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

// Carousel Page
$.ajax({
  url: "http://api.mediastack.com/v1/news?access_key=" + MEDIASTACK_API_KEY + "&languages=en&countries=au,us,de,kr,sg&limit=20",
  method: 'GET',
  access_key: MEDIASTACK_API_KEY,
  success: function(c){ 
    $("#carouselExampleControls").carousel('dispose');
    console.log(c)
    let carousels = c.data
    carousels.forEach(function(carousel, index){
      let carou;
      if (index == 0) {
        carou = $(`<div class="carousel-item active">
        <div class="d-flex justify-content-center">
        <img class=carou_img class="d-block w-100" src="${carousel.image}" alt="Second slide">
        </div>
        </div>`)
      } else {
        carou = $(`<div class="carousel-item">
        <div class="d-flex justify-content-center">
        <img class=carou_img class="d-block w-100" src="${carousel.image}" alt="Second slide">
        </div>
        </div>`)
      }
      // console.log(carou);
      if(checkIfImageURL(carousel.image)) {
        $('.carousel-inner').append(carou)
      }
    })
    $("#carouselExampleControls").carousel(0);
  }
})

// Surprise Me
  let randBtn = $('#random-btn')
  randBtn.click(function(d){
    var random_cat = ["general", "business", "entertainment", "health", "science", "sports", "technology"]
    const random = Math.floor(Math.random() * random_cat.length);

    $.ajax({
      url: `http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_API_KEY}&categories=${random_cat[random]}&limit=1&languages=en`,
      method: 'GET',
      access_key: MEDIASTACK_API_KEY,
      success: function(f){
        window.location.href = f.data[0].url
      }
    })
  })

 // Activate Carousel
$("#myCarousel").carousel();

// Enable Carousel Indicators
$(".item").click(function(){
  $("#myCarousel").carousel(1);
});

// Enable Carousel Controls
$(".left").click(function(){
  $("#myCarousel").carousel("prev");
});

function checkIfImageURL(url) {
  if (url == null) return false;
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}