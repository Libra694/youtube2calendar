
function zerofill(num) {
    return ('0' + num).slice(-2);
}

function date2str(date) {

    var str = '';
    str += date.getFullYear();
    str += zerofill(date.getMonth() + 1);
    str += zerofill(date.getDate());
    str += 'T';
    str += zerofill(date.getHours());
    str += zerofill(date.getMinutes());
    str += zerofill(date.getSeconds());
 
    return str;
}

function calender(title, details, place, start_date, end_date, calender_id='') {
    return 'http://www.google.com/calendar/event?' +
        'action=' + 'TEMPLATE' +
        '&text=' + encodeURIComponent(title) +
        '&details=' + encodeURIComponent(details) +
        '&location=' + encodeURIComponent(place) +
        '&dates=' + date2str(start_date) + '/' + date2str(end_date) +
        '&src=' + encodeURIComponent(calender_id) +
        '&sprop=' + 'Libra694';
}

document.body.addEventListener('click', function (event) {

    if (event.target.className == 'style-scope ytd-toggle-button-renderer style-compact-gray') {
        if ($(event.target).parents('.style-scope ytd-rich-grid-renderer').length > 0) {

            if ($(event.target).text().indexOf('設定') >= 0) return;

            var $target = $(event.target).closest('#dismissable');
            var title = $target.children().find('#video-title-link').attr('title');
            var video_url = 'https://www.youtube.com' + $target.children().find('#video-title-link').attr('href');
            var channel = $target.children().find('#avatar-link').attr('title');
            var date = '20' + $target.children().find('#metadata-line').text().trim().split(/[ に]/).slice(0, 2).join(' ') + ':00';
        }
        if ($(event.target).parents('.style-scope ytd-grid-renderer').length > 0) {

            if ($(event.target).text().indexOf('設定') >= 0) return;

            var $target = $(event.target).closest('#dismissable');
            var title = $target.children().find('#video-title').attr('title');
            var video_url = 'https://www.youtube.com' + $target.children().find('#video-title').attr('href');
            var channel = $target.children().find('#text').attr('title');
            var date = '20' + $target.children().find('#metadata-line').text().trim().split(/[ に]/).slice(0, 2).join(' ') + ':00';
        }
    }
    else if (event.target.className == 'ytp-offline-slate-button-text' || event.target.className == 'ytp-offline-slate-button ytp-button') {

        if ($(event.target).text().indexOf('設定') >= 0) return;

        var title = $('.ytp-title-link.yt-uix-sessionlink.ytp-title-fullerscreen-link').text();
        var video_url = location.href;
        var channel = $('#channel-name.style-scope.ytd-video-owner-renderer').children().find('#text').text();
        var d = $('.ytp-offline-slate-subtitle-text').text().trim().split(/[年月日]/);
        var date = (d.length == 3 ? new Date().getFullYear() : d[d.length - 4]) + '/' + d[d.length - 3] + '/' + d[d.length - 2] + d[d.length - 1] + ':00';
    }
    else return;

    var start_date = new Date(date);
    var end_date = new Date(date);
    end_date.setHours(end_date.getHours() + 1);

    chrome.runtime.sendMessage(
        "get_calendar_id",
        function (response) {
            if (response) {
                var calender_url = calender(title, video_url, channel, start_date, end_date, calender_id = response);
            } else {
                var calender_url = calender(title, video_url, channel, start_date, end_date);
            }
            window.open(calender_url);
        }
    );

}, false)