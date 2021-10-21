/**
 *
 * @param byteNumber Take a byte number input and output a human readable string
 * @returns a human readable string
 */
export function formatByteString(byteNumber: number) {
    const units = [
        ' Bytes',
        ' KB',
        ' MB',
        ' GB',
        ' TB',
        ' PB',
        ' EB',
        ' ZB',
        ' YB'
    ];

    for (let i = 1; i < units.length; i++) {
        if (byteNumber < Math.pow(1024, i)) {
            const str =
                Math.round((byteNumber / Math.pow(1024, i - 1)) * 100) / 100;
            return str + units[i - 1];
        }
    }
    return byteNumber;
}
