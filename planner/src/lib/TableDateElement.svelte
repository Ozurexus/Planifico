<script lang="ts">
	export let date: Date;
    let dateStr: string[] = date.toDateString().split(" ");
    let dayOfWeek: string = dateStr[0];
    let month: string = dateStr[1];
    let day: string = dateStr[2][0] != '0' ? dateStr[2] : dateStr[2].slice(1);
    let year: string = dateStr[3];
</script>

<main>
    <div class = "date">
        <div class="day">
            {day}
        </div>
        <div class="dayOfWeekAndYearAndMonth">
            <div class="dayOfWeek">
                {dayOfWeek}
            </div>
            <div class="monthAndYear">
                {month}, {year}
            </div>
        </div>
    </div>
</main>

<style>
    .date{
        display: flex;
    }
    .day{
        font-size: 50px;
        align-self: center;
    }
    .dayOfWeekAndYearAndMonth{
        margin-left: 20px;
        display: flex;
        flex-direction: column;
    }
    .dayOfWeek{
        font-size: 32px;
    }
    .monthAndYear{
        font-size: 18px;
        color: silver;
    }
</style>