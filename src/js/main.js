require.config({
    'paths': {
        'jq': '../lib/jquery-1.10.1.min',
        'com': '../lib/commom'
    },
    'shim': {
        '01login': ['jq', 'com'],
    }
});
require(['jq', 'com', '01login'], function () {
});