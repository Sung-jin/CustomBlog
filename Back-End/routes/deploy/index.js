/**
   * @swagger
   * path:
   *   /deploy:
   *     post:
   *       tags:
   *         - deploy
   *       summary: deploy 전용 api
   *       description: travis 와 연동하여 deploy 하기 위한 api
   *       consumes:
   *         - application/json
   *       produces:
   *         - application/json
   *       parameters:
   *         - name: body
   *           in: body
   *           description: deploy 작업을 위한 key object
   *           required: true
   *           schema:
   *             $ref: "#/definitions/DeployModels"
   *       responses:
   *         200:
   *           description: success
   *           schema:
   *             type: object
   *             properties:
   *               state:
   *                 type: string
   *               result:
   *                 type: string
   *             example:
   *               state: success
   *               result: deploy result
   *         422:
   *           description: invalid key
   *           schema:
   *             type: object
   *             properties:
   *               state:
   *                 type: string
   *               message:
   *                 type: string
   *             example:
   *               state: fail
   *               message: check deploy key
   * 
   *         500:
   *           description: deploy fail
   *           schema:
   *             type: object
   *             properties:
   *               state:
   *                 type: string
   *               error:
   *                 type: object
   *             example:
   *               state: fail
   *               error: {}
   */

import express from 'express';
import { exec } from 'child_process';

const router = express.Router();

router.post('/', async (req, res) => {
  let state = {state: 'fail'};
  const DEPLOY_KEY = process.env.DEPLOY_KEY;
  const key = req.body.key;
  if (key === DEPLOY_KEY) {
    try {
      let result = await execPromise('./deploy.sh');
      state.state = 'success';
      state.result = result;

      return res.status(200).jsonp(state);
    } catch (e) {
        console.error(e.message);
        state.error = e;
        return res.status(500).jsonp(state);
        // 여기는 쉘 스크립트에 의해 발생하는 오류이므로 거기에 맞는 오류 코드를 찾아서 변경하자!
    }
  } else {
    state.message = 'check deploy key';

    return res.status(422).jsonp(state);
  }
});

function execPromise(command) {
  return new Promise(function(resolve, reject) {
      exec(command, (error, stdout, stderr) => {
          if (error) {
              reject(error);
              return;
          }
          resolve('deploy success');
      });
  });
}

module.exports = router;