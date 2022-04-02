let config = {
    host: 'http://localhost'
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.name === 'setConfig') {
        config = msg.config;
        console.log('config set to', config);
    } else if (msg.name === 'getConfig') {
        sendResponse(config);
    } else if (msg.name === 'login') {
        fetch(config.host + '/gen').then(res => {
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
        return true;
	}
});
