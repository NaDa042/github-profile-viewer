export function cleanInput(input) {
    const words = input.toLowerCase().trim().split(/\s+/).filter((word) => word.length > 0);
    return words;
}
export async function startREPL(state) {
    state.rl.prompt();
    state.rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length == 0) {
            state.rl.prompt();
            return;
        }
        const commandName = words[0];
        const command = state.commands[commandName];
        if (command) {
            try {
                await command.callback(state, ...words.slice(1));
            }
            catch (err) {
                console.log("Unknown command");
            }
        }
        state.rl.prompt();
    });
}
