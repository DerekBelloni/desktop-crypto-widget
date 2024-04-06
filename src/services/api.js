const axios = require('axios');
require('dotenv').config();

class CryptoDataFetcher {
    constructor() {
        this.apiKey = process.env.CMC_API_KEY,
        this.baseUrl = 'https://pro-api.coinmarketcap.com'
    }

    async _fetchData(endPoint, params) {
        const response = await axios.get(`${this.baseUrl}${endPoint}`, {
            headers: {
                'X-CMC_PRO_API_KEY': this.apiKey,
                'Accept-Encoding': 'deflate, gzip',
                'Accept': 'application/json'
            },
            params: params
        });
        return response;
    }

    async getCryptoPriceData() {
        const endPoint = '/v1/cryptocurrency/listings/latest';
        const params = { "limit": 100 };
        const response = await this._fetchData(endPoint, params);
        const cryptoIds = response.data.data.map((crypto) => crypto.id);
        const metaDataResponse = await this._getCryptoMetadata(cryptoIds, response);
        
        return this._formatResponseData(metaDataResponse, response);
    }

    async _getCryptoMetadata(cryptoIds) {
        const endPoint = '/v2/cryptocurrency/info';
        const params = { "id": cryptoIds.join(',') };
        const response = await this._fetchData(endPoint, params);

        return response;
    }

    _formatResponseData(metadataResponse, listingsResponse) {
        let listingsData = listingsResponse.data.data;
        let metadata = metadataResponse.data.data;

       const formattedResponse = listingsData.map((listing) => {
            listing['logo'] = metadata[listing.id]['logo'];
            listing['description'] = metadata[listing.id]['description'];
            return listing;
        });

        return formattedResponse;
    }
}

module.exports = CryptoDataFetcher;