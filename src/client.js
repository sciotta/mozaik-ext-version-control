import request from 'superagent-bluebird-promise';
import chalk   from 'chalk';
import pureRequest from 'request';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    function requestUrl(url) {
        var promise = new Promise(function(resolve, reject){
            pureRequest(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }else{
                    reject(error);
                }
            })
        });

        return promise;
    }

    function versionRequest(url) {
        mozaik.logger.info(chalk.yellow(`[version] fetching from ${ url }`));
        let req = request.get(url);
        
        return req.promise().catch(error => {
            mozaik.logger.error(chalk.red(`[version] ${ error }`));
            throw error;
        });
    }

    const apiCalls = {
        allVersions(params) {
            var versionsArray = [];

            versionsArray.push(requestUrl(params.frontend)
            .then(res => {
                return {
                    version: res.replace(/\"/g, ''),
                    type: 'frontend'
                }
            }));


            versionsArray.push(versionRequest(params.backend)
            .then(res => {
                return {
                    version: res.body,
                    type: 'backend'
                }
            }));

            return Promise.all(versionsArray);
        }
    };
    return apiCalls;
};

export default client;