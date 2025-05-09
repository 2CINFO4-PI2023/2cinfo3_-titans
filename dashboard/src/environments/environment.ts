// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    PUSHER_APP_ID:"1638031",
    PUSHER_APP_KEY:"e08b2a9be023e7312590",
    PUSHER_APP_SECRET:"ffb48712c69c61897ed7",
    PUSHER_APP_CLUSTER:"eu",
    PUSHER_EVENT:"outofstock",
    PUSHER_CHANNEL:"pureplats",
    baseUrl:"http://localhost:9090/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
