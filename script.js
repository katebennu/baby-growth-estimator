// WHO Growth Data - Weight
const boysWeightData = [
    [0,0.3487,3.3464,0.14602,2.459312,2.603994,2.757621,3.027282,3.3464,3.686659,4.011499,4.214527,4.419354],
    [1,0.2297,4.4709,0.13395,3.39089,3.566165,3.752603,4.080792,4.4709,4.889123,5.290726,5.542933,5.798331],
    [2,0.197,5.5675,0.12385,4.31889,4.522344,4.738362,5.117754,5.5675,6.048448,6.509323,6.798348,7.090758],
    [3,0.1738,6.3762,0.11727,5.018434,5.240269,5.475519,5.888058,6.3762,6.897306,7.395936,7.708329,8.024169],
    [4,0.1553,7.0023,0.11316,5.561377,5.797135,6.046988,6.484777,7.0023,7.554286,8.082087,8.412602,8.746662],
    [5,0.1395,7.5105,0.1108,5.996672,6.244465,6.507016,6.966941,7.5105,8.090161,8.644384,8.991445,9.342238],
    [6,0.1257,7.934,0.10958,6.352967,6.611702,6.885864,7.366195,7.934,8.539707,9.119041,9.481939,9.848832],
    [7,0.1134,8.297,0.10902,6.653301,6.922131,7.207057,7.706413,8.297,8.927371,9.530656,9.908738,10.29113],
    [8,0.1021,8.6151,0.10882,6.913126,7.19127,7.486158,8.003205,8.6151,9.268678,9.894622,10.28713,10.68428],
    [9,0.0917,8.9014,0.10881,7.144822,7.431644,7.735837,8.26946,8.9014,9.5769,10.22433,10.63055,11.04177],
    [10,0.082,9.1649,0.10891,7.356558,7.651572,7.964565,8.5139,9.1649,9.861313,10.5293,10.94868,11.37341],
    [11,0.073,9.4122,0.10906,7.55441,7.857229,8.178615,8.742959,9.4122,10.12867,10.81641,11.24845,11.6862],
    [12,0.0644,9.6479,0.10925,7.742219,8.052577,8.382077,8.960956,9.6479,10.38387,11.09087,11.53526,11.98574],
    [13,0.0563,9.8749,0.10949,7.922091,8.239848,8.577324,9.170505,9.8749,10.63014,11.35618,11.81281,12.27589],
    [14,0.0487,10.0953,0.10976,8.095984,8.421033,8.76637,9.373665,10.0953,10.86959,11.61449,12.08325,12.55884],
    [15,0.0413,10.3108,0.11007,8.265127,8.597424,8.950586,9.571948,10.3108,11.10416,11.86797,12.34891,12.83707],
    [16,0.0343,10.5228,0.11041,8.430734,8.770274,9.13126,9.7667,10.5228,11.33528,12.11808,12.61125,13.11206],
    [17,0.0275,10.7319,0.11079,8.593128,8.939942,9.308795,9.958406,10.7319,11.5637,12.36571,12.87128,13.38491],
    [18,0.0211,10.9385,0.11119,8.752902,9.107002,9.483736,10.14755,10.9385,11.7897,12.61101,13.12906,13.65558],
    [19,0.0148,11.143,0.11164,8.909889,9.27136,9.656076,10.33431,11.143,12.01396,12.855,13.38579,13.92552],
    [20,0.0087,11.3462,0.11211,9.065209,9.434095,9.826848,10.51961,11.3462,12.23713,13.09811,13.64181,14.19492],
    [21,0.0029,11.5486,0.11261,9.219037,9.595435,9.996335,10.70383,11.5486,12.45983,13.3411,13.89795,14.46469],
    [22,-0.0028,11.7504,0.11314,9.371554,9.755556,10.16471,10.88716,11.7504,12.6823,13.58426,14.15453,14.7352],
    [23,-0.0083,11.9514,0.11369,9.522741,9.914417,10.33191,11.06946,11.9514,12.90424,13.82718,14.41108,15.0059],
    [24,-0.0137,12.1515,0.11426,9.672527,10.07194,10.49784,11.25065,12.1515,13.12555,14.06979,14.66753,15.27674]
];

