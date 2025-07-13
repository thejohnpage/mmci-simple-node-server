import express from 'express';
const router = express.Router();
import { getContactsDb } from '../services/contacts-db.js';
import { getGroupsDb } from '../services/groups-db.js';

const contactsDb = await getContactsDb();
const groupsDb = await getGroupsDb();

const allContacts = await contactsDb.getItems();
const allGroups = await groupsDb.getItems();

const groupsInUse =  initGroupsInUse(allContacts);
// const groups = await getGroups();

function initGroupsInUse(contacts) {

    let groupSet = new Set();
    for (let contact of contacts.items) {
        for (let group of contact.groups) {
            const grp = allGroups.items.find(g => g.name === group);
            groupSet.add(grp);
        }
    }

    return groupSet;
}

function queryByGroupSlug(groupSlug) {

    const group = allGroups.items.find(g => g.slug === groupSlug);
    const results = [];
    if(groupsInUse.has(group)) {
        for (let contact of allContacts.items) {
            if (contact.groups.indexOf(group.name) !== -1 ) {
                results.push(contact);
            }
        }
    }
    return results;
}

function   generateSlug(name){
    return name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}


router.get('/', function (request, response, next) {
    if (allGroups.items.length === 0) {
        response.sendStatus(404);
    } else {
        const results = [];
        for (let group of allGroups.items) {
            results.push(group);
        }
        response.json(results);
    }
});

router.get('/used', (req, res) => {
    res.json(Array.from(groupsInUse.values()).map(g => g.name).join(', '));
})


router.get('/group/:group', function (request, response, next) {
    const group = request.params.group;
    const slug = generateSlug(group);
    const results = queryByGroupSlug(slug);
    if (results.size === 0) {
        response.sendStatus(404);
    } else {
        response.json(results);
    }
});

export default router; // ✅ ESM export

