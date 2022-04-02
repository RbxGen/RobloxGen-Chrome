chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
	if (msg.name === 'login') {
        chrome.storage.sync.get({
            host: 'http://localhost',// default value
            timeout: 5000
        }).then(config => {
            const controller = new AbortController();

            const timeoutId = setTimeout(() => controller.abort(), config.timeout);

            fetch(config.host + '/gen', {
                signal: controller.signal
            }).then(res => {
                clearTimeout(timeoutId);
                res.json().then(json => {
                    if (!json.success) {
                        sendResponse({
                            ok: false,
                            err: 'http error'
                        });
                        return;
                    }
                    if (!json.account) {
                        sendResponse({
                            ok: false,
                            err: 'no accs found'
                        });
                        console.log('no accs')
                        return;
                    }
            
                    chrome.cookies.set({
                        url: 'https://roblox.com',
                        domain: '.roblox.com',
                        name: '.ROBLOSECURITY',
                        httpOnly: true,
                        value: json.account.cookie
                    }).then(() => {
                        sendResponse({
                            ok: true,
                            name: json.account.username,
                        });
                    }).catch(err => {
                        sendResponse({
                            ok: false,
                            err: `failed to set cookie (${err})`
                        });
                    });
                });
            }).catch(() => {
                sendResponse({
                    ok: false,
                    err: 'network error'
                });
            });
        });
        return true;
	}
});