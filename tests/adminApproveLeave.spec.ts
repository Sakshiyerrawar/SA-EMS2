import { test } from "@playwright/test";

import { LoginPage } from "../pages/loginPage";
import { AdminLeaveApprovalPage } from "../pages/adminLeaveApprovalPage";

import { users } from "../utils/users";

test("Admin Approve Leave", async ({ page }) => {

    test.setTimeout(120000);

    const login =
        new LoginPage(page);

    const leave =
        new AdminLeaveApprovalPage(page);

    await login.navigate();

    await login.login(
        users.admin.email,
        users.admin.password
    );

    await page.waitForURL(/dashboard/);

    await leave.openPage();

    await leave.approveLatestLeave();

    await leave.verifyApproved();

    await page.screenshot({
        path: "leave-approved.png",
        fullPage: true
    });

    await leave.logout();
});