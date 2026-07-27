export function commandExit(state) {
    console.log("Closing the Program... Goodbye!");
    state.rl.close();
    process.exit(0);
}
