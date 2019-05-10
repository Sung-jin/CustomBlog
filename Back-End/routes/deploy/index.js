import express from 'express';
import { exec } from 'child_process';

const router = express.Router();

router.post('/', async (req, res) => {
  let state = {state: 'fail'};
  const DEPLOY_KEY = process.env.DEPLOY_KEY;
  const key = req.body.key;
  if (key === DEPLOY_KEY) {
    console.log('key success');
    try {
      // let pwdResult = await execPromise('ls');
      // console.log(pwdResult);
      let result = await execPromise('./deploy.sh');
      console.log(result);
      state.state = 'success';
      state.result = result;
    } catch (e) {
        console.error(e.message);
        state.error = e;
    }
  }

  return res.json(state);
});

function execPromise(command) {
  return new Promise(function(resolve, reject) {
      exec(command, (error, stdout, stderr) => {
          console.log(stdout);
          console.error(error);
          console.error(stderr);

          if (error) {
              reject(error);
              return;
          }
          resolve(stdout.trim());
      });
  });
}

module.exports = router;