import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Deploy 이후 여기가 변했는지 확인하기 위함');
});

module.exports = router;
