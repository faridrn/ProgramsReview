var Config = {
    mode: 'timeline',
    unit: 0.1,
    icon: 'youtube-play',
    sliderSpeed: 400,
    clockInterval: 600000,
    maxDays: 4,
    title: 'سامانه بازبینی',
    channels: {
        'tv1': {
            title: 'یک',
            id: 'tv1',
            type: 1,
            access: 0
        },
        'tv2': {
            title: 'دو',
            id: 'tv2',
            type: 1,
            access: 0
        },
        'tv3': {
            title: 'سه',
            id: 'tv3',
            type: 1,
            access: 0
        },
        'tv4': {
            title: 'چهار',
            id: 'tv4',
            type: 1,
            access: 0
        },
        'tehran': {
            title: 'تهران',
            id: 'tehran',
            type: 2,
            access: 0
        },
        'ofogh': {
            title: 'افق',
            id: 'ofogh',
            type: 1,
            access: 0
        },
        'quran': {
            title: 'قرآن',
            id: 'quran',
            type: 1,
            access: 0
        },
        'pooya': {
            title: 'پویا',
            id: 'pooya',
            type: 1,
            access: 0
        },
        'omid': {
            title: 'امید',
            id: 'omid',
            type: 1,
            access: 0
        },
        'namayesh': {
            title: 'نمایش',
            id: 'namayesh',
            type: 1,
            access: 0
        },
        'tamasha': {
            title: 'تماشا',
            id: 'tamasha',
            type: 1,
            access: 0
        },
        'doctv': {
            title: 'مستند',
            id: 'mostanad',
            type: 1,
            access: 0
        },
        'amouzesh': {
            title: 'آموزش',
            id: 'amouzesh',
            type: 1,
            access: 0
        },
        'salamat': {
            title: 'سلامت',
            id: 'salamat',
            type: 1,
            access: 0
        },
        'varzesh': {
            title: 'ورزش',
            id: 'varzesh',
            type: 1,
            access: 0
        },
        'nasim': {
            title: 'نسیم',
            id: 'nasim',
            type: 1,
            access: 0
        }
    },
    useProxy: true,
    api: {
        proxy: 'http://77.36.163.194/proxy.php',
        login: 'http://172.16.16.201/api/accounts/domainlogin',
        items: 'http://172.16.16.201/api/share/ott/epg',
//        items: 'test/medialist.json',
        media: 'http://172.16.16.69/archive/list2.m3u8',
        lastUpdate: 'http://172.16.16.201/api/share/ott/epg/lastupdate'
    }
};