/*
 * @Author: Jing
 * @Date:   2016-06-26 23:06:58
 */

'use strict';
$(function() {
    var isSmall = 768;
    var windowWidth;
    var slideBox = $('#slide_home .carousel-inner div');
    $(window).on('resize', function() {
        windowWidth = $(window).width();
        if (windowWidth < isSmall) {
            slideBox.each(function(i, e) {
                var imageSrc = $(this).data('image-small');
                // console.log(imageSrc);
                // $(this).css("background-image", "url(" + imageSrc + ")");
                //如果是小图就直接设置图片标签更清楚一些也能自动适应
                $(this).html('<img src=' + imageSrc + ' alt="" />');
            });
        } else {
            //大屏幕设置大图
            slideBox.each(function(i, e) {
                // 设置大图
                var imageSrc = $(this).data('image-large');
                // console.log(imageSrc);
                $(this).css("background-image", "url(" + imageSrc + ")");
                $(this).html("");
            });
        }
    }).trigger('resize');
    var startX = 0; //滑动开始的位置
    var moveX = 0; //滑动结束的位置
    var slideHome = document.querySelector('#slide_home');
    var bufferX = 50; //缓冲区距离
    var isMove = false;
    slideHome.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;

    });
    slideHome.addEventListener('touchmove', function(e) {
        moveX = e.touches[0].clientX;
        isMove = true;
    });
    slideHome.addEventListener('touchend', function(e) {
        console.log((moveX - startX));
        // if (moveX - startX < 0) {
        //     //切换到下一张
        //     //怎么切换到上一张下一张呢
        //     //我们是不是可以调用一下官方提示的方法
        //     $('#slide_home .carousel').carousel('next');
        // } else if (moveX - startX > 0) {
        //     //切换到上一张
        //     $('#slide_home .carousel').carousel('prev');
        // }
        if (Math.abs(moveX - startX) > bufferX && isMove) {
            if (moveX - startX < 0) {
                $('#slide_home .carousel').carousel('next');
            } else if (moveX - startX > 0) {
                //切换到上一张
                $('#slide_home .carousel').carousel('prev');
            }
        }
    });
    if (windowWidth < isSmall) {
        //获取产品推荐下的ul里面的所有Li
        var lis = $('.ul-wapper .nav-tabs li');
        var ulWidth = 20;
        lis.each(function(index, el) {
            ulWidth += $(this).width();
        });
        //给ul设置宽度
        $('.ul-wapper .nav-tabs').css('width', ulWidth);
    }

    $('[data-toggle="tooltip"]').tooltip();
});
