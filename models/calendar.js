import { Schema, model, models } from "mongoose";

const CalendarSchema = new Schema({
    verbindungsid: {
        type: Schema.Types.ObjectId,
        ref: 'Verbindung',
        required: [true, "Verbindungsid is required!"]
    },
    eventId: {
        type: Number,
        unique: true,
        required: [true, "Event ID is required!"]
    },
    title: {
        type: String,
        required: [true, "Title is required!"]
    },
    description: {
        type: String,
        required: [false, "Description is optional."]
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required!"]
    },
    endDate: {
        type: Date,
        required: [true, "End date is required!"]
    },
    location: {
        type: String,
        required: [false, "Location is optional."]
    },
    isAllDay: {
        type: Boolean,
        required: [true, "IsAllDay is required!"]
    },
    attendees: [{
        type: String
    }]
});

const Calendar = models.Calendar || model("Calendar", CalendarSchema, "calendar");

export default Calendar;
