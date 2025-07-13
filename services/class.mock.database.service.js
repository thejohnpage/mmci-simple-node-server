import { readFile } from 'fs/promises';

export default class MockDatabaseService {
    mockData = { items: [] };
    fileName;

    constructor(fileName) {
        this.fileName = fileName;
    }

    async init() {
        this.mockData.items = await this.populate(this.fileName);
    }

    async populate(fileName) {
        try {
            const jsonData = await readFile(fileName, 'utf-8');
            const parsed = JSON.parse(jsonData);
            return parsed.items || [];
        } catch (err) {
            console.error(`Failed to load data from ${fileName}:`, err);
            return [];
        }
    }

    async addItem(item, returnItems = true) {
        const { count } = await this.getItemsCount();
        item.id = count + 1;
        const newItem = { ...item };
        this.mockData.items.push(newItem);
        return returnItems ? this.getItems() : { item: newItem };
    }

    async getItems(includeNulls = false) {
        const items = includeNulls
            ? this.mockData.items
            : this.mockData.items.filter(Boolean);
        return { items };
    }

    async getItemById(id) {
        const index = this.mockData.items.findIndex(obj => obj && obj.id === parseInt(id));
        return { item: index !== -1 ? this.mockData.items[index] : null };
    }

    async getItemsByFilter(filter) {
        const { key, value } = filter;
        const needle = value.toLowerCase();

        const items = this.mockData.items.filter(obj => {
            const field = obj[key];
            if (!field) return false;
            if (typeof field === 'string') return field.toLowerCase().includes(needle);
            if (Array.isArray(field)) {
                return field.some(item =>
                    typeof item === 'string' && item.toLowerCase().includes(needle)
                );
            }
            return false;
        });

        return { items };
    }

    async updateItem(id, item, returnItems = true) {
        const index = this.mockData.items.findIndex(obj => obj && obj.id === parseInt(id));
        this.mockData.items[index] = { ...this.mockData.items[index], ...item };
        const updatedItem = this.mockData.items[index];
        return returnItems ? this.getItems() : { item: updatedItem };
    }

    async deleteItem(id, returnItems = true) {
        const index = this.mockData.items.findIndex(obj => obj && obj.id === parseInt(id));
        const item = this.mockData.items[index];
        delete this.mockData.items[index]; // sets entry to undefined
        return returnItems ? this.getItems() : { deletedItem: item };
    }

    async getItemsCount(includeNull = true) {
        const count = includeNull
            ? this.mockData.items.length
            : this.mockData.items.filter(Boolean).length;
        return { count };
    }

    async deleteLastEntry() {
        this.mockData.items.pop();
    }
}
