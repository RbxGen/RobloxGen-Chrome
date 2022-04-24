chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
	chrome.storage.sync
		.get({
			host: 'http://localhost', // default value
			timeout: 5000
		})
		.then(config => {
			console.log('config: ', config);
			if (msg.name === 'login') {
				const controller = new AbortController();
				const timeoutId = setTimeout(
					() => controller.abort(),
					config.timeout
				);

				fetch(config.host + '/api/accounts/random', {
					signal: controller.signal
				})
					.then(res => {
						clearTimeout(timeoutId);

						res.json().then(json => {
							if (!json.success) {
								sendResponse({
									ok: false,
									err: 'http error'
								});
								return true;
							}

							if (!json.account) {
								sendResponse({
									ok: false,
									err: 'no accs found'
								});
								console.log('no accs');
								return true;
							}

							chrome.cookies
								.set({
									url: 'https://roblox.com',
									domain: '.roblox.com',
									name: '.ROBLOSECURITY',
									httpOnly: true,
									value: json.account.cookie
								})
								.then(() => {
									sendResponse({
										ok: true,
										name: json.account.username
									});
								})
								.catch(err => {
									sendResponse({
										ok: false,
										err: `failed to set cookie (${err})`
									});
								});
						});
					})
					.catch(() => {
						sendResponse({
							ok: false,
							err: 'network error'
						});
					});
			} else if (msg.name === 'count') {
				fetch(`${config.host}/api/accounts/count`)
					.then(res => {
						res.json().then(json => {
							let count = 0;
							if (json['success']) {
								count = json['count'];
							}
							sendResponse({
								ok: true,
								count: count
							});
						});
					})
					.catch(() => {
						sendResponse({
							ok: false
						});
					});
			}
		});
	return true;
});
