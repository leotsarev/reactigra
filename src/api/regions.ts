import { MacroRegionModel } from '../model/game';
import { MockAll } from '../mock/calendar';

const delay = (time: number) => new Promise(res => setTimeout(() => res(), time));

const fetchRegions = async (): Promise<Readonly<MacroRegionModel[]>> => {
    await delay(1000);
    return MockAll.regions;
};

export const RegionAPI = {
    fetchRegions,
};