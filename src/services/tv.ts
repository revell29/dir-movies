import axios from '@/lib/axios';

import { RootDetail } from '@/types/base';

export const getTVDetail = async (
  id: string,
  episodeIndex: number
): Promise<RootDetail> => {
  const data = (
    await axios.get('movieDrama/get', {
      params: {
        id,
        category: 1,
      },
    })
  ).data.data;

  const sources = (
    await Promise.all(
      data.episodeVo[episodeIndex - 1].definitionList.map(
        async (quality: any) =>
          (
            await axios.get('media/previewInfo', {
              params: {
                category: 1,
                contentId: id,
                episodeId: data.episodeVo[episodeIndex - 1].id,
                definition: quality.code,
              },
            })
          ).data.data.mediaUrl
      )
    )
  )
    .map((url, index) => ({
      quality: Number(
        data.episodeVo[episodeIndex - 1].definitionList[index].description
          .toLowerCase()
          .replace('p', '')
      ),
      url,
    }))
    .sort((a, b) => b.quality - a.quality);

  const subtitles = data.episodeVo[episodeIndex - 1].subtitlingList
    .map((sub: any) => ({
      language: `${sub.language}${sub.translateType ? ' (Auto)' : ''}`,
      url: sub.subtitlingUrl,
      lang: sub.languageAbbr,
    }))
    .reduce((acc: any, element: any) => {
      if (element.lang === 'en') {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [])
    .reduce((acc: any, element: any) => {
      if (element.lang === 'vi') {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);

  return {
    data,
    sources,
    subtitles,
  };
};
