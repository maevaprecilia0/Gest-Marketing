


$(document).ready(function(){
    $(".gest-mark").hide();
    $(".banner").show();
    $(".description").show();
    $(".functionalities").show();
    $(".sous-fonct1").hide();
    $(".sous-fonct2").hide();
    $(".sous-fonct3").hide();
    $(".sous-fonct4").hide();



    $(".btn").click(function(){
        $(".gest-mark").show();
        $(".banner").hide();
        $(".description").hide();
        $(".functionalities").hide();
    });


    $(".home").click(function(){
        $(".gest-mark").hide();
        $(".banner").show();
        $(".description").show();
        $(".functionalities").show();
        });
});