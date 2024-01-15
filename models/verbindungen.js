import { Schema, model, models } from "mongoose";

const VerbindungSchema = new Schema({
    verbindungsid: {
        type: Number,
        unique: true,
        required: [true, "Verbindungsid is required!"]
    },
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    ort: {
        type: String,
        required: [true, "Ort is required!"]
    },
    plz: {
        type: String,
        required: [true, "PLZ is required!"]
    },
    strasse: {
        type: String,
        required: [true, "Strasse is required!"]
    },
    koordinaten: {
        type: String,
        required: [true, "Koordinaten are required!"]
    },
    verbindungsart: {
        type: String,
        required: [true, "Verbindungsart is required!"]
    },
    status: {
        type: String,
        required: [true, "Status is required!"]
    }
});

const Verbindung = models.Verbindung || model("Verbindung", VerbindungSchema, "verbindungen");

export default Verbindung;
