export async function commandFetch(state, username) {
    const user = await state.ghprofile.fetchUser(username);
    const repos = await state.ghprofile.fetchRepos(username);
    for (const info of Object.entries(user)) {
        console.log(info);
    }
    for (const repo of repos) {
        for (const info of Object.entries(repo)) {
            console.log(info);
        }
    }
}
