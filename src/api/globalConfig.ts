import { MacroRegionModel } from '../model/game';
import { MockAll } from '../mock/calendar';

interface YearRange {
    first: number;
    last: number;
}

const delay = (time: number) => new Promise(res => setTimeout(() => res(), time));

const fetchRegions = async (): Promise<Readonly<MacroRegionModel[]>> => {
    await delay(1000);
    return MockAll.regions;
};

const fetchYearRange = async(): Promise<Readonly<YearRange>> => {
    await delay(500);
    return {first: 1999, last: 2019};
};

export const GlobalConfigAPI = {
    fetchRegions,
    fetchYearRange
};