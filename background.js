
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		switch (request) {
			case 'get_calendar_id':
				chrome.storage.sync.get({'calendar_id': ''}, (result) => {
					sendResponse(result.calendar_id);
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