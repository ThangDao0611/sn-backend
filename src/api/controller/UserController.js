    /**
     * Created by trungquandev.com's author on 16/10/2019.
     * src/controllers/Friend.js
     */
import { create, update, read, destroy, keys } from '../service/note_ser';

export const user = (req, res, next) => {
    
        keys().then( (val) => {
            return res.status(200).json(val);
        })
}