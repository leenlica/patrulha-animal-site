const domain = 'http://localhost:3000';

async function create(resource, data) {
    const url = `${domain}${resource}`;

    const config = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    };

    const res = await fetch(url, config);

    return await res.json();
}
//read
async function read(resource) {
    const url = `${domain}${resource}`;

    const res = await fetch(url);

    return await res.json();
}

//update
async function update(resource, data) {
    const url = `${domain}${resource}`;

    const config = {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    };

    const res = await fetch(url, config);

    return await res.json();
}
//delete
async function remove(resource) {
    const url = `${domain}${resource}`;

    const config = {
        method: 'DELETE',
        mode: 'cors',
    };

    await fetch(url, config);
}

//remover por id

async function removerPet(id) {
    const resource = `/pets/${id}`;

    try {
        await remove(resource);
        console.log(`Pet com ID ${id} removido.`);
    } catch (error) {
        console.error(`Erro ao remover pet com ID ${id}:`, error);
        throw error;
    }
}

export default { create, read, update, remove, removerPet };