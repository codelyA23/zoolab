const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';

async function testCRUD() {
    console.log('🧪 Testing CRUD Operations...');

    // 1. Test GET
    console.log('\nPlease ensure server is running...');
    try {
        const getRes = await fetch(`${BASE_URL}/animals`);
        console.log(`GET /animals status: ${getRes.status}`);
    } catch(e) {
        console.error("GET failed", e.message);
        return; // Server likely down
    }

    // 2. Test POST (Add)
    let newId = null;
    const newAnimal = {
        name: "TestAnimal_" + Date.now(),
        species_id: 1, // Assuming species 1 exists
        habitat_id: 1, // Assuming habitat 1 exists
        gender: "Female",
        date_of_birth: "2020-01-01",
        microchip_id: "TEST-" + Date.now()
    };

    try {
        console.log(`\nAttempting POST /animals with:`, newAnimal);
        const postRes = await fetch(`${BASE_URL}/animals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAnimal)
        });
        const postData = await postRes.json();
        console.log(`POST Status: ${postRes.status}`);
        if(postRes.status === 200 || postRes.status === 201) {
            newId = postData.data.id;
            console.log('✅ Created Animal ID:', newId);
        } else {
            console.log('❌ POST Failed:', postData);
        }
    } catch(e) {
        console.error("POST Request Error:", e.message);
    }

    if (!newId) return;

    // 3. Test PUT (Update)
    try {
        console.log(`\nAttempting PUT /animals/${newId}`);
        const updateData = {
            name: newAnimal.name + "_Updated",
            species_id: 1,
            habitat_id: 1,
            gender: "Male"
        };
        const putRes = await fetch(`${BASE_URL}/animals/${newId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });
        const putJson = await putRes.json();
        console.log(`PUT Status: ${putRes.status}`, putJson);
    } catch(e) {
        console.error("PUT Request Error:", e.message);
    }

    // 4. Test DELETE
    try {
        console.log(`\nAttempting DELETE /animals/${newId}`);
        const delRes = await fetch(`${BASE_URL}/animals/${newId}`, {
            method: 'DELETE'
        });
        const delJson = await delRes.json();
        console.log(`DELETE Status: ${delRes.status}`, delJson);
    } catch(e) {
        console.error("DELETE Request Error:", e.message);
    }
}

testCRUD();
