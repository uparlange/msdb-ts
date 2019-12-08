export const environment = {
  production: true,
  get assetsFolder() {
    return window.hasOwnProperty("nw") ? "/dist-ng/assets" : "/assets";
  },
  wsPort: "56789"
};
