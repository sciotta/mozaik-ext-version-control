var convict = require('convict');

var config = convict({
    nagios: {
        url: {
            doc:     'The Nagios service url.',
            default: null,
            format:  String,
            env:     'NAGIOS_API_BASE_URL'
        },
        key: {
            doc:     'The Nagios API KEY.',
            default: null,
            format:  String,
            env:     'NAGIOS_API_KEY'
        }
    }
});
