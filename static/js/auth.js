document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const apiKeyInput = document.getElementById('api-key-input');
            const apiKey = apiKeyInput.value.trim();
            if (apiKey) {
                localStorage.setItem('HYPRLAB_API_KEY', apiKey);
                window.location.href = '/';
            }
        });
    }
});

function getApiKey() {
    return localStorage.getItem('HYPRLAB_API_KEY');
}

function checkAuth() {
    if (!getApiKey() && window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
}
