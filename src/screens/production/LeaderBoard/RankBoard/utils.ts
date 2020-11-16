import { getMultiPlayRankById, getSinglePlayRankById, RawMultiRankData, RawSingleRankData } from "../../../../api/sortio";
import { RankViewerDataEntry, RankViewerData } from "../../../../components/RankViewer";

const mapSinglePlayRankEntry = (entry: RawSingleRankData): RankViewerDataEntry => {
  return {
    rank: Number(entry.rank),
    rate: Number(entry.rate),
    name: entry.name,
    id: entry.id,
    photo: entry.photo,
  };
};


export const getSinglePlayRankByIdData = async (userId: number, padding = 0): Promise<null | RankViewerData> => {
  const rankData = await getSinglePlayRankById(userId, padding);

  if (!rankData) return null;

  const beforeUser = rankData.beforeTargetUser.map(mapSinglePlayRankEntry);
  const afterUser = rankData.afterTargetUser.map(mapSinglePlayRankEntry);
  const user: RankViewerDataEntry = {
    ...mapSinglePlayRankEntry(rankData.targetUser),
    name: mapSinglePlayRankEntry(rankData.targetUser).name + ' (YOU)'
  };
  const mappedData: RankViewerData = beforeUser.concat(user).concat(afterUser);

  return mappedData;
}

const mapMultiPlayRankEntry = (entry: RawMultiRankData): RankViewerDataEntry => {
  return {
    rank: Number(entry.rank),
    rate: Number(entry.rate),
    name: entry.name,
    id: entry.id,
    photo: entry.photo,
  };
};


export const getMultiPlayRankByIdData = async (userId: number, padding = 0): Promise<null | RankViewerData> => {
  const rankData = await getMultiPlayRankById(userId, padding);

  if (!rankData) return null;

  const beforeUser = rankData.beforeTargetUser.map(mapMultiPlayRankEntry);
  const afterUser = rankData.afterTargetUser.map(mapMultiPlayRankEntry);
  const user: RankViewerDataEntry = {
    ...mapMultiPlayRankEntry(rankData.targetUser),
    name: mapMultiPlayRankEntry(rankData.targetUser).name + ' (YOU)'
  };
  const mappedData: RankViewerData = beforeUser.concat(user).concat(afterUser);

  return mappedData;
}