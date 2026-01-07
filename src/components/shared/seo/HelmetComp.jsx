import { Helmet } from "react-helmet-async";

const HelmetComp = ({
  title = "MCQ Lokka | O/L & A/L MCQ Practice Platform Sri Lanka",
  description = "Practice O/L & A/L past paper MCQs with explanations. Lesson-wise questions, lifetime access, unlimited attempts for Sri Lankan students.",
  url = "https://mcqlokka.com",
}) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}

      {/* Optional page-specific OG */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
    </Helmet>
  );
};

export default HelmetComp;
