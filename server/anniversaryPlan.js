import mongoose from 'mongoose';

const text = (maxlength = 2000) => ({ type: String, default: '', trim: true, maxlength });

export const anniversaryPlanSchema = new mongoose.Schema({
  sender: { ...text(40), default: 'Anh' },
  recipient: { ...text(40), default: 'em' },
  memory: text(),
  gratitude: text(),
  promise: text(),
  wish: text(),
  meetingDate: {
    ...text(10),
    validate: value => !value || (/^\d{4}-\d{2}-\d{2}$/.test(value) &&
      Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value),
  },
  meetingTime: { ...text(5), match: /^$|^([01]\d|2[0-3]):[0-5]\d$/ },
  meetingPlace: text(300),
  invitation: text(),
}, { _id: false });
