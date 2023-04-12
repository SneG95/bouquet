import ApiService from '../framework/api-service.js';
import { Method } from '../consts.js';

export default class FlowersApiService extends ApiService {
  get flowers() {
    return this._load({url: 'products'})
      .then(ApiService.parseResponse);
  }

  get cart() {
    return this._load({url: 'cart'})
      .then(ApiService.parseResponse);
  }

  async addToFavorite(flowerId) {
    const response = await this._load({
      url: `products/${flowerId}`,
      method: Method.PUT,
    });

    return response;
  }

  async deleteFromFavorite(flowerId) {
    const response = await this._load({
      url: `products/${flowerId}`,
      method: Method.DELETE,
    });

    return response;
  }
}
