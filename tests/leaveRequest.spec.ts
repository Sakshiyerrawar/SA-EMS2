import { test } from "@playwright/test";

import { LoginPage } from "../pages/loginPage";

import { LeaveRequestPage } from "../pages/leaveRequestPage";

import { users } from "../utils/users";

test(
    "Team Lead Apply Leave",
    async ({ page }) => {

        test.setTimeout(120000);

        console.log("========== TEST START ==========");

        const login =
            new LoginPage(page);

        const leave =
            new LeaveRequestPage(page);

        console.log("Opening Login");

        await login.navigate();

        console.log("Login As Team Lead");

        await login.login(

            users.teamLead.email,

            users.teamLead.password

        );

        await page.waitForURL(/dashboard/);

        console.log(await page.url());

        console.log("Opening Leave Page");

        await page.goto(

            "https://chocolate-dove-141370.hostingersite.com/lead/leave"

        );

        await leave.applyLeave();

        await leave.verifyLeaveSubmitted();

        await page.screenshot({

            path: "leave-request-created.png",

            fullPage: true

        });

        console.log("========== TEST END ==========");

    }
);