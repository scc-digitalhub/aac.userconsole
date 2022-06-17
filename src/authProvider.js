
import { fetchUtils } from 'ra-core';

const authProvider = (apiUrl, httpClient = fetchUtils.fetchJson) => ({
    // authentication
    login: (params) => {
        return Promise.resolve();
    },
    checkError: (error) => {
        return Promise.resolve();
    },
    checkAuth: (params) => {
        console.log("checkAuth", params);
        return Promise.resolve();
    },
    logout: () => {
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
        console.log("getPermissions");
        return Promise.resolve(['user'])
    },
});

export default authProvider;