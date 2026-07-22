const customerEmail = (data = {}) => {
  const name = data.name || "there";
  const businessName = data.business_name || data.businessName || "your business";
  const preferredDate = data.preferredDate || data.preferred_date || "TBD";
  const timeSlot = data.timeSlot || data.time_slot || "TBD";

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>BuildCraft</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="650" style="background:#ffffff;border-radius:15px;overflow:hidden;margin-top:40px;box-shadow:0 10px 30px rgba(0,0,0,.08);">

<tr>
<td style="background:#2563EB;padding:45px;text-align:center;color:white;">
<h1 style="margin:0;font-size:38px;">🚀 BuildCraft</h1>
<p style="margin-top:10px;font-size:16px;">We Build Your Digital Vision</p>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2>Hello ${name}, 👋</h2>

<p>Thank you for choosing <strong>BuildCraft</strong>.</p>
<p>Your Discovery Call has been successfully booked.</p>

<h3 style="color:#2563EB;">Booking Details</h3>
<p><strong>Business:</strong> ${businessName}</p>
<p><strong>Date:</strong> ${preferredDate}</p>
<p><strong>Time:</strong> ${timeSlot}</p>

<p>One of our experts will contact you during the selected time.</p>

<p>Regards,<br><strong>BuildCraft Team</strong></p>

</td>
</tr>

<tr>
<td style="background:#F8FAFC;padding:30px;text-align:center;color:#555;">
Need help?<br><br>📧 ${process.env.EMAIL_USER}<br><br>Thank you for choosing BuildCraft.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

module.exports = customerEmail;