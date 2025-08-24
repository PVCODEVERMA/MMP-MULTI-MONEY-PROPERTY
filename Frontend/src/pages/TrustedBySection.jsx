

import Trustpilot from "../assets/componyLogos/Trustpilot.svg";
import SATO from "../assets/componyLogos/SATO.svg";
import lightspeed from "../assets/componyLogos/lightspeed.svg";
import conga from "../assets/componyLogos/conga.svg";
import Evercommerce from "../assets/componyLogos/Evercommerce.svg";
import paylocity from "../assets/componyLogos/paylocity.svg";
import ACCRUENT from "../assets/componyLogos/ACCRUENT.svg";
import melio from "../assets/componyLogos/melio.svg";
import Premise from "../assets/componyLogos/Premise.svg";
import AMROCK from "../assets/componyLogos/AMROCK.svg";
import Paysafe from "../assets/componyLogos/Paysafe.svg";
import ShareFile from "../assets/componyLogos/ShareFile.svg";




const logos = [
  { name: "Trustpilot", src: Trustpilot },
  { name: "SATO", src: SATO },
  { name: "lightspeed", src: lightspeed },
  { name: "conga", src: conga },
  { name: "Evercommerce", src: Evercommerce },
  { name: "paylocity", src: paylocity },
  { name: "ACCRUENT", src: ACCRUENT },
  { name: "melio", src: melio },
  { name: "Premise", src: Premise },
  { name: "AMROCK", src: AMROCK },
  { name: "Paysafe", src: Paysafe },
  { name: "ShareFile", src: ShareFile }
];

function TrustedBySection() {
  return (
    <section className="mt-16 mb-8">
      <h3 className="text-center  font-medium mb-2 ">
        Empowering the fastest growing companies
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-center max-w-5xl mx-auto">
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-14 mx-auto  opacity-70"
            title={logo.name}
          />
        ))}
      </div>
    </section>
  );
}


export default TrustedBySection;