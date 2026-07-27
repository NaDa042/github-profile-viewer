import { createInterface } from "readline";
import { commandFetch } from "./command_fetch.js";
import { GHProfile } from "./githubpro.js";
export function getCommands() {
    return {
        fetch: {
            name: "fetch",
            description: "get the profile info",
            callback: commandFetch,
        }
    };
}
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "GitHub profile >  ",
    });
    const commands = getCommands();
    const ghprofile = new GHProfile();
    return {
        rl,
        commands,
        ghprofile,
    };
}
