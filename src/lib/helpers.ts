export const resizeImage = (url: string, width = '', height = '') =>
  `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`;

export const subtitleProxy = (url: string) =>
  `https://srt-to-vtt.vercel.app?url=${encodeURIComponent(url)}`;

export const IMAGE_CARD_SIZE = [
  {
    width: 200,
    height: 100,
  },
  {
    width: 175,
    height: 246,
  },
];

/**
 * Toogle fullscreen
 * @param element
 */
export function toggleFullScreen(): void {
  if (typeof window !== undefined) {
    if (
      !document.fullscreenElement ||
      (!document.mozFullScreen && !document.webkitExitFullscreen)
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullscreen) {
        document.documentElement.mozRequestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          (<any>Element).ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
}

/**
 *  formating video time
 *
 * @param time
 * @returns
 */
export const formatVideoTime = (time: number) => {
  const date = new Date(0);
  date.setSeconds(time);
  const timeString = date.toISOString().substr(11, 8);
  return timeString;
};

/**
 * Detect device type
 * @returns
 */
export const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

/**
 *  Parsing HTML to Text
 *
 * @param html
 * @returns
 */
export const htmlToText = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent as string;
};

/**
 * Calculate time from current time to end time to get created time
 *
 * @param timeCreated
 * @returns
 */
export const calculateCreatedTime = (timeCreated: number) => {
  const periods = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };
  const diff = Date.now() - timeCreated;

  for (const key in periods) {
    if (diff >= periods[key as keyof typeof periods]) {
      const result = Math.floor(diff / periods[key as keyof typeof periods]);
      return `${result} ${result === 1 ? key : key + 's'} ago`;
    }
  }

  return 'Just now';
};

/**
 * Debounce a function
 *
 * @param func  Function to debounce
 * @param wait  Time in milliseconds to debounce
 * @param immediate  Whether to call function immediately or wait for debounce
 * @returns Debounced function
 * @example const debounced = debounce(() => console.log('debounced'), 1000);
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  ms: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timer: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise<ReturnType<T>>((resolve) => {
      timer = setTimeout(() => {
        const returnValue = callback(...args) as ReturnType<T>;
        resolve(returnValue);
      }, ms);
    });
  };
}
