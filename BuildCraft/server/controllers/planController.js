const { PlanRequest } = require("../models");
const { sendEmail } = require("../services/emailService");
const customerEmail = require("../templates/customerEmail");
const adminEmail = require("../templates/adminEmail");

const createPlanRequest = async (req, res) => {
  try {
    const plan = await PlanRequest.create(req.body);

    await sendEmail({
      to: plan.email,
      subject: "Thanks for contacting BuildCraft 🚀",
     html: customerEmail(plan),
    });

    // Admin Email
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Website Enquiry",
      html: adminEmail(plan),
    });

    res.status(201).json({
      success: true,
      message: "Plan Request Submitted Successfully",
      data: plan,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPlanRequests = async (req, res) => {
  try {
    const plans = await PlanRequest.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPlanRequest,
  getAllPlanRequests,
};