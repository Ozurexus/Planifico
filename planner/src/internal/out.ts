// this package is needed to for ui

import { config as conf} from "./config";
import { createEvent, getUser, getUserYearCalendar, deleteEvent} from "./graph";
import * as Msal from "msal";
import type { Configuration } from "msal";
import { findIana } from 'windows-iana';
import type {AuthProvider } from "@microsoft/microsoft-graph-client";
import type {Client} from '@microsoft/microsoft-graph-client';
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
import {dateEqualsByDay, eventDays, generateSubject, parseEventTags, parseEventText, parseTimehhmm, timeForCreationEvent} from "./calendar";
import { CalendarEvent } from "./event";


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
export async function getCurrentCalendar(account: AccountInfo): Promise<eventDays[]>{
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance, {
            account: account,
            scopes: conf.scopes,
            interactionType: InteractionType.Popup
        });

    const user: User = await getCurrentUser(account);
    const ianaTimeZones = findIana(user.mailboxSettings?.timeZone || 'UTC');
    const events: Event[] = await getUserYearCalendar(authProvider, ianaTimeZones[0].valueOf());
    
    console.log(events)
    
    const result: eventDays[] = [];
    let prev: CalendarEvent[] = [];
    

    let i = 0;
    while (i < events.length){
        let curDate = new Date(events[i].start!.dateTime!);
        const prevDate = new Date(events[i].start!.dateTime!);

        prev = [];
        while (i < events.length && dateEqualsByDay(prevDate, curDate)){
            curDate = new Date(events[i].start!.dateTime!);
            const start = parseTimehhmm(events[i].start!.dateTime!);
            const end = parseTimehhmm(events[i].end!.dateTime!);
            const title: string = parseEventText(events[i].subject!);
            const tags: string[] = parseEventTags(events[i].subject!);
            const id: string = events[i].id!; 
            
            if (!dateEqualsByDay(prevDate, curDate)){
                break;
            }
            prev.push(new CalendarEvent(title, start, end, tags, id));
            i++;
        }
        result.push(new eventDays(prevDate, prev));
    }
    return result;
}

export async function newEventCalendar(account: AccountInfo, date: Date, event: CalendarEvent): Promise<void>{
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance, {
            account: account,
            scopes: conf.scopes,
            interactionType: InteractionType.Popup
        });
    const subject = generateSubject(event.tags, event.title);

    const user: User = await getCurrentUser(account);
    const timeZone =  findIana(user.mailboxSettings?.timeZone || 'UTC')[0].valueOf()

    // 2022-07-30T12:51  ~~  2022-07-30T16:14  ||||  UTC
    
    const eventAPI: Event = {
        subject: subject,
        start: {
            dateTime: timeForCreationEvent(date, event.timeStart),
            timeZone: timeZone
        },
        end:{
            dateTime: timeForCreationEvent(date, event.timeEnd),
            timeZone: timeZone
        },
    }
    createEvent(authProvider, eventAPI);
    console.log("new event from ", user.displayName)

}

export async function eventDelete(account: AccountInfo, eventID: string): Promise<void>{
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance, {
            account: account,
            scopes: conf.scopes,
            interactionType: InteractionType.Popup
        });
    
    deleteEvent(authProvider, eventID);
    console.log("delete event")

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

// this function returns end of weekend
export function getCurrentWeekEnd(weekStart: Date): Date{
    const result = endOfWeek(weekStart)
    // can use like format(result, 'MMMM d, yyyy')
    return result;
}
