
import { fetchUtils } from 'ra-core';

const authProvider = (apiUrl, httpClient = fetchUtils.fetchJson) => ({
    // authentication
    login: (params) => {
        //TODO  /login 
        return Promise.resolve();
    },
    checkError: (error) => {      
        const status = error.status;
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: (params) => {
        const url = `${apiUrl}/status`;
        return httpClient(url)
        .then(() => {
            return Promise.resolve();
        },()=>{return Promise.reject()});
    },
    logout: () => {
        console.log("Logout");
        //TODO redirect to LOGout
        return Promise.resolve();
    },
    getIdentity: () => {
        console.log("getIdentity");

        const url = `${apiUrl}/profile`;
        return httpClient(url)
            .then(({ json }) => {
                console.log("got identity response");
                if (!json.subjectId) {
                    throw new Error("invalid profile");
                }
                console.log("got profile", json);
                return Promise.resolve({
                    id: json.subjectId,
                    fullName: json.username,
                    ...json
                });
            });

    },
    getPermissions: () => {
        const url = `${apiUrl}/authorities`;
        return httpClient(url)
            .then(({ json }) => {
                console.log("got Persmissions", json);
                return Promise.resolve(json);
            });
    },
});

export default authProvider;