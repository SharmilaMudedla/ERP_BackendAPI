const emailTemplate = ({
  employeeName,
  reportingManager,
  startDate,
  endDate,
  totalDays,
  reason,
  status,
  leavesLeft,
}) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Leave Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0"
   style="max-width: 600px; background-color: #ffffff; margin: 30px auto; border-radius: 10px;
    overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <!-- <tr>
      <td style="padding: 20px; background-color: #2c3e50; text-align: center;">
        <h2 style="color: #ffffff; margin: 0;">Leave Application</h2>
      </td>
    </tr> -->
    <tr>
      <td style="padding: 0;">
        <img src="http://localhost:4000/logo.jpg" alt="Spondias" 
        style="width: 180px; height: auto; display: block; margin: 15px auto">
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 30px 20px; color: #333333; font-size: 16px; line-height: 1.6;">
        <p>Dear <strong>${reportingManager?.name || "Manager"}</strong>,</p>
        
        <p><strong>${employeeName}</strong> has applied for leave.</p>
        
        <table width="100%" cellpadding="5" cellspacing="0" style="margin: 20px 0; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="border: 1px solid #ddd;"><strong>Employee Name</strong></td>
            <td style="border: 1px solid #ddd;">${employeeName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Leave Dates</strong></td>
            <td style="border: 1px solid #ddd;">${new Date(
              startDate
            ).toLocaleDateString()} - ${new Date(
    endDate
  ).toLocaleDateString()}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="border: 1px solid #ddd;"><strong>Total Days</strong></td>
            <td style="border: 1px solid #ddd;">${totalDays}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Reason</strong></td>
            <td style="border: 1px solid #ddd;">${reason}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="border: 1px solid #ddd;"><strong>Leaves Left</strong></td>
            <td style="border: 1px solid #ddd;">${leavesLeft ?? "N/A"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Status</strong></td>
            <td style="border: 1px solid #ddd;">${status}</td>
          </tr>
        </table>

        <p>Please take necessary action on this request.</p>
        <p>Regards,<br><strong>HR System</strong></p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="text-align: center; font-size: 12px; color: #999999; padding: 20px;">
        ©2025. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export default emailTemplate;
