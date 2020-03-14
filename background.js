
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		switch (request.query) {
			case 'get_calendar_id':
				chrome.storage.sync.get({'calendar_id': ''}, (result) => {
					sendResponse(result.calendar_id);
				});
				break;
			case 'get_video_data':
				const key = 'AIzaSyAgQilpJEVbK4gC8uaoNuSSFg_VqBVg-0Q';
				var vide_id = encodeURIComponent(request.video_id);
				var url = `https://www.googleapis.com/youtube/v3/videos?id=${vide_id}&key=${key}&part=snippet,liveStreamingDetails`;
				axios.get(url)
					.then((res) => {
						sendResponse(res);
					})
					.catch((error) => {
						console.log(error);
					});
				break;
			default:
				console.log('unknown request');
				console.log(request);
				break;
		}
		return true;
	}
);