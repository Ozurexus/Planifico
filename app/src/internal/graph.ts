import { Client, PageIterator } from '@microsoft/microsoft-graph-client';
import type { GraphRequestOptions, PageCollection } from '@microsoft/microsoft-graph-client';
import type { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { endOfWeek, startOfWeek } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import type { User, Event } from 'microsoft-graph';
import type { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/authentication/azureTokenCredentials/TokenCredentialAuthenticationProvider';

export async function getUser(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
): Promise<User> {
  const graphClient = Client.initWithMiddleware({
    authProvider,
  });
  const user: User = await graphClient.api('/me').get();
  return user;
}

export async function getUserYearCalendar(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  timeZone: string,
): Promise<Event[]> {
  const now = new Date();
  const graphClient = Client.initWithMiddleware({
    authProvider,
  });

  const end = new Date(now);
  end.setDate(end.getDate() + 365);

  const startDateTime = zonedTimeToUtc(startOfWeek(now), timeZone).toISOString();
  const endDateTime = zonedTimeToUtc(end, timeZone).toISOString();
  const response: PageCollection = await graphClient!
    .api('/me/calendarview')
    .header('Prefer', `outlook.timezone="${timeZone}"`)
    .query({ startDateTime, endDateTime })
    .select('subject,organizer,start,end')
    .orderby('start/dateTime')
    .top(25)
    .get();

  if (response['@odata.nextLink']) {
    const events: Event[] = [];
    const options: GraphRequestOptions = {
      headers: { Prefer: `outlook.timezone="${timeZone}"` },
    };

    const pageIterator = new PageIterator(
			graphClient!,
			response,
			(event) => {
			  events.push(event);
			  return true;
			},
			options,
    );

    await pageIterator.iterate();

    return events;
  }
  return response.value;
}

export async function createEvent(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  newEvent: Event,
): Promise<Event> {
  const graphClient = Client.initWithMiddleware({
    authProvider,
  });
  return await graphClient!.api('/me/events').post(newEvent);
}

export async function deleteEvent(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  eventID: string,
): Promise<Event> {
  const graphClient = Client.initWithMiddleware({
    authProvider,
  });
  return await graphClient!.api(`/me/events/${eventID}`).delete();
}
