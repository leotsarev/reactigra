export interface GameModel {
    id: number;
    name: string;
    uri: URL | null;
    type: GameTypeEnum;
    polygon: PolygonTypeModel;
    mg: string;
    email: URL;
    status: GameStatusEnum;
    comment: string;
    subregion: RegionModel;
    isDeleted: boolean;
    playersCount: number;
    allrpgInfoId: number;
    vkClub: string;
    ljClub: string;
    fbClub: string;
    beginDate: Date;
    duration: number;
}

export interface RegionModel {
    id: number;
    name: string;
    shortName: string;
    parent: MacroRegionModel;
}

export interface MacroRegionModel {
    id: number;
    name: string;
    urlPart: string;
}

export enum GameStatusEnum {
    Ok,
    Passed,
}

export enum GameTypeEnum {
    Forest,
}

export interface PolygonTypeModel {
    id: number;
    name: string;
}

export type CalendarModel = Array<GameModel>;