const girlsWeightData = [
    [0,0.3809,3.2322,0.14171,2.394672,2.532145,2.677725,2.932331,3.2322,3.55035,3.852667,4.040959,4.23043022],
    [1,0.1714,4.1873,0.13724,3.161067,3.326209,3.502477,3.814261,4.1873,4.590075,4.979539,5.225436,5.4754539],
    [2,0.0962,5.1282,0.13,3.941053,4.13172,4.335355,4.695944,5.1282,5.596104,6.049862,6.337067,6.62967897],
    [3,0.0402,5.8458,0.12619,4.53604,4.745935,4.970282,5.368044,5.8458,6.364222,6.868317,7.188096,7.51447955],
    [4,-0.005,6.4237,0.12402,5.013368,5.238858,5.480078,5.90832,6.4237,6.984281,7.530756,7.87815,8.23331075],
    [5,-0.043,6.8985,0.12274,5.403844,5.642267,5.897544,6.351329,6.8985,7.495018,8.077933,8.449225,8.82941522],
    [6,-0.0756,7.297,0.12204,5.729383,5.97888,6.246243,6.72212,7.297,7.925102,8.540297,8.93289,9.33549062],
    [7,-0.1039,7.6422,0.12178,6.008387,6.267836,6.546104,7.042017,7.6422,8.299352,8.94444,9.356859,9.78039888],
    [8,-0.1288,7.9487,0.12181,6.253445,6.522061,6.810403,7.324907,7.9487,8.633118,9.306424,9.737639,10.1810939],
    [9,-0.1507,8.2254,0.12199,6.472906,6.750018,7.047717,7.579535,8.2254,8.935413,9.63531,10.08429,10.5466186],
    [10,-0.17,8.48,0.12223,6.673828,6.958886,7.265345,7.813398,8.48,9.214115,9.939115,10.4049,10.8851054],
    [11,-0.1872,8.7192,0.12247,6.862262,7.15483,7.46957,8.032975,8.7192,9.476145,10.22495,10.7067,11.2038881],
    [12,-0.2024,8.9481,0.12268,7.042612,7.342376,7.665043,8.24313,8.9481,9.726833,10.49835,10.99531,11.5086985],
    [13,-0.2158,9.1699,0.12283,7.217847,7.524538,7.854825,8.446994,9.1699,9.969431,10.76258,11.27401,11.8028109],
    [14,-0.2278,9.387,0.12294,7.389684,7.70313,8.040838,8.646697,9.387,10.20666,11.02071,11.54612,12.0897773],
    [15,-0.2384,9.6008,0.12299,7.559527,7.879566,8.224501,8.843658,9.6008,10.43988,11.27403,11.81285,12.3707367],
    [16,-0.2478,9.8124,0.12303,7.727588,8.054179,8.406286,9.038616,9.8124,10.67062,11.52454,12.07652,12.6483665],
    [17,-0.2562,10.0226,0.12306,7.894535,8.227652,8.586898,9.232317,10.0226,10.89976,11.77319,12.33814,12.9237235],
    [18,-0.2637,10.2315,0.12309,8.060311,8.399952,8.766325,9.424795,10.2315,11.12747,12.02024,12.59804,13.1972107],
    [19,-0.2703,10.4393,0.12315,8.224599,8.570832,8.944403,9.616043,10.4393,11.3542,12.26642,12.85712,13.4699234],
    [20,-0.2762,10.6464,0.12323,8.387882,8.74076,9.121584,9.806487,10.6464,11.58033,12.51209,13.11573,13.7422028],
    [21,-0.2815,10.8534,0.12335,8.55031,8.909946,9.298148,9.996544,10.8534,11.80669,12.75831,13.37511,14.0154884],
    [22,-0.2862,11.0608,0.1235,8.712397,9.078906,9.474611,10.18672,11.0608,12.03376,13.00554,13.6357,14.2901756],
    [23,-0.2903,11.2688,0.12369,8.8741,9.247632,9.651002,10.37713,11.2688,12.26184,13.25422,13.89801,14.5668755],
    [24,-0.2941,11.4775,0.1239,9.035869,9.416516,9.827655,10.56799,11.4775,12.49092,13.50419,14.16181,14.8452857]
];

// WHO Growth Data - Length
const boysLengthData = [
    [0,1,49.8842,0.03795,46.09799,46.77032,47.45809,48.60732,49.8842,51.16108,52.31031,52.99808,53.67041],
    [1,1,54.7244,0.03557,50.83131,51.52262,52.2298,53.41147,54.7244,56.03733,57.219,57.92618,58.61749],
    [2,1,58.4249,0.03424,54.42396,55.13442,55.8612,57.0756,58.4249,59.7742,60.9886,61.71538,62.42584],
    [3,1,61.4292,0.03328,57.34047,58.06652,58.80924,60.0503,61.4292,62.8081,64.04916,64.79188,65.51793],
    [4,1,63.886,0.03257,59.72447,60.46344,61.21939,62.48254,63.886,65.28946,66.55261,67.30856,68.04753],
    [5,1,65.9026,0.03204,61.67956,62.42946,63.19658,64.4784,65.9026,67.3268,68.60862,69.37574,70.12564],
    [6,1,67.6236,0.03165,63.34303,64.10314,64.88071,66.18,67.6236,69.0672,70.36649,71.14406,71.90417],
    [7,1,69.1645,0.03139,64.82235,65.5934,66.38216,67.70013,69.1645,70.62887,71.94684,72.7356,73.50665],
    [8,1,70.5994,0.03124,66.18835,66.97163,67.77291,69.1118,70.5994,72.087,73.42589,74.22717,75.01045],
    [9,1,71.9687,0.03117,67.48217,68.27886,69.09384,70.45564,71.9687,73.48176,74.84356,75.65854,76.45523],
    [10,1,73.2812,0.03118,68.71138,69.52286,70.35297,71.74005,73.2812,74.82235,76.20943,77.03954,77.85102],
    [11,1,74.5388,0.03125,69.88013,70.70738,71.55363,72.96769,74.5388,76.10991,77.52397,78.37022,79.19748],
    [12,1,75.7488,0.03137,70.99632,71.84023,72.70353,74.14605,75.7488,77.35155,78.79407,79.65737,80.50128],
    [13,1,76.9186,0.03154,72.06657,72.92816,73.80954,75.28228,76.9186,78.55492,80.02766,80.90904,81.77063],
    [14,1,78.0497,0.03174,73.09511,73.97491,74.87492,76.37879,78.0497,79.72061,81.22448,82.12449,83.0043],
    [15,1,79.1458,0.03197,74.08522,74.98384,75.9031,77.43914,79.1458,80.85246,82.3885,83.30776,84.20638],
    [16,1,80.2113,0.03222,75.04248,75.96033,76.89925,78.46814,80.2113,81.95446,83.52335,84.46227,85.38012],
    [17,1,81.2487,0.0325,75.96753,76.90533,77.86466,79.46765,81.2487,83.02975,84.63274,85.59207,86.52987],
    [18,1,82.2587,0.03279,76.86417,77.8221,78.80202,80.43942,82.2587,84.07798,85.71538,86.6953,87.65323],
    [19,1,83.2418,0.0331,77.73119,78.70973,79.71074,81.38338,83.2418,85.10022,86.77286,87.77387,88.75241],
    [20,1,84.1996,0.03342,78.5717,79.57106,80.59338,82.30162,84.1996,86.09758,87.80582,88.82814,89.8275],
    [21,1,85.1348,0.03376,79.3865,80.40724,81.45143,83.19621,85.1348,87.07339,88.81817,89.86236,90.8831],
    [22,1,86.0477,0.0341,80.17925,81.22133,82.28734,84.06859,86.0477,88.02681,89.80806,90.87407,91.91615],
    [23,1,86.941,0.03445,80.95077,82.01447,83.1026,84.92082,86.941,88.96118,90.7794,91.86753,92.93123],
    [24,1,87.8161,0.03479,81.70586,82.79087,83.9008,85.75545,87.8161,89.87675,91.7314,92.84133,93.92634]
];

