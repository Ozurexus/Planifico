import { LogLevel } from "msal/lib-commonjs/Logger";

const index = "http://localhost:3000"; // TODO: need to change

export const routes = {
  basePage: index, 
  welcomePage: index + "/welcome", 
  todoPage: index + "/todo", 
  calendarPage: index + "/calendar",
}
export const config = {
    appId: 'ae9c4feb-b833-4ce0-8488-5f840e8cee6b',

    clientId: 'ae9c4feb-b833-4ce0-8488-5f840e8cee6b',
    clientSecret: 'Co18Q~PA-GLP-PD8Be9c3D5RgR2MxoFeKr1DKdq~',
    
    redirectUri: 'http://localhost:3000',
    auth: {
      clientSecret: "Co18Q~PA-GLP-PD8Be9c3D5RgR2MxoFeKr1DKdq~",
      clientId: 'ae9c4feb-b833-4ce0-8488-5f840e8cee6b',
      authority: 'https://login.microsoftonline.com/common',
    },
    system: {
      loggerOptions: {
        loggerCallback(loglevel: any, message: any, containsPii: any) {
          console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: LogLevel.Verbose,
      },
    },
    scopes: [
      'user.read',
      'calendars.readwrite',
      'mailboxsettings.read',
    ],
  };