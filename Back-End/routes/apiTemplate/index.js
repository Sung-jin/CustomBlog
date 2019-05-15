import express from 'express';

const router = express.Router();

/**
   * @swagger
   * path:
   *   /template:
   *     get:
   *       tags:
   *         - template
   *       summary: 다른 api 만들때 사용할 route 템플릿
   *       description: swagger API 명세 템플릿용 / deprecate 및 사용 안함. 말그대로 나중에 다른 API 생성시, 이 템플릿 복붙 할 예정
   *       consumes:
   *         - application/json
   *       produces:
   *         - application/json
   *       parameters:
   *         - name: id
   *           in: query
   *           description: Meaningless test id
   *           required: true
   *           type: integer
   *       responses:
   *         200:
   *           description: success
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               state:
   *                 type: boolean
   *             example:
   *               id: 0
   *               state: true
   *         400:
   *           description: fail
   *           schema:
   *             type: object
   *             properties:
   *               state:
   *                 type: boolean
   *             example:
   *               state: false
   *       deprecated: true
   * 
   * 
   * 
   *     post:
   *       tags:
   *         - template
   *       summary: 다른 api 만들때 사용할 route 템플릿
   *       description: swagger API 명세 템플릿용 / deprecate 및 사용 안함. 말그대로 나중에 다른 API 생성시, 이 템플릿 복붙 할 예정
   *       consumes:
   *         - application/json
   *       produces:
   *         - application/json
   *       parameters:
   *         - name: id
   *           in: body
   *           description: Meaningless test object
   *           required: true
   *           schema:
   *             $ref: "#/definitions/ExampleModels"
   *       responses:
   *         200:
   *           description: success
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               sex:
   *                 type: string
   *               state:
   *                 type: boolean
   *             example:
   *               id: 0
   *               sex: M
   *               state: true
   *         400:
   *           description: fail
   *           schema:
   *             type: object
   *             properties:
   *               state:
   *                 type: boolean
   *             example:
   *               state: false
   *       deprecated: true
   * 
   * 
   * 
   *     put:
   *       tags:
   *         - template
   *       summary: 다른 api 만들때 사용할 route 템플릿
   *       description: swagger API 명세 템플릿용 / deprecate 및 사용 안함. 말그대로 나중에 다른 API 생성시, 이 템플릿 복붙 할 예정
   *       consumes:
   *         - application/json
   *       produces:
   *         - application/json
   *       parameters:
   *         - name: id
   *           in: body
   *           description: Meaningless test object
   *           required: true
   *           schema:
   *             $ref: "#/definitions/ExampleModels"
   *       responses:
   *         200:
   *           description: success
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               sex:
   *                 type: string
   *               state:
   *                 type: boolean
   *             example:
   *               id: 0
   *               sex: M
   *               state: true
   *         400:
   *           description: fail
   *           schema:
   *             type: object
   *             properties:
   *               state:
   *                 type: boolean
   *             example:
   *               state: false
   *       deprecated: true
   * 
   * 
   *   /template/{id}:
   *     delete:
   *       tags:
   *         - template
   *       summary: 다른 api 만들때 사용할 route 템플릿
   *       description: swagger API 명세 템플릿용 / deprecate 및 사용 안함. 말그대로 나중에 다른 API 생성시, 이 템플릿 복붙 할 예정
   *       consumes:
   *         - application/json
   *       produces:
   *         - application/json
   *       parameters:
   *         - name: id
   *           in: path
   *           description: Meaningless test id
   *           required: true
   *           type: integer
   *       responses:
   *         200:
   *           description: success
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *               state:
   *                 type: boolean
   *             example:
   *               id: 0
   *               sex: M
   *               state: true
   *         400:
   *           description: fail
   *           schema:
   *             type: object
   *             properties:
   *               state:
   *                 type: boolean
   *             example:
   *               state: false
   *       deprecated: true
   */

router.get('/', (req, res) => {
  const id = req.query.id;

  if (id === undefined){
    res.json({state: 400});
  } else {
    res.json({
      id: id,
      status: 200
    });
  }
});

router.post('/', (req, res) => {
  const id = req.body.id;
  const sex = req.body.sex;

  if (id === undefined || sex === undefined || (sex !== 'M' && sex !== 'F')){
    res.json({state: 400});
  } else {
    res.json({
      id: id,
      sex: sex,
      status: 200
    });
  }
});

router.put('/', (req, res) => {
  const id = req.body.id;
  const sex = req.body.sex;

  if (id === undefined || sex === undefined || (sex !== 'M' && sex !== 'F')){
    res.json({state: 400});
  } else {
    res.json({
      id: id,
      sex: sex,
      status: 200
    });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (id === undefined){
    res.json({state: 400});
  } else {
    res.json({
      id: id
    });
  }
});

module.exports = router;
