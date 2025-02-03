import Auth from './auth.js';

const domain = 'http://localhost:3000';

async function create(resource, data, auth = true) {
    const url = `${domain}${resource}`;

    // Detecta automaticamente se o `data` é `FormData`
    const isFormData = data instanceof FormData;

    const config = {
        method: 'POST',
        body: isFormData ? data : JSON.stringify(data),
        headers: {},
    };

    if (!isFormData) {
        config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    }

    if (auth) {
        config.headers.Authorization = `Bearer ${Auth.getToken()}`;
    }

    const res = await fetch(url, config);

    if (res.status === 401) {
        Auth.signout();
    }

    return await res.json();
}

//read
async function read(resource) {
    const url = `${domain}${resource}`;

    const config = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
        },
    };

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
            Authorization: `Bearer ${Auth.getToken()}`,
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
        headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
        },
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
async function addLike(pet_id, usuario_id) {
    try {
        const response = await create('/like', { pet_id, usuario_id });

        if (response.id_curtida) {
            console.log('Curtida adicionada com sucesso. ID:', response.id_curtida);
        } else {
            console.error('Erro ao adicionar a curtida');
        }
    } catch (error) {
        console.error('Erro ao adicionar curtida:', error);
    }
}



export default { create, read, update, remove, removerPet, addLike};