const girlsLengthData = [
    [0,1,49.1477,0.0379,45.4223043,46.08383,46.76056,47.89133,49.1477,50.40407,51.53484,52.21157,52.8730957],
    [1,1,53.6872,0.0364,49.7787718,50.4728,51.18277,52.3691,53.6872,55.0053,56.19163,56.9016,57.5956282],
    [2,1,57.0673,0.03568,52.9949775,53.71811,54.45785,55.69393,57.0673,58.44067,59.67675,60.41649,61.1396225],
    [3,1,59.8029,0.0352,55.5927758,56.34038,57.10515,58.38306,59.8029,61.22274,62.50065,63.26542,64.0130242],
    [4,1,62.0899,0.03486,57.7609922,58.52969,59.31604,60.63,62.0899,63.5498,64.86376,65.65011,66.4188078],
    [5,1,64.0301,0.03463,59.5953753,60.38286,61.18844,62.53451,64.0301,65.52569,66.87176,67.67734,68.4648247],
    [6,1,65.7311,0.03448,61.1982833,62.00319,62.82658,64.20243,65.7311,67.25977,68.63562,69.45901,70.2639167],
    [7,1,67.2873,0.03441,62.656588,63.47888,64.32005,65.72562,67.2873,68.84898,70.25455,71.09572,71.918012],
    [8,1,68.7498,0.0344,64.0198138,64.85973,65.71894,67.15464,68.7498,70.34496,71.78066,72.63987,73.4797862],
    [9,1,70.1435,0.03444,65.3120157,66.16996,67.0476,68.51411,70.1435,71.77289,73.2394,74.11704,74.9749843],
    [10,1,71.4818,0.03452,66.5466965,67.42304,68.31951,69.81746,71.4818,73.14614,74.64409,75.54056,76.4169035],
    [11,1,72.771,0.03464,67.7294251,68.62467,69.54048,71.07075,72.771,74.47125,76.00152,76.91733,77.8125749],
    [12,1,74.015,0.03479,68.8650363,69.77953,70.71503,72.2782,74.015,75.7518,77.31497,78.25047,79.1649637],
    [13,1,75.2176,0.03496,69.9583854,70.89228,71.84762,73.44396,75.2176,76.99124,78.58758,79.54292,80.4768146],
    [14,1,76.3817,0.03514,71.0135941,71.96683,72.94195,74.57133,76.3817,78.19207,79.82145,80.79657,81.7498059],
    [15,1,77.5099,0.03534,72.0315003,73.00432,73.99947,75.66234,77.5099,79.35746,81.02033,82.01548,82.9882997],
    [16,1,78.6055,0.03555,73.016649,74.00908,75.0243,76.72069,78.6055,80.49031,82.1867,83.20192,84.1943511],
    [17,1,79.671,0.03576,73.9729301,74.98475,76.01981,77.74936,79.671,81.59264,83.32219,84.35725,85.3690699],
    [18,1,80.7079,0.03598,74.9001595,75.93146,76.98644,78.74927,80.7079,82.66653,84.42936,85.48434,86.5156405],
    [19,1,81.7182,0.0362,75.8018023,76.8524,77.92712,79.72293,81.7182,83.71347,85.50928,86.584,87.6345977],
    [20,1,82.7036,0.03643,76.6778157,77.74783,78.84242,80.67144,82.7036,84.73576,86.56478,87.65937,88.7293843],
    [21,1,83.6654,0.03666,77.5310529,78.62035,79.73466,81.59662,83.6654,85.73418,87.59614,88.71045,89.7997471],
    [22,1,84.604,0.03688,78.363609,79.47174,80.60531,82.49946,84.604,86.70854,88.60269,89.73626,90.844391],
    [23,1,85.5202,0.03711,79.1728908,80.3,81.453,83.3796,85.5202,87.6608,89.5874,90.7404,91.8675092],
    [24,1,86.4153,0.03734,79.9618054,81.10777,82.28006,84.23889,86.4153,88.59171,90.55054,91.72283,92.8687946]
];

