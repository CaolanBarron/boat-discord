import dotenvx from '@dotenvx/dotenvx';

console.log('Before initialization', process.env);
dotenvx.config();
console.log('After initialization', process.env);

function validateEnvironment() {
    const token = process.env.TOKEN;
    if (!token) {
        throw new Error('Missing TOKEN environmental variable');
    }

    const clientId = process.env.CLIENTID;
    if (!clientId) {
        throw new Error('Missing the CLIENTID environmental varible');
    }

    const gamePlayChannel = process.env.GAMEPLAYCHANNEL;
    if (!gamePlayChannel) {
        throw new Error('Missing the GAMEPLAYCHANNEL environmental variable');
    }

    const notificationChannel = process.env.NOTICHANNEL;
    if (!notificationChannel) {
        throw new Error('Missing the NOTICHANNEL environmental variable');
    }

    const botName = process.env.BOTNAME;
    if (!botName) {
        throw new Error('Missing the BOTNAME environmental variable');
    }

    const databaseUrl = process.env.DATABASEURL;
    if (!databaseUrl) {
        throw new Error('Missing the DATABASEURL environmental variable');
    }

    const devId = process.env.DEVID;
    if (!devId) {
        throw new Error('Missing the DEVID environmental variable');
    }

    const activityExecutionTime = process.env.ACTIVITY_EXEC_TIME;
    if (!activityExecutionTime) {
        throw new Error(
            'Missing the Activity Execution Time environmental variable',
        );
    }
}

export { validateEnvironment };
