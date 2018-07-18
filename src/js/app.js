String.prototype.toPersianDigits = function () {
    var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};
String.prototype.toEnglishDigits = function () {
    var id = {'۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'};
    return this.replace(/[^0-9.]/g, function (w) {
        return id[w] || w;
    });
};
String.prototype.toSeconds = function () {
    var times = this.toEnglishDigits().split(":");
    return parseInt(times[2], 10) + (parseInt(times[1], 10) * 60) + (parseInt(times[0], 10) * 3600);
};

function zeroFill(number, size) {
    size = (typeof size !== "undefined") ? size : 2;
    var number = number.toString();
    while (number.length < size)
        number = "0" + number;
    return number;
}
function sec2time(value) {
    var time = new Date(0, 0, 0, 0, 0, Math.abs(value), 0);
    var output = zeroFill(time.getHours(), 2) + ":" + zeroFill(time.getMinutes(), 2) + ":" + zeroFill(time.getSeconds(), 2);
    return output.toString().toPersianDigits();
}

Handlebars.registerHelper('useSlashes', function (datetime, options) {
//    return datetime.split(" ").join('/').replace(/-/g, '/').replace(/:/g, '/').slice(0, -3);
    return datetime.split(" ").join('/').replace(/-/g, '/').replace(/:/g, '/');
});
Handlebars.registerHelper('getTime', function (value, options) {
    try {
        var splitter = (value.indexOf('T') !== -1) ? 'T' : ' ';
        return time = value.split(splitter)[1].toString().toPersianDigits();
    } catch (e) {
        console.log(e, value);
    }
});
Handlebars.registerHelper('sec2time', function (value, options) {
    return sec2time(value);
});
Handlebars.registerHelper('getSeconds', function (value, options) {
    try {
        var splitter = (value.indexOf('T') !== -1) ? 'T' : ' ';
        var times = value.split(splitter)[1].toString().split(":");
        return parseInt(times[2], 10) + (parseInt(times[1], 10) * 60) + (parseInt(times[0], 10) * 3600);
    } catch (e) {
        console.log(e, value);
    }
});
Handlebars.registerHelper('min2time', function (value, options) {
    var time = new Date(0, 0, 0, 0, Math.abs(value), 0, 0);
    var output = zeroFill(time.getHours(), 2) + ":" + zeroFill(time.getMinutes(), 2) + ":" + zeroFill(time.getSeconds(), 2);
    return output.toString().toPersianDigits();
});
Handlebars.registerHelper('min2time2', function (value, options) {
    var secs = ~~(((value - ~~value) * 60 / 100) * 100);
    var time = new Date(0, 0, 0, 0, Math.abs(value), secs, 0);
    var output = zeroFill(time.getHours(), 2) + ":" + zeroFill(time.getMinutes(), 2) + ":" + zeroFill(time.getSeconds(), 2);
    return output.toString().toPersianDigits();
});
Handlebars.registerHelper("persianDigits", function (value, options) {
    return value.toString().toPersianDigits();
});
Handlebars.registerHelper("sec2px", function (value, options) {
    return value * Config.unit;
});
Handlebars.registerHelper("resolvePath", function (value, options) {
    return (Config.useProxy) ? Config.api.proxy + '?csurl=' + value : value;
});
Handlebars.registerHelper("time2px", function (value, options) {
    try {
        var splitter = (value.indexOf('T') !== -1) ? 'T' : ' ';
        var times = value.split(splitter)[1].toString().split(":");
        return (parseInt(times[2], 10) + (parseInt(times[1], 10) * 60) + (parseInt(times[0], 10) * 3600)) * Config.unit;
    } catch (e) {
        console.log(e, value);
    }
});

