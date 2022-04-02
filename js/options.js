const hostInput = document.getElementById('host-input');
const timeoutInput = document.getElementById('timeout-input');
const updateBtn = document.getElementById('update-btn');

chrome.storage.sync.get({
    host: 'http://localhost',
    timeout: 10000
}).then(config => {
    hostInput.value = config.host;
    timeoutInput.value = config.timeout;
});

updateBtn.addEventListener('click', () => {
    const host = hostInput.value;
    let timeout = timeoutInput.value;
    if (host === '') {
        alert('Host may not be empty!')
        return;
    }

    if (timeout === '') {
        alert('Timeout may not be empty!');
        return;
    }

    if (isNaN(timeout)) {
        alert('Timeout must be a number!');
        return;
    }

    timeout = parseInt(timeout);

    if (timeout < 0) {
        alert('Timeout must be greater than 0!');
        return;
    }

    chrome.storage.sync.set({
        host: hostInput.value,
        timeout: timeoutInput.value
    });
});
