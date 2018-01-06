import {
     GameModel, PolygonTypeModel, GameStatusEnum, RegionModel, MacroRegionModel, GameTypeEnum 
    } from '../model/game';

const Gloria: PolygonTypeModel = {id: 16, name: 'Глория'};
const GarrisonA: PolygonTypeModel = {id: 1000, name: 'Гарнизон-А'};

const CentralRussia: MacroRegionModel = {id: 3, name: 'Москва и Центральный регион', urlPart: 'msk'};
const NorthWest: MacroRegionModel = {id: 2, name: 'Северо-Запад', urlPart: 'spb'};
const Ural: MacroRegionModel = {id: 5, name: 'Урал', urlPart: 'ural'};
const Sibir: MacroRegionModel = {id: 6, name: 'Сибирь', urlPart: 'sibir'};
const South: MacroRegionModel = {id: 7, name: 'Юг России', urlPart: 'south'};
const FarEast: MacroRegionModel = {id: 8, name: 'Дальний Восток', urlPart: 'dv'};
const Volga: MacroRegionModel = {id: 9, name: 'Поволжье', urlPart: 'volga'};
const Ukraine: MacroRegionModel = {id: 10, name: 'Украина', urlPart: 'ua'};
const Belorussia: MacroRegionModel = {id: 11, name: 'Белоруссия', urlPart: 'bel'};
const Kazahstan: MacroRegionModel = {id: 12, name: 'Казахстан', urlPart: 'kz'};

const Tver: RegionModel = {id: 5, name: 'Тверская область', parent: CentralRussia, shortName: 'Тверь'};

const games: GameModel[] = 
     [
        {
            id: 152,
            name: 'Вторая Эпоха',
            type: GameTypeEnum.Forest,
            uri: new URL('http://secondage.ru'),
            polygon: Gloria,
            mg: 'МГ Второй Эпохи',
            email: new URL('mailto:master@secondage.ru'),
            status: GameStatusEnum.Passed,
            allrpgInfoId: 711,
            beginDate: new Date(2010, 7, 6),
            comment: '',
            duration: 6,
            fbClub: '',
            isDeleted: false,
            ljClub: 'secondage2010',
            playersCount: 800,
            subregion: Tver,
            vkClub: '',
        },
        {
            id: 7967,
            name: 'Железный трон',
            type: GameTypeEnum.Forest,
            polygon: GarrisonA,
            mg: 'МГ Наррентурм',
            email: new URL('mailto:merialt@gmail.com'),
            status: GameStatusEnum.Ok,
            subregion: Tver,
            allrpgInfoId: 6738,
            vkClub: 'vesteros2018',
            playersCount: 2000,
            beginDate: new Date(2018, 7, 25),
            duration: 4,
            isDeleted: false,
            comment: '',
            fbClub: '',
            ljClub: '',
        }
    ];
export const MockAll = {
    games: games,
    regions: [CentralRussia, NorthWest, Ural, Sibir, South, FarEast, Volga, Ukraine, Belorussia, Kazahstan],
};