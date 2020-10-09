import "reflect-metadata";
import { metadata } from "./constants";
import { Command } from "./Command";
export class Container {
    constructor(commands) {
        this.args = Command();
        this.resolve(commands);
    }
    static run(commands) {
        return new Container(commands);
    }
    resolve(commands) {
        commands.forEach((command) => {
            const indentifier = Reflect.getMetadata(metadata.COMMAND_IDENTIFIER, command);
            if (this.args.input === indentifier) {
                let factory = new command();
                const options = Reflect.getMetadata(metadata.OPTION_IDENTIFIER, command);
                options.forEach((option) => {
                    const input = this.args.flags;
                    const value = input[`--${option.name}`];
                    if (value) {
                        factory[option.methodName](value, {
                            command: indentifier,
                            options,
                            instance: factory,
                        });
                    }
                });
            }
        });
    }
}
//# sourceMappingURL=Container.js.map