// WHO Growth Data - Head Circumference
const boysHeadData = [
    [0,1,34.4618,0.03686,31.92128,32.37241,32.83389,33.60502,34.4618,35.31858,36.08971,36.55119,37.0023239],
    [1,1,37.2759,0.03133,34.94019,35.35495,35.77923,36.48819,37.2759,38.06361,38.77257,39.19685,39.6116079],
    [2,1,39.1285,0.02997,36.78314,37.19961,37.62565,38.33754,39.1285,39.91946,40.63135,41.05739,41.4738623],
    [3,1,40.5135,0.02918,38.14913,38.56898,38.99847,39.71613,40.5135,41.31087,42.02853,42.45802,42.8778679],
    [4,1,41.6317,0.02868,39.24371,39.66775,40.10153,40.82636,41.6317,42.43704,43.16187,43.59565,44.0196943],
    [5,1,42.5576,0.02837,40.14288,40.57167,41.01031,41.74325,42.5576,43.37195,44.10489,44.54353,44.9723182],
    [6,1,43.3306,0.02817,40.88935,41.32285,41.76631,42.5073,43.3306,44.1539,44.89489,45.33835,45.771846],
    [7,1,43.9803,0.02804,41.51388,41.95185,42.39988,43.14851,43.9803,44.81209,45.56072,46.00875,46.4467152],
    [8,1,44.53,0.02796,42.03988,42.48206,42.93439,43.69022,44.53,45.36978,46.12561,46.57794,47.0201176],
    [9,1,44.9998,0.02792,42.48701,42.93322,43.38967,44.15237,44.9998,45.84723,46.60993,47.06638,47.5125888],
    [10,1,45.4051,0.0279,42.8715,43.3214,43.78163,44.55065,45.4051,46.25955,47.02857,47.4888,47.9387046],
    [11,1,45.7573,0.02789,43.20496,43.65819,44.12182,44.89654,45.7573,46.61806,47.39278,47.85641,48.3096422],
    [12,1,46.0661,0.02789,43.49653,43.95282,44.41958,45.19953,46.0661,46.93267,47.71262,48.17938,48.6356671],
    [13,1,46.3395,0.02789,43.75468,44.21368,44.68321,45.46778,46.3395,47.21122,47.99579,48.46532,48.9243173],
    [14,1,46.5844,0.02791,43.98406,44.44581,44.91816,45.70745,46.5844,47.46135,48.25064,48.72299,49.1847412],
    [15,1,46.806,0.02792,44.19235,44.65647,45.13124,45.92456,46.806,47.68744,48.48076,48.95553,49.419647],
    [16,1,47.0088,0.02795,44.38101,44.84763,45.32497,46.12259,47.0088,47.89501,48.69263,49.16997,49.6365919],
    [17,1,47.1962,0.02797,44.55604,45.02487,45.50445,46.30582,47.1962,48.08658,48.88795,49.36753,49.8363554],
    [18,1,47.3711,0.028,44.71832,45.18938,45.67126,46.47646,47.3711,48.26574,49.07094,49.55282,50.0238816],
    [19,1,47.5357,0.02803,44.87085,45.34405,45.82813,46.63699,47.5357,48.43441,49.24327,49.72735,50.2005513],
    [20,1,47.6919,0.02806,45.01543,45.4907,45.97688,46.78927,47.6919,48.59453,49.40692,49.8931,50.3683694],
    [21,1,47.8408,0.0281,45.15215,45.62958,46.11798,46.93407,47.8408,48.74753,49.56362,50.05202,50.529453],
    [22,1,47.9833,0.02813,45.28376,45.76313,46.2535,47.07289,47.9833,48.89371,49.7131,50.20347,50.6828405],
    [23,1,48.1201,0.02817,45.40901,45.89043,46.3829,47.2058,48.1201,49.0344,49.8573,50.34977,50.8311864],
    [24,1,48.2515,0.02821,45.52915,46.01257,46.50708,47.3334,48.2515,49.1696,49.99592,50.49043,50.9738496]
];

