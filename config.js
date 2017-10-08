var Config = {
    mode: 'timeline',
    unit: 0.1,
    icon: 'youtube-play',
    title: 'سامانه بازبینی',
    channels: {
        'tv1': {
            title: 'یک',
            id: 'tv1'
        },
        'tv2': {
            title: 'دو',
            id: 'tv2'
        },
        'tv3': {
            title: 'سه',
            id: 'tv3'
        },
        'tv4': {
            title: 'چهار',
            id: 'tv4'
        },
        'tehran': {
            title: 'تهران',
            id: 'tehran'
        },
//        'irinn': {
//            title: 'خبر',
//            id: 'irinn'
//        },
        'ofogh': {
            title: 'افق',
            id: 'ofogh'
        },
        'quran': {
            title: 'قرآن',
            id: 'quran'
        },
        'pooya': {
            title: 'پویا',
            id: 'pooya'
        },
        'omid': {
            title: 'امید',
            id: 'omid'
        },
        'namayesh': {
            title: 'نمایش',
            id: 'namayesh'
        },
        'tamasha': {
            title: 'تماشا',
            id: 'tamasha'
        },
        'doctv': {
            title: 'مستند',
            id: 'mostanad'
        },
        'amouzesh': {
            title: 'آموزش',
            id: 'amouzesh'
        },
        'salamat': {
            title: 'سلامت',
            id: 'salamat'
        },
        'varzesh': {
            title: 'ورزش',
            id: 'varzesh'
        },
        'nasim': {
            title: 'نسیم',
            id: 'nasim'
        },
    },
    api: {
        items: 'http://au.iktv.ir:60001/assets/proxy.php?u=http://172.16.16.201:8080/api/share/ott/epg',
//        items: 'test/medialist.json',
        media: 'http://172.16.16.69/archive/list.m3u8',
        lastUpdate: 'http://au.iktv.ir:60001/assets/proxy.php?u=http://172.16.16.201:8080/api/share/ott/epg/lastupdate',
    },
};