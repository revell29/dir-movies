declare global {
  interface Window {
    usbPrinter: any;
    fcWidget: any;
  }
  interface Document {
    exitFullscreen: () => void;
    mozCancelFullScreen: () => void;
    webkitExitFullscreen: () => void;
    fullscreenElement: () => void;
    mozFullScreenElement: () => void;
    mozFullScreenElement: () => void;
    webkitFullscreenElement: () => void;
    mozFullScreen: () => void;
    cancelFullScreen: () => void;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: (element: Element) => Promise<void>;
  }
}

export const usbDevice = window.usbDevice;
export const fcWidget = window.fcWidget;
