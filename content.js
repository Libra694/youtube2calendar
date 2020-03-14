
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

		if ($(event.target.offsetParent).attr('aria-pressed') == 'false') return;

		var video_id = $(event.target).closest('#dismissable').find('#thumbnail').attr('href').replace('/watch?v=', '');
	}
	else if (event.target.className == 'ytp-offline-slate-button-text' || event.target.className == 'ytp-offline-slate-button ytp-button') {

		if ($(event.target).text().indexOf('設定') >= 0) return;

		var video_id = new URLSearchParams(location.search).get('v');
	}
	else return;

	chrome.runtime.sendMessage(
		{query: 'get_video_data', video_id : video_id},
		(response)=> {
			var title = response.data.items[0].snippet.title;
			var channel = response.data.items[0].snippet.channelTitle;
			var date = response.data.items[0].liveStreamingDetails.scheduledStartTime;

			var video_url = 'https://www.youtube.com/watch?v=' + video_id;
			var start_date = new Date(date);
			var end_date = new Date(date);
			end_date.setHours(end_date.getHours() + 1);
		
			chrome.runtime.sendMessage(
				{query: 'get_calendar_id'},
				(response) => {
					var calender_url = calender(title, video_url, channel, start_date, end_date, calender_id = response);
					window.open(calender_url);
				}
			);
		}
	);

}, false)