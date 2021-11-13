import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public add(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public get(key: string): any {
    const config = localStorage.getItem(key);
    if (!config) {
      return null;
    }
    return JSON.parse(localStorage.getItem(key));
  }

  public remove(key: string): void {
    return localStorage.removeItem(key);
  }

  public clear(): void {
    return localStorage.clear();
  }
}
