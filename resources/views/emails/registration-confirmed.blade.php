<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Horizon Cup 2026 Registration Confirmed</title>
  <style>
    body      { font-family: 'Segoe UI', Arial, sans-serif; background:#f4f6f9; margin:0; padding:0; }
    .wrapper  { max-width:600px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,.08); }
    .header   { background: linear-gradient(135deg,#1a3a6b,#2563eb); padding:36px 40px; text-align:center; color:#fff; }
    .header h1{ margin:0; font-size:28px; letter-spacing:1px; }
    .header p { margin:6px 0 0; font-size:14px; opacity:.85; }
    .badge    { display:inline-block; background:rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.4); border-radius:50px; padding:4px 16px; font-size:13px; margin-top:12px; }
    .body     { padding:36px 40px; color:#374151; }
    .body h2  { font-size:20px; color:#1e40af; margin:0 0 8px; }
    .body p   { font-size:15px; line-height:1.7; margin:0 0 24px; }
    .details  { background:#f0f4ff; border-radius:10px; padding:24px 28px; margin-bottom:28px; }
    .row      { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #dbeafe; font-size:14px; }
    .row:last-child { border-bottom:none; }
    .row .label { color:#6b7280; font-weight:500; }
    .row .value { color:#111827; font-weight:600; text-align:right; max-width:60%; }
    .success-badge { display:inline-flex; align-items:center; gap:8px; background:#d1fae5; color:#065f46; border-radius:50px; padding:8px 20px; font-weight:600; font-size:14px; margin-bottom:24px; }
    .footer   { background:#f9fafb; border-top:1px solid #e5e7eb; padding:24px 40px; text-align:center; color:#9ca3af; font-size:12px; }
    .footer a { color:#2563eb; text-decoration:none; }
  </style>
</head>
<body>
  <div class="wrapper">

    {{-- Header --}}
    <div class="header">
      <h1>🏆 New Horizon Cup 2026</h1>
      <p>Official Sports Championship</p>
      <span class="badge">Registration Confirmed</span>
    </div>

    {{-- Body --}}
    <div class="body">
      <h2>Dear {{ $registration->captain_name }},</h2>
      <p>
        Your registration for the <strong>New Horizon Cup 2026</strong> has been successfully confirmed!
        Your payment has been received and your spot is secured.
      </p>

      <div class="success-badge">
        ✅ Payment Successful — ₹{{ $amountRupees }}
      </div>

      {{-- Registration Details --}}
      <div class="details">
        <div class="row">
          <span class="label">Institution</span>
          <span class="value">{{ $registration->institution_name }}</span>
        </div>
        <div class="row">
          <span class="label">Physical Education Director</span>
          <span class="value">{{ $registration->ped_name }}</span>
        </div>
        <div class="row">
          <span class="label">PED Contact</span>
          <span class="value">{{ $registration->ped_contact }}</span>
        </div>
        <div class="row">
          <span class="label">Captain</span>
          <span class="value">{{ $registration->captain_name }}</span>
        </div>
        <div class="row">
          <span class="label">Captain Email</span>
          <span class="value">{{ $registration->captain_email }}</span>
        </div>
        <div class="row">
          <span class="label">Captain Contact</span>
          <span class="value">{{ $registration->captain_contact }}</span>
        </div>
        <div class="row">
          <span class="label">Participating Event</span>
          <span class="value">{{ $registration->event->name }}</span>
        </div>
        <div class="row">
          <span class="label">Payment ID</span>
          <span class="value">{{ $registration->razorpay_payment_id }}</span>
        </div>
        <div class="row">
          <span class="label">Order ID</span>
          <span class="value">{{ $registration->razorpay_order_id }}</span>
        </div>
      </div>

      <p>
        Please keep this email for your records. You may be required to show your
        <strong>Payment ID</strong> at the venue for verification.
      </p>

      <p>
        For any queries, please contact the organizing committee. We look forward
        to seeing you at the New Horizon Cup 2026!
      </p>
    </div>

    {{-- Footer --}}
    <div class="footer">
      <p>© {{ date('Y') }} New Horizon Cup 2026 — All Rights Reserved</p>
      <p>This is an automated confirmation email. Please do not reply to this email.</p>
    </div>

  </div>
</body>
</html>