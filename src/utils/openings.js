export const Nakhmanson = [
	["e4", "e5"],
	// ['Nf3', 'Nc6'],
	// ['Bc4', 'Nf6'],
	// ['d4', 'exd4'],
	// ['O-O', 'Nxe4'],
	// ['Nc3', 'dxc3'],
	["Bxf7", "Kxf7"],
	[
		"Qd5+",
		{
			"kg6": [
				["Qxe4+", "kf7"],
				["Bg5", "!"],
			],
			"kf6": [
				["Re1", "Bd6"],
				["Rxe4", {
                    "Nc5": [["b4", "Bxf3"]],
                    "Nc6": [["c5", "d8"]]
                }],
			],
			// ke7: [["Qxe4+", "?"], ["Ng5"]],
			"ke8": [["Re1", "!"]],
		},
	],
];
