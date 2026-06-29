import { Page, Locator, expect } from '@playwright/test';

export class VerifyTLAnnouncementPage {

    readonly page: Page;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.logoutButton =
            page.locator('button.sidebar-logout-btn');
    }

    async verifyTLAnnouncementVisible(
        announcementTitle: string
    ) {

        await this.page.goto(
            'https://chocolate-dove-141370.hostingersite.com/lead/announcements'
        );

        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);

        console.log('Current URL:', this.page.url());
        console.log('Searching:', announcementTitle);

        const announcement =
            this.page.getByText(
                announcementTitle,
                { exact: true }
            );

        await expect(
            announcement
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'Announcement is visible to Team Lead'
        );
    }

    async logout() {

        await this.logoutButton.click();

        await this.page.waitForURL(/login/);

        console.log('Logout Successful');
    }
}








/*
import { test } from '@playwright/test';
import { VerifyTLAnnouncementPage } from '../pages/verifyTLAnnouncementPage';
import announcementData from '../utils/announcementData.json';

test(
    'Verify Admin Announcement Visible To Team Lead',
    async ({ page }) => {

        const verifyTLAnnouncement =
            new VerifyTLAnnouncementPage(page);

        await verifyTLAnnouncement.login();

        await verifyTLAnnouncement.verifyTLAnnouncementVisible(
            announcementData.title
        );

        await verifyTLAnnouncement.logout();
    }
);











/*
import { test } from '@playwright/test';
import { VerifyTLAnnouncementPage } from '../pages/verifyTLAnnouncementPage';
import announcementData from '../utils/announcementData.json';

test(
    'Verify Admin Announcement Visible To Team Lead',
    async ({ page }) => {

      const verifyTLAnnouncement =
    new VerifyTLAnnouncementPage(page);


        await verifyTLAnnouncement.login();

        await verifyTLAnnouncement.verifyTLAnnouncementVisible(
            announcementData.title
        );

        await verifyTLAnnouncement.logout();
    }
); 
*/