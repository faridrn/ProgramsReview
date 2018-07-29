var Config = {
    mode: 'timeline',
    unit: 0.1,
    icon: 'youtube-play',
    sliderSpeed: 400,
    clockInterval: 600000,
    maxDays: 10,
    title: 'سامانه بازبینی',
    channels: {
        'tv1': {
            title: 'یک',
            id: 'tv1',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1371'
        },
        'tv2': {
            title: 'دو',
            id: 'tv2',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1372'
        },
        'tv3': {
            title: 'سه',
            id: 'tv3',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1373'
        },
        'tv4': {
            title: 'چهار',
            id: 'tv4',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1374'
        },
        'tehran': {
            title: 'تهران',
            id: 'tehran',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1375'
        },
        'ofogh': {
            title: 'افق',
            id: 'ofogh',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1382'
        },
        'quran': {
            title: 'قرآن',
            id: 'quran',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1377'
        },
        'pooya': {
            title: 'پویا',
            id: 'pooya',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1384'
        },
        'omid': {
            title: 'امید',
            id: 'omid',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1387'
        },
        'namayesh': {
            title: 'نمایش',
            id: 'namayesh',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1381'
        },
        'tamasha': {
            title: 'تماشا',
            id: 'tamasha',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1385'
        },
        'doctv': {
            title: 'مستند',
            id: 'mostanad',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1380'
        },
        'amouzesh': {
            title: 'آموزش',
            id: 'amouzesh',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1376'
        },
        'salamat': {
            title: 'سلامت',
            id: 'salamat',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1378'
        },
        'varzesh': {
            title: 'ورزش',
            id: 'varzesh',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1383'
        },
        'nasim': {
            title: 'نسیم',
            id: 'nasim',
            type: 1,
            access: 0,
            live: 'http://172.16.16.103:1379'
        }
		,
        'khorasan_shomali': {
            title: 'خراسان شمالی',
            id: 'khorasan_shomali',
            type: 2,
            access: 0
        }
		,
        'sistan': {
            title: 'سیستان و بلوچستان',
            id: 'sistan',
            type: 2,
            access: 0
        }
		,
        'khorasan_razavi': {
            title: 'خراسان رضوی',
            id: 'khorasan_razavi',
            type: 2,
            access: 0
        }
		,
        'khorasan_jonobi': {
            title: 'خراسان جنوبی',
            id: 'khorasan_jonobi',
            type: 2,
            access: 0
        }
		,
        'mahabad': {
            title: 'مهاباد',
            id: 'mahabad',
            type: 2,
            access: 0
        }
		,
        'abadan': {
            title: 'آبادان',
            id: 'abadan',
            type: 2,
            access: 0
        }
		,
        'mazandaran': {
            title: 'مازندران',
            id: 'mazandaran',
            type: 2,
            access: 0
        }
		,
        'golestan': {
            title: 'گلستان',
            id: 'golestan',
            type: 2,
            access: 0
        }
		,
        'azarbayejan_sharghi': {
            title: 'آذربایجان شرقی',
            id: 'azarbayejan_sharghi',
            type: 2,
            access: 0
        }
		,
        'ardebil': {
            title: 'اردبیل',
            id: 'ardebil',
            type: 2,
            access: 0
        }
		,
        'kermanshah': {
            title: 'کرمانشاه',
            id: 'kermanshah',
            type: 2,
            access: 0
        }
		,
        'kordestan': {
            title: 'کردستان',
            id: 'kordestan',
            type: 2,
            access: 0
        }
		,
        'ilam': {
            title: 'ایلام',
            id: 'ilam',
            type: 2,
            access: 0
        }
		,
        'kerman': {
            title: 'کرمان',
            id: 'kerman',
            type: 2,
            access: 0
        },
        'hormozgan': {
            title: 'هرمزگان',
            id: 'hormozgan',
            type: 2,
            access: 0
		}
		,
        'qazvin': {
            title: 'قزوین',
            id: 'qazvin',
            type: 2,
            access: 0
        }
		,
        'gilan': {
            title: 'گیلان',
            id: 'gilan',
            type: 2,
            access: 0
        }
		,
        'qom': {
            title: 'قم',
            id: 'qom',
            type: 2,
            access: 0
        }
		,
        'markazi': {
            title: 'مرکزی',
            id: 'markazi',
            type: 2,
            access: 0
        }
		,
        'hamedan': {
            title: 'همدان',
            id: 'hamedan',
            type: 2,
            access: 0
        }
		,
        'zanjan': {
            title: 'زنجان',
            id: 'zanjan',
            type: 2,
            access: 0
        }
		,
        'semnan': {
            title: 'سمنان',
            id: 'semnan',
            type: 2,
            access: 0
        }
		,
        'alborz': {
            title: 'البرز',
            id: 'alborz',
            type: 2,
            access: 0
        }
		,
        'kish': {
            title: 'کیش',
            id: 'kish',
            type: 2,
            access: 0
        }
		,
        'fars': {
            title: 'فارس',
            id: 'fars',
            type: 2,
            access: 0
        }
		,
        'bushehr': {
            title: 'بوشهر',
            id: 'bushehr',
            type: 2,
            access: 0
        }
		,
        'kohgiloye': {
            title: 'کهگیلویه و بویر احمد',
            id: 'kohgiloye',
            type: 2,
            access: 0
        },
        'azarbayejan_gharbi': {
            title: 'آذربایجان غربی',
            id: 'azarbayejan_gharbi',
            type: 2,
            access: 0
        },
        'khozestan': {
            title: 'خوزستان',
            id: 'khozestan',
            type: 2,
            access: 0
        }
		,
        'lorestan': {
            title: 'لرستان',
            id: 'lorestan',
            type: 2,
            access: 0
        }
		,
        'chaharmahal': {
            title: 'چهار محال بختیاری',
            id: 'chaharmahal',
            type: 2,
            access: 0
        }
		,
        'yazd': {
            title: 'یزد',
            id: 'yazd',
            type: 2,
            access: 0
        }
		,
        'esfahan': {
            title: 'اصفهان',
            id: 'esfahan',
            type: 2,
            access: 0
        }
    },
    useProxy: location.host.indexOf('localhost:') !== -1 ? true : false,
    api: {
        proxy: 'http://77.36.163.194/proxy.php',
        login: 'http://172.16.16.201/api/accounts/domainlogin',
        items: 'http://172.16.16.201/api/share/ott/epg',
        media: 'http://172.16.16.69/archive/list2.m3u8',
        lastUpdate: 'http://172.16.16.201/api/share/ott/epg/lastupdate'
    }
};