const girlsHeadData = [
    [0,1,33.8787,0.03496,31.5099,31.93054,32.36083,33.07983,33.8787,34.67757,35.39657,35.82686,36.2474987],
    [1,1,36.5463,0.0321,34.20003,34.61666,35.04287,35.75503,36.5463,37.33757,38.04973,38.47594,38.8925725],
    [2,1,38.2521,0.03168,35.82845,36.25882,36.69908,37.43474,38.2521,39.06946,39.80512,40.24538,40.6757531],
    [3,1,39.5328,0.0314,37.05014,37.49099,37.94197,38.69554,39.5328,40.37006,41.12363,41.57461,42.0154598],
    [4,1,40.5817,0.03119,38.05021,38.49974,38.95958,39.72797,40.5817,41.43543,42.20382,42.66366,43.1131864],
    [5,1,41.459,0.03102,38.88688,39.34362,39.81085,40.59157,41.459,42.32643,43.10715,43.57438,44.0311164],
    [6,1,42.1995,0.03087,39.5941,40.05675,40.53002,41.32084,42.1995,43.07816,43.86898,44.34225,44.8048971],
    [7,1,42.829,0.03075,40.19502,40.66274,41.14121,41.9407,42.829,43.7173,44.51679,44.99526,45.4629835],
    [8,1,43.3671,0.03063,40.71043,41.18218,41.66477,42.47115,43.3671,44.26305,45.06943,45.55202,46.0237685],
    [9,1,43.83,0.03053,41.15374,41.62897,42.11512,42.92745,43.83,44.73255,45.54488,46.03103,46.5062598],
    [10,1,44.2319,0.03044,41.53906,42.01724,42.50639,43.32375,44.2319,45.14005,45.95741,46.44656,46.9247381],
    [11,1,44.5844,0.03035,41.87813,42.35869,42.85029,43.67172,44.5844,45.49708,46.31851,46.81011,47.2906731],
    [12,1,44.8965,0.03027,42.17847,42.66112,43.15485,43.97986,44.8965,45.81314,46.63815,47.13188,47.6145341],
    [13,1,45.1752,0.03019,42.44752,42.93188,43.42737,44.2553,45.1752,46.0951,46.92303,47.41852,47.9028786],
    [14,1,45.4265,0.03012,42.69001,43.17594,43.67302,44.50363,45.4265,46.34937,47.17998,47.67706,48.1629924],
    [15,1,45.6551,0.03006,42.91032,43.39772,43.89631,44.72944,45.6551,46.58076,47.41389,47.91248,48.3998846],
    [16,1,45.865,0.02999,43.11402,43.60252,44.10224,44.93725,45.865,46.79275,47.62776,48.12748,48.6159827],
    [17,1,46.0598,0.02993,43.30266,43.79225,44.29309,45.12997,46.0598,46.98963,47.82651,48.32735,48.8169396],
    [18,1,46.2424,0.02987,43.47988,43.97043,44.47224,45.31075,46.2424,47.17405,48.01256,48.51437,49.004921],
    [19,1,46.4152,0.02982,43.647,44.13856,44.6414,45.48164,46.4152,47.34876,48.189,48.69184,49.1834025],
    [20,1,46.5801,0.02977,43.80672,44.2992,44.80299,45.64479,46.5801,47.51541,48.35721,48.861,49.3534792],
    [21,1,46.7384,0.02972,43.96027,44.45359,44.95824,45.80149,46.7384,47.67531,48.51856,49.02321,49.5165305],
    [22,1,46.8913,0.02967,44.10877,44.60287,45.10832,45.95291,46.8913,47.82969,48.67428,49.17973,49.6738297],
    [23,1,47.0391,0.02962,44.2525,44.74733,45.25352,46.09933,47.0391,47.97887,48.82468,49.33087,49.8256963],
    [24,1,47.1822,0.02957,44.39184,44.88734,45.39421,46.24117,47.1822,48.12323,48.97019,49.47706,49.9725553]
];

// Percentile mapping
const percentileMap = {
    '2': 4,   // 2nd percentile column index
    '5': 5,   // 5th percentile column index
    '10': 6,  // 10th percentile column index
    '25': 7,  // 25th percentile column index
    '50': 8,  // 50th percentile column index
    '75': 9,  // 75th percentile column index
    '90': 10, // 90th percentile column index
    '95': 11, // 95th percentile column index
    '98': 12  // 98th percentile column index
};

// Function to calculate measurement using WHO LMS method
function calculateMeasurement(age, gender, percentile, measurementType) {
    let data;
    
    switch (measurementType) {
        case 'weight':
            data = gender === 'boy' ? boysWeightData : girlsWeightData;
            break;
        case 'length':
            data = gender === 'boy' ? boysLengthData : girlsLengthData;
            break;
        case 'head':
            data = gender === 'boy' ? boysHeadData : girlsHeadData;
            break;
        default:
            throw new Error('Invalid measurement type');
    }
    
    const percentileIndex = percentileMap[percentile];
    
    if (!percentileIndex) {
        throw new Error('Invalid percentile selected');
    }
    
    // Find the row for the given age
    const ageRow = data.find(row => row[0] === age);
    if (!ageRow) {
        throw new Error('Age not found in data');
    }
    
    // Get the percentile value
    const measurementValue = ageRow[percentileIndex];
    
    return Math.round(measurementValue * 100) / 100; // Round to 2 decimal places
}

// Function to calculate all measurements
function calculateAllMeasurements(age, gender, percentile) {
    return {
        weight: calculateMeasurement(age, gender, percentile, 'weight'),
        length: calculateMeasurement(age, gender, percentile, 'length'),
        head: calculateMeasurement(age, gender, percentile, 'head')
    };
}

// Function to get percentile description
function getPercentileDescription(percentile) {
    const descriptions = {
        '2': '2nd percentile (2.3rd)',
        '5': '5th percentile',
        '10': '10th percentile',
        '25': '25th percentile',
        '50': '50th percentile (median)',
        '75': '75th percentile',
        '90': '90th percentile',
        '95': '95th percentile',
        '98': '98th percentile (97.7th)'
    };
    return descriptions[percentile] || percentile;
}

