import AppLayout from '../layouts/AppLayout'

export default function PrivacyPolicy() {
  return (
    <AppLayout title="Privacy Policy" pageTitle="Privacy Policy">
      <div className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12">
      <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-8">
        Gurukul Pre-School is committed to protecting the privacy and personal information of children, parents, guardians, and visitors who interact with our website, activity programmes, and enrolment services. By using our website or registering for any of our programmes, you agree to the terms outlined in this Privacy Policy.
      </p>

      <div className="space-y-8">

        <div>
          <h2 className="font-black text-navy text-base mb-2">1. Information We Collect</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-4">
            To facilitate admissions, programme registrations, communication, and fee payments, we may collect the following information:
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-black text-navy mb-1">Parent/Guardian Information</p>
              <ul className="space-y-1">
                {[
                  'Name of parent or guardian',
                  'Email address',
                  'Phone number',
                  'Residential address',
                  'Emergency contact information',
                ].map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                    <span className="text-coral mt-0.5 shrink-0">•</span>{b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-black text-navy mb-1">Child Information</p>
              <ul className="space-y-1">
                {[
                  "Child's name",
                  'Date of birth',
                  'Age and class details',
                  'Relevant educational information',
                  'Information voluntarily provided for participation in programmes',
                ].map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                    <span className="text-coral mt-0.5 shrink-0">•</span>{b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-black text-navy mb-1">Payment Information</p>
              <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-2">
                Programme fees are processed through secure third-party payment gateways. Gurukul Pre-School does not store credit card, debit card, UPI PIN, CVV, or banking credentials on its servers. We may receive limited payment-related information, including:
              </p>
              <ul className="space-y-1">
                {[
                  'Payment status',
                  'Transaction reference number',
                  'Billing details',
                  'Date and amount of payment',
                ].map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                    <span className="text-coral mt-0.5 shrink-0">•</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">2. How We Use Your Information</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-2">The information collected may be used to:</p>
          <ul className="space-y-1">
            {[
              'Process programme registrations and admissions',
              'Manage attendance and programme participation',
              'Communicate important updates, schedules, and announcements',
              'Respond to enquiries and support requests',
              'Process fee payments and refunds',
              'Ensure the safety and well-being of enrolled children',
              'Improve our programmes, services, and website experience',
              'Comply with legal and regulatory requirements',
            ].map(b => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                <span className="text-coral mt-0.5 shrink-0">•</span>{b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">3. Children's Privacy</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">
            Protecting children's privacy is a priority for Gurukul Pre-School. We collect personal information about children only through their parents or legal guardians and solely for educational, administrative, and programme-related purposes. We do not knowingly collect information directly from children through our website without parental involvement or consent.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">4. Sharing of Information</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-2">
            We do not sell, rent, or trade personal information. Information may be shared only with:
          </p>
          <ul className="space-y-1">
            {[
              'Authorised school staff and administrators',
              'Payment gateway providers for fee processing',
              'Technology and service providers supporting our operations',
              'Government authorities or regulatory bodies when required by law',
            ].map(b => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                <span className="text-coral mt-0.5 shrink-0">•</span>{b}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-600 font-semibold leading-relaxed">
            All third-party service providers are expected to maintain appropriate confidentiality and security standards.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">5. Photographs and Media Usage</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-2">
            During programme activities, events, workshops, or celebrations, photographs and videos may be taken for educational, promotional, or documentation purposes. Such content may be used on:
          </p>
          <ul className="space-y-1">
            {[
              'School notice boards',
              'School website',
              'Social media platforms',
              'Marketing and promotional materials',
            ].map(b => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                <span className="text-coral mt-0.5 shrink-0">•</span>{b}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-600 font-semibold leading-relaxed">
            Parents who do not wish their child to appear in such materials may submit a written request to the school administration.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">6. Data Security</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">
            We implement reasonable administrative, technical, and organisational safeguards to protect personal information from unauthorised access, misuse, loss, or disclosure. While we strive to maintain high security standards, no method of electronic transmission or storage can guarantee absolute security.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">7. Data Retention</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">
            Personal information will be retained only for as long as necessary to fulfil educational, administrative, legal, and operational requirements. When information is no longer required, it will be securely deleted or anonymised.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">8. Your Rights</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed mb-2">Parents and guardians may request to:</p>
          <ul className="space-y-1">
            {[
              'Access their personal information',
              'Correct inaccurate or incomplete information',
              'Update contact details',
              'Withdraw consent for promotional communications',
              'Request deletion of information where legally permissible',
            ].map(b => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-semibold">
                <span className="text-coral mt-0.5 shrink-0">•</span>{b}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-600 font-semibold leading-relaxed">
            Requests may be submitted to{' '}
            <a href="mailto:info-nhgps@newhorizongurukul.in" className="text-coral hover:underline">
              info-nhgps@newhorizongurukul.in
            </a>
            {' '}or by calling{' '}
            <a href="tel:+919606911078" className="text-coral hover:underline">
              +91 9606911078
            </a>.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">9. Third-Party Websites</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">
            Our website may contain links to external websites or platforms. Gurukul Pre-School is not responsible for the privacy practices or content of such third-party websites. We encourage users to review their privacy policies separately.
          </p>
        </div>

        <div>
          <h2 className="font-black text-navy text-base mb-2">10. Changes to This Privacy Policy</h2>
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">
            Gurukul Pre-School reserves the right to update this Privacy Policy from time to time. Any changes will be posted on our website and will become effective immediately upon publication.
          </p>
        </div>

      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-600 font-semibold leading-relaxed italic">
          We are committed to ensuring that all personal information entrusted to us is handled responsibly, securely, and with the utmost care.
        </p>
      </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
