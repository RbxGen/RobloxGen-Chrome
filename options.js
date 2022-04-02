const hostInput = document.getElementById('host-input');
const updateBtn = document.getElementById('update-btn');

chrome.runtime.sendMessage({name: 'getConfig'}, (config) => {
    updateBtn.addEventListener('click', () => {
        config.host = hostInput.value;
        chrome.runtime.sendMessage({name: 'setConfig', config: config});
    });
})