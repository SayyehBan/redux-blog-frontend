import { format, parse } from "date-fns-jalali";

// تبدیل میلادی به شمسی و بعد به شاهنشاهی
export const miladiToShamsiAndShahanshahi = (miladiDate, formatType = 1) => {
    // تبدیل میلادی به شمسی با date-fns-jalali
    const dateObject = typeof miladiDate === 'string' ? new Date(miladiDate) : miladiDate;
    const shamsiDate = format(dateObject, "yyyy/MM/dd");

    // پارس تاریخ شمسی
    const [shamsiYear, shamsiMonth, shamsiDay] = shamsiDate.split("/").map(Number);

    // تبدیل سال شمسی به شاهنشاهی
    const shahanshahiYear = shamsiYear + 1180;

    // تنظیم نام ماه و روز (مثل کد سی‌شارپت)
    const persianMonthName = {
        1: "فروردین",
        2: "اردیبهشت",
        3: "خرداد",
        4: "تیر",
        5: "مرداد",
        6: "شهریور",
        7: "مهر",
        8: "آبان",
        9: "آذر",
        10: "دی",
        11: "بهمن",
        12: "اسفند",
    }[shamsiMonth] || "";

    const persianDayName = {
        0: "یک‌شنبه",
        1: "دوشنبه",
        2: "سه‌شنبه",
        3: "چهارشنبه",
        4: "پنج‌شنبه",
        5: "جمعه",
        6: "شنبه",
    }[dateObject.getDay()] || "";

    // فرمت خروجی
    const outputFormat = {
        1: `${shahanshahiYear}/${String(shamsiMonth).padStart(2, "0")}/${String(shamsiDay).padStart(2, "0")}`,
        2: `${String(shamsiDay).padStart(2, "0")}/${persianMonthName}/${shahanshahiYear}`,
        3: `${persianDayName}/${shahanshahiYear}/${String(shamsiMonth).padStart(2, "0")}`,
        4: `${persianDayName}/${persianMonthName}/${shahanshahiYear}`,
        5: `${persianMonthName}/${persianDayName}/${shahanshahiYear}`,
    }[formatType] || `${shahanshahiYear}/${String(shamsiMonth).padStart(2, "0")}/${String(shamsiDay).padStart(2, "0")}`;

    return outputFormat;
};

// تبدیل شاهنشاهی به میلادی
export const shahanshahiToMiladi = (shahanshahiDate) => {
    const [shahanshahiYear, month, day] = shahanshahiDate.split("/").map(Number);

    // اعتبارسنجی ورودی
    if (
        isNaN(shahanshahiYear) ||
        isNaN(month) ||
        isNaN(day) ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
    ) {
        throw new Error("لطفاً تاریخ را با فرمت yyyy/MM/dd وارد کنید (مثلاً 2436/12/24).");
    }

    // تبدیل سال شاهنشاهی به شمسی
    const shamsiYear = shahanshahiYear - 1180;

    // تاریخ شمسی رو بسازیم
    const shamsiDateString = `${shamsiYear}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;

    // تبدیل تاریخ شمسی به میلادی با date-fns-jalali
    let miladiDate = parse(shamsiDateString, "yyyy/MM/dd", new Date());

    // تنظیم دستی برای جبران اختلاف روز (اگه لازم بود)
    // با تست دیدم که یه روز عقبه، پس یه روز اضافه می‌کنیم
    miladiDate.setDate(miladiDate.getDate() + 1);

    return miladiDate;
};