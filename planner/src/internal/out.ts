// this package is needed to for ui

import { config as conf} from "./config";
import { getUser, getUserWeekCalendar} from "./graph";
import * as Msal from "msal";
import type { Configuration } from "msal";
import { findIana } from 'windows-iana';
import type {AuthProvider } from "@microsoft/microsoft-graph-client";
import type {Client} from '@microsoft/microsoft-graph-client';
import {PublicClientApplication} from "@azure/msal-browser";
import {InteractionType} from "@azure/msal-browser";
import type { User, Event, Calendar } from 'microsoft-graph';
import {TokenCredentialAuthenticationProvider} from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials"
import { ms } from "date-fns/locale";
import {AuthCodeMSALBrowserAuthenticationProvider, type AuthCodeMSALBrowserAuthenticationProviderOptions}  from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { ClientSecretCredential } from "@azure/identity";
import type { AccountInfo } from "@azure/msal-browser";
import { msalInstance } from "./authService";

import { endOfWeek, startOfWeek } from 'date-fns';
import { add, format, getDay, parseISO } from 'date-fns';


// return user that has signed in
export async function getCurrentUser(account: AccountInfo): Promise<User>{
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance, {
            account: account,
            scopes: conf.scopes,
            interactionType: InteractionType.Popup
        });
    return await getUser(authProvider);
}

// return user that has signed in
export async function getCurrentCalendar(account: AccountInfo): Promise<Event[]>{
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance, {
            account: account,
            scopes: conf.scopes,
            interactionType: InteractionType.Popup
        });

    const user: User = await getCurrentUser(account);
    const ianaTimeZones = findIana(user.mailboxSettings?.timeZone || 'UTC');
    const events: Event[] = await getUserWeekCalendar(authProvider, ianaTimeZones[0].valueOf());
    console.log(events);
    return events;
}

// this function returns beginning of weekend
export function getCurrentWeekStart(): Date{    
    const result = startOfWeek(new Date());

    // can use like 
    // >> import import {format} from 'date-fns';
    // >> format(result, 'MMMM d, yyyy')
    // >> out: July 10, 2022
    console.log(format(result, 'MMMM d, yyyy'));
    return result;
}

// this function returns end of weeken
export function getCurrentWeekEnd(weekStart: Date): Date{
    const result = endOfWeek(weekStart)
    // can use like format(result, 'MMMM d, yyyy')
    return result;
}
