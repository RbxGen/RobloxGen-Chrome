const randBtn = document.getElementById('randacc');
const statusText = document.getElementById('status');

function onSuccess(name) {
	statusText.style.display = 'block';
	statusText.classList.add('success');
	statusText.classList.remove('failed');

	statusText.textContent = 'Logged in as ' + name;
}

function onFailure(err) {
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
