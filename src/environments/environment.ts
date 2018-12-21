// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  slackToken: "xoxp-89114187346-89114187490-312400465808-3882dc00c7267851ebb6863169048250",
  slackAppClientId: "",
  slackAppClientSecret: "",
  backendUrl: "http://localhost:55330",
  currentVersion: "1.0.4",
  getLegacyGallery: true  
};
