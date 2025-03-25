import { formatDistanceToNow, parseISO } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

const ShowTime = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const utcDate = parseISO(timestamp);
    if (isNaN(utcDate)) {
      timeAgo = "تاریخ نامعتبر";
    } else {
      // اضافه کردن 3 ساعت و 30 دقیقه برای ایران (UTC+3:30)
      const iranOffset = 3.5 * 60 * 60 * 1000; // 3.5 ساعت به میلی‌ثانیه
      const iranDate = new Date(utcDate.getTime() + iranOffset);
      const nowInIran = new Date(Date.now() + iranOffset);
      timeAgo = formatDistanceToNow(iranDate, {
        locale: faIR,
        addSuffix: true,
        comparedDate: nowInIran,
      });
    }
  }

  return (
    <span>
      <i>{timeAgo}</i> 
    </span>
  );
};

export default ShowTime;
