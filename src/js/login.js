//@prepros-prepend vendor/jquery-3.2.1.min.js
var storageKey = "ott" + '_' + window.location.host.replace(/\./g, '').split(":")[0];
$(function() {
    $(document).on('submit', ".login-page form", function(e) {
        e.preventDefault();
        var path = Config.useProxy ? Config.api.proxy + '?csurl=' + Config.api.login : Config.api.login;
        $.post(path, $(this).serializeObject(), function(d) {
            localStorage.setItem(storageKey + '$token', d.Token);
            localStorage.setItem(storageKey + '$user', d.Name + ' ' + d.Family);
            window.location.href = '/';
        }).fail(function() {
            alert('اطلاعات ورود اشتباه است');
        });
        return false;
    }).on('click', "button[type=submit]", function(e) {
        $("input[name=username]").val('user') && $("input[name=password]").val('user');
    });
});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};