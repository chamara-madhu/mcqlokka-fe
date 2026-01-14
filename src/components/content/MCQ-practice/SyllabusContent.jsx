import React, { useEffect, useState } from "react";
import PageLoader from "../../shared/loading/PageLoader";
import lessonService from "../../../services/lesson.service";
import ReactMarkdown from "react-markdown";
import config from "../../../config/aws";
import { Download } from "lucide-react";

const SyllabusContent = ({ subjectId, syllabusPdfUrl }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      const res = await lessonService().getAllLessonsBySubjectId(subjectId);
      setLessons(res?.data || []);
      setLoading(false);
    };
    fetchLessons();
  }, [subjectId]);

  if (loading) return <PageLoader />;

  if (lessons.length === 0) {
    return <p className="text-gray-500 text-center py-12">No lessons found.</p>;
  }

  return (
    <div className="px-6">
      <h2 className="text-2xl mt-8 font-bold text-purple-900">
        Main Lessons
      </h2>
      <p className="mb-5 text-sm text-gray-600">
        Total: <strong className="text-purple-700">{lessons.length}</strong>{" "}
        lessons
      </p>
      {syllabusPdfUrl && (
          <a
            href={`${config.S3_PUBLIC_URL}/${syllabusPdfUrl}`}
            download
            target="_blank"
            className="inline-flex mb-8 items-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Download Full Syllabus
          </a>
        )}
      <ol className="space-y-4 text-gray-700">
        {lessons.map((lesson, index) => (
          <li key={index} className="flex items-start gap-4">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 
                                 font-medium text-sm flex items-center justify-center"
            >
              {lesson.no || index + 1}
            </span>
            <span className="pt-1 text-base leading-relaxed">
              <div className="whitespace-pre-wrap">
                <ReactMarkdown>{lesson.lesson}</ReactMarkdown>
              </div>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SyllabusContent;