// Function to convert kg to lbs
function kgToLbs(kg) {
    return Math.round(kg * 2.20462 * 100) / 100; // Round to 2 decimal places
}

// Function to convert lbs to kg
function lbsToKg(lbs) {
    return Math.round(lbs / 2.20462 * 100) / 100; // Round to 2 decimal places
}

// Function to convert cm to inches
function cmToInches(cm) {
    return Math.round(cm / 2.54 * 100) / 100; // Round to 2 decimal places
}

// Function to convert inches to cm
function inchesToCm(inches) {
    return Math.round(inches * 2.54 * 100) / 100; // Round to 2 decimal places
}

// Function to convert decimal pounds to pounds and ounces
function lbsToLbsOz(decimalLbs) {
    const pounds = Math.floor(decimalLbs);
    const ounces = Math.round((decimalLbs - pounds) * 16);
    return { pounds, ounces };
}

// Function to format weight display
function formatWeight(weight, unit) {
    if (unit === 'lbs') {
        const { pounds, ounces } = lbsToLbsOz(weight);
        return `${pounds} lbs ${ounces} oz`;
    } else {
        return `${weight} kg`;
    }
}

// Function to format length display
function formatLength(length, unit) {
    if (unit === 'inches') {
        const inches = cmToInches(length);
        const feet = Math.floor(inches / 12);
        const remainingInches = Math.round((inches % 12) * 10) / 10;
        if (feet > 0) {
            return `${feet}' ${remainingInches}"`;
        } else {
            return `${remainingInches}"`;
        }
    } else {
        return `${length} cm`;
    }
}

// Function to format head circumference display
function formatHeadCircumference(head, unit) {
    if (unit === 'inches') {
        const inches = cmToInches(head);
        return `${inches}"`;
    } else {
        return `${head} cm`;
    }
}

// Function to get selected unit for a specific tab
function getSelectedUnit(tabName) {
    return document.querySelector(`input[name="${tabName}-unit"]:checked`).value;
}

// Store chart instances
let weightChart = null;
let lengthChart = null;
let headChart = null;

