module.exports.get = function (configName) {
    var configs = {
        SERVER_ADDRESS: 'http://upb.flexites.org',
        SERVER_PORT: 8042,
        DB_OPTIONS: {
            connectionLimit : 100,
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : ' upb',
            insecureAuth: true
        },
        SESSION_STORE_OPTIONS: {
            checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
            expiration: 86400000,// The maximum age of a valid session; milliseconds.
            createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
            schema: {
                tableName: 'T_AG_SESSIONS',
                columnNames: {
                    session_id: 'session_id',
                    expires: 'expires',
                    data: 'data'
                }
            }
        },
        SESSION_OPTIONS: {
            secret: 'pe6E3PC5QBbV9mXqxkHDUSZxVruFsQREFyUyd8eTkfr5ddkmqSPUns38tnqJN6Yj',
            key: 'sid',
            resave: false,
            saveUninitialized: true
        }
    };

    configs['FULL_SERVER_ADDRESS'] = configs['SERVER_ADDRESS'] + ':' + configs['SERVER_PORT'];

    var config = configs[configName];
    if(!config)
        console.log(configName + ' config not found!');
    return config;
};