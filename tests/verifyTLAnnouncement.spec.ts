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