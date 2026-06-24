import { test } from '@playwright/test';
import { AnnouncementsPage } from '../pages/announcementspage';

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

    await page.waitForURL(/dashboard/);

    console.log(
        'Dashboard URL:',
        await page.url()
    );

    await page.goto(
        'https://chocolate-dove-141370.hostingersite.com/admin/announcements'
    );

    await page.waitForTimeout(3000);

    const announcements =
        new AnnouncementsPage(page);

    const uniqueTitle =
        `Announcement_${Date.now()}`;

    await announcements.createAnnouncement(
        uniqueTitle,
        'Automation Testing Announcement'
    );

    await announcements.verifyAnnouncementCreated();

    await page.screenshot({
        path: 'announcement-created.png',
        fullPage: true
    });
});







/*import { test } from '@playwright/test';
import { AnnouncementsPage } from '../pages/announcementspage';


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

    await page.waitForURL(/dashboard/);

    console.log(
        'Dashboard URL:',
        await page.url()
    );

    await page.goto(
        'https://chocolate-dove-141370.hostingersite.com/admin/announcements'
    );

    await page.waitForTimeout(3000);

    const announcements =
        new AnnouncementsPage(page);

    const uniqueTitle =
        `Announcement_${Date.now()}`;

    await announcements.createAnnouncement(
        uniqueTitle,
        announcementData.message
    );

    await announcements.verifyAnnouncementCreated();

    await page.screenshot({
        path: 'announcement-created.png',
        fullPage: true
    });
});     
*/