export class GHProfile {
    static baseURL = "https://api.github.com";
    constructor() { }
    async fetchUser(username) {
        const url = `${GHProfile.baseURL}/users/${username}`;
        const resp = await fetch(url, {
            method: "GET",
        });
        if (!resp.ok) {
            throw new Error("Somthing is wrong");
        }
        const data = await resp.json();
        const user = {
            avatar_url: data.avatar_url,
            login: data.login,
            name: data.name,
            html_url: data.html_url,
            bio: data.bio,
            followers: data.followers,
            following: data.following,
            public_repos: data.public_repos,
        };
        return user;
    }
    async fetchRepos(username) {
        const url = `${GHProfile.baseURL}/users/${username}/repos?sort=created&per_page=100`;
        const resp = await fetch(url, {
            method: "GET",
        });
        if (!resp.ok) {
            throw new Error("Somthing is wrong");
        }
        const data = await resp.json();
        const repos = data.map((repo) => ({
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
            created_at: repo.created_at,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
        }));
        return repos;
    }
}
