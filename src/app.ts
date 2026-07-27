

import { GHProfile } from "./githubpro.js";

const form        = document.getElementById('lookup-form') as HTMLFormElement | null;
const usernameEl  = document.getElementById('username') as HTMLInputElement | null;
const submitBtn   = document.getElementById('submit-btn') as HTMLButtonElement | null;
const statusEl    = document.getElementById('status') as HTMLElement | null;
const card        = document.getElementById('card') as HTMLElement | null;

const avatarEl    = document.getElementById('avatar') as HTMLImageElement | null;
const nameEl      = document.getElementById('display-name') as HTMLElement | null;
const loginEl     = document.getElementById('login') as HTMLElement | null;
const bioEl       = document.getElementById('bio') as HTMLElement | null;
const reposStatEl = document.getElementById('stat-repos') as HTMLElement | null;
const followersEl = document.getElementById('stat-followers') as HTMLElement | null;
const followingEl = document.getElementById('stat-following') as HTMLElement | null;
const profileLink = document.getElementById('profile-link') as HTMLAnchorElement | null;
const reposList   = document.getElementById('repos') as HTMLElement | null;

if (!form || !usernameEl || !submitBtn || !statusEl || !card || !avatarEl || !nameEl || !loginEl || !bioEl || !reposStatEl || !followersEl || !followingEl || !profileLink || !reposList) {
    throw new Error('Required DOM elements not found. Check that the HTML contains all expected IDs.');
}

form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const username = usernameEl.value.trim();

    if (!username) return;

    statusEl.textContent = "Fetching...";
    submitBtn.disabled = true;

    try {
        const gh = new GHProfile();

        const user = await gh.fetchUser(username);
        const repos = await gh.fetchRepos(username);

        avatarEl.src = user.avatar_url;
        nameEl.textContent = user.name || user.login;
        loginEl.textContent = "@" + user.login;
        bioEl.textContent = user.bio || "";

        reposStatEl.textContent = String(user.public_repos);
        followersEl.textContent = String(user.followers);
        followingEl.textContent = String(user.following);

        profileLink.href = user.html_url;


        // Clear old repos
        reposList.innerHTML = "";

        // Render repos
        for (const repo of repos) {
            const item = document.createElement("div");

            item.className = "repo-item";

            item.innerHTML = `
                <a class="repo-name" href="${repo.html_url}" target="_blank">
                    ${repo.name}
                </a>
                <span class="repo-stars">
                    ★ ${repo.stargazers_count}
                </span>
            `;

            reposList.appendChild(item);
        }

        card.classList.add("visible");
        statusEl.textContent = "";

    } catch (error) {
        statusEl.textContent = "User not found or something went wrong";
        statusEl.classList.add("error");

    } finally {
        submitBtn.disabled = false;
    }
});