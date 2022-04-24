const randBtn = document.getElementById('randacc') as HTMLButtonElement;
const statusText = document.getElementById('status') as HTMLParagraphElement;
const accountsCount = document.getElementById('accounts-cnt') as HTMLParagraphElement;

function onSuccess(name: string) {
	statusText.style.display = 'block';
	statusText.classList.add('success');
	statusText.classList.remove('failed');

	statusText.textContent = 'Logged in as ' + name;
}

function onFailure(err: string) {
	statusText.style.display = 'block';
	statusText.classList.add('failed');
	statusText.classList.remove('success');

	statusText.textContent = `Login failed! (${err})`;
}

randBtn.addEventListener('click', () => {
	statusText.style.display = 'none';
	chrome.runtime.sendMessage({ name: 'login' }, async (res) => {
		if (res.ok) {
			onSuccess(res.name);
		} else {
			onFailure(res.err);
		}
	});
});

chrome.runtime.sendMessage({ name: 'count' }, async (res) => {
	if (res.ok) {
		accountsCount.textContent = res.count + ' accounts';
	} else {
		accountsCount.textContent = 'Failed to get count';
	}
});
