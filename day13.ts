import * as files from 'fs';

const input: Array<string> = files.readFileSync('input/day13.txt').toString().split('\n');
const timestamp: number = Number(input[0]);
const buses: Array<number> = input[1].split(',').map(bus => bus === 'x' ? -1 : Number(bus));

const readkey = async () => {
    process.stdin.setRawMode(true);

    return new Promise<void>(resolve => process.stdin.once('data', data => {
        const byteArray: Array<number> = [...data];
        if (byteArray.length > 0 && byteArray[0] === 3) process.exit(0);

        process.stdin.setRawMode(false);
        resolve();
    }));
};

(async () => {
    let i: number = timestamp;

    while (true) {
        for (const bus of buses) {
            if (bus !== -1 && i % bus === 0) {
                console.log('Day 13A: The earliest bus you can take is ' + bus + ' meaning that the searched value is ' + bus * (i - timestamp));
                return;
            }
        }

        i++;
    }
})();

(async () => {
    const highest: number = new Array<number>(...buses).sort((a, b) => b - a)[0];
    const highestIndex: number = buses.indexOf(highest);
    const length: number = buses.length;
    const offsets: Array<number> = new Array<number>();

    for (let i = 0; i < buses.length; i++) offsets[i] = i - highestIndex;

    let i: number = highest;
    let highestRow: number = 0;

    while (true) {
        i += highest;

        let row: number = 0;

        for (let j = 0; j < buses.length; j++) {
            const bus: number = buses[j];

            // console.log(i, high est, offsets[j], bus, i + offsets[j], (i + offsets[j]) % bus);

            if ((i + offsets[j]) % bus === 0) {
                row++;
            } else {
                break;
            }
        }

        // console.log(row);
        // console.log(i);

        if (highestRow < row) {
            highestRow = row;
            console.log('Day 13B: Currently highest row ' + row + ' / ' + length);
        }

        if (row === length) {
            console.log('Day 13B: The searched timestamp is ' + (i - highestIndex));
            break;
        }

        // await readkey();
    }
})();