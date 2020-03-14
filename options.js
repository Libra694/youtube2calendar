
function save_options() {
	chrome.storage.sync.set({
		calendar_id: document.getElementById('calendar_id').value
	});
}


function restore_options() {
	chrome.storage.sync.get({'calendar_id': ''}, (result) => {
		document.getElementById('calendar_id').value = result.calendar_id;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);