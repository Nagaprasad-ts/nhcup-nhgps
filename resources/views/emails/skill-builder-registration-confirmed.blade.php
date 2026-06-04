<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Skill Builder Registration Confirmed</title>
  <style>
    body      { font-family: 'Segoe UI', Arial, sans-serif; background:#f4f6f9; margin:0; padding:0; }
    .wrapper  { max-width:600px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,.08); }
    .header   { background: linear-gradient(135deg,#0f2f5e,#1a4a8a); padding:36px 40px; text-align:center; color:#fff; }
    .header h1{ margin:0; font-size:26px; letter-spacing:0.5px; }
    .header p { margin:6px 0 0; font-size:14px; opacity:.85; }
    .badge    { display:inline-block; background:rgba(255,226,52,.2); border:1px solid rgba(255,226,52,.5); color:#FFE234; border-radius:50px; padding:4px 16px; font-size:13px; margin-top:12px; font-weight:600; }
    .body     { padding:36px 40px; color:#374151; }
    .body h2  { font-size:20px; color:#0f2f5e; margin:0 0 8px; }
    .body p   { font-size:15px; line-height:1.7; margin:0 0 20px; }
    .details  { background:#f0f4ff; border-radius:10px; padding:24px 28px; margin-bottom:28px; }
    .row      { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #dbeafe; font-size:14px; }
    .row:last-child { border-bottom:none; }
    .row .label { color:#6b7280; font-weight:500; }
    .row .value { color:#111827; font-weight:600; text-align:right; max-width:60%; }
    .success-badge { display:inline-flex; align-items:center; gap:8px; background:#d1fae5; color:#065f46; border-radius:50px; padding:8px 20px; font-weight:600; font-size:14px; margin-bottom:24px; }
    .prog-badge { display:inline-block; background:#FFF3CD; color:#0f2f5e; border-radius:6px; padding:2px 10px; font-weight:700; font-size:13px; }
    .footer   { background:#f9fafb; border-top:1px solid #e5e7eb; padding:24px 40px; text-align:center; color:#9ca3af; font-size:12px; }
  </style>
</head>
<body>
  <div class="wrapper">

    {{-- Header --}}
    <div class="header">
      <h1>🌟 Skill Builder for Kids</h1>
      <p>New Horizon Gurukul Pre School</p>
      <span class="badge">✅ Registration Confirmed</span>
    </div>

    {{-- Body --}}
    <div class="body">
      <h2>Dear {{ $registration->parent_name }},</h2>
      <p>
        Your child's registration for the <strong>Skill Builder for Kids</strong> programme
        has been successfully confirmed! Your payment has been received and the spot is secured.
      </p>

      <div class="success-badge">
        ✅ Payment Successful — ₹{{ $registration->amount }}
      </div>

      {{-- Registration Details --}}
      <div class="details">
        <div class="row">
          <span class="label">Child's Name: </span>
          <span class="value">{{ $registration->child_name }}</span>
        </div>
        <div class="row">
          <span class="label">Age: </span>
          <span class="value">{{ $registration->child_age }}</span>
        </div>
        <div class="row">
          <span class="label">Programme(s): </span>
          <span class="value">
            @php
              $programmeDetails = [
                'A' => ['emoji' => '🧠', 'name' => 'Brain Builders Programme'],
                'B' => ['emoji' => '🎨', 'name' => 'Confidence & Expression Programme'],
                'C' => ['emoji' => '⚽', 'name' => 'Movement & Sports Foundation'],
              ];
              $keys = str_split($registration->programme);
            @endphp
            @foreach($keys as $key)
              @if(isset($programmeDetails[$key]))
                <span class="prog-badge" style="display:block; margin-bottom:4px;">
                  {{ $programmeDetails[$key]['emoji'] }} {{ $programmeDetails[$key]['name'] }}
                </span>
              @endif
            @endforeach
          </span>
        </div>
        <div class="row">
          <span class="label">Parent / Guardian: </span>
          <span class="value">{{ $registration->parent_name }}</span>
        </div>
        <div class="row">
          <span class="label">Phone: </span>
          <span class="value">{{ $registration->phone }}</span>
        </div>
        <div class="row">
          <span class="label">Payment ID: </span>
          <span class="value">{{ $registration->pg_payment_id ?? '—' }}</span>
        </div>
        <div class="row">
          <span class="label">Transaction No: </span>
          <span class="value">{{ $registration->pg_merchant_txn_no ?? '—' }}</span>
        </div>
      </div>

      <p>
        Please keep this email for your records. The programme begins <strong>June 2026</strong>
        and our team will contact you with session details closer to the start date.
      </p>

      <p>
        For any queries, call us at <strong>+91 9606911078</strong>.
        We look forward to seeing {{ $registration->child_name }} at Skill Builder!
      </p>
    </div>

    {{-- Footer --}}
    <div class="footer">
      <p>© {{ date('Y') }} New Horizon Gurukul Pre School — All Rights Reserved</p>
      <p>This is an automated confirmation email. Please do not reply to this email.</p>
    </div>

  </div>
</body>
</html>
