import { Link } from "react-router-dom";
import { HOME_PATH, REGISTER_PATH } from "../../../constants/routes";

const VideoGuidesMain = () => {
  const videos = [
    {
      id: 1,
      title: "1. මොකක්ද මේ MCQ ලොක්කා කියන්නේ?",
      url: "https://www.youtube.com/embed/CR3vvDkR9rE",
      description: `මේ video එකෙන් ඔයාලට MCQ ලොක්කා කියන්නේ මොකක්ද කියලා පැහැදිලි අවබෝධයක් ලබාගන්න පුළුවන්.

✅ MCQ ලොක්කා කියන්නේ මොකක්ද?
✅ එකේ purpose එක මොකක්ද?
✅ Target කරන්නේ කවුද?
✅ මොන වගේ questions තියෙනවද?`,
    },
    {
      id: 2,
      title: "2. MCQ ලොක්කා පාවිච්චි කිරීමෙන් ඔයාට ලැබෙන සුපිරි වාසි.",
      url: "https://www.youtube.com/embed/62EnWduVIJk",
      description: `මේ video එකෙන් ඔයාලට MCQ ලොක්කා පාවිච්චි කිරීමෙන් ඔයාට ලැබෙන සුපිරි වාසි මොනවද කියලා පැහැදිලි අවබෝධයක් ලබාගන්න පුළුවන්.

"Smart විදිහට ඉගෙන ගන්න" එක් වරක් ගෙවා ජීවිත කාලයටම Unlimited Access ලබාගන්න. Learning & Exam Modes, සවිස්තරාත්මක විවරණ, සහ ඔබේ ප්‍රගතිය මැනිය හැකි Smart Analytics සමඟ ඕනෑම Device එකකින් ඕනෑම තැනක සිට practice කරන්න.`,
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-4">
          Video Guides & Tutorials
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          MCQ ලොක්කා පාවිච්චි කරලා ඔයාගේ විභාග ජයගන්නා ආකාරය මේ වීඩියෝ මගින්
          ඉගෙන ගන්න.
        </p>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video.id} className="group bg-white rounded-2xl">
            {/* Video */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={video.url}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Info */}
            <div className="mt-5">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                {video.title}
              </h2>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-2xl mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start Your Learning Journey
            </h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Take practice exams now with MCQ Lokka and test your knowledge
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={HOME_PATH}>
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                  Start Practice Exams
                </button>
              </Link>
              <Link to={REGISTER_PATH}>
                <button className="bg-purple-700 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-900 transition-colors border-2 border-white">
                  Register for Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGuidesMain;
