


export class GHProfile {
    private static readonly baseURL = "https://api.github.com";

    constructor(){}

    async fetchUser(username:string): Promise<User>{

        const url = `${GHProfile.baseURL}/users/${username}`;

        const resp = await fetch(url,{
            method:"GET",
        })
        if(!resp.ok){
            throw new Error("Somthing is wrong");
        }
        const data = await resp.json();

        const user: User = {
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

    async fetchRepos(username:string) : Promise<Repo[]>{
        const url = `${GHProfile.baseURL}/users/${username}/repos?sort=created&per_page=100`;
        const resp = await fetch(url,{
            method:"GET",
        })
        if(!resp.ok){
            throw new Error("Somthing is wrong");
        }
        const data = await resp.json();

        const repos: Repo[] = data.map((repo: any) => ({
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

export type User = {
    avatar_url:string,
    login:string,
    name:string|null,
    html_url :string,
    bio:string|null,
    followers:number,
    following:number,
    public_repos:number,
}

export type Repo = {
    name :string,
    html_url:string,
    description:string|null,
    created_at:string,
    language: string | null,
    stargazers_count :number,
}