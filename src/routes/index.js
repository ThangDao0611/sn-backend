import { Router } from 'express';
let router = Router();
import { keys } from '../models/notes';

/* GET home page. */

router.get('/', function (req, res, next) {
  keys().then(function (val) {
    return res.json(val);
    /*res.render('index.ejs', {
      title: 'Note',
      keys: val
    })*/
  });
});

export default router;
