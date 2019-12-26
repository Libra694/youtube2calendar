
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request) {
            case 'get_calendar_id':
                chrome.storage.sync.get(null, function(items) {
                    console.log('get_calendar_id:' + items.calendar_id);
                    sendResponse(items.calendar_id);
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