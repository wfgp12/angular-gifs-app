import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
    static mapGiphyItemToGif(giphyItem: GiphyItem): Gif {
        return{
            id: giphyItem.id,
            url: giphyItem.images.original.url,
            title: giphyItem.title
        }
    }

    static mapGiphyItemsToGifArray(giphyItems: GiphyItem[]): Gif[] {
        return giphyItems.map(item => this.mapGiphyItemToGif(item));
    }
}