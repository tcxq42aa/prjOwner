/**
 * Created by charles on 16/2/29.
 */
$(function() {

    PageSlider.case({
        callback: {
            1: function(){
                $('footer .sub-title').text('随时随地掌握房屋销售状态');
                $('.action-down').show();
            },
            2: function(){
                $('footer .sub-title').text('体验VIP反馈渠道');
                $('.action-down').hide();
            },
            3: function(){
                $('footer .sub-title').text('全面推广, 体现优势');
                $('.action-down').hide();
            }
        }
    });

    $('.action-down').addClass('active');

    $('.feedback-content').css('maxHeight', $('body').height() * 7 / 9);

    $('.star').off('click').on('click', function(e){
        $('.star').removeClass('selected');
        var index = $(this).index();
        $('.star').each(function(i, ele){
            if(i <= index) {
                $(ele).addClass('selected');
            }
        });
        $('.feedback-container .footer').show();

        if(index < 4) {
            $('.module').show();
        } else {
            $('.module').hide();
        }
    });

    $('.btn-feedback').on('click', function(e){
        showFeedback();
        e.preventDefault();
    });

    $('.btn-close,.feedback-layer').on('click', function(e){
        hideFeedback();
        e.preventDefault();
    });

    $('.module ul').on('click', 'li',  function(e){
        $(this).toggleClass('selected');
        if($('.module ul li.selected').length > 0) {
            $('.btn-submit').removeClass('disabled');
        } else {
            $('.btn-submit').addClass('disabled');
        }
    });

    $('.input-add input').on('click', function(e){
        var $module = $(this).closest('.module');
        $('.input-add', $module).css('opacity', 1);
        $('.btn-add', $module).css('opacity', 0);
    });

    $('.input-add .btn').on('click', function(){
        var $module = $(this).closest('.module');
        var $input = $('.input-add input', $module);
        var $list = $('ul', $module);
        if($input.val()) {
            $list.append('<li class="selected">' + $input.val() + '</li>');
            $input.val('');
            $('.input-add', $module).css('opacity', 0);
            $('.btn-add', $module).css('opacity', 1);
            $('.btn-submit').removeClass('disabled');
        }
    });

    $('.btn-submit').on('click', function(){
        if($(this).is('.disabled')) {
            return;
        }
        var startCount = $('.star.selected').length;
        var tips = [];
        $('.module ul li.selected').each(function(i, ele){
            tips.push($(ele).text());
        });

        //todo 接口调用
        console.log(startCount, tips);
        hideFeedback(true);
    });


    function showFeedback() {
        $('.feedback-layer').show();
        $('.feedback-container').addClass('active');
    }

    var timer;
    function hideFeedback(success) {
        if(timer){
            clearTimeout(timer);
        }
        if(success) {
            $('.feedback-success').show();
            timer = setTimeout(function(){
                $('.feedback-layer,.feedback-success').hide();
            }, 5000)
        } else {
            $('.feedback-layer,.feedback-success').hide();
        }
        $('.feedback-container').removeClass('active');
    }

});