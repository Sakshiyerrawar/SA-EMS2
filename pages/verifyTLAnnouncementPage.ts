import {
    Page,
    Locator,
    expect
} from '@playwright/test';

export class VerifyTLAnnouncementPage {

    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.emailInput =
            page.locator('input[type="email"]');

        this.passwordInput =
            page.locator('input[type="password"]');

        this.signInButton =
            page.getByRole('button', {
                name: 'Sign In'
            });

        this.logoutButton =
            page.locator('button.sidebar-logout-btn');
    }

    async login() {

        await this.page.goto(
            'https://chocolate-dove-141370.hostingersite.com/login'
        );

        await this.emailInput.fill(
            'abcd@gmail.com'
        );

        await this.passwordInput.fill(
            '123456'
        );

        await this.signInButton.click();

        await this.page.waitForURL(/dashboard/);

        console.log('Team Lead Login Successful');
    }

async verifyTLAnnouncementVisible(
    announcementTitle: string
) {

    console.log('Opening Team Lead Announcements');

    await this.page.goto(
        'https://chocolate-dove-141370.hostingersite.com/lead/announcements'
    );

    console.log('Announcements Page Opened');

    await this.page.waitForTimeout(5000);

    console.log('Current URL:', await this.page.url());
const announcement =
    this.page.getByText(
        announcementTitle
    );

await announcement.scrollIntoViewIfNeeded();

await expect(
    announcement
).toBeVisible({
    timeout: 15000
});

    console.log('Searching for:', announcementTitle);

    const count = await announcement.count();

    console.log('Found Count:', count);

    await expect(
        announcement
    ).toBeVisible({
        timeout: 15000
    });

    console.log(
        'Announcement is Visible'
    );
}
    async logout() {

        await this.logoutButton.click();

        await this.page.waitForURL(/login/);

        console.log('Logout Successful');
    }
}















/*  import {
    Page,
    Locator,
    expect
} from '@playwright/test';

export class VerifyTLAnnouncementPage {

    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.emailInput =
            page.locator('input[type="email"]');

        this.passwordInput =
            page.locator('input[type="password"]');

        this.signInButton =
            page.getByRole('button', {
                name: 'Sign In'
            });

        this.logoutButton =
            page.locator('button.sidebar-logout-btn');
    }

    async login() {

        await this.page.goto(
            'https://chocolate-dove-141370.hostingersite.com/login'
        );

        await this.emailInput.fill(
            'abcd@gmail.com'
        );

        await this.passwordInput.fill(
            '123456'
        );

        await this.signInButton.click();

        await this.page.waitForURL(
            /dashboard/
        );

        console.log(
            'Team Lead Login Successful'
        );
    }

    async verifyTLAnnouncementVisible(
        announcementTitle: string
    ) {

        await this.page.goto(
            'https://chocolate-dove-141370.hostingersite.com/lead/announcements'
        );

        await expect(
            this.page.getByText(
                announcementTitle,
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 15000
        });

        console.log(
            'Admin Announcement is Visible to Team Lead'
        );
    }

    async logout() {

        await this.logoutButton.click();

        await this.page.waitForURL(
            /login/
        );

        console.log(
            'Logout Successful'
        );
    }
}

*/