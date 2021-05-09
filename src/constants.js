export const BOARD_SIZE = 8;
export const WHITE = 1;
export const BLACK = 2;
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];
export const PIECE_TYPES = { 
    K: 'King', Q: 'Queen', B: 'Bishop', N: 'Knight', R: 'Rook', P: 'Pawn'
}
export const INIT_FEN_STR = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const BOARD_SQ_SIZE = 120;

export const PIECE_INT_MAP = {
    wP: 1, wR: 2, wN: 3, wB: 4, wQ: 5, wK: 6,
    bP: -1, bR: -2, bN: -3, bB: -4, bQ: -5, bK: -6,
    EMPTY: 0,
}

export const FILES_MAP = {
    a: 0, b: 1, c: 2, d: 3, e:4, f:5, g:6, h: 7, NONE: 8
}

export const RANKS_MAP = {
    '1': 0, '2': 1, '3': 2, '4': 3, 
    '5':  4, '6': 5, '7': 6, '8': 7
    // RANK_1: 0, RANK_2: 1, RANK_3: 2, RANK_4: 3, 
    // RANK_5:  4, RANK_6: 5, RANK_7: 6, RANK_8: 7
}

export const SQUARES = {
    A1: 21, B1: 22, C1: 23, D1: 24, E1: 25, F1: 26, G1: 27, H1: 28,
    A8: 91, B8: 92, C8: 93, D8: 94, E8: 95, F8: 96, G8: 97, H8: 98,
    NO_SQ: 99, OFFBOARD: 100
}

/**
 * 0001
 * 0010
 * 0100
 * 1000
 */
export const CASTLEBIT = {
    WKCA: 1,    // White King Side 0001
    WQCA: 2,    // White Queen Side 0010
    BKCA: 4,    // Black King Side 0100
    BQCA: 8     // Black Queen Side 1000
}