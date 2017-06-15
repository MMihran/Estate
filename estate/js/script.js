$(document).ready(function(){

var jqxhr;
var cityArr = [];
var citySelectizeStart = [];
$("select.chosen-select.select-more").children("option").each(function(){
    citySelectizeStart.push($(this).val());
});

function showMore(event){ 
    var counter = 0;
    var addCity = "";
    $('body').on('click', '.show-more-btn', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $.ajaxSetup({
          cache:false
        });
        jqxhr = $.getJSON("city.json", function(data){
        for(var i=0;i<data.length;i++){
            cityArr[i] = "<li>" + data[i] + "</li>";
        }
        }).done(function() {
            var str = [].join.call(cityArr, " ");
            $(".city-box").html(cityArr);
            $("#city-box").fadeIn();
            $(".city-box li").click(function(e){  
                if (counter && $.inArray(addCity, citySelectizeStart) == -1) {
                    console.log("NOT FOUND " + addCity + " in " + citySelectizeStart);
                    $select[0].selectize.removeOption(addCity);
                    $select[0].selectize.refreshItems();
                }
                counter = 1;
                addCity = $(this).text();
                $select[0].selectize.addOption({value: addCity, text: addCity});
                $select[0].selectize.addItem(addCity);
                $("#city-box").fadeOut();
            });
        });

    });
}



var selectReset = [];
var $select = $(".filter .chosen-select").selectize({
    persist: false,
    onInitialize: function(){
        if($(this.$dropdown[0]).hasClass("select-more")){
            $(".select-more.selectize-dropdown").append("<div class='show-more-btn'>Выбрать другой...</div>");
        }
    }
});
showMore();

for (var i = 0; i < $select.length; i++) {
    selectReset.push($select[i].selectize);
}






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
    var link = $(this).find("img").attr("src");
    $("#o-prime-img").hide();
        $("#o-prime-img").attr("src", link);
        $("#o-prime-img").attr("href", link);
        $("#o-prime-img").fadeIn(400);
});

$('#o-prime-img').click(function(e){
    e.preventDefault();
    var id;
    var arrCheck = $(".o-thumbs-wrap li");
    for (var i = 0; i < arrCheck.length; i++) {
        if($(arrCheck[i]).hasClass("active")) {
            id = i;
            break; 
        }
    }
    $(".o-thumbs-wrap").magnificPopup("open", id);

});

//POPUP
var p = $('#apply-popup');
$(".req-btn").click(function(e){
    e.preventDefault();
    p.fadeIn();
});
$(".popup-close").click(function(e) {
    e.preventDefault();
    $(".b-popup").fadeOut();
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