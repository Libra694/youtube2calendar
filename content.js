
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

function calender(title, details, place, start_date, end_date, calender_id = '') {
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

		if ($(event.target.offsetParent).attr("aria-pressed") == "false") return;

		var $dismissable = $(event.target).closest('#dismissable');
		var video_url = 'https://www.youtube.com' + $dismissable.find('#thumbnail').attr('href');
		var title = $dismissable.find('#video-title').text().trim();
		var channel = $dismissable.find('#channel-name #text').text().trim();
		var date = $dismissable.find('#metadata-line').text().trim().split(/[ に]/).slice(0, 2).join(' ') + ':00';

		if (channel == '') channel = $('#channel-header #channel-name #text').text().trim();
	}
	else if (event.target.className == 'ytp-offline-slate-button-text' || event.target.className == 'ytp-offline-slate-button ytp-button') {

		if ($(event.target).text().indexOf('設定') >= 0) return;

		var video_url = location.href;
		var title = $('#info h1').text().trim();
		var channel = $('#meta-contents #channel-name #text').text().trim();
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