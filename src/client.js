import request from 'superagent-bluebird-promise';
import config  from './config';
import chalk   from 'chalk';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildRequest(path) {
        mozaik.logger.info(chalk.yellow(`[nagios] fetching from ${ path }`));

        let baseUrl   = config.get('nagios.url');
        let apiKey   = config.get('nagios.key');
        const nagiosUrl = `${baseUrl}${path}&apikey=${apiKey}`;

        mozaik.logger.info(chalk.yellow(`[nagios] calling ${ nagiosUrl }`));
        let req         = request.get(nagiosUrl);
        
        return req.promise().catch(error => {
            mozaik.logger.error(chalk.red(`[nagios] ${ error.error }`));
            throw error;
        });
    }

    const apiCalls = {
        status(params) {
            return buildRequest(`/objects/servicestatus?host_name=${params.hostName}`)
                .then(res => res.body)
            ;
        }
    };
    return apiCalls;
};

export default client;