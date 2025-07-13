import express from 'express';
const router = express.Router();
import { getContactsDb } from '../services/contacts-db.js';
const contactsDb = await getContactsDb();

router.get('/', async (request, res, next) => {
    const paramKeys = Object.keys(request.query);

    if(paramKeys.length === 0){
        res.json(await contactsDb.getItems());
    } else {
        const filter = {key: '', value: ''};
        filter.key = paramKeys[0];
        filter.value = request.query[paramKeys[0]];
        res.json(await contactsDb.getItemsByFilter(filter));
    }

});

export default router; // ✅ ESM export

