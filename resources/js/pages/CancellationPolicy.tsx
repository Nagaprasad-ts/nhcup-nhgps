import AppLayout from '../layouts/AppLayout'

export default function CancellationPolicy() {
  return (
    <AppLayout title="Cancellation Policy" pageTitle="Cancellation Policy">
      <div className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12">
      <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-8">
        This Cancellation Policy applies to all enrolments made for the Brain Builders Programme, Confidence and Expression Programme, Movement and Sports Foundation, and any other activity programmes offered by Gurukul Pre-School.
      </p>

      <div className="space-y-8">

        <div>
          <h2 className="font-black text-navy text-base mb-2">1. Cancellation by Parents/Guardians</h2>
          <ul className="space-y-2">
            {[
              'Parents or guardians may request cancellation of a programme enrolment within 7 days of registration, provided the programme has not commenced.',
              'Cancellations requested before the programme begins will be eligible for a refund after deducting any applicable registration or administrative charges.',
              'Once the programme has commenced, fees paid are generally non-refundable and non-transferable.',
              'Cancellation requests must be submitted in writing via email or through the school administration office.',
            ].map(b => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                <span className="text-coral mt-0.5 shrink-0">•</span>{b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">2. Withdrawal After Programme Commencement</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-2">
            As seats are limited and reserved exclusively for enrolled children:
          </p>
          <ul className="space-y-2">
            {[
              'No refund will be provided for withdrawals made after the programme has started.',
              'No refund or fee adjustment will be provided for missed classes due to absence, illness, travel, or any personal reasons.',
              'Make-up classes are offered solely at the discretion of Gurukul Pre-School and subject to availability.',
            ].map(b => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                <span className="text-coral mt-0.5 shrink-0">•</span>{b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">3. Programme Transfers</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">
            Requests to transfer enrolment from one activity programme to another may be considered on a case-by-case basis, subject to seat availability and approval by the school administration.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">4. Cancellation by Gurukul Pre-School</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-2">
            Gurukul Pre-School reserves the right to cancel, postpone, or reschedule a programme due to insufficient enrolment, unforeseen circumstances, safety concerns, or other operational reasons. In such cases, parents may choose to:
          </p>
          <ul className="space-y-1">
            {[
              'Transfer the enrolment to another available programme; or',
              'Receive a full refund of the programme fee paid.',
            ].map(b => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                <span className="text-coral mt-0.5 shrink-0">•</span>{b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">5. Refund Processing</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">
            Approved refunds will be processed within 7–10 working days through the original mode of payment. The actual credit timeline may vary depending on the bank or payment provider.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">6. Contact for Cancellation Requests</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-3">
            For cancellation, transfer, or refund-related queries, please contact:
          </p>
          <div className="bg-iceblue rounded-2xl px-5 py-4 space-y-1">
            <p className="text-sm font-black text-navy">Gurukul Pre-School</p>
            <p className="text-sm font-semibold text-gray-600">
              Email:{' '}
              <a href="mailto:info-nhgps@newhorizongurukul.in" className="text-coral hover:underline">
                info-nhgps@newhorizongurukul.in
              </a>
            </p>
            <p className="text-sm font-semibold text-gray-600">
              Phone:{' '}
              <a href="tel:+919606911078" className="text-coral hover:underline">
                +91 9606911078
              </a>
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-600 font-semibold leading-relaxed">
            All cancellation requests must include the child's name, programme name, and enrolment details.
          </p>
        </div>

      </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
