$(document).ready(function() {
    // slick carousel
    $('.testiomonials__list').slick({
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide : true,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover : false,
      prevArrow : document.getElementById('testimoniPrev'),
      nextArrow : document.getElementById('testimoniNext'),
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        }
    ]
    });
  });

$('.feature--details__slides_list').slick({
slidesToShow: 1,
slidesToScroll: 1,
arrows: false,
fade: true,
asNavFor: '.feature--slide_nav'
});

if(window.innerWidth >= 1000){
    $('.feature--slide_nav').slick({
        slidesToShow: 11,
        vertical: true,
        slidesToScroll: 1,
        asNavFor: '.feature--details__slides_list',
        dots: false,
        centerMode: true,
        focusOnSelect: true
        });
}else{
    $('.feature--slide_nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.feature--details__slides_list',
        dots: false,
        // centerMode: true,
        focusOnSelect: true,
        swipeToSlide : true,
        infinite : true,
        });
}




$(window).on('load', (e)=>{
    console.log('e : ', e);
    if(window.innerWidth <= 1000){
        $('.clients_section--list').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            swipeToSlide : true,
            autoplay: true,
            autoplaySpeed: 1200,
            });
    }
})




if(window.innerWidth > 768){
    document.getElementById('dropdown').style.display = 'none';
    window.addEventListener('scroll',(e)=>{
    let navBar = document.getElementById('navBar');
    console.log(navBar)
    console.log(window.scrollY)
    if(window.scrollY > 150){
        navBar.style.padding = '15px var(--left-right-padding)';
        navBar.classList.add('nav__bar--after');
    }else{
        navBar.style.padding = '39px var(--left-right-padding)';
        navBar.classList.remove('nav__bar--after');
    }

    let dPattern = document.getElementById('dottedPattern');
    dPattern.style.transform = `translateX(40%) rotate(${window.scrollY * 0.1}deg)`

})
}else{
    let dropdownTgl = document.getElementById('dropToggle');
    let dropdown = document.getElementById('dropdown');
    dropdown.style.display = 'block';
    dropdownTgl.style.display = 'block';
    dropdownTgl.addEventListener('click', ()=>{
        console.log(dropdown.style.transform);
        dropdown.style.transform = dropdown.style.transform === 'translateY(-100%)' ? 'translateY(0)' : 'translateY(-100%)';
    })

}

// Detailed Feature Carousal

const featureList = document.getElementsByClassName('feature--name');
console.log(featureList.length);
console.log(featureList);

for(i=0;i<featureList.length;i++){
    let feature = featureList.item(i);
    // console.log('Feature :', feature);
    feature.addEventListener('click',(e)=>{changeFeatureView(e.target)})
}

function changeFeatureView(featureElement){
    console.log(featureElement);
    document.querySelector('.feature--active').classList.remove('feature--active');
    featureElement.classList.add('feature--active');
}

//Runtime Start Rating 
const starRatings = document.getElementsByClassName('5stars');
for(i=0;i<starRatings.length;i++){
    let item = starRatings.item(i);
    let ratingList = ['☆','☆','☆','☆','☆']
    let rating = item.dataset.rating;
    console.log('Item Rating : ', rating);
    while(rating){
        ratingList[rating - 1] = '★';
        console.log('In While Rating : ', ratingList);
        rating -= 1;
    }
    console.log("Final Rating: ", ratingList.join(""));
    item.innerHTML = ratingList.join("");

}

window.addEventListener('resize', ()=>{
    console.log(window.innerWidth);
})

