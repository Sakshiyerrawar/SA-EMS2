import { Page, Locator, expect } from "@playwright/test";
import { leaveRequestData } from "../utils/leaveRequestData";

export class AdminLeaveApprovalPage {

    readonly page: Page;

    readonly searchBox: Locator;

    constructor(page: Page) {

        this.page = page;

        this.searchBox =
            page.locator('input[type="search"]');

    }

    async openPage() {

        await this.page.goto(
            "https://chocolate-dove-141370.hostingersite.com/admin/leave"
        );

        await this.page.waitForLoadState("networkidle");
    }

    async approveLatestLeave() {

        console.log("Searching Leave Request...");

        const row =
            this.page.locator("tr").filter({
                hasText: leaveRequestData.reason
            });

        await expect(row).toBeVisible({
            timeout: 15000
        });

        console.log("Leave Request Found");

        await row.locator("button.btn-success-sm").click();

        console.log("Approve Button Clicked");

        await this.page.waitForTimeout(3000);
    }


   async verifyApproved() {

    const row = this.page.locator("tr").filter({
        hasText: leaveRequestData.reason
    });

    await expect(row).toContainText(/APPROVED/i);

    console.log("Leave Approved Successfully");
}

    async logout() {

        await this.page.locator(
            "button.sidebar-logout-btn"
        ).click();

        await this.page.waitForURL(/login/);

        console.log("Logout Successful");
    }
}