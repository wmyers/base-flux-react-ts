import request from 'request';
import bluebird from 'bluebird';
import BaseService from './BaseService';

class StaticDataService extends BaseService {

  getStaticData(fileName) {
    return new bluebird( (resolve, reject) => {
      request.get(
        {
          url: this.domain + '/data/'+fileName+'.json',
          json: true
        },
        (err, response, body) => {
          if(err){
            return reject(err);
          }
          if(response.statusCode >= 400){
            return reject(body);
          }
          return resolve(body);
        }
      );
    });
  }
}

export default new StaticDataService();
