import { test } from '@playwright/test';
import { VerifyMeetPage } from '../pages/verifyMeetPage';

import meetingData from '../utils/meetingData.json';

test(
    'Verify Admin Meeting Visible To Team Lead',
    async ({ page }) => {

        const verifyMeet =
            new VerifyMeetPage(page);

        await verifyMeet.login();

        await verifyMeet.verifyMeetingVisible(
            meetingData.title
        );

        await verifyMeet.logout();
    }
);


