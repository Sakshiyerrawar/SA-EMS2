import { Page, Locator, expect } from '@playwright/test';

export class AnnouncementsPage {

    readonly page: Page;

    readonly titleInput: Locator;
    readonly messageInput: Locator;
    readonly priorityDropdown: Locator;
    readonly postAnnouncementButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.titleInput =
            page.locator('input').first();

        this.messageInput =
            page.locator('textarea');

        this.priorityDropdown =
            page.locator('select').first();

        this.postAnnouncementButton =
            page.locator('button[type="submit"]');

        this.successMessage =
            page.locator('.form-success');
    }

    async createAnnouncement(
        title: string,
        message: string
    ) {

        console.log('Before Title');

        await this.titleInput.fill(title);

        console.log('Title Filled');

        await this.messageInput.fill(message);

        console.log('Message Filled');

        await this.priorityDropdown.selectOption({
            value: 'high'
        });

        console.log('Priority Selected');

        await this.postAnnouncementButton.click();

        console.log('Button Clicked');
    }

    async verifyAnnouncementCreated() {

        await expect(
            this.successMessage
        ).toContainText(
            'Announcement posted!'
        );

        console.log(
            'Announcement Created Successfully'
        );
    }
}