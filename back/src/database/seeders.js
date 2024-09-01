import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Pets from '../models/Pets.js';

async function up() {
    const file = resolve('src', 'database', 'seeders.json');

    const seed = JSON.parse(readFileSync(file));

    for (const pet of seed.pets) {
        await Pets.create(pet);
    }
}

export default { up };