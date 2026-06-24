import {
    Page,
    Locator,
    expect
} from '@playwright/test';

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
    readonly successMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.titleInput =
            page.locator(
                'input[name="title"]'
            );

        this.oneTimeButton =
            page.getByRole(
                'button',
                {
                    name: 'One-time'
                }
            );

        this.dateInput =
            page.locator(
                'input[name="startDate"]'
            );

        this.startTimeInput =
            page.locator(
                'input[name="time"]'
            );

        this.endTimeInput =
            page.locator(
                'input[name="endTime"]'
            );

        this.meetingLinkInput =
            page.locator(
                'input[name="meetLink"]'
            );

        this.audienceDropdown =
            page.locator(
                'select[name="audience"]'
            );

        this.agendaInput =
            page.locator(
                'textarea[name="agenda"]'
            );

        this.scheduleButton =
            page.locator(
                'button[type="submit"]'
            );

        this.successMessage =
            page.locator(
                '.form-success'
            );

        this.logoutButton =
            page.locator(
                'button.sidebar-logout-btn'
            );
    }

    async createMeeting(
        title: string
    ) {

        console.log(
            'Before Title'
        );

        await this.titleInput.fill(
            title
        );

        console.log(
            'Title Filled'
        );

        await this.oneTimeButton.click();

        const tomorrow =
            new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const meetingDate =
            tomorrow
                .toISOString()
                .split('T')[0];

        await this.dateInput.fill(
            meetingDate
        );

        console.log(
            'Date Filled'
        );

        const start =
            new Date();

        start.setHours(
            start.getHours() + 1
        );

        const startTime =
            `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;

        await this.startTimeInput.fill(
            startTime
        );

        console.log(
            'Start Time Filled'
        );

        const end =
            new Date();

        end.setHours(
            end.getHours() + 2
        );

        const endTime =
            `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;

        await this.endTimeInput.fill(
            endTime
        );

        console.log(
            'End Time Filled'
        );

        await this.meetingLinkInput.fill(
            'https://meet.google.com/test-meeting'
        );

        console.log(
            'Meeting Link Filled'
        );

        await this.audienceDropdown.selectOption({
            label: 'Engineering'
        });

        console.log(
            'Audience Selected'
        );

        await this.agendaInput.fill(
            'Automation Testing Meeting'
        );

        console.log(
            'Agenda Filled'
        );

        await this.scheduleButton.click();

        console.log(
            'Schedule Button Clicked'
        );
    }

    async verifyMeetingCreated() {

        await expect(
            this.page.locator('body')
        ).not.toContainText(
            'Start time cannot be in the past'
        );

        console.log(
            'Meeting Created Successfully'
        );
    }

    async logout() {

        console.log(
            'Logout Started'
        );

        await this.logoutButton.click();

        console.log(
            'Logout Button Clicked'
        );

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












/*import {
    Page,
    Locator,
    expect
} from '@playwright/test';

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
    readonly successMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.titleInput =
            page.locator(
                'input[name="title"]'
            );

        this.oneTimeButton =
            page.getByRole(
                'button',
                { name: 'One-time' }
            );

        this.dateInput =
            page.locator(
                'input[name="startDate"]'
            );

        this.startTimeInput =
            page.locator(
                'input[name="time"]'
            );

        this.endTimeInput =
            page.locator(
                'input[name="endTime"]'
            );

        this.meetingLinkInput =
            page.locator(
                'input[name="meetLink"]'
            );

        this.audienceDropdown =
            page.locator(
                'select[name="audience"]'
            );

        this.agendaInput =
            page.locator(
                'textarea[name="agenda"]'
            );

        this.scheduleButton =
            page.locator(
                'button[type="submit"]'
            );

        this.successMessage =
            page.locator(
                '.form-success'
            );
    }

    async createMeeting(
        title: string
    ) {

        console.log('Before Title');

        await this.titleInput.fill(
            title
        );

        console.log('Title Filled');

        await this.oneTimeButton.click();

        // Tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const meetingDate =
            tomorrow
                .toISOString()
                .split('T')[0];

        await this.dateInput.fill(
            meetingDate
        );

        console.log('Date Filled');

        // Start Time = Current Time + 1 Hour
        const start = new Date();
        start.setHours(
            start.getHours() + 1
        );

        const startTime =
            `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;

        await this.startTimeInput.fill(
            startTime
        );

        console.log('Start Time Filled');

        // End Time = Current Time + 2 Hours
        const end = new Date();
        end.setHours(
            end.getHours() + 2
        );

        const endTime =
            `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;

        await this.endTimeInput.fill(
            endTime
        );

        console.log('End Time Filled');

        await this.meetingLinkInput.fill(
            'https://meet.google.com/test-meeting'
        );

        console.log('Meeting Link Filled');

        await this.audienceDropdown.selectOption({
            value: 'Team Leads Only'
        });

        console.log('Audience Selected');

        await this.agendaInput.fill(
            'Automation Testing Meeting'
        );

        console.log('Agenda Filled');

        await this.scheduleButton.click();

        console.log('Schedule Button Clicked');
    }

    async verifyMeetingCreated() {

        await expect(
            this.successMessage
        ).toBeVisible({
            timeout: 10000
        });

        console.log(
            'Meeting Created Successfully'
        );
    }
    
}*/