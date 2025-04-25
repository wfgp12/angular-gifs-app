import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, tap } from 'rxjs';
import { GifMapper } from '../mapper/gif.mapper';

import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(false);

    private trendingPage = signal(0);

    trendingGifGroup = computed<Gif[][]> (() => {
        const groups = [];
        for(let i = 0; i < this.trendingGifs().length ; i+=3) {
            groups.push(this.trendingGifs().slice(i, i+3));
        }
        return groups
    })

    searchHistory = signal<Record<string, Gif[]>>(JSON.parse(localStorage.getItem('gifHistory')?? '{}') );
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));


    constructor() {
        this.loadTrendingGifs()
    }

    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem('gifHistory', historyString);
    });

    loadTrendingGifs() {

        if (this.trendingGifsLoading()) return;

        this.trendingGifsLoading.set(true);

        this.http.get<GiphyResponse>(`${environment.apiUrl}/gifs/trending`, {
            params: {
                api_key: environment.apiKey,
                limit: 20,
                offset: this.trendingPage() * 20
            }
        }).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
            this.trendingPage.update(page => page + 1);
            this.trendingGifsLoading.set(false);
        })
    }

    loadSearchGifs(query: string) {
        let q = query.trim().replace(/ /g, '+')
        return this.http.get<GiphyResponse>(`${environment.apiUrl}/gifs/search`, {
            params: {
                api_key: environment.apiKey,
                q,
                limit: 20
            }
        }).pipe(
            map(resp => GifMapper.mapGiphyItemsToGifArray(resp.data)),
            tap(gifs => {
                this.searchHistory.update((history) => ({
                    ...history, 
                    [query.toLowerCase()]: gifs
                }))
            })
        )
    }

    getHistoryGifs(query: string) {
        return this.searchHistory()[query.toLowerCase()] ?? [];
    }
}