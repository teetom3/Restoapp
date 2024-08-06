const mongoose = require('mongoose');

const CapacitySchema = new mongoose.Schema({
  lunch: { type: Number, default: 0 },
  dinner: { type: Number, default: 0 },
});

const OpenHoursSchema = new mongoose.Schema({
  lunch: { type: Boolean, default: false },
  dinner: { type: Boolean, default: false },
});

const SettingSchema = new mongoose.Schema({
  autoAccept: { type: Boolean, default: false },
  openHours: {
    monday: OpenHoursSchema,
    tuesday: OpenHoursSchema,
    wednesday: OpenHoursSchema,
    thursday: OpenHoursSchema,
    friday: OpenHoursSchema,
    saturday: OpenHoursSchema,
    sunday: OpenHoursSchema,
  },
  capacity: {
    monday: CapacitySchema,
    tuesday: CapacitySchema,
    wednesday: CapacitySchema,
    thursday: CapacitySchema,
    friday: CapacitySchema,
    saturday: CapacitySchema,
    sunday: CapacitySchema,
  },
});

module.exports = mongoose.model('Setting', SettingSchema);


