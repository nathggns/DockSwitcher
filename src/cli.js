import init from './init';
import { activateProfile, cloneProfile, getActiveProfile, getProfiles, updateProfile, verifyProfile } from './profiles';
import config from './config';

async function main() {
    const [ command, ...args ] = process.argv.slice(2);
    await init();

    if (config.verbose) {
        console.log('DockSwitcher debug info:');
        console.log('Using config', config);
        console.log('Active profile', await getActiveProfile());
    }

    switch (command) {
        case 'activate':
            await activateProfile(args[0]);
            break;

        case 'update':
            await updateProfile();
            console.log('Updated and verified');
            break;

        case 'verify':
            console.log(await verifyProfile());
            break;

        case 'list':
            console.log(await getProfiles());
            break;

        case 'get':
            console.log(await getActiveProfile());
            break;

        case 'new':
            await cloneProfile(args[0]);
            break;

        default:
            console.error('Usage: dockSwitcher [command]');
            process.exit(1);
    }
}

main().catch(err => console.error(err.stack));