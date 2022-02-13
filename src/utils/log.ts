const Logger = console.log;
const IDENTIFIER = '[GITTOOL]';

const log = (...msg: string[]): void => Logger(IDENTIFIER, msg.join(`\n${IDENTIFIER} `));

export default log;