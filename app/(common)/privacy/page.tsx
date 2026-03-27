export const metadata = {
  title: "Privacy Policy | Planora",
  description: "Planora's privacy policy and data usage guidelines.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-black/5">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
        <p className="text-base font-semibold leading-7 text-primary">Last Updated: March 2026</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-6 text-xl leading-8">
          At Planora, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform to organize or attend events.
        </p>
        <div className="mt-10 max-w-2xl">
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Information we collect</h2>
          <p className="mt-4">
            We collect information you provide directly to us when you create an account, host an event, or purchase a ticket. This may include your name, email address, phone number, and payment information.
          </p>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">How we use your information</h2>
          <p className="mt-4">
            We use the information we collect to provide and maintain our services, process transactions, communicate with you about your events, and improve our platform. We never sell your personal data to third parties.
          </p>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Data Security</h2>
          <p className="mt-4">
            We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contact Us</h2>
          <p className="mt-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@planora.com.
          </p>
        </div>
      </div>
    </div>
  );
}
