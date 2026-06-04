import AppLayout from '../layouts/AppLayout'

const sections = [
  {
    number: '1.',
    title: 'Refund Eligibility',
    body: 'Parents or guardians may be eligible for a refund under the following circumstances:',
    bullets: [
      'A cancellation request is submitted within the eligible cancellation period and before the commencement of the programme.',
      'Gurukul Pre-School cancels a programme due to insufficient enrolments, operational reasons, or unforeseen circumstances.',
      'Duplicate payments or incorrect fee payments are made and verified by the school.',
    ],
    footer: 'All refund requests must be submitted in writing to the school administration.',
  },
  {
    number: '2.',
    title: 'Non-Refundable Fees',
    body: 'The following are generally non-refundable:',
    bullets: [
      'Registration or enrolment fees, if applicable.',
      'Fees for programmes that have already commenced.',
      'Fees for classes or sessions missed due to illness, travel, personal commitments, or any other reason.',
      'Fees paid for completed workshops, events, or special activities.',
      'Materials, kits, uniforms, or other programme-related items already provided to participants.',
    ],
  },
  {
    number: '3.',
    title: 'Withdrawal from a Programme',
    body: 'Parents may withdraw their child from a programme by providing written notice to the school. Withdrawals requested before the programme begins may qualify for a refund, subject to applicable administrative charges. No refunds will be issued for withdrawals after the programme has commenced unless otherwise approved by the school management under exceptional circumstances.',
  },
  {
    number: '4.',
    title: 'Programme Cancellation by Gurukul Pre-School',
    body: 'If Gurukul Pre-School cancels a programme before it begins, parents may choose one of the following options:',
    bullets: [
      'A full refund of the programme fee paid; or',
      'Transfer of the enrolment to another available programme.',
    ],
    footer: 'If a programme is interrupted or modified due to circumstances beyond the school\'s control, appropriate alternatives, rescheduling options, or credits may be offered at the school\'s discretion.',
  },
  {
    number: '5.',
    title: 'Refund Request Process',
    body: 'To request a refund, please provide:',
    bullets: [
      'Parent/Guardian Name',
      'Child\'s Name',
      'Programme Name',
      'Payment Receipt or Transaction Reference Number',
      'Reason for the Refund Request',
    ],
    footer: 'Requests may be submitted to info-nhgps@newhorizongurukul.in or directly to the school administration office.',
  },
  {
    number: '6.',
    title: 'Refund Processing',
    body: 'Refund requests will be reviewed within 7 working days of receipt. Approved refunds will be processed through the original mode of payment whenever possible. Refunds are generally credited within 7–10 working days after approval, depending on the bank or payment provider.',
  },
  {
    number: '7.',
    title: 'Exceptional Circumstances',
    body: 'In cases involving medical emergencies, relocation, or other exceptional situations, refund requests may be considered on a case-by-case basis at the sole discretion of Gurukul Pre-School management. Any decision regarding such requests shall be final.',
  },
]

export default function RefundPolicy() {
  return (
    <AppLayout title="Refund Policy" pageTitle="Refund Policy">
      <div className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12">
      <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-8">
        At Gurukul Pre-School, we strive to provide enriching learning experiences through our activity programmes and enrichment courses. This Refund Policy outlines the terms governing refunds for programme registrations and fee payments. By enrolling your child in any Gurukul Pre-School programme, you agree to the terms of this policy.
      </p>

      <div className="space-y-8">
        {sections.map(s => (
          <div key={s.number}>
            <h2 className="font-black text-navy text-base mb-2">
              {s.number} {s.title}
            </h2>
            {s.body && (
              <p className="text-sm text-gray-600 font-semibold leading-relaxed">{s.body}</p>
            )}
            {s.bullets && (
              <ul className="mt-2 space-y-1">
                {s.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                    <span className="text-coral mt-0.5 shrink-0">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {s.footer && (
              <p className="mt-2 text-sm text-gray-600 font-semibold leading-relaxed">{s.footer}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-600 font-semibold leading-relaxed italic">
          Gurukul Pre-School reserves the right to amend this Refund Policy at any time. Updated versions will be communicated through official school channels and will take effect immediately upon publication.
        </p>
      </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
