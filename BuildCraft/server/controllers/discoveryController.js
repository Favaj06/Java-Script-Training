const { DiscoveryCall } = require("../models");
const { sendEmail } = require("../services/emailService");
const adminEmail = require("../templates/adminEmail");
const customerEmail = require("../templates/customerEmail");

const VALID_TIME_SLOTS = [
  "09:00 AM - 09:30 AM",
  "09:30 AM - 10:00 AM",
  "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM",
  "11:00 AM - 11:30 AM",
  "11:30 AM - 12:00 PM",
  "02:00 PM - 02:30 PM",
  "02:30 PM - 03:00 PM",
  "03:00 PM - 03:30 PM",
  "03:30 PM - 04:00 PM",
];

const validateDiscoveryPayload = (payload) => {
  const { name, email, business_name, phone, message, preferredDate, timeSlot } = payload;

  if (!name || !name.toString().trim() || name.toString().trim().length < 2) {
    return { isValid: false, message: "Please provide a valid full name." };
  }

  if (!email || !email.toString().trim()) {
    return { isValid: false, message: "Please provide your email address." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.toString().trim())) {
    return { isValid: false, message: "Please provide a valid email address." };
  }

  if (!phone || !phone.toString().trim() || phone.toString().trim().length < 7) {
    return { isValid: false, message: "Please provide a valid phone number." };
  }

  if (!preferredDate || !preferredDate.toString().trim()) {
    return { isValid: false, message: "Please select a preferred date." };
  }

  const selectedDate = new Date(preferredDate);
  if (Number.isNaN(selectedDate.getTime())) {
    return { isValid: false, message: "Please select a valid preferred date." };
  }

  if (!timeSlot || !VALID_TIME_SLOTS.includes(timeSlot)) {
    return { isValid: false, message: "Please select a valid time slot." };
  }

  if (!message || !message.toString().trim() || message.toString().trim().length < 10) {
    return { isValid: false, message: "Please describe your project in a few words." };
  }

  if (!business_name || !business_name.toString().trim()) {
    return { isValid: false, message: "Please provide your business name." };
  }

  return { isValid: true };
};

const createDiscoveryCall = async (req, res) => {
  try {
    const { name, email, business_name, phone, message, preferredDate, timeSlot } = req.body;
    const validation = validateDiscoveryPayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const normalizedDate = preferredDate.toString().trim();
    const normalizedSlot = timeSlot.toString().trim();

    const existingBooking = await DiscoveryCall.findOne({
      where: {
        preferredDate: normalizedDate,
        timeSlot: normalizedSlot,
      },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "This slot is already booked.",
      });
    }

    const discovery = await DiscoveryCall.create({
      name: name.toString().trim(),
      email: email.toString().trim(),
      business_name: business_name.toString().trim(),
      phone: phone.toString().trim(),
      message: message.toString().trim(),
      preferredDate: normalizedDate,
      timeSlot: normalizedSlot,
    });

    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: "🚀 New Discovery Call Request | BuildCraft",
      html: adminEmail({
        name: discovery.name,
        email: discovery.email,
        business_name: discovery.business_name,
        phone: discovery.phone,
        message: discovery.message,
        preferredDate: discovery.preferredDate,
        timeSlot: discovery.timeSlot,
      }),
    });

    await sendEmail({
      to: discovery.email,
      subject: "🎉 Your Discovery Call Has Been Booked | BuildCraft",
      html: customerEmail({
        name: discovery.name,
        email: discovery.email,
        business_name: discovery.business_name,
        phone: discovery.phone,
        message: discovery.message,
        preferredDate: discovery.preferredDate,
        timeSlot: discovery.timeSlot,
      }),
    });

    res.status(201).json({
      success: true,
      message: "Discovery Call Booked Successfully",
      data: discovery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllDiscoveryCalls = async (req, res) => {
  try {
    const discoveries = await DiscoveryCall.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: discoveries.length,
      data: discoveries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDiscoveryCall,
  getAllDiscoveryCalls,
};