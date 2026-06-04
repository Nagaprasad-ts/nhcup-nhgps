import AppLayout from '../layouts/AppLayout'

const sections = [
  {
    number: '1.',
    title: 'Programme Registration',
    body: 'Registration for any Gurukul Pre-School programme is subject to seat availability and confirmation by the school. Parents or guardians must provide accurate and complete information during registration. Gurukul Pre-School reserves the right to refuse or cancel enrolment if incorrect or misleading information is provided.',
  },
  {
    number: '2.',
    title: 'Eligibility',
    body: 'Programmes are designed for children within the age groups specified for each activity. Parents are responsible for ensuring that their child meets the eligibility requirements before enrolment.',
  },
  {
    number: '3.',
    title: 'Programme Fees',
    body: 'All programme fees are payable in Indian Rupees (INR). Registration is confirmed only upon successful payment of the applicable fee. Fees include only the services specifically mentioned in the programme details. Gurukul Pre-School reserves the right to revise programme fees at any time for future enrolments.',
  },
  {
    number: '4.',
    title: 'Payment Terms',
    body: 'Payments may be made through approved online payment gateways, bank transfers, or other methods specified by the school. Gurukul Pre-School does not store sensitive banking or card information. All online transactions are processed through secure third-party payment service providers. Parents are responsible for ensuring that payment details submitted are accurate and authorised.',
  },
  {
    number: '5.',
    title: 'Attendance and Participation',
    body: 'Regular attendance is encouraged to ensure children receive the full benefit of the programme. Parents must inform the school in advance, wherever possible, if their child is unable to attend a session. Missed classes due to illness, travel, personal commitments, or other reasons are generally not eligible for refunds, fee adjustments, or replacement sessions unless specifically approved by the school.',
  },
  {
    number: '6.',
    title: 'Health and Safety',
    body: 'Parents must disclose any medical conditions, allergies, special needs, or other relevant information that may affect their child\'s participation in programme activities. Gurukul Pre-School will take reasonable care to provide a safe learning environment; however, parents acknowledge that participation in physical, movement-based, and group activities may involve normal risks associated with childhood play and learning.',
  },
  {
    number: '7.',
    title: 'Behaviour and Conduct',
    body: 'Children are expected to participate respectfully and safely during all activities. Gurukul Pre-School reserves the right to suspend or discontinue a child\'s participation if behaviour is consistently disruptive, unsafe, or harmful to other children, staff, or programme operations.',
  },
  {
    number: '8.',
    title: 'Photographs and Media',
    body: 'Photographs, videos, and recordings may be taken during programme sessions, events, and activities for educational, promotional, and documentation purposes. These materials may be used on the school\'s website, social media platforms, brochures, newsletters, and other marketing materials. Parents who do not wish their child to appear in such materials must notify the school in writing.',
  },
  {
    number: '9.',
    title: 'Programme Changes',
    body: 'Gurukul Pre-School reserves the right to modify programme schedules, instructors, content, venues, or activity formats whenever necessary. Reasonable efforts will be made to inform parents of significant changes in advance.',
  },
  {
    number: '10.',
    title: 'Cancellations and Refunds',
    body: 'Programme cancellations and refunds are governed by the Gurukul Pre-School Cancellation and Refund Policy available on our website or from the school administration office. By registering for a programme, parents acknowledge and accept the applicable cancellation and refund terms.',
  },
  {
    number: '11.',
    title: 'Limitation of Liability',
    body: 'While Gurukul Pre-School takes reasonable precautions to ensure children\'s safety and well-being, the school shall not be held liable for:',
    bullets: [
      'Loss or damage to personal belongings;',
      'Missed sessions due to circumstances beyond the school\'s control;',
      'Temporary interruption of programmes caused by natural disasters, government regulations, public health emergencies, or other unforeseen events.',
    ],
  },
  {
    number: '12.',
    title: 'Intellectual Property',
    body: 'All programme content, curriculum materials, worksheets, logos, photographs, branding elements, and educational resources remain the property of Gurukul Pre-School. These materials may not be reproduced, distributed, modified, or used for commercial purposes without prior written permission from the school.',
  },
  {
    number: '13.',
    title: 'Privacy',
    body: 'Personal information collected during registration and programme participation will be handled in accordance with the Gurukul Pre-School Privacy Policy.',
  },
  {
    number: '14.',
    title: 'Changes to Terms',
    body: 'Gurukul Pre-School may update these Terms and Conditions from time to time. Updated versions will be published through official school communication channels and will take effect immediately upon publication.',
  },
  {
    number: '15.',
    title: 'Governing Law',
    body: 'These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising in connection with programme registration or participation shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.',
  },
]

export default function TermsAndConditions() {
  return (
    <AppLayout title="Terms and Conditions" pageTitle="Terms and Conditions">
      <div className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12">
      <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-8">
        Welcome to Gurukul Pre-School. These Terms and Conditions govern the registration, participation, and use of our activity programmes, workshops, events, and related services. By enrolling your child in any programme offered by Gurukul Pre-School, you agree to comply with these terms.
      </p>

      <div className="space-y-8">
        {sections.map(s => (
          <div key={s.number}>
            <h2 className="font-black text-navy text-base mb-2">
              {s.number} {s.title}
            </h2>
            <p className="text-sm text-gray-600 font-semibold leading-relaxed">{s.body}</p>
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
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-600 font-semibold leading-relaxed italic">
          By registering for any Gurukul Pre-School programme, parents and guardians acknowledge that they have read, understood, and agreed to these Terms &amp; Conditions.
        </p>
      </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
