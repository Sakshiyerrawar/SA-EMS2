import { Page, Locator, expect } from '@playwright/test';

export class AnnouncementsPage {

    readonly page: Page;

    readonly titleInput: Locator;
    readonly messageInput: Locator;
    readonly priorityDropdown: Locator;
    readonly audienceDropdown: Locator;
    readonly postAnnouncementButton: Locator;

    readonly logoutButton: Locator;

    constructor(page: Page) {


        this.logoutButton =
    page.locator('button.sidebar-logout-btn');

        this.page = page;

        this.titleInput =
            page.locator('input[name="title"]');

        this.messageInput =
            page.locator('textarea[name="message"]');

        this.priorityDropdown =
            page.locator('select[name="priority"]');

        this.audienceDropdown =
            page.locator('select[name="audience"]');

        this.postAnnouncementButton =
            page.locator('button[type="submit"]');
    }

    async createAnnouncement(
        title: string,
        message: string
    ) {

        await this.titleInput.fill(title);

        await this.messageInput.fill(message);

        // Priority = High
        await this.priorityDropdown.selectOption({
            value: 'high'
        });

        // Send To = Team Leads
        await this.audienceDropdown.selectOption({
            value: 'leads'
        });

        await this.postAnnouncementButton.click();

        await this.page.waitForTimeout(3000);
    }

    async verifyAnnouncementCreated(title: string) {

        await expect(
            this.page.getByText(title)
        ).toBeVisible({
            timeout: 10000
        });

        console.log('Announcement Created Successfully');

        
    }
    async logout() {

    console.log('Logout Started');

    await this.logoutButton.click();

    await this.page.waitForURL(
        /login/,
        {
            timeout: 10000
        }
    );

    console.log(
        'Logged Out Successfully'
    );
}
    
}