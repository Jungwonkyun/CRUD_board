module.exports = (function () {
    return {
        local: {
            host: 'localhost',
            port: '33060',
            user: 'root',
            password: 'gocodermysql',
            database: 'nodedb'
        },
        real: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        staging: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();