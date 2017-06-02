$(document).ready(function(){

var selectReset = [];
(function(){
    var $select = $(".filter .chosen-select").selectize();
    for (var i = 0; i < $select.length; i++) {
        selectReset.push($select[i].selectize);
    }
})();

var src;
$(".head-3-tabs li").not(".active").hover(function(){
	src = $(this).find("img").attr("src");
	var format = src.slice(-4);
	var path = src.slice(0,-4);
	$(this).find("img").attr("src", path + "-act" + format);
}, function(){
	$(this).find("img").attr("src", src);
});


/*DROPDOWN TOGGLE*/
$(".filter-reset a").click(function(e){
    e.preventDefault();
    $("form.filter")[0].reset();
    for (var i = 0; i < selectReset.length; i++) {
        selectReset[i].clear();
    }
});

$(window).click(function(e){
    var target = $(e.target);
    if (target.parents(".filter-checkbox .dropdown-menu").length) {
        return;
    }
    $(".dropdown-toggle").siblings(".dropdown-menu").hide();
    $(".dropdown-toggle").removeClass("active");
    if($(e.target).hasClass("dropdown-toggle")){
        $(e.target).siblings(".dropdown-menu").show();
        $(e.target).addClass("active");
    };
});




//OBJECT_PAGE THUMBS
$(".o-thumbs-wrap li").click(function(e){
    e.preventDefault();
    if ($(this).hasClass("active")) return;

    $(".o-thumbs-wrap li").removeClass("active");
    $(this).addClass("active");
    var link = $(this).children("img").attr("src");
    $("#o-prime-img").hide();
        $("#o-prime-img").attr("src", link);
        $("#o-prime-img").attr("href", link);
        $("#o-prime-img").fadeIn(400);
});



//POPUP
var p = $('#apply-popup');
$(".req-btn").click(function(e){
    e.preventDefault();
    p.fadeIn();
});
$(".popup-close").click(function(e) {
    e.preventDefault();
    p.fadeOut();
    $(".popup-form")[0].reset();
});



/*ABOUT SIDEBAR*/
$(".a-sidebar .sidebar-social li a").click(function(e){
    e.preventDefault();
    var dest = $(this).attr("data-tab");
    $(".a-sidebar .social-cont img").hide();
    $(".a-sidebar .social-cont img[data-dest=" + dest + "]").show();
    $(".a-sidebar .sidebar-social ul").removeClass().addClass("visible-" + dest);
});


/*ABOUT TABS*/
$(".a-tab").hide();
$(".a-tab[data-dest=a-tab-1]").show();
$(".a-navbar li a").click(function(e){
    e.preventDefault();
    $(".a-navbar li").removeClass("active");
    $(this).parent().addClass("active");
    var dest = $(this).attr("data-tab");
    $(".a-tab").hide();
    $(".a-tab[data-dest=" + dest).fadeIn();
});

/*masked input*/
$("#popup-mask").mask("+7 (999) 999-99-99");



/*OBJ SWITCH*/
$(".obj-switch a").click(function(e){
    e.preventDefault();
    $(".obj-switch a").removeClass("active");
    $(this).addClass("active");
    var a = $(this).attr("data-cat-tab");
    $(".obj-switchable-tab").hide();
    $(".obj-switchable-tab[data-cat-dest=" + a + "]").fadeIn();
});


/*OBJ SLICK*/
$(".object-item .slick-dots li button").click(function(e){
    e.preventDefault();

})

//!FIX START
        $(".object-item .img-wrap").on("init", function(){
            $(".object-item .slick-dots").each(function(){
                $(this).mousemove(function(event) {
                    var offset = $(this).offset();
                    var xPos = event.pageX- offset.left;
                    var quant = $(this).children().length;
                    var width = 270;

                    var index = Math.floor(xPos/width*quant);
                    $(this).parents('.slick-slider').slick('goTo', index);
                });

            });
        });
        $(".object-item .img-wrap").each(function(){
            if ($(this).children().length > 1) {
                $(this).slick({
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                    initialSlide: 2,
                    autoplay: false,
                    speed: 0
                });
            }
        });
        
/*!FIX END*/

});