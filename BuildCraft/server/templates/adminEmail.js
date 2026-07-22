const adminEmail = (data = {}) => {
  const name = data.name || "Not provided";
  const email = data.email || "Not provided";
  const businessName = data.business_name || data.businessName || "Not provided";
  const phone = data.phone || "Not provided";
  const message = data.message || "Not provided";
  const preferredDate = data.preferredDate || data.preferred_date || "Not selected";
  const timeSlot = data.timeSlot || data.time_slot || "Not selected";

  return `
<!DOCTYPE html>
<html>
<body style="font-family:Arial;background:#f5f7fb;padding:30px;">

<div style="max-width:700px;margin:auto;background:white;padding:30px;border-radius:10px;">

<h1 style="color:#2563EB;">🚀 New BuildCraft Enquiry</h1>

<hr>

<h3>Customer Details</h3>

<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Business:</b> ${businessName}</p>
<p><b>Phone:</b> ${phone}</p>
<p><b>Preferred Date:</b> ${preferredDate}</p>
<p><b>Preferred Time Slot:</b> ${timeSlot}</p>
<p><b>Booking Time:</b> ${preferredDate} at ${timeSlot}</p>

<hr>

<p><b>Project Details:</b></p>
<p>${message}</p>

<hr>

<p>Submitted from BuildCraft Website</p>

</div>

</body>
</html>
`;
};

module.exports = adminEmail;