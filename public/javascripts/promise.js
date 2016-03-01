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
        $('.feedback-container .btn-submit').removeClass('disabled');

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
        $(this).toggleClass('selected')
    });

    $('.btn-add').on('click', function(e){
        $(this).closest('.module').find('.input-add').show();
        $(this).hide();
        e.preventDefault();
    });
    $('.input-add .btn').on('click', function(){
        var $module = $(this).closest('.module');
        var $input = $('.input-add input', $module);
        var $list = $('ul', $module);
        if($input.val()) {
            $list.append('<li class="selected">' + $input.val() + '</li>');
            $input.val('');
            $('.input-add', $module).hide();
            $('.btn-add', $module).show();
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

    $('footer').on('touchmove', function(e){
        e.preventDefault();
    });

    function showFeedback() {
        $('.feedback-layer').show();
        $('.feedback-container').addClass('active');
    }

    function hideFeedback(success) {
        if(success) {
            $('.feedback-success').show();
            setTimeout(function(){
                $('.feedback-success').hide();
                $('.feedback-layer').hide();
            }, 2000)
        } else {
            $('.feedback-layer').hide();
        }
        $('.feedback-container').removeClass('active');
    }

});