import { Page, Locator, expect } from "@playwright/test";
import { leaveRequestData } from "../utils/leaveRequestData";

export class LeaveRequestPage {

    readonly page: Page;

    readonly leaveType: Locator;
    readonly fromDate: Locator;
    readonly toDate: Locator;
    readonly reason: Locator;
    readonly handover: Locator;
    readonly submitButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.leaveType = page.locator('select[name="leaveType"]');

        this.fromDate = page.locator('input[name="fromDate"]');

        this.toDate = page.locator('input[name="toDate"]');

        this.reason = page.locator('textarea[name="reason"]');

        this.handover = page.locator('select[name="handoverTo"]');

        this.submitButton = page.locator('button[type="submit"]');

        this.logoutButton = page.locator('button.sidebar-logout-btn');
    }

    async applyLeave() {

        console.log("========== APPLY LEAVE ==========");

        await expect(this.leaveType).toBeVisible();

        console.log("Selecting Leave Type...");

        // Your HTML option values are:
        // casual, sick, annual
        await this.leaveType.selectOption({
            value: "casual"
        });

        console.log("Entering From Date...");

        await this.fromDate.fill(leaveRequestData.fromDate);

        console.log("Entering To Date...");

        await this.toDate.fill(leaveRequestData.toDate);

        console.log("Entering Reason...");

        await this.reason.fill(leaveRequestData.reason);

        console.log("Selecting Handover...");

        await this.handover.selectOption({
            label: leaveRequestData.handoverTo
        });

        await this.page.screenshot({
            path: "leave-before-submit.png",
            fullPage: true
        });

        console.log("Submitting Leave...");

        await this.submitButton.click();

        await this.page.waitForTimeout(3000);

        console.log(await this.page.url());
    }

    async verifyLeaveSubmitted() {

        const body = await this.page.locator("body").innerText();

        console.log(body);

        expect(body).toContain(
            leaveRequestData.reason
        );

        console.log("Leave Submitted Successfully");
    }

    async logout() {

        console.log("Logging Out...");

        await this.logoutButton.click();

        await this.page.waitForURL(/login/);

        console.log("Logout Successful");
    }
}