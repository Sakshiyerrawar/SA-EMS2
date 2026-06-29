import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MeetingsPage } from '../pages/meetingsPage';
import { users } from '../utils/users';
import { meetingData } from '../utils/meetingData';

test('Create Meeting', async ({ page }) => {

    test.setTimeout(120000);

    console.log("========== TEST START ==========");

    const login = new LoginPage(page);
    const meetings = new MeetingsPage(page);

    console.log("Opening Login Page...");
    await login.navigate();

    console.log("Logging In...");
    await login.login(
        users.admin.email,
        users.admin.password
    );

    console.log("Waiting for Dashboard...");
    await page.waitForURL(/dashboard/, {
        timeout: 30000
    });

    console.log("Dashboard URL:", await page.url());

    console.log("Opening Meetings Page...");

    await page.goto(
        "https://chocolate-dove-141370.hostingersite.com/admin/meetings",
        {
            waitUntil: "domcontentloaded"
        }
    );

    await page.waitForLoadState("networkidle");

    console.log("Meetings URL:", await page.url());

    await page.waitForSelector(
        'input[name="title"]',
        {
            timeout: 30000
        }
    );

    console.log("Meetings Page Loaded");

    console.log("Meeting Data");

    console.log(meetingData);

    await meetings.createMeeting(
        meetingData.title
    );

    console.log("Verifying Meeting...");

    await meetings.verifyMeetingCreated();

    await page.screenshot({
        path: "meeting-created.png",
        fullPage: true
    });

    console.log("Screenshot Taken");

    console.log("========== TEST END ==========");
});