// Function to create growth chart
function createGrowthChart(canvasId, measurementType, gender, selectedAge = null, selectedPercentile = null, selectedValue = null) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (canvasId === 'weight-chart' && weightChart) {
        weightChart.destroy();
    } else if (canvasId === 'length-chart' && lengthChart) {
        lengthChart.destroy();
    } else if (canvasId === 'head-chart' && headChart) {
        headChart.destroy();
    }

    // Get data source
    let data;
    switch (measurementType) {
        case 'weight':
            data = gender === 'boy' ? boysWeightData : girlsWeightData;
            break;
        case 'length':
            data = gender === 'boy' ? boysLengthData : girlsLengthData;
            break;
        case 'head':
            data = gender === 'boy' ? boysHeadData : girlsHeadData;
            break;
    }

    // Percentile curves to display (5th, 25th, 50th, 75th, 95th)
    const percentilesToShow = [
        { percentile: '5', index: 5, color: 'rgba(255, 99, 132, 0.8)', label: '5th' },
        { percentile: '25', index: 7, color: 'rgba(54, 162, 235, 0.8)', label: '25th' },
        { percentile: '50', index: 8, color: 'rgba(75, 192, 192, 0.8)', label: '50th' },
        { percentile: '75', index: 9, color: 'rgba(153, 102, 255, 0.8)', label: '75th' },
        { percentile: '95', index: 11, color: 'rgba(255, 159, 64, 0.8)', label: '95th' }
    ];

    // Generate datasets for percentile curves
    const datasets = percentilesToShow.map(p => {
        return {
            label: `${p.label} percentile`,
            data: data.map(row => ({ x: row[0], y: row[p.index] })),
            borderColor: p.color,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.4
        };
    });

    // Add the selected point only if values are provided
    if (selectedAge !== null && selectedPercentile !== null && selectedValue !== null) {
        datasets.push({
            label: `Your baby (${getPercentileDescription(selectedPercentile)})`,
            data: [{ x: selectedAge, y: selectedValue }],
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(255, 0, 0, 1)',
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
        });
    }

    // Determine axis labels
    let yAxisLabel;
    if (measurementType === 'weight') {
        yAxisLabel = 'Weight (kg)';
    } else if (measurementType === 'length') {
        yAxisLabel = 'Length (cm)';
    } else {
        yAxisLabel = 'Head Circumference (cm)';
    }

    // Create chart
    const chart = new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#333',
                        font: { size: 10 },
                        boxWidth: 15,
                        padding: 8
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Age (months)',
                        color: '#555',
                        font: { size: 11, weight: 'bold' }
                    },
                    ticks: {
                        color: '#666',
                        font: { size: 10 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    min: 0,
                    max: 24
                },
                y: {
                    title: {
                        display: true,
                        text: yAxisLabel,
                        color: '#555',
                        font: { size: 11, weight: 'bold' }
                    },
                    ticks: {
                        color: '#666',
                        font: { size: 10 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });

    // Store chart instance
    if (canvasId === 'weight-chart') {
        weightChart = chart;
    } else if (canvasId === 'length-chart') {
        lengthChart = chart;
    } else if (canvasId === 'head-chart') {
        headChart = chart;
    }
}

// Function to show weight result
function showWeightResult(weight, age, gender, percentile) {
    const resultDiv = document.getElementById('weight-result');
    const errorDiv = document.getElementById('weight-error');
    const selectedUnit = getSelectedUnit('weight');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Weight Estimate';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const weightValue = document.getElementById('weightValue');
    const weightUnit = document.getElementById('weightUnit');
    const convertedWeight = document.getElementById('convertedWeight');
    const convertedUnit = document.getElementById('convertedUnit');

    const weightLbs = kgToLbs(weight);

    if (selectedUnit === 'kg') {
        weightValue.textContent = weight;
        weightUnit.textContent = 'kg';
        convertedWeight.textContent = formatWeight(weightLbs, 'lbs');
        convertedUnit.textContent = '';
        convertedWeight.parentElement.classList.add('lbs-oz');
        weightValue.parentElement.classList.remove('lbs-oz');
    } else {
        weightValue.textContent = formatWeight(weightLbs, 'lbs');
        weightUnit.textContent = '';
        convertedWeight.textContent = weight;
        convertedUnit.textContent = 'kg';
        weightValue.parentElement.classList.add('lbs-oz');
        convertedWeight.parentElement.classList.remove('lbs-oz');
    }

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    const percentileDesc = getPercentileDescription(percentile);
    document.getElementById('weight-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

    // Create chart
    createGrowthChart('weight-chart', 'weight', gender, age, percentile, weight);

    resultDiv.classList.remove('hidden');
}

// Function to show length result
function showLengthResult(length, age, gender, percentile) {
    const resultDiv = document.getElementById('length-result');
    const errorDiv = document.getElementById('length-error');
    const selectedUnit = getSelectedUnit('length');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Length Estimate';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const lengthValue = document.getElementById('lengthValue');
    const lengthUnit = document.getElementById('lengthUnit');
    const convertedLength = document.getElementById('convertedLength');
    const convertedLengthUnit = document.getElementById('convertedLengthUnit');

    if (selectedUnit === 'cm') {
        lengthValue.textContent = length;
        lengthUnit.textContent = 'cm';
        convertedLength.textContent = formatLength(length, 'inches');
        convertedLengthUnit.textContent = '';
    } else {
        lengthValue.textContent = formatLength(length, 'inches');
        lengthUnit.textContent = '';
        convertedLength.textContent = length;
        convertedLengthUnit.textContent = 'cm';
    }

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    const percentileDesc = getPercentileDescription(percentile);
    document.getElementById('length-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

    // Create chart
    createGrowthChart('length-chart', 'length', gender, age, percentile, length);

    resultDiv.classList.remove('hidden');
}

// Function to show head circumference result
function showHeadResult(head, age, gender, percentile) {
    const resultDiv = document.getElementById('head-result');
    const errorDiv = document.getElementById('head-error');
    const selectedUnit = getSelectedUnit('head');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Head Circumference Estimate';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const headValue = document.getElementById('headValue');
    const headUnit = document.getElementById('headUnit');
    const convertedHead = document.getElementById('convertedHead');
    const convertedHeadUnit = document.getElementById('convertedHeadUnit');

    if (selectedUnit === 'cm') {
        headValue.textContent = head;
        headUnit.textContent = 'cm';
        convertedHead.textContent = formatHeadCircumference(head, 'inches');
        convertedHeadUnit.textContent = '';
    } else {
        headValue.textContent = formatHeadCircumference(head, 'inches');
        headUnit.textContent = '';
        convertedHead.textContent = head;
        convertedHeadUnit.textContent = 'cm';
    }

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    const percentileDesc = getPercentileDescription(percentile);
    document.getElementById('head-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

    // Create chart
    createGrowthChart('head-chart', 'head', gender, age, percentile, head);

    resultDiv.classList.remove('hidden');
}

// Function to show error for specific tab
function showError(tabName, message) {
    const resultDiv = document.getElementById(`${tabName}-result`);
    const errorDiv = document.getElementById(`${tabName}-error`);
    const errorMessage = document.getElementById(`${tabName}-error-message`);

    resultDiv.classList.add('hidden');
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Function to validate form
function validateForm(age, gender, percentile) {
    if (!age || age < 0 || age > 24) {
        return 'Please enter a valid age between 0 and 24 months';
    }
    
    if (!gender) {
        return 'Please select a gender';
    }
    
    if (!percentile) {
        return 'Please select a percentile';
    }
    
    return null;
}

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Add active class to selected tab button
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Synchronize inputs across tabs
function syncInputs() {
    // Age synchronization
    const ageInputs = [
        document.getElementById('weight-age'),
        document.getElementById('length-age'),
        document.getElementById('head-age')
    ];

    ageInputs.forEach(input => {
        input.addEventListener('input', function() {
            ageInputs.forEach(otherInput => {
                if (otherInput !== input) {
                    otherInput.value = input.value;
                }
            });
        });
    });

    // Gender synchronization
    const genderSelects = [
        document.getElementById('weight-gender'),
        document.getElementById('length-gender'),
        document.getElementById('head-gender')
    ];

    genderSelects.forEach(select => {
        select.addEventListener('change', function() {
            genderSelects.forEach(otherSelect => {
                if (otherSelect !== select) {
                    otherSelect.value = select.value;
                }
            });
        });
    });

    // Percentile synchronization
    const percentileSelects = [
        document.getElementById('weight-percentile'),
        document.getElementById('length-percentile'),
        document.getElementById('head-percentile')
    ];

    percentileSelects.forEach(select => {
        select.addEventListener('change', function() {
            percentileSelects.forEach(otherSelect => {
                if (otherSelect !== select) {
                    otherSelect.value = select.value;
                }
            });
        });
    });
}

// Weight form submission
document.getElementById('weightForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('weight-age').value);
    const gender = document.getElementById('weight-gender').value;
    const percentile = document.getElementById('weight-percentile').value;

    const validationError = validateForm(age, gender, percentile);
    if (validationError) {
        showError('weight', validationError);
        return;
    }

    try {
        const weight = calculateMeasurement(age, gender, percentile, 'weight');
        showWeightResult(weight, age, gender, percentile);
    } catch (error) {
        showError('weight', 'Error calculating weight: ' + error.message);
    }
});

// Length form submission
document.getElementById('lengthForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('length-age').value);
    const gender = document.getElementById('length-gender').value;
    const percentile = document.getElementById('length-percentile').value;

    const validationError = validateForm(age, gender, percentile);
    if (validationError) {
        showError('length', validationError);
        return;
    }

    try {
        const length = calculateMeasurement(age, gender, percentile, 'length');
        showLengthResult(length, age, gender, percentile);
    } catch (error) {
        showError('length', 'Error calculating length: ' + error.message);
    }
});

// Head circumference form submission
document.getElementById('headForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('head-age').value);
    const gender = document.getElementById('head-gender').value;
    const percentile = document.getElementById('head-percentile').value;

    const validationError = validateForm(age, gender, percentile);
    if (validationError) {
        showError('head', validationError);
        return;
    }

    try {
        const head = calculateMeasurement(age, gender, percentile, 'head');
        showHeadResult(head, age, gender, percentile);
    } catch (error) {
        showError('head', 'Error calculating head circumference: ' + error.message);
    }
});

// Weight unit toggle change
document.querySelectorAll('input[name="weight-unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const resultDiv = document.getElementById('weight-result');
        if (!resultDiv.classList.contains('hidden')) {
            const age = parseInt(document.getElementById('weight-age').value);
            const gender = document.getElementById('weight-gender').value;
            const percentile = document.getElementById('weight-percentile').value;

            try {
                const weight = calculateMeasurement(age, gender, percentile, 'weight');
                showWeightResult(weight, age, gender, percentile);
            } catch (error) {
                resultDiv.classList.add('hidden');
            }
        }
    });
});

