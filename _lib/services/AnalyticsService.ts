import { client } from "../client/client";

class AnalyticsService {
    public async FetchAnalyticsIds() {
        let analyticsIds = await client.fetch(
            `*[_type == 'siteSettings'][0] {
                analytics {...}
              }`, {}, { cache: "no-store" } 
        );
        return analyticsIds;
    }
}

export default AnalyticsService;