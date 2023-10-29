const BASE_API = 'http://vps39767.publiccloud.com.br/api'; //'http://vps39767.publiccloud.com.br/api'

export default {

    // User controller
    checkToken: async(token) => {
        let response = await fetch(`${BASE_API}/User/validateToken`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return false;        
    },
    signIn: async (username, password) => {
        let response = await fetch(`${BASE_API}/User/authenticate`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        let json = await response.json();
        return json;
    },
    signUp: async (username, password) => {
        let response = await fetch(`${BASE_API}/User`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        let json = await response.json();
        return json;
    },
    signInUpdate: async (username, password, token) => {
        let response = await fetch(`${BASE_API}/User`, {
            method: 'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({username, password})
        });
        let json = await response.json();
        return json;
    },
    signInRecovery: async (username) => {        
        let password = '-1';
        let response = await fetch(`${BASE_API}/User/recovery`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        let json = await response.json();
        return json;
    },

    // Trash controller
    postTrash: async (latitude, longitude, hasRoadcleanUp, howManyTimes, hasAccumulatedTrash, hasLandWeeding, token) => {
        let response = await fetch(`${BASE_API}/Trash`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({latitude, longitude, hasRoadcleanUp, howManyTimes, hasAccumulatedTrash, hasLandWeeding})
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return false;
    },

    // Light controller
    postLight: async (latitude, longitude, path, hasLight, isItWorking, hasLosesCable, token) => {
        let response = await fetch(`${BASE_API}/Light`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({latitude, longitude, path, hasLight, isItWorking, hasLosesCable})
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return false;
    },

    // Water controller
    postWater: async (latitude, longitude, hasWell, waterMissedInAWeek, homeWithWater, hasSanitationProject, token) => {
        let response = await fetch(`${BASE_API}/Water`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({latitude, longitude, hasWell, waterMissedInAWeek, homeWithWater, hasSanitationProject })
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return false;
    },

    // Sewer controller
    postSewer: async (latitude, longitude, hasHomeSewer, hasHomeCesspool, hasSanitationProject, token) => {
        let response = await fetch(`${BASE_API}/Sewer`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({latitude, longitude, hasHomeSewer, hasHomeCesspool, hasSanitationProject})
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return false;
    },

    // Asphalt controller
    postAsphalt: async (latitude, longitude, path, isPaved, hasHoles, hasPavedSidewalks, token) => {
        let response = await fetch(`${BASE_API}/Asphalt`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({latitude, longitude, path, isPaved, hasHoles, hasPavedSidewalks})
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return false;
    },

    // Collect controller
    postCollect: async (latitude, longitude, hasCollect, howManyTimes, token) => {
        let response = await fetch(`${BASE_API}/Collect`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({latitude, longitude, hasCollect, howManyTimes})
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return false;
    },

    // Map
    getMap: async (token) => {
        let response = await fetch(`${BASE_API}/Map`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return null;
    },

    getReport: async (token, id) => {
        let response = await fetch(`${BASE_API}/Map/report?userId=${id}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.status == 200)
        {
            let json = await response.json();
            return json;
        }
        else
            return null;
    }
};