// Length unit toggle change
document.querySelectorAll('input[name="length-unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const resultDiv = document.getElementById('length-result');
        if (!resultDiv.classList.contains('hidden')) {
            const age = parseInt(document.getElementById('length-age').value);
            const gender = document.getElementById('length-gender').value;
            const percentile = document.getElementById('length-percentile').value;

            try {
                const length = calculateMeasurement(age, gender, percentile, 'length');
                showLengthResult(length, age, gender, percentile);
            } catch (error) {
                resultDiv.classList.add('hidden');
            }
        }
    });
});

// Head unit toggle change
document.querySelectorAll('input[name="head-unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const resultDiv = document.getElementById('head-result');
        if (!resultDiv.classList.contains('hidden')) {
            const age = parseInt(document.getElementById('head-age').value);
            const gender = document.getElementById('head-gender').value;
            const percentile = document.getElementById('head-percentile').value;

            try {
                const head = calculateMeasurement(age, gender, percentile, 'head');
                showHeadResult(head, age, gender, percentile);
            } catch (error) {
                resultDiv.classList.add('hidden');
            }
        }
    });
});

// Function to show chart with just percentile curves (no selected point)
function showPercentileChart(canvasId, measurementType) {
    const defaultGender = 'boy';  // Show boys' curves by default
    createGrowthChart(canvasId, measurementType, defaultGender);
}

// Function to show default chart (just percentile curves, no values)
function showDefaultChart(tabName) {
    const resultDiv = document.getElementById(`${tabName}-result`);

    // Hide the measurement section, only show the chart
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'none';
    measurementInfo.style.display = 'none';

    // Show result div
    resultDiv.classList.remove('hidden');

    // Show chart with only percentile curves
    if (tabName === 'weight') {
        showPercentileChart('weight-chart', 'weight');
    } else if (tabName === 'length') {
        showPercentileChart('length-chart', 'length');
    } else if (tabName === 'head') {
        showPercentileChart('head-chart', 'head');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Baby Growth Estimator loaded successfully');

    // Initialize tab button event listeners
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);

            // Show default chart for tab if no result is visible
            const resultDiv = document.getElementById(`${tabName}-result`);
            if (resultDiv.classList.contains('hidden')) {
                showDefaultChart(tabName);
            }
        });
    });

    // Initialize input synchronization after DOM is loaded
    syncInputs();

    // Show default chart on page load
    showDefaultChart('weight');
});
