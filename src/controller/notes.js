import { create, update, read, destroy, keys } from '../api/service/note_ser';

export const add = (req, res, next) => {
    res.status(200).json();
}

export const save = (req, res, next) => {
    if (req.body.docreate === 'create') {
        create(req.body.notekey,
            req.body.title,
            req.body.body);
        setTimeout( () => {
            return res.status(200).json({ message: 'Create' });
        }, 500);
    } else {
        update(req.body.id, req.body.notekey,
            req.body.title,
            req.body.body);
        setTimeout( () => {
            return res.status(200).json({ message: 'Update' });
        }, 500);
    }

}
export const view = (req, res, next) => {
    if (req.query.id) {
        read(req.query.id).then( (val) => {
            return res.status(200).json(val);
        });
    }
    else {
        keys().then( (val) => {
            return res.status(200).json(val);
        })
    }

}
export const dodestroy = (req, res, next) => {
    destroy(req.body.id);
    setTimeout(() => {
        return res.status(200).json({ message: 'Delete' });
    }, 500);
}
