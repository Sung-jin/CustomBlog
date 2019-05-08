import express from 'express';
import { exec } from 'child_process';

const router = express.Router();

router.post('/', async (req, res) => {
  let state = {state: 'fail'};
  const DEPLOY_KEY = process.env.DEPLOY_KEY;
  const key = req.body.key;
  if (key === DEPLOY_KEY) {
    await exec('deploy.sh', (error, stdout, stderr) => {
      if (error !== null) {
        console.log(`exec error: ${error}`);
      } else state.state = 'succes';
    });
  }

  return res.json(state);
});

module.exports = router;