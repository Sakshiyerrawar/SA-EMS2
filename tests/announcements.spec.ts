import { test } from '@playwright/test';
import { AnnouncementsPage } from '../pages/announcementsPage';

import fs from 'fs';

test('Create Announcement', async ({ page }) => {

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

    await page.waitForURL(
        /dashboard/
    );

    await page.goto(
        'https://chocolate-dove-141370.hostingersite.com/admin/announcements'
    );

    const announcements =
        new AnnouncementsPage(page);

    const uniqueTitle =
        `Announcement_${Date.now()}`;

    await announcements.createAnnouncement(
        uniqueTitle,
        'Automation Testing Announcement'
    );

    await announcements.verifyAnnouncementCreated(
        uniqueTitle
    );

    // Save latest announcement title
    fs.writeFileSync(
        './utils/announcementData.json',
        JSON.stringify(
            {
                title: uniqueTitle
            },
            null,
            2
        )
    );

    console.log(
        'Announcement title saved successfully'
    );

    await announcements.logout();

    await page.screenshot({
        path: 'announcement-created.png',
        fullPage: true
    });
});