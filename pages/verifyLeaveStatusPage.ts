import { Page, Locator, expect } from "@playwright/test";
import { leaveRequestData } from "../utils/leaveRequestData";

export class VerifyLeaveStatusPage {

    readonly page: Page;

    readonly profileButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.profileButton =
            page.locator("button").last();

        this.logoutButton =
            page.getByText("Logout");

    }

    async openPage() {

        console.log("Opening Team Lead Leave Page...");

        await this.page.goto(
            "https://chocolate-dove-141370.hostingersite.com/lead/leave"
        );

        await this.page.waitForLoadState("domcontentloaded");

        console.log(await this.page.url());

    }
/*
    async verifyApprovedStatus() {

        console.log("Verifying Approved Leave...");

        await expect(
            this.page.getByText(
                leaveRequestData.reason,
                { exact: false }
            )
        ).toBeVisible();

        await expect(
            this.page.getByText(
                "APPROVED",
                { exact: false }
            )
        ).toBeVisible();

        console.log("Leave Status Verified Successfully");

        await this.page.screenshot({
            path: "leave-approved-status.png",
            fullPage: true
        });

    }
*/

async verifyApprovedStatus() {

    console.log("Verifying Leave Status...");

    await this.page
        .getByRole("heading", { name: "Leave History" })
        .scrollIntoViewIfNeeded();

    await this.page.waitForTimeout(1000);

    const leaveCard = this.page.locator(".leave-history-item").filter({
        has: this.page.locator(".leave-history-reason", {
            hasText: leaveRequestData.reason
        })
    });

    await expect(leaveCard).toHaveCount(1);

    const actualLeaveType = (
        await leaveCard.locator(".leave-history-type").textContent()
    )?.trim().toLowerCase();

    expect(actualLeaveType).toBe(
        leaveRequestData.leaveType.trim().toLowerCase()
    );

    await expect(
        leaveCard.locator(".leave-history-reason")
    ).toContainText(leaveRequestData.reason);

    await expect(
        leaveCard.locator(".status-pill")
    ).toContainText(/approved/i);

    console.log("Leave Approved Successfully");
}


    async logout() {

        console.log("Logging Out...");

        if (await this.profileButton.count() > 0) {

            await this.profileButton.click();

            if (await this.logoutButton.count() > 0) {

                await this.logoutButton.click();

            }

        }

        console.log("Logout Successful");

    }

}
