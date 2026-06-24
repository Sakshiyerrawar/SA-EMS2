import {
    Page,
    Locator,
    expect
} from '@playwright/test';

export class VerifyMeetPage {

    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    readonly logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.emailInput =
            page.locator(
                'input[type="email"]'
            );

        this.passwordInput =
            page.locator(
                'input[type="password"]'
            );

        this.signInButton =
            page.getByRole(
                'button',
                {
                    name: 'Sign In'
                }
            );

        this.logoutButton =
            page.locator(
                'button.sidebar-logout-btn'
            );
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
            'Login Successful'
        );
    }

  async verifyMeetingVisible(
    meetingTitle: string
) {

    await this.page.goto(
        'https://chocolate-dove-141370.hostingersite.com/lead/meetings'
    );

    await expect(
        this.page.locator('body')
    ).toContainText(
        meetingTitle
    );

    console.log(
        'Meeting Visible To Team Lead'
    );
}

    async logout() {

        console.log(
            'Logout Started'
        );

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






