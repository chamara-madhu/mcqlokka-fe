import LogoImg from "../../assets/images/logo.png";
// import TwitterIcon from "../../assets/icons/social-icons/twitter.png";
import FacebookIcon from "../../assets/icons/social-icons/facebook.png";
import InstagramIcon from "../../assets/icons/social-icons/instagram.png";
import LinkedinIcon from "../../assets/icons/social-icons/linkedin.png";
import YouTubeIcon from "../../assets/icons/social-icons/youtube.png";
import {
  CONTACT_US_PATH,
  FAQ_PATH,
  MCQ_ALL_PATH,
  HOME_PATH,
  PRICING_PATH,
  REGISTER_PATH,
  LOGIN_PATH,
} from "../../constants/routes";
import classNames from "classnames";
import { Link } from "react-router-dom";

const AnimatedLink = ({ href, text, children }) => (
  <span
    className={classNames(
      "mb-5 text-sm whitespace-nowrap",
      children ? "" : "hover:text-purple-500"
    )}
  >
    {children ? (
      children
    ) : (
      <Link to={href} rel="noopener noreferrer">
        {text}
      </Link>
    )}
  </span>
);

const AnimatedIcon = ({ href, src, alt }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    <img src={src} alt={alt} className="w-6 h-6 hover:opacity-70" />
  </a>
);

function Footer() {
  const textLinks = [
    { href: HOME_PATH, text: "Home", delay: 0 },
    { href: MCQ_ALL_PATH, text: "Features", delay: 0.2 },
    { href: PRICING_PATH, text: "Pricing", delay: 0.4 },
  ];

  const contactLinks = [
    { href: LOGIN_PATH, text: "Login", delay: 0 },
    { href: REGISTER_PATH, text: "Register", delay: 0.2 },
    { href: CONTACT_US_PATH, text: "Contact us", delay: 0.4 },
    { href: FAQ_PATH, text: "FAQ", delay: 0.6 },
  ];

  const emailLinks = [
    {
      text: "info@onlineict.ai",
      delay: 0,
      label: "General Enquiries : ",
    },
    {
      text: "support@onlineict.ai",
      delay: 0.2,
      label: "Support/Billing : ",
    },
    { text: "sam@onlineict.ai", delay: 0.4, label: "Sales : " },
  ];

  const socialIcons = [
    // {
    //   href: "https://twitter.com/AdxlAi",
    //   src: TwitterIcon,
    //   alt: "Twitter",
    //   delay: 0.7,
    // },
    {
      href: "https://www.linkedin.com/company/adxlai/",
      src: LinkedinIcon,
      alt: "LinkedIn",
      delay: 0.9,
    },
    {
      href: "https://www.facebook.com/adxlpro/",
      src: FacebookIcon,
      alt: "Facebook",
      delay: 1.1,
    },
    {
      href: "https://www.instagram.com/adxlai/",
      src: InstagramIcon,
      alt: "Instagram",
      delay: 1.3,
    },
    {
      href: "https://www.youtube.com/channel/UCMZ9laPB9j55TF9V_95nEDw",
      src: YouTubeIcon,
      alt: "YouTube",
      delay: 1.5,
    },
  ];

  return (
    <footer className="px-5 pt-12 pb-5 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-[40%,1fr] lg:grid-cols-[40%,1fr,1fr,1fr]">
          <div className="flex flex-col sm:max-w-[400px] items-center w-full gap-5 sm:items-start">
            <Link to={HOME_PATH}>
              <img
                src={LogoImg}
                className="w-[120px] object-contain rounded-md"
                alt="Online ICT Logo"
              />
            </Link>
            <p className="text-sm leading-6 text-center sm:text-left">
              MCQ ලොක්කා is your trusted A/L past paper MCQ practice platform. Practice real exam questions, track your progress, and get smarter every day. Learn anywhere, anytime be a true MCQ ලොක්කා!
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center sm:items-start">
              {textLinks.map(({ href, text, delay }) => (
                <AnimatedLink
                  key={text}
                  href={href}
                  text={text}
                  delay={delay}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center sm:items-start">
              {contactLinks.map(({ href, text, delay }) => (
                <AnimatedLink
                  key={text}
                  href={href}
                  text={text}
                  delay={delay}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center sm:items-start">
              {emailLinks.map(({ text, delay, label }) => (
                <AnimatedLink key={text} delay={delay}>
                  {label}
                  <Link
                    to={`mailto:${text}`}
                    target="_blank"
                    className="font-normal text-purple-500 hover:text-blue-700"
                  >
                    {text}
                  </Link>
                </AnimatedLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto mt-5">
        <hr />
        <div className="flex flex-col items-center justify-between gap-5 pt-2 mt-5 lg:flex-row">
          <div className="flex flex-col items-center gap-2 text-xs lg:flex-row">
            <span>&copy; Online ICT PTY LTD. All Rights Reserved.</span>
            <div className="flex gap-2">
              <Link to={"/"} target="_blank" className="hover:underline">
                Privacy Policy
              </Link>
              |
              <Link to={"/"} target="_blank" className="hover:underline">
                Cookie Policy
              </Link>
              |
              <Link to={"/"} target="_blank" className="hover:underline">
                Terms and Conditions
              </Link>
            </div>
          </div>
          <div className="flex gap-5 text-xs">
            {socialIcons.map(({ href, src, alt, delay }) => (
              <AnimatedIcon
                key={alt}
                href={href}
                delay={delay}
                src={src}
                alt={alt}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