(function app() {
    this.datepicker = {};
    this.cache = {channel: '', date: '', clockInterval: 0};
    this.unit = Config.unit;
    this.templates = {
        app: 'assets/tmpl/app{mode}.html', items: 'assets/tmpl/items{mode}.html', item: 'assets/tmpl/item.html'
    };

    this.initClock = function (callback) {
        var self = this;
        window.setInterval(function () {
            self.loadClock();
        }, Config.clockInterval);
        self.loadClock(function (clock) {
            typeof callback !== "undefined" && callback(clock.toString().toEnglishDigits());
        });
    };
    this.loadClock = function (callback) {
        var self = this;
        $.ajax({
            type: 'HEAD'
            , url: window.location.href.toString()
            , success: function (data, textStatus, request) {
                var serverDate = request.getResponseHeader('Date');
                var d = new Date(serverDate);
                d.setSeconds(d.getSeconds() + 1);
                var clock = self.cache.clock = (zeroFill(d.getHours()) + ':' + zeroFill(d.getMinutes()) + ':' + zeroFill(d.getSeconds())).toPersianDigits();
                $("#header time").text(self.cache.clock);
                typeof callback !== "undefined" && callback(self.cache.clock.toString().toEnglishDigits());
                window.clearInterval(self.cache.clockInterval);
                self.cache.clockInterval = window.setInterval(function () {
                    d.setSeconds(d.getSeconds() + 1);
                    clock = self.cache.clock = (zeroFill(d.getHours()) + ':' + zeroFill(d.getMinutes()) + ':' + zeroFill(d.getSeconds())).toPersianDigits();
                    $("#header time").text(clock);
                    $("#now").length && $("#now").css({'right': clock.toString().toEnglishDigits().toSeconds() * Config.unit});
                }, 1000);
            }
        });
    };
    this.checkActive = function () {
//        if (this.mode === "timeline")
//            $("#channels li").each(function () {
//                self.loadItems($("#datepicker").val(), $(this).attr('id'), 'prepend');
//            });
        if (self.mode === "timeline")
            self.loadTimeline($("#datepicker").val(), $(this).attr('id'));
        else
            $(".channels").find("li:first").trigger('click');
    };
    this.getDates = function () {
        var c = new persianDate($("#datepicker").val().split('/').map(Number));
        var dates = [];
        var minDate = new persianDate().subtract('days', Config.maxDays).hours(0).minutes(0).seconds(0).format('X');
        for (var i = -12; i < 2; i++) {
            var m = c[i < 0 ? 'subtract' : 'add']('days', Math.abs(i));
            if (minDate <= ~~m.format('X'))
                dates.push({dd: m.format('ddd'), D: m.format('D'), X: ~~m.format('X'), c: i === 0 ? true : false});
        }
        return dates;
    };
    this.addCalendar = function (callback) {
        var self = this;
        var minDate = new Date().setDate((new Date().getDate()) - Config.maxDays);
        var datepicker = self.datepicker = $("#datepicker").persianDatepicker({
            format: 'YYYY/MM/DD', observer: true, minDate: null, maxDate: minDate,
            onSelect: function (u) {
                if (self.mode === "timeline")
                    self.loadTimeline($("#datepicker").val(), $(this).attr('id'));
                else
                    self.loadItems($("#datepicker").val(), $("#channels li.active").attr('id')) && self.refreshDays();
            }
        });
        datepicker.css({position: 'fixed', top: $("#toggle-datepicker").offset().top + 30, left: $("#toggle-datepicker").offset().left - $("#datepicker").width() + 40}).toggle() && callback(self.datepicker);
    };
    this.refreshDays = function () {
        $.get({url: 'assets/tmpl/days.html', cache: false}).done(function (data) {
            $("#days").html(Handlebars.compile(data)(self.getDates()));
        });
    };
    this.addEventListeners = function () {
        var self = this;
        $(document)
                .on('click', ".items li .syn", function (e) {
                    e.stopPropagation();
                    if ($("body").hasClass("timeline"))
                        return false;
                    var $li = $(this).parents("li:first");
                    $li.hasClass("active") && $li.removeClass("active").trigger('deactivated');
                    $("#player").length > 0 && $("#player").slideUp(function () {
                        flowplayer($("#player")).engine.hlsjs.stopLoad();
                        $(this).remove();
                    });
                    $(".items li.active").removeClass('active').trigger('deactivated') && $li.addClass("active").trigger('activated');
                })
                .on('activated', ".items li", function (e) {
                    var $img = $(this).find(".dtl figure img"), speed = typeof Config.sliderSpeed !== "undefined" ? Config.sliderSpeed : 500;
                    if ($img.attr('src').indexOf('placeholder') === -1) {
                        self.cache.sliderInterval = window.setInterval(function () {
                            var src = $img.attr('src').indexOf('005') !== -1 ? $img.attr('src').replace('005', '001') : [$img.attr('src').split('00')[0], '00', ~~$img.attr('src').split('00')[1].split('.')[0] + 1, '.jpg'].join('');
//                            $img.fadeOut(function() {
//                                $img.attr('src', src).fadeIn();
                            $img.attr('src', src);
//                            });
                        }, speed);
                    }
                })
                .on('deactivated', ".items li", function (e) {
                    var $img = $(this).find(".dtl figure img");
                    if ($img.attr('src').indexOf('placeholder') === -1) {
                        clearInterval(self.cache.sliderInterval);
                        $img.attr('src', $img.attr('src').replace(/img_.*.\d.jpg/g, 'img_001.jpg'));
                    }
                })
                .on('click', "#toggle-datepicker", function () {
                    $("#datepicker").toggle();
                })
                .on('click', "#toggle-mode-default", function () {
                    localStorage.setItem(storageKey + '$mode', 'default');
                    window.location.reload();
                })
                .on('click', "#toggle-mode-timeline", function () {
                    localStorage.setItem(storageKey + '$mode', 'timeline');
                    window.location.reload();
                })
                .on('click', "#toggle-lights", function () {
                    ////
                    if (localStorage.getItem(storageKey + '$night-mode') !== null)
                        $("body").removeClass('dark') && localStorage.removeItem(storageKey + '$night-mode');
                    else
                        $("body").addClass('dark') && localStorage.setItem(storageKey + '$night-mode', true);
                })
                .on('click', "body.timeline #items li, body.timeline #items li .syn", function (e) {
                    if (typeof self.cache.firstTimelineItemInit === "undefined") {
                        $("#desc").fadeIn() && $("#items").animate({'margin-left': '300px'});
                        self.cache.firstTimelineItemInit = true;
                    }
                    $li = $(this).is("li") ? $(this) : $(this).parent();
                    var params = {idx: $li.data('index'), channel: $li.parents("aside:first").attr('class')};
                    var items = JSON.parse(localStorage.getItem(self.storageKey + '$' + params.channel));
                    items !== null && $.get({url: self.templates.item.replace(/{mode}/, self.mode === 'default' ? '' : '-' + self.mode), cache: false}).done(function (data) {
                        $("#desc").empty().html(Handlebars.compile(data)(items[params.idx]));
                        self.playTimelineItem($li);
                    });
                })
                .on('click', "#toggle-desc", function () {
                    if ($("#desc").is(":visible"))
                        $("#desc").fadeOut() && $("#items").animate({'margin-left': '0px'});
                    else
                        $("#desc").fadeIn() && $("#items").animate({'margin-left': '300px'});
                })
                .on('click', "#toggle-channels", function () {
                    if (mode !== "timeline")
                        $("#channels").toggleClass("col-sm-1") && $("#items").toggleClass("col-sm-11") && $(".box.channels").css({width: $(".box.channels").parent().width()});
                    else
                    if ($("#channels").width() > 85)
                        $("#channels").css({"overflow": "hidden"}).animate({"width": 70}) && $("#items").animate({'margin-right': 70});
                    else
                        $("#channels").css({"overflow": "visible"}).animate({"width": 200}) && $("#items").animate({'margin-right': 200});
                })
                .on('click', ".channels li", function () {
                    self.mode !== "timeline" && self.loadChannel($(this));
                })
                .on('click', ".box.items .dtl figure", function () {
                    self.playItem($(this).parents("li:first"));
                })
                .on('click', "#logout", function () {
                    localStorage.removeItem(self.storageKey + '$token') && localStorage.removeItem(self.storageKey + '$user');
                    window.location.reload();
                })
                .on('click', "#days li", function () {
                    !$(this).hasClass("active") && self.datepicker.data().datepicker.setDate($(this).data('unix') * 1000) && self.refreshDays();
                })
                .on('change', "#channels-filter", function (e) {
                    var type = $(this).val();
                    if ($($(".box.channels li:visible")[0]).data('type') === type)
                        return false;
                    if (type == -1)
                        $(".box.channels li:hidden").show(100);
                    else {
                        $(".box.channels li:visible").hide(100, function () {
                            $(".box.channels").find('li[data-type="' + type + '"]:hidden').show(100);
                        });
                    }
                })
                .ajaxStart(function () {
                    $("body").addClass("loading");
                })
                .ajaxStop(function () {
                    $("body").removeClass("loading");
                });
    };
    this.loadChannel = function ($el) {
        var self = this;
        $(".channels li").removeClass('active');
        $el.addClass("active") && this.loadItems($("#datepicker").val(), $el.attr('id'));
    };
    this.addRulerMarks = function () {
        for (var i = 0; i < (3600 * 25); i = i + 1800)
            $("#ruler").append('<i style="right: ' + (i * Config.unit) + 'px">' + sec2time(i) + '</i>')
    };
    this.loadTimeline = function (date, channel) {
        var self = this;
        $("#items").empty();
        (!$("#ruler").length && self.mode === "timeline") && $("#items").prepend('<div id="ruler" style="width: ' + (60 * 60 * 25 * self.unit) + 'px"></div><div id="now"></div>') && self.addRulerMarks();
        $("#channels li:visible").each(function () {
            $("#items").append('<aside class="' + $(this).attr("id") + '" style="width: ' + (60 * 60 * 25 * self.unit) + 'px"></aside>');
        });
        $("#items aside").each(function () {
            self.loadItems(date, $(this).attr("class"), "append", $(this));
        });
    };
    this.loadItems = function (date, channel, method, $position) {
        var self = this, method = typeof method === 'undefined' ? 'prepend' : method, $position = typeof $position === 'undefined' ? $("#items") : $position;
        var path = Config.useProxy ? Config.api.proxy : Config.api.items;
        var params = Config.useProxy ? {csurl: Config.api.items, date: date, channel: channel} : {date: date, channel: channel};
        $.get(path, params).done(function (items) {
//        $.get(Config.api.items, {date: date, channel: channel}).done(function (items) {
            localStorage.setItem([self.storageKey + '$' + channel], JSON.stringify(items));
            $.get({url: self.templates.items.replace(/{mode}/, self.mode === 'default' ? '' : '-' + self.mode), cache: false}).done(function (data) {
                $("#last-update span").empty().promise().done(function () {
                    self.mode !== "timeline" && $(".box.items").remove();
                    $position.append(Handlebars.compile(data)(items)).promise().done(function () {
                        self.afterLoad({date: date, channel: channel}, items);
                        if (self.mode !== "timeline") {
                            $(".box.items").hasClass('has-scroll') && $(".box.items > ul").slimScroll({height: $(window).height() - 160, position: 'left', alwaysVisible: false});
                            $(window).on('resize', function () {
                                $(".box.items").hasClass('has-scroll') && $(".box.items > ul").slimScroll({destroy: true}).slimScroll({height: $(window).height() - 160, position: 'left', alwaysVisible: false});
                                ch = $(".box.channels").slimScroll({destroy: true});
                                ch.hasClass('has-scroll') && ch.find(">div").slimScroll({height: $(window).height() - 160, position: 'left', alwaysVisible: false});
                            });
                        }
                    });
                });
            });
        });
    };
    this.handleDragScroll = function () {
        $("#items").mousewheel(function (e, delta) {
            this.scrollLeft += (delta * 40);
            e.preventDefault();
        });
        this.cache.deagEnabled = true;
    };
    this.scrolledToNow = function (force) {
        var force = (typeof force !== "undefined" && force === true) ? force : false;
        if (typeof this.cache.scrolledToNow !== "undefined" && force !== true)
            return;
        $("#items").scrollLeft($("#items > *:first").width() - parseInt($("#now").css('right')) - $("#items").width() + 100);
        this.cache.scrolledToNow = true;
    };
    this.initTooltip = function () {
        $("li[data-title]").nTooltip({container: "li"});
        this.cache.toolTipInitialized = true;
    };
    this.handleFixedElements = function () {
        $("#desc").css({height: $(window).height() - $("#fplayer").height() - $("#header").height() - 50});
        $(window).on('resize', function () {
            $("#desc").css({height: $(window).height() - $("#fplayer").height() - $("#header").height() - 50});
        });
        this.cache.handleFixedElements = true;
    };
    this.afterLoad = function (params, items) {
        var self = this;
        if (this.mode === "timeline") {
            typeof self.cache.deagEnabled === "undefined" && self.handleDragScroll();
            typeof self.cache.scrolledToNow === "undefined" && window.setTimeout(function () {
                self.scrolledToNow();
            }, 1000);
            typeof self.cache.toolTipInitialized === "undefined" && self.initTooltip();
            typeof self.cache.handleFixedElements === "undefined" && self.handleFixedElements();
            return;
        }
        $.get(Config.useProxy ? Config.api.proxy + '?csurl=' + Config.api.lastUpdate : Config.api.lastUpdate, params).done(function (data) {
            $("#last-update span").text(data).parent().removeClass("d-none");
            var values = self.getValues(items, []);
            if (cache.channel === params.channel && cache.date === params.date) {
                if ($(".filter-start").text().trim().length)
                    self.filterItems(values, [values.indexOf($(".filter-start").text().toSeconds()), values.indexOf($(".filter-end").text().toSeconds())]);
            } else {
                self.setSlider(items);
                self.cache.channel = params.channel;
                self.cache.date = params.date;
            }
            self.showCurrent();
        });
    };
    this.filterItems = function (values, interval) {
        $(".box.items [data-duration]").each(function () {
            if ($(this).data('duration') >= values[interval[0]] && $(this).data('duration') <= values[interval[1]]) {
                if (!$(this).is(":visible"))
                    $(this).slideDown();
            } else
            if ($(this).is(":visible"))
                $(this).removeClass("active").find("#player").remove() && $(this).slideUp();
        });
    };
    this.getValues = function (items, values) {
        for (var item in items)
            values.push(items[item].duration);
        return $.unique(this.sort(values));
    };
    this.isToday = function (date) {
        var today = new persianDate().format('YYYY-MM-DD').toEnglishDigits();
        if (today === date)
            return true;
        return false;
    };
    this.showCurrent = function () {
        var now = this.cache.clock.toString().toEnglishDigits().toSeconds();
        var selected = new persianDate($("#datepicker").val().split('/').map(function (x) {
            return parseInt(x, 10);
        })).format('YYYY-MM-DD').toEnglishDigits();
        if (!this.isToday(selected))
            return false;
        $(".box.items [data-duration][data-start]").each(function () {
            if ($(this).data("start") + $(this).data("duration") > now && $(this).data("start") < now)
                $(this).addClass('current');
        });
        window.setTimeout(function () {
            if ($(".box.items .current").length) {
                if ($(".box.items").hasClass('has-scroll'))
                    $(".box.items ul").slimScroll({scrollTo: ($(".box.items .current").position().top + $('#items').height() + 80) + 'px'});
                else
                    $(".box.items ul").animate({scrollTop: $(".box.items .current").position().top - 40});
            }
        }, 500);
    };
    this.setSlider = function (items) {
        var self = this;
        $(".slider").hasClass('ui-widget') && $(".slider").slider("destroy");
        var values = this.cache.values = this.getValues(items, []);
        this.setPointers(items);
        $(".slider").slider({min: 0, max: values.length - 1, steps: values.length, values: [0, values.length - 1], range: true, slide: function (event, ui) {
                var times = [new Date(0, 0, 0, 0, 0, Math.abs(values[ui.values[0]]), 0), new Date(0, 0, 0, 0, 0, Math.abs(values[ui.values[1]]), 0)];
                $(".filter-start").text((zeroFill(times[0].getHours(), 2) + ":" + zeroFill(times[0].getMinutes(), 2) + ":" + zeroFill(times[0].getSeconds(), 2)).toPersianDigits());
                $(".filter-end").text((zeroFill(times[1].getHours(), 2) + ":" + zeroFill(times[1].getMinutes(), 2) + ":" + zeroFill(times[1].getSeconds(), 2)).toPersianDigits());
                self.filterItems(values, ui.values);
            }
        });
    };
    this.setPointers = function (items) {
        var points = [999999, 0];
        $.each(items, function () {
            points[0] = this.duration < points[0] ? this.duration : points[0];
            points[1] = this.duration > points[1] ? this.duration : points[1];
        });
        var times = [new Date(0, 0, 0, 0, 0, Math.abs(points[0]), 0), new Date(0, 0, 0, 0, 0, Math.abs(points[1]), 0)];
        $(".filter-start").text((zeroFill(times[0].getHours(), 2) + ":" + zeroFill(times[0].getMinutes(), 2) + ":" + zeroFill(times[0].getSeconds(), 2)).toPersianDigits());
        $(".filter-end").text((zeroFill(times[1].getHours(), 2) + ":" + zeroFill(times[1].getMinutes(), 2) + ":" + zeroFill(times[1].getSeconds(), 2)).toPersianDigits());
    };
    this.sort = function (array) {
        return array.sort(function (a, b) {
            return a - b;
        });
    };
    this.playTimelineItem = function ($el) {
        var url = Config.useProxy ? Config.api.proxy + '?csurl=' + Config.api.media + $el.attr('data-url').replace('?', '&') : Config.api.media + $el.attr('data-url');
        $("#fplayer").empty() && $("#fplayer").append('<div id="player" />') && flowplayer("#player", {autoplay: true, clip: {sources: [{type: "application/x-mpegurl", src: url}]}, speeds: [0.5, 1, 1.5, 2, 4]});
    };
    this.playItem = function ($el, mode) {
        var self = this, position = "#player";
        if ($el.find("#player").length)
            return;
        $el.append('<div id="player" />');
        var url = Config.useProxy ? Config.api.proxy + '?csurl=' + Config.api.media + $el.attr('data-url').replace('?', '&') : Config.api.media + $el.attr('data-url');
        flowplayer("#player", {autoplay: true, clip: {sources: [{type: "application/x-mpegurl", src: url}]}, speeds: [0.5, 1, 1.5, 2, 4]});
        $(".box.items").hasClass('has-scroll') && window.setTimeout(function () {
            $(".box.items > ul").slimScroll({destroy: true}).slimScroll({height: $(window).height() - 120, position: 'left', alwaysVisible: false});
        }, 100);
    };
    this.initializeChannels = function () {
        ch = $(".box.channels").css({width: $(".box.channels").parent().width()});
        var selectedType = $("#channels-filter").val();
        ch.find('li[data-type="' + selectedType + '"]').show(1);
        ch.hasClass('has-scroll') && ch.find(">div").slimScroll({height: $(window).height() - 120, position: 'left', alwaysVisible: false});
    }

    var __initialize = function (self) {
        self.storageKey = "ott" + '_' + window.location.host.replace(/\./g, '').split(":")[0];
        if (localStorage.getItem(storageKey + '$token') === null)
            window.location.href = '/login.html';
        else
            $.ajaxSetup({
                headers: {'Authorization': localStorage.getItem(storageKey + '$token')}
            });
        if (localStorage.getItem(storageKey + '$night-mode') !== null)
            $("body").addClass('dark');
        if (localStorage.getItem(storageKey + '$mode') !== null)
            self.mode = localStorage.getItem(storageKey + '$mode');
        else {
            self.mode = typeof Config.mode !== "undefined" ? Config.mode : 'default';
            localStorage.setItem(storageKey + '$mode', self.mode);
        }
        $(function () {
            $("body").addClass(self.mode);
            $.get({url: self.templates.app.replace(/{mode}/, self.mode === 'default' ? '' : '-' + self.mode), cache: false}).done(function (data) {
                $("body").prepend(Handlebars.compile(data)(Config)).promise().done(function () {
                    self.initClock(function (d) {
                        self.addCalendar(function (instance) {
                            self.addEventListeners();
                            self.checkActive();
                            self.refreshDays();
                        });
                    });
                    self.initializeChannels();
                });
            });
        });
    }(this);
})();

$.fn.nTooltip = function (options) {
    var $this = this;
    $(document).mousemove(function (e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    });
    if (typeof mouse === "undefined")
        window.mouse = {};
    !$(".tooltip").length && $("#mainbody").append('<div class="tooltip"></div>');
    var settings = $.extend({container: "body"}, options);
    $(document).on('mouseenter', $($this[0]).prop("tagName"), function () {
        if (typeof $(this).attr('data-title') !== "undefined")
            $(".tooltip").html($(this).attr('data-title')).stop().fadeIn(100);
    });
    $(document).on('mousemove', function (e) {
        $(".tooltip").css({'top': mouse.y - 10, 'left': mouse.x - $(".tooltip").width() - 20});
        if (!$(e.target).parents(settings.container).length || $(e.target).is(settings.container))
            $(".tooltip").empty().stop().fadeOut(50);
    });
    return this;
};