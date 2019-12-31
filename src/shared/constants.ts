export const INTERVAL = {
   ms: {
      max: 1000,
      name: 'millisecond'
   },
   m: {
      max: 60,
      name: 'minute'
   },
   s: {
      max: 60,
      name: 'second'
   },
   h: {
      max: 24,
      name: 'hour'
   }
};

export const CHANGE_TIME = {
   up: 'up',
   down: 'down'
};

export const env: any = {};
declare const process: { env: { [key: string]: string } };
for (let e in process.env) {
   if (!isNaN(Number(process.env[e]))) {
      env[e] = +process.env[e];
   } else if (process.env[e] === 'true' || process.env[e] === 'false') {
      env[e] = (process.env[e] === 'true');
   } else {
      env[e] = process.env[e];
   }
}

export const MENU_ITEMS = [
   {key: 'createSession', value: 'Create new SESSION'},
   {key: 'results', value: 'Show results (graph)'},
   {key: 'targets', value: 'Show targets (+ tasks)'},
];
