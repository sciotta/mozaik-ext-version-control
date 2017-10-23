import request from 'superagent-bluebird-promise';
import config  from './config';
import chalk   from 'chalk';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildApiRequest(path) {
        let baseUrl   = config.get('nagios.url');
        let apiKey   = config.get('nagios.apiKey');
        const nagiosUrl = `${baseUrl}${path}&apikey=${apiKey}`;

        mozaik.logger.info(chalk.yellow(`[nagios] calling ${ nagiosUrl }`));
        let req         = request.get(nagiosUrl);
        return req.promise();
    }

    const apiCalls = {
        serviceStatus(params) {
            return buildApiRequest(`/objects/servicestatus?host_name=${params.hostName}`)
                .then(res => JSON.parse(res.text))
            ;
        }
    };
    return apiCalls;
};

export { client as default };