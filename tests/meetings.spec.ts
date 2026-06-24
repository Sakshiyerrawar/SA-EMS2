import { test } from '@playwright/test';
import { MeetingsPage } from '../pages/meetingsPage';

test('Create Meeting', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto(
        'https://chocolate-dove-141370.hostingersite.com/login'
    );

    await page.locator(
        'input[type="email"]'
    ).fill(
        'praneethgundu03@gmail.com'
    );

    await page.locator(
        'input[type="password"]'
    ).fill(
        'Praneeth123'
    );

    await page.getByRole(
        'button',
        { name: 'Sign In' }
    ).click();

    await page.waitForURL(
        /dashboard/
    );

    console.log(
        'Dashboard URL:',
        page.url()
    );

    await page.goto(
        'https://chocolate-dove-141370.hostingersite.com/admin/meetings'
    );

    await page.waitForTimeout(
        5000
    );

    console.log(
        'Meetings URL:',
        page.url()
    );

    const meetings =
        new MeetingsPage(page);

    await meetings.createMeeting(
        `Meeting_${Date.now()}`
    );

    await page.waitForTimeout(
        3000
    );

    await meetings.logout();

    await page.screenshot({
        path: 'meeting-created.png',
        fullPage: true
    });
});














/*import { test } from '@playwright/test';
import { MeetingsPage } from '../pages/meetingsPage';

test('Create Meeting', async ({ page }) => {

    await page.goto(
        'https://chocolate-dove-141370.hostingersite.com/login'
    );

    await page.locator('input[type="email"]')
        .fill('praneethgundu03@gmail.com');

    await page.locator('input[type="password"]')
        .fill('Praneeth123');

    await page.getByRole('button', {
        name: 'Sign In'
    }).click();

    await page.waitForURL(/dashboard/);

    console.log(
        'Dashboard URL:',
        await page.url()
    );

    await page.goto(
        'https://chocolate-dove-141370.hostingersite.com/admin/meetings'
    );

    await page.waitForTimeout(3000);

    console.log(
        'Meetings URL:',
        await page.url()
    );

    const meetings =
        new MeetingsPage(page);

    const uniqueTitle =
        `Meeting_${Date.now()}`;

    await meetings.createMeeting(
        uniqueTitle
    );

    await meetings.verifyMeetingCreated();

    await page.screenshot({
        path: 'meeting-created.png',
        fullPage: true
    });

    
});
*/