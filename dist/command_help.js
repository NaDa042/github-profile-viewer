export function commandHelp(state) {
    console.log("Welcome to GitHub Profile Viewer!\nUsage:\n");
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}
