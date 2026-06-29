import { Page, Locator, expect } from '@playwright/test';

export class MeetingsPage {

    readonly page: Page;

    readonly titleInput: Locator;
    readonly oneTimeButton: Locator;
    readonly dateInput: Locator;
    readonly startTimeInput: Locator;
    readonly endTimeInput: Locator;
    readonly meetingLinkInput: Locator;
    readonly audienceDropdown: Locator;
    readonly agendaInput: Locator;
    readonly scheduleButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.titleInput = page.locator('input[name="title"]');
        this.oneTimeButton = page.getByRole('button', { name: 'One-time' });

        this.dateInput = page.locator('input[name="startDate"]');
        this.startTimeInput = page.locator('input[name="time"]');
        this.endTimeInput = page.locator('input[name="endTime"]');

        this.meetingLinkInput = page.locator('input[name="meetLink"]');

        this.audienceDropdown = page.locator('select[name="audience"]');

        this.agendaInput = page.locator('textarea[name="agenda"]');

        this.scheduleButton = page.locator('button[type="submit"]');
    }

   async createMeeting(title: string) {

    console.log("========== CREATE MEETING START ==========");

    await expect(this.titleInput).toBeVisible();

    console.log("Page URL:", await this.page.url());

    console.log("Filling Title...");
    await this.titleInput.fill(title);
    console.log("Title Value:", await this.titleInput.inputValue());

    console.log("Click One Time...");
    await this.oneTimeButton.click();

    console.log("Filling Start Date...");
    await this.dateInput.fill("2026-06-29");
    console.log("Start Date:", await this.dateInput.inputValue());

    const endDate = this.page.locator('input[name="endDate"]');

    console.log("Filling End Date...");
    await endDate.fill("2026-06-29");
    console.log("End Date:", await endDate.inputValue());

    console.log("Filling Start Time...");
    await this.startTimeInput.fill("10:00");
    console.log("Start Time:", await this.startTimeInput.inputValue());

    console.log("Filling End Time...");
    await this.endTimeInput.fill("11:00");
    console.log("End Time:", await this.endTimeInput.inputValue());

    console.log("Filling Meeting Link...");
    await this.meetingLinkInput.fill("https://meet.google.com/abc-defg-hij");
    console.log("Meeting Link:", await this.meetingLinkInput.inputValue());

    console.log("Selecting Audience...");
    await this.audienceDropdown.selectOption({ value: "Engineering" });

    console.log(
        "Selected Audience:",
        await this.audienceDropdown.inputValue()
    );

    console.log("Filling Agenda...");
    await this.agendaInput.fill("Automation Testing Meeting");
    console.log("Agenda:", await this.agendaInput.inputValue());

    await this.scheduleButton.scrollIntoViewIfNeeded();

    console.log("Taking Screenshot Before Click...");
    await this.page.screenshot({
        path: "before-click.png",
        fullPage: true
    });

    console.log("Click Schedule Button...");
    await this.scheduleButton.click();

    console.log("Button Clicked");

    await this.page.waitForTimeout(3000);

    console.log("Current URL:", await this.page.url());

    const bodyText = await this.page.locator("body").innerText();

    console.log("============== PAGE TEXT ==============");
    console.log(bodyText);
    console.log("=======================================");

    const errors = await this.page.locator(".error,.text-danger,.invalid-feedback").allTextContents();

    console.log("Validation Errors:", errors);

    await this.page.screenshot({
        path: "after-click.png",
        fullPage: true
    });

    console.log("========== CREATE MEETING END ==========");
}

    async verifyMeetingCreated() {

    console.log("Verifying Meeting Creation...");

    const body = await this.page.locator("body").innerText();

    console.log(body);

    await this.page.screenshot({
        path: "verify.png",
        fullPage: true
    });

    if (
        body.includes("cannot be in the past") ||
        body.includes("required") ||
        body.includes("invalid")
    ) {

        console.log("Meeting NOT Created");

        throw new Error("Meeting creation failed");
    }

    console.log("Meeting Created Successfully");
}
}