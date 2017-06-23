$(function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        observer:true,
        observeParents:true,
        loop: true,
        speed: 500,
        autoplayDisableOnInteraction : false,
        autoplay : 2000
    });
})