import MockDatabaseService from './class.mock.database.service.js';

let groupsDb;

export async function getGroupsDb() {
    if (!groupsDb) {
        groupsDb = new MockDatabaseService('./data/groups.json');
        await groupsDb.init();
    }
    return groupsDb;
}
