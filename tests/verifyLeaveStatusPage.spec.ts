import { test } from "@playwright/test";

import { LoginPage } from "../pages/loginPage";

import { leaveRequestData } from "../utils/leaveRequestData";
import { users } from "../utils/users";
import { VerifyLeaveStatusPage } from "../pages/verifyLeaveStatusPage";

test("Verify Leave Approved Status", async ({ page }) => {

    test.setTimeout(120000);

    const login = new LoginPage(page);

    const verify = new VerifyLeaveStatusPage(page);

    await login.navigate();

    await login.login(
        users.teamLead.email,
        users.teamLead.password
    );

    await page.waitForURL(/dashboard/);

    await verify.openPage();

    await verify.verifyApprovedStatus();

    await verify.logout();

});