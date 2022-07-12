/**
 * @jest-environment jsdom
 */

import {
	parseEventTags,
	parseEventText,
	dateEqualsByDay,
	generateSubject,
	timeForCreationEvent,
	parseTimehhmm
} from '../internal/calendar';

test('testing parseEventTags()', () => {
	expect(parseEventTags('EvenText ~~~ tag1 tag2 tag3')).toEqual(['tag1', 'tag2', 'tag3']);
});

test('testing parseEventText()', () => {
	expect(parseEventText('EvenText ~~~ tag1 tag2 tag3')).toEqual('EvenText');
});

test('testing dateEqualsByDay()', () => {
	const date1 = new Date('1995-12-17T03:24:00');
	const date2 = new Date('1995-12-17T04:25:00');
	expect(dateEqualsByDay(date1, date2)).toBe(true);
});

test('testing generateSubject()', () => {
	const title = 'event Text';
	const tags = ['tag1', 'tag2', 'tag3'];
	expect(generateSubject(tags, title)).toBe('event Text ~~~ tag1 tag2 tag3');
});

test('testing timeForCreationEvent()', () => {
	const d = new Date('1995-12-17');
	const g = '04:25';

	expect(timeForCreationEvent(d, g)).toBe('1995-12-17T04:25');
});

test('testing parseTimehhmm()', () => {
	const t = '1995-12-17T03:24:00';

	expect(parseTimehhmm(t)).toBe('03:24');
});
