import {BrowserWindow} from 'electron';

export default class ElectronWindow {
   private currentWindow: BrowserWindow;

   constructor() {
      this.currentWindow = window.currentWindow
   }

   public hide = () => {
      if (this.isElectron()) {
         this.currentWindow.minimize();
      }
   };

   public show = () => {
      if (this.isElectron()) {
         this.currentWindow.show();
      }
   };

   private isElectron = () => {
      // Renderer process
      if (
         typeof window !== 'undefined' &&
         typeof window.process === 'object' &&
         window.process.type === 'renderer'
      ) {
         return true;
      }
      // Main process
      if (
         typeof process !== 'undefined' &&
         typeof process.versions === 'object' &&
         !!process.versions.electron
      ) {
         return true;
      }

      // Detect the user agent when the `nodeIntegration` option is set to true
      if (
         typeof navigator === 'object' &&
         typeof navigator.userAgent === 'string' &&
         navigator.userAgent.indexOf('Electron') >= 0
      ) {
         return true;
      }

      return false;
   }
}
