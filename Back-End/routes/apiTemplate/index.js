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
   *                 type: integer
   *             example:
   *               id: 0
   *               state: 200
   *         422:
   *           description: fail
   *           schema:
   *             $ref: "#/definitions/ValidatorErrorModels"
   *       deprecated: true
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
   *                 type: integer
   *             example:
   *               id: 0
   *               sex: M
   *               state: 200
   *         422:
   *           description: fail
   *           schema:
   *             $ref: "#/definitions/ValidatorErrorModels"
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
   *                 type: integer
   *             example:
   *               id: 0
   *               sex: M
   *               state: 200
   *         422:
   *           description: fail
   *           schema:
   *             $ref: "#/definitions/ValidatorErrorModels"
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
   *                 type: integer
   *             example:
   *               id: 0
   *               sex: M
   *               state: 200
   *         422:
   *           description: fail
   *           schema:
   *             $ref: "#/definitions/ValidatorErrorModels"
   *       deprecated: true
   */

import express from 'express';
import { check, validationResult } from "express-validator/check";

const router = express.Router();

router.get('/', [
  check('id').exists().isInt().withMessage('id must be an int').toInt()
], (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const id = parseInt(req.query.id);

    return res.jsonp({
      id: id,
      state: 200
    });
  } else {
    return res.status(422).jsonp({ errors: errors.array()});
  }
});

router.post('/', [
  check('id').exists().isInt().withMessage('id must be an int').toInt(),
  check('sex').exists().isIn(['M', 'F', 'm', 'f']).withMessage('sex must have \'M\' or \'F\'.')
], (req, res) => {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    const id = req.body.id;
    const sex = req.body.sex.toUpperCase();

    res.jsonp({
      id: id,
      sex: sex,
      state: 200
    });
  } else {
    return res.status(422).jsonp({ errors: errors.array()});
  }
});

router.put('/', [
  check('id').exists().isInt().withMessage('id must be an int').toInt(),
  check('sex').exists().isIn(['M', 'F', 'm', 'f']).withMessage('sex must have \'M\' or \'F\'.')
], (req, res) => {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    const id = req.body.id;
    const sex = req.body.sex.toUpperCase();

    res.jsonp({
      id: id,
      sex: sex,
      state: 200
    });
  } else {
    return res.status(422).jsonp({ errors: errors.array()});
  }
});

router.delete('/:id', [
  check('id').exists().isInt().withMessage('id must be an int').toInt()
], (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const id = req.params.id;

    return res.jsonp({
      id: id,
      state: 200
    });
  } else {
    return res.status(422).jsonp({ errors: errors.array()});
  }
});

module.exports = router;
