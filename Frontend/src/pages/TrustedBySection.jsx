// Place anywhere below your pricing cards in SubscriptionPlans
const logos = [
  { name: "Trustpilot", src: "https://seeklogo.com/images/T/trustpilot-logo-127F7EDD2B-seeklogo.com.png" },
  { name: "SATO", src: "https://seeklogo.com/images/S/sato-logo-B796477A23-seeklogo.com.png" },
  { name: "lightspeed", src: "https://seeklogo.com/images/L/lightspeed-logo-EBDD494DF8-seeklogo.com.png" },
  { name: "conga", src: "https://seeklogo.com/images/C/conga-logo-6B5FC92AC2-seeklogo.com.png" },
  { name: "Evercommerce", src: "https://seeklogo.com/images/E/evercommerce-logo-7E52F6899E-seeklogo.com.png" },
  { name: "paylocity", src: "https://seeklogo.com/images/P/paylocity-logo-7D46A3A73A-seeklogo.com.png" },
  { name: "ACCRUENT", src: "https://seeklogo.com/images/A/accruent-logo-2DD7EC422D-seeklogo.com.png" },
  { name: "melio", src: "https://seeklogo.com/images/M/melio-logo-3B3D9B0C1C-seeklogo.com.png" },
  { name: "Premise", src: "https://seeklogo.com/images/P/premise-logo-8707F3F996-seeklogo.com.png" },
  { name: "AMROCK", src: "https://seeklogo.com/images/A/amrock-logo-827DB7D61C-seeklogo.com.png" },
  { name: "Paysafe", src: "https://seeklogo.com/images/P/paysafe-logo-020FF23A1E-seeklogo.com.png" },
  { name: "ShareFile", src: "https://seeklogo.com/images/S/sharefile-logo-18E499F1D5-seeklogo.com.png" }
];

function TrustedBySection() {
  return (
    <section className="mt-16 mb-8">
      <h3 className="text-center text-gray-700 font-medium mb-2">
        Empowering the fastest growing companies
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-center max-w-5xl mx-auto">
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-8 mx-auto grayscale opacity-70"
            title={logo.name}
          />
        ))}
      </div>
    </section>
  );
}


export default TrustedBySection;