export enum HashType {
    ARTIFACT = 'ARTIFACT',
    LISTING = 'LISTING',
    PACKAGEPERMISSION = 'PACKAGEPERMISSION',
    SCREENSHOT = 'SCREENSHOT'
}

export function HashSalt(type: HashType) {
    let salt = '';
    switch (type) {
        case HashType.ARTIFACT:
            salt = 'artifact_S4Lt';
            break;
        case HashType.LISTING:
            salt = 'got_past_this_bitch_4';
            break;
        case HashType.SCREENSHOT:
            salt = 'TTours';
            break;
        case HashType.PACKAGEPERMISSION:
            salt = 'package_cc9';
            break;

        default:
            throw `unknown hash type: ${type}`;
    }
    return salt;
}
