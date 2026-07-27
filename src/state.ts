
import { createInterface , type Interface} from "readline";
import { commandFetch } from "./command_fetch.js";
import { GHProfile } from "./githubpro.js";
export type State = {
    rl : Interface,
    commands : Record<string,CLICommand>,
    ghprofile:GHProfile,
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state:State,...args:string[]) => Promise<void>;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    fetch:{
      name:"fetch",
      description:"get the profile info",
      callback:commandFetch,
    }
  };
}


export function initState () : State{
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



