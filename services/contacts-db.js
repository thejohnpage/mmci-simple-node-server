import MockDatabaseService from './class.mock.database.service.js';

let contactsDb;

export async function getContactsDb() {
    if (!contactsDb) {
        contactsDb = new MockDatabaseService('./data/contacts.json');
        await contactsDb.init();
    }
    return contactsDb;
}
