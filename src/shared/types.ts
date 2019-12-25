import { BrowserWindow } from 'electron';

declare global {
   interface Window {
      currentWindow: BrowserWindow
   }
}
