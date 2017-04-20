/**
 * Created by mengfanxu on 17/2/14.
 */
(function () {

    // 推荐标签背景色 #fcc #cfc #ccf #ffc #fcf #cff

    /*
     * 对象为标签
     * width                 : 宽度
     * height                : 高度
     * backgroundColor       ：背景颜色
     * left                  ：左部偏移
     * top                   ：顶部偏移
     * rotateDeg             ：旋转角度
     */
    $.fn.labelWall = function (options) {
        var $this = $(this);
        var settings = $.extend({
            'width': '300',
            'height': '300',
            'backgroundColor': '#fcc',
            'left': '0',
            'top': '0',
            'rotateDeg': '0',
            'title': '',
            'content': '',
            'name': ''
        }, options);

        var init = function () {
            $this.css({
                'width': settings.width + 'px',
                'height': settings.height + 'px',
                'backgroundColor': settings.backgroundColor,
                'left': settings.left + 'px',
                'top': settings.top + 'px',
                '-webkit-transform': 'rotate(' + settings.rotateDeg + 'deg)'
            });

            var tagNailLeft = '<div class="tag-nail tag-nail-left"></div>',
                tagNailRight = '<div class="tag-nail tag-nail-right"></div>',
                title = '<div class="label-title">' + settings.title + '</div>',
                content = '<div class="label-content">' + settings.content + '</div>',
                name = '<div class="label-name">—— ' + settings.name + '</div>';
            $this.prepend(tagNailLeft).prepend(tagNailRight)
                .append(title).append(content).append(name);
        };
        var events = {
            drag: function () {
                var offsetX, offsetY,
                    mouseX = $this.position().left,
                    mouseY = $this.position().top;

                $this.on('mousedown', function (e) {
                    offsetX = mouseX - e.pageX;
                    offsetY = mouseY - e.pageY;

                    document.onmousemove = function (e) {
                        mouseX = e.pageX + offsetX;
                        mouseY = e.pageY + offsetY;

                        $this.css({
                            'left': mouseX + 'px',
                            'top': mouseY + 'px'
                        })
                    };

                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }
                });
            },
            larger: function () {
                var timer = null,
                    matrix = $this.css('-webkit-transform'); //获取下元素的transform的初始状态
                $this.hover(function () {
                    timer = setTimeout(function () {
                        $this.css({
                            '-webkit-transition': 'all 800ms ease-in-out',
                            '-webkit-transform': 'scale(1.2)'
                        });
                    }, 0);
                }, function () {
                    clearTimeout(timer);
                    $this.css({
                        '-webkit-transform': matrix
                    });
                })
            },
            delete: function () {
                var moving = false;
                $this.find('.tag-nail').on('click', function () {
                    var _self = $(this);
                    if(_self.hasClass('tag-nail-right')){
                        if(moving) return false;
                        moving = true;
                        $this.css('webkitTransformOrigin', '0 0');
                        $this.addClass('clockwise-rotate-animate');
                        $this.on('webkitAnimationEnd', function () {
                            $this.addClass('clockwise-down-animate');
                            $this.on('webkitAnimationEnd', function () {
                                $this.hide();
                                moving = false;
                            })
                        })
                    }
                    if(_self.hasClass('tag-nail-left')){
                        if(moving) return false;
                        moving = true;
                        $this.css('webkitTransformOrigin', $this.width() + 'px 0');
                        $this.addClass('anticlockwise-rotate-animate');
                        $this.on('webkitAnimationEnd', function () {
                            $this.addClass('anticlockwise-down-animate');
                            $this.on('webkitAnimationEnd', function () {
                                $this.hide();
                                moving = false;
                            })
                        })
                    }
                })
            }
        };
        init();
        events.drag();
        events.delete();
        // events.larger();
        return this;
    };
    var $box1 = $('.label-box.label-box1'),
        $box2 = $('.label-box.label-box2'),
        $box3 = $('.label-box.label-box3');
    $box1.labelWall({
        'left': '100',
        'top': '100',
        'backgroundColor': '#ffc',
        'rotateDeg': '5',
        'title': '天气预报',
        'content': '哈佛滑动我安抚客户打款时发挥的开发和打卡机舒服哈多少分',
        'name': 'angle'
    });
    $box2.labelWall({
        'left': '600',
        'top': '300',
        'backgroundColor': '#cfc',
        'rotateDeg': '3',
        'title': '今日资讯',
        'content': '哈佛滑动我安抚客户打款时发挥的开发和打卡机舒服哈多少分',
        'name': 'angle'
    });
    $box3.labelWall({
        'left': '200',
        'top': '400',
        'backgroundColor': '#cff',
        'rotateDeg': '-3',
        'title':'天天快乐',
        'content':'哈佛滑动我安抚客户打款时发挥的开发和打卡机舒服哈多少分',
        'name':'angle'
    });

})();