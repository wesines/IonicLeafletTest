import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  init() {
    this.storage.create();
  }

  getData() {
    return this.storage.get(INTRO_KEY);
  }

  async setData(item) {
    const storedData = (await this.storage.get(INTRO_KEY)) || [];
    storedData.push(item);
    return this.storage.set(INTRO_KEY, storedData);
  }
  async removeData(index) {
    const storedData = (await this.storage.get(INTRO_KEY)) || [];
    storedData.splice(index, 1);
    return this.storage.set(INTRO_KEY, storedData);
  }
}
