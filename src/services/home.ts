import axios from '@/lib/axios';

import { HomeSection, TopSearched } from '@/types/base';

const serviceHome = {
  getHome: async (page = 0): Promise<HomeSection[]> => {
    try {
      const res = await axios.get('homePage/getHome', {
        params: {
          page: page,
        },
      });
      return res.data.data.recommendItems.filter(
        (item: HomeSection) => !item.bannerProportion
      );
    } catch (error: any) {
      return error;
    }
  },
  getTopSearch: async (): Promise<TopSearched[]> => {
    try {
      const res = await axios.get('search/v1/searchLeaderboard');
      return res.data.data.list;
    } catch (error: any) {
      return error;
    }
  },
};

export default serviceHome;
