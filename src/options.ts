const hostInput = document.getElementById('host-input') as HTMLInputElement;
const timeoutInput = document.getElementById(
	'timeout-input'
) as HTMLInputElement;
const updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
const optionsUpdatedText = document.getElementById('options-updated') as HTMLParagraphElement;

chrome.storage.sync
	.get({
		host: 'http://localhost',
		timeout: 10000
	})
	.then(config => {
		hostInput.value = config.host;
		timeoutInput.value = config.timeout;
	});

updateBtn.addEventListener('click', async () => {
	const host = hostInput.value;
	let timeoutText: string = timeoutInput.value;
	let timeout: number;

	if (!host) {
		alert('Host may not be empty!');
		return;
	}

	if (!timeoutText) {
		alert('Timeout may not be empty!');
		return;
	}

	try {
		timeout = parseInt(timeoutText);
	} catch {
		alert('Timeout must be a number!');
		return;
	}
	if (timeout < 0) {
		alert('Timeout must be greater than 0!');
		return;
	}

	await chrome.storage.sync.set({
		host: hostInput.value,
		timeout: timeout
	});

	optionsUpdatedText.style.visibility = 'visible';
	
});
