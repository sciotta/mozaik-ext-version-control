import request from 'superagent-bluebird-promise';
import chalk   from 'chalk';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig();

    function versionRequest(url) {
        mozaik.logger.info(chalk.yellow(`[version] fetching from ${ url }`));
        let req = request.get(url);
        
        return req.promise().catch(error => {
            mozaik.logger.error(chalk.red(`[version] ${ error.error }`));
            throw error;
        });
    }

    const apiCalls = {
        versions(params) {
            var versions = [];

            versions.push(versionRequest(params.frontend)
            .then(res => {
                return {
                    version: res.body,
                    type: 'frontend'
                }
            }));


            versions.push(versionRequest(params.backend)
            .then(res => {
                return {
                    version: res.body,
                    type: 'backend'
                }
            }));

            return Promise.all(versions);
        }
    };
    return apiCalls;
};

export default client;