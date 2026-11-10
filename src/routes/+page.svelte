<script>
    // Use the current date as the base
    let currentDate = new Date();
    let currentYear = $state(currentDate.getFullYear());
    let currentMonth = $state(currentDate.getMonth()); // 0 = January, 11 = December

    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    // Derived the days for the grid
    let daysGrid = $derived.by(() => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        // Weekday of the first day
        let startDayOfWeek = firstDayOfMonth.getDay() - 1; // Changes sunday = 0 to monday = 0
        if (startDayOfWeek === -1) startDayOfWeek = 6;

        // Days of the current month
        const daysInMonth = new Date(
            currentYear,
            currentMonth + 1,
            0,
        ).getDate();

        // Days in the previous month (for filling purposes)
        const daysInPrevMonth = new Date(
            currentYear,
            currentMonth,
            0,
        ).getDate();

        const grid = [];

        // Fill in days of the previous month
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            grid.push({
                day: daysInPrevMonth - i,
                isCurrentMonth: false,
                dateString: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i).toDateString(),
            });
        }

        // Fill in days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const thisDate = new Date(currentYear, currentMonth, i);
            grid.push({
                day: i,
                isCurrentMonth: true,
                isToday: thisDate.toDateString() === new Date().toDateString(),
                dateString: thisDate.toDateString(),
            });
        }

        // Fill in days of the next month until the grid is full
        const remainingSlots = 7 - (grid.length % 7);
        if (remainingSlots < 7) {
            for (let i = 1; i <= remainingSlots; i++) {
                grid.push({
                    day: i,
                    isCurrentMonth: false,
                    dateString: new Date(
                        currentYear,
                        currentMonth + 1,
                        i,
                    ).toDateString(),
                });
            }
        }

        return grid;
    });

    // Navigation
    function goToNext() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
    }

    function goToPrev() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
    }

    function goToCurrent() {
        const today = new Date();
        currentYear = today.getFullYear();
        currentMonth = today.getMonth();
    }

    // Placeholder for the booking mechanism
    // Key: date.toDateString()
    const mockupBookings = {
        [new Date(currentYear, currentMonth, 5).toDateString()]: [
            {
                room: "Konferenzraum A",
                time: "09:00 - 11:00",
                color: "bg-blue-100 text-blue-700 border-blue-300",
            },
            {
                room: "Kreativraum",
                time: "14:00 - 16:00",
                color: "bg-purple-100 text-purple-700 border-purple-300",
            },
        ],
        [new Date(currentYear, currentMonth, 12).toDateString()]: [
            {
                room: "Meetingroom 2",
                time: "11:30 - 13:00",
                color: "bg-amber-100 text-amber-700 border-amber-300",
            },
        ],
        [new Date(currentYear, currentMonth, 19).toDateString()]: [
            {
                room: "Konferenzraum A",
                time: "08:00 - 17:00",
                color: "bg-rose-100 text-rose-700 border-rose-300",
            },
        ],
    };
</script>

<div class="panel">
    <!-- Header: Month selection -->
    <header class="calendar-header">
        <h2>{MONTHS[currentMonth]} {currentYear}</h2>
        <div class="center-text">
            <button onclick={goToPrev} class="default-button" aria-label="Previous Month"><i class="fas fa-arrow-left"></i></button>
            <button onclick={goToCurrent} class="default-button"><i class="fas fa-calendar-week"></i> Current Month</button>
            <button onclick={goToNext} class="default-button" aria-label="Next Month"><i class="fas fa-arrow-right"></i></button>
        </div>
    </header>

    <!-- Weekdays (Column titles) -->
    <div class="calendar-titles center-text">
        {#each WEEKDAYS as day}
            <div>{day}</div>
        {/each}
    </div>

    <!-- Calendar grid -->
    <div class="calendar-grid">
        {#each daysGrid as { day, isCurrentMonth, isToday, dateString }}
            <div class="day-tile {isCurrentMonth ? 'active-day' : 'inactive-day'}">
                <!-- Date indicator -->
                <div class="{!isCurrentMonth ? 'inactive-day-tile-title' : 'day-tile-title'} center-text">
                    <span class="{isToday ? 'today-day-tile' : ''}">{day}</span>
                </div>

                <!-- Booking information -->
                <div class="day-tile-content">
                    {#if mockupBookings[dateString]}
                        {#each mockupBookings[dateString] as booking}
                            <div class={booking.color} title="{booking.room}: {booking.time}">
                                <div class="">{booking.room}</div>
                                <div class="">{booking.time}</div>
                            </div>
                        {/each}
                    {/if}
                </div>

                <!-- Interactive overlay for hovering if the day is not in the past-->
                {#if !(new Date(dateString).getTime() < new Date().getTime()) && isCurrentMonth}
                    <button class="book-button"><i class="fas fa-calendar-check"></i> Book</button>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .calendar-header {
        display: inline;
    }

    .calendar-titles {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 10px;
    }

    .day-tile {
        border: var(--border);
        padding: 4px;
        color: var(--text-color);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius-s);
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .day-tile-content {
        padding: var(--padding-s);
    }

    .inactive-day{
        background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(45)'><rect x='0' y='0' width='100%' height='100%' fill='%23aeaeaeff'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='%23626262ff' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
    }

    .active-day {
        background-color: var(--layer-2);
    }

    .today-day-tile {
        background-color: var(--sky-dark);
        padding: 2px;
        border-radius: 6px;
        color: white;
    }

    .day-tile-title {
        background-color: var(--layer-2);
        border-radius: var(--border-radius-s);
        border: var(--border);
        padding: 4px;
    }

    .inactive-day-tile-title {
        background-color: #ffffff5b;
        border-radius: var(--border-radius-s);
        padding: 4px;
    }

    .book-button {
        padding: var(--padding-s);
        border: var(--border);
        border-radius: var(--border-radius-s);
        background-color: var(--layer-1);
        color: var(--text-color);
        cursor: pointer;
        width: 100%;
    }
</style>
