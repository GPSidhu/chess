import {
    FILES_MAP,
    RANKS_MAP
} from '../constants';

/* ****************** Board ********************
        0   1   2   3   4   5   6   7   8   9
        10  11  12  13  14  15  16  17  18  19
    1   20  21  -   -   -   -   -   -   28  29
R   2   30  -   -   -   -   -   -   -   -   39
a   3   40  -   -   -   -   -   -   -   -   49
n   4   50  -   -   -   -   -   -   -   -   59
k   5   60  -   -   -   -   -   -   -   -   69
s   6   70  -   -   -   -   -   -   -   -   79
    7   80  -   -   -   -   -   -   -   -   89
    8   90  91  -   -   -   -   -   -   98  99
        100 101 102 103 104 105 106 107 108 109
        110 111 112 113 114 115 116 117 118 119
Files =>    a   b   c   d   e   f   g   h
* ***********************************************/

// Convert file-Rank to square number on above board
// e.g a1 = 21, g7 = 87, c4 = 53
export function FRToSquare(file, rank) {
    return (21 + file) + (rank * 10);
}

// Convert file-Rank to square number on above board
// e.g a1 = 21, g7 = 87, c4 = 53
export function fileRankStrToSquare(fr='') {
    if (!fr) 
        return -1;
    let ar = fr.split('');
    return FRToSquare(FILES_MAP[ar[0]], RANKS_MAP[ar[1]]);
}


// Convert FEN string to 8x8 board
// Convert 8x8 matrix to FEN

export function convertFENtoVector(fenStr="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
    try {
        const pos = fenStr.split(' ')[0];
        console.log(pos)
    } catch(e) {
        console.error(e)
    }
}

